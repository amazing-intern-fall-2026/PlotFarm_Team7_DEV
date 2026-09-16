import * as React from "react";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  Sprout,
  CheckCircle2,
} from "lucide-react";
import {
  Box,
  Flex,
  Card,
  CardContent,
  Heading,
  Text,
  Badge,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import {
  GROWTH_MILESTONES,
  PLOT_DETAIL_TEXTS,
} from "./plot-detail.constants";

export interface CropTimelineProps {
  className?: string;
}

export const CropTimeline: React.FC<CropTimelineProps> = ({ className }) => {
  const [expandedStep, setExpandedStep] = React.useState<number | null>(1);

  const toggleStep = (step: number) => {
    setExpandedStep((prev) => (prev === step ? null : step));
  };

  return (
    <Card className={cn("border border-emerald-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm", className)}>
      <CardContent className="p-5 sm:p-6">
        <Flex justify="between" align="start" className="flex-col sm:flex-row gap-2 mb-6">
          <Box>
            <Flex align="center" gap={2}>
              <Box className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                2
              </Box>
              <Heading level={3} className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {PLOT_DETAIL_TEXTS.timelineTitle}
              </Heading>
            </Flex>
            <Text variant="muted" className="text-xs sm:text-sm mt-1 ml-8">
              {PLOT_DETAIL_TEXTS.timelineSubtitle}
            </Text>
          </Box>
          <Flex align="center" gap={1.5} className="text-slate-600 dark:text-slate-400 text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full font-medium">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <Text variant="caption" className="font-semibold text-slate-700 dark:text-slate-300">
              {PLOT_DETAIL_TEXTS.timelineStartDate}
            </Text>
          </Flex>
        </Flex>

        <Box className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
          {GROWTH_MILESTONES.map((milestone) => {
            const isCurrent = milestone.step === expandedStep;
            const isHarvest = milestone.step === 4;
            return (
              <Box
                key={milestone.step}
                role="button"
                tabIndex={0}
                onClick={() => toggleStep(milestone.step)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleStep(milestone.step);
                  }
                }}
                className={cn(
                  "flex items-center gap-2 p-2.5 rounded-lg cursor-pointer transition-all text-left outline-none",
                  isCurrent
                    ? "bg-white dark:bg-slate-900 shadow-sm border border-emerald-500/30 ring-1 ring-emerald-500/20"
                    : "hover:bg-white/60 dark:hover:bg-slate-800/80 border border-transparent",
                )}
              >
                <Box
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors",
                    isCurrent
                      ? "bg-emerald-600 text-white"
                      : isHarvest
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
                  )}
                >
                  {isHarvest ? <Sparkles className="w-3.5 h-3.5" /> : milestone.step}
                </Box>
                <Box className="min-w-0">
                  <Text variant="caption" className="font-bold text-[11px] block text-slate-800 dark:text-slate-200 break-words">
                    GĐ {milestone.step}
                  </Text>
                  <Text variant="caption" className="text-[10px] text-slate-500 block break-words">
                    {milestone.daysRange}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>

        <Box className="space-y-3">
          {GROWTH_MILESTONES.map((milestone) => {
            const isExpanded = milestone.step === expandedStep;
            const isHarvest = milestone.step === 4;

            return (
              <Box
                key={milestone.step}
                className={cn(
                  "rounded-xl border transition-all duration-200 overflow-hidden",
                  isExpanded
                    ? "border-emerald-200 dark:border-emerald-900 bg-emerald-50/30 dark:bg-emerald-950/10 shadow-sm"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300",
                )}
              >
                <Box
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleStep(milestone.step)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleStep(milestone.step);
                    }
                  }}
                  className="p-4 cursor-pointer flex items-center justify-between gap-3 select-none"
                >
                  <Flex align="center" gap={3} className="min-w-0 flex-1">
                    <Box
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                        isExpanded
                          ? "bg-emerald-600 text-white"
                          : isHarvest
                          ? "bg-amber-500 text-white"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
                      )}
                    >
                      {isExpanded ? (
                        <Sprout className="w-4 h-4" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      )}
                    </Box>
                    <Box className="min-w-0 flex-1">
                      <Flex align="center" gap={2} className="flex-wrap">
                        <Badge
                          variant={isHarvest ? "warning" : "secondary"}
                          className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5"
                        >
                          {milestone.daysRange}
                        </Badge>
                        <Text variant="caption" className="text-slate-400 text-xs hidden sm:inline">
                          {milestone.expectedDateRange}
                        </Text>
                      </Flex>
                      <Heading
                        level={4}
                        className={cn(
                          "text-sm font-semibold mt-0.5 break-words",
                          isExpanded
                            ? "text-emerald-900 dark:text-emerald-300"
                            : "text-slate-800 dark:text-slate-200",
                        )}
                      >
                        Giai đoạn {milestone.step}: {milestone.stageName}
                      </Heading>
                    </Box>
                  </Flex>

                  <Box className="text-slate-400 shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </Box>
                </Box>

                {isExpanded && (
                  <Box className="px-4 pb-4 pt-1 border-t border-emerald-100/60 dark:border-emerald-950/40">
                    <Text variant="body2" className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-2 font-medium">
                      {milestone.summary}
                    </Text>
                    <Box className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                      <Flex align="start" gap={2}>
                        <Clock className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <Text variant="caption" className="text-slate-500 dark:text-slate-400 text-xs leading-normal">
                          <Text as="span" className="font-semibold text-slate-700 dark:text-slate-200">Chi tiết kỹ thuật: </Text>
                          {milestone.details}
                        </Text>
                      </Flex>
                    </Box>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};
