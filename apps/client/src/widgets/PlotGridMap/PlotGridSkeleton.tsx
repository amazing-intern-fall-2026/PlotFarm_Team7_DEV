import { Box, Skeleton } from "@/shared/ui";

export function PlotGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-xs"
        >
          <Skeleton className="w-full h-44 sm:h-48 rounded-none" />

          <Box className="p-4 sm:p-5 space-y-3.5">
            <Box className="space-y-2">
              <Skeleton className="h-5 w-3/4 rounded-md" />
              <Skeleton className="h-3.5 w-1/2 rounded-md" />
            </Box>

            <Box className="flex justify-between items-center pt-2 border-t border-border/40">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-24 rounded-md" />
            </Box>

            <Box className="pt-3 border-t border-border/40 space-y-2.5">
              <Box className="flex justify-between items-center">
                <Skeleton className="h-3.5 w-16 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md" />
              </Box>
              <Skeleton className="h-10 w-full rounded-xl" />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
