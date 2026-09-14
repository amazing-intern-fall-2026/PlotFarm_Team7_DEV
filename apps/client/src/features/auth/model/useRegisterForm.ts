import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "@repo/shared";
import { AppError } from "@/shared/lib/errors/AppError";
import { useDebouncedCallback } from "@/shared/lib/hooks/useDebouncedCallback";
import { authApi } from "../api/authApi";
import { AUTH_DEBOUNCE_MS, getAuthErrorMessage } from "../constants";

export const RegisterFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Tên người dùng phải có ít nhất 2 ký tự")
    .max(50, "Tên người dùng không được vượt quá 50 ký tự"),
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không đúng định dạng"),
  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(100, "Mật khẩu quá dài"),
});

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

export interface UseRegisterFormReturn {
  registerFullName: ReturnType<typeof useForm<RegisterFormValues>>["register"];
  registerEmail: ReturnType<typeof useForm<RegisterFormValues>>["register"];
  registerPassword: ReturnType<typeof useForm<RegisterFormValues>>["register"];
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: Record<string, string | undefined>;
  isLoading: boolean;
  isSuccess: boolean;
  registeredEmail?: string;
  userCode?: string;
  generalError?: string;
  reset: () => void;
}

export function useRegisterForm(onSuccessCallback?: () => void) {
  const [isLoading, setIsLoading] = useState(false);
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

  const errors = {
    fullName: formErrors.fullName?.message,
    email: formErrors.email?.message,
    password: formErrors.password?.message,
    general: generalError,
  };

  return {
    registerFullName: register("fullName"),
    registerEmail: register("email"),
    registerPassword: register("password"),
    handleSubmit: hookFormSubmit((data) => debouncedSubmit(data)),
    errors,
    isLoading,
    isSuccess,
    registeredEmail,
    userCode,
    generalError,
    reset,
  };
}
