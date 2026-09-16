import * as React from "react";
import { cn } from "@/shared/lib/utils";

export type BoxElement =
  | "div"
  | "section"
  | "article"
  | "main"
  | "aside"
  | "header"
  | "footer"
  | "nav"
  | "form";

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  as?: BoxElement;
  noValidate?: boolean;
  children?: React.ReactNode;
}

export const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ as = "div", className, children, ...props }, ref) => {
    return React.createElement(
      as,
      {
        ref,
        className: cn(className),
        ...props,
      },
      children,
    );
  },
);

Box.displayName = "Box";

export interface FlexProps extends BoxProps {
  direction?: "row" | "col" | "row-reverse" | "col-reverse";
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  gap?: number | string;
}

export const Flex = React.forwardRef<HTMLElement, FlexProps>(
  ({ className, direction, align, justify, wrap, gap, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn(
          "flex",
          direction && (direction === "col" ? "flex-col" : direction === "row" ? "flex-row" : `flex-${direction}`),
          align && `items-${align}`,
          justify && (justify === "between" ? "justify-between" : justify === "center" ? "justify-center" : `justify-${justify}`),
          wrap && `flex-${wrap}`,
          gap !== undefined && (typeof gap === "number" ? `gap-${gap}` : gap),
          className
        )}
        {...props}
      />
    );
  }
);
Flex.displayName = "Flex";

export interface GridProps extends BoxProps {
  cols?: number | string;
  colsSm?: number | string;
  colsMd?: number | string;
  colsLg?: number | string;
  gap?: number | string;
}

export const Grid = React.forwardRef<HTMLElement, GridProps>(
  ({ className, cols, colsSm, colsMd, colsLg, gap, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn(
          "grid",
          cols && (typeof cols === "number" ? `grid-cols-${cols}` : cols),
          colsSm && (typeof colsSm === "number" ? `sm:grid-cols-${colsSm}` : colsSm),
          colsMd && (typeof colsMd === "number" ? `md:grid-cols-${colsMd}` : colsMd),
          colsLg && (typeof colsLg === "number" ? `lg:grid-cols-${colsLg}` : colsLg),
          gap !== undefined && (typeof gap === "number" ? `gap-${gap}` : gap),
          className
        )}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";

