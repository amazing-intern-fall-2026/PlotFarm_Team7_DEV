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
  pageSize?: number;
  initialPage?: number;
}

export function usePlots(options: UsePlotsOptions = {}) {
  const {
    autoFetch = true,
    initialFilterStatus = "ALL",
    initialSortBy = "code_asc",
    pageSize = 8,
    initialPage = 1,
  } = options;

  // ── Server state ───────────────────────────────────────────────────────────
  const [plots, setPlots] = React.useState<PlotUiItem[]>([]);
  const [serverTotal, setServerTotal] = React.useState<number>(0);
  const [serverTotalPages, setServerTotalPages] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(autoFetch);
  const [error, setError] = React.useState<string | null>(null);

  // ── Pagination (server-driven) ─────────────────────────────────────────────
  const [currentPage, setCurrentPage] = React.useState<number>(initialPage);

  // ── Filters ────────────────────────────────────────────────────────────────
  // filterStatus → sent to server; others → client-side on current batch
  const [selectedPlotId, setSelectedPlotId] = React.useState<string | null>(null);
  const [filterStatus, setFilterStatus] = React.useState<FilterStatusOption>(initialFilterStatus);
  const [filterSize, setFilterSize] = React.useState<string>("all");
  const [filterZone, setFilterZone] = React.useState<string>("all");
  const [filterHasCamera, setFilterHasCamera] = React.useState<boolean>(false);
  const [filterHasIot, setFilterHasIot] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [sortBy, setSortBy] = React.useState<PlotSortOption>(initialSortBy);

  // Reset page when client-side filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterSize, filterZone, filterHasCamera, filterHasIot, searchQuery, sortBy]);

  // Reset page when server-level status filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  /**
   * Fetch từ server với status filter + pagination.
   * - status → server query param (nếu không phải ALL)
   * - page, limit → server query params
   * - Các filter còn lại (size, zone, search, sort) → client-side sau khi nhận data
   */
  const loadPlots = React.useCallback(
    async (page: number, status: FilterStatusOption) => {
      setLoading(true);
      setError(null);
      try {
        // PlotsQuery chỉ hỗ trợ 4 status chính; các status còn lại (HARVESTING, INACTIVE)
        // không được server filter, fetch tất cả rồi lọc client-side
        const queryStatusValues = ["AVAILABLE", "RESERVED", "OCCUPIED", "MAINTENANCE"] as const;
        type QueryStatus = (typeof queryStatusValues)[number];
        const isQueryStatus = (s: string): s is QueryStatus =>
          (queryStatusValues as readonly string[]).includes(s);

        const query: { page: number; limit: number; status?: QueryStatus } = {
          page,
          limit: pageSize,
        };
        if (status !== "ALL" && isQueryStatus(status)) {
          query.status = status;
        }

        const data = await fetchPlotsApi(query);
        setPlots(data.plots);
        setServerTotal(data.total);
        setServerTotalPages(data.totalPages);
      } catch (err) {
        const message = getErrorMessage(err, "Không thể tải danh sách ô đất");
        setError(message);
        setPlots([]);
        setServerTotal(0);
        setServerTotalPages(1);
      } finally {
        setLoading(false);
      }
    },
    [pageSize],
  );

  // Trigger fetch khi page hoặc status filter thay đổi
  React.useEffect(() => {
    if (autoFetch) {
      loadPlots(currentPage, filterStatus);
    }
  }, [autoFetch, currentPage, filterStatus, loadPlots]);

  // ── Client-side helpers ────────────────────────────────────────────────────

  const matchesSearch = React.useCallback((plot: PlotUiItem, query: string) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim().replace("#", "");
    return (
      plot.plotCode.toLowerCase().includes(q) ||
      plot.plotNumber.toLowerCase().includes(q) ||
      (plot.zone?.toLowerCase().includes(q) ?? false) ||
      (plot.soilType?.toLowerCase().includes(q) ?? false) ||
      (plot.cropName?.toLowerCase().includes(q) ?? false) ||
      (plot.description?.toLowerCase().includes(q) ?? false)
    );
  }, []);

  /** Lọc + sort client-side trên batch hiện tại từ server */
  const filteredPlots = React.useMemo(() => {
    const list = plots.filter((plot) => {
      if (filterSize !== "all" && String(plot.areaSquareMeters) !== filterSize) return false;
      if (filterZone !== "all" && plot.zone !== filterZone) return false;
      if (filterHasCamera && !plot.cameraSupported) return false;
      if (filterHasIot && !plot.iotSensorInstalled) return false;
      return matchesSearch(plot, searchQuery);
    });

    return [...list].sort((a, b) => {
      if (sortBy === "price_asc") return a.pricePerMonth - b.pricePerMonth;
      if (sortBy === "price_desc") return b.pricePerMonth - a.pricePerMonth;
      if (sortBy === "area_desc") return b.areaSquareMeters - a.areaSquareMeters;
      if (sortBy === "code_asc") return a.plotCode.localeCompare(b.plotCode);
      return 0;
    });
  }, [plots, filterSize, filterZone, filterHasCamera, filterHasIot, searchQuery, sortBy, matchesSearch]);

  // ── Counts ─────────────────────────────────────────────────────────────────

  /** statusPool: lọc bỏ size/zone/cam/iot để đếm đúng status counts */
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

  const counts = React.useMemo(() => {
    return {
      total: serverTotal,
      filtered: filteredPlots.length,
      available: statusPool.filter((p) => p.status === "AVAILABLE").length,
      reserved: statusPool.filter((p) => p.status === "RESERVED").length,
      occupied: statusPool.filter((p) => p.status === "OCCUPIED").length,
      maintenance: statusPool.filter((p) => p.status === "MAINTENANCE").length,
      standard15m: plots.filter((p) => p.areaSquareMeters === 15).length,
      large20m: plots.filter((p) => p.areaSquareMeters === 20).length,
    };
  }, [serverTotal, filteredPlots.length, statusPool, plots]);

  // ── Filter options ─────────────────────────────────────────────────────────

  const availableSizes: PlotFilterOption[] = React.useMemo(() => {
    const rawSizes = Array.from(new Set(plots.map((p) => p.areaSquareMeters))).sort(
      (a, b) => a - b,
    );
    return [
      { value: "all", label: "Tất cả", count: plots.length },
      ...rawSizes.map((size) => ({
        value: String(size),
        label: `Lô ${size}m²`,
        count: plots.filter((p) => p.areaSquareMeters === size).length,
      })),
    ];
  }, [plots]);

  const availableZones: PlotFilterOption[] = React.useMemo(() => {
    const rawZones = plots.map((p) => p.zone).filter((z): z is string => Boolean(z));
    const uniqueZones = Array.from(new Set(rawZones));
    return [
      { value: "all", label: "Tất cả khu", count: plots.length },
      ...uniqueZones.map((zone) => ({
        value: zone,
        label: zone,
        count: plots.filter((p) => p.zone === zone).length,
      })),
    ];
  }, [plots]);

  // ── Pagination ─────────────────────────────────────────────────────────────

  /** Total pages từ server (pagination thật) */
  const totalPages = serverTotalPages;

  /**
   * Server đã paginate — paginatedPlots là kết quả client-side filter
   * trên batch page hiện tại từ server.
   */
  const paginatedPlots = filteredPlots;

  // ── Selected plot ──────────────────────────────────────────────────────────

  const selectedPlot = React.useMemo(() => {
    if (!selectedPlotId) return null;
    return plots.find((p) => p.plotCode === selectedPlotId) ?? null;
  }, [plots, selectedPlotId]);

  return {
    plots,
    filteredPlots,
    paginatedPlots,
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages,
    totalFilteredCount: serverTotal,
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
    refetch: () => loadPlots(currentPage, filterStatus),
  };
}
