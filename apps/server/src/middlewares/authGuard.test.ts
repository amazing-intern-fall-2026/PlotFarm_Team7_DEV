import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authGuard } from "./authGuard";
import { db } from "@repo/database";
import { AppError } from "../errors/AppError";

type UserQueryResult = Awaited<ReturnType<typeof db.user.findUnique>>;

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "default-access-secret-key-change-in-prod";

describe("authGuard Middleware Unit Tests", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {};
    mockNext = vi.fn() as unknown as NextFunction;
    vi.clearAllMocks();
  });

  it("should throw ERR_AUTH_REQUIRED when Authorization header is missing", async () => {
    await authGuard(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
    const error = (mockNext as ReturnType<typeof vi.fn>).mock.calls[0][0] as AppError;
    expect(error.statusCode).toBe(401);
    expect(error.errorCode).toBe("ERR_AUTH_REQUIRED");
  });

  it("AC-2: should reject tampered JWT with 401 ERR_INVALID_TOKEN", async () => {
    mockReq.headers = {
      authorization: "Bearer invalid.tampered.token123",
    };

    await authGuard(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
    const error = (mockNext as ReturnType<typeof vi.fn>).mock.calls[0][0] as AppError;
    expect(error.statusCode).toBe(401);
    expect(error.errorCode).toBe("ERR_INVALID_TOKEN");
  });

  it("should identify expired token with 401 ERR_TOKEN_EXPIRED", async () => {
    const expiredToken = jwt.sign(
      { userId: "usr_123" },
      JWT_ACCESS_SECRET,
      { expiresIn: "-1s" }
    );

    mockReq.headers = {
      authorization: `Bearer ${expiredToken}`,
    };

    await authGuard(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
    const error = (mockNext as ReturnType<typeof vi.fn>).mock.calls[0][0] as AppError;
    expect(error.statusCode).toBe(401);
    expect(error.errorCode).toBe("ERR_TOKEN_EXPIRED");
  });

  it("should reject when user does not exist in DB", async () => {
    const validToken = jwt.sign({ userId: "non_existent_id" }, JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    mockReq.headers = {
      authorization: `Bearer ${validToken}`,
    };

    vi.spyOn(db.user, "findUnique").mockResolvedValue(null as UserQueryResult);

    await authGuard(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
    const error = (mockNext as ReturnType<typeof vi.fn>).mock.calls[0][0] as AppError;
    expect(error.statusCode).toBe(401);
    expect(error.errorCode).toBe("ERR_USER_NOT_FOUND");
  });

  it("AC-3: should reject disabled user with 403 ERR_ACCOUNT_DISABLED even with valid JWT", async () => {
    const validToken = jwt.sign({ userId: "usr_disabled" }, JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    mockReq.headers = {
      authorization: `Bearer ${validToken}`,
    };

    vi.spyOn(db.user, "findUnique").mockResolvedValue({
      id: "usr_disabled",
      email: "disabled@plotfarm.vn",
      role: "CUSTOMER",
      deletedAt: new Date(),
    } as unknown as UserQueryResult);

    await authGuard(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
    const error = (mockNext as ReturnType<typeof vi.fn>).mock.calls[0][0] as AppError;
    expect(error.statusCode).toBe(403);
    expect(error.errorCode).toBe("ERR_ACCOUNT_DISABLED");
    expect(error.message).toBe("Tài khoản đã bị khóa");
  });

  it("should allow active user with valid token and attach user to request", async () => {
    const validToken = jwt.sign(
      { userId: "usr_active_1" },
      JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    mockReq.headers = {
      authorization: `Bearer ${validToken}`,
    };

    vi.spyOn(db.user, "findUnique").mockResolvedValue({
      id: "usr_active_1",
      email: "active@plotfarm.vn",
      role: "CUSTOMER",
      deletedAt: null,
    } as unknown as UserQueryResult);

    await authGuard(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith();
    expect(mockReq.user).toEqual({
      userId: "usr_active_1",
      email: "active@plotfarm.vn",
      role: "CUSTOMER",
    });
    expect(mockReq.userId).toBe("usr_active_1");
  });
});
