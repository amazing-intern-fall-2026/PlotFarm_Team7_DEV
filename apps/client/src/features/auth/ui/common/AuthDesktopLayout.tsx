import * as React from "react";
import { Box } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { HeroBanner } from "./HeroBanner";
import { TermsFooter } from "./TermsFooter";

export interface AuthDesktopLayoutProps {
  children: React.ReactNode;
  formClassName?: string;
}

export function AuthDesktopLayout({ children, formClassName = "py-1" }: AuthDesktopLayoutProps) {
  return (
    <Box className="h-full w-full grid grid-cols-2 overflow-hidden bg-background">
      <HeroBanner />

      <Box className="flex flex-col justify-between h-full px-6 xl:px-12 py-4 xl:py-6 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <Box className={cn("w-full max-w-[460px] mx-auto my-auto flex flex-col justify-center", formClassName)}>
          {children}
        </Box>

        <Box className="w-full max-w-[460px] mx-auto pt-2 text-center">
          <TermsFooter />
        </Box>
      </Box>
    </Box>
  );
}
