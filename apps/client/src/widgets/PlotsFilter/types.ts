export type PlotStatusFilter = "all" | "available" | "reserved" | "occupied" | "maintenance";
export type PlotSortOption = "camera" | "price_asc" | "price_desc" | "area_desc" | "code_asc";

export interface PlotFilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FarmPlotFilterCounts {
  total: number;
  available: number;
  reserved?: number;
  occupied: number;
  maintenance: number;
  standard15m?: number;
  large20m?: number;
  [key: string]: number | undefined;
}

export type PlotFilterCounts = FarmPlotFilterCounts;

export interface StatusChipItem {
  id: string;
  label: string;
  dotColor: string;
  activeStyle: string;
}

export interface FarmPlotFilterProps {
  counts?: FarmPlotFilterCounts;
  totalCount?: number;
  filteredCount?: number;
  sizeOptions?: Array<{ value: string; label: string; count?: number }>;
  searchTerm?: string;
  selectedSize?: string;
  selectedStatus?: string;
  sortBy?: string;
  onSearchChange?: (search: string) => void;
  onSizeChange?: (size: string) => void;
  onStatusChange?: (status: string) => void;
  onSortChange?: (sort: string) => void;
  onReset?: () => void;
  className?: string;
}

export interface FarmPlotFilterViewProps {
  searchTerm: string;
  selectedSize: string;
  selectedStatus: string;
  sortBy: string;
  resolvedTotal: number;
  resolvedFiltered: number;
  hasActiveFilters: boolean;
  sizeOptions: Array<{ value: string; label: string; count?: number }>;
  statusChips: StatusChipItem[];
  handleSearchChange: (value: string) => void;
  handleSizeChange: (size: string) => void;
  handleStatusChange: (status: string) => void;
  handleSortChange: (sort: string) => void;
  handleReset: () => void;
  className?: string;
}

export interface PlotFilterValues {
  search: string;
  size: string;
  zone: string;
  status: PlotStatusFilter;
  hasCamera?: boolean;
  hasIot?: boolean;
  sortBy: PlotSortOption;
}

export interface PlotsFilterBarProps {
  className?: string;
  counts?: Partial<PlotFilterCounts>;
  sizeOptions?: PlotFilterOption[];
  zoneOptions?: PlotFilterOption[];
  initialFilters?: Partial<PlotFilterValues>;
  onFilterChange?: (filters: PlotFilterValues) => void;
  onResetFilters?: () => void;
}

export interface PlotsFilterViewProps {
  filters: PlotFilterValues;
  counts: PlotFilterCounts;
  sizeOptions: PlotFilterOption[];
  zoneOptions: PlotFilterOption[];
  totalFilteredCount: number;
  onSearchChange: (val: string) => void;
  onSizeChange: (size: string) => void;
  onZoneChange: (zone: string) => void;
  onStatusChange: (status: PlotStatusFilter) => void;
  onToggleCamera: () => void;
  onToggleIot: () => void;
  onSortChange: (sort: PlotSortOption) => void;
  onReset: () => void;
  className?: string;
}
