import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SidebarItem, type SidebarItemProps } from "./SidebarItem";
import { Logo } from "@/shared/ui/Logo";
import { cn } from "@/shared/lib/utils";

export type SidebarSection = {
  /** Tiêu đề nhóm menu (hiển thị khi expanded) */
  title?: string;
  items: SidebarItemProps[];
};

export interface SidebarProps {
  /** Danh sách nhóm menu */
  sections: SidebarSection[];
  /** Index item đang active (global flat index) */
  activeItemId?: string;
  /** Label collapse/expand cho a11y (từ i18n) */
  collapseLabel?: string;
  expandLabel?: string;
  /** Footer slot — ví dụ: thông tin user, logout */
  footer?: React.ReactNode;
  brandText?: string;
  className?: string;
}

export type SidebarNavProps = SidebarProps;

const SIDEBAR_WIDTH_EXPANDED = "w-64";
const SIDEBAR_WIDTH_COLLAPSED = "w-[72px]";

/**
 * Sidebar — sidebar cố định bên trái cho Admin / Farmer trên Desktop.
 * - Expanded: 256px, hiển thị Logo + text + sections + user card.
 * - Collapsed: 72px, chỉ hiển thị icon.
 * - Toggle bằng nút ChevronLeft / ChevronRight ở đáy.
 */
export function Sidebar({
  sections,
  activeItemId,
  collapseLabel = "Thu gọn",
  expandLabel = "Mở rộng",
  footer,
  brandText,
  className,
}: SidebarProps) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <aside
      aria-label="Điều hướng hệ thống"
      className={cn(
        "hidden lg:flex flex-col h-screen sticky top-0",
        "bg-white dark:bg-slate-900 border-r border-border",
        "transition-all duration-200 ease-in-out overflow-hidden shrink-0 select-none",
        collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
        className,
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b border-border shrink-0",
          collapsed ? "justify-center px-0" : "px-4",
        )}
      >
        <Logo size="md" showText={!collapsed} brandText={brandText} />
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-5">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {section.title && !collapsed && (
              <p
                className={cn(
                  "px-3.5 pb-1.5 pt-1 text-xs font-semibold uppercase tracking-wider",
                  "text-slate-400 dark:text-slate-500 truncate",
                )}
              >
                {section.title}
              </p>
            )}
            {section.items.map((item) => (
              <SidebarItem
                key={item.id}
                {...item}
                collapsed={collapsed}
                isActive={item.id === activeItemId}
              />
            ))}
          </div>
        ))}
      </div>

      {footer && (
        <div className={cn("border-t border-border px-3 py-3 shrink-0", collapsed && "px-2 py-2 flex justify-center")}>
          {footer}
        </div>
      )}

      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? expandLabel : collapseLabel}
        className={cn(
          "flex items-center justify-center border-t border-border py-3 shrink-0",
          "text-slate-500 hover:text-foreground hover:bg-accent/40",
          "transition-colors duration-150 focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-inset",
        )}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <div className="flex items-center gap-1.5 text-sm font-medium">
            <ChevronLeft className="h-4 w-4" />
            <span>{collapseLabel}</span>
          </div>
        )}
      </button>
    </aside>
  );
}

Sidebar.displayName = "Sidebar";

export { Sidebar as SidebarNav };
