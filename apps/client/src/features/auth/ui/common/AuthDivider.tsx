import { Box } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

export interface AuthDividerProps {
  label: string;
  className?: string;
}

export function AuthDivider({ label, className }: AuthDividerProps) {
  return (
    <Box className={cn("flex items-center my-3 sm:my-3.5", className)}>
      <Box className="flex-1 border-t border-border" />
      <span className="px-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground whitespace-nowrap select-none">
        {label}
      </span>
      <Box className="flex-1 border-t border-border" />
    </Box>
  );
}
