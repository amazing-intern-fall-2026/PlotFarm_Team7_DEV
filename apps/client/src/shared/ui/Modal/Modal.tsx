import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "../Button";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  inline?: boolean;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl"
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  showCloseButton = true,
  inline = false,
  className,
  ...props
}) => {
  React.useEffect(() => {
    if (inline || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, inline]);

  if (!isOpen) return null;

  const dialogContent = (
    <div
      className={cn(
        "relative z-50 w-full rounded-2xl border border-border bg-card p-6 shadow-xl transition-all",
        !inline && "animate-in zoom-in-95 duration-200",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {/* Header */}
      {(title || showCloseButton) && (
        <div className="flex items-start justify-between pb-4 border-b border-border/60">
          <div>
            {title && <h3 className="text-lg font-bold text-foreground">{title}</h3>}
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {showCloseButton && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-foreground"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {/* Content */}
      <div className="py-4 text-sm text-foreground">{children}</div>

      {/* Footer */}
      {footer && (
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
          {footer}
        </div>
      )}
    </div>
  );

  if (inline) {
    return (
      <div className="w-full flex items-center justify-center p-4">
        {dialogContent}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog Box */}
      {dialogContent}
    </div>
  );
};

Modal.displayName = "Modal";
