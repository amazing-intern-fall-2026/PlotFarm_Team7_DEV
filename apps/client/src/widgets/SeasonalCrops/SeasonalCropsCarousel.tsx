import { useNavigate } from "react-router-dom";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Hourglass,
  Sprout,
  ArrowRight,
} from "lucide-react";
import {
  Box,
  Typography,
  Text,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { SEASONAL_CROPS_DATA, type SeasonalCropItem } from "./types";

export interface SeasonalCropsCarouselProps {
  items?: SeasonalCropItem[];
  title?: string;
  seasonBadge?: string;
  subtitle?: string;
  className?: string;
}

export function SeasonalCropsCarousel({
  items = SEASONAL_CROPS_DATA,
  title = "Giống rau mùa vụ chuẩn bị gieo trồng",
  seasonBadge = "MÙA VỤ THU ĐÔNG",
  subtitle = "Được ươm mầm sinh học, thích nghi tuyệt đối với thổ nhưỡng đất đỏ bazan Lạc Dương.",
  className,
}: SeasonalCropsCarouselProps) {
  const navigate = useNavigate();

  return (
    <Box className={cn("w-full seasonal-crops-splide py-4", className)}>
      <Splide
        hasTrack={false}
        aria-label={title}
        options={{
          type: "loop",
          perPage: 3,
          perMove: 1,
          autoplay: true,
          interval: 4500,
          pauseOnHover: true,
          pauseOnFocus: true,
          resetProgress: false,
          gap: "1.5rem",
          speed: 700,
          arrows: true,
          pagination: true,
          breakpoints: {
            1100: {
              perPage: 2,
              gap: "1.25rem",
            },
            680: {
              perPage: 1,
              gap: "1rem",
            },
          },
        }}
      >
        {/* ── 1. Header Block with Title and Prev/Next Arrows ── */}
        <Box className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <Box className="space-y-1.5 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              {seasonBadge}
            </span>
            <Typography
              as="h2"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
            >
              {title}
            </Typography>
            <Text className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {subtitle}
            </Text>
          </Box>

          {/* Splide Custom Top-Right Arrows */}
          <Box className="splide__arrows flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              type="button"
              className="splide__arrow splide__arrow--prev !static !transform-none w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm flex items-center justify-center transition-all cursor-pointer"
              aria-label="Giống trước"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="splide__arrow splide__arrow--next !static !transform-none w-9 h-9 rounded-full border border-emerald-800 bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm flex items-center justify-center transition-all cursor-pointer"
              aria-label="Giống tiếp theo"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </Box>
        </Box>

        {/* ── 2. Carousel Track with Crop Cards ── */}
        <SplideTrack>
          {items.map((crop) => (
            <SplideSlide key={crop.cropCode} className="pb-4">
              <Card className="h-full flex flex-col justify-between overflow-hidden border border-slate-200/90 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group">
                
                {/* Image & Badge */}
                <Box className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={crop.imageUrl}
                    alt={crop.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {crop.tagBadge && (
                    <Badge
                      className="absolute top-3 left-3 bg-white/95 text-slate-800 text-[11px] font-semibold backdrop-blur-md shadow-sm border border-slate-200/80 px-2.5 py-0.5 rounded-full"
                    >
                      {crop.tagBadge}
                    </Badge>
                  )}
                </Box>

                {/* Card Content */}
                <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
                  <Box className="space-y-1.5">
                    <Typography
                      as="h3"
                      className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors"
                    >
                      {crop.name}
                    </Typography>
                    <Text className="text-xs text-slate-500 leading-relaxed line-clamp-2 min-h-[32px]">
                      {crop.description}
                    </Text>
                  </Box>

                  {/* 3 Metric Specs */}
                  <Box className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <Box className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        Chu kỳ thu hoạch
                      </span>
                      <span className="font-semibold text-slate-800">
                        {crop.durationLabel}
                      </span>
                    </Box>

                    <Box className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Hourglass className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        Sản lượng dự kiến
                      </span>
                      <span className="font-semibold text-slate-800">
                        {crop.expectedYieldKg}
                      </span>
                    </Box>

                    <Box className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Sprout className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        Thổ nhưỡng
                      </span>
                      <span className="font-semibold text-slate-800 truncate max-w-[150px]">
                        {crop.soilType}
                      </span>
                    </Box>
                  </Box>
                </CardContent>

                {/* Card Footer Button */}
                <CardFooter className="px-5 pb-5 pt-0">
                  <Button
                    type="button"
                    onClick={() => navigate(`/plots?crop=${crop.cropSlug}`)}
                    className="w-full h-10 rounded-full bg-emerald-50/80 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/50 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-none"
                  >
                    <span>Chọn gieo giống này</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </CardFooter>

              </Card>
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>

      {/* ── 3. Custom CSS for Splide Pagination Dots ── */}
      <style>{`
        .seasonal-crops-splide .splide__pagination {
          position: static;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.25rem 0;
        }
        .seasonal-crops-splide .splide__pagination__page {
          width: 0.5rem;
          height: 0.5rem;
          background: #cbd5e1;
          border-radius: 9999px;
          border: none;
          transition: all 0.3s ease;
          opacity: 1;
        }
        .seasonal-crops-splide .splide__pagination__page.is-active {
          width: 1.5rem;
          background: #065f46;
          border-radius: 9999px;
          transform: none;
        }
      `}</style>
    </Box>
  );
}
