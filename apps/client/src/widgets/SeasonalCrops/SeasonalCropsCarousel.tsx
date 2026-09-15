import { useNavigate } from "react-router-dom";
import { useDevice } from "@/shared/lib/device";
import { SeasonalCropsDesktop } from "./SeasonalCropsDesktop";
import { SeasonalCropsMobile } from "./SeasonalCropsMobile";
import type { SeasonalCropsCarouselProps } from "./types";

export * from "./types";
export * from "./SeasonalCropsDesktop";
export * from "./SeasonalCropsMobile";

export function SeasonalCropsCarousel(props: SeasonalCropsCarouselProps) {
  const { isMobile } = useDevice();
  const navigate = useNavigate();

  const handleSelectCrop = (cropSlug: string) => {
    navigate(`/plots?crop=${cropSlug}`);
  };

  if (isMobile) {
    return <SeasonalCropsMobile {...props} onSelectCrop={handleSelectCrop} />;
  }

  return <SeasonalCropsDesktop {...props} onSelectCrop={handleSelectCrop} />;
}
