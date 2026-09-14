import { Link } from "react-router-dom";
import { Box, Text } from "@/shared/ui";
import { AUTH_UI_TEXT } from "../../constants";
import { HeroBanner } from "../login/LoginDesktopView";
import { RegisterForm } from "./RegisterForm";

export interface RegisterDesktopViewProps {
  onSwitchToLogin?: () => void;
}

export function RegisterDesktopView({ onSwitchToLogin }: RegisterDesktopViewProps) {
  return (
    <Box className="h-full w-full grid grid-cols-2 overflow-hidden bg-background">
      {/* Left Column: Hero Banner */}
      <HeroBanner />

      {/* Right Column: Desktop Register Form Panel */}
      <Box className="flex flex-col justify-between h-full px-6 xl:px-12 py-4 xl:py-6 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <Box className="w-full max-w-[460px] mx-auto my-auto py-2 flex flex-col justify-center">
          <RegisterForm onSwitchToLogin={onSwitchToLogin} />
        </Box>

        {/* Desktop Terms Footer */}
        <Box className="w-full max-w-[460px] mx-auto pt-2 text-center">
          <Text variant="muted" className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {AUTH_UI_TEXT.TERMS_PREFIX}{" "}
            <Link
              to="/terms"
              className="underline underline-offset-2 hover:text-foreground transition-colors font-medium"
            >
              {AUTH_UI_TEXT.TERMS_CONTRACT}
            </Link>{" "}
            {AUTH_UI_TEXT.TERMS_AND}{" "}
            <Link
              to="/privacy"
              className="underline underline-offset-2 hover:text-foreground transition-colors font-medium"
            >
              {AUTH_UI_TEXT.TERMS_PRIVACY}
            </Link>{" "}
            {AUTH_UI_TEXT.TERMS_SUFFIX}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
