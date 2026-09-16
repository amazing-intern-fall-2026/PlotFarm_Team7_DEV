import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui";

export interface HomeCtaBannerSkeletonProps {
  className?: string;
}

export function HomeCtaBannerSkeleton({ className }: HomeCtaBannerSkeletonProps) {
  return (
    <section className={cn("w-full py-6 animate-pulse", className)} aria-hidden="true">
      <div className="relative overflow-hidden rounded-3xl bg-muted/40 border border-border/40 p-8 md:p-10 lg:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-3.5">
          <Skeleton className="h-6 w-32 rounded-full bg-emerald-600/20" />
          <Skeleton className="h-8 sm:h-10 w-4/5 rounded-xl bg-muted/80" />
          <Skeleton className="h-4 sm:h-5 w-3/5 rounded-md bg-muted/50" />
        </div>

        <Skeleton className="h-12 w-48 rounded-xl bg-muted/70 shrink-0" />
      </div>
    </section>
  );
}
