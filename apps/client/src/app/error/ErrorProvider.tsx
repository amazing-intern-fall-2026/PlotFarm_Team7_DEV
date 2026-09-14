import * as React from "react";
import { AppError } from "@/shared/lib/errors/AppError";

export interface ErrorContextValue {
  error: AppError | null;
  setError: (error: AppError | Error | unknown) => void;
  clearError: () => void;
}

const ErrorContext = React.createContext<ErrorContextValue | undefined>(undefined);

export interface ErrorProviderProps {
  children: React.ReactNode;
}

export function ErrorProvider({ children }: ErrorProviderProps) {
  const [error, setErrorState] = React.useState<AppError | null>(null);

  const setError = React.useCallback((err: AppError | Error | unknown) => {
    const normalized = AppError.fromUnknown(err);
    setErrorState(normalized);
  }, []);

  const clearError = React.useCallback(() => {
    setErrorState(null);
  }, []);

  const value = React.useMemo(
    () => ({ error, setError, clearError }),
    [error, setError, clearError]
  );

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useAppError(): ErrorContextValue {
  const context = React.useContext(ErrorContext);
  if (!context) {
    throw new Error("useAppError must be used within an ErrorProvider");
  }
  return context;
}
