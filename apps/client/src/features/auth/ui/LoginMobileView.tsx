import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Box, Text, Logo } from "@/shared/ui";
import { AUTH_UI_TEXT } from "../constants";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export interface LoginMobileViewProps {
  tab: "login" | "register";
  onTabChange: (tab: "login" | "register") => void;
}

export function LoginMobileView({ tab, onTabChange }: LoginMobileViewProps) {
  return (
    <Box className="min-h-screen w-full flex flex-col justify-between p-4 sm:p-6 bg-background">
      {/* Mobile Top Navigation Bar */}
      <Box className="flex items-center justify-between w-full pb-4 border-b border-border/40">
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

      {/* Mobile Form Center Container */}
      <Box className="w-full max-w-sm mx-auto my-auto py-6">
        {tab === "login" ? (
          <LoginForm onSwitchToRegister={() => onTabChange("register")} />
        ) : (
          <RegisterForm onSwitchToLogin={() => onTabChange("login")} />
        )}
      </Box>

      {/* Mobile Footer Terms */}
      <Box className="w-full max-w-sm mx-auto pt-4 text-center border-t border-border/40">
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
  );
}
