import { Box, Skeleton } from "@/shared/ui";

export function PlotGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          className="rounded-2xl border border-border/60 bg-card p-5 space-y-4 shadow-xs"
        >
          {/* Top row */}
          <Box className="flex items-center justify-between">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </Box>

          {/* Title & subtitle */}
          <Box className="space-y-2">
            <Skeleton className="h-5 w-3/4 rounded-md" />
            <Skeleton className="h-3.5 w-1/2 rounded-md" />
          </Box>

          {/* Details */}
          <Box className="grid grid-cols-2 gap-2 pt-2 border-t border-border/40">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-12 rounded-md justify-self-end" />
          </Box>

          <Skeleton className="h-3.5 w-4/5 rounded-md" />

          {/* Button & price */}
          <Box className="pt-3 border-t border-border/40 space-y-2.5">
            <Box className="flex justify-between items-center">
              <Skeleton className="h-3 w-16 rounded-md" />
              <Skeleton className="h-4 w-24 rounded-md" />
            </Box>
            <Skeleton className="h-9 w-full rounded-lg" />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
