import type { AuthPayload } from "@repo/shared";

export type AuthUserPayload = AuthPayload;

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
      userId?: string;
      userRole?: string;
    }
  }
}
