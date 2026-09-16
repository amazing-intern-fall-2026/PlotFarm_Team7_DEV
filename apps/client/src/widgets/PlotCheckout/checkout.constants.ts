export interface BankBeneficiaryInfo {
  bankId: string;
  bankName: string;
  bankShortName: string;
  accountNumber: string;
  accountName: string;
  napasLogoUrl?: string;
}

export interface CheckoutMockOrder {
  orderCode: string;
  plotId: string;
  plotNumber: string;
  plotAreaSqm: number;
  cropName: string;
  cropExpectedYield: string;
  durationDays: number;
  startDateFormatted: string;
  endDateFormatted: string;
  farmerName: string;
  farmerTeam: string;
  plotZone: string;
  plotThumbnailUrl: string;
  landRentalFee: number;
  cropSeedFee: number;
  totalAmount: number;
}

export interface TrustBadgeItem {
  id: string;
  title: string;
  subtitle: string;
}

export const CHECKOUT_BANK_INFO: BankBeneficiaryInfo = {
  bankId: (import.meta.env?.VITE_VIETQR_BANK_ID as string) || "970423",
  bankName: (import.meta.env?.VITE_VIETQR_BANK_NAME as string) || "TPBank",
  bankShortName: (import.meta.env?.VITE_VIETQR_BANK_SHORT_NAME as string) || "TPBank",
  accountNumber: (import.meta.env?.VITE_VIETQR_ACCOUNT_NO as string) || "90356150205",
  accountName: (import.meta.env?.VITE_VIETQR_ACCOUNT_NAME as string) || "NGUYEN PHUOC SANG",
};

export const CHECKOUT_DEFAULT_ORDER: CheckoutMockOrder = {
  orderCode: "CF-8921",
  plotId: "PLOT-001",
  plotNumber: "A-104",
  plotAreaSqm: 20,
  cropName: "Cải cầu vồng Thụy Sĩ",
  cropExpectedYield: "18 - 22 kg rau sạch chuẩn hữu cơ",
  durationDays: 60,
  startDateFormatted: "01/11/2026",
  endDateFormatted: "30/12/2026",
  farmerName: "Chú Bảy",
  farmerTeam: "Đội Vườn 1",
  plotZone: "Phân khu A - Đà Lạt Organic Sanctuary",
  plotThumbnailUrl: "/images/plot-1.jpg",
  landRentalFee: 1450000,
  cropSeedFee: 400000,
  totalAmount: 1850000,
};

export const CHECKOUT_TIMER_CONFIG = {
  defaultHoldSeconds: 300, // 5 phút chuẩn US-20
  warningThresholdSeconds: 60, // Chuyển sang màu đỏ cảnh báo dưới 1 phút
  extendedQrSeconds: 900, // 15 phút đếm lùi QR
  storageKeyPrefix: "plot_farm_hold_lock_",
};

export const CHECKOUT_TEXTS = {
  stepper: {
    step1: "1. Ô đất",
    step2: "2. Vụ mùa",
    step3: "3. Thanh toán VietQR",
    step4: "4. Kích hoạt",
  },
  header: {
    backButton: "Quay lại chỉnh sửa cấu hình vụ mùa",
    statusWaiting: "Chờ đối soát",
    statusSuccess: "Thanh toán thành công",
    statusExpired: "Hết hạn giữ chỗ",
  },
  miniReceipt: {
    contractBadge: "HỢP ĐỒNG CANH TÁC",
    orderCodeLabel: "Mã đơn",
    packageTitle: "Gói canh tác vụ mùa",
    totalPayableLabel: "Tổng thanh toán:",
    allInclusiveNote: "Đã bao gồm 100% giống rau F1, phân bón sinh học vi sinh & công chăm sóc trọn vụ",
    detailsAccordionOpen: "Xem chi tiết quyền lợi gói",
    detailsAccordionClose: "Thu gọn chi tiết gói",
    benefits: [
      "Camera Live 1080P thời gian thực 24/7 trực tiếp tại ô đất",
      "Kỹ sư nông học chăm bón & ghi chép nhật ký số định kỳ",
      "Đóng gói bảo quản lạnh & giao tận nhà qua AgriExpress khi thu hoạch",
      "Cam kết bù sản lượng 100% nếu phát sinh rủi ro thời tiết",
    ],
    sslGuaranteedBadge: "Thanh toán an toàn bảo mật SSL 256-bit",
  },
  paymentHub: {
    vietqrBadge: "VIETQR",
    napasBadge: "NAPAS 24/7",
    dynamicQrBadge: "QR Động Độc Quyền",
    qrScanInstruction: "Chụp hoặc Quét bằng bất kỳ App Ngân Hàng / Ví điện tử",
    qrExpiryPrefix: "Mã QR có hiệu lực trong:",
    downloadQrButton: "Tải ảnh QR về máy",
    openBankingAppButton: "Mở App Ngân Hàng để thanh toán",
    bankNameLabel: "Ngân hàng thụ hưởng",
    accountNumberLabel: "Số tài khoản",
    accountNameLabel: "Tên chủ tài khoản",
    amountLabel: "Số tiền cần chuyển",
    transferContentLabel: "Nội dung chuyển khoản (bắt buộc giữ nguyên)",
    transferContentWarning: "Vui lòng giữ nguyên nội dung chuyển khoản để hệ thống tự động kích hoạt hợp đồng tức thì",
    copyButtonText: "Sao chép",
    copiedToastText: "Đã sao chép vào bộ nhớ tạm",
    pollingText: "Hệ thống đang lắng nghe tín hiệu biến động số dư từ Napas 24/7 (Tự động kích hoạt sau 3-5s)",
  },
  demoSandbox: {
    cardTitle: "MÔI TRƯỜNG NGHIỆM THU CAPSTONE",
    cardBadge: "Sandbox v2.4",
    cardDesc: "Dành riêng cho hội đồng nghiệm thu đồ án: Bấm nút bên dưới để giả lập phát sinh Webhook dòng tiền về tài khoản ngân hàng thành công ngay lập tức.",
    triggerButtonText: "⚡ Giả lập Tiền về (Webhook Simulation - Kích hoạt ngay)",
    triggerLoadingText: "Đang xác thực giao dịch qua Webhook...",
  },
  successModal: {
    title: "Thanh toán thành công!",
    subtitle: "Hợp đồng canh tác đã được kích hoạt thành công. Ô đất của bạn hiện đã sẵn sàng gieo trồng!",
    redirectingText: "Đang tự động chuyển hướng đến trang quản lý nông trại trong 3 giây...",
    goToFarmButtonText: "Xem Vườn Của Tôi Ngay",
  },
  expiryModal: {
    title: "Hết thời gian giữ chỗ!",
    subtitle: "Thời hạn 5 phút giữ chỗ đã kết thúc. Ô đất đã được mở lại cho người dùng khác theo quy định.",
    backToPlotsButtonText: "Quay lại bản đồ ô đất",
  },
  trustBadges: [
    {
      id: "ssl",
      title: "Mã hóa SSL 256-Bit",
      subtitle: "Bảo mật chuẩn ngân hàng trung ương",
    },
    {
      id: "napas",
      title: "Napas 24/7 Chuẩn Hóa",
      subtitle: "Khớp lệnh tự động dưới 3 giây",
    },
    {
      id: "banks",
      title: "40+ Ngân Hàng & Ví",
      subtitle: "Vietcombank, MB, Techcombank, MoMo...",
    },
    {
      id: "support",
      title: "Đối soát 24/7: 1900 6868",
      subtitle: "Hỗ trợ khẩn cấp bất kỳ sự cố",
    },
  ] as TrustBadgeItem[],
};
