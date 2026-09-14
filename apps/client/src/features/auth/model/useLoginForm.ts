import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import type { LoginResponseData, UserRole } from "@repo/shared";
import { AppError } from "@/shared/lib/errors/AppError";
import { useDebouncedCallback } from "@/shared/lib/hooks/useDebouncedCallback";
import { authApi } from "../api/authApi";
import { promptGoogleSignIn } from "../lib/googleIdentity";
import {
  SESSION_KEYS,
  ROLE_HOME_ROUTES,
  AUTH_VALIDATION,
  AUTH_VALIDATION_MESSAGES,
  AUTH_DEBOUNCE_MS,
  AUTH_ROUTES,
  getAuthErrorMessage,
} from "../constants";

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export type LoginFormState = LoginFormValues;

export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export function useLoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | undefined>();

  const completeLogin = (data: LoginResponseData) => {
    sessionStorage.setItem(SESSION_KEYS.ACCESS_TOKEN, data.accessToken);
    sessionStorage.setItem(SESSION_KEYS.REFRESH_TOKEN, data.refreshToken);
    sessionStorage.setItem(SESSION_KEYS.USER, JSON.stringify(data.user));

    const from = (location.state as { from?: { pathname?: string } })?.from
      ?.pathname;
    const roleHome =
      ROLE_HOME_ROUTES[data.user.role as UserRole] ?? AUTH_ROUTES.LOGIN;
    navigate(from || roleHome, { replace: true });
  };

  const handleGoogleCredential = async (idToken: string) => {
    setGoogleError(undefined);
    setIsGoogleLoading(true);
    try {
      const data = await authApi.loginGoogle(idToken);
      completeLogin(data);
    } catch (err) {
      if (err instanceof AppError) {
        setGoogleError(getAuthErrorMessage(err.errorCode));
      } else if (err instanceof Error) {
        setGoogleError(err.message);
      } else {
        setGoogleError(getAuthErrorMessage("ERR_UNKNOWN"));
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setGoogleError(undefined);
    setIsGoogleLoading(true);
    try {
      await promptGoogleSignIn((idToken) => {
        void handleGoogleCredential(idToken);
      });
    } catch (err) {
      if (err instanceof AppError) {
        setGoogleError(getAuthErrorMessage(err.errorCode));
      } else if (err instanceof Error) {
        setGoogleError(err.message);
      } else {
        setGoogleError(getAuthErrorMessage("ERR_UNKNOWN"));
      }
      setIsGoogleLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    trigger,
    clearErrors,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const debouncedTrigger = useDebouncedCallback(
    (name: "email" | "password") => {
      void trigger(name);
    },
    AUTH_DEBOUNCE_MS
  );

  const registerEmail = register("email", {
    validate: {
      notEmpty: (val: string) =>
        (val && val.trim().length > 0) || AUTH_VALIDATION_MESSAGES.EMAIL_REQUIRED,
      validEmail: (val: string) =>
        AUTH_VALIDATION.EMAIL_REGEX.test(val?.trim() || "") ||
        AUTH_VALIDATION_MESSAGES.EMAIL_INVALID,
    },
    onChange: () => {
      clearErrors("root");
      debouncedTrigger("email");
    },
  });

  const registerPassword = register("password", {
    validate: {
      notEmpty: (val: string) =>
        (val && val.length > 0) || AUTH_VALIDATION_MESSAGES.PASSWORD_REQUIRED,
      minLength: (val: string) =>
        (val && val.length >= AUTH_VALIDATION.PASSWORD_MIN_LENGTH) ||
        AUTH_VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH,
    },
    onChange: () => {
      clearErrors("root");
      debouncedTrigger("password");
    },
  });

  const registerRememberMe = register("rememberMe");

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const data = await authApi.login(
        values.email.trim().toLowerCase(),
        values.password
      );
      completeLogin(data);
    } catch (err) {
      const appErr = AppError.fromUnknown(err);
      setError("root", {
        type: "server",
        message: getAuthErrorMessage(appErr.errorCode),
      });
    }
  };

  return {
    register,
    registerEmail,
    registerPassword,
    registerRememberMe,
    handleSubmit: handleSubmit(onSubmit),
    errors: {
      email: errors.email?.message,
      password: errors.password?.message,
      general: errors.root?.message ?? googleError,
    },
    formErrors: errors,
    isLoading: isSubmitting,
    debouncedTrigger,
    setValue,
    loginWithGoogle,
    handleGoogleCredential,
    isGoogleLoading,
  };
}
