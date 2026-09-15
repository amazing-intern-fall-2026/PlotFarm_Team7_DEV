import { compactDecrypt, importPKCS8 } from "jose";

/**
 * Giải mã payload JWE (RSA-OAEP-256) gửi từ FE. Chỉ BE giữ Private Key.
 */
export async function decryptPayload<T>(jweString: string): Promise<T> {
  const privateKeyPem = process.env.JWE_PRIVATE_KEY;
  if (!privateKeyPem) {
    throw new Error("JWE_PRIVATE_KEY chưa được cấu hình.");
  }

  const privateKey = await importPKCS8(privateKeyPem, "RSA-OAEP-256");
  const { plaintext } = await compactDecrypt(jweString, privateKey);

  return JSON.parse(new TextDecoder().decode(plaintext)) as T;
}
