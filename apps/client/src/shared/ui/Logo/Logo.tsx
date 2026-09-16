import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  brandText?: string;
}

export function Logo({
  size = "md",
  showText = false,
  brandText = "Green Farm",
  className,
  ...props
}: LogoProps) {
  const sizeMap = {
    sm: { icon: "h-8 w-8", text: "text-base" },
    md: { icon: "h-10 w-10", text: "text-xl" },
    lg: { icon: "h-14 w-14", text: "text-2xl" },
    xl: { icon: "h-20 w-20", text: "text-3xl" },
  }[size];

  const renderBrandText = () => {
    if (brandText === "Green Farm") {
      return (
        <>
          Green <span className="text-primary">Farm</span>
        </>
      );
    }
    if (brandText === "CloudFarm") {
      return (
        <>
          Cloud<span className="text-primary">Farm</span>
        </>
      );
    }
    if (brandText === "PlotFarm") {
      return (
        <>
          Plot<span className="text-primary">Farm</span>
        </>
      );
    }
    if (brandText === "BioCloud" || brandText === "BioCloud Farming Admin") {
      return (
        <div className="flex flex-col text-left leading-none">
          <span className="font-extrabold text-foreground text-base tracking-tight">
            Bio<span className="text-primary">Cloud</span>
          </span>
          <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase mt-0.5">
            FARMING ADMIN
          </span>
        </div>
      );
    }
    return brandText;
  };

  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)} {...props}>
      <img
        src="/images/logo-1.png"
        alt="Logo"
        className={cn(
          "shrink-0 object-contain transition-transform hover:scale-105",
          sizeMap.icon
        )}
      />
      {showText && (
        <span className={cn("font-bold tracking-tight text-foreground", sizeMap.text)}>
          {renderBrandText()}
        </span>
      )}
    </div>
  );
}
