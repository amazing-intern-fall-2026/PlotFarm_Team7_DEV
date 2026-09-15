/**
 * @layer common
 * @description Tầng Common — Middleware dùng chung, exceptions, utilities và typing cho Backend.
 *
 * Hướng dẫn triển khai:
 * 1. middlewares/  → Auth guard (JWT verify), role check, rate limiting, request validation, error handler.
 * 2. exceptions/   → Custom HttpExceptions (BadRequest, NotFound, Forbidden, Unauthorized).
 * 3. utils/        → Envelope API response builder, logger, hashing, date-time helpers.
 * 4. types/        → Request context types, Express declaration merging.
 */
export {};
