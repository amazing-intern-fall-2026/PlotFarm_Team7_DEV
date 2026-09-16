import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt = "", fallbackSrc = "/images/plot-1.jpg", onError, ...props }, ref) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(className)}
        onError={(e) => {
          if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
            e.currentTarget.src = fallbackSrc;
          }
          if (onError) {
            onError(e);
          }
        }}
        {...props}
      />
    );
  }
);
Image.displayName = "Image";
