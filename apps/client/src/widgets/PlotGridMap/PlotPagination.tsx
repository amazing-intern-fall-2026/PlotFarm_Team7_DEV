import { ChevronLeft, ChevronRight } from "lucide-react";
import { Box, Flex, Button, Text } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

export interface PlotPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function PlotPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  className,
}: PlotPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const handlePageSelect = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);

    const gridEl = document.getElementById("plot-grid-section");
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box
      className={cn(
        "mt-8 pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4",
        className,
      )}
    >
      <Text variant="body2" className="text-xs sm:text-sm text-muted-foreground order-2 sm:order-1">
        Hiển thị{" "}
        <Text as="span" className="font-semibold text-foreground">
          {startItem} - {endItem}
        </Text>{" "}
        trên tổng số{" "}
        <Text as="span" className="font-bold text-primary">
          {totalItems}
        </Text>{" "}
        ô đất
      </Text>

      <Flex align="center" className="gap-1.5 order-1 sm:order-2">
        <Button

          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => handlePageSelect(currentPage - 1)}
          className="h-9 px-2.5 rounded-lg border-border text-foreground hover:bg-muted/60 disabled:opacity-40"
          aria-label="Trang trước"
          leftIcon={<ChevronLeft className="w-4 h-4" />}
        >
          <Text as="span" className="hidden sm:inline text-xs font-medium">
            Trước
          </Text>
        </Button>

        {/* Các nút số trang */}
        {pageNumbers.map((pageNum) => {
          const isActive = pageNum === currentPage;
          return (
            <Button
              key={pageNum}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageSelect(pageNum)}
              className={cn(
                "h-9 w-9 p-0 rounded-lg text-xs font-bold transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs pointer-events-none"
                  : "border-border text-foreground hover:bg-muted/60",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNum}
            </Button>
          );
        })}

        {/* Nút sang trang */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageSelect(currentPage + 1)}
          className="h-9 px-2.5 rounded-lg border-border text-foreground hover:bg-muted/60 disabled:opacity-40"
          aria-label="Trang sau"
          rightIcon={<ChevronRight className="w-4 h-4" />}
        >
          <Text as="span" className="hidden sm:inline text-xs font-medium">
            Sau
          </Text>
        </Button>
      </Flex>
    </Box>
  );
}
