/**
 * Interface chuẩn cho giống rau mùa vụ - tuân thủ cấu trúc PlotFarm API Spec v2.0
 * Liên kết Endpoint: GET /api/v1/crops và GET /api/v1/farms/:farmSlug/plots
 */
export interface SeasonalCropItem {
  cropCode: string;
  cropSlug: string;
  name: string;
  scientificName?: string;
  description: string;
  tagBadge: string;
  badgeVariant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline";
  imageUrl: string;
  growthDurationDays: number;
  durationLabel: string;
  expectedYieldKg: string;
  soilType: string;
  basePricePerPlot?: number;
}

export const SEASONAL_CROPS_DATA: SeasonalCropItem[] = [
  {
    cropCode: "CRP-SPINACH-01",
    cropSlug: "cai-bo-xoi-nhat",
    name: "Cải bó xôi Nhật (Spinach)",
    description: "Hàm lượng sắt cao, ngọt tự nhiên khi nấu chín hoặc ép nước tươi mát.",
    tagBadge: "Bán chạy nhất",
    badgeVariant: "secondary",
    imageUrl: "/images/plot-1.jpg",
    growthDurationDays: 60,
    durationLabel: "60 ngày",
    expectedYieldKg: "15 – 20kg / vụ",
    soilType: "Bazan Organic 100%",
    basePricePerPlot: 1200000,
  },
  {
    cropCode: "CRP-CHARD-01",
    cropSlug: "cai-cau-vong-thuy-si",
    name: "Cải cầu vồng Thụy Sĩ (Rainbow Chard)",
    description: "Giàu Vitamin A, C, khoáng chất vi lượng, màu sắc sống động bừng sáng bàn ăn.",
    tagBadge: "Dinh dưỡng cao",
    badgeVariant: "warning",
    imageUrl: "/images/plot-2.jpg",
    growthDurationDays: 60,
    durationLabel: "60 ngày",
    expectedYieldKg: "18 – 22kg / vụ",
    soilType: "Bazan Phù Sa Mùn",
    basePricePerPlot: 1400000,
  },
  {
    cropCode: "CRP-LETTUCE-01",
    cropSlug: "xa-lach-bup-mo-da-lat",
    name: "Xà lách búp mỡ Đà Lạt",
    description: "Lá mỏng giòn béo, vị ngọt mát tự nhiên phù hợp món salad chuẩn hữu cơ mỗi ngày.",
    tagBadge: "Dễ chăm sóc",
    badgeVariant: "success",
    imageUrl: "/images/plot-3.jpg",
    growthDurationDays: 45,
    durationLabel: "45 ngày (Ngắn)",
    expectedYieldKg: "12 – 16kg / vụ",
    soilType: "Giá thể xơ dừa sinh học",
    basePricePerPlot: 1100000,
  },
  {
    cropCode: "CRP-KALE-01",
    cropSlug: "cai-kale-xoan-da-lat",
    name: "Cải Kale xoăn Đà Lạt (Curly Kale)",
    description: "Nữ hoàng siêu thực phẩm, giàu canxi, chất chống oxy hóa và chất xơ hòa tan.",
    tagBadge: "Siêu thực phẩm",
    badgeVariant: "success",
    imageUrl: "/images/plot-1.jpg",
    growthDurationDays: 70,
    durationLabel: "70 ngày",
    expectedYieldKg: "14 – 18kg / vụ",
    soilType: "Bazan Organic 100%",
    basePricePerPlot: 1350000,
  },
  {
    cropCode: "CRP-CARROT-01",
    cropSlug: "ca-rot-baby-huu-co",
    name: "Cà rốt Baby hữu cơ Đà Lạt",
    description: "Củ thon nhỏ, vị ngọt đậm giòn tan, giàu beta-carotene cho thị lực và làn da.",
    tagBadge: "Ưa chuộng",
    badgeVariant: "secondary",
    imageUrl: "/images/plot-2.jpg",
    growthDurationDays: 65,
    durationLabel: "65 ngày",
    expectedYieldKg: "16 – 20kg / vụ",
    soilType: "Đất thịt nhẹ phù sa",
    basePricePerPlot: 1250000,
  },
];
