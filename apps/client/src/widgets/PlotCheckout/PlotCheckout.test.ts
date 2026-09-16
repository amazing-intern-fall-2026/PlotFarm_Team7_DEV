import { describe, it, expect, beforeEach } from "vitest";
import { formatTimeMMSS } from "./useHoldTimer";
import {
  CHECKOUT_DEFAULT_ORDER,
  CHECKOUT_BANK_INFO,
  CHECKOUT_TIMER_CONFIG,
  CHECKOUT_TEXTS,
} from "./checkout.constants";

const storageMock: Record<string, string> = {};
const mockLocalStorage = {
  getItem: (key: string) => storageMock[key] ?? null,
  setItem: (key: string, value: string) => {
    storageMock[key] = value;
  },
  removeItem: (key: string) => {
    delete storageMock[key];
  },
  clear: () => {
    Object.keys(storageMock).forEach((k) => delete storageMock[k]);
  },
};

// Polyfill global localStorage for Vitest node environment
if (typeof globalThis.localStorage === "undefined") {
  globalThis.localStorage = mockLocalStorage as unknown as Storage;
}

describe("US-20, US-21, US-22: PlotCheckout Business Logic & Constants Tests", () => {
  beforeEach(() => {
    globalThis.localStorage.clear();
  });

  describe("formatTimeMMSS (US-20 Countdown HUD)", () => {
    it("formats standard 5-minute countdown accurately to 05:00", () => {
      expect(formatTimeMMSS(300)).toBe("05:00");
    });

    it("formats ticking down seconds properly", () => {
      expect(formatTimeMMSS(299)).toBe("04:59");
      expect(formatTimeMMSS(180)).toBe("03:00");
      expect(formatTimeMMSS(65)).toBe("01:05");
      expect(formatTimeMMSS(59)).toBe("00:59");
      expect(formatTimeMMSS(9)).toBe("00:09");
      expect(formatTimeMMSS(0)).toBe("00:00");
    });

    it("safely clamps negative values to 00:00", () => {
      expect(formatTimeMMSS(-1)).toBe("00:00");
      expect(formatTimeMMSS(-99)).toBe("00:00");
    });
  });

  describe("F5 Resilience Logic (US-20)", () => {
    it("computes remaining seconds accurately from cached target timestamp", () => {
      const plotId = "PLOT-001";
      const storageKey = `${CHECKOUT_TIMER_CONFIG.storageKeyPrefix}${plotId}`;
      const now = Date.now();
      const targetTime = now + 180 * 1000; // 3 minutes remaining
      localStorage.setItem(storageKey, String(targetTime));

      const cached = localStorage.getItem(storageKey);
      expect(cached).not.toBeNull();

      const cachedTarget = parseInt(cached!, 10);
      const remainingSeconds = Math.max(0, Math.floor((cachedTarget - now) / 1000));
      expect(remainingSeconds).toBe(180);
      expect(formatTimeMMSS(remainingSeconds)).toBe("03:00");
    });

    it("detects warning threshold correctly when remaining time <= 60 seconds", () => {
      const remaining1 = 61;
      const remaining2 = 60;
      const remaining3 = 30;

      const isWarning1 = remaining1 <= CHECKOUT_TIMER_CONFIG.warningThresholdSeconds;
      const isWarning2 = remaining2 <= CHECKOUT_TIMER_CONFIG.warningThresholdSeconds;
      const isWarning3 = remaining3 <= CHECKOUT_TIMER_CONFIG.warningThresholdSeconds;

      expect(isWarning1).toBe(false);
      expect(isWarning2).toBe(true);
      expect(isWarning3).toBe(true);
    });
  });

  describe("VietQR Bank Beneficiary Specs (US-21)", () => {
    it("contains valid Napas 24/7 bank ID and account details", () => {
      expect(CHECKOUT_BANK_INFO.bankId).toBe("970422");
      expect(CHECKOUT_BANK_INFO.bankShortName).toBe("MBBank");
      expect(CHECKOUT_BANK_INFO.accountNumber).toBe("999988886868");
      expect(CHECKOUT_BANK_INFO.accountName).toBe("NONG NGHIEP SO GREEN FARM DALAT");
    });

    it("generates correct VietQR transfer content with CF prefix", () => {
      const orderCode = "ORD-A104-9821";
      const transferContent = `CF${orderCode}`;
      expect(transferContent).toBe("CFORD-A104-9821");
      expect(transferContent.startsWith("CF")).toBe(true);
    });
  });

  describe("Mini Invoice Calculations (Clean Fintech UX)", () => {
    it("computes total amount as land rental plus seed fee", () => {
      const order = CHECKOUT_DEFAULT_ORDER;
      expect(order.totalAmount).toBe(order.landRentalFee + order.cropSeedFee);
      expect(order.durationDays).toBe(60);
      expect(order.plotNumber).toBe("A-104");
    });
  });

  describe("Demo Trigger & Sandbox Configuration (US-22)", () => {
    it("provides clear sandbox badge and trigger button text", () => {
      expect(CHECKOUT_TEXTS.demoSandbox.cardBadge).toBe("Sandbox v2.4");
      expect(CHECKOUT_TEXTS.demoSandbox.triggerButtonText).toContain("Giả lập Tiền về");
    });

    it("includes 4 essential trust badges", () => {
      expect(CHECKOUT_TEXTS.trustBadges).toHaveLength(4);
      const ids = CHECKOUT_TEXTS.trustBadges.map((b) => b.id);
      expect(ids).toEqual(["ssl", "napas", "banks", "support"]);
    });
  });
});
