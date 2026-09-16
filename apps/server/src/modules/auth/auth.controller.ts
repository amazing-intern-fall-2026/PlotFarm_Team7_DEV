import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  LoginRequestSchema,
  RegisterRequestSchema,
  VerifyEmailRequestSchema,
  ResendOtpRequestSchema,
  SUCCESS_MESSAGES,
} from "@repo/shared";
import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";
import { db } from "@repo/database";
import { ERROR_CODES } from "@repo/shared";
import { AppError } from "../../errors/AppError";
import { buildSuccessResponse } from "../../common/utils/envelope";

const RefreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token là bắt buộc"),
});

interface UserProfileDetail {
  userId: string;
  userCode: string;
  email: string;
  phone: string;
  fullName: string;
  avatarUrl: string | null;
  role: string;
  isVerified: boolean;
  createdAt: string;
}

export class AuthController {
  /**
   * Endpoint: POST /api/auth/register hoặc POST /api/gateway (action: "auth.register")
   * Xử lý đăng ký tài khoản người dùng
   */
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = req.body?.payload ?? req.body;
      const parsedData = RegisterRequestSchema.parse(payload);
      const result = await AuthService.register(parsedData);

      res.status(201).json(
        buildSuccessResponse(
          result,
          SUCCESS_MESSAGES.AUTH.REGISTER,
          { userCode: result.userCode }
        )
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Endpoint: POST /api/auth/verify-email hoặc POST /api/gateway (action: "auth.verifyEmail")
   * Xác thực email bằng mã OTP 6 số
   */
  static async verifyEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = req.body?.payload ?? req.body;
      const parsedData = VerifyEmailRequestSchema.parse(payload);
      const result = await AuthService.verifyEmail(parsedData);

      res.status(200).json(
        buildSuccessResponse(result, SUCCESS_MESSAGES.AUTH.VERIFY_EMAIL, {
          userCode: result.user.userCode,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Endpoint: POST /api/auth/resend-otp hoặc POST /api/gateway (action: "auth.resendOtp")
   * Gửi lại mã OTP xác thực email (cooldown 60s)
   */
  static async resendOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = req.body?.payload ?? req.body;
      const parsedData = ResendOtpRequestSchema.parse(payload);
      const result = await AuthService.resendOtp(parsedData);

      res.status(200).json(
        buildSuccessResponse(result, SUCCESS_MESSAGES.AUTH.RESEND_OTP)
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Endpoint: POST /api/auth/refresh
   * Nhận refreshToken và trả về accessToken mới
   */
  static async refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const validatedBody = RefreshSchema.parse(req.body);
      const result = await TokenService.refreshAccessToken(
        validatedBody.refreshToken,
      );

      res.status(200).json(
        buildSuccessResponse(
          { accessToken: result.accessToken },
          SUCCESS_MESSAGES.AUTH.REFRESH_TOKEN
        )
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Endpoint: GET /api/auth/profile hoặc GET /api/v1/profile
   * Route được bảo vệ bởi authGuard — Lấy thông tin người dùng thực tế từ Database
   */
  static async getProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const targetUserId = req.userId || req.user?.userId;
      let userData: unknown = req.user;
      let userCode = req.user?.userId;

      if (targetUserId) {
        const dbUser = await db.user.findUnique({
          where: { id: targetUserId },
          select: {
            id: true,
            userCode: true,
            email: true,
            phone: true,
            fullName: true,
            avatarUrl: true,
            role: true,
            isVerified: true,
            createdAt: true,
          },
        });
        if (dbUser) {
          const detail: UserProfileDetail = {
            userId: dbUser.id,
            userCode: dbUser.userCode || dbUser.id,
            email: dbUser.email,
            phone: dbUser.phone || "",
            fullName: dbUser.fullName,
            avatarUrl: dbUser.avatarUrl,
            role: dbUser.role,
            isVerified: dbUser.isVerified,
            createdAt: dbUser.createdAt.toISOString(),
          };
          userData = detail;
          userCode = detail.userCode;
        }
      }

      res.status(200).json(
        buildSuccessResponse(
          { user: userData },
          SUCCESS_MESSAGES.AUTH.GET_PROFILE,
          { userCode }
        )
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Endpoint: PUT /api/auth/profile hoặc PUT /api/v1/profile
   * Cập nhật thông tin profile người dùng thực tế vào Database
   */
  static async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const targetUserId = req.userId || req.user?.userId;
      if (!targetUserId) {
        throw new AppError("Yêu cầu đăng nhập", 401, ERROR_CODES.AUTH_REQUIRED);
      }

      const body = req.body as { fullName?: unknown; phone?: unknown; avatarUrl?: unknown };
      const updateData: { fullName?: string; phone?: string; avatarUrl?: string } = {};
      if (typeof body.fullName === "string" && body.fullName.trim()) {
        updateData.fullName = body.fullName.trim();
      }
      if (typeof body.phone === "string") {
        updateData.phone = body.phone.trim();
      }
      if (typeof body.avatarUrl === "string") {
        updateData.avatarUrl = body.avatarUrl.trim();
      }

      const updatedUser = await db.user.update({
        where: { id: targetUserId },
        data: updateData,
        select: {
          id: true,
          userCode: true,
          email: true,
          phone: true,
          fullName: true,
          avatarUrl: true,
          role: true,
          isVerified: true,
          createdAt: true,
        },
      });

      res.status(200).json(
        buildSuccessResponse(
          {
            user: {
              userId: updatedUser.id,
              userCode: updatedUser.userCode || updatedUser.id,
              email: updatedUser.email,
              phone: updatedUser.phone || "",
              fullName: updatedUser.fullName,
              avatarUrl: updatedUser.avatarUrl,
              role: updatedUser.role,
              isVerified: updatedUser.isVerified,
              createdAt: updatedUser.createdAt.toISOString(),
            },
          },
          "Cập nhật thông tin hồ sơ thành công"
        )
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Endpoint: POST /api/auth/login hoặc POST /api/gateway (action: "auth.login")
   * Xử lý đăng nhập bằng email và mật khẩu
   */
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const credentials = req.body?.payload ?? req.body;
      const parsedCredentials = LoginRequestSchema.parse(credentials);
      const data = await AuthService.login(parsedCredentials);

      res.status(200).json(
        buildSuccessResponse(data, SUCCESS_MESSAGES.AUTH.LOGIN, {
          userCode: data.user.userCode,
        })
      );
    } catch (error) {
      next(error);
    }
  }
}

export function login(req: Request, res: Response, next: NextFunction): void {
  AuthController.login(req, res, next).catch(next);
}
