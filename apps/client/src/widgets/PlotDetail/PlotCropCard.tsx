import * as React from "react";
import { Sprout, Calendar, Scale, ShieldCheck, Layers } from "lucide-react";
import {
  Box,
  Flex,
  Card,
  CardContent,
  Heading,
  Text,
  Badge,
  Image,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import {
  PLOT_DETAIL_TEXTS,
  type PlotCropInfo,
} from "./plot-detail.constants";

export interface PlotCropCardProps {
  crop: PlotCropInfo;
  className?: string;
}

export const PlotCropCard: React.FC<PlotCropCardProps> = ({
  crop,
  className,
}) => {
  return (
    <Card className={cn("border border-emerald-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden", className)}>
      <CardContent className="p-5 sm:p-6">
        <Flex justify="between" align="start" className="flex-col sm:flex-row gap-2 mb-4">
          <Box>
            <Flex align="center" gap={2}>
              <Box className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                1
              </Box>
              <Heading level={3} className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {PLOT_DETAIL_TEXTS.cropCardTitle}
              </Heading>
            </Flex>
            <Text variant="muted" className="text-xs sm:text-sm mt-1 ml-8">
              {PLOT_DETAIL_TEXTS.cropCardSubtitle}
            </Text>
          </Box>
          <Flex align="center" gap={1.5} className="text-emerald-700 dark:text-emerald-400 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <Text variant="caption" className="font-semibold text-emerald-800 dark:text-emerald-300">
              {crop.standard}
            </Text>
          </Flex>
        </Flex>

        <Box className="grid grid-cols-1 md:grid-cols-12 gap-5 p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <Box className="md:col-span-4 relative rounded-xl overflow-hidden aspect-[4/3] sm:aspect-auto sm:h-full min-h-[160px] bg-slate-200 dark:bg-slate-800">
            <Image
              src={crop.imageUrl}
              alt={crop.name}
              className="w-full h-full object-cover"
            />
            <Box className="absolute top-2 left-2">
              <Badge variant="default" className="bg-emerald-700 text-white font-medium text-[11px] shadow-sm">
                <Sprout className="w-3 h-3 mr-1 inline" />
                Cây chuyên canh
              </Badge>
            </Box>
          </Box>

          <Box className="md:col-span-8 flex flex-col justify-between space-y-3">
            <Box>
              <Flex justify="between" align="baseline" className="flex-wrap gap-2">
                <Heading level={4} className="text-lg font-bold text-slate-900 dark:text-white">
                  {crop.name}
                </Heading>
                <Text variant="caption" className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-900">
                  {crop.variety}
                </Text>
              </Flex>
              <Text variant="muted" className="text-xs sm:text-sm mt-1.5 leading-relaxed">
                {crop.description}
              </Text>
            </Box>

            <Box className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200/70 dark:border-slate-800 text-xs">
              <Box className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <Flex align="center" gap={1.5} className="text-slate-500 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <Text variant="caption" className="text-[11px]">
                    {PLOT_DETAIL_TEXTS.cropCycleLabel}
                  </Text>
                </Flex>
                <Text variant="body2" className="font-bold text-slate-800 dark:text-slate-200">
                  {crop.cycleDays} ngày
                </Text>
              </Box>

              <Box className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <Flex align="center" gap={1.5} className="text-slate-500 mb-1">
                  <Scale className="w-3.5 h-3.5 text-emerald-600" />
                  <Text variant="caption" className="text-[11px]">
                    {PLOT_DETAIL_TEXTS.cropYieldLabel}
                  </Text>
                </Flex>
                <Text variant="body2" className="font-bold text-slate-800 dark:text-slate-200">
                  {crop.expectedYield}
                </Text>
              </Box>

              <Box className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 col-span-2 sm:col-span-1">
                <Flex align="center" gap={1.5} className="text-slate-500 mb-1">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <Text variant="caption" className="text-[11px]">
                    {PLOT_DETAIL_TEXTS.cropDensityLabel}
                  </Text>
                </Flex>
                <Text variant="body2" className="font-bold text-slate-800 dark:text-slate-200 truncate">
                  {crop.plantingDensity}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
