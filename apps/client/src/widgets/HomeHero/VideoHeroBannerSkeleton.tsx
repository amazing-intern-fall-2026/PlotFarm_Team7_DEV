import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui";

export interface VideoHeroBannerSkeletonProps {
  className?: string;
}

export function VideoHeroBannerSkeleton({ className }: VideoHeroBannerSkeletonProps) {
  return (
    <div
      className={cn(
        "relative w-full h-[420px] sm:h-[500px] lg:h-[620px] rounded-3xl overflow-hidden bg-muted/40 border border-border/40 animate-pulse flex flex-col justify-between p-6 sm:p-10 lg:p-14",
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex items-center gap-3">
        <Skeleton className="h-7 w-28 rounded-full bg-muted/70" />
        <Skeleton className="h-7 w-36 rounded-full bg-muted/50 hidden sm:block" />
      </div>

      <div className="max-w-2xl space-y-4">
        <Skeleton className="h-10 sm:h-14 w-4/5 rounded-xl bg-muted/80" />
        <Skeleton className="h-10 sm:h-14 w-3/5 rounded-xl bg-muted/80" />
        <Skeleton className="h-4 sm:h-5 w-full max-w-lg rounded-md bg-muted/60" />
        <Skeleton className="h-4 sm:h-5 w-3/4 max-w-md rounded-md bg-muted/50" />

        <div className="flex flex-wrap items-center gap-3 pt-4">
          <Skeleton className="h-12 w-44 rounded-xl bg-emerald-600/30" />
          <Skeleton className="h-12 w-36 rounded-xl bg-muted/70" />
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 pt-4">
        <div className="flex gap-2">
          <Skeleton className="h-2 w-10 rounded-full bg-muted/80" />
          <Skeleton className="h-2 w-6 rounded-full bg-muted/50" />
          <Skeleton className="h-2 w-6 rounded-full bg-muted/50" />
        </div>
        <Skeleton className="h-16 w-56 rounded-2xl bg-muted/60 hidden md:block" />
      </div>
    </div>
  );
}
