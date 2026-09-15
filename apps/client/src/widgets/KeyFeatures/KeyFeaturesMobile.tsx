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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Box, Button, Badge, Heading, Text } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { KEY_FEATURES_MESSAGES } from "./constants";
import type { KeyFeaturesViewProps } from "./types";

export function KeyFeaturesMobile({
  title = KEY_FEATURES_MESSAGES.TITLE,
  subtitle = KEY_FEATURES_MESSAGES.SUBTITLE,
  badgeLabel = KEY_FEATURES_MESSAGES.BADGE_LABEL,
  onNavigatePlots,
  className,
}: KeyFeaturesViewProps) {
  const [activeTab, setActiveTab] = React.useState<0 | 1 | 2>(0);

  const tabs = [
    { label: "1. Thuê Ô Đất", icon: MapPin },
    { label: "2. Camera & IoT", icon: Activity },
    { label: "3. Thu Hoạch & QR", icon: ShieldCheck },
  ] as const;

  return (
    <section aria-labelledby="key-features-mobile-title" className={cn("space-y-6 px-1", className)}>
      {/* ── 1. Section Header ── */}
      <Box className="text-center space-y-2.5 px-2">
        <Box className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
          <Sparkles className="w-3 h-3" />
          <span className="text-[11px] font-bold uppercase tracking-wider">
            {badgeLabel}
          </span>
        </Box>

        <Heading
          level={2}
          id="key-features-mobile-title"
          className="text-2xl font-extrabold tracking-tight text-foreground leading-snug"
        >
          {title}
        </Heading>

        <Text className="text-xs text-muted-foreground leading-relaxed">
          {subtitle}
        </Text>
      </Box>

      {/* ── 2. Mobile Feature Quick Switcher Tabs ── */}
      <Box className="flex items-center justify-between p-1 bg-muted/60 rounded-xl border border-border/80 gap-1">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeTab === idx;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(idx as 0 | 1 | 2)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-all",
                isActive
                  ? "bg-card text-foreground shadow-xs border border-border/80"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("w-3.5 h-3.5", isActive ? "text-primary" : "text-muted-foreground")} />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </Box>

      {/* ── 3. Active Mobile Feature Card ── */}
      <Box className="relative">
        {activeTab === 0 && (
          <Box className="flex flex-col justify-between p-5 rounded-2xl bg-card border border-emerald-200/80 dark:border-emerald-900/60 shadow-sm space-y-4">
            {/* Header */}
            <Box className="flex items-center justify-between gap-2">
              <Box className="flex items-center gap-2">
                <Box className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                  <MapPin className="w-4 h-4" />
                </Box>
                <Box>
                  <Text className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    {KEY_FEATURES_MESSAGES.CARD1_CATEGORY}
                  </Text>
                  <Heading level={3} className="text-base font-bold text-foreground">
                    {KEY_FEATURES_MESSAGES.CARD1_TITLE}
                  </Heading>
                </Box>
              </Box>

              <Badge
                variant="outline"
                className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
              >
                <Clock className="w-3 h-3 text-emerald-600 animate-pulse" />
                {KEY_FEATURES_MESSAGES.CARD1_TAG}
              </Badge>
            </Box>

            {/* Core Feature Insight */}
            <Box className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <Box className="flex items-center justify-between text-xs">
                <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" /> {KEY_FEATURES_MESSAGES.CARD1_MAP_LABEL}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                  {KEY_FEATURES_MESSAGES.CARD1_LOCATION}
                </span>
              </Box>

              <Box className="flex items-start gap-2.5 p-2.5 rounded-lg bg-card border border-border/80">
                <Box className="w-7 h-7 rounded-md bg-emerald-50 dark:bg-emerald-950/70 flex items-center justify-center text-emerald-600 shrink-0">
                  <Sprout className="w-3.5 h-3.5" />
                </Box>
                <Box className="space-y-0.5 min-w-0">
                  <Text className="text-xs font-bold text-foreground truncate">
                    {KEY_FEATURES_MESSAGES.CARD1_CROP_TITLE}
                  </Text>
                  <Text className="text-[11px] text-muted-foreground line-clamp-1">
                    {KEY_FEATURES_MESSAGES.CARD1_CROP_DESC}
                  </Text>
                </Box>
              </Box>

              <Box className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-border text-[11px]">
                <span className="text-muted-foreground font-medium">
                  {KEY_FEATURES_MESSAGES.CARD1_PAYMENT_METHOD}
                </span>
                <span className="font-bold text-emerald-600">
                  {KEY_FEATURES_MESSAGES.CARD1_PAYMENT_STATUS}
                </span>
              </Box>
            </Box>

            <Text className="text-xs text-muted-foreground leading-relaxed">
              {KEY_FEATURES_MESSAGES.CARD1_DESC}
            </Text>

            <Button
              type="button"
              variant="outline"
              className="w-full min-h-[44px] rounded-xl font-bold text-xs text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer"
              onClick={onNavigatePlots}
            >
              <span>{KEY_FEATURES_MESSAGES.CARD1_ACTION}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Box>
        )}

        {activeTab === 1 && (
          <Box className="flex flex-col justify-between p-5 rounded-2xl bg-card border border-sky-200/80 dark:border-sky-900/60 shadow-sm space-y-4">
            {/* Header */}
            <Box className="flex items-center justify-between gap-2">
              <Box className="flex items-center gap-2">
                <Box className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-sky-700 dark:text-sky-300">
                  <Activity className="w-4 h-4" />
                </Box>
                <Box>
                  <Text className="text-[10px] font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-400">
                    {KEY_FEATURES_MESSAGES.CARD2_CATEGORY}
                  </Text>
                  <Heading level={3} className="text-base font-bold text-foreground">
                    {KEY_FEATURES_MESSAGES.CARD2_TITLE}
                  </Heading>
                </Box>
              </Box>

              <Badge
                variant="secondary"
                className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-foreground"
              >
                <Wifi className="w-3 h-3 text-emerald-600 animate-pulse" />
                {KEY_FEATURES_MESSAGES.CARD2_TAG}
              </Badge>
            </Box>

            {/* Core Feature: 3 Key High-Contrast IoT Metrics */}
            <Box className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <Box className="flex flex-col items-center justify-center p-2 rounded-lg bg-card border border-border/70 text-center">
                <ThermometerSun className="w-4 h-4 text-amber-500 mb-1" />
                <span className="text-[9px] uppercase font-bold text-muted-foreground">
                  {KEY_FEATURES_MESSAGES.CARD2_TEMP_LABEL}
                </span>
                <span className="text-sm font-extrabold text-foreground mt-0.5">
                  {KEY_FEATURES_MESSAGES.CARD2_TEMP_VALUE}
                </span>
              </Box>

              <Box className="flex flex-col items-center justify-center p-2 rounded-lg bg-card border border-border/70 text-center">
                <Droplets className="w-4 h-4 text-sky-500 mb-1" />
                <span className="text-[9px] uppercase font-bold text-muted-foreground">
                  {KEY_FEATURES_MESSAGES.CARD2_HUMIDITY_LABEL}
                </span>
                <span className="text-sm font-extrabold text-foreground mt-0.5">
                  {KEY_FEATURES_MESSAGES.CARD2_HUMIDITY_VALUE}
                </span>
              </Box>

              <Box className="flex flex-col items-center justify-center p-2 rounded-lg bg-card border border-border/70 text-center">
                <Video className="w-4 h-4 text-emerald-500 mb-1" />
                <span className="text-[9px] uppercase font-bold text-muted-foreground">
                  {KEY_FEATURES_MESSAGES.CARD2_CAMERA_LABEL}
                </span>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                  {KEY_FEATURES_MESSAGES.CARD2_CAMERA_VALUE}
                </span>
              </Box>
            </Box>

            <Box className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 text-xs">
              <span className="text-emerald-900 dark:text-emerald-100 font-medium">
                {KEY_FEATURES_MESSAGES.CARD2_SERVICE_TITLE}
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {KEY_FEATURES_MESSAGES.CARD2_SERVICE_VALUE}
              </span>
            </Box>

            <Text className="text-xs text-muted-foreground leading-relaxed">
              {KEY_FEATURES_MESSAGES.CARD2_DESC}
            </Text>

            <Button
              type="button"
              variant="outline"
              className="w-full min-h-[44px] rounded-xl font-bold text-xs text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-950/50 flex items-center justify-center gap-2 cursor-pointer"
              onClick={onNavigatePlots}
            >
              <span>{KEY_FEATURES_MESSAGES.CARD2_ACTION}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Box>
        )}

        {activeTab === 2 && (
          <Box className="flex flex-col justify-between p-5 rounded-2xl bg-card border border-amber-200/80 dark:border-amber-900/60 shadow-sm space-y-4">
            {/* Header */}
            <Box className="flex items-center justify-between gap-2">
              <Box className="flex items-center gap-2">
                <Box className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-700 dark:text-amber-300">
                  <ShieldCheck className="w-4 h-4" />
                </Box>
                <Box>
                  <Text className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    {KEY_FEATURES_MESSAGES.CARD3_CATEGORY}
                  </Text>
                  <Heading level={3} className="text-base font-bold text-foreground">
                    {KEY_FEATURES_MESSAGES.CARD3_TITLE}
                  </Heading>
                </Box>
              </Box>

              <Badge
                variant="outline"
                className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full border-amber-300 bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
              >
                <CheckCircle2 className="w-3 h-3 text-amber-600" />
                {KEY_FEATURES_MESSAGES.CARD3_TAG}
              </Badge>
            </Box>

            {/* Core Feature: QR Tracking Code */}
            <Box className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
              <Box className="flex items-center gap-2.5 p-2 rounded-lg bg-card border border-border/80">
                <Box className="w-9 h-9 rounded-md bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-700 shrink-0 border border-amber-200/70 dark:border-amber-900/70">
                  <QrCode className="w-5 h-5" />
                </Box>
                <Box className="space-y-0.5 min-w-0">
                  <Text className="text-xs font-bold text-foreground truncate">
                    {KEY_FEATURES_MESSAGES.CARD3_WAYBILL_CODE}
                  </Text>
                  <Text className="text-[10px] text-muted-foreground line-clamp-1">
                    {KEY_FEATURES_MESSAGES.CARD3_WAYBILL_DESC}
                  </Text>
                </Box>
              </Box>

              <Box className="space-y-1.5 pt-0.5">
                <Box className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-[11px]">{KEY_FEATURES_MESSAGES.CARD3_CHECK1}</span>
                </Box>
                <Box className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-[11px]">{KEY_FEATURES_MESSAGES.CARD3_CHECK2}</span>
                </Box>
              </Box>
            </Box>

            <Text className="text-xs text-muted-foreground leading-relaxed">
              {KEY_FEATURES_MESSAGES.CARD3_DESC}
            </Text>

            <Button
              type="button"
              variant="outline"
              className="w-full min-h-[44px] rounded-xl font-bold text-xs text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-950/50 flex items-center justify-center gap-2 cursor-pointer"
              onClick={onNavigatePlots}
            >
              <span>{KEY_FEATURES_MESSAGES.CARD3_ACTION}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Box>
        )}
      </Box>

      {/* ── 4. Mobile Step Progress Indicator ── */}
      <Box className="flex items-center justify-between px-2 pt-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={activeTab === 0}
          onClick={() => setActiveTab((prev) => (Math.max(0, prev - 1) as 0 | 1 | 2))}
          className="h-8 px-2 text-xs text-muted-foreground disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Trước
        </Button>

        <Box className="flex items-center gap-1.5">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx as 0 | 1 | 2)}
              aria-label={`Chuyển tới phân hệ ${idx + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeTab === idx ? "w-6 bg-primary" : "w-1.5 bg-border"
              )}
            />
          ))}
        </Box>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={activeTab === 2}
          onClick={() => setActiveTab((prev) => (Math.min(2, prev + 1) as 0 | 1 | 2))}
          className="h-8 px-2 text-xs text-muted-foreground disabled:opacity-30"
        >
          Tiếp
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </Box>
    </section>
  );
}
