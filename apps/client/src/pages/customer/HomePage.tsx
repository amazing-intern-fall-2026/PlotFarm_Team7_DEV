import { VideoHeroBanner } from "@/widgets/HomeHero";
import { KeyFeatures } from "@/widgets/KeyFeatures";
import { SeasonalCropsCarousel } from "@/widgets/SeasonalCrops";
import { FarmJourney } from "@/widgets/FarmJourney";
import { HomeCtaBanner } from "@/widgets/HomeCtaBanner";
import { Box, Container } from "@/shared/ui";

export function HomePage() {

  return (
    <Box className="w-full">
      {/* 100% Full-bleed Continuous Video Hero Banner */}
      <VideoHeroBanner />

      {/* Marketplace Showcase & Seasonal Crops Carousel */}
      <Container className="py-12 space-y-12">
        {/* Các Tính Năng Nổi Bật Nền Tảng (Key Features Bento Grid) */}
        <KeyFeatures />

        {/* Seasonal Crops Splide Carousel */}
        <SeasonalCropsCarousel />

        {/* Hành Trình Nông Trại Từ Xa Trong 4 Bước (Mô hình minh bạch) */}
        <FarmJourney />

        {/* Khối Kêu Gọi Đặt Ô Đất Vụ Mùa Giới Hạn */}
        <HomeCtaBanner />
      </Container>
    </Box>
  );
}

