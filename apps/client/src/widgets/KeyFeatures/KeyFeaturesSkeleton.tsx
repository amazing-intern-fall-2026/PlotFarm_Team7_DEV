import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui";

export interface KeyFeaturesSkeletonProps {
  className?: string;
}

export function KeyFeaturesSkeleton({ className }: KeyFeaturesSkeletonProps) {
  return (
    <section className={cn("w-full py-12 animate-pulse", className)} aria-hidden="true">
      {/* Centered Header */}
      <div className="text-center space-y-3.5 max-w-2xl mx-auto px-4 mb-10 flex flex-col items-center">
        <Skeleton className="h-6 w-36 rounded-full bg-secondary/20" />
        <Skeleton className="h-9 sm:h-11 w-4/5 rounded-xl bg-muted/80" />
        <Skeleton className="h-4 sm:h-5 w-3/5 rounded-md bg-muted/50" />
      </div>

      {/* 3 Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4 max-w-7xl mx-auto">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-12 w-12 rounded-2xl bg-muted/70" />
                <Skeleton className="h-5 w-20 rounded-full bg-muted/40" />
              </div>

              <Skeleton className="h-7 w-3/4 rounded-lg bg-muted/80" />
              <Skeleton className="h-4 w-full rounded bg-muted/50" />
              <Skeleton className="h-4 w-5/6 rounded bg-muted/40" />

              {/* Feature Points */}
              <div className="space-y-2.5 pt-4 border-t border-border/40">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full bg-muted/60" />
                  <Skeleton className="h-4 w-4/5 rounded bg-muted/50" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full bg-muted/60" />
                  <Skeleton className="h-4 w-3/4 rounded bg-muted/50" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full bg-muted/60" />
                  <Skeleton className="h-4 w-2/3 rounded bg-muted/50" />
                </div>
              </div>
            </div>

            <Skeleton className="h-10 w-full rounded-xl bg-muted/60" />
          </div>
        ))}
      </div>
    </section>
  );
}
