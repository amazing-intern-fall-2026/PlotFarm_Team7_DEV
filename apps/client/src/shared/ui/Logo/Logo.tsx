import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export function Logo({
  size = "md",
  showText = false,
  className,
  ...props
}: LogoProps) {
  const sizeMap = {
    sm: { icon: "h-8 w-8 rounded-lg", text: "text-base" },
    md: { icon: "h-10 w-10 rounded-xl", text: "text-xl" },
    lg: { icon: "h-14 w-14 rounded-2xl", text: "text-2xl" },
    xl: { icon: "h-20 w-20 rounded-3xl", text: "text-3xl" },
  }[size];

  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)} {...props}>
      <div
        className={cn(
          "flex items-center justify-center bg-white shadow-xs shrink-0 overflow-hidden p-0.5 border border-border/40 transition-transform hover:scale-105",
          sizeMap.icon
        )}
      >
        {/* Official Green Farm Brand Logo */}
        <img
          src="/images/logo.png"
          alt="Green Farm Logo"
          className="h-full w-full object-contain"
        />
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight text-foreground", sizeMap.text)}>
          Green <span className="text-[#23a54f]">Farm</span>
        </span>
      )}
    </div>
  );
}
