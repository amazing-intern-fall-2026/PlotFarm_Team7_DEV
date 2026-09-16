import * as React from "react";
import { Headphones, Phone, Mail, MessageCircle, X, HelpCircle } from "lucide-react";
import { Box, Heading, Text } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

export interface AuthSupportFabProps {
  className?: string;
}

export function AuthSupportFab({ className }: AuthSupportFabProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Box className={cn("fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50", className)}>
      {isOpen && (
        <Box
          ref={popoverRef}
          role="dialog"
          aria-label="Trung tâm hỗ trợ khách hàng"
          className="absolute bottom-16 right-0 mb-2 w-80 sm:w-88 rounded-2xl border border-border/80 bg-background/95 backdrop-blur-md shadow-2xl p-5 space-y-4 animate-in fade-in-50 zoom-in-95 duration-200"
        >
          <Box className="flex items-center justify-between pb-3 border-b border-border/60">
            <Box className="flex items-center gap-2.5">
              <Box className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Headphones className="h-5 w-5" />
              </Box>
              <Box>
                <Heading level={3} className="text-sm font-bold text-foreground">
                  Trung tâm trợ giúp
                </Heading>
                <Text variant="muted" className="text-[11px] text-muted-foreground">
                  Đội ngũ Green Farm luôn sẵn sàng hỗ trợ bạn
                </Text>
              </Box>
            </Box>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 flex items-center justify-center transition-colors"
              aria-label="Đóng bảng hỗ trợ"
            >
              <X className="h-4 w-4" />
            </button>
          </Box>

          <Box className="space-y-2">
            <a
              href="tel:19006868"
              className="flex items-center gap-3 p-2.5 rounded-xl border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all group"
            >
              <Box className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Phone className="h-4 w-4" />
              </Box>
              <Box className="flex-1 min-w-0">
                <Text className="text-xs font-semibold text-foreground">
                  Tổng đài tư vấn (24/7)
                </Text>
                <Text className="text-xs text-primary font-bold">
                  1900 6868
                </Text>
              </Box>
            </a>

            <a
              href="mailto:hotro@greenfarm.vn"
              className="flex items-center gap-3 p-2.5 rounded-xl border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all group"
            >
              <Box className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Mail className="h-4 w-4" />
              </Box>
              <Box className="flex-1 min-w-0">
                <Text className="text-xs font-semibold text-foreground">
                  Hòm thư hỗ trợ kỹ thuật
                </Text>
                <Text className="text-xs text-muted-foreground truncate">
                  hotro@greenfarm.vn
                </Text>
              </Box>
            </a>

            <a
              href="https://zalo.me"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all group"
            >
              <Box className="h-8 w-8 rounded-lg bg-cyan-500/10 text-cyan-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <MessageCircle className="h-4 w-4" />
              </Box>
              <Box className="flex-1 min-w-0">
                <Text className="text-xs font-semibold text-foreground">
                  Zalo OA Green Farm
                </Text>
                <Text className="text-xs text-muted-foreground">
                  Phản hồi trong vòng 5 phút
                </Text>
              </Box>
            </a>
          </Box>

          <Box className="flex items-center gap-2 pt-1 text-[11px] text-muted-foreground border-t border-border/40">
            <HelpCircle className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span>Thời gian trực tổng đài: 08:00 - 21:00 hàng ngày.</span>
          </Box>
        </Box>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Đóng hỗ trợ khách hàng" : "Mở hỗ trợ khách hàng"}
        aria-expanded={isOpen}
        className={cn(
          "h-13 w-13 sm:h-14 sm:w-14 rounded-full flex items-center justify-center shadow-xl transition-all transform active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30",
          isOpen
            ? "bg-muted text-foreground hover:bg-muted/80 shadow-md"
            : "bg-primary text-white hover:bg-primary/90 hover:scale-105 shadow-primary/35"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Headphones className="h-6 w-6" />
        )}
      </button>
    </Box>
  );
}
