import { Lock, Sprout, Wrench, Video, Cpu, CheckCircle2, ChevronRight, Layers } from "lucide-react";
import { Card, Button, Badge, Heading, Text, Box } from "@/shared/ui";
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
    <Card
      onClick={() => {
        if (isAvailable && onSelect) {
          onSelect(plot);
        }
      }}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl p-5 transition-all duration-200 select-none",
        "bg-card border border-border/80 shadow-xs",
        isAvailable && [
          "border-primary/40 hover:border-primary hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5 cursor-pointer",
        ],
        isReserved && [
          "border-amber-200/80 bg-amber-50/20 opacity-95",
        ],
        isOccupied && [
          "border-border/80 bg-muted/20 opacity-90",
        ],
        isMaintenance && [
          "border-dashed border-amber-300/80 bg-amber-100/10 opacity-85",
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
              className="text-xs font-semibold"
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              {statusConfig.badgeText}
            </Badge>
          )}

          {isReserved && (
            <Badge
              variant="warning"
              className="text-xs font-semibold"
            >
              <Lock className="h-3 w-3 mr-1" />
              {statusConfig.badgeText}
            </Badge>
          )}

          {isOccupied && (
            <Badge
              variant="secondary"
              className="text-xs font-medium"
            >
              <Sprout className="h-3 w-3 mr-1 text-primary" />
              {statusConfig.badgeText}
            </Badge>
          )}

          {isMaintenance && (
            <Badge
              variant="outline"
              className="text-xs font-medium border-amber-300 text-amber-800 bg-amber-50/50"
            >
              <Wrench className="h-3 w-3 mr-1 text-amber-600" />
              {statusConfig.badgeText}
            </Badge>
          )}
        </Box>

        {/* Tên phân lô & Khu vực */}
        <Box>
          <Heading
            as="h3"
            className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors"
          >
            {plot.plotNumber}
          </Heading>
          {plot.zone && (
            <Text variant="small" className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
              {plot.zone}
            </Text>
          )}
        </Box>

        {/* Thông số ô đất: Diện tích + Cảm biến/Camera */}
        <Box className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60 text-xs">
          <Box className="flex items-center gap-1.5 text-muted-foreground">
            <Layers className="h-3.5 w-3.5 text-primary shrink-0" />
            <Text variant="small">
              {PLOT_CARD_MESSAGES.AREA_LABEL}{" "}
              <Text as="span" className="text-foreground font-semibold">
                {plot.areaSquareMeters}m²
              </Text>
            </Text>
          </Box>

          <Box className="flex items-center gap-2 justify-end">
            {plot.cameraSupported && (
              <Box title={PLOT_CARD_MESSAGES.TOOLTIP_CAMERA} className="inline-flex items-center text-primary">
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
            <Box className="flex items-center gap-1 text-primary font-medium">
              <Sprout className="h-3.5 w-3.5 shrink-0" />
              <Text variant="small" className="text-primary font-medium truncate">
                {PLOT_CARD_MESSAGES.CROP_PREFIX}{plot.cropName}
              </Text>
            </Box>
          ) : (
            <Text variant="small" className="text-muted-foreground line-clamp-1">
              {PLOT_CARD_MESSAGES.SOIL_PREFIX}{plot.soilType || PLOT_CARD_MESSAGES.SOIL_DEFAULT}
            </Text>
          )}
        </Box>
      </Box>

      {/* ── Bottom Section: Giá thuê & Nút thao tác ── */}
      <Box className="pt-4 mt-4 border-t border-border/60 space-y-3">
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
    </Card>
  );
}
