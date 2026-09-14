import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  setAuthSession,
  getStoredUser,
  getStoredAccessToken,
  getStoredRefreshToken,
  isAuthenticated,
  hasRole,
  clearAuthSession,
  COOKIE_KEYS,
} from "./authCookie";
import type { LoginResponseData } from "@repo/shared";

describe("Cookie-Based authCookie Unit Tests", () => {
  let cookieStore: Record<string, string> = {};

  beforeEach(() => {
    cookieStore = {};
    const mockDocument = {
      get cookie() {
        return Object.entries(cookieStore)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
          .join("; ");
      },
      set cookie(cookieStr: string) {
        const [pair] = cookieStr.split(";");
        const [rawKey, rawVal] = pair.split("=");
        const key = decodeURIComponent(rawKey.trim());
        const val = decodeURIComponent(rawVal || "");
        if (cookieStr.includes("Thu, 01 Jan 1970")) {
          delete cookieStore[key];
        } else {
          cookieStore[key] = val;
        }
      },
    };

    vi.stubGlobal("document", mockDocument);
    vi.stubGlobal("window", {
      location: { protocol: "http:", hostname: "localhost" },
      dispatchEvent: vi.fn(),
      google: { accounts: { id: { disableAutoSelect: vi.fn() } } },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  const mockLoginData: LoginResponseData = {
    accessToken: "jwt-token-xyz-123",
    refreshToken: "refresh-token-456",
    user: {
      userCode: "USR-001",
      email: "farmer@greenfarm.vn",
      fullName: "Nguyễn Văn Nông",
      role: "STAFF",
    },
  };

  it("TEST 1: setAuthSession lưu access token, refresh token và user vào Cookie", () => {
    setAuthSession(mockLoginData);

    expect(cookieStore[COOKIE_KEYS.ACCESS_TOKEN]).toBe("jwt-token-xyz-123");
    expect(cookieStore[COOKIE_KEYS.REFRESH_TOKEN]).toBe("refresh-token-456");
    expect(JSON.parse(cookieStore[COOKIE_KEYS.USER])).toEqual(mockLoginData.user);
  });

  it("TEST 2: getStoredAccessToken và getStoredRefreshToken đọc đúng từ Cookie", () => {
    setAuthSession(mockLoginData);

    expect(getStoredAccessToken()).toBe("jwt-token-xyz-123");
    expect(getStoredRefreshToken()).toBe("refresh-token-456");
  });

  it("TEST 3: getStoredUser lấy user object từ Cookie", () => {
    setAuthSession(mockLoginData);

    const user = getStoredUser();
    expect(user).toEqual(mockLoginData.user);
    expect(user?.role).toBe("STAFF");
  });

  it("TEST 4: isAuthenticated trả về true khi có đủ token và user trong Cookie", () => {
    expect(isAuthenticated()).toBe(false);

    setAuthSession(mockLoginData);
    expect(isAuthenticated()).toBe(true);
  });

  it("TEST 5: hasRole kiểm tra vai trò người dùng chuẩn xác", () => {
    setAuthSession(mockLoginData);

    expect(hasRole(["STAFF"])).toBe(true);
    expect(hasRole(["CUSTOMER", "ADMIN"])).toBe(false);
  });

  it("TEST 6: clearAuthSession xóa sạch Cookie và Google state", () => {
    setAuthSession(mockLoginData);
    expect(isAuthenticated()).toBe(true);

    clearAuthSession();

    expect(cookieStore[COOKIE_KEYS.ACCESS_TOKEN]).toBeUndefined();
    expect(cookieStore[COOKIE_KEYS.REFRESH_TOKEN]).toBeUndefined();
    expect(cookieStore[COOKIE_KEYS.USER]).toBeUndefined();
    expect(isAuthenticated()).toBe(false);
    expect(getStoredUser()).toBeNull();
  });
});
