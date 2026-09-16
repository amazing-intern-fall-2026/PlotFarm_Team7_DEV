import { Box, Container, Typography } from "@/shared/ui";
import {
  AboutHeroBanner,
  AboutOurWhy,
  AboutStories,
  AboutLegalCharter,
} from "@/widgets/AboutLegalCharter";

export function AboutPage() {
  return (
    <Box className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans pb-24 lg:pb-32 w-full max-w-full overflow-hidden">
      {/* 1. Hero Banner: Full-width, Agrivi Digital Agri Style với ảnh nền /images/background.jpg */}
      <AboutHeroBanner />

      {/* Đường phân cách full-page thống nhất */}
      <Box className="w-full border-b border-border/70" />

      {/* 2. Khối Sứ Mệnh & Giá Trị Cốt Lõi (Our Why - 3 Cột) */}
      <Box className="py-16 sm:py-20 lg:py-24 w-full">
        <Container size="7xl" className="px-4 sm:px-6 lg:px-8">
          <AboutOurWhy />
        </Container>
      </Box>

      {/* Đường phân cách full-page thống nhất */}
      <Box className="w-full border-b border-border/70" />

      {/* 3. Khối Câu Chuyện Thực Tế Từ Nông Dân & Khách Hàng (Stories & Testimonials - 3 Cột) */}
      <Box className="py-16 sm:py-20 lg:py-24 w-full">
        <Container size="7xl" className="px-4 sm:px-6 lg:px-8">
          <AboutStories />
        </Container>
      </Box>

      {/* Đường phân cách full-page thống nhất */}
      <Box className="w-full border-b border-border/70" />

      {/* 4. Khối Quy Chuẩn Canh Tác & Bảo Lãnh Pháp Lý (Cam Kết Hữu Cơ & Bảo Hiểm Mùa Vụ) */}
      <Box className="py-16 sm:py-20 lg:py-24 w-full">
        <Container size="7xl" className="px-4 sm:px-6 lg:px-8 space-y-10">
          <Box className="text-center max-w-2xl mx-auto space-y-3">
            <Typography.H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight font-sans">
              Quy Chuẩn Canh Tác & Bảo Lãnh Pháp Lý
            </Typography.H2>
            <Typography.P className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
              Toàn bộ quy trình canh tác và phân phối đều được chuẩn hóa theo quy chuẩn an toàn sinh học quốc gia với chính sách bảo hiểm mùa vụ 100%.
            </Typography.P>
          </Box>

          <AboutLegalCharter />
        </Container>
      </Box>
    </Box>
  );
}


