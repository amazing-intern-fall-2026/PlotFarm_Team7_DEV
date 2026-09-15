import { ERROR_CODES } from "@repo/shared";

/**
 * Custom Application Error class for operational errors.
 * Extends standard JavaScript Error to standardize HTTP status code, error code, and detailed validation/context.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly details: unknown[];
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    errorCode: string = ERROR_CODES.INTERNAL_SERVER,
    details: unknown[] = []
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    this.isOperational = true;

    // Restore prototype chain for instanceof checks
    Object.setPrototypeOf(this, AppError.prototype);

    // Capture stack trace if available
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Factory methods for clean controller & service code
  static badRequest(message = "Bad request", errorCode: string = ERROR_CODES.BAD_REQUEST, details: unknown[] = []) {
    return new AppError(message, 400, errorCode, details);
  }

  static unauthorized(message = "Unauthorized", errorCode: string = ERROR_CODES.UNAUTHORIZED, details: unknown[] = []) {
    return new AppError(message, 401, errorCode, details);
  }

  static forbidden(message = "Forbidden", errorCode: string = ERROR_CODES.FORBIDDEN, details: unknown[] = []) {
    return new AppError(message, 403, errorCode, details);
  }

  static notFound(message = "Not found", errorCode: string = ERROR_CODES.NOT_FOUND, details: unknown[] = []) {
    return new AppError(message, 404, errorCode, details);
  }

  static conflict(message = "Conflict", errorCode: string = ERROR_CODES.CONFLICT, details: unknown[] = []) {
    return new AppError(message, 409, errorCode, details);
  }

  static internal(message = "Internal server error", errorCode: string = ERROR_CODES.INTERNAL_SERVER, details: unknown[] = []) {
    return new AppError(message, 500, errorCode, details);
  }
}
