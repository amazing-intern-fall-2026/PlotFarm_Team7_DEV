import { Search, RotateCcw, X, ChevronDown } from "lucide-react";
import { Box, Button, Heading, Text } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import type { PlotsFilterViewProps, PlotSizeFilter, PlotStatusFilter, PlotSortOption } from "./types";

export function PlotsFilterBarMobile({
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
    { id: "all", label: `Tất cả (${counts.total})` },
    { id: "standard_15m", label: `Chuẩn 15m² (${counts.standard15m})` },
    { id: "large_20m", label: `Lớn 20m² (${counts.large20m})` },
  ];

  const statusOptions: Array<{
    id: PlotStatusFilter;
    label: string;
    dotColor: string;
    glowClass?: string;
  }> = [
    {
      id: "available",
      label: `Sẵn sàng (${counts.available})`,
      dotColor: "bg-emerald-500",
      glowClass: "shadow-[0_0_6px_rgba(16,185,129,0.5)]",
    },
    {
      id: "reserved",
      label: `Giữ chỗ (${counts.reserved ?? 0})`,
      dotColor: "bg-amber-500",
    },
    {
      id: "occupied",
      label: `Đang canh tác (${counts.occupied})`,
      dotColor: "bg-slate-400",
    },
    {
      id: "maintenance",
      label: `Bảo dưỡng (${counts.maintenance})`,
      dotColor: "bg-amber-700",
    },
  ];

  const sortOptions: Array<{ id: PlotSortOption; label: string }> = [
    { id: "camera", label: "Góc camera đẹp nhất" },
    { id: "price_asc", label: "Giá: Thấp → Cao" },
    { id: "price_desc", label: "Giá: Cao → Thấp" },
    { id: "area_desc", label: "Diện tích: Lớn nhất" },
    { id: "code_asc", label: "Mã ô: A → Z" },
  ];

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.size !== "all" ||
    filters.status !== "all" ||
    filters.sortBy !== "camera";

  return (
    <Box className={cn("w-full space-y-4", className)}>
      {/* ── Outer Mobile Card ── */}
      <Box className="w-full bg-card border border-border/80 rounded-2xl p-4 shadow-xs space-y-3.5">
        {/* Row 1: Search Input */}
        <Box className="relative w-full">
          <Box className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-muted-foreground">
            <Search className="h-4 w-4" />
          </Box>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo mã ô (#A-101, B-202)..."
            className={cn(
              "w-full h-10 rounded-full border border-border/70 bg-muted/20 pl-10 pr-9 text-xs",
              "text-foreground placeholder:text-muted-foreground/80",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background",
              "transition-all"
            )}
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
              aria-label="Xóa từ khóa tìm kiếm"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </Box>

        {/* Row 2: Size Pills (Horizontal scroll touch-friendly) */}
        <Box className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
          {sizeOptions.map((opt) => {
            const isActive = filters.size === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSizeChange(opt.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all select-none cursor-pointer",
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

        {/* Row 3: Status Pills (Horizontal scroll) */}
        <Box className="pt-2 border-t border-border/40 space-y-1.5">
          <Text
            variant="small"
            className="text-[11px] font-bold text-muted-foreground tracking-wider uppercase select-none"
          >
            Trạng thái ô:
          </Text>
          <Box className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
            {statusOptions.map((opt) => {
              const isActive = filters.status === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onStatusChange(isActive ? "all" : opt.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 transition-all select-none cursor-pointer",
                    isActive
                      ? "bg-accent/80 text-foreground border border-primary/50 ring-1 ring-primary/30 font-semibold"
                      : "bg-muted/20 hover:bg-muted/50 text-muted-foreground hover:text-foreground border border-border/60"
                  )}
                >
                  <span
                    className={cn("h-1.5 w-1.5 rounded-full shrink-0", opt.dotColor, opt.glowClass)}
                  />
                  {opt.label}
                </button>
              );
            })}
          </Box>
        </Box>

        {/* Row 4: Sắp xếp + Nút đặt lại */}
        <Box className="flex items-center justify-between gap-2 pt-2 border-t border-border/40">
          <Box className="relative flex-1">
            <select
              value={filters.sortBy}
              onChange={(e) => onSortChange(e.target.value as PlotSortOption)}
              aria-label="Sắp xếp ô đất"
              className={cn(
                "w-full appearance-none h-8.5 pl-3 pr-7 rounded-lg border border-border/80 bg-card text-xs font-medium",
                "text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-xs"
              )}
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          </Box>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-8.5 px-2.5 text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 shrink-0"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Đặt lại</span>
            </Button>
          )}
        </Box>
      </Box>

      {/* ── Mobile Section Title & Counter ── */}
      <Box className="flex items-center justify-between px-1">
        <Box className="space-y-0.5">
          <Text
            variant="small"
            className="text-[10px] font-bold uppercase tracking-wider text-primary"
          >
            DANH SÁCH Ô ĐẤT CANH TÁC
          </Text>
          <Heading level={2} className="text-lg font-bold tracking-tight text-foreground">
            Các ô đất chất lượng cao
          </Heading>
        </Box>

        <Text variant="small" className="text-xs font-semibold text-muted-foreground">
          {totalFilteredCount} ô đất
        </Text>
      </Box>
    </Box>
  );
}
