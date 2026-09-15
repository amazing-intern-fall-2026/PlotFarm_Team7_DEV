export interface StatusDisplayConfig {
  badgeText: string;
  badgeDetailText: string;
  dotColor: string;
  textColor: string;
  buttonText: string;
}

export const PLOT_STATUS_CONFIG: Record<string, StatusDisplayConfig> = {
  AVAILABLE: {
    badgeText: "Sẵn sàng",
    badgeDetailText: "Sẵn sàng thuê",
    dotColor: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    textColor: "text-emerald-700 dark:text-emerald-400",
    buttonText: "Xem chi tiết & Thuê",
  },
  RESERVED: {
    badgeText: "Đang được giữ chỗ",
    badgeDetailText: "Đang được giữ chỗ",
    dotColor: "bg-amber-500",
    textColor: "text-amber-700 dark:text-amber-400",
    buttonText: "Tạm khóa giữ chỗ",
  },
  OCCUPIED: {
    badgeText: "Đang có cây trồng",
    badgeDetailText: "Đang canh tác",
    dotColor: "bg-slate-400",
    textColor: "text-muted-foreground",
    buttonText: "Đang được canh tác",
  },
  HARVESTING: {
    badgeText: "Đang thu hoạch",
    badgeDetailText: "Đang thu hoạch",
    dotColor: "bg-purple-500",
    textColor: "text-purple-700 dark:text-purple-400",
    buttonText: "Đang thu hoạch",
  },
  MAINTENANCE: {
    badgeText: "Đang cải tạo đất",
    badgeDetailText: "Bảo dưỡng / Cải tạo",
    dotColor: "bg-amber-600",
    textColor: "text-amber-800 dark:text-amber-500",
    buttonText: "Bảo dưỡng / Cải tạo",
  },
  INACTIVE: {
    badgeText: "Tạm ngưng",
    badgeDetailText: "Tạm ngưng",
    dotColor: "bg-slate-300",
    textColor: "text-muted-foreground",
    buttonText: "Tạm ngưng",
  },
};

export const PLOT_CARD_MESSAGES = {
  AREA_LABEL: "Diện tích:",
  PRICE_LABEL: "Giá thuê tháng:",
  SOIL_DEFAULT: "Đất đỏ Bazan sinh thái",
  SOIL_PREFIX: "Đất: ",
  CROP_PREFIX: "Cây: ",
  TOOLTIP_CAMERA: "Hỗ trợ HLS Live Camera 1080p",
  TOOLTIP_IOT: "Trang bị cảm biến IoT độ ẩm & dinh dưỡng",
} as const;

export const PLOT_GRID_MESSAGES = {
  EMPTY_TITLE: "Không tìm thấy ô đất phù hợp",
  EMPTY_DESCRIPTION:
    "Không có ô đất nào khớp với tiêu chí tìm kiếm hoặc bộ lọc hiện tại. Vui lòng thử đổi từ khóa hoặc chọn trạng thái khác.",
} as const;

export const PLOT_DRAWER_MESSAGES = {
  CLOSE_ARIA: "Đóng chi tiết",
  CAMERA_FEED_TITLE: "Camera trực tiếp nông trại",
  CAMERA_LIVE_BADGE: "LIVE 1080p",
  CAMERA_PANORAMA_PREFIX: "Góc quay toàn cảnh ô #",
  SPECS_TITLE: "Thông số kỹ thuật ô đất",
  SPEC_AREA: "Diện tích chuẩn",
  SPEC_IRRIGATION: "Tưới nhỏ giọt",
  SPEC_IRRIGATION_AUTO: "Tự động hóa",
  SPEC_IOT: "Cảm biến IoT",
  SPEC_IOT_FULL: "Đầy đủ cảm biến",
  SPEC_IOT_BASIC: "Cơ bản",
  SPEC_STANDARD: "Chuẩn sinh thái",
  SPEC_STANDARD_VIETGAP: "VietGAP hữu cơ",
  SOIL_SECTION_TITLE: "Thổ nhưỡng & Dinh dưỡng đất",
  SOIL_SECTION_DESC:
    "Được bổ sung phân trùn quế và vi sinh hữu cơ định kỳ. Độ pH cân bằng 6.2 - 6.8, giàu khoáng chất tự nhiên.",
  PRICE_MONTH_LABEL: "Đơn giá thuê hàng tháng:",
  COMMITMENT_TERM: "Kỳ hạn linh hoạt: 3 tháng, 6 tháng hoặc 12 tháng",
  COMMITMENT_INCLUSIVE: "Bao trọn chi phí nước tưới, điện năng & bảo trì IoT",
  CTA_BOOKING: "Tiến hành đăng ký & Thuê ô đất này",
  CTA_CONTINUE: "Tiếp tục xem các ô đất khác",
} as const;

export const DEFAULT_PLOT_IMAGES: Record<string, string> = {
  "PLT-A01": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
  "PLT-A02": "https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=600&q=80",
  "PLT-A03": "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80",
  "PLT-A04": "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80",
  "PLT-B01": "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=600&q=80",
  "PLT-B02": "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80",
  "PLT-B03": "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80",
  "PLT-B04": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80",
  "PLT-C01": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80",
  "PLT-C02": "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=600&q=80",
  "PLT-C03": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
  "PLT-C04": "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80",
};

export const FALLBACK_PLOT_IMAGE =
  "https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=600&q=80";

export function getPlotImageUrl(plot: { plotCode: string; imageUrl?: string }): string {
  return plot.imageUrl || DEFAULT_PLOT_IMAGES[plot.plotCode] || FALLBACK_PLOT_IMAGE;
}
