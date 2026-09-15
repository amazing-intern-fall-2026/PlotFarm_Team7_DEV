import type { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import {
  ApiErrorResponse,
  ApiErrorDetail,
  ERROR_CODES,
  ZodError,
} from "@repo/shared";
import { AppError } from "../errors/AppError";

/**
 * Type guard for Express body-parser SyntaxError (e.g. malformed JSON).
 */
function isMalformedJsonError(
  err: unknown
): err is SyntaxError & { status: number; body?: unknown; type?: string } {
  return (
    err instanceof SyntaxError &&
    "status" in err &&
    (err as { status: number }).status === 400 &&
    ("body" in err || (err as { type?: string }).type === "entity.parse.failed")
  );
}

/**
 * Format nested Zod path safely to dot notation (e.g. "user.email" or "items.0.name").
 */
function formatZodPath(path: (string | number)[]): string {
  if (path.length === 0) return "root";
  return path.join(".");
}

/**
 * Extract field name from Prisma unique constraint violation metadata safely.
 */
function extractPrismaUniqueField(meta?: Record<string, unknown>): Array<{ field: string }> {
  if (!meta || !meta.target) return [];

  const target = meta.target;
  if (Array.isArray(target)) {
    return target.map((field) => ({ field: String(field) }));
  }
  if (typeof target === "string") {
    return [{ field: target }];
  }
  return [];
}

/**
 * Centralized Global Error Handling Middleware for Express.
 * Catches all runtime errors, formats consistent JSON responses, and prevents internal leakages.
 */
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = 500;
  let errorCode: string = ERROR_CODES.INTERNAL_SERVER;
  let message = "Internal server error";
  let details: ApiErrorDetail[] = [];

  // 1. Check for Invalid / Malformed JSON Body error from express.json()
  if (isMalformedJsonError(err)) {
    statusCode = 400;
    errorCode = ERROR_CODES.INVALID_JSON;
    message = "Invalid JSON payload";
    details = [];
  }
  // 2. Check for AppError (Custom Operational Errors)
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorCode = err.errorCode;
    message = err.message;
    details = err.details as ApiErrorDetail[];
  }
  // 3. Check for Zod Validation Errors
  else if (err instanceof ZodError) {
    statusCode = 400;
    errorCode = ERROR_CODES.VALIDATION;
    message = "Validation failed";
    details = err.issues.map((issue) => ({
      field: formatZodPath(issue.path),
      message: issue.message,
    }));
  }
  // 4. Check for Prisma Database Errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": {
        // Unique constraint failed
        statusCode = 409;
        errorCode = ERROR_CODES.DUPLICATE;
        message = "A record with the provided value already exists";
        details = extractPrismaUniqueField(err.meta as Record<string, unknown> | undefined);
        break;
      }
      case "P2025": {
        // Record not found
        statusCode = 404;
        errorCode = ERROR_CODES.NOT_FOUND;
        message = "Record not found";
        details = [];
        break;
      }
      case "P2003": {
        // Foreign key constraint failed
        statusCode = 400;
        errorCode = ERROR_CODES.FOREIGN_KEY_CONSTRAINT;
        message = "Foreign key constraint failed";
        details = [];
        break;
      }
      default: {
        statusCode = 400;
        errorCode = ERROR_CODES.DATABASE;
        message = "Database operation failed";
        details = [];
        break;
      }
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    errorCode = ERROR_CODES.BAD_REQUEST;
    message = "Database validation failed";
    details = [];
  }
  // 5. Unknown / System Runtime Errors (500)
  else {
    statusCode = 500;
    errorCode = ERROR_CODES.INTERNAL_SERVER;
    message = "Internal server error";
    details = [];

    // Detailed server-side console logging for debugging & monitoring
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl || req.url;
    const errMessage = err instanceof Error ? err.message : String(err);
    const errStack = err instanceof Error ? err.stack : "No stack trace available";

    console.error(
      `[ERROR] ${timestamp}\n${method} ${url}\n${errMessage}\n${errStack}`
    );
  }

  // Response format adheres strictly to the shared envelope specification
  const responsePayload: ApiErrorResponse = {
    success: false,
    error: {
      code: errorCode,
      message,
      details,
    },
  };

  res.status(statusCode).json(responsePayload);
};
