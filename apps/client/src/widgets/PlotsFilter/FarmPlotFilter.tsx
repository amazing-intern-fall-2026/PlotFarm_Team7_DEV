import * as React from "react";
import {
  Search,
  ArrowUpDown,
  RotateCcw,
  X,
  ChevronDown,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

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

export interface FarmPlotFilterProps {
  counts?: FarmPlotFilterCounts;
  totalCount?: number;
  filteredCount?: number;
  sizeOptions?: Array<{ value: string; label: string; count?: number }>;
  onSearchChange?: (search: string) => void;
  onSizeChange?: (size: string) => void;
  onStatusChange?: (status: string) => void;
  onSortChange?: (sort: string) => void;
  onReset?: () => void;
  className?: string;
}

export function FarmPlotFilter({
  counts = {
    total: 12,
    available: 5,
    reserved: 2,
    occupied: 3,
    maintenance: 2,
    standard15m: 6,
    large20m: 6,
  },
  totalCount,
  filteredCount,
  sizeOptions,
  onSearchChange,
  onSizeChange,
  onStatusChange,
  onSortChange,
  onReset,
  className,
}: FarmPlotFilterProps) {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [selectedSize, setSelectedSize] = React.useState<string>("all");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<string>("camera");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState<boolean>(false);

  const resolvedTotal = totalCount ?? counts.total;
  const resolvedFiltered = filteredCount ?? counts.total;

  const defaultSizeOptions = React.useMemo(() => {
    if (sizeOptions && sizeOptions.length > 0) return sizeOptions;
    return [
      { value: "all", label: `Tất cả (${counts.total})` },
      { value: "15", label: `Lô 15m² (${counts.standard15m ?? 6})` },
      { value: "20", label: `Lô 20m² (${counts.large20m ?? 6})` },
    ];
  }, [sizeOptions, counts]);

  const statusChips = React.useMemo(
    () => [
      {
        id: "AVAILABLE",
        label: `Sẵn sàng thuê (${counts.available})`,
        dotColor: "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]",
        activeStyle: "bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-400/30 font-semibold",
      },
      {
        id: "OCCUPIED",
        label: `Đang canh tác (${counts.occupied})`,
        dotColor: "bg-sky-500",
        activeStyle: "bg-sky-50 text-sky-800 border-sky-300 ring-1 ring-sky-400/30 font-semibold",
      },
      {
        id: "MAINTENANCE",
        label: `Bảo dưỡng (${counts.maintenance})`,
        dotColor: "bg-amber-500",
        activeStyle: "bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-400/30 font-semibold",
      },
      ...(counts.reserved !== undefined && counts.reserved > 0
        ? [
            {
              id: "RESERVED",
              label: `Đang giữ chỗ (${counts.reserved})`,
              dotColor: "bg-orange-500",
              activeStyle: "bg-orange-50 text-orange-800 border-orange-300 ring-1 ring-orange-400/30 font-semibold",
            },
          ]
        : []),
    ],
    [counts]
  );

  const sortOptions = [
    { value: "camera", label: "Góc camera đẹp nhất" },
    { value: "price_asc", label: "Giá thuê: Thấp → Cao" },
    { value: "price_desc", label: "Giá thuê: Cao → Thấp" },
    { value: "area_desc", label: "Diện tích: Lớn nhất" },
    { value: "code_asc", label: "Mã ô: A → Z" },
  ];

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedSize !== "all" ||
    selectedStatus !== "all" ||
    sortBy !== "camera";

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    onSizeChange?.(size);
  };

  const handleStatusChange = (status: string) => {
    const nextStatus = selectedStatus === status ? "all" : status;
    setSelectedStatus(nextStatus);
    onStatusChange?.(nextStatus);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    onSortChange?.(sort);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedSize("all");
    setSelectedStatus("all");
    setSortBy("camera");
    onSearchChange?.("");
    onSizeChange?.("all");
    onStatusChange?.("all");
    onSortChange?.("camera");
    onReset?.();
  };

  return (
    <div className={cn("w-full max-w-6xl mx-auto transition-all", className)}>
      {/* ── Khối tìm kiếm & bộ lọc: Cân đối, hiện đại, chuẩn UI/UX ── */}
      <div className="pt-2 sm:pt-4 relative z-20 w-full">
        <div className="bg-white/95 dark:bg-card/95 backdrop-blur-md rounded-2xl shadow-lg shadow-emerald-950/5 border border-slate-200/80 dark:border-border/80 p-5 sm:p-6 transition-all space-y-4">
          
          {/* ── TẦNG 1: Quick Search Bar & Sắp Xếp Nhanh (Chuẩn h-12 / 48px) ── */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Ô Input tìm kiếm chuẩn 48px */}
            <div className="relative flex-1 flex items-center h-12 bg-slate-50/90 dark:bg-muted/40 hover:bg-slate-100/80 dark:hover:bg-muted/60 focus-within:bg-white dark:focus-within:bg-background focus-within:ring-2 focus-within:ring-emerald-500/80 border border-slate-200/80 dark:border-border/80 transition-all rounded-xl px-4 gap-3 shadow-2xs">
              <Search className="h-5 w-5 text-slate-400 dark:text-muted-foreground shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Tìm theo mã ô (#A-101), khu vực hoặc loại rau canh tác..."
                className="w-full bg-transparent text-sm sm:text-base text-slate-800 dark:text-foreground placeholder:text-slate-400 dark:placeholder:text-muted-foreground/70 focus:outline-none font-medium"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="rounded-full p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-foreground transition-colors"
                  aria-label="Xóa từ khóa"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Nút Toggle Bộ lọc trên Mobile */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen((prev) => !prev)}
              className="sm:hidden flex items-center justify-center gap-2 h-12 bg-slate-50 dark:bg-muted/40 hover:bg-slate-100 px-4 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 dark:text-foreground"
            >
              <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
              <span>Lọc chi tiết</span>
              {hasActiveFilters && (
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </button>

            {/* Nút Dropdown Sắp xếp chuẩn h-12 */}
            <div className="relative shrink-0 hidden sm:block">
              <div className="flex items-center gap-2 h-12 bg-slate-50/90 dark:bg-muted/40 hover:bg-slate-100 dark:hover:bg-muted px-4 rounded-xl border border-slate-200/80 dark:border-border/80 text-sm font-medium text-slate-700 dark:text-foreground transition-all shadow-2xs">
                <ArrowUpDown className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-500 dark:text-muted-foreground">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  aria-label="Sắp xếp ô đất"
                  className="appearance-none bg-transparent text-sm font-semibold text-slate-800 dark:text-foreground focus:outline-none cursor-pointer pr-6"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="h-4 w-4 text-slate-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* ── TẦNG 2: Nhóm Filter Pills & Status Chips Chuẩn Đẹp ── */}
          <div
            className={cn(
              "flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 pt-3.5 border-t border-slate-100 dark:border-border/40",
              isMobileFilterOpen ? "flex" : "hidden sm:flex"
            )}
          >
            {/* Nhóm phân loại diện tích dạng Segmented Pills */}
            <div className="flex items-center gap-1 p-1 bg-slate-100/90 dark:bg-muted/50 rounded-xl overflow-x-auto scrollbar-none shrink-0">
              {defaultSizeOptions.map((opt) => {
                const isActive = selectedSize === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSizeChange(opt.value)}
                    className={cn(
                      "px-3.5 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all select-none cursor-pointer",
                      isActive
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "text-slate-600 dark:text-muted-foreground hover:bg-slate-200/70 dark:hover:bg-muted"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Nhóm chip trạng thái trực quan với Status Dot */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5 flex-wrap">
              {statusChips.map((chip) => {
                const isActive = selectedStatus === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => handleStatusChange(chip.id)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap inline-flex items-center gap-2 border transition-all cursor-pointer select-none",
                      isActive
                        ? chip.activeStyle
                        : "bg-slate-50 dark:bg-muted/20 hover:bg-slate-100 dark:hover:bg-muted/50 border-slate-200/80 dark:border-border/60 text-slate-600 dark:text-muted-foreground"
                    )}
                  >
                    <span className={cn("h-2 w-2 rounded-full shrink-0", chip.dotColor)} />
                    <span>{chip.label}</span>
                  </button>
                );
              })}

              {/* Nút Đặt lại bộ lọc */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-full text-sm font-semibold text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors inline-flex items-center gap-1.5 shrink-0 ml-1 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Đặt lại</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. TIÊU ĐỀ DANH MỤC CÂN ĐỐI (MT-7 MB-4) ── */}
      <div className="mt-7 mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50">
            <Sparkles className="h-3 w-3" />
            DANH SÁCH Ô ĐẤT
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-foreground">
            Các ô đất đang sẵn sàng canh tác
          </h2>
        </div>

        {/* Cột phải: Bộ đếm kết quả trực quan dạng Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-card border border-slate-200/80 dark:border-border shadow-2xs text-sm font-medium text-slate-600 dark:text-muted-foreground shrink-0 self-start sm:self-end">
          <span>Hiển thị</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
            {resolvedFiltered}
          </span>
          <span>/</span>
          <span className="font-bold text-slate-900 dark:text-foreground">
            {resolvedTotal}
          </span>
          <span>ô đất phù hợp</span>
        </div>
      </div>
    </div>
  );
}
