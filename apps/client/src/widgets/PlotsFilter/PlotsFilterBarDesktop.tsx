import { Search, RotateCcw, X, ChevronDown } from "lucide-react";
import { Box, Button, Heading, Text } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import type { PlotsFilterViewProps, PlotSizeFilter, PlotStatusFilter, PlotSortOption } from "./types";

export function PlotsFilterBarDesktop({
  filters,
  counts,
  totalFilteredCount,
  onSearchChange,
  onSizeChange,
  onStatusChange,
  onSortChange,
  onReset,
  className,
}: PlotsFilterViewProps) {
  const sizeOptions: Array<{ id: PlotSizeFilter; label: string }> = [
    { id: "all", label: `Tất cả ô đất (${counts.total})` },
    { id: "standard_15m", label: `Lô chuẩn 15m² (${counts.standard15m} ô)` },
    { id: "large_20m", label: `Lô lớn 20m² (${counts.large20m} ô)` },
  ];

  const statusOptions: Array<{
    id: PlotStatusFilter;
    label: string;
    dotColor: string;
    glowClass?: string;
  }> = [
    {
      id: "available",
      label: `Sẵn sàng thuê (${counts.available} ô Available)`,
      dotColor: "bg-emerald-500",
      glowClass: "shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    },
    {
      id: "occupied",
      label: `Đang canh tác (${counts.occupied} ô Occupied)`,
      dotColor: "bg-slate-400",
    },
    {
      id: "maintenance",
      label: `Đang làm đất / Bảo dưỡng (${counts.maintenance} ô Maintenance)`,
      dotColor: "bg-amber-500",
    },
  ];

  const sortOptions: Array<{ id: PlotSortOption; label: string }> = [
    { id: "camera", label: "Góc camera đẹp nhất" },
    { id: "price_asc", label: "Giá thuê: Thấp đến cao" },
    { id: "price_desc", label: "Giá thuê: Cao đến thấp" },
    { id: "area_desc", label: "Diện tích: Lớn nhất" },
    { id: "code_asc", label: "Mã ô đất: A → Z" },
  ];

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.size !== "all" ||
    filters.status !== "all" ||
    filters.sortBy !== "camera";

  return (
    <Box className={cn("w-full space-y-6", className)}>
      {/* ── Outer Card Container (Style theo UI bên trái) ── */}
      <Box className="w-full bg-card border border-border/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-5">
        {/* ── Row 1: Search Input lớn toàn chiều ngang ── */}
        <Box className="relative w-full">
          <Box className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
            <Search className="h-5 w-5" />
          </Box>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo mã ô (#A-101, B-202) hoặc khu vực..."
            className={cn(
              "w-full h-12 rounded-full border border-border/70 bg-muted/20 pl-12 pr-10 text-sm",
              "text-foreground placeholder:text-muted-foreground/80",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background focus:border-primary/50",
              "transition-all"
            )}
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Xóa từ khóa tìm kiếm"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </Box>

        {/* ── Row 2: Bộ lọc phân loại diện tích / danh mục (Pills nổi bật) ── */}
        <Box className="flex items-center justify-between gap-4 pt-1">
          <Box className="flex items-center gap-2.5 flex-wrap">
            {sizeOptions.map((opt) => {
              const isActive = filters.size === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSizeChange(opt.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold transition-all select-none cursor-pointer",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-muted/30 hover:bg-muted/60 text-muted-foreground hover:text-foreground border border-border/70"
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </Box>

          {/* Sắp xếp nhanh (Desktop) */}
          <Box className="flex items-center gap-2 shrink-0">
            <Text variant="small" className="text-muted-foreground font-medium select-none">
              Sắp xếp:
            </Text>
            <Box className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => onSortChange(e.target.value as PlotSortOption)}
                aria-label="Sắp xếp ô đất"
                className={cn(
                  "appearance-none h-9 pl-3 pr-8 rounded-xl border border-border/80 bg-card text-xs font-semibold",
                  "text-foreground hover:border-border focus:outline-none focus:ring-2 focus:ring-primary/40",
                  "cursor-pointer shadow-xs transition-colors"
                )}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </Box>
          </Box>
        </Box>

        {/* ── Row 3: Bộ lọc phụ với nhãn TRẠNG THÁI Ô + Nút đặt lại ── */}
        <Box className="flex items-center justify-between gap-4 pt-2 border-t border-border/40">
          <Box className="flex items-center gap-3 flex-wrap">
            <Text
              variant="small"
              className="text-xs font-bold text-muted-foreground tracking-wider uppercase select-none shrink-0"
            >
              Trạng thái ô:
            </Text>

            <Box className="flex items-center gap-2 flex-wrap">
              {statusOptions.map((opt) => {
                const isActive = filters.status === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onStatusChange(isActive ? "all" : opt.id)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-2 transition-all cursor-pointer select-none",
                      isActive
                        ? "bg-accent/80 text-foreground border border-primary/50 ring-1 ring-primary/30 font-semibold"
                        : "bg-muted/20 hover:bg-muted/50 text-muted-foreground hover:text-foreground border border-border/60"
                    )}
                  >
                    <span
                      className={cn("h-2 w-2 rounded-full shrink-0", opt.dotColor, opt.glowClass)}
                    />
                    {opt.label}
                  </button>
                );
              })}
            </Box>
          </Box>

          {/* Đặt lại bộ lọc */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Đặt lại bộ lọc</span>
            </Button>
          )}
        </Box>
      </Box>

      {/* ── Section Title & Counter (Theo phong cách bên dưới card của ảnh trái) ── */}
      <Box className="flex items-end justify-between pt-2">
        <Box className="space-y-1">
          <Text
            variant="small"
            className="text-xs font-bold uppercase tracking-wider text-primary"
          >
            DANH SÁCH Ô ĐẤT CANH TÁC
          </Text>
          <Heading
            level={2}
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            Các ô đất chất lượng cao
          </Heading>
        </Box>

        <Text variant="small" className="text-sm font-semibold text-muted-foreground pb-0.5">
          {totalFilteredCount} ô đất
        </Text>
      </Box>
    </Box>
  );
}
