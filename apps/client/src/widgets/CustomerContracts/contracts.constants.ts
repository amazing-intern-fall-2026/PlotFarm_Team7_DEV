export type ContractStatus = "all" | "active" | "pending" | "archived";

export interface DigitalContractItem {
  id: string;
  contractCode: string;
  plotCode: string;
  plotArea: string;
  zoneDescription: string;
  cropName: string;
  scientificName?: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  totalValue: number;
  status: "active" | "pending" | "archived";
  signedBadge: {
    label: string;
    variant: "success" | "warning" | "secondary";
    tooltipText: string;
  };
  signerInfo?: {
    certAuthority: string;
    signedTimestamp: string;
    hashSha256: string;
  };
  pdfUrl: string;
  notes: string;
}

export interface ContractMetricCardData {
  id: string;
  title: string;
  value: string;
  iconName: "active" | "pending" | "revenue" | "yield";
  highlight?: "emerald" | "amber" | "blue";
  helperText?: string;
}

export const CONTRACT_METRIC_CARDS: ContractMetricCardData[] = [
  {
    id: "active-contracts",
    title: "Hợp đồng đang canh tác",
    value: "1 HĐ",
    iconName: "active",
    highlight: "emerald",
    helperText: "Chu kỳ 60 ngày vụ Xuân",
  },
  {
    id: "pending-contracts",
    title: "Chờ xác thực OTP",
    value: "1 HĐ",
    iconName: "pending",
    highlight: "amber",
    helperText: "Cần ký trong 24 giờ",
  },
  {
    id: "total-value",
    title: "Tổng giá trị mùa vụ",
    value: "1.025.000 đ",
    iconName: "revenue",
    highlight: "blue",
    helperText: "Đã thanh toán qua VietQR",
  },
  {
    id: "vietgap-yield",
    title: "Sản lượng cam kết VietGAP",
    value: "~45 kg rau sạch",
    iconName: "yield",
    highlight: "emerald",
    helperText: "Giao định kỳ hàng tuần",
  },
];

export const CONTRACT_STATUS_FILTERS: Array<{ id: ContractStatus; label: string }> = [
  { id: "all", label: "Tất cả hợp đồng" },
  { id: "active", label: "Đang hiệu lực (Active)" },
  { id: "pending", label: "Chờ ký duyệt (Pending)" },
  { id: "archived", label: "Đã kết thúc (Archived)" },
];

export const MOCK_DIGITAL_CONTRACTS: DigitalContractItem[] = [
  {
    id: "contract-01",
    contractCode: "HĐ-2026-A104",
    plotCode: "Khu A - Ô 04",
    plotArea: "20m²",
    zoneDescription: "Thung lũng Cam Ly • IoT 24/7",
    cropName: "Cải Kale xoăn",
    scientificName: "Brassica oleracea var. acephala (Chuẩn hữu cơ F1)",
    startDate: "01/03/2026",
    endDate: "01/05/2026",
    durationDays: 60,
    totalValue: 1025000,
    status: "active",
    signedBadge: {
      label: "Đã ký số điện tử",
      variant: "success",
      tooltipText: "Bảo đảm tính toàn vẹn theo Luật GDĐT",
    },
    signerInfo: {
      certAuthority: "VIETTEL-CA TrustID • Green Farm Legal",
      signedTimestamp: "01/03/2026 09:15:22 GMT+7",
      hashSha256: "9F82A4B1C5D6E7F80A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F80A1B2C3D4E5",
    },
    pdfUrl: "/documents/sample-contract-A104.pdf",
    notes: "Đang trong chu kỳ sinh trưởng ngày thứ 16. Kỹ sư tưới dinh dưỡng vi sinh định kỳ.",
  },
  {
    id: "contract-02",
    contractCode: "HĐ-2026-B08",
    plotCode: "Khu B - Ô 08",
    plotArea: "20m²",
    zoneDescription: "Đạ Sar • Nhà màng công nghệ cao",
    cropName: "Xà lách Romaine",
    scientificName: "Lactuca sativa var. longifolia",
    startDate: "18/03/2026",
    endDate: "02/05/2026",
    durationDays: 45,
    totalValue: 850000,
    status: "pending",
    signedBadge: {
      label: "Chờ OTP xác thực",
      variant: "warning",
      tooltipText: "Cần xác thực OTP để kích hoạt hợp đồng canh tác",
    },
    signerInfo: {
      certAuthority: "Chờ ký số khách hàng",
      signedTimestamp: "Đã gửi mã xác thực qua SMS/Email",
      hashSha256: "Tạm lưu dự thảo hợp đồng điện tử",
    },
    pdfUrl: "/documents/sample-contract-B08.pdf",
    notes: "Đã cọc giữ chỗ thành công qua VietQR. Cần ký số điện tử trong 24 giờ để xuống giống.",
  },
  {
    id: "contract-03",
    contractCode: "HĐ-2025-C12",
    plotCode: "Khu C - Ô 12",
    plotArea: "25m²",
    zoneDescription: "Lạc Dương • Tưới nhỏ giọt Israel",
    cropName: "Cà chua bi Cherry",
    scientificName: "Solanum lycopersicum var. cerasiforme",
    startDate: "01/10/2025",
    endDate: "31/12/2025",
    durationDays: 90,
    totalValue: 1450000,
    status: "archived",
    signedBadge: {
      label: "Đã nghiệm thu",
      variant: "secondary",
      tooltipText: "Hợp đồng đã hoàn thành chu kỳ và quyết toán nông sản",
    },
    signerInfo: {
      certAuthority: "VNPT-CA • Green Farm Archive",
      signedTimestamp: "31/12/2025 17:30:00 GMT+7",
      hashSha256: "4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D9E0F1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C",
    },
    pdfUrl: "/documents/sample-contract-C12.pdf",
    notes: "Đã hoàn thành bàn giao 85kg cà chua bi đạt chuẩn VietGAP vào tháng 12/2025.",
  },
];

export const CONTRACTS_PAGE_TEXT = {
  breadcrumbHome: "Trang chủ",
  breadcrumbParent: "Tài khoản & Pháp lý",
  breadcrumbCurrent: "Hợp đồng số",
  pageTitle: "Hợp đồng thuê đất số & Pháp lý mùa vụ",
  pageSubtitle: "Toàn bộ hợp đồng điện tử được ký số mã hóa SHA-256 theo Luật Giao dịch Điện tử Việt Nam, bảo đảm giá trị pháp lý và quyền sở hữu sản lượng nông sản trọn đời mùa vụ.",
  tableHeaders: {
    code: "Mã HĐ",
    plotAndCrop: "Ô đất & Cây trồng",
    duration: "Thời hạn thuê",
    value: "Giá trị",
    legalAndActions: "Chứng thư & Thao tác",
  },
  actions: {
    signOtp: "Ký số OTP",
    signOtpMobile: "Ký xác thực OTP ngay",
    viewPdf: "Xem",
    viewPdfMobile: "Xem PDF",
    download: "Tải về",
  },
  mobileLabels: {
    plotAndCrop: "Ô đất & Giống rau",
    duration: "Thời hạn mùa vụ",
    totalValue: "Tổng chi phí",
  },
  modal: {
    title: "Ký xác thực hợp đồng điện tử",
    description: "Mã xác thực OTP (6 chữ số) đã được gửi đến số điện thoại và email của bạn.",
    successTitle: "Ký số hợp đồng thành công!",
    successSubtitle: "Chứng thư điện tử SHA-256 đã được đính kèm vào hợp đồng",
    labelContractCode: "Mã hợp đồng:",
    labelPlot: "Ô đất canh tác:",
    labelCrop: "Giống rau:",
    inputLabel: "Nhập mã OTP (Dùng thử: 2026)",
    inputPlaceholder: "Nhập 4-6 chữ số...",
    termsCommitment: "Bằng việc bấm xác nhận, bạn cam kết tuân thủ các điều khoản hợp đồng thuê đất hữu cơ Green Farm.",
    btnCancel: "Hủy bỏ",
    btnConfirm: "Xác nhận ký số",
  },
};
