import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import {
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

export function SeasonalCropsMobile({
  items = SEASONAL_CROPS_DATA,
  title = "Giống rau mùa vụ chuẩn bị gieo",
  seasonBadge = "MÙA VỤ THU ĐÔNG",
  subtitle = "Ươm mầm sinh học thích nghi thổ nhưỡng Đạ Sar.",
  onSelectCrop,
  className,
}: SeasonalCropsViewProps) {
  return (
    <Box className={cn("w-full overflow-hidden seasonal-crops-mobile-splide py-2 space-y-4", className)}>
      {/* ── 1. Mobile Header ── */}
      <Box className="space-y-1.5 text-left px-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
          {seasonBadge}
        </span>
        <Typography
          as="h2"
          className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight"
        >
          {title}
        </Typography>
        <Text className="text-xs text-muted-foreground leading-relaxed">
          {subtitle}
        </Text>
      </Box>

      {/* ── 2. Touch-Optimized Mobile Carousel (with Peek) ── */}
      <Splide
        hasTrack={false}
        aria-label={title}
        options={{
          type: "loop",
          perPage: 1,
          perMove: 1,
          padding: { left: "0.75rem", right: "0.75rem" },
          gap: "0.875rem",
          autoplay: true,
          interval: 5000,
          pauseOnHover: true,
          pauseOnFocus: true,
          speed: 600,
          arrows: false,
          pagination: true,
        }}
      >
        <SplideTrack>
          {items.map((crop) => (
            <SplideSlide key={crop.cropCode} className="pb-3">
              <Card className="h-full flex flex-col justify-between overflow-hidden">
                {/* Image & Badge */}
                <Box className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={crop.imageUrl}
                    alt={crop.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/plot-1.jpg";
                    }}
                  />
                  {crop.tagBadge && (
                    <Badge
                      variant="outline"
                      className="absolute top-2.5 left-2.5 bg-card/95 text-card-foreground text-[10px] font-semibold backdrop-blur-md shadow-2xs px-2 py-0.5 rounded-full"
                    >
                      {crop.tagBadge}
                    </Badge>
                  )}
                </Box>

                {/* Card Content */}
                <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-3 text-left">
                  <Box className="space-y-1">
                    <Typography
                      as="h3"
                      className="text-base font-bold text-foreground leading-snug"
                    >
                      {crop.name}
                    </Typography>
                    <Text className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {crop.description}
                    </Text>
                  </Box>

                  {/* 3 Metric Specs */}
                  <Box className="space-y-1.5 pt-2 border-t border-border/70 text-xs">
                    <Box className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                        <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                        Chu kỳ thu hoạch
                      </span>
                      <span className="font-semibold text-foreground text-[11px]">
                        {crop.durationLabel}
                      </span>
                    </Box>

                    <Box className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                        <Hourglass className="h-3.5 w-3.5 text-primary shrink-0" />
                        Sản lượng dự kiến
                      </span>
                      <span className="font-semibold text-foreground text-[11px]">
                        {crop.expectedYieldKg}
                      </span>
                    </Box>

                    <Box className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                        <Sprout className="h-3.5 w-3.5 text-primary shrink-0" />
                        Thổ nhưỡng
                      </span>
                      <span className="font-semibold text-foreground text-[11px] truncate max-w-[130px]">
                        {crop.soilType}
                      </span>
                    </Box>
                  </Box>
                </CardContent>

                {/* Card Footer Button */}
                <CardFooter className="px-4 pb-4 pt-0">
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
      </Splide>

      {/* ── 3. Custom Mobile Pagination Styles ── */}
      <style>{`
        .seasonal-crops-mobile-splide .splide__pagination {
          position: static;
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
          padding: 0.25rem 0;
        }
        .seasonal-crops-mobile-splide .splide__pagination__page {
          width: 0.375rem;
          height: 0.375rem;
          background: var(--color-neutral-300);
          border-radius: 9999px;
          border: none;
          transition: all 0.3s ease;
          opacity: 1;
        }
        .seasonal-crops-mobile-splide .splide__pagination__page.is-active {
          width: 1.25rem;
          background: var(--color-primary-700);
          border-radius: 9999px;
        }
      `}</style>
    </Box>
  );
}
