import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginRequestSchema, z, type LoginResponseData, type UserRole } from "@repo/shared";
import { AppError } from "@/shared/lib/errors/AppError";
import { useDebouncedCallback } from "@/shared/lib/hooks/useDebouncedCallback";
import { authApi } from "../api/authApi";
import { setAuthSession } from "./authCookie";
import { useGoogleAuth } from "./useGoogleAuth";
import {
  ROLE_HOME_ROUTES,
  AUTH_DEBOUNCE_MS,
  AUTH_ROUTES,
  getAuthErrorMessage,
} from "../constants";

export const LoginFormSchema = LoginRequestSchema.extend({
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;

export type LoginFormState = LoginFormValues;

export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export function useLoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isGoogleLoading,
    googleError,
    handleGoogleCredential,
    loginWithGoogle,
  } = useGoogleAuth();

  const completeLogin = (data: LoginResponseData) => {
    setAuthSession(data);
    const from = (location.state as { from?: { pathname?: string } })?.from
      ?.pathname;
    const roleHome =
      ROLE_HOME_ROUTES[data.user.role as UserRole] ?? AUTH_ROUTES.LOGIN;
    navigate(from || roleHome, { replace: true });
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
    resolver: zodResolver(LoginFormSchema),
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
    onChange: () => {
      clearErrors("root");
      debouncedTrigger("email");
    },
  });

  const registerPassword = register("password", {
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
