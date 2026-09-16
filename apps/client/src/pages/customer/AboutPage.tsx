import { Box, Typography } from "@/shared/ui";
import {
  AboutHeroBanner,
  AboutOurWhy,
  AboutStories,
  AboutLegalCharter,
} from "@/widgets/AboutLegalCharter";

export function AboutPage() {
  return (
    <Box className="w-full space-y-16 sm:space-y-20 lg:space-y-24 pb-16 font-sans">
      <AboutHeroBanner />

      <Box className="w-full">
        <AboutOurWhy />
      </Box>

      <Box className="w-full">
        <AboutStories />
      </Box>

      <Box className="w-full space-y-8">
        <Box className="text-center max-w-2xl mx-auto space-y-3">
          <Typography.H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight font-sans">
            Quy Chuẩn Canh Tác & Bảo Lãnh Pháp Lý
          </Typography.H2>
          <Typography.P className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
            Toàn bộ quy trình canh tác và phân phối đều được chuẩn hóa theo quy chuẩn an toàn sinh học quốc gia với chính sách bảo hiểm mùa vụ 100%.
          </Typography.P>
        </Box>

        <AboutLegalCharter />
      </Box>
    </Box>
  );
}
