import type { ErrorMessageMap } from "@repo/shared";

/**
 * Thông báo lỗi xác thực — ánh xạ từ errorCode (server) sang chuỗi hiển thị người dùng.
 * Tập trung tại đây để dễ dàng đổi ngôn ngữ hoặc kết nối i18n sau này.
 * Keys phải là ErrorCode hợp lệ từ @repo/shared để TypeScript enforce tại compile time.
 */
export const AUTH_ERROR_MESSAGES: ErrorMessageMap = {
  // Auth
  ERR_EMAIL_NOT_VERIFIED:
    "Email chưa được xác thực. Vui lòng kiểm tra hộp thư và xác nhận email.",
  ERR_UNAUTHORIZED: "Email hoặc mật khẩu không chính xác.",
  ERR_ACCOUNT_DISABLED: "Tài khoản đã bị vô hiệu hóa. Vui lòng liên hệ hỗ trợ.",

  // Network
  ERR_UNKNOWN: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",

  // Register
  ERR_CONFLICT: "Email này đã được đăng ký. Vui lòng đăng nhập.",
  ERR_VALIDATION:
    "Dữ liệu đăng ký không hợp lệ. Hãy dùng ít nhất 8 ký tự, bao gồm chữ hoa và số.",

  // OTP
  ERR_INVALID_OTP: "Mã OTP không hợp lệ.",
  ERR_OTP_EXPIRED: "Mã OTP đã hết hạn. Vui lòng yêu cầu gửi lại.",
  ERR_OTP_MAX_ATTEMPTS:
    "Nhập sai OTP quá nhiều lần. Mã đã bị hủy, vui lòng gửi lại sau 15 phút.",

  // Token
  ERR_TOKEN_EXPIRED: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
};

/** Lấy thông báo lỗi theo errorCode, fallback về ERR_UNKNOWN */
export function getAuthErrorMessage(code: string): string {
  return (
    AUTH_ERROR_MESSAGES[code as keyof typeof AUTH_ERROR_MESSAGES] ??
    AUTH_ERROR_MESSAGES["ERR_UNKNOWN"] ??
    "Đã có lỗi xảy ra. Vui lòng thử lại sau."
  );
}

