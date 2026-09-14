import * as React from "react";
import { useDevice } from "@/shared/lib/device";
import { PlotsFilterBarDesktop } from "./PlotsFilterBarDesktop";
import { PlotsFilterBarMobile } from "./PlotsFilterBarMobile";
import type {
  PlotsFilterBarProps,
  PlotsFilterViewProps,
  PlotFilterCounts,
  PlotFilterValues,
  PlotSizeFilter,
  PlotStatusFilter,
  PlotSortOption,
} from "./types";

export * from "./types";
export * from "./PlotsFilterBarDesktop";
export * from "./PlotsFilterBarMobile";

const DEFAULT_COUNTS: PlotFilterCounts = {
  total: 50,
  standard15m: 28,
  large20m: 22,
  available: 12,
  occupied: 32,
  maintenance: 6,
};

const DEFAULT_FILTERS: PlotFilterValues = {
  search: "",
  size: "all",
  status: "all",
  sortBy: "camera",
};

export function PlotsFilterBar({
  className,
  counts: userCounts,
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
    (size: PlotSizeFilter) => {
      updateFilters((prev) => ({ ...prev, size }));
    },
    [updateFilters]
  );

  const handleStatusChange = React.useCallback(
    (status: PlotStatusFilter) => {
      updateFilters((prev) => ({ ...prev, status }));
    },
    [updateFilters]
  );

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

  // Tính toán số lượng hiển thị dựa trên bộ lọc đang áp dụng
  const totalFilteredCount = React.useMemo(() => {
    let count = counts.total;
    if (filters.status === "available") {
      count = counts.available;
    } else if (filters.status === "occupied") {
      count = counts.occupied;
    } else if (filters.status === "maintenance") {
      count = counts.maintenance;
    }

    if (filters.size === "standard_15m") {
      count = Math.min(count, counts.standard15m);
    } else if (filters.size === "large_20m") {
      count = Math.min(count, counts.large20m);
    }

    if (filters.search.trim() !== "") {
      // Giả lập kết quả thu hẹp khi gõ tìm kiếm mã ô
      count = Math.max(1, Math.min(count, 4));
    }

    return count;
  }, [filters, counts]);

  const viewProps: PlotsFilterViewProps = {
    filters,
    counts,
    totalFilteredCount,
    onSearchChange: handleSearchChange,
    onSizeChange: handleSizeChange,
    onStatusChange: handleStatusChange,
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
