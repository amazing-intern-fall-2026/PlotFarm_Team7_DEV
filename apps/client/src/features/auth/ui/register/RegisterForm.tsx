import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Box, Heading, Text, Button, Input } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { AUTH_ROUTES } from "../../constants";
import { useRegisterForm } from "../../model/useRegisterForm";
import { renderGoogleSignInButton } from "../../lib/googleIdentity";
import { GoogleIcon } from "../login/LoginForm";

export interface RegisterFormProps {
  onSwitchToLogin?: () => void;
  className?: string;
}

export function RegisterForm({ onSwitchToLogin, className }: RegisterFormProps) {
  const navigate = useNavigate();
  const handleSwitchToLogin = onSwitchToLogin ?? (() => navigate(AUTH_ROUTES.LOGIN));

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
    handleGoogleCredential,
    isSuccess,
    registeredEmail,
  } = useRegisterForm();

  const googleBtnRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (googleBtnRef.current) {
      void renderGoogleSignInButton(googleBtnRef.current, (credential) => {
        void handleGoogleCredential(credential);
      });
    }
  }, [handleGoogleCredential]);

  if (isSuccess) {
    return (
      <Box className="w-full space-y-6 text-left animate-in fade-in-50 duration-300">
        <Box className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center space-y-4 shadow-sm">
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

          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handleSwitchToLogin}
            className="w-full rounded-xl mt-4 font-bold shadow-md shadow-primary/20"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Đăng nhập ngay
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      noValidate
      className={cn("w-full space-y-3.5 xl:space-y-4 text-left", className)}
    >
      {/* ── Tiêu đề chính ── */}
      <Box className="space-y-1.5 text-left">
        <Heading
          level={1}
          className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight"
        >
          Khai phá tiềm năng của bạn
        </Heading>
        <Text
          variant="muted"
          className="text-sm sm:text-base text-muted-foreground leading-relaxed"
        >
          Tạo tài khoản để truy cập vào kho tài nguyên học thuật độc quyền của chúng tôi.
        </Text>
      </Box>

      {/* ── Thông báo lỗi chung nếu có ── */}
      {errors.general && (
        <Box className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 text-destructive" />
          <span>{errors.general}</span>
        </Box>
      )}

      {/* ── Field 1: Họ và tên ── */}
      <Input
        id="register-fullname"
        type="text"
        label="Họ và tên"
        placeholder="Nguyen Van A"
        autoComplete="name"
        error={errors.fullName}
        disabled={isLoading}
        className="h-11 sm:h-12 rounded-xl text-sm sm:text-base"
        {...registerFullName}
      />

      {/* ── Field 2: Địa chỉ Email ── */}
      <Input
        id="register-email"
        type="email"
        label="Địa chỉ Email"
        placeholder="example@academic.edu"
        autoComplete="email"
        error={errors.email}
        disabled={isLoading}
        className="h-11 sm:h-12 rounded-xl text-sm sm:text-base"
        {...registerEmail}
      />

      {/* ── Field 3: Mật khẩu ── */}
      <Input
        id="register-password"
        type="password"
        label="Mật khẩu"
        placeholder="••••••••"
        autoComplete="new-password"
        error={errors.password}
        showPasswordToggle
        disabled={isLoading}
        className="h-11 sm:h-12 rounded-xl text-sm sm:text-base"
        {...registerPassword}
      />

      {/* ── Field 4: Xác nhận mật khẩu ── */}
      <Input
        id="register-confirm-password"
        type="password"
        label="Xác nhận mật khẩu"
        placeholder="••••••••"
        autoComplete="new-password"
        error={errors.confirmPassword}
        showPasswordToggle
        disabled={isLoading}
        className="h-11 sm:h-12 rounded-xl text-sm sm:text-base"
        {...registerConfirmPassword}
      />

      {/* ── Checkbox: Đồng ý điều khoản dịch vụ ── */}
      <Box className="space-y-1 pt-1">
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-foreground select-none">
          <input
            id="register-terms"
            type="checkbox"
            className="mt-0.5 h-4.5 w-4.5 accent-primary rounded border-input cursor-pointer"
            disabled={isLoading}
            {...registerAgreeTerms}
          />
          <span className="text-sm text-muted-foreground leading-snug">
            Tôi đồng ý với{" "}
            <Link
              to="/terms"
              className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
            >
              Điều khoản dịch vụ
            </Link>
          </span>
        </label>
        {errors.agreeTerms && (
          <p className="text-xs font-medium text-destructive pl-7">
            {errors.agreeTerms}
          </p>
        )}
        <Text variant="muted" className="text-xs text-muted-foreground pl-7 leading-relaxed">
          Chính sách áp dụng: Chính sách dành cho Mentee phiên bản 1.0, hiệu lực từ 31/7/2026.
        </Text>
      </Box>

      {/* ── Nút Tạo tài khoản mới → (Primary Design System Button) ── */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full h-12 rounded-xl text-base sm:text-lg font-bold shadow-md shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-[0.99] flex items-center justify-center text-center mt-2"
        isLoading={isLoading}
        rightIcon={<ArrowRight className="h-5 w-5" />}
      >
        Tạo tài khoản mới
      </Button>

      {/* ── Link Đăng nhập ── */}
      <Box className="text-center text-sm sm:text-base text-muted-foreground pt-1">
        <span>Bạn đã có tài khoản? </span>
        <button
          type="button"
          onClick={handleSwitchToLogin}
          className="font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Đăng nhập
        </button>
      </Box>

      {/* ── Divider ── */}
      <Box className="flex items-center my-3 sm:my-3.5">
        <Box className="flex-1 border-t border-border" />
        <span className="px-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground whitespace-nowrap select-none">
          HOẶC ĐĂNG KÝ NHANH VỚI
        </span>
        <Box className="flex-1 border-t border-border" />
      </Box>

      {/* ── Google SSO Button (Consistent with LoginForm) ── */}
      <Box className="relative w-full pt-0.5 rounded-xl overflow-hidden">
        <button
          type="button"
          disabled={isLoading || isGoogleLoading}
          onClick={() => void loginWithGoogle()}
          className={cn(
            "w-full h-11 sm:h-12 flex items-center justify-center gap-3 px-4 rounded-xl",
            "border border-input bg-background hover:bg-muted/60 text-foreground font-medium text-sm sm:text-base",
            "shadow-xs hover:shadow transition-all active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed",
          )}
        >
          <GoogleIcon />
          <span>
            {isGoogleLoading ? "Đang xác thực Google..." : "Google"}
          </span>
        </button>

        {/* Overlay Google Button chính thức để trigger One Tap / popup */}
        <div
          ref={googleBtnRef}
          className={cn(
            "absolute inset-0 opacity-0 cursor-pointer overflow-hidden z-10",
            "[&_iframe]:!w-full [&_iframe]:!h-full [&_iframe]:!scale-110",
            (isLoading || isGoogleLoading) && "pointer-events-none",
          )}
          tabIndex={-1}
          aria-hidden="true"
        />
      </Box>
    </Box>
  );
}
