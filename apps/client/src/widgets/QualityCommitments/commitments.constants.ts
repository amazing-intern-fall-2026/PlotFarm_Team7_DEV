export type CommitmentIconType = "ShieldCheck" | "Sprout" | "PackageCheck" | "Truck";


export interface CommitmentTheme {
  badgeClass: string;
  iconBgClass: string;
  iconTextClass: string;
  borderHoverClass: string;
}

export interface CommitmentItem {
  id: string;
  icon: CommitmentIconType;
  title: string;
  highlight: string;
  description: string;
  colorTheme: CommitmentTheme;
}

export const COMMITMENTS_HEADER = {
  BADGE: "TIÊU CHUẨN CANH TÁC 5 SAO",
  TITLE: "Cam Kết Chất Lượng Canh Tác Hữu Cơ Tại PlotFarm",
  SUBTITLE:
    "Toàn bộ quy trình gieo trồng được kỹ sư nông nghiệp Đà Lạt chăm sóc trực tiếp và cam kết bằng hợp đồng điện tử minh bạch.",
} as const;

export const COMMITMENT_ITEMS: CommitmentItem[] = [
  {
    id: "f1-seed",
    icon: "ShieldCheck",
    title: "Hạt Giống Hữu Cơ F1",
    highlight: "F1 Non-GMO",
    description:
      "100% giống thuần chủng Non-GMO, nhập khẩu chuẩn châu Âu hoặc tuyển chọn bản địa Đà Lạt.",
    colorTheme: {
      badgeClass:
        "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
      iconBgClass:
        "bg-emerald-50 border-emerald-200/70 text-emerald-700 dark:bg-emerald-950/50 dark:border-emerald-800/70 dark:text-emerald-300",
      iconTextClass: "text-emerald-700 dark:text-emerald-300",
      borderHoverClass:
        "hover:border-emerald-300 dark:hover:border-emerald-700",
    },
  },
  {
    id: "germination-guarantee",
    icon: "Sprout",
    title: "Bảo Hành Nảy Mầm",
    highlight: "> 90%",
    description:
      "Cam kết gieo bổ sung cây giống khỏe mạnh hoàn toàn miễn phí nếu tỷ lệ nảy mầm dưới 90%.",
    colorTheme: {
      badgeClass:
        "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
      iconBgClass:
        "bg-amber-50 border-amber-200/70 text-amber-700 dark:bg-amber-950/50 dark:border-amber-800/70 dark:text-amber-300",
      iconTextClass: "text-amber-700 dark:text-amber-300",
      borderHoverClass:
        "hover:border-amber-300 dark:hover:border-amber-700",
    },
  },
  {
    id: "worm-fertilizer",
    icon: "PackageCheck",
    title: "Tặng Phân Trùn Quế",
    highlight: "2 Đợt / Tháng",
    description:
      "Miễn phí 2 lần bổ sung dinh dưỡng sinh học trùn quế mỗi tháng cho rau mướt lá, ngọt vị tự nhiên.",
    colorTheme: {
      badgeClass:
        "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
      iconBgClass:
        "bg-emerald-50 border-emerald-200/70 text-emerald-700 dark:bg-emerald-950/50 dark:border-emerald-800/70 dark:text-emerald-300",
      iconTextClass: "text-emerald-700 dark:text-emerald-300",
      borderHoverClass:
        "hover:border-emerald-300 dark:hover:border-emerald-700",
    },
  },
  {
    id: "express-cold-delivery",
    icon: "Truck",
    title: "Giao Lạnh 24h Tận Cửa",
    highlight: "< 24H",
    description:
      "Thu hoạch sáng sớm từ vườn Đà Lạt, đóng thùng giữ nhiệt sinh thái giao ngay tới căn bếp nhà bạn.",
    colorTheme: {
      badgeClass:
        "border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950/60 dark:text-orange-300",
      iconBgClass:
        "bg-orange-50 border-orange-200/70 text-orange-700 dark:bg-orange-950/50 dark:border-orange-800/70 dark:text-orange-300",
      iconTextClass: "text-orange-700 dark:text-orange-300",
      borderHoverClass:
        "hover:border-orange-300 dark:hover:border-orange-700",
    },
  },
];

export const COMMITMENTS_SUPPORT_BAR = {
  TITLE: "Chưa biết nên chọn diện tích 15m² hay 20m²?",
  SUBTITLE:
    "Kỹ sư nông nghiệp sẵn sàng tư vấn loại rau và tính toán lượng ăn hàng tuần cho gia đình bạn.",
  CTA_TEXT: "Tư vấn trực tiếp 1:1",
  PHONE_HOTLINE: "1900 6868",
} as const;
