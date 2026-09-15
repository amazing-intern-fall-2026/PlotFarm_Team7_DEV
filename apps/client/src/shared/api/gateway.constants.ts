export const GATEWAY_ERROR_MESSAGES: Record<string, string> = {
  ERR_NETWORK: "Không thể kết nối tới máy chủ. Vui lòng kiểm tra mạng.",
  ERR_PARSE: "Phản hồi từ máy chủ không hợp lệ. Vui lòng thử lại.",
  ERR_TIMEOUT: "Yêu cầu mất quá nhiều thời gian. Vui lòng thử lại.",
  ERR_UNKNOWN: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
} as const;

export const GATEWAY_TIMEOUT_MS = 15_000;
export const GATEWAY_ENDPOINT =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GATEWAY_ENDPOINT) ||
  "/api/gateway";
export const GATEWAY_HEADER_CORRELATION_ID = "X-Correlation-ID";
export const GATEWAY_HEADER_AUTHORIZATION = "Authorization";
