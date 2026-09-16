import { useNavigate } from "react-router-dom";
import { useDevice } from "@/shared/lib/device";
import { HOME_CTA_MESSAGES } from "./constants";
import { HomeCtaBannerDesktop } from "./HomeCtaBannerDesktop";
import { HomeCtaBannerMobile } from "./HomeCtaBannerMobile";
import type { HomeCtaBannerProps, HomeCtaBannerViewProps } from "./types";

export * from "./types";
export * from "./constants";
export * from "./HomeCtaBannerDesktop";
export * from "./HomeCtaBannerMobile";

export function HomeCtaBanner({
  targetUrl = HOME_CTA_MESSAGES.TARGET_URL,
  onCtaClick,
  ...props
}: HomeCtaBannerProps) {
  const { isMobile } = useDevice();
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      navigate(targetUrl);
    }
  };

  const viewProps: HomeCtaBannerViewProps = {
    ...props,
    targetUrl,
    onCtaClick,
    handleCtaClick,
  };

  if (isMobile) {
    return <HomeCtaBannerMobile {...viewProps} />;
  }

  return <HomeCtaBannerDesktop {...viewProps} />;
}
