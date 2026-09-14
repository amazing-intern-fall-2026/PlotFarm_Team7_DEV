import { z } from "zod";

export const USER_ROLES = ["CUSTOMER", "STAFF", "ADMIN"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const UserSchema = z.object({
  userCode: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  role: z.enum(USER_ROLES),
  isVerified: z.boolean(),
  preferredLocale: z.string().optional(),
  avatarUrl: z.string().url().nullable().optional(),
});
export type User = z.infer<typeof UserSchema>;

export const RegisterRequestSchema = z.object({
  email: z.string().email("Email không đúng định dạng"),
  phone: z.string().optional(),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  fullName: z.string().min(2, "Tên người dùng phải có ít nhất 2 ký tự"),
  preferredLocale: z.string().optional(),
});
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const RegisterResponseDataSchema = z.object({
  userCode: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  role: z.enum(USER_ROLES),
  isVerified: z.boolean(),
});
export type RegisterResponseData = z.infer<typeof RegisterResponseDataSchema>;

export const VerifyEmailRequestSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập địa chỉ email")
    .email("Email không đúng định dạng"),
  otpCode: z.string().length(6, "Mã OTP phải gồm 6 chữ số"),
});
export type VerifyEmailRequest = z.infer<typeof VerifyEmailRequestSchema>;

export const ResendOtpRequestSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập địa chỉ email")
    .email("Email không đúng định dạng"),
});
export type ResendOtpRequest = z.infer<typeof ResendOtpRequestSchema>;

export const ResendOtpResponseDataSchema = z.object({
  emailSent: z.boolean(),
  cooldownSeconds: z.number(),
});
export type ResendOtpResponseData = z.infer<typeof ResendOtpResponseDataSchema>;

export const LoginRequestSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập địa chỉ email")
    .email("Email không đúng định dạng"),
  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseDataSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: UserSchema.pick({
    userCode: true,
    email: true,
    fullName: true,
    role: true,
    preferredLocale: true,
    avatarUrl: true,
  }),
});
export type LoginResponseData = z.infer<typeof LoginResponseDataSchema>;

export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
});
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;

export const RefreshTokenResponseDataSchema = z.object({
  accessToken: z.string(),
});
export type RefreshTokenResponseData = z.infer<
  typeof RefreshTokenResponseDataSchema
>;

export const LogoutRequestSchema = z.object({
  refreshToken: z.string(),
});
export type LogoutRequest = z.infer<typeof LogoutRequestSchema>;

export const LogoutResponseDataSchema = z.object({
  loggedOut: z.boolean(),
});
export type LogoutResponseData = z.infer<typeof LogoutResponseDataSchema>;

export const ForgotPasswordRequestSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập địa chỉ email")
    .email("Email không đúng định dạng"),
});
export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordRequestSchema>;

export const ForgotPasswordResponseDataSchema = z.object({
  emailSent: z.boolean(),
  expiresInMinutes: z.number(),
});
export type ForgotPasswordResponseData = z.infer<
  typeof ForgotPasswordResponseDataSchema
>;

export const ResetPasswordRequestSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập địa chỉ email")
    .email("Email không đúng định dạng"),
  otpCode: z.string().min(1, "Vui lòng nhập mã OTP"),
  newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
});
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;

export const ResetPasswordResponseDataSchema = z.object({
  passwordResetSuccess: z.boolean(),
});
export type ResetPasswordResponseData = z.infer<
  typeof ResetPasswordResponseDataSchema
>;

export const ChangePasswordRequestSchema = z.object({
  currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
  newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
});
export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>;

export const ChangePasswordResponseDataSchema = z.object({
  passwordChanged: z.boolean(),
});
export type ChangePasswordResponseData = z.infer<
  typeof ChangePasswordResponseDataSchema
>;

export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.string(),
  fullName: z.string().optional(),
});
export type AuthUser = z.infer<typeof AuthUserSchema>;

export const AuthTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
});
export type AuthTokens = z.infer<typeof AuthTokensSchema>;

export const AuthPayloadSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  role: z.string(),
});
export type AuthPayload = z.infer<typeof AuthPayloadSchema>;

