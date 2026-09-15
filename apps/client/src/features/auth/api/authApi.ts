import type {
  LoginRequest,
  LoginResponseData,
  RegisterRequest,
  RegisterResponseData,
  VerifyEmailRequest,
  ResendOtpRequest,
  ResendOtpResponseData,
} from "@repo/shared";
import { dispatchAction } from "@/shared/api/gateway";

export const authApi = {
  /**
   * Đăng nhập thủ công (email + password).
   */
  login: (email: string, password: string) =>
    dispatchAction<LoginRequest, LoginResponseData>("auth.login", {
      email,
      password,
    }),

  /**
   * Đăng nhập bằng Google (nhận ID Token từ Google Identity Services).
   */
  loginGoogle: (idToken: string) =>
    dispatchAction<{ idToken: string }, LoginResponseData>("auth.google", {
      idToken,
    }),

  /**
   * Đăng ký tài khoản người dùng mới.
   */
  register: (data: RegisterRequest) =>
    dispatchAction<RegisterRequest, RegisterResponseData>("auth.register", data),

  /**
   * Xác thực email bằng mã OTP 6 số.
   */
  verifyEmail: (email: string, otpCode: string) =>
    dispatchAction<VerifyEmailRequest, LoginResponseData>("auth.verifyEmail", {
      email,
      otpCode,
    }),

  /**
   * Gửi lại mã OTP xác thực email (cooldown 60s).
   */
  resendOtp: (email: string) =>
    dispatchAction<ResendOtpRequest, ResendOtpResponseData>("auth.resendOtp", {
      email,
    }),
};
