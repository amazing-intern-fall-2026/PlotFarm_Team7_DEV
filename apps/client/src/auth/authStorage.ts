/**
 * Module quản lý lưu trữ Authentication State trong LocalStorage một cách an toàn (Fault-Tolerant).
 * Đáp ứng EH-1: Tự động bắt lỗi SyntaxError khi LocalStorage bị corrupt, xóa dữ liệu hỏng
 * và chuyển trạng thái về Guest mà KHÔNG làm crash ứng dụng React.
 */

import type { LoginResponseData } from "@repo/shared";

export const AUTH_STORAGE_KEY = "plotfarm_auth";

export interface StoredAuthData {
  // Kế thừa trực tiếp từ @repo/shared LoginResponseData.user — SSOT
  user: LoginResponseData["user"];
  accessToken: string;
  refreshToken?: string;
}


/**
 * Đọc dữ liệu xác thực từ LocalStorage an toàn (Safe Get Auth).
 * Nếu dữ liệu bị hỏng (corrupted JSON) hoặc bị can thiệp trái phép,
 * hàm sẽ bắt lỗi, dọn dẹp storage và trả về null (Guest state).
 */
export function safeGetAuth(): StoredAuthData | null {
  try {
    const rawData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawData) {
      return null;
    }

    const parsed = JSON.parse(rawData);

    // Kiểm tra cấu trúc cơ bản
    if (!parsed || typeof parsed !== "object") {
      safeClearAuth();
      return null;
    }

    return parsed as StoredAuthData;
  } catch (error) {
    // Không log dữ liệu nhạy cảm ra production
    if (process.env.NODE_ENV !== "production") {
      console.warn("[AuthStorage] Corrupted LocalStorage data detected. Resetting to guest state.", error);
    }
    // Dọn dẹp dữ liệu hỏng để ngăn ngừa lỗi lặp lại
    safeClearAuth();
    return null;
  }
}

/**
 * Lưu dữ liệu xác thực vào LocalStorage an toàn
 */
export function safeSetAuth(data: StoredAuthData): void {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("[AuthStorage] Failed to save auth state to LocalStorage:", error);
  }
}

/**
 * Cập nhật Access Token mới sau khi refresh thành công
 */
export function updateAccessToken(newAccessToken: string): void {
  try {
    const currentAuth = safeGetAuth();
    if (currentAuth) {
      currentAuth.accessToken = newAccessToken;
      safeSetAuth(currentAuth);
    }
  } catch (error) {
    console.error("[AuthStorage] Failed to update access token:", error);
  }
}

/**
 * Lấy Access Token hiện tại
 */
export function getAccessToken(): string | null {
  const auth = safeGetAuth();
  return auth ? auth.accessToken : null;
}

/**
 * Lấy Refresh Token hiện tại
 */
export function getRefreshToken(): string | null {
  const auth = safeGetAuth();
  return auth?.refreshToken ? auth.refreshToken : null;
}

/**
 * Xóa an toàn toàn bộ authentication state và phát sự kiện đồng bộ
 */
export function safeClearAuth(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    // Phát event để AuthContext hoặc các tabs khác có thể tự động reset về Guest
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("auth:logout"));
    }
  } catch (error) {
    console.error("[AuthStorage] Failed to clear LocalStorage:", error);
  }
}
