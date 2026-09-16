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
import { Box, Button, Heading, Text, Badge, Input } from "@/shared/ui";
import { PLOTS_FILTER_MESSAGES, PLOTS_FILTER_SORT_OPTIONS } from "./constants";
import type { FarmPlotFilterViewProps } from "./types";

export function FarmPlotFilterMobile({
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
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = React.useState<boolean>(false);

  return (
    <Box className={cn("w-full transition-all", className)}>
      {/* ── Khối tìm kiếm Mobile ── */}
      <Box className="pt-2 relative z-20 w-full">
        <Box className="bg-white/95 dark:bg-card/95 backdrop-blur-md rounded-2xl shadow-md border border-slate-200/80 dark:border-border/80 p-4 transition-all space-y-3">
          
          {/* Hàng 1: Search Input + Toggle Filter Button */}
          <Box className="flex items-center gap-2">
            <Box className="flex-1 min-w-0">
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={PLOTS_FILTER_MESSAGES.SEARCH_PLACEHOLDER}
                leftIcon={<Search className="h-4 w-4 text-muted-foreground shrink-0" />}
                rightIcon={
                  searchTerm ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSearchChange("")}
                      className="h-6 w-6 p-0 rounded-full text-muted-foreground hover:text-foreground"
                      aria-label={PLOTS_FILTER_MESSAGES.CLEAR_SEARCH_ARIA}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  ) : undefined
                }
                className="h-11 rounded-xl bg-slate-50/90 dark:bg-muted/40 border-slate-200/80 dark:border-border text-xs sm:text-sm font-medium"
              />
            </Box>

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsFilterDrawerOpen((prev) => !prev)}
              className="flex items-center justify-center gap-1.5 h-11 bg-slate-50 dark:bg-muted/40 hover:bg-slate-100 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-foreground shrink-0 cursor-pointer"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
              {PLOTS_FILTER_MESSAGES.MOBILE_FILTER_BUTTON}
              {hasActiveFilters && (
                <Box className="h-2 w-2 rounded-full bg-primary animate-pulse inline-block" />
              )}
            </Button>
          </Box>

          {/* Status Chips trên Mobile: Tự động xuống dòng flex-wrap, KHÔNG bị kéo ngang */}
          <Box className="flex flex-wrap items-center gap-1.5 py-0.5">
            {statusChips.map((chip) => {
              const isActive = selectedStatus === chip.id;
              return (
                <Button
                  key={chip.id}
                  type="button"
                  variant="outline"
                  onClick={() => handleStatusChange(chip.id)}
                  className={cn(
                    "h-8 px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 border transition-all cursor-pointer select-none",
                    isActive
                      ? chip.activeStyle
                      : "bg-slate-50 dark:bg-muted/20 hover:bg-slate-100 dark:hover:bg-muted/50 border-slate-200/80 dark:border-border/60 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Box className={cn("h-1.5 w-1.5 rounded-full shrink-0 inline-block", chip.dotColor)} />
                  {chip.label}
                </Button>
              );
            })}
          </Box>

          {/* Khu vực mở rộng khi bấm 'Lọc chi tiết' */}
          {isFilterDrawerOpen && (
            <Box className="pt-3 border-t border-slate-100 dark:border-border/40 space-y-3 animate-in fade-in-50 duration-200">
              {/* Sắp xếp trên Mobile */}
              <Box className="flex items-center justify-between gap-2">
                <Text as="span" className="text-xs font-semibold text-muted-foreground">
                  {PLOTS_FILTER_MESSAGES.SORT_LABEL}
                </Text>
                <Box className="relative flex-1 max-w-[200px]">
                  <Box className="flex items-center gap-1.5 h-9 bg-slate-50 dark:bg-muted/40 px-3 rounded-lg border border-slate-200 text-xs font-medium text-foreground">
                    <ArrowUpDown className="h-3 w-3 text-primary shrink-0" />
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      aria-label={PLOTS_FILTER_MESSAGES.SORT_ARIA}
                      className="appearance-none bg-transparent text-xs font-semibold text-foreground focus:outline-none cursor-pointer pr-4 w-full"
                    >
                      {PLOTS_FILTER_SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="h-3 w-3 text-muted-foreground pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
                  </Box>
                </Box>
              </Box>

              {/* Lựa chọn diện tích: Dùng flex-wrap không bị cuộn ngang */}
              <Box className="flex flex-wrap items-center gap-1.5 py-0.5">
                {sizeOptions.map((opt) => {
                  const isActive = selectedSize === opt.value;
                  return (
                    <Button
                      key={opt.value}
                      type="button"
                      variant={isActive ? "default" : "ghost"}
                      onClick={() => handleSizeChange(opt.value)}
                      className={cn(
                        "h-auto px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all select-none cursor-pointer shrink-0",
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

              {/* Nút đặt lại */}
              {hasActiveFilters && (
                <Box className="flex justify-end pt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="h-8 px-3 rounded-lg text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" />
                    {PLOTS_FILTER_MESSAGES.RESET_BUTTON}
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* ── 3. TIÊU ĐỀ DANH MỤC MOBILE ── */}
      <Box className="mt-5 mb-3 space-y-2">
        <Box className="flex items-center justify-between gap-2">
          <Badge
            variant="outline"
            className="gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-primary/10 text-primary border-primary/20"
          >
            <Sparkles className="h-2.5 w-2.5" />
            {PLOTS_FILTER_MESSAGES.SECTION_BADGE}
          </Badge>

          {/* Bộ đếm kết quả mobile */}
          <Box className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-card border border-border shadow-2xs text-xs font-medium text-muted-foreground">
            <Text as="span">{PLOTS_FILTER_MESSAGES.DISPLAY_LABEL}</Text>
            <Text as="span" className="text-primary font-bold">
              {resolvedFiltered}
            </Text>
            <Text as="span">/</Text>
            <Text as="span" className="font-bold text-foreground">
              {resolvedTotal}
            </Text>
          </Box>
        </Box>

        <Heading
          as="h2"
          className="text-xl font-bold tracking-tight text-foreground"
        >
          {PLOTS_FILTER_MESSAGES.SECTION_TITLE}
        </Heading>
      </Box>
    </Box>
  );
}
