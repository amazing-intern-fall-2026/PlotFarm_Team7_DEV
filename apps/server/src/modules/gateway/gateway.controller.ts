import { randomUUID } from "crypto";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  ERROR_CODES,
  CreateCareRequestSchema,
  RegisterRequestSchema,
  VerifyEmailRequestSchema,
  ResendOtpRequestSchema,
  type AuthPayload,
} from "@repo/shared";
import { AppError } from "../../errors/AppError";
import { buildSuccessResponse } from "../../common/utils/envelope";
import {
  AuthService,
  loginWithCredentials,
  loginWithGoogle,
} from "../auth/auth.service";
import { getMockPlots } from "../plots/plots.service";
import { createMockCareRequest } from "../care/care.service";
import { decryptPayload } from "./jwe";

interface GatewayEnvelope {
  action?: string;
  payload?: unknown;
  timestamp?: number;
}

const JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || "default-access-secret-key-change-in-prod";
const REQUEST_MAX_SKEW_MS = 60_000;

// GatewayUser is AuthPayload from @repo/shared — no local duplicate needed
type GatewayUser = AuthPayload;

type ActionHandler = (
  payload: unknown,
  context: { user?: GatewayUser },
) => Promise<unknown>;

interface ActionConfig {
  handler: ActionHandler;
  requireAuth: boolean;
}

/**
 * Danh bạ action theo Dispatcher Pattern (docs/GATEWAY_AUTH_SPECIFICATION.md §5.2).
 * Chỉ đăng ký action nào đã có handler thật — action chưa implement (register...)
 * không được thêm vào đây để tránh trả kết quả giả.
 */
const actionRegistry: Record<string, ActionConfig> = {
  "auth.login": {
    handler: (payload) => {
      const { email, password } = (payload ?? {}) as {
        email?: string;
        password?: string;
      };
      return loginWithCredentials(email ?? "", password ?? "");
    },
    requireAuth: false,
  },
  "auth.google": {
    handler: (payload) => {
      const { idToken } = (payload ?? {}) as { idToken?: string };
      return loginWithGoogle(idToken ?? "");
    },
    requireAuth: false,
  },
  "auth.register": {
    handler: (payload) => {
      const parsed = RegisterRequestSchema.parse(payload);
      return AuthService.register(parsed);
    },
    requireAuth: false,
  },
  "auth.verifyEmail": {
    handler: (payload) => {
      const parsed = VerifyEmailRequestSchema.parse(payload);
      return AuthService.verifyEmail(parsed);
    },
    requireAuth: false,
  },
  "auth.resendOtp": {
    handler: (payload) => {
      const parsed = ResendOtpRequestSchema.parse(payload);
      return AuthService.resendOtp(parsed);
    },
    requireAuth: false,
  },
  "plots.list": {
    handler: async () => getMockPlots(),
    requireAuth: false,
  },
  "care.createRequest": {
    handler: (payload) => {
      const { contractCode, ...rest } = (payload ?? {}) as {
        contractCode?: string;
        serviceType?: string;
        customerNote?: string;
      };
      const parsed = CreateCareRequestSchema.safeParse(rest);
      if (!parsed.success) {
        throw AppError.badRequest(
          "Dữ liệu yêu cầu chăm sóc không hợp lệ.",
          ERROR_CODES.VALIDATION,
        );
      }
      return Promise.resolve(
        createMockCareRequest(contractCode ?? "", parsed.data.serviceType),
      );
    },
    requireAuth: false,
  },
};

export async function gatewayController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const correlationId =
    (req.headers["x-correlation-id"] as string) || randomUUID();
  res.setHeader("X-Correlation-ID", correlationId);

  try {
    const rawBody = req.body ?? {};
    let envelope: GatewayEnvelope;

    if (typeof rawBody.cipher === "string") {
      try {
        envelope = await decryptPayload<GatewayEnvelope>(rawBody.cipher);
      } catch {
        throw AppError.badRequest(
          "Không thể giải mã payload.",
          ERROR_CODES.BAD_REQUEST,
        );
      }
    } else {
      envelope = rawBody;
    }

    const { action, payload, timestamp } = envelope;

    if (!timestamp || Math.abs(Date.now() - timestamp) > REQUEST_MAX_SKEW_MS) {
      throw AppError.badRequest(
        "Request timestamp is invalid or expired.",
        ERROR_CODES.BAD_REQUEST,
      );
    }

    const actionConfig = actionRegistry[action as string];
    if (!actionConfig) {
      throw AppError.notFound(
        "Hành động không tồn tại hoặc đã bị vô hiệu hóa.",
        ERROR_CODES.NOT_FOUND,
      );
    }

    let currentUser: GatewayUser | undefined;
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      try {
        currentUser = jwt.verify(
          authHeader.slice(7),
          JWT_ACCESS_SECRET,
        ) as GatewayUser;
      } catch {
        if (actionConfig.requireAuth) {
          throw AppError.unauthorized(
            "Phiên đăng nhập không hợp lệ hoặc đã hết hạn.",
            ERROR_CODES.INVALID_TOKEN,
          );
        }
      }
    } else if (actionConfig.requireAuth) {
      throw AppError.unauthorized(
        "Yêu cầu đăng nhập để thực hiện tác vụ này.",
        ERROR_CODES.AUTH_REQUIRED,
      );
    }

    const data = await actionConfig.handler(payload, { user: currentUser });
    res.status(200).json(buildSuccessResponse(data, "Thành công."));
  } catch (error) {
    next(error);
  }
}
