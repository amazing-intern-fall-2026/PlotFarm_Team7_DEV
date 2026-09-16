export interface OrganicPillarItem {
  id: string;
  pillarNumber: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  checkpoints: string[];
  iconName: "shield" | "droplets" | "sprout" | "sun" | "dna";
}

export interface InspectionCertificateItem {
  id: string;
  standardName: string;
  badgeLabel: string;
  code: string;
  certifier: string;
  validUntil: string;
  testReportUrl: string;
  auditScope: string;
}

export const ORGANIC_PILLARS: OrganicPillarItem[] = [
  {
    id: "pillar-1",
    pillarNumber: "01",
    title: "100% Không Thuốc BVTV Hóa Học",
    subtitle: "Sinh học đối kháng tự nhiên",
    description: "Nói KHÔNG với thuốc diệt cỏ, thuốc trừ sâu hóa học tổng hợp. Chúng tôi chỉ ứng dụng thảo dược tự nhiên (tỏi, ớt, gừng ngâm men vi sinh) và thiên địch bọ rùa để kiểm soát sâu hại.",
    metric: "0.00%",
    metricLabel: "Dư lượng hóa chất tổng hợp",
    checkpoints: [
      "Chiết xuất thảo mộc Neem & tinh dầu tràm tự nhiên",
      "Nuôi thả thiên địch (ong ký sinh, bọ rùa đỏ)",
      "Kiểm tra dư lượng độc lập định kỳ 30 ngày/lần",
    ],
    iconName: "shield",
  },
  {
    id: "pillar-2",
    pillarNumber: "02",
    title: "Nguồn Nước Tưới Đạ Sar Chuẩn Kiểm Định",
    subtitle: "Nước ngầm khe núi nguyên sinh",
    description: "Khai thác từ mạch nước ngầm độ sâu 120m tại tiểu khu rừng thông Đạ Sar (Đà Lạt), qua hệ thống lọc đa tầng cát thạch anh, than hoạt tính, màng RO và thanh trùng tia cực tím UV.",
    metric: "100%",
    metricLabel: "Nước đạt chuẩn QCVN 01-1:2018/BYT",
    checkpoints: [
      "Hệ thống tưới nhỏ giọt Israel kiểm soát lưu lượng tự động",
      "Chỉ số TDS < 45 ppm, độ pH cân bằng 6.5 - 7.0",
      "Cảm biến EC đo độ dẫn điện nước tưới liên tục 24/7",
    ],
    iconName: "droplets",
  },
  {
    id: "pillar-3",
    pillarNumber: "03",
    title: "Dinh Dưỡng Từ Phân Trùn Quế Sinh Học",
    subtitle: "Khoáng vi lượng và men vi sinh",
    description: "Sử dụng mùn trùn quế nguyên chất giàu axit humic, kết hợp phân hữu cơ hoai mục ủ men vi sinh Bacillus subtilis và đạm cá thủy phân enzyme lạnh cung cấp dưỡng chất bền vững cho rau.",
    metric: "35+ tấn",
    metricLabel: "Mùn hữu cơ vi sinh bổ sung/năm",
    checkpoints: [
      "Đạm cá thủy phân enzyme lạnh không hóa chất kích thích",
      "Kích thích rễ tự nhiên bằng hệ nấm rễ cộng sinh Mycorrhiza",
      "Cây rau phát triển theo nhịp sinh học tự nhiên, đậm vị ngọt",
    ],
    iconName: "sprout",
  },
  {
    id: "pillar-4",
    pillarNumber: "04",
    title: "Đất Nghỉ Vi Sinh 15 Ngày Giữa 2 Mùa Vụ",
    subtitle: "Hồi sinh thổ nhưỡng tự nhiên",
    description: "Sau mỗi mùa thu hoạch, đất được xới tơi, phơi ải dưới nắng núi Đà Lạt và tưới chế phẩm vi sinh đối kháng Trichoderma để phân hủy tàn dư rễ cũ, triệt tiêu mầm bệnh nấm hại.",
    metric: "15 ngày",
    metricLabel: "Thời gian phơi ải & cấy vi sinh tối thiểu",
    checkpoints: [
      "Phơi ải nhiệt độ tự nhiên tiêu diệt tuyến trùng hại rễ",
      "Bổ sung 10^8 CFU/g nấm đối kháng Trichoderma viride",
      "Kiểm tra chỉ số mùn hữu cơ đạt chuẩn trước khi gieo đợt mới",
    ],
    iconName: "sun",
  },
  {
    id: "pillar-5",
    pillarNumber: "05",
    title: "Giống Chuẩn F1 Thuần Khiết Non-GMO",
    subtitle: "Không biến đổi gen",
    description: "Hạt giống F1 được nhập khẩu chính ngạch từ Enza Zaden (Hà Lan) và Takii (Nhật Bản), có chứng thư kiểm dịch thực vật quốc tế, tỷ lệ nảy mầm > 92% và khả năng tự kháng bệnh vượt trội.",
    metric: "100%",
    metricLabel: "Cam kết giống không biến đổi gen (Non-GMO)",
    checkpoints: [
      "Hạt giống có xuất xứ minh bạch, kiểm dịch thực vật Bộ NN&PTNT",
      "Bảo quản trong kho lạnh 12°C, độ ẩm 45% tiêu chuẩn",
      "Lưu trữ mẫu giống đối chứng cho từng lô đất canh tác",
    ],
    iconName: "dna",
  },
];

export const INSPECTION_CERTIFICATES: InspectionCertificateItem[] = [
  {
    id: "cert-vietgap",
    standardName: "Chứng nhận Thực hành Nông nghiệp Tốt (VietGAP)",
    badgeLabel: "Tiêu chuẩn Quốc gia",
    code: "VIETGAP-DALAT-2026-0891",
    certifier: "Trung tâm Giám định Nông nghiệp Lâm Đồng",
    validUntil: "31/12/2027",
    testReportUrl: "/documents/cert-vietgap-2026.pdf",
    auditScope: "Canh tác rau ăn lá, quả củ công nghệ cao tại xã Đạ Sar, Lạc Dương, Lâm Đồng",
  },
  {
    id: "cert-globalgap",
    standardName: "Chứng nhận Nông nghiệp Toàn cầu (GlobalG.A.P. IFA v5.4)",
    badgeLabel: "Tiêu chuẩn Quốc tế",
    code: "GGN: 4059883719201",
    certifier: "Bureau Veritas Certification Vietnam",
    validUntil: "15/08/2028",
    testReportUrl: "/documents/cert-globalgap-2026.pdf",
    auditScope: "Toàn bộ chuỗi nhà kính 10 hecta và dây chuyền sơ chế đóng gói lạnh",
  },
  {
    id: "cert-nitrate",
    standardName: "Kiểm nghiệm dư lượng Nitrate & Kim loại nặng",
    badgeLabel: "Test Report Định kỳ",
    code: "EUROFINS-TEST-2026-Q1",
    certifier: "Eurofins Sắc Ký Hải Đăng (Chứng nhận ISO/IEC 17025)",
    validUntil: "Định kỳ hàng tháng",
    testReportUrl: "/documents/report-nitrate-eurofins.pdf",
    auditScope: "Hàm lượng Nitrate < 240 mg/kg (Chuẩn WHO < 1500 mg/kg), Chì & Cadimi: Không phát hiện (KPH)",
  },
];

export const GUARANTEE_PLEDGE = {
  headline: "Cam Kết Bồi Hoàn Vàng 200%",
  shortTitle: "Bồi hoàn 200% nếu phát hiện tồn dư hóa chất",
  description: "Nếu khách hàng gửi mẫu rau thu hoạch từ ô đất của mình đi kiểm nghiệm tại bất kỳ phòng Lab độc lập nào đạt chuẩn ISO/IEC 17025 và phát hiện tồn dư thuốc bảo vệ thực vật hóa học vượt ngưỡng cho phép của Bộ Y Tế:",
  compensationPolicy: [
    "Bồi hoàn 200% tổng giá trị hợp đồng canh tác của mùa vụ đó.",
    "Chi trả 100% toàn bộ chi phí xét nghiệm kiểm nghiệm mẫu của khách hàng.",
    "Tặng miễn phí 01 mùa vụ canh tác tiếp theo với sự giám sát trực tiếp của chuyên gia độc lập.",
  ],
  hotline: "1900 6868",
  email: "phaply@greenfarm.dalat.vn",
};
