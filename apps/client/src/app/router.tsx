import * as React from "react";
import {
  createBrowserRouter,
  Outlet,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { RootLayout } from "@/widgets/RootLayout";
import type { AppRole, TopbarBreadcrumbItem } from "@/shared/ui";
import { LoginPage, RegisterPage, ProtectedRoute, clearAuthSession, getStoredUser } from "@/features/auth";
import { AUTH_ROUTES } from "@/features/auth/constants";
import {
  HomePage,
  PlotsPage,
  PlotDetailPage,
  CheckoutPage,
  MyFarmPage,
  JournalPage,
  AboutPage,
  FarmerTasksPage,
  FarmerTaskExecutePage,
  FarmerPlotsPage,
  AdminDashboardPage,
  AdminPlotsPage,
  AdminPlotConfigPage,
} from "@/pages";

interface RouteNavRule {
  pattern: RegExp;
  breadcrumbs: TopbarBreadcrumbItem[];
  activeNavId: string;
}

const CUSTOMER_NAV_RULES: RouteNavRule[] = [
  {
    pattern: /^\/plots\/.+/,
    breadcrumbs: [{ label: "Khám phá ô đất", href: "/plots" }, { label: "Chi tiết ô đất" }],
    activeNavId: "explore",
  },
  {
    pattern: /^\/plots/,
    breadcrumbs: [{ label: "Trang chủ", href: "/" }, { label: "Khám phá ô đất" }],
    activeNavId: "explore",
  },
  {
    pattern: /^\/checkout/,
    breadcrumbs: [{ label: "Khám phá ô đất", href: "/plots" }, { label: "Thanh toán & Hợp đồng" }],
    activeNavId: "orders",
  },
  {
    pattern: /^\/my-farm/,
    breadcrumbs: [{ label: "Trang chủ", href: "/" }, { label: "Vườn của tôi" }],
    activeNavId: "orders",
  },
  {
    pattern: /^\/journal/,
    breadcrumbs: [{ label: "Trang chủ", href: "/" }, { label: "Nhật ký nông vụ" }],
    activeNavId: "journal",
  },
  {
    pattern: /^\/about/,
    breadcrumbs: [{ label: "Trang chủ", href: "/" }, { label: "Về chúng tôi" }],
    activeNavId: "about",
  },
  {
    pattern: /.*/,
    breadcrumbs: [{ label: "Green Farm" }, { label: "Trang chủ" }],
    activeNavId: "home",
  },
];

const FARMER_NAV_RULES: RouteNavRule[] = [
  {
    pattern: /^\/farmer\/tasks\/.+/,
    breadcrumbs: [{ label: "Nhiệm vụ hôm nay", href: "/farmer" }, { label: "Thực hiện nhiệm vụ" }],
    activeNavId: "tasks_today",
  },
  {
    pattern: /^\/farmer\/plots/,
    breadcrumbs: [{ label: "Nhiệm vụ hôm nay", href: "/farmer" }, { label: "Quản lý ô đất" }],
    activeNavId: "my_plots",
  },
  {
    pattern: /.*/,
    breadcrumbs: [],
    activeNavId: "tasks_today",
  },
];

const ADMIN_NAV_RULES: RouteNavRule[] = [
  {
    pattern: /config/,
    breadcrumbs: [
      { label: "Tổng quan điều hành", href: "/admin" },
      { label: "Danh mục ô đất", href: "/admin/plots" },
      { label: "Cấu hình IoT & Cây trồng" },
    ],
    activeNavId: "tech_config",
  },
  {
    pattern: /^\/admin\/plots/,
    breadcrumbs: [{ label: "Tổng quan điều hành", href: "/admin" }, { label: "Danh sách ô đất" }],
    activeNavId: "plots",
  },
  {
    pattern: /.*/,
    breadcrumbs: [],
    activeNavId: "overview",
  },
];

const ROLE_NAV_RULES: Record<AppRole, RouteNavRule[]> = {
  customer: CUSTOMER_NAV_RULES,
  CUSTOMER: CUSTOMER_NAV_RULES,
  farmer: FARMER_NAV_RULES,
  STAFF: FARMER_NAV_RULES,
  admin: ADMIN_NAV_RULES,
  ADMIN: ADMIN_NAV_RULES,
};

const NAV_TARGETS: Record<string, string> = {
  home: "/",
  explore: "/plots",
  journal: "/journal",
  camera: "/journal",
  about: "/about",
  orders: "/my-farm",
  tasks_today: "/farmer",
  task_journal: "/farmer",
  my_plots: "/farmer/plots",
  iot_camera: "/farmer/plots",
  scan_qr: "/farmer/tasks/TASK-01/execute",
  overview: "/admin",
  work_orders: "/admin",
  harvest: "/admin",
  rbac: "/admin",
  alerts: "/admin",
  settings: "/admin",
  plots: "/admin/plots",
  seeds_supply: "/admin/plots",
  tech_config: "/admin/plots/p-01/config",
};

export function ShellRouteLayout({ role = "customer" }: { role?: AppRole }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const user = React.useMemo(() => {
    const u = getStoredUser();
    if (!u) return undefined;
    return {
      name: u.fullName || u.userCode || "Người dùng",
      avatarSrc: u.avatarUrl || undefined,
    };
  }, [pathname]);

  const handleLogout = React.useCallback(() => {
    clearAuthSession();
    navigate(AUTH_ROUTES.LOGIN);
  }, [navigate]);

  const matchedRule = React.useMemo(() => {
    const rules = ROLE_NAV_RULES[role];
    return rules.find((r) => r.pattern.test(pathname)) ?? rules[rules.length - 1];
  }, [pathname, role]);

  const handleNavChange = React.useCallback(
    (id: string) => {
      if (id === "profile") {
        navigate(user ? "/my-farm" : AUTH_ROUTES.LOGIN);
        return;
      }
      const target = NAV_TARGETS[id];
      if (target) {
        navigate(target);
      }
    },
    [navigate, user]
  );

  return (
    <RootLayout
      role={role}
      user={user}
      activeNavId={matchedRule.activeNavId}
      breadcrumbs={matchedRule.breadcrumbs}
      onNavChange={handleNavChange}
      onLoginClick={() => navigate(AUTH_ROUTES.LOGIN)}
      onLogoutClick={handleLogout}
    >
      <Outlet />
    </RootLayout>
  );
}

export const router = createBrowserRouter([
  { path: AUTH_ROUTES.LOGIN.slice(1), element: <LoginPage /> },
  { path: AUTH_ROUTES.REGISTER.slice(1), element: <RegisterPage /> },
  { path: AUTH_ROUTES.FORGOT_PASSWORD.slice(1), element: <Navigate to={AUTH_ROUTES.LOGIN} replace /> },

  {
    element: <ShellRouteLayout role="customer" />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/plots", element: <PlotsPage /> },
      { path: "/plots/:id", element: <PlotDetailPage /> },
      { path: "/about", element: <AboutPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/journal", element: <JournalPage /> },
          { path: "/checkout", element: <CheckoutPage /> },
          { path: "/checkout/:id", element: <CheckoutPage /> },
          { path: "/my-farm", element: <MyFarmPage /> },
          { path: "/my-farm/:id", element: <MyFarmPage /> },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["STAFF", "ADMIN"]} />,
    children: [
      {
        element: <ShellRouteLayout role="farmer" />,
        children: [
          { path: "/farmer", element: <FarmerTasksPage /> },
          { path: "/farmer/tasks", element: <Navigate to="/farmer" replace /> },
          { path: "/farmer/tasks/:id", element: <FarmerTaskExecutePage /> },
          { path: "/farmer/tasks/:id/execute", element: <FarmerTaskExecutePage /> },
          { path: "/farmer/plots", element: <FarmerPlotsPage /> },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [
      {
        element: <ShellRouteLayout role="admin" />,
        children: [
          { path: "/admin", element: <AdminDashboardPage /> },
          { path: "/admin/dashboard", element: <Navigate to="/admin" replace /> },
          { path: "/admin/plots", element: <AdminPlotsPage /> },
          { path: "/admin/plots/:id/config", element: <AdminPlotConfigPage /> },
        ],
      },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
]);
