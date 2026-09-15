import { axiosClient, parseApiError } from "@/shared/api";
import type { Plot, PlotStatus, PlotsQuery } from "@repo/shared";

export interface PlotUiItem extends Plot {
  id?: string;
  zone?: string;
  cropName?: string;
  description?: string;
  streamUrl?: string;
  imageUrl?: string;
}

export const MOCK_FALLBACK_PLOTS: PlotUiItem[] = [
  {
    plotCode: "PLT-A01",
    plotNumber: "Khu A - Ô 01",
    areaSquareMeters: 15,
    status: "AVAILABLE",
    pricePerMonth: 1200000,
    soilType: "Đất đỏ Bazan tơi xốp",
    iotSensorInstalled: true,
    cameraSupported: true,
    zone: "Khu A (Rau Ăn Lá)",
    description: "Ô đất gần nguồn tưới nhỏ giọt tự động, đã cải tạo vi sinh chuẩn VietGAP.",
    imageUrl: "/images/plot-1.jpg",
  },
  {
    plotCode: "PLT-A02",
    plotNumber: "Khu A - Ô 02",
    areaSquareMeters: 15,
    status: "AVAILABLE",
    pricePerMonth: 1200000,
    soilType: "Đất phù sa giàu mùn",
    iotSensorInstalled: true,
    cameraSupported: true,
    zone: "Khu A (Rau Ăn Lá)",
    description: "Đầy đủ cảm biến độ ẩm, pH đất và góc camera HLS độ nét cao.",
    imageUrl: "/images/plot-2.jpg",
  },
  {
    plotCode: "PLT-A03",
    plotNumber: "Khu A - Ô 03",
    areaSquareMeters: 20,
    status: "RESERVED",
    pricePerMonth: 1500000,
    soilType: "Đất đỏ Bazan hữu cơ",
    iotSensorInstalled: true,
    cameraSupported: true,
    zone: "Khu A (Rau Ăn Lá)",
    description: "Đang có khách hàng giữ chỗ tạm thời trong 15 phút.",
    imageUrl: "/images/plot-3.jpg",
  },
  {
    plotCode: "PLT-A04",
    plotNumber: "Khu A - Ô 04",
    areaSquareMeters: 20,
    status: "OCCUPIED",
    pricePerMonth: 1500000,
    soilType: "Đất đỏ Bazan Lâm Đồng",
    iotSensorInstalled: true,
    cameraSupported: true,
    zone: "Khu A (Rau Ăn Lá)",
    cropName: "Cải cầu vồng Thụy Sĩ",
    description: "Đang canh tác tuần thứ 3, phát triển xanh tốt.",
    imageUrl: "/images/plot-1.jpg",
  },
  {
    plotCode: "PLT-B01",
    plotNumber: "Khu B - Ô 01",
    areaSquareMeters: 15,
    status: "AVAILABLE",
    pricePerMonth: 1250000,
    soilType: "Đất đỏ Bazan chọn lọc",
    iotSensorInstalled: true,
    cameraSupported: true,
    zone: "Khu B (Củ Quả)",
    description: "Vị trí đón nắng sớm tốt, thích hợp trồng cà chua Cherry hoặc ớt chuông.",
    imageUrl: "/images/plot-2.jpg",
  },
  {
    plotCode: "PLT-B02",
    plotNumber: "Khu B - Ô 02",
    areaSquareMeters: 20,
    status: "OCCUPIED",
    pricePerMonth: 1600000,
    soilType: "Đất trộn xơ dừa vi sinh",
    iotSensorInstalled: true,
    cameraSupported: true,
    zone: "Khu B (Củ Quả)",
    cropName: "Cà chua bi hữu cơ",
    description: "Đang trong giai đoạn đơm hoa kết trái.",
    imageUrl: "/images/plot-3.jpg",
  },
  {
    plotCode: "PLT-B03",
    plotNumber: "Khu B - Ô 03",
    areaSquareMeters: 15,
    status: "MAINTENANCE",
    pricePerMonth: 1200000,
    soilType: "Đất đang bón phân hữu cơ",
    iotSensorInstalled: false,
    cameraSupported: true,
    zone: "Khu B (Củ Quả)",
    description: "Đang thực hiện khử khuẩn đất và bổ sung trùn quế định kỳ.",
    imageUrl: "/images/plot-1.jpg",
  },
  {
    plotCode: "PLT-B04",
    plotNumber: "Khu B - Ô 04",
    areaSquareMeters: 20,
    status: "AVAILABLE",
    pricePerMonth: 1500000,
    soilType: "Đất đỏ Bazan Lâm Đồng",
    iotSensorInstalled: true,
    cameraSupported: true,
    zone: "Khu B (Củ Quả)",
    description: "Lô diện tích lớn, sẵn sàng gieo hạt theo yêu cầu của gia chủ.",
    imageUrl: "/images/plot-2.jpg",
  },
  {
    plotCode: "PLT-C01",
    plotNumber: "Khu C - Ô 01",
    areaSquareMeters: 15,
    status: "RESERVED",
    pricePerMonth: 1200000,
    soilType: "Đất thịt nhẹ tơi xốp",
    iotSensorInstalled: true,
    cameraSupported: true,
    zone: "Khu C (Dược Liệu)",
    description: "Khách hàng đang hoàn tất thanh toán hợp đồng 6 tháng.",
    imageUrl: "/images/plot-3.jpg",
  },
  {
    plotCode: "PLT-C02",
    plotNumber: "Khu C - Ô 02",
    areaSquareMeters: 20,
    status: "AVAILABLE",
    pricePerMonth: 1600000,
    soilType: "Đất đỏ Bazan tơi xốp",
    iotSensorInstalled: true,
    cameraSupported: true,
    zone: "Khu C (Dược Liệu)",
    description: "Khu vực chuyên canh rau gia vị và cây hương thảo sinh thái.",
    imageUrl: "/images/plot-1.jpg",
  },
  {
    plotCode: "PLT-C03",
    plotNumber: "Khu C - Ô 03",
    areaSquareMeters: 15,
    status: "OCCUPIED",
    pricePerMonth: 1200000,
    soilType: "Đất phù sa hữu cơ",
    iotSensorInstalled: true,
    cameraSupported: true,
    zone: "Khu C (Dược Liệu)",
    cropName: "Xà lách Lô Lô Xanh",
    description: "Dự kiến thu hoạch đợt 1 trong 5 ngày tới.",
    imageUrl: "/images/plot-2.jpg",
  },
  {
    plotCode: "PLT-C04",
    plotNumber: "Khu C - Ô 04",
    areaSquareMeters: 20,
    status: "MAINTENANCE",
    pricePerMonth: 1500000,
    soilType: "Đất luân canh",
    iotSensorInstalled: false,
    cameraSupported: false,
    zone: "Khu C (Dược Liệu)",
    description: "Hệ thống tưới đang được nâng cấp van điều khiển thông minh.",
    imageUrl: "/images/plot-3.jpg",
  },
];

export async function fetchPlotsApi(query?: PlotsQuery): Promise<{
  plots: PlotUiItem[];
  total: number;
}> {
  try {
    const response = await axiosClient.get<{
      success: boolean;
      data: {
        plots: PlotUiItem[];
        pagination?: { total: number };
      } | PlotUiItem[];
    }>("/plots", { params: query });

    const rawData = response.data?.data;
    if (Array.isArray(rawData) && rawData.length > 0) {
      return { plots: rawData, total: rawData.length };
    }

    if (rawData && typeof rawData === "object" && "plots" in rawData) {
      const plots = rawData.plots || [];
      return { plots, total: rawData.pagination?.total ?? plots.length };
    }

    // Nếu API trả về mảng rỗng, sử dụng fallback mocks
    return { plots: filterMockPlots(query), total: MOCK_FALLBACK_PLOTS.length };
  } catch (error) {
    // Phân tích lỗi chuẩn hóa với parseApiError
    const apiError = parseApiError(error);
    // Log thông tin lỗi cho nhà phát triển nhưng không làm crash ứng dụng
    if (process.env.NODE_ENV !== "test") {
      console.warn(`[fetchPlotsApi] Failed to fetch plots from server: ${apiError.message}. Using fallback mock data.`);
    }
    return { plots: filterMockPlots(query), total: MOCK_FALLBACK_PLOTS.length };
  }
}

function filterMockPlots(query?: PlotsQuery): PlotUiItem[] {
  let result = [...MOCK_FALLBACK_PLOTS];
  if (query?.status) {
    result = result.filter((p) => p.status === query.status);
  }
  return result;
}

export type { PlotStatus, PlotsQuery };
