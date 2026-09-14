import * as React from "react";
import { AlertTriangle, RefreshCw, Home, ChevronDown } from "lucide-react";
import { Box, Heading, Text, Button } from "@/shared/ui";

export interface ErrorFallbackProps {
  error?: Error | null;
  resetErrorBoundary?: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const [showDetails, setShowDetails] = React.useState(false);

  const handleReload = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <Box className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-background">
      <Box className="w-full max-w-lg rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xl text-center space-y-5 animate-in fade-in-50 duration-300">
        {/* Warning Icon Badge */}
        <Box className="h-16 w-16 mx-auto rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center shadow-inner">
          <AlertTriangle className="h-8 w-8" />
        </Box>

        {/* Heading & Notice */}
        <Box className="space-y-2">
          <Heading level={2} className="text-2xl font-extrabold text-foreground tracking-tight">
            Đã xảy ra sự cố không mong muốn
          </Heading>
          <Text variant="muted" className="text-sm text-muted-foreground leading-relaxed">
            Hệ thống gặp lỗi trong quá trình xử lý giao diện. Đừng lo lắng, dữ liệu của bạn vẫn được bảo toàn an toàn trên Green Farm.
          </Text>
        </Box>

        {/* Action Buttons */}
        <Box className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handleReload}
            className="w-full sm:w-auto rounded-xl font-semibold shadow-md shadow-primary/20"
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            Tải lại trang
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleGoHome}
            className="w-full sm:w-auto rounded-xl font-semibold"
            leftIcon={<Home className="h-4 w-4" />}
          >
            Về Trang chủ
          </Button>
        </Box>

        {/* Developer Diagnostics / Expandable Technical Details */}
        {error && (
          <Box className="pt-3 border-t border-border/60 text-left">
            <button
              type="button"
              onClick={() => setShowDetails((prev) => !prev)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-medium transition-colors mx-auto"
            >
              <span>{showDetails ? "Ẩn chi tiết kỹ thuật" : "Xem chi tiết kỹ thuật"}</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showDetails ? "rotate-180" : ""}`} />
            </button>

            {showDetails && (
              <Box className="mt-3 p-3 rounded-xl bg-muted/60 border border-border/60 font-mono text-xs text-destructive break-all overflow-x-auto max-h-48 select-text">
                <p className="font-bold pb-1">{error.name}: {error.message}</p>
                {error.stack && (
                  <pre className="text-[11px] text-muted-foreground whitespace-pre-wrap">
                    {error.stack}
                  </pre>
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
