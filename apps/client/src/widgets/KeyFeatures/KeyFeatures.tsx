import { useNavigate } from "react-router-dom";
import { useDevice } from "@/shared/lib/device";
import { KeyFeaturesDesktop } from "./KeyFeaturesDesktop";
import { KeyFeaturesMobile } from "./KeyFeaturesMobile";
import type { KeyFeaturesProps } from "./types";

export * from "./types";
export * from "./constants";
export * from "./KeyFeaturesDesktop";
export * from "./KeyFeaturesMobile";

export function KeyFeatures(props: KeyFeaturesProps) {
  const { isMobile } = useDevice();
  const navigate = useNavigate();

  const handleNavigatePlots = () => {
    navigate("/plots");
  };

  if (isMobile) {
    return <KeyFeaturesMobile {...props} onNavigatePlots={handleNavigatePlots} />;
  }

  return <KeyFeaturesDesktop {...props} onNavigatePlots={handleNavigatePlots} />;
}
