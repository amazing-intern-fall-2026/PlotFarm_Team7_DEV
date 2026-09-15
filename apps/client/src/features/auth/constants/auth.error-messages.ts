import { ERROR_MESSAGES, type ErrorMessageMap } from "@repo/shared";

/**
 * Thông báo lỗi xác thực — ánh xạ từ errorCode (server) sang chuỗi hiển thị người dùng.
 * Sử dụng hằng số ERROR_MESSAGES từ @repo/shared làm SSOT.
 * Keys phải là ErrorCode hợp lệ từ @repo/shared để TypeScript enforce tại compile time.
 */
export const AUTH_ERROR_MESSAGES: ErrorMessageMap = {
  // Auth
  ERR_EMAIL_NOT_VERIFIED: ERROR_MESSAGES.AUTH.EMAIL_NOT_VERIFIED,
  ERR_UNAUTHORIZED: ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
  ERR_ACCOUNT_DISABLED: ERROR_MESSAGES.AUTH.ACCOUNT_DISABLED,

  // Network & System
  ERR_UNKNOWN: ERROR_MESSAGES.COMMON.INTERNAL_SERVER,

  // Register
  ERR_CONFLICT: ERROR_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS,
  ERR_VALIDATION: ERROR_MESSAGES.COMMON.VALIDATION_FAILED,

  // OTP
  ERR_INVALID_OTP: ERROR_MESSAGES.AUTH.INVALID_OTP,
  ERR_OTP_EXPIRED: ERROR_MESSAGES.AUTH.OTP_EXPIRED,
  ERR_OTP_MAX_ATTEMPTS: ERROR_MESSAGES.AUTH.OTP_MAX_ATTEMPTS,

  // Token
  ERR_TOKEN_EXPIRED: ERROR_MESSAGES.AUTH.TOKEN_EXPIRED,
};

/** Lấy thông báo lỗi theo errorCode, fallback về ERR_UNKNOWN */
export function getAuthErrorMessage(code: string): string {
  return (
    AUTH_ERROR_MESSAGES[code as keyof typeof AUTH_ERROR_MESSAGES] ??
    AUTH_ERROR_MESSAGES["ERR_UNKNOWN"] ??
    "Đã có lỗi xảy ra. Vui lòng thử lại sau."
  );
}

