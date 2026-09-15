import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/css";
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
import { SEASONAL_CROPS_DATA, type SeasonalCropsViewProps } from "./types";

export function SeasonalCropsDesktop({
  items = SEASONAL_CROPS_DATA,
  title = "Giống rau mùa vụ chuẩn bị gieo trồng",
  seasonBadge = "MÙA VỤ THU ĐÔNG",
  subtitle = "Được ươm mầm sinh học, thích nghi tuyệt đối với thổ nhưỡng đất đỏ bazan Lạc Dương.",
  onSelectCrop,
  className,
}: SeasonalCropsViewProps) {
  return (
    <Box className={cn("w-full seasonal-crops-splide pt-4 pb-0", className)}>
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
            1100: { perPage: 2, gap: "1.25rem" },
          },
        }}
      >
        {/* ── 1. Header Block with Title and Prev/Next Arrows ── */}
        <Box className="flex items-end justify-between gap-4 mb-6">
          <Box className="space-y-1.5 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              {seasonBadge}
            </span>
            <Typography
              as="h2"
              className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight"
            >
              {title}
            </Typography>
            <Text className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
              {subtitle}
            </Text>
          </Box>

          {/* Splide Custom Top-Right Arrows */}
          <Box className="splide__arrows flex items-center gap-2 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="splide__arrow splide__arrow--prev !static !transform-none cursor-pointer"
              aria-label="Giống trước"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="default"
              size="icon"
              className="splide__arrow splide__arrow--next !static !transform-none cursor-pointer"
              aria-label="Giống tiếp theo"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Box>
        </Box>

        {/* ── 2. Carousel Track with Crop Cards ── */}
        <SplideTrack>
          {items.map((crop) => (
            <SplideSlide key={crop.cropCode} className="pb-4">
              <Card className="h-full flex flex-col justify-between overflow-hidden group hover:border-primary/40 transition-all duration-300">
                {/* Image & Badge */}
                <Box className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={crop.imageUrl}
                    alt={crop.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/plot-1.jpg";
                    }}
                  />
                  {crop.tagBadge && (
                    <Badge
                      variant="outline"
                      className="absolute top-3 left-3 bg-card/95 text-card-foreground text-[11px] font-semibold backdrop-blur-md shadow-xs px-2.5 py-0.5 rounded-full"
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
                      className="text-base sm:text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors"
                    >
                      {crop.name}
                    </Typography>
                    <Text className="text-xs text-muted-foreground leading-relaxed line-clamp-2 min-h-[32px]">
                      {crop.description}
                    </Text>
                  </Box>

                  {/* 3 Metric Specs */}
                  <Box className="space-y-2 pt-2 border-t border-border text-xs">
                    <Box className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                        Chu kỳ thu hoạch
                      </span>
                      <span className="font-semibold text-foreground">
                        {crop.durationLabel}
                      </span>
                    </Box>

                    <Box className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Hourglass className="h-3.5 w-3.5 text-primary shrink-0" />
                        Sản lượng dự kiến
                      </span>
                      <span className="font-semibold text-foreground">
                        {crop.expectedYieldKg}
                      </span>
                    </Box>

                    <Box className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Sprout className="h-3.5 w-3.5 text-primary shrink-0" />
                        Thổ nhưỡng
                      </span>
                      <span className="font-semibold text-foreground truncate max-w-[150px]">
                        {crop.soilType}
                      </span>
                    </Box>
                  </Box>
                </CardContent>

                {/* Card Footer Button */}
                <CardFooter className="px-5 pb-5 pt-0">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => onSelectCrop(crop.cropSlug)}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Chọn gieo giống này
                  </Button>
                </CardFooter>
              </Card>
            </SplideSlide>
          ))}
        </SplideTrack>

        {/* ── 3. Autoplay Progress Bar ── */}
        <div className="splide__progress">
          <div className="splide__progress__bar" />
        </div>
      </Splide>

      {/* ── 4. Custom CSS ── */}
      <style>{`
        .seasonal-crops-splide .splide__arrows {
          display: flex;
          position: static;
        }
        .seasonal-crops-splide .splide__arrow {
          position: static !important;
          transform: none !important;
          top: auto !important;
          left: auto !important;
          right: auto !important;
          opacity: 1 !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
        }
        .seasonal-crops-splide .splide__arrow svg {
          fill: none !important;
          stroke: currentColor !important;
          transform: none !important;
        }
        .seasonal-crops-splide .splide__arrow:disabled {
          opacity: 0.4 !important;
          cursor: not-allowed !important;
        }
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
          background: var(--color-neutral-300);
          border-radius: 9999px;
          border: none;
          transition: all 0.3s ease;
          opacity: 1;
        }
        .seasonal-crops-splide .splide__pagination__page.is-active {
          width: 1.5rem;
          background: var(--color-primary-700);
          border-radius: 9999px;
          transform: none;
        }
        .seasonal-crops-splide .splide__progress {
          height: 3px;
          background: var(--color-neutral-200);
          border-radius: 9999px;
          margin-top: 0.75rem;
          overflow: hidden;
        }
        .seasonal-crops-splide .splide__progress__bar {
          height: 100%;
          background: var(--color-primary-600);
          border-radius: 9999px;
          transition: width 0ms linear;
        }
      `}</style>
    </Box>
  );
}
