import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  LoginRequestSchema,
  RegisterRequestSchema,
  VerifyEmailRequestSchema,
  ResendOtpRequestSchema,
  SUCCESS_MESSAGES,
} from "@repo/shared";
import { TokenService } from "./token.service";
import { AuthService } from "./auth.service";
import { buildSuccessResponse } from "../../common/utils/envelope";

const RefreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token là bắt buộc"),
});

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
   * Endpoint: GET /api/auth/profile
   * Route được bảo vệ bởi authGuard
   */
  static async getProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      res.status(200).json(
        buildSuccessResponse(
          { user: req.user },
          SUCCESS_MESSAGES.AUTH.GET_PROFILE,
          { userCode: req.user?.userId }
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

