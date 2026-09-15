import { useDevice } from "@/shared/lib/device";
import { PlotGridMapDesktop } from "./PlotGridMapDesktop";
import { PlotGridMapMobile } from "./PlotGridMapMobile";
import type { PlotGridMapProps } from "./types";

export * from "./types";
export * from "./constants";
export * from "./PlotCard";
export * from "./PlotGridSkeleton";
export * from "./PlotDetailDrawer";
export * from "./PlotGridMapDesktop";
export * from "./PlotGridMapMobile";

export function PlotGridMap(props: PlotGridMapProps) {
  const { isMobile } = useDevice();

  return isMobile ? (
    <PlotGridMapMobile {...props} />
  ) : (
    <PlotGridMapDesktop {...props} />
  );
}
