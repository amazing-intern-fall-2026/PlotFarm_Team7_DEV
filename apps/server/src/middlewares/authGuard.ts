import type { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { db } from "@repo/database";
import { ERROR_CODES } from "@repo/shared";
import { AppError } from "../errors/AppError";
import type { AuthUserPayload } from "../types/express";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "default-access-secret-key-change-in-prod";

interface DecodedTokenPayload {
  userId: string;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export const authGuard = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(
        "Yêu cầu đăng nhập để truy cập tài nguyên",
        401,
        ERROR_CODES.AUTH_REQUIRED
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new AppError(
        "Yêu cầu đăng nhập để truy cập tài nguyên",
        401,
        ERROR_CODES.AUTH_REQUIRED
      );
    }

    let decoded: DecodedTokenPayload;
    try {
      decoded = jwt.verify(token, JWT_ACCESS_SECRET) as DecodedTokenPayload;
    } catch (jwtError) {
      if (jwtError instanceof TokenExpiredError) {
        throw new AppError("Token đã hết hạn", 401, ERROR_CODES.TOKEN_EXPIRED);
      }

      if (jwtError instanceof JsonWebTokenError) {
        throw new AppError(
          "Mã xác thực không hợp lệ",
          401,
          ERROR_CODES.INVALID_TOKEN
        );
      }

      throw new AppError(
        "Mã xác thực không hợp lệ",
        401,
        ERROR_CODES.INVALID_TOKEN
      );
    }

    if (!decoded || !decoded.userId) {
      throw new AppError(
        "Mã xác thực không hợp lệ",
        401,
        ERROR_CODES.INVALID_TOKEN
      );
    }

    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        deletedAt: true,
      },
    });

    if (!user) {
      throw new AppError(
        "Người dùng không tồn tại",
        401,
        ERROR_CODES.USER_NOT_FOUND
      );
    }

    if (user.deletedAt !== null) {
      throw new AppError(
        "Tài khoản đã bị khóa",
        403,
        ERROR_CODES.ACCOUNT_DISABLED
      );
    }

    const authUser: AuthUserPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    req.user = authUser;
    req.userId = user.id;
    req.userRole = user.role;

    next();
  } catch (error) {
    next(error);
  }
};
