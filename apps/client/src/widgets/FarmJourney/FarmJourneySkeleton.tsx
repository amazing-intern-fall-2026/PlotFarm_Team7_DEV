import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui";

export interface FarmJourneySkeletonProps {
  className?: string;
}

export function FarmJourneySkeleton({ className }: FarmJourneySkeletonProps) {
  return (
    <section className={cn("w-full space-y-7 py-8 animate-pulse", className)} aria-hidden="true">
      {/* Centered Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto px-4 flex flex-col items-center">
        <Skeleton className="h-4 w-28 rounded-full bg-muted/60" />
        <Skeleton className="h-9 sm:h-11 w-4/5 rounded-xl bg-muted/80" />
        <Skeleton className="h-4 sm:h-5 w-3/5 rounded-md bg-muted/50" />
      </div>

      {/* 4 Step Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className="h-full rounded-2xl border border-border/60 bg-card p-6 flex flex-col justify-between space-y-6 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-12 rounded-lg bg-muted/40" />
              <Skeleton className="h-10 w-10 rounded-xl bg-muted/60" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-6 w-3/4 rounded-lg bg-muted/80" />
              <Skeleton className="h-4 w-full rounded bg-muted/50" />
              <Skeleton className="h-4 w-5/6 rounded bg-muted/40" />
            </div>

            <Skeleton className="h-1 w-full rounded-full bg-muted/30" />
          </div>
        ))}
      </div>
    </section>
  );
}
