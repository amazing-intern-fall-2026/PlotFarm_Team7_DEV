import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Skeleton — Khối placeholder tạo hiệu ứng nhấp nháy chuyển màu (shimmer pulse) nguyên tử.
 * Dùng làm thành phần cơ sở để dựng các khối giao diện đang tải.
 * Đối với các mẫu giao diện fetching/loading hoàn chỉnh (Card, Profile, Table, Grid, Lines),
 * vui lòng sử dụng component `<State variant="skeleton" skeletonPreset="..." />`.
 */
export function Skeleton({
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/80", className)}
      {...props}
    />
  );
}

Skeleton.displayName = "Skeleton";
