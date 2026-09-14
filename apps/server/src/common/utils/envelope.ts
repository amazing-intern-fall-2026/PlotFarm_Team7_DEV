import { randomUUID } from "crypto";
import type { ApiSuccessResponse, Pagination } from "@repo/shared";

interface BuildSuccessOptions {
  code?: number;
  userCode?: string;
  pagination?: Pagination;
}

export function buildSuccessResponse<T>(
  data: T,
  message: string,
  options: BuildSuccessOptions = {},
): ApiSuccessResponse<T> {
  return {
    success: true,
    code: options.code ?? 200,
    message,
    meta: {
      correlationId: randomUUID(),
      traceId: randomUUID(),
      userCode: options.userCode ?? "ANONYMOUS",
      timestamp: new Date().toISOString(),
      rateLimit: {
        limit: 100,
        remaining: 99,
        resetInSeconds: 60,
        isSpamWarning: false,
      },
    },
    data,
    ...(options.pagination ? { pagination: options.pagination } : {}),
  };
}
