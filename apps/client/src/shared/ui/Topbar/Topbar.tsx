import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Avatar } from "@/shared/ui/Avatar";
import { cn } from "@/shared/lib/utils";

export type AppRole =
  | "customer"
  | "admin"
  | "farmer"
  | "CUSTOMER"
  | "ADMIN"
  | "STAFF";

export interface TopbarUser {
  name: string;
  avatarSrc?: string;
  role: AppRole;
}

export type TopBarUser = TopbarUser;

export interface TopbarBreadcrumbItem {
  label: string;
  onClick?: () => void;
  href?: string;
}

export type TopBarBreadcrumbItem = TopbarBreadcrumbItem;

export interface TopbarProps {
  user?: TopbarUser;
  /** Breadcrumb trail cho admin/farmer */
  breadcrumbs?: TopbarBreadcrumbItem[];
  /** Số thông báo chưa đọc */
  notificationCount?: number;
  /** i18n strings */
  searchPlaceholder?: string;
  notificationsLabel?: string;
  menuLabel?: string;
  roleBadgeLabel?: string;
  /** Callback mở Drawer khi ở Mobile (nút Menu) */
  onMenuClick?: () => void;
  /** Callback mở notification panel */
  onNotificationsClick?: () => void;
  /** Callback điều hướng đăng nhập / đăng xuất */
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
}

export type TopBarProps = TopbarProps;

const ROLE_COLORS: Record<AppRole, string> = {
  customer: "bg-blue-100 text-blue-700",
  CUSTOMER: "bg-blue-100 text-blue-700",
  admin: "bg-primary/10 text-primary",
  ADMIN: "bg-primary/10 text-primary",
  farmer: "bg-amber-100 text-amber-700",
  STAFF: "bg-amber-100 text-amber-700",
};

/**
 * Topbar — thanh header tinh gọn dạng Dashboard bar cho Admin / Farmer (Desktop).
 * Mobile: hiện nút hamburger menu mở Drawer sidebar.
 */
export function Topbar({
  user,
  breadcrumbs: _breadcrumbs = [],
  notificationCount = 0,
  searchPlaceholder = "Tìm kiếm...",
  notificationsLabel = "Thông báo",
  menuLabel = "Menu",
  roleBadgeLabel,
  onMenuClick,
  onNotificationsClick,
  onLoginClick,
  onLogoutClick,
  className,
}: TopbarProps) {
  return (
    <header
      className={cn(
        "flex h-16 items-center justify-between gap-4 border-b border-border bg-white px-4 sm:px-6 dark:bg-slate-900",
        className,
      )}
    >
      {/* ── Left: Hamburger (mobile) + Breadcrumb (desktop) + Search bar (flex trái) ── */}
      <div className="flex flex-1 items-center gap-3 sm:gap-4 min-w-0">
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label={menuLabel}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden shrink-0"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumbs — desktop only */}
        {_breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="hidden items-center gap-1.5 text-sm sm:flex shrink-0 mr-2"
          >
            {_breadcrumbs.map((crumb, idx) => {
              const isLast = idx === _breadcrumbs.length - 1;
              return (
                <div key={idx} className="flex items-center gap-1.5">
                  {idx > 0 && (
                    <span className="text-muted-foreground/40">/</span>
                  )}
                  {isLast ? (
                    <span className="font-semibold text-foreground">
                      {crumb.label}
                    </span>
                  ) : crumb.onClick ? (
                    <button
                      type="button"
                      onClick={crumb.onClick}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className="text-muted-foreground">{crumb.label}</span>
                  )}
                </div>
              );
            })}
          </nav>
        )}

        {/* Search bar — flex sang trái */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            placeholder={searchPlaceholder}
            className={cn(
              "w-full rounded-xl border border-input bg-muted/40 pl-9 pr-4 py-1.5",
              "text-sm text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-colors",
            )}
          />
        </div>
      </div>

      {/* ── Right: Notification bell + User avatar ──────────────────────── */}
      <div className="flex items-center gap-2 shrink-0 ml-auto">
        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            aria-label={notificationsLabel}
            onClick={onNotificationsClick}
            className="relative h-9 w-9 p-0 text-muted-foreground hover:text-foreground"
          >
            <Bell className="h-4 w-4" />
          </Button>
          {notificationCount > 0 && (
            <span
              aria-label={`${notificationCount} thông báo mới`}
              className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white leading-none pointer-events-none"
            >
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </div>

        {/* ── User info / Login button ──────────────────────────────────── */}
        {user ? (
          <div className="flex items-center gap-2.5 pl-1">
            <div className="hidden sm:flex flex-col items-end leading-none">
              <span className="text-sm font-semibold text-foreground truncate max-w-[120px]">
                {user.name}
              </span>
              {roleBadgeLabel && (
                <span
                  className={cn(
                    "mt-0.5 rounded-full px-1.5 py-px text-[10px] font-medium",
                    ROLE_COLORS[user.role],
                  )}
                >
                  {roleBadgeLabel}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={onLogoutClick}
              title="Bấm để đăng xuất hoặc chuyển tài khoản"
              className="flex items-center rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 hover:opacity-85 transition-opacity"
              id="topbar-user-btn"
            >
              <Avatar
                name={user.name}
                src={user.avatarSrc}
                size="sm"
                status="online"
              />
            </button>
          </div>
        ) : onLoginClick ? (
          <Button
            variant="default"
            size="sm"
            onClick={onLoginClick}
            className="text-xs h-8 ml-1"
            id="topbar-login-btn"
          >
            Đăng nhập
          </Button>
        ) : null}
      </div>
    </header>
  );
}

Topbar.displayName = "Topbar";

export { Topbar as TopBar };
