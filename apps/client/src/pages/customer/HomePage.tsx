import { VideoHeroBanner } from "@/widgets/HomeHero";
import { KeyFeatures } from "@/widgets/KeyFeatures";
import { SeasonalCropsCarousel } from "@/widgets/SeasonalCrops";
import { FarmJourney } from "@/widgets/FarmJourney";
import { HomeCtaBanner } from "@/widgets/HomeCtaBanner";
import { Box, Container } from "@/shared/ui";

export function HomePage() {

  return (
    <Box className="w-full">
      <VideoHeroBanner />

      <Container className="py-12 space-y-12">
        <KeyFeatures />

        <SeasonalCropsCarousel />

        <FarmJourney />

        <HomeCtaBanner />
      </Container>
    </Box>
  );
}

