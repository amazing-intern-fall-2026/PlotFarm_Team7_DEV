export interface CropOption {
  id: string;
  name: string;
  highlightTag: string;
  tagVariant: "success" | "warning" | "default";
  cycleDays: number;
  expectedYield: string;
  seedPrice: number;
  imageUrl: string;
  description: string;
}

export interface GrowthMilestone {
  step: number;
  stageName: string;
  daysRange: string;
  expectedDateRange: string;
  summary: string;
  details: string;
}

export interface EngineerInfo {
  name: string;
  role: string;
  experienceYears: number;
  rating: number;
  successfulCrops: number;
  avatarUrl: string;
}

export const CROP_OPTIONS: CropOption[] = [
  {
    id: "rainbow-chard",
    name: "Cải Cầu Vồng Thụy Sĩ",
    highlightTag: "Khuyên trồng mùa này",
    tagVariant: "success",
    cycleDays: 60,
    expectedYield: "18 – 22 kg",
    seedPrice: 350000,
    imageUrl: "/images/plot-1.jpg",
    description: "Giàu chất chống oxy hóa, cuống ngũ sắc rực rỡ, vị ngọt thanh mát.",
  },
  {
    id: "spinach-jp",
    name: "Cải Bó Xôi Nhật",
    highlightTag: "Dinh dưỡng cao",
    tagVariant: "warning",
    cycleDays: 50,
    expectedYield: "15 – 20 kg",
    seedPrice: 300000,
    imageUrl: "/images/plot-2.jpg",
    description: "Giàu sắt và folate, vị ngọt thanh tự nhiên, hợp món xào hoặc nấu canh gia đình.",
  },
  {
    id: "butterhead-lettuce",
    name: "Xà Lách Búp Mỡ",
    highlightTag: "Thu hoạch nhanh",
    tagVariant: "default",
    cycleDays: 45,
    expectedYield: "12 – 16 kg",
    seedPrice: 250000,
    imageUrl: "/images/plot-3.jpg",
    description: "Lá giòn, thơm mát, rất hợp làm các món salad gia đình thanh mát bổ dưỡng.",
  },
];

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

export const ENGINEER_INFO: EngineerInfo = {
  name: "Chú Bảy Nông Lạc",
  role: "Kỹ thuật viên phụ trách",
  experienceYears: 12,
  rating: 4.9,
  successfulCrops: 38,
  avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
};

export const PLOT_DETAIL_TEXTS = {
  reservationBadge: "Ô đất đang được tạm giữ cho bạn:",
  reservationExpiredWarning: "Hết thời gian này, ô đất sẽ tự động mở lại cho khách khác",
  exclusiveReserve: "GIỮ CHỖ ĐỘC QUYỀN",
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
  },
  cropSelectorTitle: "Chọn giống cây gieo trồng",
  cropSelectorSubtitle: "Giống F1 bản quyền, phù hợp vi khí hậu Thung lũng Cam Ly",
  cropSelectorCommitment: "Cam kết tỉ lệ nảy mầm 98%",
  cropSeedPriceLabel: "Giá gói giống",
  cropCycleLabel: "Chu kỳ:",
  cropYieldLabel: "Năng suất:",
  timelineTitle: "Lộ trình sinh trưởng vụ mùa (60 Ngày)",
  timelineSubtitle: "Quy trình 4 giai đoạn tự động cập nhật nhật ký canh tác số",
  timelineStartDate: "Bắt đầu: 01/11/2026",
  invoiceTitle: "Chi tiết chi phí và cam kết dịch vụ",
  invoiceSubtitle: "Minh bạch 100%, không phát sinh phụ phí suốt mùa vụ",
  serviceFreeTag: "MIỄN PHÍ",
  guaranteeText: "Bảo hiểm 100% sản lượng: Hoàn tiền hoặc bù sản lượng tương đương nếu gặp thiên tai, sâu bệnh dịch hại.",
  ctaButtonText: "Khóa ô đất & Chuyển sang thanh toán VietQR",
  mobileCtaButtonText: "Thuê ngay",
  viewReceiptDetail: "Xem chi tiết",
  hideReceiptDetail: "Thu gọn",
  defaultPlotName: "Ô đất #A-104 - Phân khu Dược Liệu",
  defaultZoneName: "Khu A – Thung lũng Cam Ly, P.5, TP. Đà Lạt",
  defaultArea: "20 m²",
  defaultDimensions: "Khổ chuẩn: 4m x 5m",
  defaultBaseRentalPrice: 1500000,
  expertCareOriginalPrice: 400000,
  cameraIotOriginalPrice: 200000,
};
