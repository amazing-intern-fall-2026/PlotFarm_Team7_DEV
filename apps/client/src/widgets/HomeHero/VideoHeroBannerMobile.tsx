import { Link } from "react-router-dom";
import { ArrowRight, Radio, CheckCircle2, Sparkles } from "lucide-react";
import { Box, Typography, Text, Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import type { VideoHeroBannerViewProps } from "./types";

export function VideoHeroBannerMobile({
  slides,
  currentIndex,
  currentSlide,
  isTransitioning,
  showStatsCard,
  videoRef,
  handleVideoEnded,
  switchVideo,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  onSecondaryCtaClick,
  className,
}: VideoHeroBannerViewProps) {
  return (
    <Box
      className={cn(
        "relative w-full min-h-[390px] flex flex-col justify-between overflow-hidden select-none bg-emerald-950 px-4 py-6",
        className,
      )}
    >
      {/* ── 1. Video Element Background ── */}
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

      {/* ── 2. Cinematic Gradient Overlays (Tối ưu độ tương phản trên màn hình điện thoại) ── */}
      <Box className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-black/90" />
      <Box className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none" />

      {/* ── 3. Top Row: Live Badge & Floating 5s Mobile Scene Pill ── */}
      <Box className="relative z-10 w-full flex items-center justify-between gap-2">
        {/* Live Badge */}
        <Box className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/30 text-emerald-300 text-[10px] font-semibold backdrop-blur-md shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="tracking-wide uppercase truncate max-w-[140px]">
            {currentSlide.badge}
          </span>
        </Box>

        {/* Floating 5s Mobile Scene Pill (Hiện 5s khi đổi video rồi biến mất) */}
        <Box
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 border border-white/20 text-[10px] text-white/90 backdrop-blur-md transition-all duration-500 shadow-md",
            showStatsCard
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none",
          )}
        >
          <span className="font-semibold text-emerald-300">
            {currentSlide.shortTitle}
          </span>
          <span className="text-white/40">•</span>
          <span className="text-white/80">{currentSlide.stats.value}</span>
        </Box>
      </Box>

      {/* ── 4. Main Mobile Content (Typography & CTA) ── */}
      <Box className="relative z-10 w-full space-y-3 text-left my-auto pt-4 pb-2">
        {/* Tiêu đề chính trên mobile */}
        <Typography
          as="h1"
          className={cn(
            "text-2xl font-extrabold text-white tracking-tight leading-[1.35] drop-shadow-md transition-all duration-500",
            isTransitioning
              ? "opacity-0 translate-y-2"
              : "opacity-100 translate-y-0",
          )}
        >
          {currentSlide.headline}
        </Typography>

        {/* Phụ đề vắn tắt 2 dòng */}
        <Text
          className={cn(
            "text-xs text-white/85 leading-relaxed line-clamp-2 font-normal drop-shadow-sm transition-all duration-500 delay-75",
            isTransitioning
              ? "opacity-0 translate-y-1"
              : "opacity-100 translate-y-0",
          )}
        >
          {currentSlide.subheadline}
        </Text>

        {/* Cam kết nông nghiệp */}
        <Box className="flex items-center gap-2 pt-0.5 text-[11px] text-white/90">
          <Box className="inline-flex items-center gap-1 bg-black/40 px-2 py-1 rounded-md border border-white/10 backdrop-blur-sm">
            <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
            <span>100% VietGAP</span>
          </Box>
          <Box className="inline-flex items-center gap-1 bg-black/40 px-2 py-1 rounded-md border border-white/10 backdrop-blur-sm">
            <Radio className="h-3 w-3 text-emerald-400 shrink-0 animate-pulse" />
            <span>IoT 24/7</span>
          </Box>
        </Box>

        {/* CTA Buttons */}
        <Box className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
          <Link to={primaryCtaLink} className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="default"
              className="w-full h-10 px-5 rounded-xl text-sm font-bold shadow-md shadow-primary/30 active:scale-[0.98] transition-all bg-primary hover:bg-primary/90 border-none text-primary-foreground justify-center"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {primaryCtaText}
            </Button>
          </Link>

          {secondaryCtaText && (
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={onSecondaryCtaClick}
              className="w-full sm:w-auto h-9 px-4 rounded-xl text-xs font-semibold border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md active:scale-[0.98] transition-all justify-center"
              leftIcon={<Sparkles className="h-3.5 w-3.5 text-emerald-300" />}
            >
              {secondaryCtaText}
            </Button>
          )}
        </Box>
      </Box>

      {/* ── 5. Bottom Mobile Indicators (4 Chấm chuyển video thông minh) ── */}
      <Box className="relative z-10 w-full flex items-center justify-center gap-2 pt-2">
        {slides.map((s, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => switchVideo(idx)}
              aria-label={`Chuyển sang video ${s.shortTitle}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                isActive
                  ? "w-7 bg-emerald-400 shadow-sm shadow-emerald-400/50"
                  : "w-2 bg-white/30 hover:bg-white/60",
              )}
            />
          );
        })}
      </Box>
    </Box>
  );
}
