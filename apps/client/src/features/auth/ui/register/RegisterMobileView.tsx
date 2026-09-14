import { AuthMobileLayout } from "../common";
import { RegisterForm } from "./RegisterForm";

export interface RegisterMobileViewProps {
  onSwitchToLogin?: () => void;
}

export function RegisterMobileView({ onSwitchToLogin }: RegisterMobileViewProps) {
  return (
    <AuthMobileLayout>
      <RegisterForm onSwitchToLogin={onSwitchToLogin} />
    </AuthMobileLayout>
  );
}
