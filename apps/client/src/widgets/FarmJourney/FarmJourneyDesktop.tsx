import { Box, Card, CardContent, Heading, Text } from "@/shared/ui";
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
    <section aria-labelledby="farm-journey-desktop-title" className={cn("w-full space-y-7 pt-0 pb-4 select-none", className)}>
      <Box className="text-center space-y-3 max-w-3xl mx-auto px-4">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          {badge}
        </span>

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

      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {steps.map((step) => (
          <Card
            key={step.stepNumber}
            className="h-full flex flex-col justify-between hover:border-primary/40 transition-colors group"
          >
            <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
              <Box className="flex items-center justify-between">
                <Text
                  as="span"
                  className="text-3xl font-extrabold text-muted-foreground/30 tracking-tight"
                >
                  {step.stepNumber}
                </Text>

                <Box
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-2xs",
                    step.iconBgClass,
                    step.iconColorClass
                  )}
                >
                  {step.icon}
                </Box>
              </Box>

              <Box className="space-y-2 pt-1">
                <Heading level={3} className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {step.title}
                </Heading>
                <Text className="text-sm text-muted-foreground leading-relaxed">
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

