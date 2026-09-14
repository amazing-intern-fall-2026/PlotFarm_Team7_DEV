/**
 * Hằng số thông báo thành công (Success Messages) dùng chung cho toàn bộ hệ thống (FE + BE).
 */
export const SUCCESS_MESSAGES = {
  AUTH: {
    REGISTER: "Đăng ký tài khoản thành công. Mã OTP xác thực đã được gửi đến email của bạn.",
    VERIFY_EMAIL: "Xác thực email thành công",
    RESEND_OTP: "Mã OTP mới đã được gửi thành công đến email của bạn",
    REFRESH_TOKEN: "Làm mới token thành công",
    GET_PROFILE: "Lấy thông tin tài khoản thành công",
    LOGIN: "Đăng nhập thành công",
    LOGOUT: "Đăng xuất thành công",
  },
  COMMON: {
    SUCCESS: "Thành công.",
    OPERATION_SUCCESS: "Thao tác thành công",
  },
} as const;

/**
 * Hằng số thông báo lỗi (Error Messages) dùng chung cho toàn bộ hệ thống (FE + BE).
 */
export const ERROR_MESSAGES = {
  AUTH: {
    EMAIL_ALREADY_EXISTS: "Email này đã được đăng ký",
    USER_NOT_FOUND: "Không tìm thấy tài khoản với email này",
    ACCOUNT_ALREADY_VERIFIED: "Tài khoản này đã được xác thực",
    INVALID_CREDENTIALS: "Email hoặc mật khẩu không chính xác",
    ACCOUNT_DISABLED: "Tài khoản đã bị khóa",
    EMAIL_NOT_VERIFIED: "Tài khoản chưa được xác thực email",
    INVALID_OTP: "Mã OTP không hợp lệ",
    OTP_EXPIRED: "Mã OTP đã hết hạn",
    OTP_MAX_ATTEMPTS: "Nhập sai OTP quá nhiều lần. Mã đã bị hủy, vui lòng yêu cầu mã mới",
    OTP_COOLDOWN_PREFIX: "Vui lòng chờ",
    OTP_COOLDOWN_SUFFIX: "giây trước khi yêu cầu gửi lại mã",
    INVALID_TOKEN: "Mã xác thực không hợp lệ",
    TOKEN_EXPIRED: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại",
    AUTH_REQUIRED: "Yêu cầu đăng nhập để truy cập tài nguyên",
    FORBIDDEN: "Bạn không có quyền thực hiện thao tác này",
  },
  COMMON: {
    INTERNAL_SERVER: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
    INVALID_JSON: "Dữ liệu JSON không hợp lệ",
    VALIDATION_FAILED: "Dữ liệu không hợp lệ",
    NOT_FOUND: "Không tìm thấy dữ liệu yêu cầu",
    BAD_REQUEST: "Yêu cầu không hợp lệ",
    CONFLICT: "Dữ liệu đã tồn tại",
    NETWORK_ERROR: "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.",
  },
} as const;
