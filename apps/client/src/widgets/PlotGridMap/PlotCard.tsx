import { Lock, Sprout, Wrench, Video, Cpu, CheckCircle2, ChevronRight, Layers } from "lucide-react";
import { Box, Button, Badge, Text } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { PLOT_STATUS_CONFIG, PLOT_CARD_MESSAGES } from "./constants";
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

  return (
    <Box
      onClick={() => {
        if (isAvailable && onSelect) {
          onSelect(plot);
        }
      }}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl p-5 transition-all duration-200",
        "bg-card border select-none",
        isAvailable && [
          "border-emerald-200/90 hover:border-emerald-500 shadow-sm",
          "hover:shadow-md hover:shadow-emerald-500/10 hover:-translate-y-0.5 cursor-pointer",
        ],
        isReserved && [
          "border-amber-200/80 bg-amber-50/20 shadow-xs opacity-95",
        ],
        isOccupied && [
          "border-border/80 bg-muted/20 shadow-xs opacity-90",
        ],
        isMaintenance && [
          "border-dashed border-amber-300/80 bg-amber-100/10 shadow-xs opacity-85",
        ],
        className
      )}
    >
      {/* ── Top Header: Mã ô + Badge trạng thái ── */}
      <Box className="space-y-3">
        <Box className="flex items-center justify-between gap-2">
          <Box className="flex items-center gap-1.5">
            <Box
              className={cn(
                "inline-block h-2.5 w-2.5 rounded-full",
                statusConfig.dotColor
              )}
            />
            <Text
              variant="small"
              className={cn(
                "font-bold text-xs tracking-wider uppercase font-mono",
                statusConfig.textColor
              )}
            >
              #{plot.plotCode}
            </Text>
          </Box>

          {/* Badge trạng thái chuẩn Spec */}
          {isAvailable && (
            <Badge
              variant="success"
              className="text-[11px] font-semibold bg-emerald-100/80 text-emerald-800 border-emerald-300/60"
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              {statusConfig.badgeText}
            </Badge>
          )}

          {isReserved && (
            <Badge
              variant="warning"
              className="text-[11px] font-semibold bg-amber-100/90 text-amber-900 border-amber-300"
            >
              <Lock className="h-3 w-3 mr-1" />
              {statusConfig.badgeText}
            </Badge>
          )}

          {isOccupied && (
            <Badge
              variant="secondary"
              className="text-[11px] font-medium bg-slate-100 text-slate-700 border-slate-200"
            >
              <Sprout className="h-3 w-3 mr-1 text-emerald-600" />
              {statusConfig.badgeText}
            </Badge>
          )}

          {isMaintenance && (
            <Badge
              variant="outline"
              className="text-[11px] font-medium border-amber-300 text-amber-800 bg-amber-50/50"
            >
              <Wrench className="h-3 w-3 mr-1 text-amber-600" />
              {statusConfig.badgeText}
            </Badge>
          )}
        </Box>

        {/* Tên phân lô & Khu vực */}
        <Box>
          <Text variant="large" className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
            {plot.plotNumber}
          </Text>
          {plot.zone && (
            <Text variant="small" className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
              {plot.zone}
            </Text>
          )}
        </Box>

        {/* Thông số ô đất: Diện tích + Cảm biến/Camera */}
        <Box className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50 text-xs">
          <Box className="flex items-center gap-1.5 text-muted-foreground">
            <Layers className="h-3.5 w-3.5 text-primary shrink-0" />
            <Text as="span">
              {PLOT_CARD_MESSAGES.AREA_LABEL}{" "}
              <Text as="span" className="text-foreground font-semibold">
                {plot.areaSquareMeters}m²
              </Text>
            </Text>
          </Box>

          <Box className="flex items-center gap-2 justify-end">
            {plot.cameraSupported && (
              <Box title={PLOT_CARD_MESSAGES.TOOLTIP_CAMERA} className="inline-flex items-center text-emerald-600">
                <Video className="h-3.5 w-3.5" />
              </Box>
            )}
            {plot.iotSensorInstalled && (
              <Box title={PLOT_CARD_MESSAGES.TOOLTIP_IOT} className="inline-flex items-center text-primary">
                <Cpu className="h-3.5 w-3.5" />
              </Box>
            )}
          </Box>
        </Box>

        {/* Cây trồng hiện tại (nếu Occupied) hoặc Loại đất */}
        <Box className="text-xs text-muted-foreground">
          {isOccupied && plot.cropName ? (
            <Box className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
              <Sprout className="h-3.5 w-3.5 shrink-0" />
              <Text as="span" className="truncate">
                {PLOT_CARD_MESSAGES.CROP_PREFIX}
                {plot.cropName}
              </Text>
            </Box>
          ) : (
            <Text variant="small" className="text-muted-foreground line-clamp-1">
              {PLOT_CARD_MESSAGES.SOIL_PREFIX}
              {plot.soilType || PLOT_CARD_MESSAGES.SOIL_DEFAULT}
            </Text>
          )}
        </Box>
      </Box>

      {/* ── Bottom Section: Giá thuê & Nút thao tác ── */}
      <Box className="pt-4 mt-4 border-t border-border/50 space-y-3">
        <Box className="flex items-baseline justify-between">
          <Text variant="small" className="text-xs text-muted-foreground">
            {PLOT_CARD_MESSAGES.PRICE_LABEL}
          </Text>
          <Text as="span" className="text-base font-bold text-foreground">
            {formattedPrice}
          </Text>
        </Box>

        {/* Nút hành động theo trạng thái */}
        {isAvailable ? (
          <Button
            variant="default"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(plot);
            }}
            className="w-full font-semibold text-xs h-9 bg-primary text-primary-foreground hover:bg-primary-hover shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Text as="span">{statusConfig.buttonText}</Text>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        ) : isReserved ? (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="w-full text-xs h-9 text-amber-800/80 bg-amber-50/40 border-amber-200 cursor-not-allowed flex items-center justify-center gap-1.5"
          >
            <Lock className="h-3.5 w-3.5" />
            <Text as="span">{statusConfig.buttonText}</Text>
          </Button>
        ) : isOccupied ? (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="w-full text-xs h-9 text-muted-foreground bg-muted/40 cursor-not-allowed"
          >
            <Text as="span">{statusConfig.buttonText}</Text>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="w-full text-xs h-9 text-muted-foreground bg-muted/30 border-dashed cursor-not-allowed"
          >
            <Text as="span">{statusConfig.buttonText}</Text>
          </Button>
        )}
      </Box>
    </Box>
  );
}
