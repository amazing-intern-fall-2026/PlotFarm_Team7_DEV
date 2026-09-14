import * as React from "react";
import { Navigate } from "react-router-dom";
import { Box, Skeleton } from "@/shared/ui";
import { useDevice } from "@/shared/lib/device";
import { ROLE_HOME_ROUTES } from "../../constants";
import { getStoredUser, isAuthenticated } from "../../model/authCookie";
import { AuthSupportFab } from "../AuthSupportFab";

// Dynamic imports for device branching
const RegisterDesktopView = React.lazy(() =>
  import("./RegisterDesktopView").then((mod) => ({ default: mod.RegisterDesktopView }))
);

const RegisterMobileView = React.lazy(() =>
  import("./RegisterMobileView").then((mod) => ({ default: mod.RegisterMobileView }))
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

export function RegisterPage() {
  const { isDesktop } = useDevice();

  const user = getStoredUser();
  if (user && isAuthenticated()) {
    const dest = ROLE_HOME_ROUTES[user.role] ?? "/";
    return <Navigate to={dest} replace />;
  }

  return (
    <Box className="fixed inset-0 w-full h-full overflow-hidden bg-background">
      <React.Suspense fallback={<AuthFallback />}>
        {isDesktop ? <RegisterDesktopView /> : <RegisterMobileView />}
      </React.Suspense>
      <AuthSupportFab />
    </Box>
  );
}

export default RegisterPage;
