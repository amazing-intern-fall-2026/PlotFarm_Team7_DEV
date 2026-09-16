import { SearchX } from "lucide-react";
import { Box, Heading, Text } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { PlotCard } from "./PlotCard";
import { PlotGridSkeleton } from "./PlotGridSkeleton";
import { PLOT_GRID_MESSAGES } from "./constants";
import type { PlotGridMapProps } from "./types";

export function PlotGridMapMobile({
  plots,
  loading = false,
  onSelectPlot,
  className,
}: PlotGridMapProps) {
  if (loading) {
    return (
      <Box className={cn("w-full space-y-4", className)}>
        <PlotGridSkeleton count={4} />
      </Box>
    );
  }

  if (plots.length === 0) {
    return (
      <Box
        className={cn(
          "w-full rounded-2xl border border-dashed border-border/80 bg-card/60 p-8 text-center",
          "flex flex-col items-center justify-center space-y-3 min-h-[280px]",
          className
        )}
      >
        <Box className="w-12 h-12 rounded-xl bg-muted/60 flex items-center justify-center text-muted-foreground">
          <SearchX className="h-6 w-6" />
        </Box>
        <Box className="space-y-1 max-w-xs">
          <Heading level={3} className="text-base font-bold text-foreground">
            {PLOT_GRID_MESSAGES.EMPTY_TITLE}
          </Heading>
          <Text variant="muted" className="text-xs">
            {PLOT_GRID_MESSAGES.EMPTY_DESCRIPTION}
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={cn("w-full space-y-4", className)}>
      <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {plots.map((plot) => (
          <PlotCard
            key={plot.plotCode}
            plot={plot}
            onSelect={onSelectPlot}
          />
        ))}
      </Box>
    </Box>
  );
}
