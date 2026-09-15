import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface SliderMark {
  value: number;
  label: string;
}

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  helperText?: string;
  error?: string;
  showInput?: boolean;
  inputUnit?: string;
  marks?: SliderMark[];
  showTooltip?: boolean;
  onChange?: (value: number) => void;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      label,
      helperText,
      error,
      showInput = false,
      inputUnit = "",
      marks,
      showTooltip = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<number>(
      isControlled ? controlledValue : defaultValue
    );

    const currentValue = isControlled ? controlledValue : internalValue;

    const percentage = Math.min(
      100,
      Math.max(0, ((currentValue - min) / (max - min)) * 100)
    );

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = Number(e.target.value);
      if (!isControlled) {
        setInternalValue(num);
      }
      onChange?.(num);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = Number(e.target.value);
      if (!isNaN(num)) {
        const clamped = Math.min(max, Math.max(min, num));
        if (!isControlled) {
          setInternalValue(clamped);
        }
        onChange?.(clamped);
      }
    };

    return (
      <div className={cn("w-full font-sans select-none", className)}>
        {/* Top Header: Label & Optional Value Display */}
        {label && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {label}
            </span>
          </div>
        )}

        <div className="flex items-center gap-4">
          {/* Slider Track Wrapper */}
          <div className="relative flex-1 flex items-center h-8">
            {/* Background Track */}
            <div className="absolute w-full h-2 rounded-full bg-muted border border-border/80" />

            {/* Filled Progress Bar */}
            <div
              className={cn(
                "absolute h-2 rounded-full transition-all duration-75",
                disabled ? "bg-muted-foreground/40" : "bg-primary"
              )}
              style={{ width: `${percentage}%` }}
            />

            {/* Tooltip on Thumb (if enabled) */}
            {showTooltip && (
              <div
                className="absolute -top-7 -translate-x-1/2 px-2 py-0.5 rounded-md bg-foreground text-background text-[11px] font-bold shadow-xs transition-all pointer-events-none"
                style={{ left: `${percentage}%` }}
              >
                {currentValue}
                {inputUnit}
              </div>
            )}

            {/* Native Hidden-Range Input for Full Accessibility */}
            <input
              ref={ref}
              type="range"
              min={min}
              max={max}
              step={step}
              value={currentValue}
              disabled={disabled}
              onChange={handleSliderChange}
              className={cn(
                "absolute w-full h-2 opacity-0 cursor-pointer z-10",
                disabled && "cursor-not-allowed pointer-events-none"
              )}
              aria-label={label || "Slider"}
              aria-valuenow={currentValue}
              aria-valuemin={min}
              aria-valuemax={max}
              {...props}
            />

            {/* Custom Interactive Thumb */}
            <div
              className={cn(
                "absolute h-5 w-5 rounded-full border-2 border-background shadow-md transition-all duration-75 -translate-x-1/2 pointer-events-none",
                disabled
                  ? "bg-muted-foreground/60 shadow-none"
                  : "bg-primary hover:scale-110 active:scale-125 ring-4 ring-primary/20"
              )}
              style={{ left: `${percentage}%` }}
            />
          </div>

          {/* Right Input Box */}
          {showInput && (
            <div className="shrink-0 flex items-center justify-center">
              <input
                type="number"
                min={min}
                max={max}
                value={currentValue}
                disabled={disabled}
                onChange={handleInputChange}
                className={cn(
                  "w-16 h-10 px-2 text-center text-sm font-extrabold rounded-xl border border-input bg-card text-foreground shadow-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all",
                  disabled && "opacity-50 cursor-not-allowed bg-muted"
                )}
                aria-label={`${label || "Value"} Input`}
              />
            </div>
          )}
        </div>

        {/* Stepped Marks / Labels along the Track */}
        {marks && marks.length > 0 && (
          <div className="relative w-full flex justify-between mt-3 px-1 text-[11px] font-bold uppercase text-muted-foreground">
            {marks.map((mark) => {
              const markPercent = ((mark.value - min) / (max - min)) * 100;
              const isSelected = currentValue >= mark.value;
              return (
                <div
                  key={mark.value}
                  className="flex flex-col items-center cursor-pointer transition-colors"
                  style={{ left: `${markPercent}%` }}
                  onClick={() => {
                    if (!disabled) {
                      if (!isControlled) setInternalValue(mark.value);
                      onChange?.(mark.value);
                    }
                  }}
                >
                  <span
                    className={cn(
                      "transition-colors",
                      isSelected && !disabled ? "text-primary font-extrabold" : "text-muted-foreground"
                    )}
                  >
                    {mark.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Helper text or Error message */}
        {error ? (
          <p className="mt-1.5 text-xs text-destructive font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-muted-foreground">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Slider.displayName = "Slider";
