import {
  Search,
  ArrowUpDown,
  RotateCcw,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Box, Button, Heading, Text, Badge } from "@/shared/ui";
import { PLOTS_FILTER_MESSAGES, PLOTS_FILTER_SORT_OPTIONS } from "./constants";
import type { FarmPlotFilterViewProps } from "./types";

export function FarmPlotFilterDesktop({
  searchTerm,
  selectedSize,
  selectedStatus,
  sortBy,
  resolvedTotal,
  resolvedFiltered,
  hasActiveFilters,
  sizeOptions,
  statusChips,
  handleSearchChange,
  handleSizeChange,
  handleStatusChange,
  handleSortChange,
  handleReset,
  className,
}: FarmPlotFilterViewProps) {
  return (
    <Box className={cn("w-full transition-all", className)}>
      {/* ── Khối tìm kiếm & bộ lọc Desktop ── */}
      <Box className="pt-2 sm:pt-4 relative z-20 w-full">
        <Box className="bg-white/95 dark:bg-card/95 backdrop-blur-md rounded-2xl shadow-lg shadow-emerald-950/5 border border-slate-200/80 dark:border-border/80 p-5 sm:p-6 transition-all space-y-4">
          
          {/* ── TẦNG 1: Quick Search Bar & Sắp Xếp Nhanh (Chuẩn h-12 / 48px) ── */}
          <Box className="flex items-center gap-3">
            {/* Ô Input tìm kiếm chuẩn 48px */}
            <Box className="relative flex-1 flex items-center h-12 bg-slate-50/90 dark:bg-muted/40 hover:bg-slate-100/80 dark:hover:bg-muted/60 focus-within:bg-white dark:focus-within:bg-background focus-within:ring-2 focus-within:ring-primary/80 border border-slate-200/80 dark:border-border/80 transition-all rounded-xl px-4 gap-3 shadow-2xs">
              <Search className="h-5 w-5 text-slate-400 dark:text-muted-foreground shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={PLOTS_FILTER_MESSAGES.SEARCH_PLACEHOLDER}
                className="w-full bg-transparent text-sm sm:text-base text-slate-800 dark:text-foreground placeholder:text-muted-foreground/70 focus:outline-none font-medium"
              />
              {searchTerm && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSearchChange("")}
                  className="h-7 w-7 p-0 rounded-full text-muted-foreground hover:text-foreground hover:bg-slate-200/60 transition-colors"
                  aria-label={PLOTS_FILTER_MESSAGES.CLEAR_SEARCH_ARIA}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </Box>

            {/* Nút Dropdown Sắp xếp chuẩn h-12 */}
            <Box className="relative shrink-0">
              <Box className="flex items-center gap-2 h-12 bg-slate-50/90 dark:bg-muted/40 hover:bg-slate-100 dark:hover:bg-muted px-4 rounded-xl border border-slate-200/80 dark:border-border/80 text-sm font-medium text-foreground transition-all shadow-2xs">
                <ArrowUpDown className="h-4 w-4 text-primary shrink-0" />
                <Text as="span" className="text-xs text-muted-foreground">
                  {PLOTS_FILTER_MESSAGES.SORT_LABEL}
                </Text>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  aria-label={PLOTS_FILTER_MESSAGES.SORT_ARIA}
                  className="appearance-none bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer pr-6"
                >
                  {PLOTS_FILTER_SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="h-4 w-4 text-muted-foreground pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
              </Box>
            </Box>
          </Box>

          {/* ── TẦNG 2: Nhóm Filter Pills & Status Chips Chuẩn Đẹp ── */}
          <Box className="flex items-center justify-between gap-3.5 pt-3.5 border-t border-slate-100 dark:border-border/40">
            {/* Nhóm phân loại diện tích dạng Segmented Pills */}
            <Box className="flex items-center gap-1 p-1 bg-slate-100/90 dark:bg-muted/50 rounded-xl overflow-x-auto scrollbar-none shrink-0">
              {sizeOptions.map((opt) => {
                const isActive = selectedSize === opt.value;
                return (
                  <Button
                    key={opt.value}
                    type="button"
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => handleSizeChange(opt.value)}
                    className={cn(
                      "h-auto px-3.5 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all select-none cursor-pointer",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-2xs"
                        : "text-muted-foreground hover:bg-slate-200/70 hover:text-foreground dark:hover:bg-muted"
                    )}
                  >
                    {opt.label}
                  </Button>
                );
              })}
            </Box>

            {/* Nhóm chip trạng thái trực quan với Status Dot */}
            <Box className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5 flex-wrap">
              {statusChips.map((chip) => {
                const isActive = selectedStatus === chip.id;
                return (
                  <Button
                    key={chip.id}
                    type="button"
                    variant="outline"
                    onClick={() => handleStatusChange(chip.id)}
                    className={cn(
                      "h-auto px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap inline-flex items-center gap-2 border transition-all cursor-pointer select-none",
                      isActive
                        ? chip.activeStyle
                        : "bg-slate-50 dark:bg-muted/20 hover:bg-slate-100 dark:hover:bg-muted/50 border-slate-200/80 dark:border-border/60 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Box className={cn("h-2 w-2 rounded-full shrink-0 inline-block", chip.dotColor)} />
                    <Text as="span">{chip.label}</Text>
                  </Button>
                );
              })}

              {/* Nút Đặt lại bộ lọc */}
              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleReset}
                  className="h-auto px-3 py-1.5 rounded-full text-sm font-semibold text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors inline-flex items-center gap-1.5 shrink-0 ml-1 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <Text as="span">{PLOTS_FILTER_MESSAGES.RESET_BUTTON}</Text>
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── 3. TIÊU ĐỀ DANH MỤC CÂN ĐỐI (MT-7 MB-4) ── */}
      <Box className="mt-7 mb-4 flex flex-row items-end justify-between gap-3">
        <Box className="space-y-1.5">
          <Badge
            variant="outline"
            className="gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-primary/10 text-primary border-primary/20"
          >
            <Sparkles className="h-3 w-3" />
            {PLOTS_FILTER_MESSAGES.SECTION_BADGE}
          </Badge>
          <Heading
            as="h2"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
          >
            {PLOTS_FILTER_MESSAGES.SECTION_TITLE}
          </Heading>
        </Box>

        {/* Cột phải: Bộ đếm kết quả trực quan dạng Badge / Box */}
        <Box className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-card border border-border shadow-2xs text-sm font-medium text-muted-foreground shrink-0 self-end">
          <Text as="span">{PLOTS_FILTER_MESSAGES.DISPLAY_LABEL}</Text>
          <Text as="span" className="text-primary font-bold">
            {resolvedFiltered}
          </Text>
          <Text as="span">/</Text>
          <Text as="span" className="font-bold text-foreground">
            {resolvedTotal}
          </Text>
          <Text as="span">{PLOTS_FILTER_MESSAGES.MATCHING_PLOTS_SUFFIX}</Text>
        </Box>
      </Box>
    </Box>
  );
}
