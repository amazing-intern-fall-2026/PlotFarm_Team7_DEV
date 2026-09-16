export type ContractStatus = "all" | "active" | "pending" | "archived";

export interface DigitalContractItem {
  id: string;
  contractCode: string;
  plotCode: string;
  plotArea: string;
  cropName: string;
  cropVariety: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  totalValue: number;
  status: "active" | "pending" | "archived";
  signedBadge: {
    label: string;
    variant: "success" | "warning" | "secondary";
  };
  signerInfo?: {
    certAuthority: string;
    signedTimestamp: string;
    hashSha256: string;
  };
  pdfUrl: string;
  notes: string;
}

export const CONTRACT_STATUS_FILTERS: Array<{ id: ContractStatus; label: string; count?: number }> = [
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
    plotArea: "20 m² (Hệ thống IOT & Camera 24/7)",
    cropName: "Cải Kale xoăn New Zealand",
    cropVariety: "Brassica oleracea var. acephala (Chuẩn hữu cơ F1)",
    startDate: "01/03/2026",
    endDate: "01/05/2026",
    durationDays: 60,
    totalValue: 1025000,
    status: "active",
    signedBadge: {
      label: "Đã ký số điện tử (E-signed)",
      variant: "success",
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
    plotArea: "20 m² (Nhà màng công nghệ cao Đạ Sar)",
    cropName: "Xà lách Romaine thủy canh hữu cơ",
    cropVariety: "Lactuca sativa var. longifolia",
    startDate: "18/03/2026",
    endDate: "02/05/2026",
    durationDays: 45,
    totalValue: 850000,
    status: "pending",
    signedBadge: {
      label: "Chờ OTP xác thực chữ ký số",
      variant: "warning",
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
    plotArea: "25 m² (Hệ thống tưới nhỏ giọt Israel)",
    cropName: "Cà chua bi Cherry đỏ ngọt Đà Lạt",
    cropVariety: "Solanum lycopersicum var. cerasiforme",
    startDate: "01/10/2025",
    endDate: "31/12/2025",
    durationDays: 90,
    totalValue: 1450000,
    status: "archived",
    signedBadge: {
      label: "Đã nghiệm thu thanh lý mùa vụ",
      variant: "secondary",
    },
    signerInfo: {
      certAuthority: "VNPT-CA • Green Farm Bio Cloud",
      signedTimestamp: "01/10/2025 14:02:11 GMT+7",
      hashSha256: "3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F80A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6",
    },
    pdfUrl: "/documents/sample-contract-C12.pdf",
    notes: "Mùa vụ đạt 48 kg quả thu hoạch, đã đóng thùng lạnh giao 12 đợt trọn vẹn cho khách hàng.",
  },
];
