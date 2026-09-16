import type { PlotUiItem } from "@/entities/plot";

export interface PlotCardProps {
  plot: PlotUiItem;
  onSelect?: (plot: PlotUiItem) => void;
  className?: string;
}

export interface PlotGridMapProps {
  plots: PlotUiItem[];
  loading?: boolean;
  selectedPlotId?: string | null;
  onSelectPlot?: (plot: PlotUiItem) => void;
  className?: string;
}
