import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { axiosClient, API_BASE_URL } from "./axiosClient";
import {
  safeGetAuth,
  safeSetAuth,
  AUTH_STORAGE_KEY,
} from "../auth/authStorage";

interface InterceptorHandler<T> {
  fulfilled?: (value: T) => T | Promise<T>;
  rejected?: (error: unknown) => unknown;
}

interface InterceptorManagerInternal<T> {
  handlers: Array<InterceptorHandler<T>>;
}

function getRequestInterceptor(): (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig> {
  const manager = axiosClient.interceptors.request as unknown as InterceptorManagerInternal<InternalAxiosRequestConfig>;
  const handler = manager.handlers[0]?.fulfilled;
  if (!handler) {
    throw new Error("Request interceptor fulfilled handler not found");
  }
  return handler as (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig>;
}

function getResponseErrorHandler(): (error: unknown) => Promise<unknown> {
  const manager = axiosClient.interceptors.response as unknown as InterceptorManagerInternal<AxiosResponse>;
  const handler = manager.handlers[0]?.rejected;
  if (!handler) {
    throw new Error("Response interceptor rejected handler not found");
  }
  return handler as (error: unknown) => Promise<unknown>;
}

const createLocalStorageMock = (): Storage => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string): string | null => (key in store ? store[key] : null),
    setItem: (key: string, value: string): void => {
      store[key] = String(value);
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
    clear: (): void => {
      store = {};
    },
    key: (_index: number): string | null => null,
    length: 0,
  };
};

if (typeof globalThis.localStorage === "undefined" || !globalThis.localStorage.clear) {
  Object.defineProperty(globalThis, "localStorage", {
    value: createLocalStorageMock(),
    writable: true,
  });
}

describe("AxiosClient & Auth Storage Resilience Test Suite", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("TEST 1: should attach Bearer token to request headers", async () => {
    safeSetAuth({
      user: { userCode: "usr_1", email: "test@plotfarm.vn", fullName: "Test User", role: "CUSTOMER" },
      accessToken: "valid_access_token_123",
      refreshToken: "valid_refresh_token_123",
    });

    const mockConfig: InternalAxiosRequestConfig = {
      headers: new axios.AxiosHeaders(),
      url: "/users/profile",
      method: "get",
    };

    const requestInterceptor = getRequestInterceptor();
    const modifiedConfig = await requestInterceptor(mockConfig);

    expect(modifiedConfig.headers.Authorization).toBe("Bearer valid_access_token_123");
  });

  it("TEST 3 (AC-1): 5 concurrent 401 requests must trigger ONLY 1 refresh request and retry all 5", async () => {
    safeSetAuth({
      user: { userCode: "usr_1", email: "test@plotfarm.vn", fullName: "Test User", role: "CUSTOMER" },
      accessToken: "expired_access_token",
      refreshToken: "valid_refresh_token",
    });

    let refreshCallCount = 0;

    vi.spyOn(axios, "post").mockImplementation(async (url: string) => {
      if (url.includes("/auth/refresh")) {
        refreshCallCount++;
        await new Promise((resolve) => setTimeout(resolve, 50));
        return {
          data: {
            success: true,
            data: { accessToken: "new_refreshed_access_token" },
          },
        } as AxiosResponse;
      }
      return Promise.reject(new Error("Unknown endpoint"));
    });

    const responseErrorHandler = getResponseErrorHandler();

    const create401Error = (url: string) => ({
      config: {
        url,
        headers: { Authorization: "Bearer expired_access_token" },
        method: "get",
      },
      response: {
        status: 401,
        data: {
          success: false,
          error: { code: "ERR_TOKEN_EXPIRED", message: "Token đã hết hạn" },
        },
      },
    });

    axiosClient.defaults.adapter = async (config) => ({
      data: { success: true, url: config.url },
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    });

    const req1 = responseErrorHandler(create401Error("/users"));
    const req2 = responseErrorHandler(create401Error("/products"));
    const req3 = responseErrorHandler(create401Error("/orders"));
    const req4 = responseErrorHandler(create401Error("/profile"));
    const req5 = responseErrorHandler(create401Error("/notifications"));

    const results = await Promise.all([req1, req2, req3, req4, req5]);
    expect(results).toHaveLength(5);
    expect(refreshCallCount).toBe(1);

    const updatedAuth = safeGetAuth();
    expect(updatedAuth?.accessToken).toBe("new_refreshed_access_token");
  });

  it("TEST 4 (AC-2): Tampered JWT must clear auth and reject without calling refresh", async () => {
    safeSetAuth({
      user: { userCode: "usr_1", email: "test@plotfarm.vn", fullName: "Test User", role: "CUSTOMER" },
      accessToken: "tampered_token",
      refreshToken: "refresh_token",
    });

    const refreshSpy = vi.spyOn(axios, "post");
    const responseErrorHandler = getResponseErrorHandler();

    const tamperedError = {
      config: { url: "/users", headers: {} },
      response: {
        status: 401,
        data: {
          success: false,
          error: { code: "ERR_INVALID_TOKEN", message: "Mã xác thực không hợp lệ" },
        },
      },
    };

    await expect(responseErrorHandler(tamperedError)).rejects.toBeDefined();
    expect(refreshSpy).not.toHaveBeenCalled();
    expect(safeGetAuth()).toBeNull();
  });

  it("TEST 5 (AC-3): Disabled account must clear auth and reject without calling refresh", async () => {
    safeSetAuth({
      user: { userCode: "usr_1", email: "test@plotfarm.vn", fullName: "Test User", role: "CUSTOMER" },
      accessToken: "valid_token",
      refreshToken: "refresh_token",
    });

    const refreshSpy = vi.spyOn(axios, "post");
    const responseErrorHandler = getResponseErrorHandler();

    const disabledAccountError = {
      config: { url: "/profile", headers: {} },
      response: {
        status: 403,
        data: {
          success: false,
          error: { code: "ERR_ACCOUNT_DISABLED", message: "Tài khoản đã bị khóa" },
        },
      },
    };

    await expect(responseErrorHandler(disabledAccountError)).rejects.toBeDefined();
    expect(refreshSpy).not.toHaveBeenCalled();
    expect(safeGetAuth()).toBeNull();
  });

  it("TEST 7 (EH-1): Corrupted LocalStorage JSON must not crash and reset to Guest state", () => {
    localStorage.setItem(AUTH_STORAGE_KEY, "{ invalid json data: missing quotes ... ");

    const authState = safeGetAuth();

    expect(authState).toBeNull();
    expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
  });

  it("TEST 8: Refresh endpoint itself returning 401 must abort immediately and clear auth", async () => {
    safeSetAuth({
      user: { userCode: "usr_1", email: "test@plotfarm.vn", fullName: "Test User", role: "CUSTOMER" },
      accessToken: "expired_token",
      refreshToken: "expired_refresh_token",
    });

    const refreshSpy = vi.spyOn(axios, "post");
    const responseErrorHandler = getResponseErrorHandler();

    const refreshFailedError = {
      config: { url: `${API_BASE_URL}/auth/refresh`, headers: {} },
      response: {
        status: 401,
        data: {
          success: false,
          error: { code: "ERR_TOKEN_EXPIRED", message: "Refresh token đã hết hạn" },
        },
      },
    };

    await expect(responseErrorHandler(refreshFailedError)).rejects.toBeDefined();
    expect(refreshSpy).not.toHaveBeenCalled();
    expect(safeGetAuth()).toBeNull();
  });
});
