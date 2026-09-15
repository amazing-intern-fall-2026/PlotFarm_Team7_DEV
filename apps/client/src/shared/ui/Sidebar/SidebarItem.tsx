import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
  badge?: string | number;
  id?: string;
}

/**
 * SidebarItem — một mục menu trong Sidebar (Desktop).
 * Hỗ trợ hai trạng thái: expanded (icon + label + badge) và collapsed (chỉ icon + dot badge).
 */
export function SidebarItem({
  icon,
  label,
  isActive = false,
  collapsed = false,
  onClick,
  badge,
  id,
}: SidebarItemProps) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      title={collapsed ? label : undefined}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative flex w-full items-center gap-3.5 rounded-xl px-3.5 py-2.5",
        "text-sm transition-all duration-150 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary/60",
        isActive
          ? "bg-primary text-white font-semibold shadow-xs shadow-primary/20 hover:bg-primary-hover"
          : "text-slate-600 dark:text-slate-300 font-medium hover:bg-accent/80 hover:text-foreground",
        collapsed ? "justify-center px-2 py-3" : "justify-start",
      )}
    >
      {/* Icon */}
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center transition-colors duration-150",
          isActive
            ? "text-white"
            : "text-slate-500 dark:text-slate-400 group-hover:text-foreground",
        )}
      >
        {icon}
      </span>

      {/* Label — ẩn khi collapsed */}
      {!collapsed && (
        <span className="flex-1 truncate text-left leading-tight">{label}</span>
      )}

      {/* Badge khi expanded */}
      {badge !== undefined && !collapsed && (
        <span
          className={cn(
            "ml-auto flex items-center justify-center rounded-full text-xs font-semibold leading-none",
            isActive
              ? "h-6 min-w-[24px] px-1.5 bg-white/20 text-white font-bold"
              : "px-2 py-0.5 min-w-[20px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
          )}
        >
          {badge}
        </span>
      )}

      {/* Badge khi collapsed — dấu chấm nhỏ */}
      {badge !== undefined && collapsed && (
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
      )}
    </button>
  );
}

SidebarItem.displayName = "SidebarItem";
