import * as React from "react";
import { Navigate } from "react-router-dom";
import { Box } from "@/shared/ui";
import { ROLE_HOME_ROUTES } from "../constants";
import { getStoredUser, isAuthenticated } from "../model/authSession";
import { LoginDesktopView } from "./LoginDesktopView";
import { LoginMobileView } from "./LoginMobileView";

export function LoginPage() {
  const [tab, setTab] = React.useState<"login" | "register">("login");

  const user = getStoredUser();
  if (user && isAuthenticated()) {
    const dest = ROLE_HOME_ROUTES[user.role] ?? "/";
    return <Navigate to={dest} replace />;
  }

  return (
    <Box className="fixed inset-0 w-full h-full overflow-hidden bg-background">
      {/* Giao diện Desktop (Màn hình lớn >= 1024px) */}
      <Box className="hidden lg:block w-full h-full overflow-hidden">
        <LoginDesktopView tab={tab} onTabChange={setTab} />
      </Box>

      {/* Giao diện Mobile & Tablet (Màn hình nhỏ < 1024px) */}
      <Box className="block lg:hidden w-full h-full overflow-y-auto">
        <LoginMobileView tab={tab} onTabChange={setTab} />
      </Box>
    </Box>
  );
}

export default LoginPage;
