import * as React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface BreadcrumbItemData {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  isActive?: boolean;
}

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  /** Danh sách breadcrumbs dạng mảng tiện lợi (data-driven) */
  items?: BreadcrumbItemData[];
  /** Tự động hiển thị biểu tượng Home ở đầu */
  showHomeIcon?: boolean;
  /** Đường dẫn khi bấm vào biểu tượng Home */
  homeHref?: string;
  /** Callback khi bấm vào biểu tượng Home */
  onHomeClick?: () => void;
  /** Ký tự hoặc icon phân cách tùy biến giữa các mục */
  separator?: React.ReactNode;
}

/**
 * Breadcrumb — Thanh điều hướng phân cấp (Breadcrumb Trail).
 * Hỗ trợ cả 2 cách dùng:
 * 1. Truyền mảng tiện lợi qua prop `items={[...]}`
 * 2. Cấu trúc ghép nối linh hoạt: `<Breadcrumb><BreadcrumbList><BreadcrumbItem>...`
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      showHomeIcon = false,
      homeHref = "/",
      onHomeClick,
      separator,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    // Nếu truyền items dạng mảng, tự động render theo chuẩn
    if (items && items.length > 0) {
      return (
        <nav
          ref={ref}
          aria-label="Breadcrumb"
          className={cn("flex items-center font-sans", className)}
          {...props}
        >
          <BreadcrumbList>
            {/* Icon Home ở đầu nếu được bật */}
            {showHomeIcon && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={homeHref}
                    onClick={onHomeClick}
                    className="flex items-center text-rose-500 hover:text-rose-600 dark:text-rose-400"
                    aria-label="Trang chủ"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-current"
                      aria-hidden="true"
                    >
                      <path d="M12 2.1 1 12h3v9h6v-6h4v6h6v-9h3L12 2.1z" />
                    </svg>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
              </>
            )}

            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              const isCurrent = item.isActive !== undefined ? item.isActive : isLast;

              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {isCurrent ? (
                      <BreadcrumbPage className="flex items-center gap-1.5 font-bold text-foreground">
                        {item.icon}
                        <span>{item.label}</span>
                      </BreadcrumbPage>
                    ) : item.href ? (
                      <BreadcrumbLink
                        href={item.href}
                        onClick={item.onClick}
                        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-medium"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </BreadcrumbLink>
                    ) : item.onClick ? (
                      <button
                        type="button"
                        onClick={item.onClick}
                        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-medium"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ) : (
                      <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
                        {item.icon}
                        <span>{item.label}</span>
                      </span>
                    )}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </nav>
      );
    }

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("flex items-center font-sans", className)}
        {...props}
      >
        {children}
      </nav>
    );
  },
);
Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-2 sm:gap-2.5 text-sm break-words",
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps
  extends React.HTMLAttributes<HTMLElement> {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  asChild?: boolean;
}

export const BreadcrumbLink = React.forwardRef<
  HTMLElement,
  BreadcrumbLinkProps
>(({ href, onClick, className, children, ...props }, ref) => {
  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        className={cn(
          "transition-colors hover:text-foreground text-muted-foreground font-medium",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        className={cn(
          "transition-colors hover:text-foreground text-muted-foreground font-medium",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      className={cn("text-muted-foreground font-medium", className)}
      {...props}
    >
      {children}
    </span>
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-bold text-foreground", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("text-slate-400 dark:text-slate-500 [&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight className="h-3.5 w-3.5 stroke-[2.2]" />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
