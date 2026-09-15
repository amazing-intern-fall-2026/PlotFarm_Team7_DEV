import * as React from "react";
import { Check, Sparkles, ShieldCheck } from "lucide-react";
import {
  Box,
  Flex,
  Grid,
  Card,
  CardContent,
  Heading,
  Text,
  Badge,
  Image,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import {
  CROP_OPTIONS,
  PLOT_DETAIL_TEXTS,
  type CropOption,
} from "./plot-detail.constants";

export interface CropSelectorProps {
  selectedCropId: string;
  onSelectCrop: (crop: CropOption) => void;
  className?: string;
}

export const CropSelector: React.FC<CropSelectorProps> = ({
  selectedCropId,
  onSelectCrop,
  className,
}) => {
  return (
    <Card className={cn("border border-emerald-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm", className)}>
      <CardContent className="p-5 sm:p-6">
        <Flex justify="between" align="start" className="flex-col sm:flex-row gap-2 mb-4">
          <Box>
            <Flex align="center" gap={2}>
              <Box className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                1
              </Box>
              <Heading level={3} className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {PLOT_DETAIL_TEXTS.cropSelectorTitle}
              </Heading>
            </Flex>
            <Text variant="muted" className="text-xs sm:text-sm mt-1 ml-8">
              {PLOT_DETAIL_TEXTS.cropSelectorSubtitle}
            </Text>
          </Box>
          <Flex align="center" gap={1.5} className="text-emerald-700 dark:text-emerald-400 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <Text variant="caption" className="font-semibold text-emerald-800 dark:text-emerald-300">
              {PLOT_DETAIL_TEXTS.cropSelectorCommitment}
            </Text>
          </Flex>
        </Flex>

        <Grid cols={1} colsMd={3} gap={4}>
          {CROP_OPTIONS.map((crop) => {
            const isSelected = crop.id === selectedCropId;
            return (
              <Box
                key={crop.id}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => onSelectCrop(crop)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectCrop(crop);
                  }
                }}
                className={cn(
                  "relative rounded-xl p-3.5 sm:p-4 cursor-pointer transition-all duration-200 border text-left outline-none",
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-md ring-2 ring-emerald-500/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-emerald-300 bg-white dark:bg-slate-900/60",
                )}
              >
                {isSelected && (
                  <Box className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </Box>
                )}

                <Box className="relative w-full h-28 rounded-lg overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={crop.imageUrl}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Box className="absolute bottom-1.5 left-1.5">
                    <Badge
                      variant={crop.tagVariant === "success" ? "default" : "secondary"}
                      className={cn(
                        "text-[10px] px-2 py-0.5 font-medium shadow-sm",
                        crop.tagVariant === "success" && "bg-emerald-600 text-white hover:bg-emerald-600",
                        crop.tagVariant === "warning" && "bg-amber-600 text-white hover:bg-amber-600",
                      )}
                    >
                      <Sparkles className="w-2.5 h-2.5 mr-1 inline" />
                      {crop.highlightTag}
                    </Badge>
                  </Box>
                </Box>

                <Heading level={4} className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">
                  {crop.name}
                </Heading>
                <Text variant="muted" className="text-xs line-clamp-2 min-h-[32px] mb-3">
                  {crop.description}
                </Text>

                <Box className="space-y-1 py-2 border-t border-b border-slate-100 dark:border-slate-800 text-xs">
                  <Flex justify="between">
                    <Text variant="muted" className="text-slate-500 dark:text-slate-400">
                      {PLOT_DETAIL_TEXTS.cropCycleLabel}
                    </Text>
                    <Text variant="body2" className="font-semibold text-slate-800 dark:text-slate-200">
                      {crop.cycleDays} ngày
                    </Text>
                  </Flex>
                  <Flex justify="between">
                    <Text variant="muted" className="text-slate-500 dark:text-slate-400">
                      {PLOT_DETAIL_TEXTS.cropYieldLabel}
                    </Text>
                    <Text variant="body2" className="font-semibold text-slate-800 dark:text-slate-200">
                      {crop.expectedYield}
                    </Text>
                  </Flex>
                </Box>

                <Flex justify="between" align="center" className="mt-3 pt-1">
                  <Text variant="caption" className="text-slate-500 dark:text-slate-400 font-medium">
                    {PLOT_DETAIL_TEXTS.cropSeedPriceLabel}
                  </Text>
                  <Text variant="body1" className="font-bold text-emerald-700 dark:text-emerald-400">
                    +{crop.seedPrice.toLocaleString("vi-VN")} đ
                  </Text>
                </Flex>
              </Box>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};
