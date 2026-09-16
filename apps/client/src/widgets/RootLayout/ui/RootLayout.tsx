import * as React from "react";
import { useDevice } from "@/shared/lib/device";
import { useRootLayout } from "../model/useRootLayout";
import { RootLayoutSkeleton } from "./RootLayoutSkeleton";
import type { RootLayoutProps } from "../model/types";

// Dynamic Code Splitting for Desktop & Mobile views
const RootLayoutDesktop = React.lazy(() => import("./RootLayoutDesktop"));
const RootLayoutMobile = React.lazy(() => import("./RootLayoutMobile"));

export function RootLayout(props: RootLayoutProps) {
  const { isMobile } = useDevice();
  const viewProps = useRootLayout(props);

  return (
    <React.Suspense fallback={<RootLayoutSkeleton className={props.className} />}>
      {isMobile ? (
        <RootLayoutMobile {...viewProps} />
      ) : (
        <RootLayoutDesktop {...viewProps} />
      )}
    </React.Suspense>
  );
}

RootLayout.displayName = "RootLayout";

export { RootLayout as AppShell };
