import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Box, Logo } from "@/shared/ui";
import { AUTH_UI_TEXT } from "../../constants";

export function MobileTopNav() {
  return (
    <Box className="flex items-center justify-between w-full pb-4 border-b border-border/40 shrink-0">
      <Link to="/" className="flex items-center gap-2 select-none">
        <Logo size="sm" />
        <span className="text-base font-bold text-foreground tracking-tight">Green Farm</span>
      </Link>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>{AUTH_UI_TEXT.BACK_TO_HOME}</span>
      </Link>
    </Box>
  );
}
