import { Box, Card, CardContent, Heading, Text } from "@/shared/ui";
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
      <Box className="text-center space-y-2 px-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
          {badge}
        </span>

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

      <Box className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {steps.map((step) => (
          <Card
            key={step.stepNumber}
            className="hover:border-primary/40 transition-colors"
          >
            <CardContent className="p-4 space-y-3">
              <Box className="flex items-center justify-between">
                <Text
                  as="span"
                  className="text-2xl font-extrabold text-muted-foreground/30 tracking-tight"
                >
                  {step.stepNumber}
                </Text>

                <Box
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center shadow-2xs",
                    step.iconBgClass,
                    step.iconColorClass
                  )}
                >
                  {step.icon}
                </Box>
              </Box>

              <Box className="space-y-1">
                <Heading level={3} className="text-sm font-bold text-foreground">
                  {step.title}
                </Heading>
                <Text className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </Text>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </section>
  );
}

