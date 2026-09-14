import type { UserRole, LoginResponseData } from "@repo/shared";
import { SESSION_KEYS } from "../constants";

export type AuthUser = LoginResponseData["user"];

/**
 * Lấy thông tin user đã lưu trong sessionStorage.
 */
export function getStoredUser(): AuthUser | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEYS.USER);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

/**
 * Lấy access token hiện tại.
 */
export function getStoredAccessToken(): string | null {
  return sessionStorage.getItem(SESSION_KEYS.ACCESS_TOKEN);
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
  sessionStorage.removeItem(SESSION_KEYS.ACCESS_TOKEN);
  sessionStorage.removeItem(SESSION_KEYS.REFRESH_TOKEN);
  sessionStorage.removeItem(SESSION_KEYS.USER);

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
