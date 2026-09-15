export const PLOTS_FILTER_MESSAGES = {
  SEARCH_PLACEHOLDER: "Tìm theo mã ô (#A-101), khu vực hoặc loại rau canh tác...",
  CLEAR_SEARCH_ARIA: "Xóa từ khóa",
  SORT_LABEL: "Sắp xếp:",
  SORT_ARIA: "Sắp xếp ô đất",
  MOBILE_FILTER_BUTTON: "Lọc chi tiết",
  RESET_BUTTON: "Đặt lại",
  SECTION_BADGE: "DANH SÁCH Ô ĐẤT",
  SECTION_TITLE: "Các ô đất đang sẵn sàng canh tác",
  DISPLAY_LABEL: "Hiển thị",
  MATCHING_PLOTS_SUFFIX: "ô đất phù hợp",
  ALL_SIZES_LABEL: "Tất cả",
  SIZE_15M_LABEL: "Lô 15m²",
  SIZE_20M_LABEL: "Lô 20m²",
} as const;

export const PLOTS_FILTER_SORT_OPTIONS = [
  { value: "code_asc", label: "Mã ô: A → Z" },
  { value: "price_asc", label: "Giá thuê: Thấp → Cao" },
  { value: "price_desc", label: "Giá thuê: Cao → Thấp" },
  { value: "area_desc", label: "Diện tích: Lớn nhất" },
] as const;

export const PLOTS_STATUS_CHIP_DEFINITIONS = [
  {
    id: "AVAILABLE",
    label: "Sẵn sàng thuê",
    dotColor: "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]",
    activeStyle:
      "bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-400/30 font-semibold dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
  },
  {
    id: "OCCUPIED",
    label: "Đang canh tác",
    dotColor: "bg-sky-500",
    activeStyle:
      "bg-sky-50 text-sky-800 border-sky-300 ring-1 ring-sky-400/30 font-semibold dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800",
  },
  {
    id: "MAINTENANCE",
    label: "Bảo dưỡng",
    dotColor: "bg-amber-500",
    activeStyle:
      "bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-400/30 font-semibold dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
  },
  {
    id: "RESERVED",
    label: "Đang giữ chỗ",
    dotColor: "bg-orange-500",
    activeStyle:
      "bg-orange-50 text-orange-800 border-orange-300 ring-1 ring-orange-400/30 font-semibold dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800",
  },
] as const;
