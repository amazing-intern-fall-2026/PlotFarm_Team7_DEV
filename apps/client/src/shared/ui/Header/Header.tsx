import * as React from "react";
import {
  Bell,
  Menu,
  X,
  Search,
  Phone,
  QrCode,
  CheckSquare,
  MapPin,
  FileText,
  LayoutDashboard,
  Wrench,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Badge } from "@/shared/ui/Badge";
import { Avatar } from "@/shared/ui/Avatar";
import { Logo } from "@/shared/ui/Logo";
import { cn } from "@/shared/lib/utils";

export type HeaderRole = "customer" | "farmer" | "admin";

export interface HeaderNavItem {
  id: string;
  label: string;
  href?: string;
  isActive?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface HeaderUser {
  name: string;
  avatarSrc?: string;
  role?: string;
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Vai trò ứng dụng: "customer" | "farmer" | "admin" — Tự động render layout và menu tương ứng */
  role?: HeaderRole;
  /** Danh sách mục điều hướng (tùy biến hoặc dùng preset theo role) */
  navItems?: HeaderNavItem[];
  /** ID của mục menu đang active */
  activeNavId?: string;
  /** Callback khi click menu item */
  onNavChange?: (id: string) => void;
  /** Thông tin người dùng đăng nhập */
  user?: HeaderUser | null;
  /** Số lượng thông báo chưa đọc */
  notificationCount?: number;
  /** Label đa ngôn ngữ */
  notificationsLabel?: string;
  loginLabel?: string;
  menuLabel?: string;
  roleBadgeLabel?: string;
  /** Bật/tắt thanh tìm kiếm nhanh */
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (query: string) => void;
  /** Callbacks sự kiện */
  onNotificationsClick?: () => void;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  onActionClick?: () => void;
  /** Slot tuỳ biến phía bên phải */
  extraActions?: React.ReactNode;
}

export const DEFAULT_CUSTOMER_NAV_ITEMS: HeaderNavItem[] = [
  { id: "home", label: "Trang chủ", href: "/" },
  { id: "explore", label: "Khám phá ô đất", href: "/plots" },
  { id: "camera", label: "Camera 24/7", href: "/journal" },
  { id: "journal", label: "Nhật ký nông vụ", href: "/journal" },
];

/** Preset mục menu cho Farmer */
export const DEFAULT_FARMER_NAV_ITEMS: HeaderNavItem[] = [
  { id: "tasks_today", label: "Nhiệm vụ hôm nay", href: "/farmer", icon: <CheckSquare className="h-4 w-4" />, badge: "3 việc" },
  { id: "my_plots", label: "Quản lý ô đất", href: "/farmer/plots", icon: <MapPin className="h-4 w-4" /> },
  { id: "iot_camera", label: "Camera & Cảm biến", href: "/farmer/plots", icon: <Leaf className="h-4 w-4" /> },
  { id: "task_journal", label: "Nhật ký thực địa", href: "/farmer", icon: <FileText className="h-4 w-4" /> },
];

/** Preset mục menu cho Admin */
export const DEFAULT_ADMIN_NAV_ITEMS: HeaderNavItem[] = [
  { id: "overview", label: "Tổng quan điều hành", icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: "plots", label: "Danh mục ô đất", icon: <MapPin className="h-4 w-4" />, badge: "2 cảnh báo" },
  { id: "tech_config", label: "Cấu hình IoT & Giống", icon: <Wrench className="h-4 w-4" /> },
  { id: "rbac", label: "Phân quyền RBAC", icon: <ShieldCheck className="h-4 w-4" /> },
];

/**
 * Header — Thành phần Header đa vai trò (Multi-Role Header).
 *
 * Nhận prop `role` và tự động điều chỉnh giao diện, menu, badge nhận diện tương ứng:
 * - `role="customer"`: Marketplace style (Menu ngang, hotline 1900 6868, giỏ hàng, thông báo, đăng nhập).
 * - `role="farmer"`: Field Ops style (Badge "Kỹ thuật viên", danh mục nhiệm vụ, phím tắt quét QR, thông báo tác vụ).
 * - `role="admin"`: Super Admin style (Badge "Quản trị hệ thống", tìm kiếm, menu điều hành, cảnh báo vi khí hậu).
 */
export function Header({
  role = "customer",
  navItems,
  activeNavId = "home",
  onNavChange,
  user,
  notificationCount = 0,
  notificationsLabel = "Thông báo",
  loginLabel = "Đăng nhập",
  menuLabel = "Menu",
  roleBadgeLabel,
  showSearch,
  searchPlaceholder,
  onSearchChange,
  onNotificationsClick,
  onLoginClick,
  onLogoutClick,
  onActionClick,
  extraActions,
  className,
  ...props
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // 1. Xác định danh sách menu theo role
  const resolvedNavItems = React.useMemo(() => {
    if (navItems && navItems.length > 0) return navItems;
    switch (role) {
      case "farmer":
        return DEFAULT_FARMER_NAV_ITEMS;
      case "admin":
        return DEFAULT_ADMIN_NAV_ITEMS;
      case "customer":
      default:
        return DEFAULT_CUSTOMER_NAV_ITEMS;
    }
  }, [navItems, role, user]);

  // 2. Xác định nhãn badge theo role
  const resolvedRoleBadge = React.useMemo(() => {
    if (roleBadgeLabel) return roleBadgeLabel;
    switch (role) {
      case "farmer":
        return "Kỹ thuật viên";
      case "admin":
        return "Quản trị hệ thống";
      case "customer":
      default:
        return undefined;
    }
  }, [roleBadgeLabel, role]);

  const handleItemClick = (id: string, originalClick?: () => void) => {
    originalClick?.();
    onNavChange?.(id);
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-border shadow-2xs",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6">
        {/* ── Logo & Role Badge (Left Column) ── */}
        <div className="flex flex-1 items-center gap-2.5 min-w-0">
          <Logo size="sm" showText brandText="CloudFarm" />
          {role === "customer" && (
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-slate-50/80 px-2.5 py-0.5 text-xs text-slate-600 font-medium shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Đà Lạt Farm - Nhà xe</span>
            </div>
          )}
          {resolvedRoleBadge && (
            <Badge
              variant={role === "admin" ? "outline" : "secondary"}
              className={cn(
                "hidden sm:inline-flex text-xs font-semibold px-2 py-0.5",
                role === "farmer" && "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200",
                role === "admin" && "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-300",
              )}
            >
              {resolvedRoleBadge}
            </Badge>
          )}
        </div>

        {/* ── Desktop Navigation Links (Center Column - Căn giữa hoàn hảo) ── */}
        <nav
          aria-label="Điều hướng thanh trên"
          className="hidden lg:flex shrink-0 items-center justify-center gap-1"
        >
          {resolvedNavItems.map((item) => {
            const isActive = item.isActive !== undefined ? item.isActive : item.id === activeNavId;
            return (
              <button
                key={item.id}
                id={`header-nav-${item.id}`}
                type="button"
                onClick={() => handleItemClick(item.id, item.onClick)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1 rounded-full bg-primary/15 text-primary text-[10px] font-bold px-1.5 py-0.2">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* ── Right Actions (Right Column) ── */}
        <div className="flex flex-1 items-center justify-end gap-3 min-w-0">
          {/* Search bar (Dành cho Admin hoặc bật tuỳ chọn) */}
          {(showSearch || role === "admin") && (
            <div className="hidden md:flex max-w-xs w-full items-center relative">
              <Search className="h-4 w-4 absolute left-3 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder={searchPlaceholder ?? (role === "admin" ? "Tìm kiếm ô đất, cảm biến, người dùng..." : "Tìm kiếm...")}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-xl bg-muted/60 text-xs border border-border/80 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
            </div>
          )}

          {/* Customer: Hotline 1900 6068 */}
          {role === "customer" && (
            <a
              href="tel:19006068"
              className="hidden sm:flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 transition-colors shrink-0"
            >
              <Phone className="h-3.5 w-3.5 text-primary" />
              <span>1900 6068</span>
            </a>
          )}

          {/* Farmer: Nút quét mã QR nhanh */}
          {role === "farmer" && (
            <Button
              size="sm"
              variant="outline"
              onClick={onActionClick}
              className="hidden sm:flex gap-1.5 text-xs h-8 shrink-0"
            >
              <QrCode className="h-3.5 w-3.5 text-emerald-600" />
              <span>Quét mã QR</span>
            </Button>
          )}

          {/* Extra slot actions */}
          {extraActions}

          {/* Action icons: Notifications & User Avatar */}
          <div className="flex items-center gap-1 shrink-0">
          {/* Bell Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              aria-label={notificationsLabel}
              onClick={onNotificationsClick}
              className="h-9 w-9"
              id="header-bell-btn"
            >
              <Bell className="h-5 w-5" />
            </Button>
            {notificationCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-white shadow-xs">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
          </div>

          {/* User Profile or Login */}
          {user ? (
            <button
              type="button"
              aria-label={user.name}
              title="Bấm để đăng xuất hoặc chuyển tài khoản"
              onClick={onLogoutClick}
              className="ml-1 flex items-center gap-2 rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 hover:opacity-90 transition-opacity"
              id="header-user-btn"
            >
              <Avatar name={user.name} src={user.avatarSrc} size="sm" />
              <span className="hidden xl:inline-block text-xs font-semibold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                {user.name}
              </span>
            </button>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={onLoginClick}
              className="ml-1 text-xs h-8"
              id="header-login-btn"
            >
              {loginLabel}
            </Button>
          )}

          {/* Hamburger Mobile Toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label={menuLabel}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden h-9 w-9 ml-1"
            id="header-hamburger-btn"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>

      {/* ── Slide-Down Mobile Drawer Menu ── */}
      {mobileOpen && (
        <div
          id="header-mobile-drawer"
          className="lg:hidden border-t border-border bg-white dark:bg-slate-950 px-4 py-4 shadow-xl space-y-3 animate-in slide-in-from-top-2 duration-150"
        >
          {resolvedRoleBadge && (
            <div className="pb-2 border-b border-border/60 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Phân hệ vai trò:</span>
              <Badge variant="secondary" className="text-xs font-semibold">
                {resolvedRoleBadge}
              </Badge>
            </div>
          )}

          <nav aria-label="Điều hướng di động" className="flex flex-col space-y-1">
            {resolvedNavItems.map((item) => {
              const isActive = item.isActive !== undefined ? item.isActive : item.id === activeNavId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item.id, item.onClick)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors text-left",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="rounded-full bg-primary/15 text-primary text-[10px] font-bold px-2 py-0.5">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-border/60 space-y-2">
            {user ? (
              <div className="flex items-center justify-between p-2 rounded-xl bg-muted/60">
                <div className="flex items-center gap-2 min-w-0">
                  <Avatar name={user.name} src={user.avatarSrc} size="sm" />
                  <span className="text-xs font-semibold text-foreground truncate">{user.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMobileOpen(false);
                    onLogoutClick?.();
                  }}
                  className="text-xs h-7 text-destructive border-destructive/30 hover:bg-destructive/10 shrink-0"
                >
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                size="default"
                onClick={() => {
                  setMobileOpen(false);
                  onLoginClick?.();
                }}
                className="w-full text-xs font-bold"
                id="header-mobile-login-btn"
              >
                {loginLabel || "Đăng nhập"}
              </Button>
            )}

            {role === "customer" && (
              <a
                href="tel:19006068"
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span>Tổng đài tư vấn: 1900 6068</span>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

Header.displayName = "Header";

export { Header as CustomerHeader };
export type { HeaderProps as CustomerHeaderProps };
