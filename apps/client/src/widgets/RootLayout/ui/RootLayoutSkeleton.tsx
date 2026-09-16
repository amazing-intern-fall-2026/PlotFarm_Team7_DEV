import { cn } from "@/shared/lib/utils";

export interface RootLayoutSkeletonProps {
  className?: string;
}

export function RootLayoutSkeleton({ className }: RootLayoutSkeletonProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full flex-col bg-background animate-pulse",
        className,
      )}
      aria-hidden="true"
    >
      {/* Top Header/Topbar skeleton */}
      <div className="h-16 w-full border-b border-border/40 bg-muted/30 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-8 w-28 rounded-md bg-muted" />
          <div className="hidden md:flex gap-3">
            <div className="h-4 w-16 rounded bg-muted/70" />
            <div className="h-4 w-20 rounded bg-muted/70" />
            <div className="h-4 w-16 rounded bg-muted/70" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-muted" />
          <div className="h-8 w-24 rounded-md bg-muted" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 space-y-4">
        <div className="h-8 w-1/3 rounded-lg bg-muted" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="h-48 rounded-xl bg-muted/60" />
          <div className="h-48 rounded-xl bg-muted/60" />
          <div className="h-48 rounded-xl bg-muted/60" />
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar Skeleton */}
      <div className="h-16 w-full border-t border-border/40 bg-muted/30 lg:hidden flex items-center justify-around px-4">
        <div className="h-6 w-6 rounded bg-muted" />
        <div className="h-6 w-6 rounded bg-muted" />
        <div className="h-6 w-6 rounded bg-muted" />
        <div className="h-6 w-6 rounded bg-muted" />
      </div>
    </div>
  );
}
