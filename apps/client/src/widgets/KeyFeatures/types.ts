import type { ReactNode } from "react";

export interface KeyFeatureItem {
  id: string;
  badgeCategory: string;
  title: string;
  tagline: string;
  description: string;
  pillHighlight: string;
  icon: ReactNode;
  actionText: string;
  actionLink: string;
  accentColor: "emerald" | "sky" | "amber";
}

export interface KeyFeaturesProps {
  className?: string;
  title?: string;
  subtitle?: string;
  badgeLabel?: string;
}

export interface KeyFeaturesViewProps extends KeyFeaturesProps {
  onNavigatePlots: () => void;
}
