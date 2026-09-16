import type { UserRole, LoginResponseData } from "@repo/shared";

export type AuthUser = LoginResponseData["user"];

export const COOKIE_KEYS = {
  ACCESS_TOKEN: "greenfarm_at",
  REFRESH_TOKEN: "greenfarm_rt",
  USER: "greenfarm_user",
} as const;

/**
 * Cookie Utilities thuần túy (Không phụ thuộc LocalStorage / SessionStorage)
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function setCookie(name: string, value: string, days = 7): void {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${secure}`;
}

export function removeCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
  if (typeof window !== "undefined" && window.location.hostname) {
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}; SameSite=Lax`;
  }
}

/**
 * Lưu phiên đăng nhập CHỈ DÙNG COOKIE (Cookie-based Auth SSOT).
 */
export function setAuthSession(data: LoginResponseData): void {
  // 1. Lưu access token vào Cookie
  setCookie(COOKIE_KEYS.ACCESS_TOKEN, data.accessToken, 7);

  // 2. Lưu refresh token vào Cookie nếu có
  if (data.refreshToken) {
    setCookie(COOKIE_KEYS.REFRESH_TOKEN, data.refreshToken, 30);
  }

  // 3. Lưu thông tin user profile vào Cookie
  setCookie(COOKIE_KEYS.USER, JSON.stringify(data.user), 7);
}

/**
 * Lấy thông tin user từ Cookie.
 */
export function getStoredUser(): AuthUser | null {
  try {
    const raw = getCookie(COOKIE_KEYS.USER);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

/**
 * Lấy access token hiện tại từ Cookie.
 */
export function getStoredAccessToken(): string | null {
  return getCookie(COOKIE_KEYS.ACCESS_TOKEN);
}

/**
 * Lấy refresh token hiện tại từ Cookie.
 */
export function getStoredRefreshToken(): string | null {
  return getCookie(COOKIE_KEYS.REFRESH_TOKEN);
}

/**
 * Kiểm tra xem người dùng đã đăng nhập hay chưa (có Token và User trong Cookie).
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
 * Xóa sạch toàn bộ Cookie xác thực khi đăng xuất.
 */
export function clearAuthSession(): void {
  // Xóa các Cookie của ứng dụng
  removeCookie(COOKIE_KEYS.ACCESS_TOKEN);
  removeCookie(COOKIE_KEYS.REFRESH_TOKEN);
  removeCookie(COOKIE_KEYS.USER);

  // Xóa cookie g_state do Google Identity Services tự sinh trên domain
  removeCookie("g_state");

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("auth:logout"));
    if (window.google?.accounts?.id?.disableAutoSelect) {
      window.google.accounts.id.disableAutoSelect();
    }
  }
}
