import * as React from "react";
import { Box } from "@/shared/ui";
import { MobileTopNav } from "./MobileTopNav";
import { TermsFooter } from "./TermsFooter";

export interface AuthMobileLayoutProps {
  children: React.ReactNode;
}

export function AuthMobileLayout({ children }: AuthMobileLayoutProps) {
  return (
    <Box className="min-h-screen w-full flex flex-col justify-between p-4 sm:p-6 bg-background overflow-y-auto">
      <MobileTopNav />

      <Box className="w-full max-w-sm mx-auto my-auto py-6">
        {children}
      </Box>

      <Box className="w-full max-w-sm mx-auto pt-4 text-center border-t border-border/40 shrink-0">
        <TermsFooter />
      </Box>
    </Box>
  );
}
