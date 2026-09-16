export interface PlotCropInfo {
  id: string;
  name: string;
  variety: string;
  cycleDays: number;
  /** Alias for cycleDays – used in PlotDetailPage */
  harvestCycleDays?: number;
  expectedYield: string;
  /** Alias for expectedYield – used in PlotDetailPage */
  expectedYieldKg?: string;
  imageUrl: string;
  description: string;
  standard: string;
  plantingDensity: string;
}

export interface GrowthMilestone {
  step: number;
  stageName: string;
  daysRange: string;
  expectedDateRange: string;
  summary: string;
  details: string;
}

export interface FarmerProfile {
  name: string;
  badgeTitle: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  successfulCrops: number;
  responseRate: string;
  location: string;
  isVerified: boolean;
  avatarUrl: string;
  bio: string;
}

export const DEFAULT_PLOT_CROP: PlotCropInfo = {
  id: "rainbow-chard",
  name: "Cải Cầu Vồng Thụy Sĩ",
  variety: "Hạt giống F1 Thụy Sĩ bản quyền",
  cycleDays: 60,
  harvestCycleDays: 60,
  expectedYield: "18 – 22 kg / vụ",
  expectedYieldKg: "18 – 22 kg / vụ",
  imageUrl: "/images/plot-1.jpg",
  description: "Cây sinh trưởng mạnh, giàu chất chống oxy hóa Betalain, thân cuống ngũ sắc rực rỡ và có vị ngọt bùi tự nhiên.",
  standard: "Chuẩn Hữu Cơ VietGAP 100%",
  plantingDensity: "12 cây / m² (Khoảng cách hàng 25cm)",
};

export const GROWTH_MILESTONES: GrowthMilestone[] = [
  {
    step: 1,
    stageName: "Làm đất vi sinh & Gieo hạt nảy mầm",
    daysRange: "Ngày 01 – 07",
    expectedDateRange: "Dự kiến: 01/11 – 07/11",
    summary: "Đất được ủ phân trùn quế & trấu hun sinh học. Hạt giống F1 gieo với mật độ 12 cây/m², độ ẩm 70%.",
    details: "Khử khuẩn đất bằng chế phẩm vi sinh hữu cơ bản địa, cân bằng độ pH đạt mức 6.5 lý tưởng. Hạt giống nảy mầm đều sau 72 giờ trong nhà màng công nghệ cao.",
  },
  {
    step: 2,
    stageName: "Cây con bén rễ & Phun sương sinh học",
    daysRange: "Ngày 08 – 30",
    expectedDateRange: "Dự kiến: 08/11 – 30/11",
    summary: "Hệ thống bón thúc hữu cơ qua đường ống tưới nhỏ giọt Israel. Cập nhật ảnh mầm cây đầu tiên qua ứng dụng.",
    details: "Phun bổ sung khoáng nano sinh học kích thích bộ rễ phát triển sâu 15cm. Cảm biến IoT tự động điều hòa ẩm độ và gửi cảnh báo khi vi khí hậu thay đổi.",
  },
  {
    step: 3,
    stageName: "Phát triển thân lá & Nuôi dưỡng khoáng chất",
    daysRange: "Ngày 31 – 50",
    expectedDateRange: "Dự kiến: 01/12 – 20/12",
    summary: "Giai đoạn thân lá vươn mạnh mẽ. Kiểm soát sâu bệnh hoàn toàn bằng bẫy pheromone và tinh dầu quế tỏi.",
    details: "Định kỳ tỉa lá gốc thông thoáng, bổ sung canxi-bo từ vỏ trứng lên men hữu cơ giúp phiến lá dày, màu sắc óng mượt và không dư lượng hóa học.",
  },
  {
    step: 4,
    stageName: "Tích tụ dưỡng chất, Kiểm nghiệm & Thu hoạch",
    daysRange: "Ngày 51 – 60",
    expectedDateRange: "Dự kiến: 21/12 – 30/12",
    summary: "Cắt tỉa thu hoạch lúc 5:00 sáng khi rau mọng nước nhất. Đóng thùng Eco-Box gửi xe lạnh tới tận nhà bạn trong 12 giờ.",
    details: "Lấy mẫu test nhanh Nitrate và vi sinh độc lập trước 48h thu hoạch. Đóng gói bảo quản lạnh 8°C giữ trọn vẹn vị tươi ngon từ nông trại tới bàn ăn.",
  },
];

export const FARMER_PROFILE: FarmerProfile = {
  name: "Chú Bảy Nông Lạc",
  badgeTitle: "Đối tác Kỹ sư Nông vụ Xuất sắc",
  experienceYears: 12,
  rating: 4.9,
  reviewsCount: 128,
  successfulCrops: 38,
  responseRate: "99.2%",
  location: "Thung lũng Cam Ly, TP. Đà Lạt",
  isVerified: true,
  avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
  bio: "Chuyên gia canh tác rau củ quả ôn đới công nghệ cao. Hơn 10 năm gắn bó với mô hình nông nghiệp hữu cơ vi sinh không hóa chất.",
};

export const PLOT_DETAIL_TEXTS = {
  organicStandardBadge: "Thổ nhưỡng chuẩn Organic Bio 100%",
  soilMetrics: {
    phLabel: "Độ pH đất",
    phIdeal: "Lý tưởng",
    phRange: "6.5 / 7.0 max",
    moistureLabel: "Ẩm độ đất",
    moistureOptimal: "Tối ưu",
    moistureRange: "68% Dung lượng ẩm",
  },
  systemSpecs: {
    soilTreatment: "Xử lý đất vi sinh sạch mầm bệnh với Trichoderma và phân hữu cơ trùn quế hoai mục.",
    irrigation: "Hệ thống tưới tự động: Tưới nhỏ giọt Israel + Phun sương bù ẩm vi khí hậu điều khiển qua Cloud.",
    standard: "Canh tác 100% hữu cơ VietGAP, không thuốc trừ sâu hóa học.",
  },
  cropCardTitle: "Giống cây trồng được quy hoạch cho ô đất",
  cropCardSubtitle: "Quy hoạch phân khu chuyên canh phù hợp thổ nhưỡng và vi khí hậu",
  cropCycleLabel: "Chu kỳ sinh trưởng:",
  cropYieldLabel: "Năng suất dự kiến:",
  cropDensityLabel: "Mật độ gieo trồng:",
  cropStandardLabel: "Quy chuẩn:",
  timelineTitle: "Lộ trình sinh trưởng vụ mùa (60 Ngày)",
  timelineSubtitle: "Quy trình 4 giai đoạn tự động cập nhật nhật ký canh tác số",
  timelineStartDate: "Bắt đầu: 01/11/2026",
  invoiceTitle: "Hóa đơn chi phí vụ mùa",
  invoiceSubtitle: "Gói thuê đất trọn gói 60 ngày khép kín",
  serviceFreeTag: "MIỄN PHÍ",
  includedTag: "ĐÃ BAO GỒM",
  guaranteeText: "Bảo hiểm 100% sản lượng hữu cơ VietGAP (hoàn tiền hoặc bù sản lượng nếu thiên tai).",
  ctaButtonText: "Xác nhận & Thanh toán VietQR",
  mobileCtaButtonText: "Thuê ngay",
  defaultPlotName: "Ô đất #A-104 - Phân khu Dược Liệu",
  defaultZoneName: "Khu A – Thung lũng Cam Ly, P.5, TP. Đà Lạt",
  defaultArea: 20,
  defaultDimensions: "Khổ chuẩn: 4m x 5m",
  defaultBaseRentalPrice: 1500000,
  expertCareOriginalPrice: 400000,
  cameraIotOriginalPrice: 200000,
};
