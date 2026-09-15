import { Box, Heading, Text } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { FARM_JOURNEY_MESSAGES } from "./constants";
import type { FarmJourneyViewProps } from "./types";

export function FarmJourneyDesktop({
  badge = FARM_JOURNEY_MESSAGES.BADGE,
  title = FARM_JOURNEY_MESSAGES.TITLE,
  subtitle = FARM_JOURNEY_MESSAGES.SUBTITLE,
  steps,
  className,
}: FarmJourneyViewProps) {
  return (
    <section aria-labelledby="farm-journey-desktop-title" className={cn("w-full space-y-10 py-6 select-none", className)}>
      {/* ── 1. Section Header ── */}
      <Box className="text-center space-y-3 max-w-3xl mx-auto px-4">
        <Text as="span" className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          {badge}
        </Text>

        <Heading
          level={2}
          id="farm-journey-desktop-title"
          className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
        >
          {title}
        </Heading>

        <Text className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </Text>
      </Box>

      {/* ── 2. 4-Step Cards Bento Grid ── */}
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {steps.map((step) => (
          <Box
            key={step.stepNumber}
            className="h-full flex flex-col justify-between p-7 rounded-3xl bg-card border border-slate-100 dark:border-border/80 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 group"
          >
            <Box className="space-y-4">
              {/* Top Row: Number & Icon Button */}
              <Box className="flex items-center justify-between">
                <Text
                  as="span"
                  className="text-3xl font-extrabold text-sky-300 dark:text-sky-500/70 font-mono tracking-tight"
                >
                  {step.stepNumber}
                </Text>

                <Box
                  className={cn(
                    "w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-2xs",
                    step.iconBgClass,
                    step.iconColorClass
                  )}
                >
                  {step.icon}
                </Box>
              </Box>

              {/* Title & Description */}
              <Box className="space-y-2 pt-2">
                <Heading level={3} className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {step.title}
                </Heading>
                <Text className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </section>
  );
}
