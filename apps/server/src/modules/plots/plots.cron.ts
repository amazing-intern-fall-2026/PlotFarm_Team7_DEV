import { PlotsRepository } from "./plots.repository";

let cronInterval: NodeJS.Timeout | null = null;

export function initPlotLockCron(): void {
  if (process.env.NODE_ENV === "test") {
    return;
  }

  // Chạy định kỳ 60 giây (1 phút)
  const INTERVAL_MS = 60 * 1000;

  cronInterval = setInterval(async () => {
    try {
      const now = new Date();
      const count = await PlotsRepository.releaseExpiredLocks(now);
      if (count > 0) {
        console.log(`[PlotsCron] Auto-released ${count} expired plot locks.`);
      }
    } catch (error) {
      console.error("[PlotsCron] Error releasing expired plot locks:", error);
    }
  }, INTERVAL_MS);

  if (cronInterval.unref) {
    cronInterval.unref();
  }
}

export function stopPlotLockCron(): void {
  if (cronInterval) {
    clearInterval(cronInterval);
    cronInterval = null;
  }
}
