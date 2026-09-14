import * as React from "react";
import { Box } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { renderGoogleSignInButton } from "../../lib/googleIdentity";
import { GoogleIcon } from "./GoogleIcon";

export interface GoogleSignInButtonProps {
  isLoading?: boolean;
  onCredentialResponse: (credential: string) => void;
  onFallbackClick: () => void;
  text?: string;
  loadingText?: string;
  className?: string;
}

export function GoogleSignInButton({
  isLoading = false,
  onCredentialResponse,
  onFallbackClick,
  text = "Google",
  loadingText = "Đang xác thực Google...",
  className,
}: GoogleSignInButtonProps) {
  const googleBtnRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (googleBtnRef.current) {
      void renderGoogleSignInButton(googleBtnRef.current, (credential) => {
        onCredentialResponse(credential);
      });
    }
  }, [onCredentialResponse]);

  return (
    <Box className={cn("relative w-full pt-0.5 rounded-xl overflow-hidden", className)}>
      <button
        type="button"
        disabled={isLoading}
        onClick={onFallbackClick}
        className={cn(
          "w-full h-11 sm:h-12 flex items-center justify-center gap-3 px-4 rounded-xl",
          "border border-input bg-background hover:bg-muted/60 text-foreground font-medium text-sm sm:text-base",
          "shadow-xs hover:shadow transition-all active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
        )}
      >
        <GoogleIcon />
        <span>{isLoading ? loadingText : text}</span>
      </button>

      {/* Overlay nút Google chính thức để kích hoạt popup chuẩn khi click */}
      <div
        ref={googleBtnRef}
        className={cn(
          "absolute inset-0 opacity-0 cursor-pointer overflow-hidden z-10",
          "[&_iframe]:!w-full [&_iframe]:!h-full [&_iframe]:!scale-110",
          isLoading && "pointer-events-none"
        )}
        tabIndex={-1}
        aria-hidden="true"
      />
    </Box>
  );
}
