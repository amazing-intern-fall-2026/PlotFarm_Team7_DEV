import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Box, Heading, Text, Button } from "@/shared/ui";
import { useRegisterForm } from "../model/useRegisterForm";

import { GoogleIcon } from "./LoginForm";

export interface RegisterFormProps {
  onSwitchToLogin?: () => void;
  className?: string;
}

export function RegisterForm({ onSwitchToLogin, className }: RegisterFormProps) {
  const {
    registerFullName,
    registerEmail,
    registerPassword,
    registerConfirmPassword,
    registerAgreeTerms,
    handleSubmit,
    errors,
    isLoading,
    isGoogleLoading,
    loginWithGoogle,
    isSuccess,
    registeredEmail,
    generalError,
  } = useRegisterForm();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  if (isSuccess) {
    return (
      <Box className="w-full space-y-6 text-left animate-in fade-in-50 duration-300">
        <Box className="rounded-3xl border border-primary/30 bg-primary/5 p-8 text-center space-y-4 shadow-sm">
          <Box className="h-16 w-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-inner">
            <CheckCircle2 className="h-10 w-10" />
          </Box>
          <Box className="space-y-1">
            <Heading level={2} className="text-2xl font-extrabold text-foreground">
              Đăng ký thành công!
            </Heading>
            <Text className="text-sm text-muted-foreground leading-relaxed">
              Mã kích hoạt tài khoản đã được gửi đến hộp thư:
            </Text>
            <Text className="text-sm font-bold text-primary break-all">
              {registeredEmail}
            </Text>
          </Box>

          <Text variant="muted" className="text-xs sm:text-sm text-muted-foreground pt-2">
            Vui lòng kiểm tra email của bạn để hoàn tất kích hoạt tài khoản và bắt đầu canh tác cùng Green Farm.
          </Text>

          {onSwitchToLogin && (
            <Button
              type="button"
              variant="default"
              size="lg"
              onClick={onSwitchToLogin}
              className="w-full rounded-full mt-4 font-bold shadow-md shadow-primary/20 bg-primary hover:bg-primary/90 text-white"
            >
              <span>Đăng nhập ngay</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Box className={`w-full space-y-5 text-left ${className || ""}`}>
      {/* ── Tiêu đề chính ── */}
      <Box className="space-y-1.5">
        <Heading
          level={1}
          className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight"
        >
          Khai phá tiềm năng của bạn
        </Heading>
        <Text
          variant="muted"
          className="text-sm text-muted-foreground leading-relaxed"
        >
          Tạo tài khoản để truy cập vào kho tài nguyên nông nghiệp thông minh độc quyền của chúng tôi.
        </Text>
      </Box>

      {/* ── Thông báo lỗi chung nếu có ── */}
      {generalError && (
        <Box
          role="alert"
          className="rounded-2xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm font-medium text-destructive animate-in fade-in-50"
        >
          {generalError}
        </Box>
      )}

      {/* ── Form Đăng Ký ── */}
      <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
        {/* Field 1: Họ và tên */}
        <Box className="space-y-1">
          <label className="text-sm font-bold text-foreground block">
            Họ và tên
          </label>
          <input
            type="text"
            placeholder="Nguyen Van A"
            autoComplete="name"
            disabled={isLoading}
            className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all outline-none ${
              errors.fullName
                ? "border-destructive focus:ring-2 focus:ring-destructive/20"
                : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
            }`}
            {...registerFullName}
          />
          {errors.fullName && (
            <p className="text-xs font-medium text-destructive mt-1">{errors.fullName}</p>
          )}
        </Box>

        {/* Field 2: Địa chỉ Email */}
        <Box className="space-y-1">
          <label className="text-sm font-bold text-foreground block">
            Địa chỉ Email
          </label>
          <input
            type="email"
            placeholder="example@greenfarm.vn"
            autoComplete="email"
            disabled={isLoading}
            className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all outline-none ${
              errors.email
                ? "border-destructive focus:ring-2 focus:ring-destructive/20"
                : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
            }`}
            {...registerEmail}
          />
          {errors.email && (
            <p className="text-xs font-medium text-destructive mt-1">{errors.email}</p>
          )}
        </Box>

        {/* Field 3: Mật khẩu */}
        <Box className="space-y-1">
          <label className="text-sm font-bold text-foreground block">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={isLoading}
              className={`w-full rounded-2xl border bg-white pl-4 pr-11 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all outline-none ${
                errors.password
                  ? "border-destructive focus:ring-2 focus:ring-destructive/20"
                  : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
              {...registerPassword}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs font-medium text-destructive mt-1">{errors.password}</p>
          )}
        </Box>

        {/* Field 4: Xác nhận mật khẩu */}
        <Box className="space-y-1">
          <label className="text-sm font-bold text-foreground block">
            Xác nhận mật khẩu
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={isLoading}
              className={`w-full rounded-2xl border bg-white pl-4 pr-11 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all outline-none ${
                errors.confirmPassword
                  ? "border-destructive focus:ring-2 focus:ring-destructive/20"
                  : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
              {...registerConfirmPassword}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label={showConfirmPassword ? "Ẩn mật khẩu xác nhận" : "Hiện mật khẩu xác nhận"}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs font-medium text-destructive mt-1">{errors.confirmPassword}</p>
          )}
        </Box>

        {/* Checkbox: Đồng ý điều khoản dịch vụ */}
        <Box className="pt-1">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 rounded-md border-slate-300 text-primary focus:ring-primary/30 accent-primary cursor-pointer"
              {...registerAgreeTerms}
            />
            <span className="text-sm text-foreground leading-snug">
              Tôi đồng ý với{" "}
              <Link
                to="/terms"
                className="font-bold text-primary hover:underline transition-all"
              >
                Điều khoản dịch vụ
              </Link>
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="text-xs font-medium text-destructive mt-1 pl-8">{errors.agreeTerms}</p>
          )}

          <p className="text-[11px] text-muted-foreground leading-relaxed mt-2 pl-8">
            Chính sách áp dụng: Chính sách bảo mật & Hợp đồng canh tác Green Farm phiên bản 1.0, hiệu lực từ 2026.
          </p>
        </Box>

        {/* Nút Tạo tài khoản mới → (Theme Green Farm) */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-full text-base font-bold shadow-md shadow-primary/25 bg-primary hover:bg-primary/90 text-white transition-all transform active:scale-[0.99] mt-2 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Đang khởi tạo tài khoản...
            </span>
          ) : (
            <>
              <span>Tạo tài khoản mới</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
      </form>

      {/* ── Link Đăng nhập ── */}
      {onSwitchToLogin && (
        <Box className="text-center text-sm text-muted-foreground pt-1">
          <span>Bạn đã có tài khoản? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-bold text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            Đăng nhập
          </button>
        </Box>
      )}

      {/* ── Divider ── */}
      <Box className="relative my-4">
        <Box className="absolute inset-0 flex items-center">
          <Box className="w-full border-t border-border/60" />
        </Box>
        <Box className="relative flex justify-center text-[11px] uppercase font-bold tracking-wider text-muted-foreground">
          <span className="bg-background px-3">HOẶC ĐĂNG KÝ NHANH VỚI</span>
        </Box>
      </Box>

      {/* ── Google SSO Button (Bo viền chuẩn Theme Xanh) ── */}
      <button
        type="button"
        onClick={loginWithGoogle}
        disabled={isGoogleLoading || isLoading}
        className="w-full h-12 rounded-full border-2 border-primary text-foreground font-semibold flex items-center justify-center gap-3 hover:bg-primary/5 active:scale-[0.99] transition-all disabled:opacity-50 shadow-sm"
      >
        <GoogleIcon />
        <span className="text-sm font-semibold">Google</span>
      </button>
    </Box>
  );
}
