import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui";

export interface PlotsExploreHeroSkeletonProps {
  className?: string;
}

export function PlotsExploreHeroSkeleton({ className }: PlotsExploreHeroSkeletonProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden pt-8 lg:pt-12 pb-16 lg:pb-24 animate-pulse",
        className,
      )}
      aria-hidden="true"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4">
            <Skeleton className="h-7 w-36 rounded-full bg-emerald-600/20" />
            <Skeleton className="h-10 sm:h-14 w-full rounded-xl bg-muted/80" />
            <Skeleton className="h-10 sm:h-14 w-4/5 rounded-xl bg-muted/80" />
            <Skeleton className="h-4 sm:h-5 w-3/4 rounded-md bg-muted/50" />
            <Skeleton className="h-4 sm:h-5 w-1/2 rounded-md bg-muted/40" />

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Skeleton className="h-12 w-44 rounded-xl bg-emerald-600/30" />
              <Skeleton className="h-12 w-40 rounded-xl bg-muted/70" />
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-border/40 w-full">
              <div className="flex -space-x-2">
                <Skeleton className="h-9 w-9 rounded-full bg-muted/70" />
                <Skeleton className="h-9 w-9 rounded-full bg-muted/60" />
                <Skeleton className="h-9 w-9 rounded-full bg-muted/50" />
              </div>
              <Skeleton className="h-4 w-48 rounded bg-muted/50" />
            </div>
          </div>

          {/* Right Column Camera Card Skeleton */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-3xl border border-border/60 bg-muted/40 p-4 space-y-4 shadow-xl">
              <Skeleton className="w-full aspect-video rounded-2xl bg-muted/70" />
              <div className="flex items-center justify-between px-2">
                <Skeleton className="h-4 w-28 rounded bg-muted/60" />
                <Skeleton className="h-4 w-20 rounded bg-muted/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
