import {
  AppError,
  type ApiResponseEnvelope,
} from "@/shared/lib/errors/AppError";
import type { ApiErrorResponse } from "@repo/shared";
import {
  GATEWAY_ENDPOINT,
  GATEWAY_TIMEOUT_MS,
  GATEWAY_HEADER_CORRELATION_ID,
  GATEWAY_HEADER_AUTHORIZATION,
  GATEWAY_ERROR_MESSAGES,
} from "./gateway.constants";
import { getAccessToken } from "@/auth/authStorage";
import { encryptPayload } from "./jwe";

export interface GatewayEnvelope<T = unknown> {
  action: string;
  payload?: T;
  timestamp: number;
}

/**
 * Dispatch một action tới single gateway endpoint `POST /api/gateway`.
 * - Native fetch, không cần axios.
 * - Response tuân theo ApiResponseEnvelope<T> từ @repo/shared.
 * - Lỗi normalize thành `AppError` (instanceof-safe).
 * - Auto-gắn X-Correlation-ID và Authorization Bearer nếu có AT.
 */
export async function dispatchAction<TReq = unknown, TRes = unknown>(
  action: string,
  payload?: TReq,
): Promise<TRes> {
  const correlationId = crypto.randomUUID();
  const token =
    getAccessToken() ||
    (typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("access_token")
      : null);

  const envelope: GatewayEnvelope<TReq> = {
    action,
    payload,
    timestamp: Date.now(),
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    [GATEWAY_HEADER_CORRELATION_ID]: correlationId,
    ...(token ? { [GATEWAY_HEADER_AUTHORIZATION]: `Bearer ${token}` } : {}),
  };

  // ── Mã hóa payload (JWE) trước khi gửi ──────────────────────────────────────
  const cipher = await encryptPayload(envelope);

  // ── Network ───────────────────────────────────────────────────────────────
  let res: Response;
  try {
    res = await fetch(GATEWAY_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({ cipher }),
      signal: AbortSignal.timeout(GATEWAY_TIMEOUT_MS),
    });
  } catch {
    throw AppError.fromUnknown(
      new Error(GATEWAY_ERROR_MESSAGES.ERR_NETWORK),
      "ERR_NETWORK",
    );
  }

  // ── Parse ─────────────────────────────────────────────────────────────────
  let body: ApiResponseEnvelope<TRes>;
  try {
    body = await res.json();
  } catch {
    throw AppError.fromUnknown(
      new Error(GATEWAY_ERROR_MESSAGES.ERR_PARSE),
      "ERR_PARSE",
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (!res.ok || "error" in body) {
    throw new AppError(body as ApiErrorResponse);
  }

  return body.data;
}
