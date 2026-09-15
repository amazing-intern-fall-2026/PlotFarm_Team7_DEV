import { useNavigate } from "react-router-dom";
import { VideoHeroBanner } from "@/widgets/HomeHero";
import { KeyFeatures } from "@/widgets/KeyFeatures";
import { SeasonalCropsCarousel } from "@/widgets/SeasonalCrops";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
  Box,
  Text,
  Container,
} from "@/shared/ui";

export function HomePage() {
  const navigate = useNavigate();

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

        <Card className="w-full">
          <CardHeader>
            <Box className="flex items-center justify-between">
              <CardTitle className="text-foreground font-bold">
                Sàn Nông Nghiệp Công Nghệ Cao (Marketplace)
              </CardTitle>
              <Badge variant="success">VietGAP 100%</Badge>
            </Box>
            <CardDescription>
              Sở hữu vườn rau hữu cơ riêng của bạn - Giám sát sinh trưởng 24/7
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Text variant="muted" className="text-sm leading-relaxed">
              Kết nối trực tiếp cư dân thành thị với nông trại công nghệ cao tại Đạ Sar, Lạc Dương, Đà Lạt.
              Bạn có thể thuê ô đất, chọn giống gieo trồng, theo dõi camera trực tiếp và nhận nông sản tươi chuyển phát tận cửa nhà mỗi tuần.
            </Text>
          </CardContent>

          <CardFooter className="flex items-center gap-4">
            <Button
              variant="default"
              onClick={() => navigate("/plots")}
            >
              Khám phá danh sách ô đất ngay →
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </Box>
  );
}

