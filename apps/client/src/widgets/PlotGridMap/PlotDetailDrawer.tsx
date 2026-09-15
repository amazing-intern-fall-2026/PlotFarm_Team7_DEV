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
import { PLOT_DRAWER_MESSAGES, PLOT_STATUS_CONFIG } from "./constants";
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
      <Box className="fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
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
                  {PLOT_STATUS_CONFIG.AVAILABLE.badgeDetailText}
                </Badge>
                <Text as="span" className="text-xs font-mono font-bold text-muted-foreground">
                  #{plot.plotCode}
                </Text>
              </Box>
              <Heading level={3} className="text-xl font-bold text-foreground">
                {plot.plotNumber}
              </Heading>
            </Box>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              aria-label={PLOT_DRAWER_MESSAGES.CLOSE_ARIA}
            >
              <X className="h-5 w-5" />
            </Button>
          </Box>

          {/* Body Content */}
          <Box className="p-6 space-y-6 flex-1">
            {/* Camera Live Mockup */}
            <Box className="space-y-2">
              <Box className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                <Text as="span" className="flex items-center gap-1.5 text-foreground font-semibold">
                  <Video className="h-4 w-4 text-emerald-600" />
                  {PLOT_DRAWER_MESSAGES.CAMERA_FEED_TITLE}
                </Text>
                <Text as="span" className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Box className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  {PLOT_DRAWER_MESSAGES.CAMERA_LIVE_BADGE}
                </Text>
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
                  {PLOT_DRAWER_MESSAGES.CAMERA_PANORAMA_PREFIX}{plot.plotCode}
                </Box>
              </Box>
            </Box>

            {/* Thông số kỹ thuật & Thổ nhưỡng */}
            <Box className="space-y-3">
              <Text variant="small" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {PLOT_DRAWER_MESSAGES.SPECS_TITLE}
              </Text>
              <Box className="grid grid-cols-2 gap-3">
                <Box className="rounded-xl border border-border/70 p-3 bg-muted/20 space-y-1">
                  <Box className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Layers className="h-3.5 w-3.5 text-primary" />
                    <Text as="span">{PLOT_DRAWER_MESSAGES.SPEC_AREA}</Text>
                  </Box>
                  <Text variant="large" className="text-base font-bold text-foreground">
                    {plot.areaSquareMeters} m²
                  </Text>
                </Box>

                <Box className="rounded-xl border border-border/70 p-3 bg-muted/20 space-y-1">
                  <Box className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Droplets className="h-3.5 w-3.5 text-emerald-600" />
                    <Text as="span">{PLOT_DRAWER_MESSAGES.SPEC_IRRIGATION}</Text>
                  </Box>
                  <Text variant="large" className="text-base font-bold text-emerald-700 dark:text-emerald-400">
                    {PLOT_DRAWER_MESSAGES.SPEC_IRRIGATION_AUTO}
                  </Text>
                </Box>

                <Box className="rounded-xl border border-border/70 p-3 bg-muted/20 space-y-1">
                  <Box className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Cpu className="h-3.5 w-3.5 text-primary" />
                    <Text as="span">{PLOT_DRAWER_MESSAGES.SPEC_IOT}</Text>
                  </Box>
                  <Text variant="large" className="text-sm font-bold text-foreground">
                    {plot.iotSensorInstalled
                      ? PLOT_DRAWER_MESSAGES.SPEC_IOT_FULL
                      : PLOT_DRAWER_MESSAGES.SPEC_IOT_BASIC}
                  </Text>
                </Box>

                <Box className="rounded-xl border border-border/70 p-3 bg-muted/20 space-y-1">
                  <Box className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <Text as="span">{PLOT_DRAWER_MESSAGES.SPEC_STANDARD}</Text>
                  </Box>
                  <Text variant="large" className="text-sm font-bold text-foreground">
                    {PLOT_DRAWER_MESSAGES.SPEC_STANDARD_VIETGAP}
                  </Text>
                </Box>
              </Box>
            </Box>

            {/* Loại đất & Mô tả */}
            <Box className="space-y-2 rounded-xl bg-muted/30 p-4 border border-border/60">
              <Box className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <Text variant="large" className="text-sm font-semibold text-foreground">
                  {PLOT_DRAWER_MESSAGES.SOIL_SECTION_TITLE}
                </Text>
              </Box>
              <Text variant="muted" className="text-xs leading-relaxed">
                {plot.description ||
                  `Ô đất sử dụng ${plot.soilType || "Đất đỏ Bazan sinh thái"} ${PLOT_DRAWER_MESSAGES.SOIL_SECTION_DESC}`}
              </Text>
            </Box>

            {/* Bảng giá & Cam kết */}
            <Box className="rounded-2xl border border-primary/30 bg-primary/5 p-4 space-y-3">
              <Box className="flex items-baseline justify-between">
                <Text variant="small" className="text-xs text-muted-foreground">
                  {PLOT_DRAWER_MESSAGES.PRICE_MONTH_LABEL}
                </Text>
                <Text as="span" className="text-xl font-extrabold text-primary">
                  {formattedPrice}
                </Text>
              </Box>
              <Box className="text-[11px] text-muted-foreground space-y-1 border-t border-primary/20 pt-2">
                <Box className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                  <Text as="span">{PLOT_DRAWER_MESSAGES.COMMITMENT_TERM}</Text>
                </Box>
                <Box className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <Text as="span">{PLOT_DRAWER_MESSAGES.COMMITMENT_INCLUSIVE}</Text>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Footer CTA */}
          <Box className="p-6 border-t border-border/60 bg-card sticky bottom-0 space-y-3">
            <Button
              variant="default"
              size="lg"
              onClick={handleProceedBooking}
              className="w-full font-bold text-sm h-12 shadow-md bg-primary text-primary-foreground hover:bg-primary-hover flex items-center justify-center gap-2 cursor-pointer"
            >
              <Text as="span">{PLOT_DRAWER_MESSAGES.CTA_BOOKING}</Text>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="w-full text-xs text-muted-foreground hover:text-foreground cursor-pointer"
            >
              {PLOT_DRAWER_MESSAGES.CTA_CONTINUE}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
