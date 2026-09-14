import * as React from "react";
import { AuthPageShell } from "../common";

// Dynamic imports for device branching
const LoginDesktopView = React.lazy(() =>
  import("./LoginDesktopView").then((mod) => ({ default: mod.LoginDesktopView }))
);

const LoginMobileView = React.lazy(() =>
  import("./LoginMobileView").then((mod) => ({ default: mod.LoginMobileView }))
);

export function LoginPage() {
  return (
    <AuthPageShell
      desktopView={<LoginDesktopView />}
      mobileView={<LoginMobileView />}
    />
  );
}
