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
  brandText = "CloudFarm",
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
    if (brandText === "CloudFarm") {
      return (
        <>
          Cloud<span className="text-[#23a54f]">Farm</span>
        </>
      );
    }
    if (brandText === "PlotFarm") {
      return (
        <>
          Plot<span className="text-[#23a54f]">Farm</span>
        </>
      );
    }
    if (brandText === "GreenFarm" || brandText === "Green Farm") {
      return (
        <>
          Green <span className="text-[#23a54f]">Farm</span>
        </>
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
