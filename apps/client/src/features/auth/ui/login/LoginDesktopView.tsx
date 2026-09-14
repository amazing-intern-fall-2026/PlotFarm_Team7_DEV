import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "../../constants";
import { AuthDesktopLayout, HeroBanner } from "../common";
import { LoginForm } from "./LoginForm";

export { HeroBanner };

export interface LoginDesktopViewProps {
  onSwitchToRegister?: () => void;
}

export function LoginDesktopView({ onSwitchToRegister }: LoginDesktopViewProps) {
  const navigate = useNavigate();
  const handleSwitchToRegister = onSwitchToRegister ?? (() => navigate(AUTH_ROUTES.REGISTER));

  return (
    <AuthDesktopLayout>
      <LoginForm onSwitchToRegister={handleSwitchToRegister} />
    </AuthDesktopLayout>
  );
}
