export type PlotSizeFilter = "all" | "standard_15m" | "large_20m";
export type PlotStatusFilter = "all" | "available" | "occupied" | "maintenance";
export type PlotSortOption = "camera" | "price_asc" | "price_desc" | "area_desc" | "code_asc";

export interface PlotFilterCounts {
  total: number;
  standard15m: number;
  large20m: number;
  available: number;
  occupied: number;
  maintenance: number;
}

export interface PlotFilterValues {
  search: string;
  size: PlotSizeFilter;
  status: PlotStatusFilter;
  sortBy: PlotSortOption;
}

export interface PlotsFilterBarProps {
  className?: string;
  counts?: Partial<PlotFilterCounts>;
  initialFilters?: Partial<PlotFilterValues>;
  onFilterChange?: (filters: PlotFilterValues) => void;
  onResetFilters?: () => void;
}

export interface PlotsFilterViewProps {
  filters: PlotFilterValues;
  counts: PlotFilterCounts;
  totalFilteredCount: number;
  onSearchChange: (val: string) => void;
  onSizeChange: (size: PlotSizeFilter) => void;
  onStatusChange: (status: PlotStatusFilter) => void;
  onSortChange: (sort: PlotSortOption) => void;
  onReset: () => void;
  className?: string;
}
