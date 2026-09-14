import * as React from "react";

export type DeviceType = "mobile" | "tablet" | "desktop";
export type OrientationType = "portrait" | "landscape";

export interface DeviceInfo {
  device: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  orientation: OrientationType;
}

const BREAKPOINTS = {
  TABLET_MIN: 768,
  DESKTOP_MIN: 1024,
} as const;

const MEDIA_QUERIES = {
  MOBILE: `(max-width: ${BREAKPOINTS.TABLET_MIN - 1}px)`,
  TABLET: `(min-width: ${BREAKPOINTS.TABLET_MIN}px) and (max-width: ${BREAKPOINTS.DESKTOP_MIN - 1}px)`,
  DESKTOP: `(min-width: ${BREAKPOINTS.DESKTOP_MIN}px)`,
  LANDSCAPE: "(orientation: landscape)",
} as const;

export function getDeviceInfo(): DeviceInfo {
  if (typeof window === "undefined") {
    return {
      device: "desktop",
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isTouch: false,
      orientation: "landscape",
    };
  }

  const isDesktop = window.matchMedia(MEDIA_QUERIES.DESKTOP).matches;
  const isTablet = window.matchMedia(MEDIA_QUERIES.TABLET).matches;
  const isMobile = !isDesktop && !isTablet;
  const isLandscape = window.matchMedia(MEDIA_QUERIES.LANDSCAPE).matches;
  const nav = typeof window !== "undefined" && window.navigator ? window.navigator : (typeof navigator !== "undefined" ? navigator : undefined);
  const isTouch =
    Boolean(typeof window !== "undefined" && "ontouchstart" in window) ||
    Boolean(nav && nav.maxTouchPoints > 0);

  const device: DeviceType = isDesktop
    ? "desktop"
    : isTablet
      ? "tablet"
      : "mobile";

  return {
    device,
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    orientation: isLandscape ? "landscape" : "portrait",
  };
}

/**
 * Hook `useDevice` - Xác định loại thiết bị tối ưu hóa hiệu năng
 * - Hạn chế layout shift và tránh multiple re-renders.
 */
export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = React.useState<DeviceInfo>(getDeviceInfo);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const desktopMql = window.matchMedia(MEDIA_QUERIES.DESKTOP);
    const tabletMql = window.matchMedia(MEDIA_QUERIES.TABLET);
    const orientationMql = window.matchMedia(MEDIA_QUERIES.LANDSCAPE);

    const updateInfo = () => {
      setDeviceInfo(getDeviceInfo());
    };

    // Lắng nghe sự thay đổi của media query (chỉ kích hoạt khi chạm ngưỡng breakpoint)
    desktopMql.addEventListener("change", updateInfo);
    tabletMql.addEventListener("change", updateInfo);
    orientationMql.addEventListener("change", updateInfo);

    return () => {
      desktopMql.removeEventListener("change", updateInfo);
      tabletMql.removeEventListener("change", updateInfo);
      orientationMql.removeEventListener("change", updateInfo);
    };
  }, []);

  return deviceInfo;
}

/**
 * Hook `useMediaQuery` đơn giản cho các trường hợp custom media query
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (q: string): boolean => {
    if (typeof window !== "undefined") {
      return window.matchMedia(q).matches;
    }
    return false;
  };

  const [matches, setMatches] = React.useState<boolean>(() =>
    getMatches(query),
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);
    const handleChange = () => setMatches(mql.matches);

    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
