import { Box } from "@/shared/ui";
import { PlotsExploreHero } from "@/widgets/PlotsHero";
import { PlotsFilterBar } from "@/widgets/PlotsFilter";
import { PlotGridMap, PlotDetailDrawer } from "@/widgets/PlotGridMap";
import { usePlots } from "@/entities/plot";
import type { PlotStatus } from "@repo/shared";

export function PlotsPage() {
  const {
    filteredPlots,
    loading,
    counts,
    selectedPlot,
    setSelectedPlotId,
    setFilterStatus,
    setFilterSize,
    setSearchQuery,
  } = usePlots();

  return (
    <Box className="w-full">
      {/* Hero Banner Khám Phá Ô Đất Chuẩn Sinh Thái */}
      <PlotsExploreHero />

      {/* Phân vùng Lưới Ô Đất (Plot Grid & Filter) */}
      <Box id="plot-grid-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Thanh tìm kiếm & bộ lọc theo chuẩn giao diện */}
        <PlotsFilterBar
          counts={counts}
          onFilterChange={(filters) => {
            setSearchQuery(filters.search);
            setFilterSize(
              filters.size === "standard_15m"
                ? "15"
                : filters.size === "large_20m"
                  ? "20"
                  : "ALL"
            );
            setFilterStatus(
              filters.status === "all"
                ? "ALL"
                : (filters.status.toUpperCase() as PlotStatus)
            );
          }}
          onResetFilters={() => {
            setSearchQuery("");
            setFilterSize("ALL");
            setFilterStatus("ALL");
          }}
        />

        {/* Lưới Bản Đồ Ô Đất Canh Tác Phân Biệt 4 Trạng Thái */}
        <PlotGridMap
          plots={filteredPlots}
          loading={loading}
          onSelectPlot={(plot) => setSelectedPlotId(plot.plotCode)}
        />

        {/* Drawer Chi Tiết Ô Đất Khi Click (Kết Nối US-19) */}
        <PlotDetailDrawer
          isOpen={!!selectedPlot}
          plot={selectedPlot}
          onClose={() => setSelectedPlotId(null)}
        />
      </Box>
    </Box>
  );
}

