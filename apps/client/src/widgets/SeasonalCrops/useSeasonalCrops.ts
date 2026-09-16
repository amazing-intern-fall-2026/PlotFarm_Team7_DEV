import { useState, useEffect } from "react";
import { SEASONAL_CROPS_DATA, type SeasonalCropItem } from "./types";

export interface UseSeasonalCropsReturn {
  crops: SeasonalCropItem[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook cung cấp danh sách giống rau mùa vụ cho SeasonalCropsCarousel.
 * Hiện tại trả về dữ liệu tĩnh; có thể mở rộng để gọi API sau.
 */
export function useSeasonalCrops(): UseSeasonalCropsReturn {
  const [crops, setCrops] = useState<SeasonalCropItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate async data fetch – replace with real API call when ready
    const timer = setTimeout(() => {
      try {
        setCrops(SEASONAL_CROPS_DATA);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Không thể tải dữ liệu giống cây trồng.");
      } finally {
        setLoading(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return { crops, loading, error };
}
