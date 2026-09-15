import * as React from "react";
import {
  Home,
  Search,
  Camera,
  ShoppingBag,
  User,
  CheckSquare,
  MapPin,
  QrCode,
  BookOpen,
  LayoutDashboard,
  ClipboardList,
  Bell,
  ShieldCheck,
} from "lucide-react";
import { NavigationItem, type NavigationItemProps } from "./NavigationItem";
import { cn } from "@/shared/lib/utils";

export type NavigationRole = "customer" | "farmer" | "admin";
export type BottomNavRole = NavigationRole;

export interface NavigationProps {
  /** Vai trò ứng dụng: "customer" | "farmer" | "admin" — Tự động áp dụng bộ tabs chuẩn theo role */
  role?: NavigationRole;
  /** Danh sách các tab hiển thị tùy biến (ghi đè bộ tabs của role nếu truyền vào) */
  items?: NavigationItemProps[];
  /** Index của tab đang active */
  activeIndex?: number;
  /** ID của tab đang active (tự động tính activeIndex dựa theo item.id) */
  activeId?: string;
  /** Callback khi chọn tab (trả về index và item) */
  onTabChange?: (index: number, item?: NavigationItemProps) => void;
  className?: string;
}

export type BottomNavigationProps = NavigationProps;

/** Bộ tab chuẩn cho vai trò Customer (Marketplace / Khách hàng) */
export const DEFAULT_CUSTOMER_NAV_ITEMS: NavigationItemProps[] = [
  { id: "home", icon: <Home className="h-5 w-5" />, label: "Trang chủ" },
  { id: "explore", icon: <Search className="h-5 w-5" />, label: "Khám phá" },
  { id: "camera", icon: <Camera className="h-5 w-5" />, label: "Camera 24/7" },
  {
    id: "orders",
    icon: <ShoppingBag className="h-5 w-5" />,
    label: "Vườn của tôi",
  },
  { id: "profile", icon: <User className="h-5 w-5" />, label: "Tài khoản" },
];

/** Bộ tab chuẩn cho vai trò Farmer (Kỹ thuật viên / Nông dân thực địa) */
export const DEFAULT_FARMER_NAV_ITEMS: NavigationItemProps[] = [
  {
    id: "tasks_today",
    icon: <CheckSquare className="h-5 w-5" />,
    label: "Nhiệm vụ",
  },
  { id: "my_plots", icon: <MapPin className="h-5 w-5" />, label: "Ô đất" },
  { id: "scan_qr", icon: <QrCode className="h-5 w-5" />, label: "Quét QR" },
  {
    id: "task_journal",
    icon: <BookOpen className="h-5 w-5" />,
    label: "Nhật ký",
  },
  { id: "profile", icon: <User className="h-5 w-5" />, label: "Hồ sơ" },
];

/** Bộ tab chuẩn cho vai trò Admin (Quản trị hệ thống) */
export const DEFAULT_ADMIN_NAV_ITEMS: NavigationItemProps[] = [
  {
    id: "overview",
    icon: <LayoutDashboard className="h-5 w-5" />,
    label: "Tổng quan",
  },
  { id: "plots", icon: <MapPin className="h-5 w-5" />, label: "Ô đất" },
  {
    id: "work_orders",
    icon: <ClipboardList className="h-5 w-5" />,
    label: "Công việc",
  },
  { id: "alerts", icon: <Bell className="h-5 w-5" />, label: "Cảnh báo" },
  {
    id: "settings",
    icon: <ShieldCheck className="h-5 w-5" />,
    label: "Cài đặt",
  },
];

export const DEFAULT_CUSTOMER_BOTTOM_ITEMS = DEFAULT_CUSTOMER_NAV_ITEMS;
export const DEFAULT_FARMER_BOTTOM_ITEMS = DEFAULT_FARMER_NAV_ITEMS;
export const DEFAULT_ADMIN_BOTTOM_ITEMS = DEFAULT_ADMIN_NAV_ITEMS;

/**
 * Navigation — thanh điều hướng linh hoạt cho mọi vai trò (Multi-role).
 *
 * Hỗ trợ tự động cấu hình theo `role`:
 * - `role="customer"`: Trang chủ • Khám phá • Camera 24/7 • Vườn của tôi • Tài khoản
 * - `role="farmer"`: Nhiệm vụ • Ô đất • Quét QR • Nhật ký • Hồ sơ
 * - `role="admin"`: Tổng quan • Ô đất • Công việc • Cảnh báo • Cài đặt
 *
 * Hoặc truyền `items` tùy biến theo nhu cầu bất kỳ.
 */
export function Navigation({
  role = "customer",
  items,
  activeIndex,
  activeId,
  onTabChange,
  className,
}: NavigationProps) {
  // Xác định danh sách tabs theo items truyền vào hoặc role mặc định
  const resolvedItems = React.useMemo(() => {
    if (items && items.length > 0) return items;
    switch (role) {
      case "farmer":
        return DEFAULT_FARMER_NAV_ITEMS;
      case "admin":
        return DEFAULT_ADMIN_NAV_ITEMS;
      case "customer":
      default:
        return DEFAULT_CUSTOMER_NAV_ITEMS;
    }
  }, [items, role]);

  // Xác định activeIndex từ activeId hoặc activeIndex truyền vào
  const currentActiveIndex = React.useMemo(() => {
    if (activeId !== undefined) {
      const idx = resolvedItems.findIndex((i) => i.id === activeId);
      if (idx !== -1) return idx;
    }
    return activeIndex ?? 0;
  }, [activeId, activeIndex, resolvedItems]);

  return (
    <nav
      aria-label="Điều hướng thanh đáy"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "flex h-[60px] items-stretch",
        "bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-t border-border",
        "pb-safe shadow-lg",
        className,
      )}
    >
      {resolvedItems.map((item, index) => (
        <NavigationItem
          key={item.id ?? index}
          {...item}
          isActive={index === currentActiveIndex}
          onClick={() => {
            item.onClick?.();
            onTabChange?.(index, item);
          }}
        />
      ))}
    </nav>
  );
}

Navigation.displayName = "Navigation";

export { Navigation as BottomNavigation };
