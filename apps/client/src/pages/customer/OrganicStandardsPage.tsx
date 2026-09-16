import { Box, Container, Breadcrumb } from "@/shared/ui";
import { OrganicStandards } from "@/widgets/OrganicStandards";

export function OrganicStandardsPage() {
  return (
    <Box className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans pb-24 lg:pb-16 w-full max-w-full overflow-hidden">
      <Container size="7xl" className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-10">
        {/* Breadcrumb standard */}
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Pháp lý", href: "/legal/organic-standards" },
            { label: "Cam kết tiêu chuẩn hữu cơ", isCurrent: true },
          ]}
        />
        <OrganicStandards />
      </Container>
    </Box>
  );
}
