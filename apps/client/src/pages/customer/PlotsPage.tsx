import { Box } from "@/shared/ui";
import { PlotsExploreHero } from "@/widgets/PlotsHero";
import { FarmPlotFilter } from "@/widgets/PlotsFilter";
import { PlotGridMap, PlotDetailDrawer } from "@/widgets/PlotGridMap";
import { usePlots } from "@/entities/plot";
import type { PlotStatus } from "@repo/shared";

export function PlotsPage() {
  const {
    plots,
    filteredPlots,
    loading,
    counts,
    availableSizes,
    selectedPlot,
    setSelectedPlotId,
    setFilterStatus,
    setFilterSize,
    setSearchQuery,
  } = usePlots();

  return (
    <Box className="w-full bg-gradient-to-b from-white via-slate-50/60 to-slate-50 dark:from-background dark:via-background/90 dark:to-background min-h-screen pb-20">
      {/* ── 1. Hero Banner Khám Phá Ô Đất Chuẩn Sinh Thái (Không còn border-b cắt đôi) ── */}
      <PlotsExploreHero />

      {/* ── 2. Khu Vực Chuyển Giao: Floating Docking Filter & Tiêu Đề Danh Mục ── */}
      <Box id="plot-grid-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FarmPlotFilter
          counts={counts}
          totalCount={plots.length}
          filteredCount={filteredPlots.length}
          sizeOptions={availableSizes}
          onSearchChange={(search) => setSearchQuery(search)}
          onSizeChange={(size) => setFilterSize(size)}
          onStatusChange={(status) => {
            setFilterStatus(status === "all" ? "ALL" : (status as PlotStatus));
          }}
          onReset={() => {
            setSearchQuery("");
            setFilterSize("all");
            setFilterStatus("ALL");
          }}
        />

        {/* ── 3. Lưới Bản Đồ Ô Đất Canh Tác Phân Biệt 4 Trạng Thái ── */}
        <Box className="mt-8">
          <PlotGridMap
            plots={filteredPlots}
            loading={loading}
            onSelectPlot={(plot) => setSelectedPlotId(plot.plotCode)}
          />
        </Box>

        {/* ── 4. Drawer Chi Tiết Ô Đất Khi Click (Kết Nối US-19) ── */}
        <PlotDetailDrawer
          isOpen={!!selectedPlot}
          plot={selectedPlot}
          onClose={() => setSelectedPlotId(null)}
        />
      </Box>
    </Box>
  );
}

