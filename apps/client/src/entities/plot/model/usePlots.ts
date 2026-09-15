import * as React from "react";
import { fetchPlotsApi, type PlotUiItem, type PlotStatus } from "../api/plotsApi";
import { getErrorMessage } from "@/shared/api";

export type FilterStatusOption = "ALL" | PlotStatus;
export type PlotSortOption =
  | "code_asc"
  | "price_asc"
  | "price_desc"
  | "area_desc";

export interface PlotFilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface UsePlotsOptions {
  autoFetch?: boolean;
  initialFilterStatus?: FilterStatusOption;
  initialSortBy?: PlotSortOption;
}

export function usePlots(options: UsePlotsOptions = {}) {
  const {
    autoFetch = true,
    initialFilterStatus = "ALL",
    initialSortBy = "code_asc",
  } = options;

  const [plots, setPlots] = React.useState<PlotUiItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(autoFetch);
  const [error, setError] = React.useState<string | null>(null);

  const [selectedPlotId, setSelectedPlotId] = React.useState<string | null>(null);
  const [filterStatus, setFilterStatus] = React.useState<FilterStatusOption>(initialFilterStatus);
  const [filterSize, setFilterSize] = React.useState<string>("all");
  const [filterZone, setFilterZone] = React.useState<string>("all");
  const [filterHasCamera, setFilterHasCamera] = React.useState<boolean>(false);
  const [filterHasIot, setFilterHasIot] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [sortBy, setSortBy] = React.useState<PlotSortOption>(initialSortBy);

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

  const matchesSearch = React.useCallback((plot: PlotUiItem, query: string) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim().replace("#", "");
    const matchCode = plot.plotCode.toLowerCase().includes(q);
    const matchNumber = plot.plotNumber.toLowerCase().includes(q);
    const matchZone = plot.zone?.toLowerCase().includes(q) ?? false;
    const matchSoil = plot.soilType?.toLowerCase().includes(q) ?? false;
    const matchCrop = plot.cropName?.toLowerCase().includes(q) ?? false;
    const matchDesc = plot.description?.toLowerCase().includes(q) ?? false;
    return (
      matchCode ||
      matchNumber ||
      matchZone ||
      matchSoil ||
      matchCrop ||
      matchDesc
    );
  }, []);

  // Candidate pool cho Status Chips (lọc theo search và size)
  const statusPool = React.useMemo(() => {
    return plots.filter((plot) => {
      if (!matchesSearch(plot, searchQuery)) return false;
      if (filterSize !== "all" && String(plot.areaSquareMeters) !== filterSize) return false;
      if (filterZone !== "all" && plot.zone !== filterZone) return false;
      if (filterHasCamera && !plot.cameraSupported) return false;
      if (filterHasIot && !plot.iotSensorInstalled) return false;
      return true;
    });
  }, [plots, searchQuery, filterSize, filterZone, filterHasCamera, filterHasIot, matchesSearch]);

  // Candidate pool cho Size Pills (lọc theo search và status)
  const sizePool = React.useMemo(() => {
    return plots.filter((plot) => {
      if (!matchesSearch(plot, searchQuery)) return false;
      if (filterStatus !== "ALL" && plot.status !== filterStatus) return false;
      if (filterZone !== "all" && plot.zone !== filterZone) return false;
      if (filterHasCamera && !plot.cameraSupported) return false;
      if (filterHasIot && !plot.iotSensorInstalled) return false;
      return true;
    });
  }, [plots, searchQuery, filterStatus, filterZone, filterHasCamera, filterHasIot, matchesSearch]);

  // Bộ đếm thống kê động theo trạng thái thực tế
  const counts = React.useMemo(() => {
    return {
      total: plots.length,
      filtered: statusPool.length,
      available: statusPool.filter((p) => p.status === "AVAILABLE").length,
      reserved: statusPool.filter((p) => p.status === "RESERVED").length,
      occupied: statusPool.filter((p) => p.status === "OCCUPIED").length,
      maintenance: statusPool.filter((p) => p.status === "MAINTENANCE").length,
      standard15m: sizePool.filter((p) => p.areaSquareMeters === 15).length,
      large20m: sizePool.filter((p) => p.areaSquareMeters === 20).length,
    };
  }, [plots.length, statusPool, sizePool]);

  // Danh sách kích thước sinh động theo trạng thái thực tế
  const availableSizes: PlotFilterOption[] = React.useMemo(() => {
    const rawSizes = Array.from(new Set(plots.map((p) => p.areaSquareMeters))).sort((a, b) => a - b);
    return [
      { value: "all", label: `Tất cả (${sizePool.length})`, count: sizePool.length },
      ...rawSizes.map((size) => {
        const count = sizePool.filter((p) => p.areaSquareMeters === size).length;
        return {
          value: String(size),
          label: `Lô ${size}m² (${count})`,
          count,
        };
      }),
    ];
  }, [plots, sizePool]);

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

  // Lọc và sắp xếp danh sách ô đất theo tiêu chí
  const filteredPlots = React.useMemo(() => {
    const list = plots.filter((plot) => {
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
      return matchesSearch(plot, searchQuery);
    });

    // 6. Sắp xếp danh sách theo sortBy
    return [...list].sort((a, b) => {
      if (sortBy === "price_asc") {
        return a.pricePerMonth - b.pricePerMonth;
      }
      if (sortBy === "price_desc") {
        return b.pricePerMonth - a.pricePerMonth;
      }
      if (sortBy === "area_desc") {
        return b.areaSquareMeters - a.areaSquareMeters;
      }
      if (sortBy === "code_asc") {
        return a.plotCode.localeCompare(b.plotCode);
      }
      return 0;
    });
  }, [
    plots,
    filterStatus,
    filterSize,
    filterZone,
    filterHasCamera,
    filterHasIot,
    searchQuery,
    sortBy,
    matchesSearch,
  ]);

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
    sortBy,
    setSortBy,
    refetch: loadPlots,
  };
}
