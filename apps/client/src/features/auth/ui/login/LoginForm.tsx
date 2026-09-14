import * as React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Box, Heading, Text, Button, Input } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { AUTH_ROUTES, AUTH_UI_TEXT } from "../../constants";
import { useLoginForm } from "../../model/useLoginForm";
import { renderGoogleSignInButton } from "../../lib/googleIdentity";

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export interface LoginFormProps {
  onSwitchToRegister?: () => void;
  className?: string;
}

export function LoginForm({ onSwitchToRegister, className }: LoginFormProps) {
  const {
    registerEmail,
    registerPassword,
    registerRememberMe,
    handleSubmit,
    errors,
    isLoading,
    setValue,
    loginWithGoogle,
    handleGoogleCredential,
    isGoogleLoading,
  } = useLoginForm();

  const googleBtnRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (googleBtnRef.current) {
      void renderGoogleSignInButton(googleBtnRef.current, (credential) => {
        void handleGoogleCredential(credential);
      });
    }
  }, [handleGoogleCredential]);

  const fillAccount = (email: string) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", "12345678", { shouldValidate: true });
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      noValidate
      className={cn("w-full space-y-3.5 xl:space-y-4", className)}
    >
      {/* Title & Subtitle */}
      <Box className="space-y-1.5 text-left">
        <Heading
          level={1}
          className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight"
        >
          {AUTH_UI_TEXT.LOGIN_TITLE}
        </Heading>
        <Text
          variant="muted"
          className="text-sm sm:text-base text-muted-foreground leading-relaxed"
        >
          {AUTH_UI_TEXT.LOGIN_SUBTITLE}
        </Text>
      </Box>

      {/* Prominent Google Login Button with official Google Popup overlay */}
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
            {isGoogleLoading
              ? "Đang xác thực Google..."
              : AUTH_UI_TEXT.SOCIAL_GOOGLE}
          </span>
        </button>

        {/* Overlay nút Google chính thức để kích hoạt popup chuẩn khi click */}
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

      {/* Divider */}
      <Box className="flex items-center my-3 sm:my-3.5">
        <Box className="flex-1 border-t border-border" />
        <span className="px-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground whitespace-nowrap select-none">
          {AUTH_UI_TEXT.DIVIDER_OR}
        </span>
        <Box className="flex-1 border-t border-border" />
      </Box>

      {/* General Error Banner */}
      {errors.general && (
        <Box className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 text-destructive" />
          <span>{errors.general}</span>
        </Box>
      )}

      {/* Email Input */}
      <Input
        id="login-email"
        type="email"
        label={AUTH_UI_TEXT.EMAIL_LABEL}
        placeholder={AUTH_UI_TEXT.EMAIL_PLACEHOLDER}
        autoComplete="email"
        error={errors.email}
        disabled={isLoading}
        className="h-11 sm:h-12 rounded-xl text-sm sm:text-base"
        {...registerEmail}
      />

      {/* Password Input with Forgot Password inline header */}
      <Box className="space-y-1.5">
        <Box className="flex items-center justify-between">
          <label
            htmlFor="login-password"
            className="text-sm font-semibold text-foreground select-none"
          >
            {AUTH_UI_TEXT.PASSWORD_LABEL}
          </label>
          <Link
            to={AUTH_ROUTES.FORGOT_PASSWORD}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {AUTH_UI_TEXT.FORGOT_PASSWORD}
          </Link>
        </Box>

        <Input
          id="login-password"
          type="password"
          placeholder={AUTH_UI_TEXT.PASSWORD_PLACEHOLDER}
          autoComplete="current-password"
          error={errors.password}
          showPasswordToggle
          disabled={isLoading}
          className="h-11 sm:h-12 rounded-xl text-sm sm:text-base"
          {...registerPassword}
        />
      </Box>

      {/* Remember Me Checkbox */}
      <Box className="flex items-center justify-between pt-0.5">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground select-none">
          <input
            id="login-remember"
            type="checkbox"
            className="h-4.5 w-4.5 accent-primary rounded border-input"
            disabled={isLoading}
            {...registerRememberMe}
          />
          <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {AUTH_UI_TEXT.REMEMBER_ME}
          </span>
        </label>
      </Box>

      {/* Demo Account Quick-fill Pills */}
      <Box className="rounded-xl border border-primary/20 bg-primary/5 p-2.5 space-y-1.5 text-center">
        <Box className="flex items-center justify-center">
          <Text className="text-xs sm:text-sm font-semibold text-primary">
            Tài khoản mẫu (1-Click điền nhanh):
          </Text>
        </Box>
        <Box className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => fillAccount("customer@greenfarm.vn")}
            className="h-7 sm:h-8 text-xs sm:text-sm font-medium px-3 rounded-lg border border-primary/20 bg-background hover:bg-primary/10 text-foreground transition-colors"
          >
            Khách hàng
          </button>
          <button
            type="button"
            onClick={() => fillAccount("staff@greenfarm.vn")}
            className="h-7 sm:h-8 text-xs sm:text-sm font-medium px-3 rounded-lg border border-primary/20 bg-background hover:bg-primary/10 text-foreground transition-colors"
          >
            Kỹ thuật viên
          </button>
          <button
            type="button"
            onClick={() => fillAccount("admin@greenfarm.vn")}
            className="h-7 sm:h-8 text-xs sm:text-sm font-medium px-3 rounded-lg border border-primary/20 bg-background hover:bg-primary/10 text-foreground transition-colors"
          >
            Quản trị viên
          </button>
        </Box>
      </Box>

      <Box className="border-t border-border/80 my-2" />

      {/* Primary Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full h-12 rounded-xl text-base sm:text-lg font-bold shadow-md shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-[0.99] flex items-center justify-center text-center"
        isLoading={isLoading}
      >
        {AUTH_UI_TEXT.SUBMIT_BUTTON}
      </Button>

      {/* Bottom Switch to Register */}
      {onSwitchToRegister && (
        <Box className="text-center text-sm sm:text-base text-muted-foreground pt-1">
          <span>{AUTH_UI_TEXT.DONT_HAVE_ACCOUNT} </span>
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            {AUTH_UI_TEXT.CREATE_ACCOUNT}
          </button>
        </Box>
      )}
    </Box>
  );
}
