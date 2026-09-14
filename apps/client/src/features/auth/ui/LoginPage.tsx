import * as React from "react";
import { Navigate } from "react-router-dom";
import { Box, Skeleton } from "@/shared/ui";
import { useDevice } from "@/shared/lib/device";
import { ROLE_HOME_ROUTES } from "../constants";
import { getStoredUser, isAuthenticated } from "../model/authSession";

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

export function LoginPage() {
  const [tab, setTab] = React.useState<"login" | "register">("login");
  const { isDesktop } = useDevice();

  const user = getStoredUser();
  if (user && isAuthenticated()) {
    const dest = ROLE_HOME_ROUTES[user.role] ?? "/";
    return <Navigate to={dest} replace />;
  }

  return (
    <Box className="fixed inset-0 w-full h-full overflow-hidden bg-background">
      <React.Suspense fallback={<AuthFallback />}>
        {isDesktop ? (
          <LoginDesktopView tab={tab} onTabChange={setTab} />
        ) : (
          <LoginMobileView tab={tab} onTabChange={setTab} />
        )}
      </React.Suspense>
    </Box>
  );
}

export default LoginPage;
