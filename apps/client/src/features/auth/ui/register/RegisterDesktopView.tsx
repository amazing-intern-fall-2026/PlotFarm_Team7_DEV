import { AuthDesktopLayout } from "../common";
import { RegisterForm } from "./RegisterForm";

export interface RegisterDesktopViewProps {
  onSwitchToLogin?: () => void;
}

export function RegisterDesktopView({ onSwitchToLogin }: RegisterDesktopViewProps) {
  return (
    <AuthDesktopLayout>
      <RegisterForm onSwitchToLogin={onSwitchToLogin} />
    </AuthDesktopLayout>
  );
}
