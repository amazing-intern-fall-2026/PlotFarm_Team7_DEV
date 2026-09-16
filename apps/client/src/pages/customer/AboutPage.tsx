import { Box, Container, Breadcrumb } from "@/shared/ui";
import { AboutLegalCharter } from "@/widgets/AboutLegalCharter";

export function AboutPage() {
  return (
    <Box className="min-h-screen bg-slate-100/60 dark:bg-slate-950 font-sans pb-24 lg:pb-16 w-full max-w-full overflow-hidden">
      <Container size="7xl" className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-6">
        {/* Breadcrumb standard */}
        <Box className="print:hidden">
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Về chúng tôi & Cam kết pháp lý", isCurrent: true },
            ]}
          />
        </Box>

        {/* Legal Charter Contract Document */}
        <AboutLegalCharter />
      </Container>
    </Box>
  );
}
