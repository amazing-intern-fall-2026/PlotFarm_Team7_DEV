import { OAuth2Client } from "google-auth-library";

export interface GoogleProfile {
  googleId: string;
  email: string;
  emailVerified: boolean;
  fullName: string;
  avatarUrl?: string;
}

/**
 * Verify ID Token do Google Identity Services trả về ở FE.
 * Ném lỗi nếu token không hợp lệ hoặc sai audience (Client ID).
 */
export async function verifyGoogleIdToken(idToken: string): Promise<GoogleProfile> {
  const googleClientId =
    process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    throw new Error("GOOGLE_CLIENT_ID chưa được cấu hình.");
  }

  const client = new OAuth2Client(googleClientId);
  const ticket = await client.verifyIdToken({
    idToken,
    audience: googleClientId,
  });

  const payload = ticket.getPayload();
  if (!payload || !payload.sub || !payload.email) {
    throw new Error("Google ID token không hợp lệ.");
  }

  return {
    googleId: payload.sub,
    email: payload.email,
    emailVerified: payload.email_verified ?? false,
    fullName: payload.name ?? payload.email,
    avatarUrl: payload.picture,
  };
}
