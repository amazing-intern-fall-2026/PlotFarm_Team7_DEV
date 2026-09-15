import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getDeviceInfo } from "./useDevice";

describe("getDeviceInfo utility", () => {
  const originalWindow = globalThis.window;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    if (originalWindow) {
      vi.stubGlobal("window", originalWindow);
    } else {
      vi.unstubAllGlobals();
    }
  });

  it("should return default desktop info on SSR (when window is undefined)", () => {
    vi.stubGlobal("window", undefined);
    const info = getDeviceInfo();
    expect(info.isDesktop).toBe(true);
    expect(info.isMobile).toBe(false);
    expect(info.device).toBe("desktop");
  });

  it("should detect desktop correctly when matches desktop breakpoint", () => {
    vi.stubGlobal("window", {
      matchMedia: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("min-width: 1024px"),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
      navigator: { maxTouchPoints: 0 },
    });

    const info = getDeviceInfo();
    expect(info.isDesktop).toBe(true);
    expect(info.isMobile).toBe(false);
    expect(info.isTablet).toBe(false);
    expect(info.device).toBe("desktop");
  });

  it("should detect tablet correctly", () => {
    vi.stubGlobal("window", {
      matchMedia: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("min-width: 768px") && query.includes("max-width: 1023px"),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
      navigator: { maxTouchPoints: 1 },
    });

    const info = getDeviceInfo();
    expect(info.isDesktop).toBe(false);
    expect(info.isTablet).toBe(true);
    expect(info.isMobile).toBe(false);
    expect(info.device).toBe("tablet");
    expect(info.isTouch).toBe(true);
  });

  it("should detect mobile when desktop and tablet queries are false", () => {
    vi.stubGlobal("window", {
      matchMedia: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("orientation: landscape"),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
      navigator: { maxTouchPoints: 5 },
    });

    const info = getDeviceInfo();
    expect(info.isDesktop).toBe(false);
    expect(info.isTablet).toBe(false);
    expect(info.isMobile).toBe(true);
    expect(info.device).toBe("mobile");
    expect(info.orientation).toBe("landscape");
    expect(info.isTouch).toBe(true);
  });
});
