import axios, { AxiosError } from "axios";
import {
  type ApiErrorResponse,
  type ApiErrorPayload,
  type ApiErrorDetail,
  ERROR_CODES,
  type ErrorCode,
} from "@repo/shared";

/**
 * Type guard kiểm tra dữ liệu trả về có khớp cấu trúc ApiErrorResponse hay không.
 */
export function isApiErrorResponse(data: unknown): data is ApiErrorResponse {
  if (typeof data !== "object" || data === null) return false;
  const candidate = data as Record<string, unknown>;
  if (candidate.success !== false) return false;
  if (typeof candidate.error !== "object" || candidate.error === null) return false;

  const errorObj = candidate.error as Record<string, unknown>;
  return typeof errorObj.code === "string" && typeof errorObj.message === "string";
}

/**
 * Phân tích lỗi bất kỳ (AxiosError, Network Error, Error thông thường)
 * thành cấu trúc ApiErrorPayload chuẩn hóa để Client hiển thị UI an toàn.
 */
export function parseApiError(error: unknown): ApiErrorPayload {
  // 1. Nếu là AxiosError và có response data chuẩn từ backend
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<unknown>;
    const responseData = axiosError.response?.data;

    if (isApiErrorResponse(responseData)) {
      return responseData.error;
    }

    // 2. Nếu server trả response nhưng không đúng định dạng envelope
    if (axiosError.response) {
      const status = axiosError.response.status;
      return {
        code: `ERR_HTTP_${status}`,
        message: axiosError.message || `Máy chủ phản hồi với mã lỗi ${status}`,
        details: [],
      };
    }

    // 3. Lỗi mạng (mất mạng, timeout, không kết nối được server)
    if (axiosError.code === "ECONNABORTED") {
      return {
        code: "ERR_TIMEOUT",
        message: "Yêu cầu quá thời gian chờ (Timeout). Vui lòng thử lại.",
        details: [],
      };
    }

    if (axiosError.request) {
      return {
        code: "ERR_NETWORK",
        message: "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.",
        details: [],
      };
    }
  }

  // 4. Lỗi JavaScript runtime thông thường
  if (error instanceof Error) {
    return {
      code: ERROR_CODES.INTERNAL_SERVER,
      message: error.message || "Đã xảy ra lỗi không xác định",
      details: [],
    };
  }

  // 5. Fallback cuối cùng
  return {
    code: ERROR_CODES.INTERNAL_SERVER,
    message: "Đã xảy ra lỗi hệ thống không xác định",
    details: [],
  };
}

/**
 * Chuyển đổi danh sách details lỗi validation thành dictionary { [fieldName]: errorMessage }
 * Tiện lợi để hiển thị lỗi ngay dưới các ô input form trong React.
 */
export function mapValidationErrors(details: ApiErrorDetail[]): Record<string, string> {
  const errorMap: Record<string, string> = {};
  if (!Array.isArray(details)) return errorMap;

  for (const detail of details) {
    if (detail.field && detail.message) {
      errorMap[detail.field] = detail.message;
    }
  }
  return errorMap;
}

/**
 * Trích xuất nhanh thông điệp lỗi để hiển thị Toast / Notification cho người dùng.
 */
export function getErrorMessage(error: unknown, fallbackMessage = "Thao tác không thành công"): string {
  const parsed = parseApiError(error);
  return parsed.message || fallbackMessage;
}

export { ERROR_CODES };
export type { ApiErrorResponse, ApiErrorPayload, ApiErrorDetail, ErrorCode };
