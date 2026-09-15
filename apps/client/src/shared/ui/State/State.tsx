import * as React from "react";
import {
  Loader2,
  AlertCircle,
  Inbox,
  SearchX,
  BellOff,
  Sprout,
  RefreshCw
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "../Button";
import { Skeleton } from "../Skeleton";

export type AsyncStateType = "idle" | "loading" | "fetching" | "empty" | "error" | "success";
export type StateVariant = "full-page" | "card" | "inline" | "skeleton";
export type StateViewVariant = StateVariant;
export type EmptyPreset = "general" | "search" | "notification" | "feed" | "plots" | "contracts";
export type SkeletonPreset = "lines" | "card" | "profile" | "table" | "grid";

export interface StateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Trạng thái hiện tại của UI */
  state?: AsyncStateType;
  /** Cờ loading trực tiếp (nếu dùng chung với boolean) */
  isLoading?: boolean;
  /** Cờ fetching ngầm (nền) khi đã có dữ liệu trước đó */
  isFetching?: boolean;
  /** Cờ dữ liệu rỗng */
  isEmpty?: boolean;
  /** Đối tượng lỗi hoặc thông điệp lỗi */
  error?: Error | string | null;
  /** Callback thử lại khi có lỗi */
  onRetry?: () => void;
  /** Nhãn nút bấm thử lại */
  retryLabel?: string;
  /** Tiêu đề hiển thị */
  title?: string;
  /** Mô tả chi tiết */
  description?: string;
  /** Icon tùy biến */
  icon?: React.ReactNode;
  /** Nút hành động CTA tùy biến */
  action?: React.ReactNode;
  /** Kiểu hiển thị (toàn trang, trong card, inline, hoặc skeleton) */
  variant?: StateVariant;
  /** Kiểu mẫu skeleton tái sử dụng: lines (mặc định), card, profile, table, grid */
  skeletonPreset?: SkeletonPreset;
  /** Số dòng hoặc số phần tử skeleton lặp lại */
  skeletonCount?: number;
  /** Số dòng skeleton hiển thị khi ở chế độ skeleton (tương thích ngược) */
  skeletonLines?: number;
  /** Slot truyền skeleton tùy biến hoàn toàn nếu không muốn dùng preset */
  skeleton?: React.ReactNode;
  /** Preset mẫu cho trạng thái rỗng */
  emptyPreset?: EmptyPreset;
  /** Nội dung component chính khi thành công */
  children?: React.ReactNode;
}

export type StateViewProps = StateProps;

const emptyPresets: Record<EmptyPreset, { icon: React.ReactNode; title: string; description: string }> = {
  general: {
    icon: <Inbox className="h-10 w-10 text-muted-foreground" />,
    title: "Chưa có dữ liệu",
    description: "Hiện chưa có thông tin nào để hiển thị trong mục này."
  },
  search: {
    icon: <SearchX className="h-10 w-10 text-muted-foreground" />,
    title: "Không tìm thấy kết quả",
    description: "Thử tìm kiếm với từ khóa khác như tên nông sản, khu vực hoặc tên nông dân."
  },
  notification: {
    icon: <BellOff className="h-10 w-10 text-muted-foreground" />,
    title: "Không có thông báo mới",
    description: "Bạn sẽ nhận được thông báo khi có cập nhật về nông vụ hoặc hợp đồng."
  },
  feed: {
    icon: <Sprout className="h-10 w-10 text-primary" />,
    title: "Chưa có nhật ký canh tác",
    description: "Kỹ thuật viên sẽ cập nhật nhật ký ngay khi quá trình chăm sóc bắt đầu."
  },
  plots: {
    icon: <Sprout className="h-10 w-10 text-primary" />,
    title: "Chưa có lô đất nào",
    description: "Khám phá danh sách trang trại và bắt đầu thuê lô đất đầu tiên của bạn!"
  },
  contracts: {
    icon: <Inbox className="h-10 w-10 text-muted-foreground" />,
    title: "Chưa có hợp đồng nào",
    description: "Hợp đồng thuê đất và chăm sóc cây trồng của bạn sẽ được lưu trữ tại đây."
  }
};

/**
 * Render bộ khung skeleton tái sử dụng chuẩn hóa theo preset
 */
function renderSkeletonPreset(preset: SkeletonPreset, count: number): React.ReactNode {
  switch (preset) {
    case "card":
      return (
        <div className="w-full rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-4/5" />
          </div>
          <Skeleton className="h-40 w-full rounded-xl" />
          <div className="flex items-center justify-between pt-2 border-t border-border/60">
            <div className="flex gap-2">
              <Skeleton className="h-7 w-20 rounded-lg" />
              <Skeleton className="h-7 w-20 rounded-lg" />
            </div>
            <Skeleton className="h-7 w-24 rounded-lg" />
          </div>
        </div>
      );

    case "profile":
      return (
        <div className="w-full rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
          <Skeleton className="h-28 w-full rounded-none" />
          <div className="p-5 space-y-4">
            <div className="flex justify-between items-end -mt-10">
              <Skeleton className="h-18 w-18 rounded-full ring-4 ring-card" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3.5 w-full max-w-sm" />
            </div>
            <div className="flex gap-4 pt-2 border-t border-border/50">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      );

    case "grid":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {Array.from({ length: count || 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-4 space-y-3">
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-7 w-20 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      );

    case "table":
      return (
        <div className="w-full rounded-2xl border border-border bg-card overflow-hidden">
          {/* Header row */}
          <div className="flex items-center gap-4 px-5 py-3.5 bg-muted/40 border-b border-border">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          {/* Data rows */}
          <div className="divide-y divide-border">
            {Array.from({ length: count || 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="flex items-center gap-3 w-1/4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-3.5 w-24" />
                </div>
                <Skeleton className="h-3.5 w-1/4" />
                <Skeleton className="h-3.5 w-1/4" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      );

    case "lines":
    default:
      return (
        <div className="space-y-3 w-full">
          <Skeleton className="h-6 w-1/3 rounded-lg" />
          {Array.from({ length: count || 3 }).map((_, i) => (
            <Skeleton
              key={i}
              className={cn(
                "h-4 rounded-md",
                i === (count || 3) - 1 ? "w-2/3" : "w-full"
              )}
            />
          ))}
        </div>
      );
  }
}

interface StateComponent extends React.FC<StateProps> {
  Skeleton: typeof Skeleton;
}

export const State: StateComponent = (({
  state,
  isLoading = false,
  isFetching = false,
  isEmpty = false,
  error = null,
  onRetry,
  retryLabel = "Thử lại",
  title,
  description,
  icon,
  action,
  variant = "card",
  skeletonPreset = "lines",
  skeletonCount,
  skeletonLines,
  skeleton,
  emptyPreset = "general",
  className,
  children,
  ...props
}: StateProps) => {
  // 1. Phân giải trạng thái hoạt động thực tế
  let resolvedState: AsyncStateType = "success";

  if (isLoading || state === "loading") {
    resolvedState = "loading";
  } else if (error || state === "error") {
    resolvedState = "error";
  } else if (isEmpty || state === "empty") {
    resolvedState = "empty";
  } else if (isFetching || state === "fetching") {
    resolvedState = "fetching";
  } else if (state === "idle") {
    resolvedState = "idle";
  }

  // 2. Class bọc theo variant
  const containerClasses = cn(
    "flex flex-col items-center justify-center text-center transition-all duration-200",
    variant === "full-page" && "min-h-[60vh] w-full p-8",
    variant === "card" && "rounded-2xl border border-dashed border-border bg-card/50 p-8 my-4",
    variant === "inline" && "py-6 px-4",
    className
  );

  // 3. Trạng thái SKELETON (Fetching / Loading State)
  if (variant === "skeleton" && (resolvedState === "loading" || isLoading || state === undefined)) {
    const effectiveCount = skeletonCount ?? skeletonLines ?? 3;

    return (
      <div className={cn("w-full py-4", className)} {...props}>
        {skeleton ? skeleton : renderSkeletonPreset(skeletonPreset, effectiveCount)}
      </div>
    );
  }

  // 4. Trạng thái LOADING (Spinner)
  if (resolvedState === "loading") {
    return (
      <div className={containerClasses} {...props}>
        <div className="relative flex items-center justify-center mb-4">
          <div className="h-12 w-12 rounded-full border-2 border-primary/20 animate-ping opacity-25" />
          <Loader2 className="h-8 w-8 animate-spin text-primary absolute" />
        </div>
        <h4 className="text-base font-semibold text-foreground">
          {title || "Đang tải dữ liệu..."}
        </h4>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          {description || "Hệ thống đang đồng bộ thông tin nông vụ thời gian thực."}
        </p>
      </div>
    );
  }

  // 5. Trạng thái ERROR
  if (resolvedState === "error") {
    const errorMessage =
      typeof error === "string"
        ? error
        : error instanceof Error
        ? error.message
        : "Không thể kết nối đến máy chủ IoT";

    return (
      <div className={cn(containerClasses, "border-destructive/30 bg-destructive/5")} {...props}>
        <div className="h-12 w-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mb-4">
          {icon || <AlertCircle className="h-6 w-6" />}
        </div>
        <h4 className="text-base font-semibold text-foreground">
          {title || "Đã xảy ra sự cố"}
        </h4>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          {description || errorMessage}
        </p>
        {(onRetry || action) && (
          <div className="mt-5 flex gap-2">
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="gap-2 border-destructive/30 hover:bg-destructive/10 text-destructive hover:text-destructive"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                {retryLabel}
              </Button>
            )}
            {action}
          </div>
        )}
      </div>
    );
  }

  // 6. Trạng thái EMPTY
  if (resolvedState === "empty") {
    const preset = emptyPresets[emptyPreset] || emptyPresets.general;

    return (
      <div className={containerClasses} {...props}>
        <div className="h-14 w-14 rounded-2xl bg-muted/60 flex items-center justify-center mb-4 border border-border/50">
          {icon || preset.icon}
        </div>
        <h4 className="text-base font-semibold text-foreground">
          {title || preset.title}
        </h4>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          {description || preset.description}
        </p>
        {action && <div className="mt-5">{action}</div>}
      </div>
    );
  }

  // 7. Trạng thái FETCHING (Background sync)
  if (resolvedState === "fetching") {
    return (
      <div className="relative w-full" {...props}>
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur border border-border text-xs text-muted-foreground shadow-sm">
          <RefreshCw className="h-3 w-3 animate-spin text-primary" />
          <span>Đang làm mới...</span>
        </div>
        <div className="opacity-80 transition-opacity duration-200">{children}</div>
      </div>
    );
  }

  // 8. Trạng thái SUCCESS / IDLE: Hiển thị nội dung chính
  return <>{children}</>;
}) as StateComponent;

State.displayName = "State";
State.Skeleton = Skeleton;

export { State as StateView };
