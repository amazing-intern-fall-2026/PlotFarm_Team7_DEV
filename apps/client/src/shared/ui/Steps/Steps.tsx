import * as React from "react";
import { Check, X, Circle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export type StepState = "completed" | "current" | "upcoming" | "error";

export interface StepItem {
  id?: string | number;
  title: string;
  description?: string;
  state?: StepState;
  subCard?: React.ReactNode;
}

export interface StepsProps {
  steps: StepItem[];
  currentStep?: number; // 0-indexed
  variant?: "horizontal" | "vertical" | "pills" | "compact" | "inline";
  className?: string;
  onStepClick?: (stepIndex: number) => void;
}

export const Steps: React.FC<StepsProps> = ({
  steps,
  currentStep = 0,
  variant = "horizontal",
  className,
  onStepClick,
}) => {
  const resolvedSteps = steps.map((s, idx) => {
    let resolvedState: StepState = s.state || "upcoming";
    if (!s.state) {
      if (idx < currentStep) resolvedState = "completed";
      else if (idx === currentStep) resolvedState = "current";
      else resolvedState = "upcoming";
    }
    return { ...s, state: resolvedState };
  });

  if (variant === "compact" || variant === "inline") {
    return (
      <nav
        className={cn(
          "w-full flex items-center justify-between sm:justify-center sm:gap-6 font-sans select-none text-xs",
          className
        )}
        aria-label="Progress Stepper"
      >
        {resolvedSteps.map((step, idx) => {
          const isLast = idx === resolvedSteps.length - 1;
          const isCompleted = step.state === "completed";
          const isCurrent = step.state === "current";

          return (
            <React.Fragment key={step.id || idx}>
              <div
                className={cn(
                  "flex items-center gap-2 transition-colors shrink-0",
                  onStepClick ? "cursor-pointer" : "cursor-default"
                )}
                onClick={() => onStepClick?.(idx)}
              >
                <div
                  className={cn(
                    "flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-xs font-bold transition-all shrink-0",
                    isCompleted && "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300",
                    isCurrent && "bg-emerald-700 text-white shadow-xs font-bold ring-2 ring-emerald-700/20",
                    step.state === "upcoming" && "bg-slate-100 text-slate-400 dark:bg-slate-800"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[3] text-emerald-700 dark:text-emerald-300" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "whitespace-nowrap text-xs font-semibold",
                    isCurrent
                      ? "text-slate-900 dark:text-white font-bold"
                      : isCompleted
                        ? "text-emerald-800 dark:text-emerald-400"
                        : "text-slate-400 dark:text-slate-500"
                  )}
                >
                  {step.title}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "flex-1 max-w-[60px] sm:max-w-[120px] h-0.5 transition-colors mx-1 sm:mx-3",
                    isCompleted ? "bg-emerald-600" : "bg-slate-200 dark:bg-slate-700"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </nav>
    );
  }

  if (variant === "pills") {
    return (
      <nav
        className={cn("flex flex-wrap items-center gap-2.5 font-sans select-none", className)}
        aria-label="Progress Stepper Pills"
      >
        {resolvedSteps.map((step, idx) => {
          const isCompleted = step.state === "completed";
          const isCurrent = step.state === "current";
          const isError = step.state === "error";

          return (
            <button
              type="button"
              key={step.id || idx}
              onClick={() => onStepClick?.(idx)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all",
                isCompleted &&
                  "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
                isCurrent &&
                  "border-2 border-primary text-primary bg-primary/5 hover:bg-primary/10",
                isError &&
                  "bg-destructive text-destructive-foreground shadow-xs",
                step.state === "upcoming" &&
                  "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {isCompleted ? (
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              ) : isCurrent ? (
                <Circle className="h-2.5 w-2.5 fill-primary stroke-none" />
              ) : isError ? (
                <X className="h-3.5 w-3.5 stroke-[3]" />
              ) : null}
              <span>{step.title}</span>
            </button>
          );
        })}
      </nav>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={cn("relative space-y-6 font-sans select-none", className)}>
        {resolvedSteps.map((step, idx) => {
          const isLast = idx === resolvedSteps.length - 1;
          const isCompleted = step.state === "completed";
          const isCurrent = step.state === "current";
          const isError = step.state === "error";

          return (
            <div key={step.id || idx} className="relative flex items-start gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all z-10",
                    isCompleted && "bg-primary text-primary-foreground shadow-xs",
                    isCurrent &&
                      "border-2 border-primary bg-background text-primary ring-4 ring-primary/15",
                    isError && "bg-destructive text-destructive-foreground shadow-xs",
                    step.state === "upcoming" &&
                      "border-2 border-border bg-muted/40 text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 stroke-[3]" />
                  ) : isError ? (
                    <X className="h-4 w-4 stroke-[3]" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                {!isLast && (
                  <div
                    className={cn(
                      "w-0.5 min-h-[44px] my-1 transition-colors",
                      isCompleted ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </div>

              <div className="flex-1 pt-1 pb-4 min-w-0">
                <div
                  className={cn(
                    "text-sm font-bold leading-tight",
                    isCurrent ? "text-primary" : isError ? "text-destructive" : "text-foreground"
                  )}
                >
                  {step.title}
                </div>
                {step.description && (
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                )}

                {step.subCard && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-muted/40 border border-border/80 text-xs text-muted-foreground italic">
                    {step.subCard}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("w-full font-sans select-none", className)}>
      <div className="flex items-center justify-between">
        {resolvedSteps.map((step, idx) => {
          const isLast = idx === resolvedSteps.length - 1;
          const isCompleted = step.state === "completed";
          const isCurrent = step.state === "current";
          const isError = step.state === "error";

          return (
            <React.Fragment key={step.id || idx}>
              <div
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => onStepClick?.(idx)}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all",
                    isCompleted && "bg-primary text-primary-foreground shadow-xs",
                    isCurrent &&
                      "border-2 border-primary bg-background text-primary ring-4 ring-primary/20",
                    isError && "bg-destructive text-destructive-foreground shadow-xs",
                    step.state === "upcoming" &&
                      "border-2 border-border bg-muted/40 text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 stroke-[3]" />
                  ) : isError ? (
                    <X className="h-4 w-4 stroke-[3]" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                <div className="mt-2 text-center">
                  <div
                    className={cn(
                      "text-xs font-bold transition-colors whitespace-nowrap",
                      isCompleted && "text-foreground",
                      isCurrent && "text-primary",
                      isError && "text-destructive",
                      step.state === "upcoming" && "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="text-[10px] text-muted-foreground">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>

              {!isLast && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-4 -mt-6 transition-colors",
                    isCompleted ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
