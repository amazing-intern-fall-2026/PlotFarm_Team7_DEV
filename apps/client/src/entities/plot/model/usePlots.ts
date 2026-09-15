import * as React from "react";
import { fetchPlotsApi, type PlotUiItem, type PlotStatus } from "../api/plotsApi";
import { getErrorMessage } from "@/shared/api";

export type FilterStatusOption = "ALL" | PlotStatus;
export type FilterSizeOption = "ALL" | "15" | "20";

export interface UsePlotsOptions {
  autoFetch?: boolean;
  initialFilterStatus?: FilterStatusOption;
}

export function usePlots(options: UsePlotsOptions = {}) {
  const { autoFetch = true, initialFilterStatus = "ALL" } = options;

  const [plots, setPlots] = React.useState<PlotUiItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(autoFetch);
  const [error, setError] = React.useState<string | null>(null);

  const [selectedPlotId, setSelectedPlotId] = React.useState<string | null>(null);
  const [filterStatus, setFilterStatus] = React.useState<FilterStatusOption>(initialFilterStatus);
  const [filterSize, setFilterSize] = React.useState<FilterSizeOption>("ALL");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const loadPlots = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPlotsApi();
      setPlots(data.plots);
    } catch (err) {
      const message = getErrorMessage(err, "Không thể tải danh sách ô đất");
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (autoFetch) {
      loadPlots();
    }
  }, [autoFetch, loadPlots]);

  // Bộ đếm thống kê cho thanh lọc
  const counts = React.useMemo(() => {
    return {
      total: plots.length,
      available: plots.filter((p) => p.status === "AVAILABLE").length,
      reserved: plots.filter((p) => p.status === "RESERVED").length,
      occupied: plots.filter((p) => p.status === "OCCUPIED").length,
      maintenance: plots.filter((p) => p.status === "MAINTENANCE").length,
      standard15m: plots.filter((p) => p.areaSquareMeters === 15).length,
      large20m: plots.filter((p) => p.areaSquareMeters === 20).length,
    };
  }, [plots]);

  // Lọc danh sách ô đất theo tiêu chí
  const filteredPlots = React.useMemo(() => {
    return plots.filter((plot) => {
      // 1. Lọc theo trạng thái
      if (filterStatus !== "ALL" && plot.status !== filterStatus) {
        return false;
      }

      // 2. Lọc theo diện tích
      if (filterSize === "15" && plot.areaSquareMeters !== 15) {
        return false;
      }
      if (filterSize === "20" && plot.areaSquareMeters !== 20) {
        return false;
      }

      // 3. Tìm kiếm theo mã ô hoặc khu vực
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim().replace("#", "");
        const matchCode = plot.plotCode.toLowerCase().includes(query);
        const matchNumber = plot.plotNumber.toLowerCase().includes(query);
        const matchZone = plot.zone?.toLowerCase().includes(query) ?? false;
        const matchSoil = plot.soilType?.toLowerCase().includes(query) ?? false;
        if (!matchCode && !matchNumber && !matchZone && !matchSoil) {
          return false;
        }
      }

      return true;
    });
  }, [plots, filterStatus, filterSize, searchQuery]);

  // Ô đất đang được chọn xem chi tiết
  const selectedPlot = React.useMemo(() => {
    if (!selectedPlotId) return null;
    return plots.find((p) => p.plotCode === selectedPlotId) ?? null;
  }, [plots, selectedPlotId]);

  return {
    plots,
    filteredPlots,
    loading,
    error,
    counts,
    selectedPlotId,
    selectedPlot,
    setSelectedPlotId,
    filterStatus,
    setFilterStatus,
    filterSize,
    setFilterSize,
    searchQuery,
    setSearchQuery,
    refetch: loadPlots,
  };
}
