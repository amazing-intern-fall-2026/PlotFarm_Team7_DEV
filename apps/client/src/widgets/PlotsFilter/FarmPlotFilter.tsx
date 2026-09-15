import * as React from "react";
import { useDevice } from "@/shared/lib/device";
import { FarmPlotFilterDesktop } from "./FarmPlotFilterDesktop";
import { FarmPlotFilterMobile } from "./FarmPlotFilterMobile";
import {
  PLOTS_FILTER_MESSAGES,
  PLOTS_STATUS_CHIP_DEFINITIONS,
} from "./constants";
import type {
  FarmPlotFilterCounts,
  FarmPlotFilterProps,
  FarmPlotFilterViewProps,
  StatusChipItem,
} from "./types";

export * from "./types";
export * from "./constants";
export * from "./FarmPlotFilterDesktop";
export * from "./FarmPlotFilterMobile";

const EMPTY_COUNTS: FarmPlotFilterCounts = {
  total: 0,
  available: 0,
  reserved: 0,
  occupied: 0,
  maintenance: 0,
  standard15m: 0,
  large20m: 0,
};

export function FarmPlotFilter({
  counts = EMPTY_COUNTS,
  totalCount,
  filteredCount,
  sizeOptions,
  searchTerm: propSearchTerm,
  selectedSize: propSelectedSize,
  selectedStatus: propSelectedStatus,
  sortBy: propSortBy,
  onSearchChange,
  onSizeChange,
  onStatusChange,
  onSortChange,
  onReset,
  className,
}: FarmPlotFilterProps) {
  const { isMobile } = useDevice();
  const [internalSearchTerm, setInternalSearchTerm] = React.useState<string>("");
  const [internalSelectedSize, setInternalSelectedSize] = React.useState<string>("all");
  const [internalSelectedStatus, setInternalSelectedStatus] = React.useState<string>("all");
  const [internalSortBy, setInternalSortBy] = React.useState<string>("code_asc");

  const searchTerm = propSearchTerm !== undefined ? propSearchTerm : internalSearchTerm;
  const selectedSize = propSelectedSize !== undefined ? propSelectedSize : internalSelectedSize;
  const selectedStatus = propSelectedStatus !== undefined ? propSelectedStatus : internalSelectedStatus;
  const sortBy = propSortBy !== undefined ? propSortBy : internalSortBy;

  const resolvedTotal = totalCount ?? counts.total;
  const resolvedFiltered = filteredCount ?? counts.total;

  const defaultSizeOptions = React.useMemo(() => {
    if (sizeOptions && sizeOptions.length > 0) return sizeOptions;
    return [
      {
        value: "all",
        label: `${PLOTS_FILTER_MESSAGES.ALL_SIZES_LABEL} (${counts.total})`,
      },
      {
        value: "15",
        label: `${PLOTS_FILTER_MESSAGES.SIZE_15M_LABEL} (${counts.standard15m ?? 0})`,
      },
      {
        value: "20",
        label: `${PLOTS_FILTER_MESSAGES.SIZE_20M_LABEL} (${counts.large20m ?? 0})`,
      },
    ];
  }, [sizeOptions, counts]);

  const statusChips = React.useMemo<StatusChipItem[]>(() => {
    return PLOTS_STATUS_CHIP_DEFINITIONS.filter((def) => {
      // Ẩn chip RESERVED nếu không có lô nào giữ chỗ trong hệ thống
      if (def.id === "RESERVED" && (counts.reserved === undefined || counts.reserved < 0)) {
        return false;
      }
      return true;
    }).map((def) => {
      let count = 0;
      if (def.id === "AVAILABLE") count = counts.available;
      if (def.id === "OCCUPIED") count = counts.occupied;
      if (def.id === "MAINTENANCE") count = counts.maintenance;
      if (def.id === "RESERVED") count = counts.reserved ?? 0;

      return {
        id: def.id,
        label: `${def.label} (${count})`,
        dotColor: def.dotColor,
        activeStyle: def.activeStyle,
      };
    });
  }, [counts]);

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedSize !== "all" ||
    selectedStatus !== "all" ||
    sortBy !== "code_asc";

  const handleSearchChange = (value: string) => {
    setInternalSearchTerm(value);
    onSearchChange?.(value);
  };

  const handleSizeChange = (size: string) => {
    setInternalSelectedSize(size);
    onSizeChange?.(size);
  };

  const handleStatusChange = (status: string) => {
    const nextStatus = selectedStatus === status ? "all" : status;
    setInternalSelectedStatus(nextStatus);
    onStatusChange?.(nextStatus);
  };

  const handleSortChange = (sort: string) => {
    setInternalSortBy(sort);
    onSortChange?.(sort);
  };

  const handleReset = () => {
    setInternalSearchTerm("");
    setInternalSelectedSize("all");
    setInternalSelectedStatus("all");
    setInternalSortBy("code_asc");
    onSearchChange?.("");
    onSizeChange?.("all");
    onStatusChange?.("all");
    onSortChange?.("code_asc");
    onReset?.();
  };

  const viewProps: FarmPlotFilterViewProps = {
    searchTerm,
    selectedSize,
    selectedStatus,
    sortBy,
    resolvedTotal,
    resolvedFiltered,
    hasActiveFilters,
    sizeOptions: defaultSizeOptions,
    statusChips,
    handleSearchChange,
    handleSizeChange,
    handleStatusChange,
    handleSortChange,
    handleReset,
    className,
  };

  return isMobile ? (
    <FarmPlotFilterMobile {...viewProps} />
  ) : (
    <FarmPlotFilterDesktop {...viewProps} />
  );
}
