export interface InsuranceCoverageItem {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  threshold: string;
  thresholdLabel: string;
  evidenceRequirements: string[];
  iconName: "cloud-hail" | "sprout-off" | "bug-shield";
}

export interface InsuranceRemedyItem {
  id: string;
  type: "replant" | "refund" | "buffer_stock";
  title: string;
  subtitle: string;
  description: string;
  benefitHighlight: string;
  processingTime: string;
  terms: string[];
}

export interface ActivationStepItem {
  step: number;
  stepNumberText: string;
  title: string;
  sla: string;
  actor: string;
  description: string;
  details: string[];
}

export interface InsurancePolicySummary {
  programName: string;
  effectiveDate: string;
  scopeLocation: string;
  underwriter: string;
  hotline: string;
  email: string;
  emergencySupportHours: string;
}

export const CROP_INSURANCE_SUMMARY: InsurancePolicySummary = {
  programName: "Chương trình Bảo Hiểm Mùa Vụ Sinh Học Green Farm Safeguard 2026",
  effectiveDate: "01/01/2026 - Áp dụng cho mọi hợp đồng thuê ô đất số",
  scopeLocation: "Toàn bộ phân khu A, B, C, D tại Farm Đạ Sar, Lạc Dương, Lâm Đồng",
  underwriter: "Quỹ Dự Phòng Rủi Ro Nông Nghiệp - Công ty CP Nông nghiệp Công nghệ cao Đà Lạt",
  hotline: "1900 6868",
  email: "kythuat@greenfarm.dalat.vn",
  emergencySupportHours: "24/7 (Kỹ sư nông học trực luân phiên tại nông trại)",
};

export const CROP_INSURANCE_METRICS = [
  {
    value: "100%",
    label: "Bảo hộ rủi ro canh tác",
    desc: "Khách hàng không chịu thiệt hại tài chính khi xảy ra biến cố",
  },
  {
    value: "≤ 2 Giờ",
    label: "Kỹ sư giám định tại ô đất",
    desc: "Có mặt kiểm tra hiện trường ngay sau khi nhận thông báo",
  },
  {
    value: "24 Giờ",
    label: "Kích hoạt phương án bồi hoàn",
    desc: "Xử lý đền bù hoặc gieo lại hạt giống mới tức thời",
  },
  {
    value: "0 VNĐ",
    label: "Chi phí phát sinh bảo hiểm",
    desc: "Đã bao gồm mặc định trong mọi hợp đồng thuê ô đất",
  },
];

export const INSURANCE_COVERAGE_LIST: InsuranceCoverageItem[] = [
  {
    id: "cov-weather",
    title: "Thiên Tai, Sương Muối & Mưa Đá Đà Lạt",
    badge: "Bất khả kháng",
    subtitle: "Bảo vệ trước diễn biến thời tiết cao nguyên cực đoan",
    description: "Khu vực Đạ Sar - Lạc Dương đặc thù có sương muối buốt giá vào mùa đông và giông lốc, mưa đá bất chợt. Mặc dù farm có hệ thống nhà màng tiêu chuẩn, mọi tổn hại do thời tiết cực đoan vượt ngưỡng thiết kế đều được bảo hiểm toàn phần.",
    threshold: "Hao hụt ≥ 5%",
    thresholdLabel: "Mức tổn hại kích hoạt bảo hiểm",
    evidenceRequirements: [
      "Dữ liệu trạm khí tượng IoT tại trang trại (nhiệt độ hạ < 3°C hoặc lượng mưa cực đoan)",
      "Ảnh snapshot trích xuất từ camera góc rộng 24/7 quan sát luống rau",
      "Biên bản hiện trường xác nhận hư hại lá và thân cây",
    ],
    iconName: "cloud-hail",
  },
  {
    id: "cov-germination",
    title: "Cây Giống Không Nảy Mầm Hoặc Chết Yểu",
    badge: "Chất lượng giống",
    subtitle: "Cam kết tỷ lệ sống sót và phát triển của hạt giống F1",
    description: "Sau khi gieo từ 7 đến 14 ngày, nếu số lượng mầm không đạt hoặc cây con bị héo rũ, suy kiệt do nguyên nhân nội tại của giống hoặc cơ chất đất không đồng nhất, kỹ sư sẽ lập tức kích hoạt chính sách ươm bù khẩn cấp.",
    threshold: "Tỷ lệ chết > 10%",
    thresholdLabel: "Ngưỡng tỷ lệ mầm yếu hoặc chết",
    evidenceRequirements: [
      "Biểu đồ đếm mật độ cây con từ phần mềm AI Computer Vision của Farm",
      "Hình ảnh chụp cận cảnh bộ rễ và mầm non của ô đất",
      "Lịch sử nhiệt độ và độ ẩm cơ chất trùn quế trong 7 ngày đầu",
    ],
    iconName: "sprout-off",
  },
  {
    id: "cov-pest",
    title: "Sâu Bệnh Hại Cục Bộ Dù Đã Canh Tác Sinh Học",
    badge: "Rủi ro sinh học",
    subtitle: "Bảo vệ mùa vụ thuần tự nhiên không dùng thuốc hóa học",
    description: "Canh tác hữu cơ không dùng hóa chất nên có thể xuất hiện bùng phát sâu vẽ bùa, bọ trĩ hoặc nấm phấn trắng khi độ ẩm tăng cao. Trong trường hợp biện pháp thảo mộc và thiên địch không kiểm soát kịp thời dẫn đến giảm phẩm chất rau.",
    threshold: "Ảnh hưởng ≥ 15%",
    thresholdLabel: "Diện tích lá rau bị biến màu/khuyết tật",
    evidenceRequirements: [
      "Báo cáo nhật ký bón thảo dược và thả thiên địch của kỹ sư phụ trách",
      "Ảnh quang phổ nhận diện bệnh lá từ camera cảm biến quang",
      "Mẫu bệnh phẩm kiểm tra dưới kính hiển vi tại trạm thực nghiệm",
    ],
    iconName: "bug-shield",
  },
];

export const INSURANCE_REMEDIES: InsuranceRemedyItem[] = [
  {
    id: "rem-replant",
    type: "replant",
    title: "Trồng Bổ Sung Miễn Phí Đợt Mới",
    subtitle: "Phương án tối ưu chu kỳ canh tác",
    description: "Kỹ sư tiến hành cày xới, xử lý lại cơ chất vi sinh và gieo cấy lứa rau giống F1 đạt chuẩn mới ngay trên ô đất của bạn. Toàn bộ chi phí giống, phân trùn quế và công chăm sóc đều do Farm chi trả 100%.",
    benefitHighlight: "Kèm tặng thêm 10 ngày chăm sóc miễn phí để bù tiến độ thu hoạch",
    processingTime: "Gieo lại trong vòng 24 - 48 giờ",
    terms: [
      "Miễn phí 100% hạt giống F1 ngoại nhập hoặc cây con ươm sẵn",
      "Tự động kéo dài thời hạn hợp đồng tương ứng số ngày gieo lại",
      "Ưu tiên tư vấn điều chỉnh giống rau phù hợp hơn với thời tiết hiện hành",
    ],
  },
  {
    id: "rem-buffer",
    type: "buffer_stock",
    title: "Bù Sản Lượng Từ Ô Dự Phòng Của Farm",
    subtitle: "Giữ vững nguồn rau sạch tươi ngon cho gia đình",
    description: "Green Farm luôn duy trì 20% diện tích canh tác 'Buffer Farm' (ô đất lưu trữ dự phòng) trồng cùng giống rau và quy chuẩn chất lượng tương đương. Bạn sẽ được nhận lượng rau tươi ngon đúng lịch trình giao hàng định kỳ.",
    benefitHighlight: "Đảm bảo bữa cơm gia đình không bị gián đoạn bất kỳ tuần nào",
    processingTime: "Giao ngay theo lịch thu hoạch gần nhất",
    terms: [
      "Rau thu hoạch cùng thời điểm tại Farm Đạ Sar, cùng chuẩn VietGAP/GlobalGAP",
      "Đóng gói mát và giao tận cửa nhà như sản phẩm chính chủ ô đất",
      "Khách hàng vẫn được theo dõi camera ô dự phòng minh bạch",
    ],
  },
  {
    id: "rem-refund",
    type: "refund",
    title: "Hoàn Lại Tiền Thuê Ô Đất Tương Ứng",
    subtitle: "Bảo đảm quyền lợi tài chính linh hoạt",
    description: "Nếu khách hàng không có nhu cầu gieo lại hoặc nhận rau dự phòng, Farm sẽ hoàn trả khoản chi phí thuê ô đất tương ứng với tỷ lệ phần trăm thiệt hại và số ngày bị gián đoạn vào ví nông sản hoặc chuyển khoản ngân hàng.",
    benefitHighlight: "Hoàn tiền nhanh qua tài khoản ngân hàng hoặc ví tích luỹ canh tác",
    processingTime: "Hoàn tất trong vòng 24 giờ sau khi phê duyệt",
    terms: [
      "Tính toán minh bạch: Giá trị hoàn = (Giá thuê ngày x Số ngày gián đoạn) x Hệ số đền bù 1.2",
      "Chuyển khoản trực tiếp tới tài khoản ngân hàng khách hàng đăng ký",
      "Hoặc cộng vào số dư ví với ưu đãi hoàn thêm 10% khi tái thuê",
    ],
  },
];

export const INSURANCE_ACTIVATION_STEPS: ActivationStepItem[] = [
  {
    step: 1,
    stepNumberText: "Bước 01",
    title: "Báo Cáo Sự Cố Qua Camera 24/7 Hoặc Ứng Dụng",
    sla: "Phản hồi tự động trong 5 phút",
    actor: "Khách hàng thực hiện",
    description: "Khi quan sát livestream ô đất phát hiện cây có dấu hiệu héo rũ, sương muối phủ hoặc sâu cắn lá, bạn chỉ cần nhấn nút 'Báo cáo sự cố' ngay trên giao diện Camera hoặc trang Quản lý ô đất.",
    details: [
      "Chụp ảnh nhanh màn hình camera hoặc tải ảnh đính kèm",
      "Chọn nhanh triệu chứng ghi nhận (héo rũ, mưa đá, sâu hại, ngập úng)",
      "Hệ thống gửi mã ticket giám định bảo hiểm tức thời qua SMS/Zalo",
    ],
  },
  {
    step: 2,
    stepNumberText: "Bước 02",
    title: "Kỹ Sư Xuống Ô Đất Lập Biên Bản Giám Định",
    sla: "Cam kết có mặt trong ≤ 2 giờ",
    actor: "Kỹ sư nông học phụ trách phân khu",
    description: "Kỹ sư trực vườn lập tức di chuyển đến vị trí ô đất, dùng thiết bị chuyên dụng đo kiểm tra rễ, đất, đo độ ẩm và chụp ảnh phân tích sâu bệnh thực địa.",
    details: [
      "Xác định nguyên nhân khách quan và tỷ lệ phần trăm diện tích bị ảnh hưởng",
      "Lập biên bản giám định điện tử có đính kèm toạ độ GPS và dấu mộc số kỹ sư",
      "Gửi thông báo kết quả chi tiết cho khách hàng xem trực tiếp trên ứng dụng",
    ],
  },
  {
    step: 3,
    stepNumberText: "Bước 03",
    title: "Kích Hoạt Phương Án Bồi Hoàn Trong 24 Giờ",
    sla: "Thực thi giải pháp trong vòng 24 giờ",
    actor: "Hệ thống Farm & Khách hàng lựa chọn",
    description: "Hệ thống tự động kích hoạt chế độ bồi hoàn. Khách hàng lựa chọn 1 trong 3 hình thức mong muốn (Trồng lại bù ngày, Lấy rau kho dự phòng, hoặc Hoàn tiền trực tiếp).",
    details: [
      "Khách hàng bấm chọn phương án bồi hoàn chỉ với 1 chạm trên điện thoại",
      "Đội ngũ kỹ thuật lập tức triển khai công tác xử lý đất/gieo lại/điều phối rau",
      "Cập nhật tiến trình khắc phục từng giờ trên nhật ký nông vụ số",
    ],
  },
];

export const INSURANCE_MOCK_CLAIM = {
  incidentTypes: [
    { value: "weather", label: "Thiên tai / Sương muối / Mưa đá" },
    { value: "germination", label: "Cây giống chết yểu / Không nảy mầm (>10%)" },
    { value: "pest", label: "Sâu bệnh hại / Nấm mốc bùng phát" },
    { value: "other", label: "Vấn đề sinh trưởng bất thường khác" },
  ],
  plotsAvailable: [
    { id: "plot-a04", name: "Khu A - Ô 04 (Cải Kale xoăn khủng long)", contractId: "#HĐ-2026-A104" },
    { id: "plot-b08", name: "Khu B - Ô 08 (Xà lách thủy tinh Lollo Bionda)", contractId: "#HĐ-2026-B08" },
  ],
};
