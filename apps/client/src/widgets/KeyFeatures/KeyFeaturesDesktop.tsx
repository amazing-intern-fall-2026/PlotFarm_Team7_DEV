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
import { Box, Button, Badge, Card, Heading, Text } from "@/shared/ui";
import { KEY_FEATURES_MESSAGES } from "./constants";
import type { KeyFeaturesViewProps } from "./types";

export function KeyFeaturesDesktop({
  title = KEY_FEATURES_MESSAGES.TITLE,
  subtitle = KEY_FEATURES_MESSAGES.SUBTITLE,
  badgeLabel = KEY_FEATURES_MESSAGES.BADGE_LABEL,
  onNavigatePlots,
  className,
}: KeyFeaturesViewProps) {
  return (
    <section aria-labelledby="key-features-desktop-title" className={className}>
      {/* ── 1. Section Header & Focal Typography ── */}
      <Box className="text-center space-y-3.5 max-w-3xl mx-auto px-4 mb-10">
        <Badge
          variant="outline"
          className="gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase text-secondary border-secondary/30"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {badgeLabel}
        </Badge>

        <Heading
          level={2}
          id="key-features-desktop-title"
          className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
        >
          {title}
        </Heading>

        <Text className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </Text>
      </Box>

      {/* ── 2. Desktop Bento Grid: 3 Equal High-Impact Columns ── */}
      <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* ── CARD 1: Phân Hệ Thuê Ô Đất & Thanh Toán VietQR ── */}
        <Card className="h-full flex flex-col justify-between p-6 hover:border-primary/40 transition-all group">
          {/* Card Header */}
          <Box className="space-y-4">
            <Box className="flex items-center justify-between gap-3">
              <Box className="flex items-center gap-2.5">
                <Box className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shadow-xs">
                  <MapPin className="w-5 h-5" />
                </Box>
                <Box>
                  <Text className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {KEY_FEATURES_MESSAGES.CARD1_CATEGORY}
                  </Text>
                  <Heading level={3} className="text-base sm:text-lg font-bold text-foreground">
                    {KEY_FEATURES_MESSAGES.CARD1_TITLE}
                  </Heading>
                </Box>
              </Box>

              {/* Concurrency Lock Badge */}
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold"
              >
                <Clock className="w-3 h-3 text-primary animate-pulse" />
                {KEY_FEATURES_MESSAGES.CARD1_TAG}
              </Badge>
            </Box>

            {/* Core Feature Insight Card */}
            <Box className="p-4 rounded-xl bg-muted/40 border border-border space-y-3.5">
              <Box className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-primary" /> {KEY_FEATURES_MESSAGES.CARD1_MAP_LABEL}
                </span>
                <Badge variant="secondary" className="text-[11px] font-bold px-2 py-0.5">
                  {KEY_FEATURES_MESSAGES.CARD1_LOCATION}
                </Badge>
              </Box>

              {/* Crop Seasonality Highlight */}
              <Box className="flex items-start gap-3 p-2.5 rounded-lg bg-card border border-border/80 shadow-2xs">
                <Box className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Sprout className="w-4 h-4" />
                </Box>
                <Box className="space-y-0.5 min-w-0">
                  <Text className="text-xs font-bold text-foreground truncate">
                    {KEY_FEATURES_MESSAGES.CARD1_CROP_TITLE}
                  </Text>
                  <Text className="text-[11px] text-muted-foreground">
                    {KEY_FEATURES_MESSAGES.CARD1_CROP_DESC}
                  </Text>
                </Box>
              </Box>

              {/* Real VietQR payment pill */}
              <Box className="flex items-center justify-between px-3 py-2 rounded-lg bg-card border border-border text-[11px]">
                <span className="text-muted-foreground font-medium">
                  {KEY_FEATURES_MESSAGES.CARD1_PAYMENT_METHOD}
                </span>
                <span className="font-bold text-primary">
                  {KEY_FEATURES_MESSAGES.CARD1_PAYMENT_STATUS}
                </span>
              </Box>
            </Box>

            <Text className="text-xs text-muted-foreground leading-relaxed">
              {KEY_FEATURES_MESSAGES.CARD1_DESC}
            </Text>
          </Box>

          {/* Card Footer / Action Button */}
          <Box className="pt-6 mt-auto">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onNavigatePlots}
              rightIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            >
              {KEY_FEATURES_MESSAGES.CARD1_ACTION}
            </Button>
          </Box>
        </Card>

        {/* ── CARD 2: Giám Sát Camera HLS & Telemetry IoT ── */}
        <Card className="h-full flex flex-col justify-between p-6 hover:border-primary/40 transition-all group">
          {/* Card Header */}
          <Box className="space-y-4">
            <Box className="flex items-center justify-between gap-3">
              <Box className="flex items-center gap-2.5">
                <Box className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shadow-xs">
                  <Activity className="w-5 h-5" />
                </Box>
                <Box>
                  <Text className="text-xs font-semibold uppercase tracking-wider text-secondary">
                    {KEY_FEATURES_MESSAGES.CARD2_CATEGORY}
                  </Text>
                  <Heading level={3} className="text-base sm:text-lg font-bold text-foreground">
                    {KEY_FEATURES_MESSAGES.CARD2_TITLE}
                  </Heading>
                </Box>
              </Box>

              {/* Active Plot Badge */}
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold"
              >
                <Wifi className="w-3 h-3 text-primary animate-pulse" />
                {KEY_FEATURES_MESSAGES.CARD2_TAG}
              </Badge>
            </Box>

            {/* Core Feature: 3 Key High-Contrast IoT Metrics */}
            <Box className="grid grid-cols-3 gap-2.5 p-3.5 rounded-xl bg-muted/40 border border-border">
              <Box className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-card border border-border/70 text-center shadow-2xs">
                <ThermometerSun className="w-4 h-4 text-secondary mb-1" />
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                  {KEY_FEATURES_MESSAGES.CARD2_TEMP_LABEL}
                </span>
                <span className="text-base sm:text-lg font-extrabold text-foreground tracking-tight mt-0.5">
                  {KEY_FEATURES_MESSAGES.CARD2_TEMP_VALUE}
                </span>
              </Box>

              <Box className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-card border border-border/70 text-center shadow-2xs">
                <Droplets className="w-4 h-4 text-primary mb-1" />
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                  {KEY_FEATURES_MESSAGES.CARD2_HUMIDITY_LABEL}
                </span>
                <span className="text-base sm:text-lg font-extrabold text-foreground tracking-tight mt-0.5">
                  {KEY_FEATURES_MESSAGES.CARD2_HUMIDITY_VALUE}
                </span>
              </Box>

              <Box className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-card border border-border/70 text-center shadow-2xs">
                <Video className="w-4 h-4 text-primary mb-1" />
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                  {KEY_FEATURES_MESSAGES.CARD2_CAMERA_LABEL}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-primary tracking-tight mt-1">
                  {KEY_FEATURES_MESSAGES.CARD2_CAMERA_VALUE}
                </span>
              </Box>
            </Box>

            {/* Care service highlight */}
            <Box className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-muted/40 border border-border text-xs">
              <span className="text-foreground font-medium">
                {KEY_FEATURES_MESSAGES.CARD2_SERVICE_TITLE}
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {KEY_FEATURES_MESSAGES.CARD2_SERVICE_VALUE}
              </span>
            </Box>

            <Text className="text-xs text-muted-foreground leading-relaxed">
              {KEY_FEATURES_MESSAGES.CARD2_DESC}
            </Text>
          </Box>

          {/* Card Footer / Action Button */}
          <Box className="pt-6 mt-auto">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onNavigatePlots}
              rightIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            >
              {KEY_FEATURES_MESSAGES.CARD2_ACTION}
            </Button>
          </Box>
        </Card>

        {/* ── CARD 3: Thu Hoạch & Tra Cứu Vận Đơn QR A6 ── */}
        <Card className="h-full flex flex-col justify-between p-6 hover:border-primary/40 transition-all group">
          {/* Card Header */}
          <Box className="space-y-4">
            <Box className="flex items-center justify-between gap-3">
              <Box className="flex items-center gap-2.5">
                <Box className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </Box>
                <Box>
                  <Text className="text-xs font-semibold uppercase tracking-wider text-secondary">
                    {KEY_FEATURES_MESSAGES.CARD3_CATEGORY}
                  </Text>
                  <Heading level={3} className="text-base sm:text-lg font-bold text-foreground">
                    {KEY_FEATURES_MESSAGES.CARD3_TITLE}
                  </Heading>
                </Box>
              </Box>

              {/* Certification Badge */}
              <Badge
                variant="outline"
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                {KEY_FEATURES_MESSAGES.CARD3_TAG}
              </Badge>
            </Box>

            {/* Core Feature: QR Tracking Code & Format */}
            <Box className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-3">
              <Box className="flex items-center gap-3 p-2.5 rounded-lg bg-card border border-border/80 shadow-2xs">
                <Box className="w-11 h-11 rounded-md bg-secondary/10 flex items-center justify-center text-secondary shrink-0 border border-secondary/20">
                  <QrCode className="w-6 h-6" />
                </Box>
                <Box className="space-y-0.5 min-w-0">
                  <Text className="text-xs font-bold text-foreground truncate">
                    {KEY_FEATURES_MESSAGES.CARD3_WAYBILL_CODE}
                  </Text>
                  <Text className="text-[11px] text-muted-foreground">
                    {KEY_FEATURES_MESSAGES.CARD3_WAYBILL_DESC}
                  </Text>
                </Box>
              </Box>

              <Box className="space-y-2 pt-1">
                <Box className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{KEY_FEATURES_MESSAGES.CARD3_CHECK1}</span>
                </Box>
                <Box className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <Truck className="w-4 h-4 text-primary shrink-0" />
                  <span>{KEY_FEATURES_MESSAGES.CARD3_CHECK2}</span>
                </Box>
              </Box>
            </Box>

            <Text className="text-xs text-muted-foreground leading-relaxed">
              {KEY_FEATURES_MESSAGES.CARD3_DESC}
            </Text>
          </Box>

          {/* Card Footer / Action Button */}
          <Box className="pt-6 mt-auto">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onNavigatePlots}
              rightIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            >
              {KEY_FEATURES_MESSAGES.CARD3_ACTION}
            </Button>
          </Box>
        </Card>
      </Box>
    </section>
  );
}

