import * as React from "react";
import {
  Home,
  Search,
  Camera,
  BookOpen,
  ShoppingBag,
  User,
  LayoutDashboard,
  MapPin,
  ClipboardList,
  ShieldCheck,
  CheckSquare,
  QrCode,
  FileText,
  Bell,
  CalendarCheck,
  Sprout,
  AlertTriangle,
  Settings,
  LogOut,
  Truck,
  LayoutGrid,
  Radio,
  Users,
} from "lucide-react";

import { useT } from "@/shared/lib/i18n";
import {
  type SidebarSection,
  type TopbarBreadcrumbItem,
  type HeaderNavItem,
  type NavigationItemProps,
  Avatar,
} from "@/shared/ui";
import type { RootLayoutProps, RootLayoutViewProps } from "./types";

export function useRootLayout(props: RootLayoutProps): RootLayoutViewProps {
  const {
    role,
    user,
    activeNavId = "home",
    breadcrumbs,
    onNavChange,
    onLogoutClick,
  } = props;

  const { t } = useT();
  const [activeId, setActiveId] = React.useState(activeNavId);

  React.useEffect(() => {
    setActiveId(activeNavId);
  }, [activeNavId]);

  const handleNavChange = React.useCallback(
    (id: string) => {
      setActiveId(id);
      onNavChange?.(id);
    },
    [onNavChange],
  );

  const handleMobileTabChange = React.useCallback(
    (index: number, items: NavigationItemProps[]) => {
      const item = items[index];
      if (item?.id) handleNavChange(item.id);
    },
    [handleNavChange],
  );

  const customerNavItems: HeaderNavItem[] = React.useMemo(() => {
    const items: HeaderNavItem[] = [
      {
        id: "home",
        label: t("nav.home"),
        isActive: activeId === "home",
        onClick: () => handleNavChange("home"),
      },
      {
        id: "explore",
        label: t("nav.explore"),
        isActive: activeId === "explore",
        onClick: () => handleNavChange("explore"),
      },
    ];

    if (user) {
      items.push({
        id: "journal",
        label: t("nav.journal"),
        isActive: activeId === "journal",
        onClick: () => handleNavChange("journal"),
      });
    }

    items.push({
      id: "about",
      label: t("nav.about"),
      isActive: activeId === "about",
      onClick: () => handleNavChange("about"),
    });

    return items;
  }, [t, activeId, handleNavChange, user]);

  const customerBottomItems: NavigationItemProps[] = React.useMemo(
    () => [
      { id: "home", icon: <Home className="h-5 w-5" />, label: t("nav.home") },
      {
        id: "explore",
        icon: <Search className="h-5 w-5" />,
        label: t("nav.explore"),
      },
      {
        id: "camera",
        icon: <Camera className="h-5 w-5" />,
        label: t("nav.camera"),
      },
      {
        id: "orders",
        icon: <ShoppingBag className="h-5 w-5" />,
        label: t("nav.orders"),
      },
      {
        id: "profile",
        icon: <User className="h-5 w-5" />,
        label: t("nav.profile"),
      },
    ],
    [t],
  );

  const adminSidebarSections: SidebarSection[] = React.useMemo(
    () => [
      {
        title: "PHÂN HỆ ĐIỀU HÀNH",
        items: [
          {
            id: "overview",
            icon: <LayoutDashboard className="h-5 w-5" />,
            label: "Tổng quan",
            onClick: () => handleNavChange("overview"),
          },
          {
            id: "plots",
            icon: <LayoutGrid className="h-5 w-5" />,
            label: "Quản lý Ô đất",
            onClick: () => handleNavChange("plots"),
          },
          {
            id: "technical",
            icon: <Radio className="h-5 w-5" />,
            label: "Cấu hình Kỹ thuật",
            onClick: () => handleNavChange("technical"),
          },
          {
            id: "crops",
            icon: <Sprout className="h-5 w-5" />,
            label: "Danh mục Giống rau",
            onClick: () => handleNavChange("crops"),
          },
          {
            id: "contracts",
            icon: <FileText className="h-5 w-5" />,
            label: "Hợp đồng & Thanh toán",
            onClick: () => handleNavChange("contracts"),
          },
          {
            id: "care-slips",
            icon: <CheckSquare className="h-5 w-5" />,
            label: "Phiếu Chăm sóc",
            onClick: () => handleNavChange("care-slips"),
          },
          {
            id: "farmers",
            icon: <Users className="h-5 w-5" />,
            label: "Điều phối Nông dân",
            onClick: () => handleNavChange("farmers"),
          },
          {
            id: "harvest",
            icon: <Truck className="h-5 w-5" />,
            label: "Thu hoạch & Giao hàng",
            onClick: () => handleNavChange("harvest"),
          },
          {
            id: "rbac",
            icon: <ShieldCheck className="h-5 w-5" />,
            label: "Người dùng & RBAC",
            onClick: () => handleNavChange("rbac"),
          },
        ],
      },
    ],
    [handleNavChange],
  );

  const adminBottomItems: NavigationItemProps[] = React.useMemo(
    () => [
      {
        id: "overview",
        icon: <LayoutDashboard className="h-5 w-5" />,
        label: t("admin.overview"),
      },
      {
        id: "plots",
        icon: <MapPin className="h-5 w-5" />,
        label: t("admin.plots"),
      },
      {
        id: "work_orders",
        icon: <ClipboardList className="h-5 w-5" />,
        label: t("admin.work_orders"),
      },
      {
        id: "alerts",
        icon: <Bell className="h-5 w-5" />,
        label: t("admin.alerts"),
      },
      {
        id: "settings",
        icon: <ShieldCheck className="h-5 w-5" />,
        label: t("admin.settings"),
      },
    ],
    [t],
  );

  const farmerSidebarSections: SidebarSection[] = React.useMemo(
    () => [
      {
        title: "VẬN HÀNH",
        items: [
          {
            id: "tasks_today",
            icon: <CalendarCheck className="h-5 w-5" />,
            label: "Nhiệm vụ hôm nay",
            onClick: () => handleNavChange("tasks_today"),
          },
          {
            id: "my_plots",
            icon: <Sprout className="h-5 w-5" />,
            label: "Quản lý ô đất",
            onClick: () => handleNavChange("my_plots"),
          },
          {
            id: "harvest",
            icon: <Truck className="h-5 w-5" />,
            label: "Thu hoạch & Xuất kho",
            onClick: () => handleNavChange("harvest"),
          },
          {
            id: "scan_qr",
            icon: <QrCode className="h-5 w-5" />,
            label: "Quét mã QR lô",
            onClick: () => handleNavChange("scan_qr"),
          },
        ],
      },
      {
        title: "NHẬT KÝ & BÁO CÁO",
        items: [
          {
            id: "task_journal",
            icon: <FileText className="h-5 w-5" />,
            label: "Lịch sử công việc",
            onClick: () => handleNavChange("task_journal"),
          },
          {
            id: "alerts",
            icon: <AlertTriangle className="h-5 w-5" />,
            label: "Báo cáo sự cố ô đất",
            onClick: () => handleNavChange("alerts"),
          },
        ],
      },
      {
        title: "CÁ NHÂN",
        items: [
          {
            id: "profile",
            icon: <User className="h-5 w-5" />,
            label: "Hồ sơ kỹ thuật viên",
            onClick: () => handleNavChange("profile"),
          },
          {
            id: "settings",
            icon: <Settings className="h-5 w-5" />,
            label: "Cài đặt thiết bị",
            onClick: () => handleNavChange("settings"),
          },
        ],
      },
    ],
    [handleNavChange],
  );

  const farmerBottomItems: NavigationItemProps[] = React.useMemo(
    () => [
      {
        id: "tasks_today",
        icon: <CheckSquare className="h-5 w-5" />,
        label: t("farmer.tasks_today"),
      },
      {
        id: "my_plots",
        icon: <MapPin className="h-5 w-5" />,
        label: t("farmer.my_plots"),
      },
      {
        id: "scan_qr",
        icon: <QrCode className="h-5 w-5" />,
        label: t("farmer.scan_qr"),
      },
      {
        id: "task_journal",
        icon: <BookOpen className="h-5 w-5" />,
        label: t("farmer.task_journal"),
      },
      {
        id: "profile",
        icon: <User className="h-5 w-5" />,
        label: t("farmer.my_profile"),
      },
    ],
    [t],
  );

  const isAdmin = role === "admin";
  const roleBadgeLabel = isAdmin
    ? t("shell.role_badge_admin")
    : t("shell.role_badge_farmer");

  const defaultBreadcrumbs: TopbarBreadcrumbItem[] = React.useMemo(
    () => breadcrumbs ?? [{ label: t("shell.breadcrumb_home") }],
    [breadcrumbs, t],
  );

  const sidebarFooter = React.useMemo(() => {
    if (isAdmin) {
      return (
        <div className="flex flex-col gap-2.5 w-full">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/40 text-[11px] font-medium text-emerald-800 dark:text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
            <span className="truncate">Phiên bản v2.0 • Hệ thống ổn định</span>
          </div>
          <div className="flex items-center gap-3 w-full pt-1">
            <Avatar
              name={user?.name || "Quản trị viên"}
              size="md"
              status="online"
              src={user?.avatarSrc}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate">
                {user?.name || "Quản trị viên"}
              </p>
              <p className="text-xs text-muted-foreground truncate">Super Admin</p>
            </div>
            <button
              type="button"
              title="Đăng xuất"
              aria-label="Đăng xuất"
              onClick={onLogoutClick}
              className="text-slate-400 hover:text-foreground transition-colors p-1 rounded-lg hover:bg-accent shrink-0 ml-auto"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-3 w-full">
        <Avatar name={user?.name || "Nguyễn Nông"} size="md" status="online" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground truncate">
            {user?.name || "Nguyễn Văn Nông"}
          </p>
          <p className="text-xs text-muted-foreground truncate">Kỹ thuật viên Lô A</p>
        </div>
        <button
          type="button"
          title="Đăng xuất"
          aria-label="Đăng xuất"
          onClick={onLogoutClick}
          className="text-slate-400 hover:text-foreground transition-colors p-1 rounded-lg hover:bg-accent shrink-0 ml-auto"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    );
  }, [isAdmin, user, onLogoutClick]);

  return {
    ...props,
    activeId,
    handleNavChange,
    handleMobileTabChange,
    customerNavItems,
    customerBottomItems,
    adminSidebarSections,
    farmerSidebarSections,
    adminBottomItems,
    farmerBottomItems,
    sidebarFooter,
    roleBadgeLabel,
    defaultBreadcrumbs,
  };
}
