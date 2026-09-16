import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui";

export interface PlotsFilterSkeletonProps {
  className?: string;
}

export function PlotsFilterSkeleton({ className }: PlotsFilterSkeletonProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-border/60 bg-card p-4 sm:p-5 shadow-xs space-y-4 animate-pulse",
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <Skeleton className="h-10 w-full sm:max-w-md rounded-xl bg-muted/70" />

        <div className="flex items-center gap-2 shrink-0">
          <Skeleton className="h-10 w-32 rounded-xl bg-muted/60" />
          <Skeleton className="h-10 w-28 rounded-xl bg-muted/50" />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40">
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-8 w-24 rounded-full bg-muted/70" />
          <Skeleton className="h-8 w-28 rounded-full bg-muted/60" />
          <Skeleton className="h-8 w-32 rounded-full bg-muted/60" />
          <Skeleton className="h-8 w-24 rounded-full bg-muted/50" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24 rounded-lg bg-muted/50" />
          <Skeleton className="h-8 w-20 rounded-lg bg-muted/50" />
        </div>
      </div>
    </div>
  );
}
