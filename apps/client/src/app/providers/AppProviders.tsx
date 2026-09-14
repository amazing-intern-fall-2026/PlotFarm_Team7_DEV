import * as React from "react";
import { I18nProvider } from "@/shared/lib/i18n";
import { ErrorBoundary, ErrorProvider } from "../error";

export interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <ErrorProvider>
        <I18nProvider defaultLocale="vi">
          {children}
        </I18nProvider>
      </ErrorProvider>
    </ErrorBoundary>
  );
}

export default AppProviders;
