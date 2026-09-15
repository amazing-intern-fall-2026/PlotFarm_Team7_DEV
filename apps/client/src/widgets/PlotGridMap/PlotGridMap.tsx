import { SearchX } from "lucide-react";
import { Box, Heading, Text } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { PlotCard } from "./PlotCard";
import { PlotGridSkeleton } from "./PlotGridSkeleton";
import type { PlotGridMapProps } from "./types";

export function PlotGridMap({
  plots,
  loading = false,
  onSelectPlot,
  className,
}: PlotGridMapProps) {
  if (loading) {
    return (
      <Box className={cn("w-full space-y-4", className)}>
        <PlotGridSkeleton count={8} />
      </Box>
    );
  }

  if (plots.length === 0) {
    return (
      <Box
        className={cn(
          "w-full rounded-2xl border border-dashed border-border/80 bg-card/60 p-12 text-center",
          "flex flex-col items-center justify-center space-y-4 min-h-[360px]",
          className
        )}
      >
        <Box className="w-14 h-14 rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground">
          <SearchX className="h-7 w-7" />
        </Box>
        <Box className="space-y-1 max-w-md">
          <Heading level={3} className="text-lg font-bold text-foreground">
            Không tìm thấy ô đất phù hợp
          </Heading>
          <Text variant="muted" className="text-sm">
            Không có ô đất nào khớp với tiêu chí tìm kiếm hoặc bộ lọc hiện tại. Vui lòng thử đổi từ khóa hoặc chọn trạng thái khác.
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={cn("w-full space-y-6", className)}>
      {/* ── Lưới bản đồ ô đất (CSS Grid Responsive) ── */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
