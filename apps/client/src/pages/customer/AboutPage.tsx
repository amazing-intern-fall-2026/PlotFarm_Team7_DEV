import { Box, Container, Typography, Badge } from "@/shared/ui";
import { AboutLegalCharter } from "@/widgets/AboutLegalCharter";
import { MapPin, Phone, ShieldCheck, Sprout } from "lucide-react";

export function AboutPage() {
  return (
    <Box className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans pb-24 lg:pb-16 w-full max-w-full overflow-hidden">
      {/* 1. Farm Hero Banner with Background Image & Short Description */}
      <Box className="relative w-full overflow-hidden bg-slate-900 text-white py-12 sm:py-16 lg:py-20 mb-8 border-b border-emerald-900/30">
        <Box
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/images/background.jpg')" }}
        />
        <Box className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60" />

        <Container size="7xl" className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-4">
          <Box className="flex items-center justify-center gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-xs font-semibold px-3 py-1">
              <Sprout className="w-3.5 h-3.5 mr-1.5 inline text-emerald-400" />
              Nông Trại Số 4.0 Đà Lạt
            </Badge>
          </Box>

          <Typography.H1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Về Chúng Tôi & Cam Kết Nông Nghiệp Sạch
          </Typography.H1>

          <Typography.P className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Hệ sinh thái kết nối cư dân đô thị đồng sở hữu & canh tác vườn rau sạch từ xa tại Lạc Dương, Đà Lạt. Minh bạch 100% qua cảm biến IoT vi khí hậu và camera giám sát trực tiếp 24/7.
          </Typography.P>

          <Box className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs text-slate-400 font-medium">
            <Box className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tiểu khu 158, Đạ Sar, Lạc Dương, Lâm Đồng</span>
            </Box>
            <Box className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hotline: 1900 6868</span>
            </Box>
            <Box className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chuẩn Hữu Cơ TCVN 11041:2017</span>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 2. Main Content Tabs (Cam kết hữu cơ & Bảo hiểm mùa vụ) */}
      <Container size="7xl" className="px-4 sm:px-6 lg:px-8 space-y-6">
        <AboutLegalCharter />
      </Container>
    </Box>
  );
}
