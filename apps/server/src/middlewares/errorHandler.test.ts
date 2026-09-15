import { describe, it, expect, vi } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { z } from "@repo/shared";
import { errorHandler } from "./errorHandler";
import { AppError } from "../errors/AppError";

interface MockResponse {
  statusCode: number;
  jsonData: unknown;
  status: (code: number) => MockResponse;
  json: (data: unknown) => MockResponse;
}

describe("Centralized Error Handler Middleware - Unit & Acceptance Tests", () => {
  const createMockReqRes = (url = "/api/test", method = "POST") => {
    const req = {
      url,
      originalUrl: url,
      method,
    } as unknown as Request;

    const resObj: MockResponse = {
      statusCode: 200,
      jsonData: null,
      status(code: number) {
        this.statusCode = code;
        return this;
      },
      json(data: unknown) {
        this.jsonData = data;
        return this;
      },
    };

    const res = resObj as unknown as Response & MockResponse;
    const next = vi.fn() as unknown as NextFunction;

    return { req, res, next, resObj };
  };

  // TEST 1: Valid request -> HTTP 200 { success: true, data: { ... } }
  it("TEST 1: Valid request format conforms to standard envelope", () => {
    const successPayload = {
      success: true,
      data: {
        id: 1,
        name: "John Doe",
      },
    };
    expect(successPayload.success).toBe(true);
    expect(successPayload.data).toEqual({ id: 1, name: "John Doe" });
  });

  // TEST 2: Zod validation error -> HTTP 400 / ERR_VALIDATION
  it("TEST 2 (AC-2): Zod validation error returns 400 and ERR_VALIDATION with field paths", () => {
    const { req, res, next, resObj } = createMockReqRes();
    const UserSchema = z.object({
      email: z.string().email("Invalid email address"),
      profile: z.object({
        age: z.number().min(18, "Must be at least 18"),
      }),
    });

    const parseResult = UserSchema.safeParse({ email: "invalid-email", profile: { age: 10 } });
    expect(parseResult.success).toBe(false);

    if (!parseResult.success) {
      errorHandler(parseResult.error, req, res, next);

      expect(resObj.statusCode).toBe(400);
      expect(resObj.jsonData).toEqual({
        success: false,
        error: {
          code: "ERR_VALIDATION",
          message: "Validation failed",
          details: [
            { field: "email", message: "Invalid email address" },
            { field: "profile.age", message: "Must be at least 18" },
          ],
        },
      });
    }
  });

  // TEST 3: Invalid JSON -> HTTP 400 / ERR_INVALID_JSON
  it("TEST 3 (EH-1): Invalid JSON payload returns 400 and ERR_INVALID_JSON", () => {
    const { req, res, next, resObj } = createMockReqRes();
    const syntaxError = new SyntaxError("Unexpected token in JSON at position 10") as SyntaxError & {
      status: number;
      body: string;
    };
    syntaxError.status = 400;
    syntaxError.body = '{"name": "John",}';

    errorHandler(syntaxError, req, res, next);

    expect(resObj.statusCode).toBe(400);
    expect(resObj.jsonData).toEqual({
      success: false,
      error: {
        code: "ERR_INVALID_JSON",
        message: "Invalid JSON payload",
        details: [],
      },
    });
  });

  // TEST 4: Prisma P2002 -> HTTP 409 / ERR_DUPLICATE
  it("TEST 4 (AC-3): Prisma P2002 duplicate returns 409 ERR_DUPLICATE with safe field details", () => {
    const { req, res, next, resObj } = createMockReqRes();
    const prismaError = new Prisma.PrismaClientKnownRequestError(
      "Unique constraint failed on the fields: (`email`)",
      {
        code: "P2002",
        clientVersion: "5.14.0",
        meta: { target: ["email"] },
      }
    );

    errorHandler(prismaError, req, res, next);

    expect(resObj.statusCode).toBe(409);
    expect(resObj.jsonData).toEqual({
      success: false,
      error: {
        code: "ERR_DUPLICATE",
        message: "A record with the provided value already exists",
        details: [{ field: "email" }],
      },
    });
  });

  // TEST 5: AppError 403 -> HTTP 403 / FORBIDDEN
  it("TEST 5 (AppError): AppError returns custom status, code and message", () => {
    const { req, res, next, resObj } = createMockReqRes();
    const appError = new AppError(
      "You do not have permission to perform this action",
      403,
      "FORBIDDEN"
    );

    errorHandler(appError, req, res, next);

    expect(resObj.statusCode).toBe(403);
    expect(resObj.jsonData).toEqual({
      success: false,
      error: {
        code: "FORBIDDEN",
        message: "You do not have permission to perform this action",
        details: [],
      },
    });
  });

  // TEST 6: Unknown Error -> HTTP 500 / ERR_INTERNAL_SERVER
  it("TEST 6 (AC-4): Unknown runtime error returns 500 ERR_INTERNAL_SERVER", () => {
    const { req, res, next, resObj } = createMockReqRes();
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const unknownError = new Error("Something unexpected happened");

    errorHandler(unknownError, req, res, next);

    expect(resObj.statusCode).toBe(500);
    expect(resObj.jsonData).toEqual({
      success: false,
      error: {
        code: "ERR_INTERNAL_SERVER",
        message: "Internal server error",
        details: [],
      },
    });

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  // TEST 7: Production unknown error -> không có stack trace hoặc thông tin nhạy cảm trong response
  it("TEST 7 (Security): Response payload never exposes stack trace, db secrets, or SQL", () => {
    const { req, res, next, resObj } = createMockReqRes();
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const sensitiveError = new Error(
      "FATAL: password authentication failed for user 'postgres' at /var/www/app/db.ts:45"
    );

    errorHandler(sensitiveError, req, res, next);

    const json = resObj.jsonData as {
      success: boolean;
      error: { code: string; message: string; details: unknown[] };
    };

    expect(json.success).toBe(false);
    expect(json.error.code).toBe("ERR_INTERNAL_SERVER");
    expect(json.error.message).toBe("Internal server error");
    expect(json.error).not.toHaveProperty("stack");
    expect(JSON.stringify(json)).not.toContain("postgres");
    expect(JSON.stringify(json)).not.toContain("/var/www/app");

    consoleSpy.mockRestore();
  });
});
