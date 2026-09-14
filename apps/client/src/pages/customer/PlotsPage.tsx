import { Box } from "@/shared/ui";
import { PlotsExploreHero } from "@/widgets/PlotsHero";
import { PlotsFilterBar } from "@/widgets/PlotsFilter";

export function PlotsPage() {
  return (
    <Box className="w-full">
      {/* Hero Banner Khám Phá Ô Đất Chuẩn Sinh Thái */}
      <PlotsExploreHero />

      {/* Phân vùng Lưới Ô Đất (Plot Grid & Filter) */}
      <Box id="plot-grid-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Thanh tìm kiếm & bộ lọc theo chuẩn giao diện */}
        <PlotsFilterBar />

        {/* Plot Grid will be rendered here for US-18 / US-19 */}
      </Box>
    </Box>
  );
}

