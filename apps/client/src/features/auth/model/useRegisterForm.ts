import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z, type LoginResponseData, type UserRole } from "@repo/shared";
import { AppError } from "@/shared/lib/errors/AppError";
import { useDebouncedCallback } from "@/shared/lib/hooks/useDebouncedCallback";
import { authApi } from "../api/authApi";
import { promptGoogleSignIn } from "../lib/googleIdentity";
import { setAuthSession } from "./authCookie";
import {
  ROLE_HOME_ROUTES,
  AUTH_DEBOUNCE_MS,
  AUTH_ROUTES,
  getAuthErrorMessage,
} from "../constants";

export const RegisterFormSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Họ và tên phải có ít nhất 2 ký tự")
      .max(50, "Họ và tên không được vượt quá 50 ký tự"),
    email: z
      .string()
      .min(1, "Địa chỉ email không được để trống")
      .email("Địa chỉ email không đúng định dạng"),
    password: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(100, "Mật khẩu quá dài"),
    confirmPassword: z
      .string()
      .min(1, "Vui lòng xác nhận mật khẩu"),
    agreeTerms: z
      .boolean()
      .refine((val) => val === true, "Bạn cần đồng ý với Điều khoản dịch vụ"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không trùng khớp",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

export function useRegisterForm(onSuccessCallback?: () => void) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string | undefined>();
  const [userCode, setUserCode] = useState<string | undefined>();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setGeneralError(undefined);
    setIsLoading(true);

    try {
      const result = await authApi.register({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });

      setIsSuccess(true);
      setRegisteredEmail(values.email);
      setUserCode(result.userCode);
      onSuccessCallback?.();
    } catch (err) {
      if (err instanceof AppError) {
        setGeneralError(getAuthErrorMessage(err.errorCode));
      } else if (err instanceof Error) {
        setGeneralError(err.message);
      } else {
        setGeneralError("Đăng ký tài khoản không thành công. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSubmit = useDebouncedCallback(onSubmit, AUTH_DEBOUNCE_MS);

  // ── Xử lý đăng ký / đăng nhập nhanh bằng Google ──────────────────────────
  const handleGoogleCredential = async (idToken: string) => {
    setGeneralError(undefined);
    setIsGoogleLoading(true);
    try {
      const data: LoginResponseData = await authApi.loginGoogle(idToken);
      setAuthSession(data);
      const roleHome = ROLE_HOME_ROUTES[data.user.role as UserRole] ?? AUTH_ROUTES.LOGIN;
      navigate(roleHome, { replace: true });
    } catch (err) {
      if (err instanceof AppError) {
        setGeneralError(getAuthErrorMessage(err.errorCode));
      } else if (err instanceof Error) {
        setGeneralError(err.message);
      } else {
        setGeneralError("Đăng nhập bằng Google thất bại. Vui lòng thử lại.");
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setGeneralError(undefined);
    setIsGoogleLoading(true);
    try {
      await promptGoogleSignIn((idToken) => {
        void handleGoogleCredential(idToken);
      });
    } catch (err) {
      if (err instanceof AppError) {
        setGeneralError(getAuthErrorMessage(err.errorCode));
      } else if (err instanceof Error) {
        setGeneralError(err.message);
      } else {
        setGeneralError(getAuthErrorMessage("ERR_UNKNOWN"));
      }
      setIsGoogleLoading(false);
    }
  };

  const errors = {
    fullName: formErrors.fullName?.message,
    email: formErrors.email?.message,
    password: formErrors.password?.message,
    confirmPassword: formErrors.confirmPassword?.message,
    agreeTerms: formErrors.agreeTerms?.message,
    general: generalError,
  };

  return {
    registerFullName: register("fullName"),
    registerEmail: register("email"),
    registerPassword: register("password"),
    registerConfirmPassword: register("confirmPassword"),
    registerAgreeTerms: register("agreeTerms"),
    handleSubmit: hookFormSubmit((data) => debouncedSubmit(data)),
    errors,
    isLoading,
    isGoogleLoading,
    loginWithGoogle,
    handleGoogleCredential,
    isSuccess,
    registeredEmail,
    userCode,
    generalError,
    reset,
  };
}
