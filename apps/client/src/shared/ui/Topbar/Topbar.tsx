import * as React from "react";
import { Bell, Search, Menu, User, FileText, Sprout, LogOut, ChevronDown } from "lucide-react";
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
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const userMenuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  return (
    <header
      className={cn(
        "flex h-16 items-center justify-between gap-4 border-b border-border bg-white px-4 sm:px-6 dark:bg-slate-900",
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-3 sm:gap-4 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label={menuLabel}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden shrink-0"
        >
          <Menu className="h-5 w-5" />
        </button>

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

      <div className="flex items-center gap-2 shrink-0 ml-auto">
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

        {user ? (
          <div className="relative flex items-center gap-2.5 pl-1" ref={userMenuRef}>
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
              aria-label={user.name}
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen((prev) => !prev)}
              title="Bấm để mở danh mục tài khoản"
              className={cn(
                "flex items-center gap-1.5 rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition-all",
                dropdownOpen ? "ring-2 ring-primary/40 bg-primary/10" : "hover:opacity-85"
              )}
              id="topbar-user-btn"
            >
              <Avatar
                name={user.name}
                src={user.avatarSrc}
                size="sm"
                status="online"
              />
              <ChevronDown className={cn("w-3 h-3 text-muted-foreground transition-transform duration-200 hidden sm:inline-block", dropdownOpen && "rotate-180")} />
            </button>

            {dropdownOpen && (
              <div
                className="absolute right-0 top-full mt-2.5 w-64 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200/80 dark:border-slate-800 p-2 z-50 animate-in fade-in-50 zoom-in-95"
              >
                <div className="flex items-center gap-2.5 p-2.5 bg-muted/40 rounded-xl mb-1.5">
                  <Avatar name={user.name} src={user.avatarSrc} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-foreground truncate">{user.name}</p>
                    <span className="text-[10px] text-muted-foreground block">{roleBadgeLabel || "Thành viên"}</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <a
                    href="/account/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-foreground hover:bg-accent transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Hồ sơ & Cài đặt</span>
                  </a>

                  <a
                    href="/account/contracts"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-foreground hover:bg-accent transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Hợp đồng điện tử</span>
                  </a>

                  <a
                    href="/my-farm"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-foreground hover:bg-accent transition-colors"
                  >
                    <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Vườn của tôi</span>
                  </a>
                </div>

                <div className="my-1.5 border-t border-border/60" />

                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    onLogoutClick?.();
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold text-destructive hover:bg-destructive/10 transition-colors text-left"
                >
                  <LogOut className="w-3.5 h-3.5 text-destructive" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
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
