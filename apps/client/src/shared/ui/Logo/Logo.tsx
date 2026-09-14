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
    sm: { icon: "h-7 w-7 rounded-lg", text: "text-base", svgSize: 18 },
    md: { icon: "h-9 w-9 rounded-xl", text: "text-xl", svgSize: 22 },
    lg: { icon: "h-12 w-12 rounded-2xl", text: "text-2xl", svgSize: 28 },
    xl: { icon: "h-16 w-16 rounded-3xl", text: "text-3xl", svgSize: 38 }
  }[size];

  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)} {...props}>
      <div
        className={cn(
          "flex items-center justify-center bg-[#23a54f] text-white shadow-xs shrink-0 transition-transform hover:scale-105",
          sizeMap.icon
        )}
      >
        {/* Seedling Sprout in Ground Icon matching Green Farm Brand */}
        <svg
          viewBox="0 0 24 24"
          width={sizeMap.svgSize}
          height={sizeMap.svgSize}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M7 20h10" />
          <path d="M10 20c5.5-2.5.8-6.4 3-10" />
          <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
          <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
        </svg>
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight text-foreground", sizeMap.text)}>
          Green <span className="text-[#23a54f]">Farm</span>
        </span>
      )}
    </div>
  );
}
