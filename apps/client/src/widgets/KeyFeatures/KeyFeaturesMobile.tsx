import * as React from "react";
import {
  MapPin,
  Wifi,
  ThermometerSun,
  Droplets,
  Video,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  ArrowRight,
  Clock,
  Sprout,
  Activity,
  Truck,
  Layers,
  Sparkles,
} from "lucide-react";
import { Box, Button, Badge, Heading, Text } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { KEY_FEATURES_MESSAGES } from "./constants";
import type { KeyFeaturesViewProps } from "./types";

export function KeyFeaturesMobile({
  title = "Hệ Sinh Thái Canh Tác Số 4.0",
  subtitle = "Giám sát nông trại Đạ Sar (Lạc Dương) từ xa qua IoT, camera trực tiếp và vận đơn VietGAP.",
  badgeLabel = "Tính Năng Nổi Bật",
  onNavigatePlots,
  className,
}: KeyFeaturesViewProps) {
  const [activeTab, setActiveTab] = React.useState<0 | 1 | 2>(0);
  const touchStartX = React.useRef<number | null>(null);

  const tabs = [
    { label: "Thuê Đất", icon: MapPin },
    { label: "Camera IoT", icon: Activity },
    { label: "Thu Hoạch", icon: ShieldCheck },
  ] as const;

  // Hỗ trợ vuốt ngón tay chuyển Tab cảm ứng mượt mà
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const swipeThreshold = 50;

    if (diffX > swipeThreshold && activeTab < 2) {
      setActiveTab((prev) => (prev + 1) as 0 | 1 | 2);
    } else if (diffX < -swipeThreshold && activeTab > 0) {
      setActiveTab((prev) => (prev - 1) as 0 | 1 | 2);
    }
    touchStartX.current = null;
  };

  return (
    <section aria-labelledby="key-features-mobile-title" className={cn("space-y-4 px-1", className)}>
      {/* ── 1. Section Header (Gọn gàng, vừa vặn màn hình Mobile) ── */}
      <Box className="text-center space-y-2 px-1">
        <Box className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-[11px] font-bold uppercase tracking-wider">
            {badgeLabel}
          </span>
        </Box>

        <Heading
          level={2}
          id="key-features-mobile-title"
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground leading-snug"
        >
          {title}
        </Heading>

        <Text className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
          {subtitle}
        </Text>
      </Box>

      {/* ── 2. Mobile Feature Quick Switcher Tabs (Không bị tràn/cắt chữ) ── */}
      <Box className="grid grid-cols-3 p-1 bg-muted/60 rounded-xl border border-border/80 gap-1">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeTab === idx;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(idx as 0 | 1 | 2)}
              className={cn(
                "flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
                isActive
                  ? "bg-card text-foreground shadow-xs border border-border/80 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("w-3.5 h-3.5 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </Box>

      {/* ── 3. Active Mobile Feature Card (Vuốt Touch Swipe để đổi) ── */}
      <Box
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative touch-pan-y"
      >
        {activeTab === 0 && (
          <Box className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-card border border-emerald-200/80 dark:border-emerald-900/60 shadow-xs space-y-3.5 transition-all">
            {/* Header */}
            <Box className="flex items-center justify-between gap-2">
              <Box className="flex items-center gap-2 min-w-0">
                <Box className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0">
                  <MapPin className="w-4 h-4" />
                </Box>
                <Box className="min-w-0">
                  <Text className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    {KEY_FEATURES_MESSAGES.CARD1_CATEGORY}
                  </Text>
                  <Heading level={3} className="text-sm sm:text-base font-bold text-foreground truncate">
                    {KEY_FEATURES_MESSAGES.CARD1_TITLE}
                  </Heading>
                </Box>
              </Box>

              <Badge
                variant="outline"
                className="shrink-0 flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
              >
                <Clock className="w-2.5 h-2.5 text-emerald-600 animate-pulse" />
                {KEY_FEATURES_MESSAGES.CARD1_TAG}
              </Badge>
            </Box>

            {/* Core Feature Insight */}
            <Box className="p-3 rounded-xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
              <Box className="flex items-center justify-between text-xs">
                <span className="font-semibold text-muted-foreground flex items-center gap-1.5 text-[11px]">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" /> {KEY_FEATURES_MESSAGES.CARD1_MAP_LABEL}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                  {KEY_FEATURES_MESSAGES.CARD1_LOCATION}
                </span>
              </Box>

              <Box className="flex items-start gap-2 p-2 rounded-lg bg-card border border-border/80">
                <Box className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-950/70 flex items-center justify-center text-emerald-600 shrink-0">
                  <Sprout className="w-3.5 h-3.5" />
                </Box>
                <Box className="space-y-0.5 min-w-0">
                  <Text className="text-xs font-bold text-foreground truncate">
                    {KEY_FEATURES_MESSAGES.CARD1_CROP_TITLE}
                  </Text>
                  <Text className="text-[10px] text-muted-foreground truncate">
                    {KEY_FEATURES_MESSAGES.CARD1_CROP_DESC}
                  </Text>
                </Box>
              </Box>

              <Box className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-border text-[10px]">
                <span className="text-muted-foreground font-medium">
                  {KEY_FEATURES_MESSAGES.CARD1_PAYMENT_METHOD}
                </span>
                <span className="font-bold text-emerald-600">
                  {KEY_FEATURES_MESSAGES.CARD1_PAYMENT_STATUS}
                </span>
              </Box>
            </Box>

            <Text className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {KEY_FEATURES_MESSAGES.CARD1_DESC}
            </Text>

            <Button
              type="button"
              variant="outline"
              className="w-full min-h-[42px] rounded-xl font-bold text-xs text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer"
              onClick={onNavigatePlots}
            >
              <span>{KEY_FEATURES_MESSAGES.CARD1_ACTION}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Box>
        )}

        {activeTab === 1 && (
          <Box className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-card border border-sky-200/80 dark:border-sky-900/60 shadow-xs space-y-3.5 transition-all">
            {/* Header */}
            <Box className="flex items-center justify-between gap-2">
              <Box className="flex items-center gap-2 min-w-0">
                <Box className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-sky-700 dark:text-sky-300 shrink-0">
                  <Activity className="w-4 h-4" />
                </Box>
                <Box className="min-w-0">
                  <Text className="text-[10px] font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-400">
                    {KEY_FEATURES_MESSAGES.CARD2_CATEGORY}
                  </Text>
                  <Heading level={3} className="text-sm sm:text-base font-bold text-foreground truncate">
                    {KEY_FEATURES_MESSAGES.CARD2_TITLE}
                  </Heading>
                </Box>
              </Box>

              <Badge
                variant="secondary"
                className="shrink-0 flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-foreground"
              >
                <Wifi className="w-2.5 h-2.5 text-emerald-600 animate-pulse" />
                {KEY_FEATURES_MESSAGES.CARD2_TAG}
              </Badge>
            </Box>

            {/* Core Feature: 3 Key High-Contrast IoT Metrics */}
            <Box className="grid grid-cols-3 gap-1.5 p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <Box className="flex flex-col items-center justify-center p-2 rounded-lg bg-card border border-border/70 text-center">
                <ThermometerSun className="w-3.5 h-3.5 text-amber-500 mb-0.5" />
                <span className="text-[9px] uppercase font-bold text-muted-foreground">
                  {KEY_FEATURES_MESSAGES.CARD2_TEMP_LABEL}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-foreground mt-0.5">
                  {KEY_FEATURES_MESSAGES.CARD2_TEMP_VALUE}
                </span>
              </Box>

              <Box className="flex flex-col items-center justify-center p-2 rounded-lg bg-card border border-border/70 text-center">
                <Droplets className="w-3.5 h-3.5 text-sky-500 mb-0.5" />
                <span className="text-[9px] uppercase font-bold text-muted-foreground">
                  {KEY_FEATURES_MESSAGES.CARD2_HUMIDITY_LABEL}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-foreground mt-0.5">
                  {KEY_FEATURES_MESSAGES.CARD2_HUMIDITY_VALUE}
                </span>
              </Box>

              <Box className="flex flex-col items-center justify-center p-2 rounded-lg bg-card border border-border/70 text-center">
                <Video className="w-3.5 h-3.5 text-emerald-500 mb-0.5" />
                <span className="text-[9px] uppercase font-bold text-muted-foreground">
                  {KEY_FEATURES_MESSAGES.CARD2_CAMERA_LABEL}
                </span>
                <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {KEY_FEATURES_MESSAGES.CARD2_CAMERA_VALUE}
                </span>
              </Box>
            </Box>

            <Box className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 text-[11px]">
              <span className="text-emerald-900 dark:text-emerald-100 font-medium">
                {KEY_FEATURES_MESSAGES.CARD2_SERVICE_TITLE}
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {KEY_FEATURES_MESSAGES.CARD2_SERVICE_VALUE}
              </span>
            </Box>

            <Text className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {KEY_FEATURES_MESSAGES.CARD2_DESC}
            </Text>

            <Button
              type="button"
              variant="outline"
              className="w-full min-h-[42px] rounded-xl font-bold text-xs text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-950/50 flex items-center justify-center gap-2 cursor-pointer"
              onClick={onNavigatePlots}
            >
              <span>{KEY_FEATURES_MESSAGES.CARD2_ACTION}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Box>
        )}

        {activeTab === 2 && (
          <Box className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-card border border-amber-200/80 dark:border-amber-900/60 shadow-xs space-y-3.5 transition-all">
            {/* Header */}
            <Box className="flex items-center justify-between gap-2">
              <Box className="flex items-center gap-2 min-w-0">
                <Box className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-700 dark:text-amber-300 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </Box>
                <Box className="min-w-0">
                  <Text className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    {KEY_FEATURES_MESSAGES.CARD3_CATEGORY}
                  </Text>
                  <Heading level={3} className="text-sm sm:text-base font-bold text-foreground truncate">
                    {KEY_FEATURES_MESSAGES.CARD3_TITLE}
                  </Heading>
                </Box>
              </Box>

              <Badge
                variant="outline"
                className="shrink-0 flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full border-amber-300 bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-amber-600" />
                {KEY_FEATURES_MESSAGES.CARD3_TAG}
              </Badge>
            </Box>

            {/* Core Feature: QR Tracking Code */}
            <Box className="p-3 rounded-xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <Box className="flex items-center gap-2 p-2 rounded-lg bg-card border border-border/80">
                <Box className="w-8 h-8 rounded-md bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-700 shrink-0 border border-amber-200/70 dark:border-amber-900/70">
                  <QrCode className="w-4 h-4" />
                </Box>
                <Box className="space-y-0.5 min-w-0">
                  <Text className="text-xs font-bold text-foreground truncate">
                    Mã Vận Đơn: AGRI-VN-2026-K8X29Q
                  </Text>
                  <Text className="text-[10px] text-muted-foreground truncate">
                    {KEY_FEATURES_MESSAGES.CARD3_WAYBILL_DESC}
                  </Text>
                </Box>
              </Box>

              <Box className="space-y-1 pt-0.5">
                <Box className="flex items-center gap-1.5 text-[11px] text-foreground font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="truncate">{KEY_FEATURES_MESSAGES.CARD3_CHECK1}</span>
                </Box>
                <Box className="flex items-center gap-1.5 text-[11px] text-foreground font-medium">
                  <Truck className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="truncate">{KEY_FEATURES_MESSAGES.CARD3_CHECK2}</span>
                </Box>
              </Box>
            </Box>

            <Text className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {KEY_FEATURES_MESSAGES.CARD3_DESC}
            </Text>

            <Button
              type="button"
              variant="outline"
              className="w-full min-h-[42px] rounded-xl font-bold text-xs text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-950/50 flex items-center justify-center gap-2 cursor-pointer"
              onClick={onNavigatePlots}
            >
              <span>{KEY_FEATURES_MESSAGES.CARD3_ACTION}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Box>
        )}
      </Box>

      {/* ── 4. Minimalist Dot Indicator (Gợi ý vuốt nhẹ nhàng, không chiếm chỗ) ── */}
      <Box className="flex items-center justify-center gap-1.5 pt-1">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveTab(idx as 0 | 1 | 2)}
            aria-label={`Chuyển tới thẻ ${idx + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
              activeTab === idx ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
            )}
          />
        ))}
      </Box>
    </section>
  );
}
