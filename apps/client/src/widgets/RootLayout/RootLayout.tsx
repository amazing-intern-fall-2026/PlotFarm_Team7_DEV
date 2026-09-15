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
  Navigation,
  Sidebar,
  type SidebarSection,
  Topbar,
  type AppRole,
  type TopbarBreadcrumbItem,
  Header,
  type HeaderNavItem,
  Footer,
  Avatar,
  Container,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import type { UserSummary } from "@/entities/user";

export type RootLayoutUser = UserSummary;
export type AppShellUser = UserSummary;

export interface RootLayoutProps {
  role: AppRole;
  user?: RootLayoutUser;
  activeNavId?: string;
  breadcrumbs?: TopbarBreadcrumbItem[];
  notificationCount?: number;
  onNavChange?: (id: string) => void;
  onNotificationsClick?: () => void;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export type AppShellProps = RootLayoutProps;

function useCustomerNavItems(
  _t: (key: string) => string,
  activeNavId: string,
  onNavChange: (id: string) => void,
  _isLoggedIn: boolean,
): HeaderNavItem[] {
  return [
    {
      id: "home",
      label: "Trang chủ",
      isActive: activeNavId === "home",
      onClick: () => onNavChange("home"),
    },
    {
      id: "explore",
      label: "Khám phá ô đất",
      isActive: activeNavId === "explore",
      onClick: () => onNavChange("explore"),
    },
    {
      id: "camera",
      label: "Camera 24/7",
      isActive: activeNavId === "camera",
      onClick: () => onNavChange("camera"),
    },
    {
      id: "journal",
      label: "Nhật ký nông vụ",
      isActive: activeNavId === "journal",
      onClick: () => onNavChange("journal"),
    },
  ];
}

function useCustomerBottomItems(t: (key: string) => string) {
  return [
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
  ];
}

function useAdminSections(
  _t: (key: string) => string,
  onNavChange?: (id: string) => void,
): SidebarSection[] {
  return [
    {
      title: "PHÂN HỆ ĐIỀU HÀNH",
      items: [
        {
          id: "overview",
          icon: <LayoutDashboard className="h-5 w-5" />,
          label: "Tổng quan",
          onClick: () => onNavChange?.("overview"),
        },
        {
          id: "plots",
          icon: <LayoutGrid className="h-5 w-5" />,
          label: "Quản lý Ô đất",
          onClick: () => onNavChange?.("plots"),
        },
        {
          id: "technical",
          icon: <Radio className="h-5 w-5" />,
          label: "Cấu hình Kỹ thuật",
          onClick: () => onNavChange?.("technical"),
        },
        {
          id: "crops",
          icon: <Sprout className="h-5 w-5" />,
          label: "Danh mục Giống rau",
          onClick: () => onNavChange?.("crops"),
        },
        {
          id: "contracts",
          icon: <FileText className="h-5 w-5" />,
          label: "Hợp đồng & Thanh toán",
          onClick: () => onNavChange?.("contracts"),
        },
        {
          id: "care-slips",
          icon: <CheckSquare className="h-5 w-5" />,
          label: "Phiếu Chăm sóc",
          onClick: () => onNavChange?.("care-slips"),
        },
        {
          id: "farmers",
          icon: <Users className="h-5 w-5" />,
          label: "Điều phối Nông dân",
          onClick: () => onNavChange?.("farmers"),
        },
        {
          id: "harvest",
          icon: <Truck className="h-5 w-5" />,
          label: "Thu hoạch & Giao hàng",
          onClick: () => onNavChange?.("harvest"),
        },
        {
          id: "rbac",
          icon: <ShieldCheck className="h-5 w-5" />,
          label: "Người dùng & RBAC",
          onClick: () => onNavChange?.("rbac"),
        },
      ],
    },
  ];
}

function useAdminBottomItems(t: (key: string) => string) {
  return [
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
  ];
}

function useFarmerSections(
  _t: (key: string) => string,
  onNavChange?: (id: string) => void,
): SidebarSection[] {
  return [
    {
      title: "VẬN HÀNH",
      items: [
        {
          id: "tasks_today",
          icon: <CalendarCheck className="h-5 w-5" />,
          label: "Nhiệm vụ hôm nay",
          onClick: () => onNavChange?.("tasks_today"),
        },
        {
          id: "my_plots",
          icon: <Sprout className="h-5 w-5" />,
          label: "Quản lý ô đất",
          onClick: () => onNavChange?.("my_plots"),
        },
        {
          id: "harvest",
          icon: <Truck className="h-5 w-5" />,
          label: "Thu hoạch & Xuất kho",
          onClick: () => onNavChange?.("harvest"),
        },
        {
          id: "scan_qr",
          icon: <QrCode className="h-5 w-5" />,
          label: "Quét mã QR lô",
          onClick: () => onNavChange?.("scan_qr"),
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
          onClick: () => onNavChange?.("task_journal"),
        },
        {
          id: "alerts",
          icon: <AlertTriangle className="h-5 w-5" />,
          label: "Báo cáo sự cố ô đất",
          onClick: () => onNavChange?.("alerts"),
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
          onClick: () => onNavChange?.("profile"),
        },
        {
          id: "settings",
          icon: <Settings className="h-5 w-5" />,
          label: "Cài đặt thiết bị",
          onClick: () => onNavChange?.("settings"),
        },
      ],
    },
  ];
}

function useFarmerBottomItems(t: (key: string) => string) {
  return [
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
  ];
}

export function RootLayout({
  role,
  user,
  activeNavId = "home",
  breadcrumbs = [],
  notificationCount = 0,
  onNavChange,
  onNotificationsClick,
  onLoginClick,
  onLogoutClick,
  children,
  className,
}: RootLayoutProps) {
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
    (index: number, items: { id: string }[]) => {
      const item = items[index];
      if (item) handleNavChange(item.id);
    },
    [handleNavChange],
  );

  if (role === "customer") {
    const customerNavItems = useCustomerNavItems(
      t,
      activeId,
      handleNavChange,
      Boolean(user)
    );
    const customerBottomItems = useCustomerBottomItems(t);
    const bottomIndex = customerBottomItems.findIndex((i) => i.id === activeId);

    return (
      <div className={cn("flex min-h-screen flex-col", className)}>
        <Header
          role="customer"
          navItems={customerNavItems}
          user={user ?? null}
          notificationCount={notificationCount}
          notificationsLabel={t("nav.notifications")}
          loginLabel={t("nav.login")}
          menuLabel={t("shell.menu")}
          onNotificationsClick={onNotificationsClick}
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick}
        />

        <main className={cn("flex-1 w-full", activeId === "home" ? "pb-20 lg:pb-0" : "py-6 lg:pb-6 pb-20")}>
          {activeId === "home" ? children : <Container>{children}</Container>}
        </main>

        <Footer />

        <div className="lg:hidden">
          <Navigation
            items={customerBottomItems}
            activeIndex={bottomIndex >= 0 ? bottomIndex : 0}
            onTabChange={(i) => handleMobileTabChange(i, customerBottomItems)}
          />
        </div>
      </div>
    );
  }

  const isAdmin = role === "admin";
  const sidebarSections = isAdmin
    ? useAdminSections(t, handleNavChange)
    : useFarmerSections(t, handleNavChange);
  const bottomItems = isAdmin
    ? useAdminBottomItems(t)
    : useFarmerBottomItems(t);
  const bottomIndex = bottomItems.findIndex((i) => i.id === activeId);

  const roleBadgeLabel = isAdmin
    ? t("shell.role_badge_admin")
    : t("shell.role_badge_farmer");

  const defaultBreadcrumbs: TopbarBreadcrumbItem[] =
    breadcrumbs ?? [{ label: t("shell.breadcrumb_home") }];

  const sidebarFooter = isAdmin ? (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/40 text-[11px] font-medium text-emerald-800 dark:text-emerald-300">
        <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
        <span className="truncate">Phiên bản v2.0 • Hệ thống ổn định</span>
      </div>
      <div className="flex items-center gap-3 w-full pt-1">
        <Avatar name={user?.name || "Quản trị viên"} size="md" status="online" src={user?.avatarSrc} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground truncate">{user?.name || "Quản trị viên"}</p>
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
  ) : (
    <div className="flex items-center gap-3 w-full">
      <Avatar name={user?.name || "Nguyễn Nông"} size="md" status="online" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-foreground truncate">{user?.name || "Nguyễn Văn Nông"}</p>
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

  return (
    <div className={cn("flex h-screen overflow-hidden bg-muted/30", className)}>
      <Sidebar
        sections={sidebarSections}
        activeItemId={activeId}
        collapseLabel={t("shell.collapse")}
        expandLabel={t("shell.expand")}
        brandText={isAdmin ? "BioCloud" : "CloudFarm"}
        footer={sidebarFooter}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          user={user ? { ...user, role } : undefined}
          breadcrumbs={defaultBreadcrumbs}
          notificationCount={notificationCount}
          searchPlaceholder={t("shell.search_placeholder")}
          notificationsLabel={t("nav.notifications")}
          menuLabel={t("shell.menu")}
          roleBadgeLabel={roleBadgeLabel}
          onNotificationsClick={onNotificationsClick}
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick}
        />

        <main
          className={cn(
            "flex-1 overflow-y-auto px-4 py-4 sm:px-6",
            "lg:pb-4 pb-20",
          )}
        >
          {children}
        </main>

        <div className="lg:hidden">
          <Navigation
            items={bottomItems}
            activeIndex={bottomIndex >= 0 ? bottomIndex : 0}
            onTabChange={(i) => handleMobileTabChange(i, bottomItems)}
          />
        </div>
      </div>
    </div>
  );
}

RootLayout.displayName = "RootLayout";

export { RootLayout as AppShell };
