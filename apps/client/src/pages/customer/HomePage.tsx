import { useNavigate } from "react-router-dom";
import { VideoHeroBanner } from "@/widgets/HomeHero";
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

      {/* Marketplace Showcase Container */}
      <Container className="py-12 space-y-8">
        <Card className="w-full border border-emerald-100/80 bg-white/80 backdrop-blur shadow-sm">
          <CardHeader>
            <Box className="flex items-center justify-between">
              <CardTitle className="text-slate-900 font-bold">
                Sàn Nông Nghiệp Công Nghệ Cao (Marketplace)
              </CardTitle>
              <Badge variant="success">VietGAP 100%</Badge>
            </Box>
            <CardDescription className="text-slate-600">
              Sở hữu vườn rau hữu cơ riêng của bạn - Giám sát sinh trưởng 24/7
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Text variant="muted" className="text-sm leading-relaxed text-slate-600">
              Kết nối trực tiếp cư dân thành thị với nông trại công nghệ cao tại Đạ Sar, Lạc Dương, Đà Lạt. 
              Bạn có thể thuê ô đất, chọn giống gieo trồng, theo dõi camera trực tiếp và nhận nông sản tươi chuyển phát tận cửa nhà mỗi tuần.
            </Text>
          </CardContent>

          <CardFooter className="flex items-center gap-4">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
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

