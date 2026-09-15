import { AuthDesktopLayout } from "../common";
import { RegisterForm } from "./RegisterForm";

export interface RegisterDesktopViewProps {
  onSwitchToLogin?: () => void;
}

export function RegisterDesktopView({ onSwitchToLogin }: RegisterDesktopViewProps) {
  return (
    <AuthDesktopLayout formClassName="py-2">
      <RegisterForm onSwitchToLogin={onSwitchToLogin} />
    </AuthDesktopLayout>
  );
}
