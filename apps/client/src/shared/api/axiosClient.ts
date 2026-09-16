import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL =
  (typeof process !== "undefined" && process.env?.VITE_API_URL) ||
  (typeof import.meta !== "undefined" &&
    (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_API_URL) ||
  "http://localhost:5000/api/v1";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _isRetry?: boolean;
}

/**
 * Đọc access token trực tiếp từ Cookie (greenfarm_at)
 */
function getStoredToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )greenfarm_at=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const customConfig = config as CustomAxiosRequestConfig;

    if (customConfig.url) {
      if (customConfig.url.startsWith("/api/v1/")) {
        customConfig.url = customConfig.url.replace(/^\/api\/v1/, "");
      } else if (customConfig.url === "/api/v1") {
        customConfig.url = "/";
      } else if (customConfig.url.startsWith("/api/")) {
        customConfig.url = customConfig.url.replace(/^\/api/, "");
      }
    }

    const token = getStoredToken();

    if (token && customConfig.headers && !customConfig.headers.Authorization) {
      customConfig.headers.Authorization = `Bearer ${token}`;
    }

    return customConfig;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
