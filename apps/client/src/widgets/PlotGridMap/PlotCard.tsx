import { Lock, Sprout, Wrench, Video, Cpu, CheckCircle2, ChevronRight, Layers } from "lucide-react";
import { Card, Button, Badge, Heading, Text, Box } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { PLOT_STATUS_CONFIG, PLOT_CARD_MESSAGES, getPlotImageUrl } from "./constants";
import type { PlotCardProps } from "./types";

export function PlotCard({ plot, onSelect, className }: PlotCardProps) {
  const isAvailable = plot.status === "AVAILABLE";
  const isReserved = plot.status === "RESERVED";
  const isOccupied = plot.status === "OCCUPIED";
  const isMaintenance = plot.status === "MAINTENANCE";

  const statusConfig = PLOT_STATUS_CONFIG[plot.status] || PLOT_STATUS_CONFIG.AVAILABLE;

  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(plot.pricePerMonth);

  const plotImageUrl = getPlotImageUrl(plot);

  return (
    <Card
      onClick={() => {
        if (isAvailable && onSelect) {
          onSelect(plot);
        }
      }}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl overflow-hidden p-0 transition-all duration-300 select-none",
        "bg-card border border-border/80 shadow-xs hover:shadow-md",
        isAvailable && [
          "border-primary/40 hover:border-primary hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer",
        ],
        isReserved && [
          "border-amber-200/80 bg-amber-50/10 opacity-95",
        ],
        isOccupied && [
          "border-border/80 bg-muted/20 opacity-95",
        ],
        isMaintenance && [
          "border-dashed border-amber-300/80 bg-amber-100/10 opacity-90",
        ],
        className
      )}
    >
      {/* ── 1. Thumbnail Ảnh Ô Đất với Overlay Badges ── */}
      <Box className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-100 dark:bg-muted">
        <img
          src={plotImageUrl}
          alt={plot.plotNumber}
          loading="lazy"
          className={cn(
            "w-full h-full object-cover transition-transform duration-500 ease-out",
            isAvailable && "group-hover:scale-105"
          )}
        />
        {/* Scrim overlay nhẹ để đọc rõ text */}
        <Box className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Top-left: Mã ô đất */}
        <Box className="absolute top-2.5 left-2.5">
          <Badge
            variant="outline"
            className="backdrop-blur-md bg-black/60 border-white/20 text-white font-mono font-bold text-[11px] px-2 py-0.5 shadow-xs"
          >
            #{plot.plotCode}
          </Badge>
        </Box>

        {/* Top-right: Badge trạng thái với backdrop blur */}
        <Box className="absolute top-2.5 right-2.5">
          {isAvailable && (
            <Badge
              variant="success"
              className="backdrop-blur-md shadow-xs text-xs font-semibold px-2 py-0.5"
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              {statusConfig.badgeText}
            </Badge>
          )}

          {isReserved && (
            <Badge
              variant="warning"
              className="backdrop-blur-md shadow-xs text-xs font-semibold px-2 py-0.5"
            >
              <Lock className="h-3 w-3 mr-1" />
              {statusConfig.badgeText}
            </Badge>
          )}

          {isOccupied && (
            <Badge
              variant="secondary"
              className="backdrop-blur-md shadow-xs text-xs font-medium px-2 py-0.5 bg-slate-900/80 text-white border-white/20"
            >
              <Sprout className="h-3 w-3 mr-1 text-emerald-400" />
              {statusConfig.badgeText}
            </Badge>
          )}

          {isMaintenance && (
            <Badge
              variant="outline"
              className="backdrop-blur-md shadow-xs text-xs font-medium border-amber-300 text-amber-900 bg-amber-100/90 px-2 py-0.5"
            >
              <Wrench className="h-3 w-3 mr-1 text-amber-600" />
              {statusConfig.badgeText}
            </Badge>
          )}
        </Box>

        {/* Bottom-right: Cảm biến & Camera Indicators trên ảnh */}
        <Box className="absolute bottom-2 right-2 flex items-center gap-1.5 backdrop-blur-md bg-black/55 px-2 py-0.5 rounded-md text-white text-xs">
          {plot.cameraSupported && (
            <Box title={PLOT_CARD_MESSAGES.TOOLTIP_CAMERA} className="inline-flex items-center text-white/90">
              <Video className="h-3.5 w-3.5" />
            </Box>
          )}
          {plot.iotSensorInstalled && (
            <Box title={PLOT_CARD_MESSAGES.TOOLTIP_IOT} className="inline-flex items-center text-emerald-400">
              <Cpu className="h-3.5 w-3.5" />
            </Box>
          )}
        </Box>
      </Box>

      {/* ── 2. Nội Dung Thông Tin Chi Tiết (Padding p-4 sm:p-5) ── */}
      <Box className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3.5">
        <Box className="space-y-2">
          {/* Tên ô đất & Khu vực */}
          <Box>
            <Heading
              as="h3"
              className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1"
            >
              {plot.plotNumber}
            </Heading>
            {plot.zone && (
              <Text variant="small" className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                {plot.zone}
              </Text>
            )}
          </Box>

          {/* Thông số diện tích & cây trồng / đất */}
          <Box className="flex items-center justify-between text-xs pt-2 border-t border-border/60">
            <Box className="flex items-center gap-1.5 text-muted-foreground">
              <Layers className="h-3.5 w-3.5 text-primary shrink-0" />
              <Text variant="small">
                {PLOT_CARD_MESSAGES.AREA_LABEL}{" "}
                <Text as="span" className="text-foreground font-semibold">
                  {plot.areaSquareMeters}m²
                </Text>
              </Text>
            </Box>

            {/* Cây trồng hiện tại (nếu Occupied) hoặc Loại đất */}
            {isOccupied && plot.cropName ? (
              <Box className="flex items-center gap-1 text-primary font-medium">
                <Sprout className="h-3.5 w-3.5 shrink-0" />
                <Text variant="small" className="text-primary font-medium truncate max-w-[130px]">
                  {PLOT_CARD_MESSAGES.CROP_PREFIX}{plot.cropName}
                </Text>
              </Box>
            ) : (
              <Text variant="small" className="text-muted-foreground truncate max-w-[130px]">
                {PLOT_CARD_MESSAGES.SOIL_PREFIX}{plot.soilType || PLOT_CARD_MESSAGES.SOIL_DEFAULT}
              </Text>
            )}
          </Box>
        </Box>

        {/* ── 3. Bottom Section: Giá thuê & Nút thao tác ── */}
        <Box className="pt-3 border-t border-border/60 space-y-3">
          <Box className="flex items-baseline justify-between">
            <Text variant="small" className="text-xs text-muted-foreground">
              {PLOT_CARD_MESSAGES.PRICE_LABEL}
            </Text>
            <Text className="text-base font-bold text-foreground">
              {formattedPrice}
            </Text>
          </Box>

          {/* Nút hành động theo trạng thái */}
          {isAvailable ? (
            <Button
              variant="default"
              size="default"
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(plot);
              }}
              rightIcon={<ChevronRight className="h-4 w-4" />}
              className="w-full h-10 rounded-xl font-semibold text-xs sm:text-sm cursor-pointer shadow-sm shadow-primary/20"
            >
              {statusConfig.buttonText}
            </Button>
          ) : isReserved ? (
            <Button
              variant="outline"
              size="default"
              disabled
              leftIcon={<Lock className="h-3.5 w-3.5" />}
              className="w-full h-10 rounded-xl text-xs sm:text-sm text-amber-700 dark:text-amber-400 bg-amber-50/40 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-800"
            >
              {statusConfig.buttonText}
            </Button>
          ) : isOccupied ? (
            <Button
              variant="outline"
              size="default"
              disabled
              className="w-full h-10 rounded-xl text-xs sm:text-sm text-muted-foreground bg-muted/40 cursor-not-allowed"
            >
              {statusConfig.buttonText}
            </Button>
          ) : (
            <Button
              variant="outline"
              size="default"
              disabled
              className="w-full h-10 rounded-xl text-xs sm:text-sm text-muted-foreground bg-muted/30 border-dashed cursor-not-allowed"
            >
              {statusConfig.buttonText}
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
}
