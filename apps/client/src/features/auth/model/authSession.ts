import type { UserRole, LoginResponseData } from "@repo/shared";
import { SESSION_KEYS } from "../constants";
import {
  safeGetAuth,
  safeSetAuth,
  getAccessToken,
  safeClearAuth,
} from "@/auth/authStorage";

export type AuthUser = LoginResponseData["user"];

/**
 * Lưu phiên đăng nhập đồng bộ vào cả LocalStorage (SSOT) và SessionStorage.
 */
export function setAuthSession(data: LoginResponseData): void {
  // 1. Lưu vào LocalStorage làm SSOT cho axiosClient và toàn app
  safeSetAuth({
    user: data.user,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });

  // 2. Giữ đồng bộ sessionStorage cho các components/legacy code
  try {
    sessionStorage.setItem(SESSION_KEYS.ACCESS_TOKEN, data.accessToken);
    if (data.refreshToken) {
      sessionStorage.setItem(SESSION_KEYS.REFRESH_TOKEN, data.refreshToken);
    }
    sessionStorage.setItem(SESSION_KEYS.USER, JSON.stringify(data.user));
  } catch {
    // Không làm crash ứng dụng nếu sessionStorage bị hạn chế
  }
}

/**
 * Lấy thông tin user (ưu tiên từ authStorage SSOT, fallback về sessionStorage).
 */
export function getStoredUser(): AuthUser | null {
  const auth = safeGetAuth();
  if (auth?.user) {
    return auth.user;
  }
  try {
    const raw = sessionStorage.getItem(SESSION_KEYS.USER);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

/**
 * Lấy access token hiện tại (ưu tiên từ authStorage SSOT, fallback về sessionStorage).
 */
export function getStoredAccessToken(): string | null {
  const token = getAccessToken();
  if (token) return token;
  try {
    return sessionStorage.getItem(SESSION_KEYS.ACCESS_TOKEN);
  } catch {
    return null;
  }
}

/**
 * Kiểm tra xem người dùng đã đăng nhập hay chưa (có token và user object).
 */
export function isAuthenticated(): boolean {
  return Boolean(getStoredAccessToken() && getStoredUser());
}

/**
 * Kiểm tra vai trò của người dùng hiện tại có nằm trong danh sách cho phép hay không.
 */
export function hasRole(allowedRoles: UserRole[]): boolean {
  const user = getStoredUser();
  if (!user) return false;
  return allowedRoles.includes(user.role);
}

/**
 * Xóa sạch phiên đăng nhập (Tokens, User, và dọn dẹp cookie Google One Tap nếu có).
 */
export function clearAuthSession(): void {
  // Xóa SSOT LocalStorage
  safeClearAuth();

  // Xóa SessionStorage
  try {
    sessionStorage.removeItem(SESSION_KEYS.ACCESS_TOKEN);
    sessionStorage.removeItem(SESSION_KEYS.REFRESH_TOKEN);
    sessionStorage.removeItem(SESSION_KEYS.USER);
  } catch {
    // ignore
  }

  // Xóa cookie g_state do Google Identity Services tự sinh trên domain
  if (typeof document !== "undefined") {
    document.cookie = "g_state=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = `g_state=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }

  // Thu hồi trạng thái auto-select của Google
  if (typeof window !== "undefined" && window.google?.accounts?.id?.disableAutoSelect) {
    window.google.accounts.id.disableAutoSelect();
  }
}
