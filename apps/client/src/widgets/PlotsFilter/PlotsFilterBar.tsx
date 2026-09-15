import * as React from "react";
import { useDevice } from "@/shared/lib/device";
import { PlotsFilterBarDesktop } from "./PlotsFilterBarDesktop";
import { PlotsFilterBarMobile } from "./PlotsFilterBarMobile";
import type {
  PlotsFilterBarProps,
  PlotsFilterViewProps,
  PlotFilterCounts,
  PlotFilterValues,
  PlotFilterOption,
  PlotStatusFilter,
  PlotSortOption,
} from "./types";

export * from "./types";
export * from "./PlotsFilterBarDesktop";
export * from "./PlotsFilterBarMobile";

const DEFAULT_COUNTS: PlotFilterCounts = {
  total: 0,
  available: 0,
  reserved: 0,
  occupied: 0,
  maintenance: 0,
};

const DEFAULT_FILTERS: PlotFilterValues = {
  search: "",
  size: "all",
  zone: "all",
  status: "all",
  hasCamera: false,
  hasIot: false,
  sortBy: "code_asc",
};

export function PlotsFilterBar({
  className,
  counts: userCounts,
  sizeOptions: userSizeOptions,
  zoneOptions: userZoneOptions,
  initialFilters,
  onFilterChange,
  onResetFilters,
}: PlotsFilterBarProps) {
  const { isMobile } = useDevice();

  const counts: PlotFilterCounts = React.useMemo(
    () => ({ ...DEFAULT_COUNTS, ...userCounts }),
    [userCounts]
  );

  const [filters, setFilters] = React.useState<PlotFilterValues>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const updateFilters = React.useCallback(
    (updater: (prev: PlotFilterValues) => PlotFilterValues) => {
      setFilters((prev) => {
        const next = updater(prev);
        onFilterChange?.(next);
        return next;
      });
    },
    [onFilterChange]
  );

  const handleSearchChange = React.useCallback(
    (search: string) => {
      updateFilters((prev) => ({ ...prev, search }));
    },
    [updateFilters]
  );

  const handleSizeChange = React.useCallback(
    (size: string) => {
      updateFilters((prev) => ({ ...prev, size }));
    },
    [updateFilters]
  );

  const handleZoneChange = React.useCallback(
    (zone: string) => {
      updateFilters((prev) => ({ ...prev, zone }));
    },
    [updateFilters]
  );

  const handleStatusChange = React.useCallback(
    (status: PlotStatusFilter) => {
      updateFilters((prev) => ({ ...prev, status }));
    },
    [updateFilters]
  );

  const handleToggleCamera = React.useCallback(() => {
    updateFilters((prev) => ({ ...prev, hasCamera: !prev.hasCamera }));
  }, [updateFilters]);

  const handleToggleIot = React.useCallback(() => {
    updateFilters((prev) => ({ ...prev, hasIot: !prev.hasIot }));
  }, [updateFilters]);

  const handleSortChange = React.useCallback(
    (sortBy: PlotSortOption) => {
      updateFilters((prev) => ({ ...prev, sortBy }));
    },
    [updateFilters]
  );

  const handleReset = React.useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    onFilterChange?.(DEFAULT_FILTERS);
    onResetFilters?.();
  }, [onFilterChange, onResetFilters]);

  // Sinh động danh sách sizeOptions nếu không truyền từ bên ngoài
  const resolvedSizeOptions: PlotFilterOption[] = React.useMemo(() => {
    if (userSizeOptions && userSizeOptions.length > 0) return userSizeOptions;
    const list: PlotFilterOption[] = [{ value: "all", label: `Tất cả (${counts.total})`, count: counts.total }];
    if (counts.standard15m !== undefined) {
      list.push({ value: "15", label: `Lô 15m² (${counts.standard15m})`, count: counts.standard15m });
    }
    if (counts.large20m !== undefined) {
      list.push({ value: "20", label: `Lô 20m² (${counts.large20m})`, count: counts.large20m });
    }
    return list;
  }, [userSizeOptions, counts]);

  const resolvedZoneOptions: PlotFilterOption[] = React.useMemo(() => {
    return userZoneOptions || [{ value: "all", label: `Tất cả (${counts.total})`, count: counts.total }];
  }, [userZoneOptions, counts.total]);

  // Tính toán số lượng hiển thị dựa trên bộ lọc đang áp dụng
  const totalFilteredCount = React.useMemo(() => {
    let count = counts.total;
    if (filters.status === "available") {
      count = counts.available;
    } else if (filters.status === "reserved") {
      count = counts.reserved ?? 0;
    } else if (filters.status === "occupied") {
      count = counts.occupied;
    } else if (filters.status === "maintenance") {
      count = counts.maintenance;
    }

    if (filters.size === "15" && counts.standard15m !== undefined) {
      count = Math.min(count, counts.standard15m);
    } else if (filters.size === "20" && counts.large20m !== undefined) {
      count = Math.min(count, counts.large20m);
    }

    if (filters.search.trim() !== "") {
      count = Math.max(1, Math.min(count, 4));
    }

    return count;
  }, [filters, counts]);

  const viewProps: PlotsFilterViewProps = {
    filters,
    counts,
    sizeOptions: resolvedSizeOptions,
    zoneOptions: resolvedZoneOptions,
    totalFilteredCount,
    onSearchChange: handleSearchChange,
    onSizeChange: handleSizeChange,
    onZoneChange: handleZoneChange,
    onStatusChange: handleStatusChange,
    onToggleCamera: handleToggleCamera,
    onToggleIot: handleToggleIot,
    onSortChange: handleSortChange,
    onReset: handleReset,
    className,
  };

  return isMobile ? (
    <PlotsFilterBarMobile {...viewProps} />
  ) : (
    <PlotsFilterBarDesktop {...viewProps} />
  );
}
