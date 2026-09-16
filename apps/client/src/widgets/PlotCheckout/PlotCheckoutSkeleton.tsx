import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui";

export interface PlotCheckoutSkeletonProps {
  className?: string;
}

export function PlotCheckoutSkeleton({ className }: PlotCheckoutSkeletonProps) {
  return (
    <div
      className={cn(
        "w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-pulse",
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl bg-muted/70" />
          <div className="space-y-1.5">
            <Skeleton className="h-6 w-48 rounded-md bg-muted/80" />
            <Skeleton className="h-4 w-32 rounded bg-muted/50" />
          </div>
        </div>
        <Skeleton className="h-9 w-40 rounded-full bg-amber-500/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 rounded-3xl border border-border/60 bg-card p-6 sm:p-8 space-y-6 shadow-xs flex flex-col items-center">
          <Skeleton className="h-10 w-72 rounded-full bg-amber-500/20" />

          <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 w-64 h-64 flex items-center justify-center">
            <Skeleton className="w-56 h-56 rounded-xl bg-muted/80" />
          </div>

          <Skeleton className="h-4 w-52 rounded bg-muted/50" />

          <div className="w-full space-y-3 pt-4 border-t border-border/40">
            {[1, 2, 3, 4].map((row) => (
              <div key={row} className="flex justify-between items-center py-1">
                <Skeleton className="h-4 w-28 rounded bg-muted/50" />
                <Skeleton className="h-4 w-36 rounded bg-muted/70" />
              </div>
            ))}
          </div>

          <Skeleton className="h-12 w-full rounded-2xl bg-emerald-600/30" />
        </div>

        <div className="lg:col-span-5 rounded-3xl border border-border/60 bg-card p-6 sm:p-8 space-y-6 shadow-xs">
          <Skeleton className="h-6 w-40 rounded-lg bg-muted/80" />

          <div className="flex gap-4 items-center">
            <Skeleton className="h-20 w-20 rounded-2xl bg-muted/60 shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-36 rounded bg-muted/80" />
              <Skeleton className="h-4 w-24 rounded bg-muted/50" />
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border/40">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24 rounded bg-muted/50" />
              <Skeleton className="h-4 w-28 rounded bg-muted/60" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20 rounded bg-muted/50" />
              <Skeleton className="h-4 w-24 rounded bg-muted/60" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-28 rounded bg-muted/50" />
              <Skeleton className="h-4 w-20 rounded bg-muted/60" />
            </div>
          </div>

          <div className="pt-4 border-t border-border/40 flex justify-between items-baseline">
            <Skeleton className="h-5 w-24 rounded bg-muted/70" />
            <Skeleton className="h-7 w-36 rounded-lg bg-muted/80" />
          </div>

          <Skeleton className="h-14 w-full rounded-2xl bg-muted/40" />
        </div>
      </div>

      <div className="pt-6 border-t border-border/40 flex flex-wrap justify-around gap-4">
        {[1, 2, 3, 4].map((badge) => (
          <div key={badge} className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full bg-muted/60" />
            <Skeleton className="h-4 w-28 rounded bg-muted/50" />
          </div>
        ))}
      </div>
    </div>
  );
}
