import * as React from "react";
import { CHECKOUT_TIMER_CONFIG } from "./checkout.constants";

export interface UseHoldTimerOptions {
  plotId: string;
  initialExpiresInSeconds?: number;
  serverLockedUntil?: string | null;
  onExpire?: () => void;
}

export interface UseHoldTimerReturn {
  secondsLeft: number;
  formattedTime: string;
  isWarning: boolean;
  isExpired: boolean;
  resetTimer: (newExpiresInSeconds?: number) => void;
}

export function formatTimeMMSS(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function useHoldTimer({
  plotId,
  initialExpiresInSeconds = CHECKOUT_TIMER_CONFIG.defaultHoldSeconds,
  serverLockedUntil,
  onExpire,
}: UseHoldTimerOptions): UseHoldTimerReturn {
  const storageKey = `${CHECKOUT_TIMER_CONFIG.storageKeyPrefix}${plotId}`;

  const calculateTargetTime = React.useCallback((): number => {
    const now = Date.now();

    if (serverLockedUntil) {
      const serverTarget = new Date(serverLockedUntil).getTime();
      if (!isNaN(serverTarget) && serverTarget > now) {
        localStorage.setItem(storageKey, String(serverTarget));
        return serverTarget;
      }
    }

    const cached = localStorage.getItem(storageKey);
    if (cached) {
      const cachedTarget = parseInt(cached, 10);
      if (!isNaN(cachedTarget) && cachedTarget > now) {
        return cachedTarget;
      }
    }

    const freshTarget = now + initialExpiresInSeconds * 1000;
    localStorage.setItem(storageKey, String(freshTarget));
    return freshTarget;
  }, [plotId, serverLockedUntil, initialExpiresInSeconds, storageKey]);

  const [targetTimestamp, setTargetTimestamp] = React.useState<number>(calculateTargetTime);
  const [secondsLeft, setSecondsLeft] = React.useState<number>(() => {
    return Math.max(0, Math.floor((targetTimestamp - Date.now()) / 1000));
  });

  const onExpireRef = React.useRef(onExpire);
  React.useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  React.useEffect(() => {
    const nextTarget = calculateTargetTime();
    setTargetTimestamp(nextTarget);
  }, [calculateTargetTime]);

  React.useEffect(() => {
    const tick = () => {
      const remaining = Math.max(0, Math.floor((targetTimestamp - Date.now()) / 1000));
      setSecondsLeft(remaining);

      if (remaining <= 0) {
        localStorage.removeItem(storageKey);
        onExpireRef.current?.();
      }
    };

    tick();
    const timerId = window.setInterval(tick, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [targetTimestamp, storageKey]);

  const resetTimer = React.useCallback(
    (newSeconds = CHECKOUT_TIMER_CONFIG.defaultHoldSeconds) => {
      const freshTarget = Date.now() + newSeconds * 1000;
      localStorage.setItem(storageKey, String(freshTarget));
      setTargetTimestamp(freshTarget);
      setSecondsLeft(newSeconds);
    },
    [storageKey],
  );

  const formattedTime = React.useMemo(() => formatTimeMMSS(secondsLeft), [secondsLeft]);
  const isWarning = secondsLeft > 0 && secondsLeft <= CHECKOUT_TIMER_CONFIG.warningThresholdSeconds;
  const isExpired = secondsLeft <= 0;

  return {
    secondsLeft,
    formattedTime,
    isWarning,
    isExpired,
    resetTimer,
  };
}
