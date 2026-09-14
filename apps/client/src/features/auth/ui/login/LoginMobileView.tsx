import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "../../constants";
import { AuthMobileLayout } from "../common";
import { LoginForm } from "./LoginForm";

export interface LoginMobileViewProps {
  onSwitchToRegister?: () => void;
}

export function LoginMobileView({ onSwitchToRegister }: LoginMobileViewProps) {
  const navigate = useNavigate();
  const handleSwitchToRegister = onSwitchToRegister ?? (() => navigate(AUTH_ROUTES.REGISTER));

  return (
    <AuthMobileLayout>
      <LoginForm onSwitchToRegister={handleSwitchToRegister} />
    </AuthMobileLayout>
  );
}
