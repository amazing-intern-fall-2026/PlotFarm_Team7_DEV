import { Box, Container } from "@/shared/ui";
import { AboutHeroBanner, AboutLegalCharter } from "@/widgets/AboutLegalCharter";

export function AboutPage() {
  return (
    <Box className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans pb-24 lg:pb-16 w-full max-w-full overflow-hidden">
      {/* 1. Explore-Plots Style Hero Banner */}
      <AboutHeroBanner />

      {/* 2. Main Content Tabs (Cam kết chuẩn hữu cơ & Bảo hiểm mùa vụ) */}
      <Container size="7xl" className="px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        <AboutLegalCharter />
      </Container>
    </Box>
  );
}
