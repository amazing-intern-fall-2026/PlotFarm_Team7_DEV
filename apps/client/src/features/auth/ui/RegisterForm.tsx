import { User, Mail, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { Box, Heading, Text, Button, Input } from "@/shared/ui";
import { useRegisterForm } from "../model/useRegisterForm";

export interface RegisterFormProps {
  onSwitchToLogin?: () => void;
  className?: string;
}

export function RegisterForm({ onSwitchToLogin, className }: RegisterFormProps) {
  const {
    registerFullName,
    registerEmail,
    registerPassword,
    handleSubmit,
    errors,
    isLoading,
    isSuccess,
    registeredEmail,
    generalError,
  } = useRegisterForm();

  if (isSuccess) {
    return (
      <Box className="w-full space-y-6 text-left animate-in fade-in-50 duration-300">
        <Box className="rounded-2xl border border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/20 p-6 sm:p-8 text-center space-y-4">
          <Box className="h-14 w-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 flex items-center justify-center shadow-sm">
            <CheckCircle2 className="h-8 w-8" />
          </Box>
          <Box className="space-y-1">
            <Heading level={2} className="text-xl sm:text-2xl font-bold text-foreground">
              Đăng ký thành công!
            </Heading>
            <Text className="text-sm text-muted-foreground leading-relaxed">
              Mã kích hoạt tài khoản đã được gửi đến hộp thư:
            </Text>
            <Text className="text-sm font-semibold text-foreground break-all">
              {registeredEmail}
            </Text>
          </Box>

          <Text variant="muted" className="text-xs sm:text-sm text-muted-foreground pt-2">
            Vui lòng kiểm tra email của bạn để hoàn tất xác thực và đăng nhập vào hệ thống Green Farm.
          </Text>

          {onSwitchToLogin && (
            <Button
              type="button"
              variant="default"
              size="lg"
              onClick={onSwitchToLogin}
              className="w-full rounded-xl mt-4 font-semibold shadow-md"
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
    <Box className={`w-full space-y-6 text-left ${className || ""}`}>
      {/* ── Tiêu đề ── */}
      <Box className="space-y-1">
        <Heading
          level={1}
          className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight"
        >
          Tạo tài khoản mới
        </Heading>
        <Text
          variant="muted"
          className="text-sm text-muted-foreground leading-relaxed"
        >
          Tham gia cộng đồng nông nghiệp số Green Farm ngay hôm nay
        </Text>
      </Box>

      {/* ── Thông báo lỗi chung từ Server ── */}
      {generalError && (
        <Box
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm font-medium text-destructive animate-in fade-in-50"
        >
          {generalError}
        </Box>
      )}

      {/* ── Form 3 Fields: username (fullName), email, password ── */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Field 1: Username / Tên người dùng */}
        <Input
          label="Tên người dùng (Họ và tên)"
          placeholder="VD: Nguyễn Văn Nông"
          autoComplete="name"
          disabled={isLoading}
          error={errors.fullName}
          leftIcon={<User className="h-4 w-4 text-muted-foreground" />}
          {...registerFullName}
        />

        {/* Field 2: Email */}
        <Input
          type="email"
          label="Địa chỉ email"
          placeholder="VD: nongdan@greenfarm.vn"
          autoComplete="email"
          disabled={isLoading}
          error={errors.email}
          leftIcon={<Mail className="h-4 w-4 text-muted-foreground" />}
          {...registerEmail}
        />

        {/* Field 3: Password */}
        <Input
          type="password"
          label="Mật khẩu"
          placeholder="Tối thiểu 6 ký tự"
          autoComplete="new-password"
          disabled={isLoading}
          showPasswordToggle
          error={errors.password}
          leftIcon={<Lock className="h-4 w-4 text-muted-foreground" />}
          {...registerPassword}
        />

        {/* Nút gửi */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-xl text-base font-semibold shadow-md shadow-primary/20 mt-2"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Đang tạo tài khoản...
            </span>
          ) : (
            "Đăng ký tài khoản"
          )}
        </Button>
      </form>

      {/* ── Chuyển sang Đăng nhập ── */}
      {onSwitchToLogin && (
        <Box className="text-center text-sm sm:text-base text-muted-foreground pt-1">
          <span>Đã có tài khoản? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Đăng nhập ngay
          </button>
        </Box>
      )}
    </Box>
  );
}
