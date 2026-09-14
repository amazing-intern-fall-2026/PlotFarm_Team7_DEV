import * as React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Box, Skeleton } from "@/shared/ui";
import { useDevice } from "@/shared/lib/device";
import { AUTH_ROUTES, ROLE_HOME_ROUTES } from "../constants";
import { getStoredUser, isAuthenticated } from "../model/authCookie";

// Code-splitting / Dynamic import: Mobile không tải bundle Desktop Hero, Desktop không tải Mobile Sheet
const LoginDesktopView = React.lazy(() =>
  import("./LoginDesktopView").then((mod) => ({ default: mod.LoginDesktopView }))
);

const LoginMobileView = React.lazy(() =>
  import("./LoginMobileView").then((mod) => ({ default: mod.LoginMobileView }))
);

function AuthFallback() {
  return (
    <Box className="fixed inset-0 flex items-center justify-center bg-background p-6">
      <Box className="w-full max-w-md space-y-4">
        <Skeleton className="h-10 w-32 mx-auto rounded-lg" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </Box>
    </Box>
  );
}

export interface LoginPageProps {
  initialTab?: "login" | "register";
}

export function LoginPage({ initialTab }: LoginPageProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDesktop } = useDevice();

  const isRegisterRoute = location.pathname === AUTH_ROUTES.REGISTER;
  const defaultTab: "login" | "register" = initialTab ?? (isRegisterRoute ? "register" : "login");
  const [tab, setTab] = React.useState<"login" | "register">(defaultTab);

  React.useEffect(() => {
    if (location.pathname === AUTH_ROUTES.REGISTER) {
      setTab("register");
    } else if (location.pathname === AUTH_ROUTES.LOGIN) {
      setTab("login");
    }
  }, [location.pathname]);

  const handleTabChange = (newTab: "login" | "register") => {
    setTab(newTab);
    const targetRoute = newTab === "register" ? AUTH_ROUTES.REGISTER : AUTH_ROUTES.LOGIN;
    if (location.pathname !== targetRoute) {
      navigate(targetRoute);
    }
  };

  const user = getStoredUser();
  if (user && isAuthenticated()) {
    const dest = ROLE_HOME_ROUTES[user.role] ?? "/";
    return <Navigate to={dest} replace />;
  }

  return (
    <Box className="fixed inset-0 w-full h-full overflow-hidden bg-background">
      <React.Suspense fallback={<AuthFallback />}>
        {isDesktop ? (
          <LoginDesktopView tab={tab} onTabChange={handleTabChange} />
        ) : (
          <LoginMobileView tab={tab} onTabChange={handleTabChange} />
        )}
      </React.Suspense>
    </Box>
  );
}

export function RegisterPage() {
  return <LoginPage initialTab="register" />;
}

export default LoginPage;

