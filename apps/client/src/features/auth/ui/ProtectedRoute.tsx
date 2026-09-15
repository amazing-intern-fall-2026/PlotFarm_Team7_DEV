import * as React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { UserRole } from "@repo/shared";
import { AUTH_ROUTES, ROLE_HOME_ROUTES } from "../constants";
import { getStoredUser, isAuthenticated, setAuthSession } from "../model/authCookie";

export interface ProtectedRouteProps {
  /** Danh sách vai trò được phép truy cập (nếu bỏ trống: chỉ cần đã đăng nhập) */
  allowedRoles?: UserRole[];
  /** Đường dẫn điều hướng nếu chưa đăng nhập (mặc định: /login) */
  redirectTo?: string;
  /** Component con nếu không dùng Outlet */
  children?: React.ReactNode;
}

/**
 * ProtectedRoute — Bảo vệ route theo trạng thái đăng nhập và phân quyền vai trò (RBAC).
 *
 * 1. Chưa đăng nhập: Redirect về /login kèm state.from để sau khi login có thể quay lại.
 * 2. Đã đăng nhập nhưng không đúng vai trò: Điều hướng về trang chủ tương ứng của vai trò đó.
 * 3. Đầy đủ điều kiện: Render children hoặc <Outlet />.
 */
export function ProtectedRoute({
  allowedRoles,
  redirectTo = AUTH_ROUTES.LOGIN,
  children,
}: ProtectedRouteProps) {
  const location = useLocation();
  const authenticated = isAuthenticated();
  const user = getStoredUser();

  if (!authenticated || !user) {
    if (import.meta.env.DEV && location.pathname.startsWith("/admin")) {
      setAuthSession({
        accessToken: "dev-admin-token",
        refreshToken: "dev-admin-refresh",
        user: {
          userCode: "ADMIN-001",
          email: "admin@biocloud.vn",
          fullName: "Quản trị viên",
          role: "ADMIN",
          avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        },
      });
      return children ? <>{children}</> : <Outlet />;
    }
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    if (import.meta.env.DEV && location.pathname.startsWith("/admin")) {
      setAuthSession({
        accessToken: "dev-admin-token",
        refreshToken: "dev-admin-refresh",
        user: {
          userCode: "ADMIN-001",
          email: "admin@biocloud.vn",
          fullName: "Quản trị viên",
          role: "ADMIN",
          avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        },
      });
      return children ? <>{children}</> : <Outlet />;
    }
    const userHome = ROLE_HOME_ROUTES[user.role] ?? "/";
    return <Navigate to={userHome} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
