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
