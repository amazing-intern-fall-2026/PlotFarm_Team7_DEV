import { Box, Heading, Text } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { FARM_JOURNEY_MESSAGES } from "./constants";
import type { FarmJourneyViewProps } from "./types";

export function FarmJourneyMobile({
  badge = FARM_JOURNEY_MESSAGES.BADGE,
  title = FARM_JOURNEY_MESSAGES.TITLE,
  subtitle = FARM_JOURNEY_MESSAGES.SUBTITLE,
  steps,
  className,
}: FarmJourneyViewProps) {
  return (
    <section aria-labelledby="farm-journey-mobile-title" className={cn("w-full space-y-4 pt-0 pb-2 select-none px-1", className)}>
      {/* ── 1. Section Header ── */}
      <Box className="text-center space-y-2 px-2">
        <Text as="span" className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          {badge}
        </Text>

        <Heading
          level={2}
          id="farm-journey-mobile-title"
          className="text-2xl font-extrabold tracking-tight text-foreground leading-snug"
        >
          {title}
        </Heading>

        <Text className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
          {subtitle}
        </Text>
      </Box>

      {/* ── 2. Mobile Cards Grid (2 Cột hoặc 1 Cột Tối Ưu Màn Hình Hẹp) ── */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {steps.map((step) => (
          <Box
            key={step.stepNumber}
            className="p-5 rounded-2xl bg-card border border-slate-200/80 dark:border-border/80 shadow-xs space-y-3"
          >
            {/* Top Row: Number & Icon */}
            <Box className="flex items-center justify-between">
              <Text
                as="span"
                className="text-2xl font-extrabold text-sky-300 dark:text-sky-500/70 font-mono tracking-tight"
              >
                {step.stepNumber}
              </Text>

              <Box
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shadow-2xs",
                  step.iconBgClass,
                  step.iconColorClass
                )}
              >
                {step.icon}
              </Box>
            </Box>

            {/* Title & Description */}
            <Box className="space-y-1.5">
              <Heading level={3} className="text-base font-bold text-foreground">
                {step.title}
              </Heading>
              <Text className="text-xs text-muted-foreground leading-relaxed">
                {step.description}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </section>
  );
}
