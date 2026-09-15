import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold select-none",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-base",
        xl: "h-20 w-20 text-xl"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

export type AvatarStatus = "none" | "online" | "offline" | "busy" | "story-active";

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  name?: string;
  status?: AvatarStatus;
}

function getInitials(name?: string): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, name, status = "none", ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false);

    const isStoryActive = status === "story-active";

    const statusBadgeClass = {
      none: "",
      online: "bg-emerald-500",
      offline: "bg-neutral-400",
      busy: "bg-amber-500",
      "story-active": ""
    }[status];

    const statusSizeClass = {
      sm: "h-2 w-2 ring-1",
      md: "h-2.5 w-2.5 ring-2",
      lg: "h-3.5 w-3.5 ring-2",
      xl: "h-5 w-5 ring-2"
    }[size || "md"];

    return (
      <div
        className={cn(
          "relative inline-block",
          isStoryActive &&
            "rounded-full p-[2.5px] bg-gradient-to-tr from-amber-500 via-emerald-500 to-green-600 transition-transform hover:scale-105"
        )}
      >
        <div
          ref={ref}
          className={cn(
            avatarVariants({ size }),
            "bg-primary/10 text-primary border border-primary/20",
            className
          )}
          {...props}
        >
          {src && !hasError ? (
            <img
              src={src}
              alt={alt || name || "Avatar"}
              onError={() => setHasError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{getInitials(name)}</span>
          )}
        </div>

        {status !== "none" && !isStoryActive && (
          <span
            className={cn(
              "absolute bottom-0 right-0 block rounded-full ring-background",
              statusBadgeClass,
              statusSizeClass
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
