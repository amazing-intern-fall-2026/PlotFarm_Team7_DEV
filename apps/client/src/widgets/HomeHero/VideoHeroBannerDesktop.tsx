import * as React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Radio,
  CheckCircle2,
  Sparkles,
  Layers,
  X,
} from "lucide-react";
import { Box, Typography, Text, Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import type { VideoHeroBannerViewProps } from "./types";

export function VideoHeroBannerDesktop({
  slides,
  currentIndex,
  currentSlide,
  isTransitioning,
  showStatsCard,
  videoRef,
  handleVideoEnded,
  switchVideo,
  setShowStatsCard,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  onSecondaryCtaClick,
  className,
  telemetry,
  telemetryLoading,
}: VideoHeroBannerViewProps) {
  const hideTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <Box
      className={cn(
        "relative w-full min-h-[480px] md:min-h-[500px] lg:min-h-[520px] flex items-center overflow-hidden select-none bg-emerald-950",
        className,
      )}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
        className={cn(
          "absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out",
          isTransitioning
            ? "scale-105 opacity-40 blur-xs"
            : "scale-100 opacity-100 blur-none",
        )}
      >
        <source src={currentSlide.videoSrc} type="video/mp4" />
        <img
          src="/images/background.jpg"
          alt="Green Farm Agriculture"
          className="w-full h-full object-cover"
        />
      </video>

      <Box className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
      <Box className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      <Box className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

      <Box className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-10 md:py-12">
        <Box className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <Box className="lg:col-span-7 xl:col-span-8 space-y-4 text-left">
            <Box className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="tracking-wide uppercase">
                {currentSlide.badge}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-white/80 font-normal">
                {currentSlide.tag}
              </span>
            </Box>

            <Typography
              as="h1"
              className={cn(
                "text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.32] drop-shadow-md transition-all duration-500",
                isTransitioning
                  ? "opacity-0 translate-y-3"
                  : "opacity-100 translate-y-0",
              )}
            >
              {currentSlide.headline}
            </Typography>

            <Text
              className={cn(
                "text-sm md:text-base text-white/85 leading-relaxed max-w-xl font-normal drop-shadow-sm transition-all duration-500 delay-75",
                isTransitioning
                  ? "opacity-0 translate-y-2"
                  : "opacity-100 translate-y-0",
              )}
            >
              {currentSlide.subheadline}
            </Text>

            <Box className="flex flex-wrap items-center gap-4 pt-1 text-xs text-white/90">
              <Box className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>100% Hữu cơ VietGAP</span>
              </Box>
              <Box className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
                <Radio className="h-4 w-4 text-emerald-400 shrink-0 animate-pulse" />
                <span>Camera IoT 24/7</span>
              </Box>
            </Box>

            <Box className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link to={primaryCtaLink}>
                <Button
                  variant="default"
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  {primaryCtaText}
                </Button>
              </Link>

              {secondaryCtaText && (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={onSecondaryCtaClick}
                  className="border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
                  leftIcon={
                    <Sparkles className="h-4 w-4 text-emerald-300" />
                  }
                >
                  {secondaryCtaText}
                </Button>
              )}
            </Box>
          </Box>

          <Box className="lg:col-span-5 xl:col-span-4 flex justify-end">
            <Box
              onMouseEnter={() => {
                if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
              }}
              onMouseLeave={() => {
                hideTimerRef.current = setTimeout(
                  () => setShowStatsCard(false),
                  2000,
                );
              }}
              className={cn(
                "w-full max-w-xs p-4 rounded-2xl border border-white/20 bg-black/60 backdrop-blur-xl space-y-3 shadow-2xl text-left transition-all duration-500",
                showStatsCard
                  ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
                  : "opacity-0 translate-x-4 scale-95 pointer-events-none",
              )}
            >
              <Box className="flex items-center justify-between pb-2 border-b border-white/10">
                <Box className="flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Trực tiếp từ trang trại
                  </span>
                </Box>
                <Box className="flex items-center gap-1.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                    LIVE 1080p
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowStatsCard(false)}
                    className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                    title="Đóng"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </Box>
              </Box>

              {telemetryLoading ? (
                <Box className="space-y-2.5 text-xs animate-pulse py-1">
                  <Box className="flex justify-between items-center">
                    <Box className="h-3 w-28 bg-white/20 rounded" />
                    <Box className="h-3 w-20 bg-white/30 rounded" />
                  </Box>
                  <Box className="flex justify-between items-center">
                    <Box className="h-3 w-24 bg-white/20 rounded" />
                    <Box className="h-3 w-16 bg-white/30 rounded" />
                  </Box>
                  <Box className="flex justify-between items-center">
                    <Box className="h-3 w-24 bg-white/20 rounded" />
                    <Box className="h-3 w-28 bg-white/30 rounded" />
                  </Box>
                  <Box className="flex justify-between items-center">
                    <Box className="h-3 w-28 bg-white/20 rounded" />
                    <Box className="h-3 w-20 bg-white/30 rounded" />
                  </Box>
                </Box>
              ) : (
                <Box className="space-y-2 text-xs">
                  <Box className="flex justify-between items-center">
                    <span className="text-white/70">Phân cảnh đang chiếu:</span>
                    <span className="font-semibold text-white truncate max-w-[140px]">
                      {telemetry?.location || currentSlide.shortTitle}
                    </span>
                  </Box>

                  <Box className="flex justify-between items-center">
                    <span className="text-white/70">
                      {currentSlide.stats.label}:
                    </span>
                    <span className="font-bold text-emerald-300">
                      {currentSlide.stats.value}
                    </span>
                  </Box>

                  <Box className="flex justify-between items-center">
                    <span className="text-white/70">Độ ẩm & Nhiệt độ:</span>
                    <span className="font-semibold text-white">
                      {telemetry ? `${telemetry.humidity}% • ${telemetry.temperature}°C (Đà Lạt)` : "78% • 19.4°C (Đà Lạt)"}
                    </span>
                  </Box>

                  <Box className="flex justify-between items-center">
                    <span className="text-white/70">Tình trạng cảm biến:</span>
                    <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {telemetry?.sensorStatus || "Hoạt động tối ưu"}
                    </span>
                  </Box>
                </Box>
              )}

              <Box className="pt-2 border-t border-white/10 space-y-1.5">
                <Text className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">
                  Chuyển nhanh phân cảnh (4 Video):
                </Text>
                <Box className="grid grid-cols-2 gap-1.5">
                  {slides.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => switchVideo(idx)}
                      className={cn(
                        "px-2 py-1 rounded-lg text-[11px] font-medium text-left transition-all truncate border",
                        idx === currentIndex
                          ? "border-emerald-400 bg-emerald-950/80 text-emerald-300 shadow-sm"
                          : "border-white/10 bg-white/5 hover:bg-white/10 text-white/70",
                      )}
                    >
                      {s.tag}
                    </button>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
