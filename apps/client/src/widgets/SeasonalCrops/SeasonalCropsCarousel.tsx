import { useNavigate } from "react-router-dom";
import { useDevice } from "@/shared/lib/device";
import { SeasonalCropsDesktop } from "./SeasonalCropsDesktop";
import { SeasonalCropsMobile } from "./SeasonalCropsMobile";
import { useSeasonalCrops } from "./useSeasonalCrops";
import { SeasonalCropsSkeleton } from "./SeasonalCropsSkeleton";
import type { SeasonalCropsCarouselProps } from "./types";

export * from "./types";
export * from "./SeasonalCropsDesktop";
export * from "./SeasonalCropsMobile";
export * from "./useSeasonalCrops";
export * from "./SeasonalCropsSkeleton";

export function SeasonalCropsCarousel(props: SeasonalCropsCarouselProps) {
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const { crops, loading } = useSeasonalCrops();

  const handleSelectCrop = (cropSlug: string) => {
    navigate(`/plots?crop=${cropSlug}`);
  };

  if (loading && !props.items) {
    return <SeasonalCropsSkeleton />;
  }

  const items = props.items || crops;

  if (isMobile) {
    return <SeasonalCropsMobile {...props} items={items} onSelectCrop={handleSelectCrop} />;
  }

  return <SeasonalCropsDesktop {...props} items={items} onSelectCrop={handleSelectCrop} />;
}
