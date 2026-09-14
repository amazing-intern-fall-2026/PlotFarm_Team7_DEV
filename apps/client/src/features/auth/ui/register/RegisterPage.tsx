import * as React from "react";
import { AuthPageShell } from "../common";

// Dynamic imports for device branching
const RegisterDesktopView = React.lazy(() =>
  import("./RegisterDesktopView").then((mod) => ({ default: mod.RegisterDesktopView }))
);

const RegisterMobileView = React.lazy(() =>
  import("./RegisterMobileView").then((mod) => ({ default: mod.RegisterMobileView }))
);

export function RegisterPage() {
  return (
    <AuthPageShell
      desktopView={<RegisterDesktopView />}
      mobileView={<RegisterMobileView />}
    />
  );
}
