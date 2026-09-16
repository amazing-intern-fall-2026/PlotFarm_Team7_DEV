import {
  Search,
  ArrowUpDown,
  RotateCcw,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Box, Button, Heading, Text, Badge, Input } from "@/shared/ui";
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
      <Box className="pt-2 sm:pt-4 relative z-20 w-full">
        <Box className="bg-white/95 dark:bg-card/95 backdrop-blur-md rounded-2xl shadow-lg shadow-emerald-950/5 border border-slate-200/80 dark:border-border/80 p-5 sm:p-6 transition-all space-y-4">
          
          <Box className="flex items-center gap-3">
            <Box className="flex-1">
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={PLOTS_FILTER_MESSAGES.SEARCH_PLACEHOLDER}
                leftIcon={<Search className="h-4 w-4 text-muted-foreground" />}
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
                className="h-12 rounded-xl bg-slate-50/90 dark:bg-muted/40 border-slate-200/80 dark:border-border text-sm sm:text-base font-medium"
              />
            </Box>

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

          <Box className="flex items-center justify-between gap-3.5 pt-3.5 border-t border-slate-100 dark:border-border/40">
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
                    {chip.label}
                  </Button>
                );
              })}

              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleReset}
                  className="h-auto px-3 py-1.5 rounded-full text-sm font-semibold text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors inline-flex items-center gap-1.5 shrink-0 ml-1 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {PLOTS_FILTER_MESSAGES.RESET_BUTTON}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

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
