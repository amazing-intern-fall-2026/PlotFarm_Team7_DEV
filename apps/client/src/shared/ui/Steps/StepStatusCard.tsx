import * as React from "react";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface StepStatusCardProps {
  title: string;
  subtitle: string;
  status?: "complete" | "processing" | "attention";
  className?: string;
}

export const StepStatusCard: React.FC<StepStatusCardProps> = ({
  title,
  subtitle,
  status = "complete",
  className,
}) => {
  const config = {
    complete: {
      icon: CheckCircle2,
      iconClass: "text-emerald-600 bg-emerald-50",
      borderClass: "border-l-4 border-l-primary border border-border",
    },
    processing: {
      icon: Clock,
      iconClass: "text-amber-600 bg-amber-50",
      borderClass: "border-l-4 border-l-amber-500 border border-border",
    },
    attention: {
      icon: AlertCircle,
      iconClass: "text-red-600 bg-red-50",
      borderClass: "border-l-4 border-l-destructive border border-border",
    },
  }[status];

  const Icon = config.icon;

  return (
    <div
      className={cn(
        "p-4 rounded-2xl bg-card shadow-xs font-sans space-y-2 select-none transition-all",
        config.borderClass,
        className
      )}
    >
      <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center", config.iconClass)}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-sm font-bold text-foreground leading-tight">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{subtitle}</div>
      </div>
    </div>
  );
};
