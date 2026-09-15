import { Box } from "@/shared/ui";
import { PlotsExploreHero } from "@/widgets/PlotsHero";
import { FarmPlotFilter } from "@/widgets/PlotsFilter";
import { PlotGridMap, PlotDetailDrawer, PlotPagination } from "@/widgets/PlotGridMap";
import { CommitmentsSection } from "@/widgets/QualityCommitments";
import { usePlots, type PlotSortOption } from "@/entities/plot";
import type { PlotStatus } from "@repo/shared";

export function PlotsPage() {
  const {
    filteredPlots,
    paginatedPlots,
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages,
    loading,
    counts,
    availableSizes,
    selectedPlot,
    setSelectedPlotId,
    filterStatus,
    setFilterStatus,
    filterSize,
    setFilterSize,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  } = usePlots({ pageSize: 8 });

  return (
    <Box className="w-full max-w-full overflow-x-hidden bg-gradient-to-b from-white via-slate-50/60 to-slate-50 dark:from-background dark:via-background/90 dark:to-background min-h-screen pb-20">
      <PlotsExploreHero />

      <Box id="plot-grid-section" className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 md:pt-6 overflow-x-hidden">
        <FarmPlotFilter
          counts={counts}
          totalCount={filteredPlots.length}
          filteredCount={paginatedPlots.length}
          sizeOptions={availableSizes}
          searchTerm={searchQuery}
          selectedSize={filterSize}
          selectedStatus={filterStatus === "ALL" ? "all" : filterStatus}
          sortBy={sortBy}
          onSearchChange={(search) => setSearchQuery(search)}
          onSizeChange={(size) => setFilterSize(size)}
          onStatusChange={(status) => {
            setFilterStatus(status === "all" ? "ALL" : (status as PlotStatus));
          }}
          onSortChange={(sort) => setSortBy(sort as PlotSortOption)}
          onReset={() => {
            setSearchQuery("");
            setFilterSize("all");
            setFilterStatus("ALL");
            setSortBy("code_asc");
          }}
        />

        <Box className="mt-8">
          <PlotGridMap
            plots={paginatedPlots}
            loading={loading}
            onSelectPlot={(plot) => setSelectedPlotId(plot.plotCode)}
          />

          <PlotPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredPlots.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </Box>

        <Box className="mt-12 md:mt-16">
          <CommitmentsSection />
        </Box>

        <PlotDetailDrawer
          isOpen={!!selectedPlot}
          plot={selectedPlot}
          onClose={() => setSelectedPlotId(null)}
        />
      </Box>
    </Box>
  );
}



