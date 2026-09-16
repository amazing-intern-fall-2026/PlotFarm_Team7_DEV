import { Box, Container, Typography } from "@/shared/ui";
import {
  AboutHeroBanner,
  AboutOurWhy,
  AboutStories,
  AboutLegalCharter,
} from "@/widgets/AboutLegalCharter";

export function AboutPage() {
  return (
    <Box className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans pb-24 lg:pb-32 w-full max-w-full overflow-hidden space-y-16 lg:space-y-24">
      {/* 1. Hero Banner phong cách Nông nghiệp số Agrivi */}
      <AboutHeroBanner />

      <Container size="7xl" className="px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {/* 2. Khối Sứ Mệnh & Giá Trị Cốt Lõi (Our Why) */}
        <AboutOurWhy />

        {/* 3. Khối Câu Chuyện Thực Tế Từ Nông Dân & Khách Hàng (Stories & Testimonials) */}
        <AboutStories />

        {/* 4. Khối Bản Cam Kết Tiêu Chuẩn Hữu Cơ & Quy Chế Bảo Hiểm Mùa Vụ */}
        <Box className="pt-8 border-t border-border/70 space-y-8">
          <Box className="text-center max-w-2xl mx-auto space-y-2">
            <Typography.H2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-sans">
              Quy Chuẩn Canh Tác & Bảo Lãnh Pháp Lý
            </Typography.H2>
            <Typography.P className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
              Toàn bộ quy trình canh tác và phân phối đều được chuẩn hóa theo quy chuẩn an toàn sinh học quốc gia với chính sách bảo hiểm mùa vụ 100%.
            </Typography.P>
          </Box>
          <AboutLegalCharter />
        </Box>
      </Container>
    </Box>
  );
}

