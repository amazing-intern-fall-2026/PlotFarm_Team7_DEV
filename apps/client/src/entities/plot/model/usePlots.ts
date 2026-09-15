import * as React from "react";
import { fetchPlotsApi, type PlotUiItem, type PlotStatus } from "../api/plotsApi";
import { getErrorMessage } from "@/shared/api";

export type FilterStatusOption = "ALL" | PlotStatus;

export interface PlotFilterOption {
  value: string;
  label: string;
  count?: number;
}

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
  const [filterSize, setFilterSize] = React.useState<string>("all");
  const [filterZone, setFilterZone] = React.useState<string>("all");
  const [filterHasCamera, setFilterHasCamera] = React.useState<boolean>(false);
  const [filterHasIot, setFilterHasIot] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("" );

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

  // Danh sách kích thước sinh động từ dữ liệu ô đất thực tế
  const availableSizes: PlotFilterOption[] = React.useMemo(() => {
    const rawSizes = Array.from(new Set(plots.map((p) => p.areaSquareMeters))).sort((a, b) => a - b);
    return [
      { value: "all", label: `Tất cả (${plots.length})`, count: plots.length },
      ...rawSizes.map((size) => ({
        value: String(size),
        label: `Lô ${size}m² (${plots.filter((p) => p.areaSquareMeters === size).length})`,
        count: plots.filter((p) => p.areaSquareMeters === size).length,
      })),
    ];
  }, [plots]);

  // Danh sách phân khu sinh động từ dữ liệu ô đất thực tế
  const availableZones: PlotFilterOption[] = React.useMemo(() => {
    const rawZones = plots.map((p) => p.zone).filter((z): z is string => Boolean(z));
    const uniqueZones = Array.from(new Set(rawZones));
    return [
      { value: "all", label: `Tất cả khu (${plots.length})`, count: plots.length },
      ...uniqueZones.map((zone) => ({
        value: zone,
        label: `${zone} (${plots.filter((p) => p.zone === zone).length})`,
        count: plots.filter((p) => p.zone === zone).length,
      })),
    ];
  }, [plots]);

  // Lọc danh sách ô đất theo tiêu chí
  const filteredPlots = React.useMemo(() => {
    return plots.filter((plot) => {
      // 1. Lọc theo trạng thái
      if (filterStatus !== "ALL" && plot.status !== filterStatus) {
        return false;
      }

      // 2. Lọc theo diện tích động
      if (filterSize !== "all" && String(plot.areaSquareMeters) !== filterSize) {
        return false;
      }

      // 3. Lọc theo phân khu
      if (filterZone !== "all" && plot.zone !== filterZone) {
        return false;
      }

      // 4. Lọc theo tiện ích (Camera / IoT)
      if (filterHasCamera && !plot.cameraSupported) {
        return false;
      }
      if (filterHasIot && !plot.iotSensorInstalled) {
        return false;
      }

      // 5. Tìm kiếm theo mã ô hoặc khu vực
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
  }, [plots, filterStatus, filterSize, filterZone, filterHasCamera, filterHasIot, searchQuery]);

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
    availableSizes,
    availableZones,
    selectedPlotId,
    selectedPlot,
    setSelectedPlotId,
    filterStatus,
    setFilterStatus,
    filterSize,
    setFilterSize,
    filterZone,
    setFilterZone,
    filterHasCamera,
    setFilterHasCamera,
    filterHasIot,
    setFilterHasIot,
    searchQuery,
    setSearchQuery,
    refetch: loadPlots,
  };
}
