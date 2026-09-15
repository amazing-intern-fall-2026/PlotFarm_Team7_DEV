import type { ReactNode } from "react";

export interface FarmJourneyStepItem {
  stepNumber: string;
  title: string;
  description: string;
  icon: ReactNode;
  iconBgClass: string;
  iconColorClass: string;
}

export interface FarmJourneyProps {
  className?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
}

export interface FarmJourneyViewProps extends FarmJourneyProps {
  steps: FarmJourneyStepItem[];
}
