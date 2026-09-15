import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Tự động tích hợp nút bật/tắt hiển thị mật khẩu khi type="password" */
  showPasswordToggle?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      hint,
      error,
      leftIcon,
      rightIcon,
      showPasswordToggle = false,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    const isPasswordType = type === "password";
    const resolvedType = isPasswordType && showPasswordToggle
      ? (passwordVisible ? "text" : "password")
      : type;

    // Tự động sinh rightIcon ẩn/hiện mật khẩu nếu bật showPasswordToggle và không truyền rightIcon thủ công
    const resolvedRightIcon = rightIcon ?? (
      isPasswordType && showPasswordToggle ? (
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setPasswordVisible((prev) => !prev)}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
          aria-label={passwordVisible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        >
          {passwordVisible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      ) : null
    );

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium leading-none text-foreground",
              disabled && "cursor-not-allowed opacity-70"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 flex items-center text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={resolvedType}
            disabled={disabled}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              // Vô hiệu hóa icon mắt mặc định của Edge / Windows để tránh hiển thị 2 icon mắt song song
              "[&::-ms-reveal]:hidden [&::-ms-clear]:hidden",
              leftIcon && "pl-9",
              resolvedRightIcon && "pr-9",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            {...props}
            ref={ref}
          />
          {resolvedRightIcon && (
            <div className="absolute right-3 flex items-center text-muted-foreground">
              {resolvedRightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-destructive">{error}</p>
        ) : hint ? (
          <p className="text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
