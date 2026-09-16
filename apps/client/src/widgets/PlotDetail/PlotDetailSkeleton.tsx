import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui";

export interface PlotDetailSkeletonProps {
  className?: string;
}

export function PlotDetailSkeleton({ className }: PlotDetailSkeletonProps) {
  return (
    <div
      className={cn(
        "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse",
        className,
      )}
      aria-hidden="true"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl border border-border/60 bg-card overflow-hidden shadow-xs space-y-6">
            <Skeleton className="w-full h-64 sm:h-80 rounded-none bg-muted/60" />
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-7 w-32 rounded-full bg-emerald-600/20" />
                <Skeleton className="h-6 w-24 rounded-md bg-muted/60" />
              </div>
              <Skeleton className="h-8 sm:h-10 w-2/3 rounded-xl bg-muted/80" />
              <Skeleton className="h-4 w-full rounded-md bg-muted/50" />
              <Skeleton className="h-4 w-4/5 rounded-md bg-muted/40" />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/40">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-3 rounded-xl bg-muted/30 space-y-2">
                    <Skeleton className="h-4 w-12 rounded bg-muted/50" />
                    <Skeleton className="h-6 w-16 rounded bg-muted/70" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 space-y-6 shadow-xs">
            <Skeleton className="h-7 w-48 rounded-lg bg-muted/80" />
            <div className="space-y-4 pl-4 border-l-2 border-border/50">
              {[1, 2, 3].map((step) => (
                <div key={step} className="space-y-2 relative">
                  <div className="absolute -left-[23px] top-1.5 h-3.5 w-3.5 rounded-full bg-muted/70" />
                  <Skeleton className="h-5 w-40 rounded bg-muted/70" />
                  <Skeleton className="h-4 w-3/4 rounded bg-muted/50" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full bg-muted/70" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-44 rounded-lg bg-muted/80" />
                <Skeleton className="h-4 w-32 rounded bg-muted/50" />
              </div>
              <Skeleton className="h-9 w-28 rounded-xl bg-muted/60 hidden sm:block" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 space-y-6 shadow-md">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-24 rounded bg-muted/50" />
              <Skeleton className="h-8 w-32 rounded-lg bg-emerald-600/20" />
            </div>

            <div className="space-y-3 pt-4 border-t border-border/40">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-28 rounded bg-muted/50" />
                <Skeleton className="h-4 w-20 rounded bg-muted/60" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32 rounded bg-muted/50" />
                <Skeleton className="h-4 w-16 rounded bg-muted/60" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24 rounded bg-muted/50" />
                <Skeleton className="h-4 w-20 rounded bg-muted/60" />
              </div>
            </div>

            <div className="pt-4 border-t border-border/40 space-y-2">
              <div className="flex justify-between items-baseline">
                <Skeleton className="h-5 w-24 rounded bg-muted/70" />
                <Skeleton className="h-7 w-36 rounded-lg bg-muted/80" />
              </div>
            </div>

            <Skeleton className="h-12 w-full rounded-2xl bg-emerald-600/30" />
            <Skeleton className="h-4 w-3/4 mx-auto rounded bg-muted/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
