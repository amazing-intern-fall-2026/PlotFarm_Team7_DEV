import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface NavigationItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  id?: string;
}

export type BottomNavItemProps = NavigationItemProps;

/**
 * NavigationItem — một tab điều hướng nhỏ trong thanh Navigation.
 * Hiển thị icon + label nhỏ, có hiệu ứng active màu xanh lá brand.
 */
export function NavigationItem({
  icon,
  label,
  isActive = false,
  onClick,
  id,
}: NavigationItemProps) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 px-1",
        "text-[10px] font-medium leading-tight transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center h-6 w-6 transition-all duration-150",
          isActive && "scale-110"
        )}
      >
        {icon}
      </span>
      <span className="truncate max-w-[56px] text-center">{label}</span>
    </button>
  );
}

NavigationItem.displayName = "NavigationItem";

export { NavigationItem as BottomNavItem };
