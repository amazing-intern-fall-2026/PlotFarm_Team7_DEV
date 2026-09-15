import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { useT } from "@/shared/lib/i18n";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "lead"
  | "large"
  | "small"
  | "muted";

export type TypographyElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "label"
  | "small"
  | "strong"
  | "blockquote";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: TypographyElement;
  variant?: TypographyVariant;
  i18nKey?: string;
  children?: React.ReactNode;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: "text-3xl font-extrabold tracking-tight text-foreground",
  h2: "text-2xl font-bold tracking-tight text-foreground",
  h3: "text-xl font-bold tracking-tight text-foreground",
  h4: "text-lg font-bold tracking-tight text-foreground",
  h5: "text-base font-semibold text-foreground",
  h6: "text-sm font-semibold text-foreground",
  p: "text-sm text-foreground leading-relaxed",
  lead: "text-base text-muted-foreground leading-relaxed font-normal",
  large: "text-base font-semibold text-foreground",
  small: "text-xs text-muted-foreground font-medium",
  muted: "text-xs text-muted-foreground",
};

const TypographyRoot = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      as,
      variant,
      i18nKey,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { t } = useT();
    const resolvedElement = as || (variant as TypographyElement) || "p";
    const resolvedVariant: TypographyVariant = variant || (
      ["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(resolvedElement)
        ? (resolvedElement as TypographyVariant)
        : "p"
    );

    const translatedText = i18nKey ? t(i18nKey) : null;
    const content = translatedText && translatedText !== i18nKey ? translatedText : (children ?? translatedText);

    return React.createElement(
      resolvedElement,
      {
        ref,
        className: cn(variantStyles[resolvedVariant], className),
        ...props,
      },
      content
    );
  }
);

TypographyRoot.displayName = "Typography";

export const Heading = React.forwardRef<
  HTMLHeadingElement,
  TypographyProps & { level?: 1 | 2 | 3 | 4 | 5 | 6 }
>(({ level = 1, as, variant, ...props }, ref) => {
  const tag = as || (`h${level}` as TypographyElement);
  const v = variant || (`h${level}` as TypographyVariant);
  return <TypographyRoot ref={ref} as={tag} variant={v} {...props} />;
});
Heading.displayName = "Heading";

export const Text = React.forwardRef<
  HTMLParagraphElement,
  TypographyProps
>(({ as = "p", variant = "p", ...props }, ref) => (
  <TypographyRoot ref={ref} as={as} variant={variant} {...props} />
));
Text.displayName = "Text";

export const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  TypographyProps
>(({ as = "p", variant = "p", ...props }, ref) => (
  <TypographyRoot ref={ref} as={as} variant={variant} {...props} />
));
Paragraph.displayName = "Paragraph";

export const Typography = Object.assign(TypographyRoot, {
  H1: (props: TypographyProps) => <TypographyRoot as="h1" variant="h1" {...props} />,
  H2: (props: TypographyProps) => <TypographyRoot as="h2" variant="h2" {...props} />,
  H3: (props: TypographyProps) => <TypographyRoot as="h3" variant="h3" {...props} />,
  H4: (props: TypographyProps) => <TypographyRoot as="h4" variant="h4" {...props} />,
  H5: (props: TypographyProps) => <TypographyRoot as="h5" variant="h5" {...props} />,
  H6: (props: TypographyProps) => <TypographyRoot as="h6" variant="h6" {...props} />,
  P: (props: TypographyProps) => <TypographyRoot as="p" variant="p" {...props} />,
  Text: (props: TypographyProps) => <TypographyRoot as="span" variant="p" {...props} />,
  Lead: (props: TypographyProps) => <TypographyRoot as="p" variant="lead" {...props} />,
  Small: (props: TypographyProps) => <TypographyRoot as="small" variant="small" {...props} />,
  Muted: (props: TypographyProps) => <TypographyRoot as="span" variant="muted" {...props} />,
});
