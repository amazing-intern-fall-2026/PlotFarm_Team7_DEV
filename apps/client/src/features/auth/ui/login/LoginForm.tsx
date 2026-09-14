import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Box, Heading, Text, Button, Input } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { AUTH_ROUTES, AUTH_UI_TEXT } from "../../constants";
import { useLoginForm } from "../../model/useLoginForm";
import {
  GoogleIcon,
  GoogleSignInButton,
  AuthDivider,
} from "../common";

export { GoogleIcon };

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
      <GoogleSignInButton
        isLoading={isLoading || isGoogleLoading}
        onCredentialResponse={(credential) => {
          void handleGoogleCredential(credential);
        }}
        onFallbackClick={() => {
          void loginWithGoogle();
        }}
        text={AUTH_UI_TEXT.SOCIAL_GOOGLE}
      />

      {/* Divider */}
      <AuthDivider label={AUTH_UI_TEXT.DIVIDER_OR} />

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

      {/* Password Input with Forgot Password Link */}
      <Box className="space-y-1 text-left">
        <Box className="flex items-center justify-between">
          <label
            htmlFor="login-password"
            className="text-xs sm:text-sm font-medium text-foreground select-none"
          >
            {AUTH_UI_TEXT.PASSWORD_LABEL}
          </label>
          <Link
            to={AUTH_ROUTES.FORGOT_PASSWORD}
            className="text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors"
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
