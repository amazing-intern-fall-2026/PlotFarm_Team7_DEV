import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui";

export interface CommitmentsSkeletonProps {
  className?: string;
}

export function CommitmentsSkeleton({ className }: CommitmentsSkeletonProps) {
  return (
    <section className={cn("w-full py-12 animate-pulse", className)} aria-hidden="true">
      <div className="text-center space-y-3 max-w-2xl mx-auto px-4 mb-10 flex flex-col items-center">
        <Skeleton className="h-6 w-36 rounded-full bg-emerald-600/20" />
        <Skeleton className="h-8 sm:h-10 w-4/5 rounded-xl bg-muted/80" />
        <Skeleton className="h-4 sm:h-5 w-3/5 rounded-md bg-muted/50" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto mb-10">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-border/60 bg-card p-6 flex flex-col justify-between space-y-5 shadow-xs"
          >
            <div className="space-y-4">
              <Skeleton className="h-12 w-12 rounded-2xl bg-muted/70" />
              <Skeleton className="h-6 w-3/4 rounded-lg bg-muted/80" />
              <Skeleton className="h-4 w-full rounded bg-muted/50" />
              <Skeleton className="h-4 w-5/6 rounded bg-muted/40" />
            </div>

            <div className="space-y-2 pt-3 border-t border-border/40">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5 rounded-full bg-muted/60" />
                <Skeleton className="h-3.5 w-3/4 rounded bg-muted/50" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5 rounded-full bg-muted/60" />
                <Skeleton className="h-3.5 w-2/3 rounded bg-muted/50" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl border border-border/40 bg-muted/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-2xl bg-muted/60" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-48 rounded bg-muted/70" />
              <Skeleton className="h-4 w-64 rounded bg-muted/50" />
            </div>
          </div>
          <Skeleton className="h-10 w-36 rounded-xl bg-muted/70 shrink-0" />
        </div>
      </div>
    </section>
  );
}
