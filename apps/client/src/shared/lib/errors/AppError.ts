import type { ApiErrorDetail, ApiErrorResponse, ApiSuccessResponse } from "@repo/shared";

export type ApiResponseEnvelope<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface LegacyErrorEnvelope {
  code?: number;
  message?: string;
  meta?: unknown;
  error?: {
    code?: string;
    message?: string;
    field?: string;
    details?: ApiErrorDetail[];
  };
}

/**
 * Lỗi chuẩn hóa phía FE — mirror với BE AppError.
 * Wrap `ApiErrorResponse` từ @repo/shared để FE có thể instanceof-check.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly detail?: ApiErrorDetail;
  public readonly details: ApiErrorDetail[];
  public readonly meta?: unknown;

  constructor(envelope: ApiErrorResponse | LegacyErrorEnvelope) {
    const errorPayload = "error" in envelope ? envelope.error : undefined;
    const errMessage =
      errorPayload?.message ??
      ("message" in envelope && typeof envelope.message === "string"
        ? envelope.message
        : "Đã xảy ra lỗi không xác định.");

    super(errMessage);
    this.name = "AppError";
    this.statusCode = "code" in envelope && typeof envelope.code === "number" ? envelope.code : 400;
    this.errorCode = errorPayload?.code ?? "ERR_UNKNOWN";
    this.details =
      errorPayload && "details" in errorPayload && Array.isArray(errorPayload.details)
        ? errorPayload.details
        : [];
    this.detail =
      this.details[0] ??
      (errorPayload ? { code: errorPayload.code, message: errorPayload.message } : undefined);
    this.meta = "meta" in envelope ? envelope.meta : undefined;

    Object.setPrototypeOf(this, AppError.prototype);
  }

  /** Tạo AppError từ raw data bất kỳ — fallback khi parse thất bại */
  static fromUnknown(err: unknown, fallbackCode = "ERR_UNKNOWN"): AppError {
    if (err instanceof AppError) return err;

    const message =
      err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định.";

    return new AppError({
      success: false,
      error: {
        code: fallbackCode,
        message,
        details: [],
      },
    });
  }

  /** Kiểm tra một error code cụ thể */
  is(code: string): boolean {
    return this.errorCode === code;
  }
}

