import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { LoginResponseData, UserRole } from "@repo/shared";
import { AppError } from "@/shared/lib/errors/AppError";
import { authApi } from "../api/authApi";
import { promptGoogleSignIn } from "../lib/googleIdentity";
import { setAuthSession } from "./authCookie";
import {
  ROLE_HOME_ROUTES,
  AUTH_ROUTES,
  getAuthErrorMessage,
} from "../constants";

export interface UseGoogleAuthOptions {
  onSuccess?: (data: LoginResponseData) => void;
  onError?: (errorMessage: string) => void;
}

export function useGoogleAuth(options?: UseGoogleAuthOptions) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | undefined>();

  const completeLogin = useCallback(
    (data: LoginResponseData) => {
      // Đồng bộ cả SSOT LocalStorage lẫn SessionStorage
      setAuthSession(data);
      options?.onSuccess?.(data);

      const from = (location.state as { from?: { pathname?: string } })?.from
        ?.pathname;
      const roleHome =
        ROLE_HOME_ROUTES[data.user.role as UserRole] ?? AUTH_ROUTES.LOGIN;
      navigate(from || roleHome, { replace: true });
    },
    [navigate, location.state, options]
  );

  const handleGoogleCredential = useCallback(
    async (idToken: string) => {
      setGoogleError(undefined);
      setIsGoogleLoading(true);
      try {
        const data = await authApi.loginGoogle(idToken);
        completeLogin(data);
      } catch (err) {
        let msg = "";
        if (err instanceof AppError) {
          msg = getAuthErrorMessage(err.errorCode);
        } else if (err instanceof Error) {
          msg = err.message;
        } else {
          msg = getAuthErrorMessage("ERR_UNKNOWN");
        }
        setGoogleError(msg);
        options?.onError?.(msg);
      } finally {
        setIsGoogleLoading(false);
      }
    },
    [completeLogin, options]
  );

  const loginWithGoogle = useCallback(async () => {
    setGoogleError(undefined);
    setIsGoogleLoading(true);
    try {
      await promptGoogleSignIn((idToken) => {
        void handleGoogleCredential(idToken);
      });
    } catch (err) {
      let msg = "";
      if (err instanceof AppError) {
        msg = getAuthErrorMessage(err.errorCode);
      } else if (err instanceof Error) {
        msg = err.message;
      } else {
        msg = getAuthErrorMessage("ERR_UNKNOWN");
      }
      setGoogleError(msg);
      options?.onError?.(msg);
      setIsGoogleLoading(false);
    }
  }, [handleGoogleCredential, options]);

  return {
    isGoogleLoading,
    googleError,
    setGoogleError,
    handleGoogleCredential,
    loginWithGoogle,
  };
}
