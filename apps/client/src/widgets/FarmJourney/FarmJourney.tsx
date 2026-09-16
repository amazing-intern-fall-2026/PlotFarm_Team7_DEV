import * as React from "react";
import { LayoutGrid, Video, Sprout, Truck } from "lucide-react";
import { useDevice } from "@/shared/lib/device";
import { FARM_JOURNEY_MESSAGES } from "./constants";
import { FarmJourneyDesktop } from "./FarmJourneyDesktop";
import { FarmJourneyMobile } from "./FarmJourneyMobile";
import type { FarmJourneyProps, FarmJourneyStepItem, FarmJourneyViewProps } from "./types";

export * from "./types";
export * from "./constants";
export * from "./FarmJourneyDesktop";
export * from "./FarmJourneyMobile";

export function FarmJourney(props: FarmJourneyProps) {
  const { isMobile } = useDevice();

  const steps: FarmJourneyStepItem[] = React.useMemo(
    () => [
      {
        stepNumber: FARM_JOURNEY_MESSAGES.STEP1_NUMBER,
        title: FARM_JOURNEY_MESSAGES.STEP1_TITLE,
        description: FARM_JOURNEY_MESSAGES.STEP1_DESC,
        icon: <LayoutGrid className="h-5 w-5" />,
        iconBgClass: "bg-sky-100/70 dark:bg-sky-950/60",
        iconColorClass: "text-sky-700 dark:text-sky-300",
      },
      {
        stepNumber: FARM_JOURNEY_MESSAGES.STEP2_NUMBER,
        title: FARM_JOURNEY_MESSAGES.STEP2_TITLE,
        description: FARM_JOURNEY_MESSAGES.STEP2_DESC,
        icon: <Video className="h-5 w-5" />,
        iconBgClass: "bg-sky-100/70 dark:bg-sky-950/60",
        iconColorClass: "text-sky-700 dark:text-sky-300",
      },
      {
        stepNumber: FARM_JOURNEY_MESSAGES.STEP3_NUMBER,
        title: FARM_JOURNEY_MESSAGES.STEP3_TITLE,
        description: FARM_JOURNEY_MESSAGES.STEP3_DESC,
        icon: <Sprout className="h-5 w-5" />,
        iconBgClass: "bg-amber-100/70 dark:bg-amber-950/60",
        iconColorClass: "text-amber-700 dark:text-amber-300",
      },
      {
        stepNumber: FARM_JOURNEY_MESSAGES.STEP4_NUMBER,
        title: FARM_JOURNEY_MESSAGES.STEP4_TITLE,
        description: FARM_JOURNEY_MESSAGES.STEP4_DESC,
        icon: <Truck className="h-5 w-5" />,
        iconBgClass: "bg-emerald-100/70 dark:bg-emerald-950/60",
        iconColorClass: "text-emerald-700 dark:text-emerald-300",
      },
    ],
    []
  );

  const viewProps: FarmJourneyViewProps = {
    ...props,
    steps,
  };

  if (isMobile) {
    return <FarmJourneyMobile {...viewProps} />;
  }

  return <FarmJourneyDesktop {...viewProps} />;
}
