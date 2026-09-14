import { describe, it, expect, vi } from "vitest";
import { ErrorBoundary } from "./ErrorBoundary";

describe("app/error - ErrorBoundary", () => {
  it("getDerivedStateFromError updates state to hasError: true", () => {
    const error = new Error("Test runtime crash");
    const state = ErrorBoundary.getDerivedStateFromError(error);

    expect(state.hasError).toBe(true);
    expect(state.error).toBe(error);
  });

  it("resets error state when resetErrorBoundary is called", () => {
    const boundary = new ErrorBoundary({ children: null });
    const mockSetState = vi.fn();
    boundary.setState = mockSetState as unknown as typeof boundary.setState;

    boundary.resetErrorBoundary();
    expect(mockSetState).toHaveBeenCalledWith({ hasError: false, error: null });
  });

  it("calls onError callback in componentDidCatch", () => {
    const onError = vi.fn();
    const boundary = new ErrorBoundary({ children: null, onError });
    const error = new Error("Crash");
    const errorInfo = { componentStack: "at DummyComponent" };

    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    boundary.componentDidCatch(error, errorInfo);

    expect(onError).toHaveBeenCalledWith(error, errorInfo);
    consoleErrorSpy.mockRestore();
  });
});
