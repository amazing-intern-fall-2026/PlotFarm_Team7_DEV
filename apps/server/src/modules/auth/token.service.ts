import jwt, { TokenExpiredError } from "jsonwebtoken";
import { db } from "@repo/database";
import { ERROR_CODES } from "@repo/shared";
import { AppError } from "../../errors/AppError";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "default-access-secret-key-change-in-prod";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "default-refresh-secret-key-change-in-prod";

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY_DAYS = 7;

export interface TokenUser {
  id: string;
  email: string;
  role: string;
}

interface DecodedRefreshPayload {
  userId: string;
  tokenType: string;
  iat?: number;
  exp?: number;
}

export class TokenService {
  static generateAccessToken(user: TokenUser): string {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_ACCESS_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
  }

  static async createRefreshToken(userId: string): Promise<string> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);

    const token = jwt.sign(
      {
        userId,
        tokenType: "refresh",
      },
      JWT_REFRESH_SECRET,
      { expiresIn: `${REFRESH_TOKEN_EXPIRY_DAYS}d` }
    );

    await db.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });

    return token;
  }

  static async refreshAccessToken(refreshTokenString: string): Promise<{ accessToken: string }> {
    if (!refreshTokenString) {
      throw new AppError(
        "Refresh token không hợp lệ",
        401,
        ERROR_CODES.INVALID_REFRESH_TOKEN
      );
    }

    let decoded: DecodedRefreshPayload;
    try {
      decoded = jwt.verify(refreshTokenString, JWT_REFRESH_SECRET) as DecodedRefreshPayload;
    } catch (jwtError) {
      if (jwtError instanceof TokenExpiredError) {
        throw new AppError(
          "Refresh token đã hết hạn",
          401,
          ERROR_CODES.TOKEN_EXPIRED
        );
      }
      throw new AppError(
        "Refresh token không hợp lệ",
        401,
        ERROR_CODES.INVALID_REFRESH_TOKEN
      );
    }

    if (!decoded || decoded.tokenType !== "refresh" || !decoded.userId) {
      throw new AppError(
        "Refresh token không hợp lệ",
        401,
        ERROR_CODES.INVALID_REFRESH_TOKEN
      );
    }

    const storedToken = await db.refreshToken.findUnique({
      where: { token: refreshTokenString },
      include: { user: true },
    });

    if (!storedToken) {
      throw new AppError(
        "Refresh token không hợp lệ",
        401,
        ERROR_CODES.INVALID_REFRESH_TOKEN
      );
    }

    const user = storedToken.user;
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

    const newAccessToken = this.generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { accessToken: newAccessToken };
  }
}
