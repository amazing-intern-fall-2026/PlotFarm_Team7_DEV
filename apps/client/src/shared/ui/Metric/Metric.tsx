import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const metricVariants = cva(
  "relative overflow-hidden rounded-2xl border bg-card p-5 text-card-foreground shadow-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-border hover:border-border/80 hover:shadow-md",
        success: "border-emerald-200 bg-emerald-50/30 hover:border-emerald-300 dark:border-emerald-900 dark:bg-emerald-950/20",
        warning: "border-amber-200 bg-amber-50/40 hover:border-amber-300 dark:border-amber-900 dark:bg-amber-950/20",
        danger: "border-rose-200 bg-rose-50/40 hover:border-rose-300 dark:border-rose-900 dark:bg-rose-950/20",
        info: "border-sky-200 bg-sky-50/30 hover:border-sky-300 dark:border-sky-900 dark:bg-sky-950/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const iconWrapperVariants = cva(
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary",
        success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300",
        warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300",
        danger: "bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300",
        info: "bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface MetricProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricVariants> {
  title: string;
  value: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  progress?: {
    current: number;
    total?: number;
    color?: string;
  };
  actionText?: string;
  onActionClick?: () => void;
}

export type MetricCardProps = MetricProps;

export const Metric = React.forwardRef<HTMLDivElement, MetricProps>(
  (
    {
      className,
      variant = "default",
      title,
      value,
      subtitle,
      icon,
      trend,
      progress,
      actionText,
      onActionClick,
      onClick,
      ...props
    },
    ref,
  ) => {
    const isInteractive = Boolean(onClick || onActionClick);

    return (
      <div
        ref={ref}
        className={cn(
          metricVariants({ variant }),
          isInteractive && "cursor-pointer active:scale-[0.99]",
          className,
        )}
        onClick={onClick}
        {...props}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">{title}</p>
            <div className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {value}
            </div>
          </div>
          {icon && (
            <div className={iconWrapperVariants({ variant })}>{icon}</div>
          )}
        </div>

        {/* Trend / Subtitle / Progress */}
        <div className="mt-3 space-y-2">
          {progress && (
            <div className="w-full space-y-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    progress.color || "bg-primary",
                  )}
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        progress.total
                          ? (progress.current / progress.total) * 100
                          : progress.current,
                      ),
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            {trend && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 font-semibold",
                  trend.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
                )}
              >
                <span>{trend.isPositive ? "↑" : "↓"}</span>
                <span>{trend.value}</span>
                {trend.label && (
                  <span className="font-normal text-muted-foreground">
                    {trend.label}
                  </span>
                )}
              </span>
            )}

            {subtitle && (
              <span className="text-muted-foreground">{subtitle}</span>
            )}

            {actionText && (
              <button
                type="button"
                className="ml-auto font-medium text-primary hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  onActionClick?.();
                }}
              >
                {actionText} →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
);

Metric.displayName = "Metric";

export { Metric as MetricCard };
