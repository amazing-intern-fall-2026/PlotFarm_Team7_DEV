import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  CheckCircle2,
  Video,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Droplets,
  Calendar,
} from "lucide-react";
import { Box, Button, Badge, Heading, Text } from "@/shared/ui";
import type { PlotUiItem } from "@/entities/plot";

export interface PlotDetailDrawerProps {
  isOpen: boolean;
  plot: PlotUiItem | null;
  onClose: () => void;
}

export function PlotDetailDrawer({
  isOpen,
  plot,
  onClose,
}: PlotDetailDrawerProps) {
  const navigate = useNavigate();

  // Đóng Drawer khi nhấn ESC
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !plot) return null;

  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(plot.pricePerMonth);

  const handleProceedBooking = () => {
    onClose();
    navigate(`/checkout/${plot.plotCode}`);
  };

  return (
    <Box className="fixed inset-0 z-50 overflow-hidden">
      {/* ── Backdrop mờ ── */}
      <Box
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* ── Slide-over Panel (Drawer bên phải) ── */}
      <Box className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <Box className="w-screen max-w-md bg-card border-l border-border/80 shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <Box className="p-6 border-b border-border/60 flex items-center justify-between sticky top-0 bg-card/95 backdrop-blur-md z-10">
            <Box className="space-y-1">
              <Box className="flex items-center gap-2">
                <Badge
                  variant="success"
                  className="text-xs font-semibold bg-emerald-100/90 text-emerald-800 border-emerald-300/80"
                >
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Sẵn sàng thuê
                </Badge>
                <span className="text-xs font-mono font-bold text-muted-foreground">
                  #{plot.plotCode}
                </span>
              </Box>
              <Heading level={3} className="text-xl font-bold text-foreground">
                {plot.plotNumber}
              </Heading>
            </Box>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              aria-label="Đóng chi tiết"
            >
              <X className="h-5 w-5" />
            </button>
          </Box>

          {/* Body Content */}
          <Box className="p-6 space-y-6 flex-1">
            {/* Camera Live Mockup */}
            <Box className="space-y-2">
              <Box className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5 text-foreground font-semibold">
                  <Video className="h-4 w-4 text-emerald-600" />
                  Camera trực tiếp nông trại
                </span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE 1080p
                </span>
              </Box>
              <Box className="relative rounded-2xl overflow-hidden aspect-video bg-black flex items-center justify-center border border-border/80 shadow-xs group">
                <video
                  autoPlay
                  controls
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src="/video/video1.mp4"
                >
                  <track kind="captions" />
                </video>
                <Box className="absolute bottom-2 left-3 text-[11px] text-white/90 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  Góc quay toàn cảnh ô #{plot.plotCode}
                </Box>
              </Box>
            </Box>

            {/* Thông số kỹ thuật & Thổ nhưỡng */}
            <Box className="space-y-3">
              <Text variant="small" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Thông số kỹ thuật ô đất
              </Text>
              <Box className="grid grid-cols-2 gap-3">
                <Box className="rounded-xl border border-border/70 p-3 bg-muted/20 space-y-1">
                  <Box className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Layers className="h-3.5 w-3.5 text-primary" />
                    <span>Diện tích chuẩn</span>
                  </Box>
                  <Text variant="large" className="text-base font-bold text-foreground">
                    {plot.areaSquareMeters} m²
                  </Text>
                </Box>

                <Box className="rounded-xl border border-border/70 p-3 bg-muted/20 space-y-1">
                  <Box className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Droplets className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Tưới nhỏ giọt</span>
                  </Box>
                  <Text variant="large" className="text-base font-bold text-emerald-700 dark:text-emerald-400">
                    Tự động hóa
                  </Text>
                </Box>

                <Box className="rounded-xl border border-border/70 p-3 bg-muted/20 space-y-1">
                  <Box className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Cpu className="h-3.5 w-3.5 text-primary" />
                    <span>Cảm biến IoT</span>
                  </Box>
                  <Text variant="large" className="text-sm font-bold text-foreground">
                    {plot.iotSensorInstalled ? "Đầy đủ cảm biến" : "Cơ bản"}
                  </Text>
                </Box>

                <Box className="rounded-xl border border-border/70 p-3 bg-muted/20 space-y-1">
                  <Box className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Chuẩn sinh thái</span>
                  </Box>
                  <Text variant="large" className="text-sm font-bold text-foreground">
                    VietGAP hữu cơ
                  </Text>
                </Box>
              </Box>
            </Box>

            {/* Loại đất & Mô tả */}
            <Box className="space-y-2 rounded-xl bg-muted/30 p-4 border border-border/60">
              <Box className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <Text variant="large" className="text-sm font-semibold text-foreground">
                  Thổ nhưỡng & Dinh dưỡng đất
                </Text>
              </Box>
              <Text variant="muted" className="text-xs leading-relaxed">
                {plot.description ||
                  `Ô đất sử dụng ${plot.soilType || "Đất đỏ Bazan sinh thái"} được bổ sung phân trùn quế và vi sinh hữu cơ định kỳ. Độ pH cân bằng 6.2 - 6.8, giàu khoáng chất tự nhiên.`}
              </Text>
            </Box>

            {/* Bảng giá & Cam kết */}
            <Box className="rounded-2xl border border-primary/30 bg-primary/5 p-4 space-y-3">
              <Box className="flex items-baseline justify-between">
                <Text variant="small" className="text-xs text-muted-foreground">
                  Đơn giá thuê hàng tháng:
                </Text>
                <span className="text-xl font-extrabold text-primary">
                  {formattedPrice}
                </span>
              </Box>
              <Box className="text-[11px] text-muted-foreground space-y-1 border-t border-primary/20 pt-2">
                <p className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>Kỳ hạn linh hoạt: 3 tháng, 6 tháng hoặc 12 tháng</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Bao trọn chi phí nước tưới, điện năng & bảo trì IoT</span>
                </p>
              </Box>
            </Box>
          </Box>

          {/* Footer CTA */}
          <Box className="p-6 border-t border-border/60 bg-card sticky bottom-0 space-y-3">
            <Button
              variant="default"
              size="lg"
              onClick={handleProceedBooking}
              className="w-full font-bold text-sm h-12 shadow-md bg-primary text-primary-foreground hover:bg-primary-hover flex items-center justify-center gap-2"
            >
              <span>Tiến hành đăng ký & Thuê ô đất này</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="w-full text-xs text-muted-foreground hover:text-foreground"
            >
              Tiếp tục xem các ô đất khác
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
