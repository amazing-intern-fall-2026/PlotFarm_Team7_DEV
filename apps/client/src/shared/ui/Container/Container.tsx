import * as React from "react";
import { cn } from "@/shared/lib/utils";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Thẻ HTML ngữ nghĩa cần render (div, section, main, article, header, footer) */
  as?: React.ElementType;
  /** Giới hạn chiều rộng tối đa (Max-width variant) */
  size?: ContainerSize;
  /** Tự động căn giữa theo chiều ngang (mx-auto) */
  center?: boolean;
  /** Đệm lề responsive hai bên (px-4 sm:px-6 lg:px-8) */
  padding?: boolean;
  children?: React.ReactNode;
}

const sizeMap: Record<ContainerSize, string> = {
  sm: "max-w-screen-sm", // 640px
  md: "max-w-screen-md", // 768px
  lg: "max-w-screen-lg", // 1024px
  xl: "max-w-screen-xl", // 1280px
  "2xl": "max-w-screen-2xl", // 1536px
  "7xl": "max-w-7xl", // 80rem (1280px - chuẩn layout dashboard / marketplace)
  full: "max-w-full",
};

/**
 * Container — Thành phần bọc khung giao diện trung tâm chuẩn hóa cho toàn bộ Green Farm.
 * Đảm bảo độ rộng tối đa (max-width), tự động căn giữa và đệm lề (gutter) đồng nhất trên mọi màn hình.
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      as: Component = "div",
      size = "7xl",
      center = true,
      padding = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "w-full",
          sizeMap[size],
          center && "mx-auto",
          padding && "px-4 sm:px-6 lg:px-8",
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Container.displayName = "Container";
