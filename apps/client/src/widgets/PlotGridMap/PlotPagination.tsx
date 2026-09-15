import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
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

  /** Tính danh sách page items với ellipsis smart logic */
  function getPageItems(): (number | "ellipsis-start" | "ellipsis-end")[] {
    const delta = 2; // số trang hiển thị xung quanh trang hiện tại
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    const range: number[] = [];
    for (let i = rangeStart; i <= rangeEnd; i++) {
      range.push(i);
    }

    const items: (number | "ellipsis-start" | "ellipsis-end")[] = [];

    // Trang đầu luôn hiển thị
    items.push(1);

    // Ellipsis trái
    if (rangeStart > 2) {
      items.push("ellipsis-start");
    }

    items.push(...range);

    // Ellipsis phải
    if (rangeEnd < totalPages - 1) {
      items.push("ellipsis-end");
    }

    // Trang cuối luôn hiển thị
    if (totalPages > 1) {
      items.push(totalPages);
    }

    return items;
  }

  const pageItems = getPageItems();

  return (
    <Box
      className={cn(
        "mt-8 pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4",
        className,
      )}
    >
      {/* Summary text */}
      <Text variant="body2" className="text-xs sm:text-sm text-muted-foreground order-2 sm:order-1">
        Hiển thị{" "}
        <Text as="span" className="font-semibold text-foreground">
          {startItem} – {endItem}
        </Text>{" "}
        trên tổng số{" "}
        <Text as="span" className="font-bold text-primary">
          {totalItems}
        </Text>{" "}
        ô đất
      </Text>

      {/* Page buttons */}
      <Flex align="center" className="gap-1 order-1 sm:order-2 flex-wrap justify-center">
        {/* Nút Trước */}
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

        {/* Số trang + ellipsis */}
        {pageItems.map((item, idx) => {
          if (item === "ellipsis-start" || item === "ellipsis-end") {
            return (
              <Box
                key={`${item}-${idx}`}
                className="h-9 w-9 flex items-center justify-center text-muted-foreground select-none"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Box>
            );
          }

          const isActive = item === currentPage;
          return (
            <Button
              key={item}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageSelect(item)}
              className={cn(
                "h-9 w-9 p-0 rounded-lg text-xs font-bold transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs pointer-events-none"
                  : "border-border text-foreground hover:bg-muted/60",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {item}
            </Button>
          );
        })}

        {/* Nút Sau */}
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
