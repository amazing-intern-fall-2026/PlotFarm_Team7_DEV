import * as React from "react";

export interface FarmVideoSlide {
  id: string;
  videoSrc: string;
  badge: string;
  headline: string;
  subheadline: string;
  tag: string;
  shortTitle: string;
  stats: {
    label: string;
    value: string;
  };
}

export const DEFAULT_FARM_VIDEOS: FarmVideoSlide[] = [
  {
    id: "plot-farming",
    videoSrc: "/video/plot-farming.mp4",
    badge: "PHÂN KHU THỰC NGHIỆM 4.0",
    headline: "Kiến Tạo & Giám Sát Ô Đất Của Riêng Bạn",
    subheadline:
      "Sở hữu thửa đất canh tác thông minh, theo dõi sinh trưởng từng luống rau sạch 24/7 qua hệ sinh thái IoT & camera trực tiếp.",
    tag: "01. Ô Đất Canh Tác",
    shortTitle: "Ô đất nông trại",
    stats: { label: "Diện tích canh tác", value: "12.500 m²" },
  },
  {
    id: "do-farming",
    videoSrc: "/video/do-farmming.mp4",
    badge: "KỸ THUẬT NÔNG HỌC CHUYÊN SÂU",
    headline: "Kỹ Sư Nông Nghiệp Đồng Hành Từng Mầm Cây",
    subheadline:
      "Quy trình gieo trồng, tưới tiêu tự động và chăm sóc bằng chế phẩm sinh học đạt chuẩn an toàn VietGAP & GlobalGAP.",
    tag: "02. Chăm Sóc Nông Học",
    shortTitle: "Kỹ thuật canh tác",
    stats: { label: "Kỹ sư chuyên trách", value: "18 chuyên gia" },
  },
  {
    id: "get-rice",
    videoSrc: "/video/get-rice.mp4",
    badge: "MÙA VỤ BỘI THU & THU HOẠCH",
    headline: "Nông Sản Tươi Ngon Thu Hoạch Tận Gốc",
    subheadline:
      "Nông sản được thu hoạch vào sáng sớm theo chu kỳ chuẩn, kiểm định nghiêm ngặt và đóng gói bảo quản lạnh trong ngày.",
    tag: "03. Mùa Vụ Bội Thu",
    shortTitle: "Thu hoạch tươi sạch",
    stats: { label: "Tỷ lệ chuẩn loại 1", value: "98.5% đạt chuẩn" },
  },
  {
    id: "chicken",
    videoSrc: "/video/chicken.mp4",
    badge: "HỆ SINH THÁI TUẦN HOÀN",
    headline: "Mô Hình Vườn — Ao — Chuồng Hữu Cơ Khép Kín",
    subheadline:
      "Chăn thả tự nhiên dưới tán rừng thông Đà Lạt, nguồn thức ăn hữu cơ sạch mang lại nguồn dinh dưỡng an lành cho gia đình bạn.",
    tag: "04. Sinh Thái Tuần Hoàn",
    shortTitle: "Chăn nuôi tự nhiên",
    stats: { label: "Môi trường sống", value: "100% tự nhiên" },
  },
];

export interface VideoHeroBannerProps {
  slides?: FarmVideoSlide[];
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  onSecondaryCtaClick?: () => void;
  className?: string;
}

export interface VideoHeroBannerViewProps {
  slides: FarmVideoSlide[];
  currentIndex: number;
  currentSlide: FarmVideoSlide;
  isTransitioning: boolean;
  showStatsCard: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  handleVideoEnded: () => void;
  switchVideo: (index: number) => void;
  setShowStatsCard: (show: boolean) => void;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  onSecondaryCtaClick?: () => void;
  className?: string;
  telemetryLoading?: boolean;
  telemetry?: {
    location: string;
    areaM2: number;
    humidity: number;
    temperature: number;
    sensorStatus: string;
  };
}
