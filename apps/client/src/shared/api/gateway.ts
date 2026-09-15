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
import { encryptPayload, isJweConfigured } from "./jwe";

export interface GatewayEnvelope<T = unknown> {
  action: string;
  payload?: T;
  timestamp: number;
}

/**
 * Đọc access token trực tiếp từ Cookie (greenfarm_at)
 */
function getStoredToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )greenfarm_at=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Dispatch một action tới single gateway endpoint `POST /api/gateway`.
 * - Native fetch, không cần axios.
 * - Response tuân theo ApiResponseEnvelope<T> từ @repo/shared.
 * - Lỗi normalize thành `AppError` (instanceof-safe).
 * - Tự động đính kèm Cookie token vào Authorization Bearer nếu có.
 */
export async function dispatchAction<TReq = unknown, TRes = unknown>(
  action: string,
  payload?: TReq,
): Promise<TRes> {
  const correlationId = crypto.randomUUID();
  const token = getStoredToken();

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

  // ── Mã hóa payload (JWE) nếu có Public Key cấu hình; Fallback gửi raw envelope ──
  let bodyPayload: string;
  if (isJweConfigured()) {
    try {
      const cipher = await encryptPayload(envelope);
      bodyPayload = JSON.stringify({ cipher });
    } catch (encryptErr) {
      console.warn(
        "[Gateway] Mã hóa JWE thất bại, fallback gửi envelope dạng thô:",
        encryptErr,
      );
      bodyPayload = JSON.stringify(envelope);
    }
  } else {
    bodyPayload = JSON.stringify(envelope);
  }

  // ── Network ───────────────────────────────────────────────────────────────
  let res: Response;
  try {
    res = await fetch(GATEWAY_ENDPOINT, {
      method: "POST",
      headers,
      body: bodyPayload,
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
