import { describe, it, expect } from "vitest";
import { parseApiError, isApiErrorResponse, mapValidationErrors, getErrorMessage } from "./errorHandler";
import { AxiosError, AxiosHeaders } from "axios";

describe("shared/api - errorHandler (US-18 DoD)", () => {
  it("should validate ApiErrorResponse structure correctly with isApiErrorResponse", () => {
    expect(isApiErrorResponse(null)).toBe(false);
    expect(isApiErrorResponse({ success: true })).toBe(false);
    expect(isApiErrorResponse({ success: false, error: { code: "ERR_TEST", message: "Error msg" } })).toBe(true);
  });

  it("should parse standard Error instance", () => {
    const error = new Error("Custom runtime error");
    const parsed = parseApiError(error);
    expect(parsed.message).toBe("Custom runtime error");
    expect(parsed.details).toEqual([]);
  });

  it("should extract error from AxiosError response data", () => {
    const axiosError = new AxiosError("Request failed");
    axiosError.response = {
      data: {
        success: false,
        error: {
          code: "ERR_VALIDATION",
          message: "Dữ liệu không hợp lệ",
          details: [{ field: "plotCode", message: "Mã ô đất không tồn tại" }],
        },
      },
      status: 400,
      statusText: "Bad Request",
      headers: {},
      config: { headers: new AxiosHeaders() },
    };

    const parsed = parseApiError(axiosError);
    expect(parsed.code).toBe("ERR_VALIDATION");
    expect(parsed.message).toBe("Dữ liệu không hợp lệ");
    expect(parsed.details).toHaveLength(1);

    const errorMap = mapValidationErrors(parsed.details);
    expect(errorMap.plotCode).toBe("Mã ô đất không tồn tại");
  });

  it("should parse network error when server cannot be reached", () => {
    const networkError = new AxiosError("Network Error");
    networkError.request = {}; // request sent but no response
    const parsed = parseApiError(networkError);
    expect(parsed.code).toBe("ERR_NETWORK");
    expect(parsed.message).toContain("Không thể kết nối");
  });

  it("should return fallback message in getErrorMessage if parsing fails", () => {
    const msg = getErrorMessage(undefined, "Lỗi mặc định");
    expect(msg).toBe("Đã xảy ra lỗi hệ thống không xác định");
  });
});
