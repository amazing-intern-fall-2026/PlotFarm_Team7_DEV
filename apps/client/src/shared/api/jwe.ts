import { CompactEncrypt, importSPKI } from "jose";

const PUBLIC_KEY_PEM = import.meta.env?.VITE_JWE_PUBLIC_KEY as
  | string
  | undefined;

export function isJweConfigured(): boolean {
  return Boolean(PUBLIC_KEY_PEM && PUBLIC_KEY_PEM.trim().length > 0);
}

/**
 * Mã hóa payload bằng RSA-OAEP-256 (JWE) trước khi gửi lên Gateway.
 * Chỉ FE giữ Public Key — không ai (kể cả F12 Network) đọc được nội dung gốc.
 */
export async function encryptPayload<T>(data: T): Promise<string> {
  if (!PUBLIC_KEY_PEM) {
    throw new Error("VITE_JWE_PUBLIC_KEY chưa được cấu hình.");
  }

  const publicKey = await importSPKI(PUBLIC_KEY_PEM, "RSA-OAEP-256");
  const payloadBytes = new TextEncoder().encode(JSON.stringify(data));

  return new CompactEncrypt(payloadBytes)
    .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
    .encrypt(publicKey);
}
