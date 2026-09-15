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
    imageUrl: "/images/plot-4.jpg",
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
    imageUrl: "/images/plot-5.jpg",
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
    imageUrl: "/images/plot-6.jpg",
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
    imageUrl: "/images/plot-7.jpg",
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
    imageUrl: "/images/plot-8.jpg",
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
    imageUrl: "/images/plot-9.jpg",
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
    imageUrl: "/images/plot-10.jpg",
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
    imageUrl: "/images/plot-3.jpg",
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
    imageUrl: "/images/plot-4.jpg",
  },
];

export interface RawServerPlotItem {
  id?: string;
  plotCode?: string;
  plotNumber?: string;
  areaSqm?: number | string | null;
  areaSquareMeters?: number;
  pricePerMonth?: number | string | null;
  soilTypeI18n?: { vi?: string; en?: string } | string | null;
  soilType?: string | null;
  status?: PlotStatus;
  iotSensorInstalled?: boolean;
  cameraSupported?: boolean;
  streamUrl?: string | null;
  zone?: string;
  cropName?: string;
  description?: string;
  imageUrl?: string;
  defaultCrop?: {
    id?: string;
    slug?: string;
    nameI18n?: { vi?: string; en?: string } | string | null;
  } | null;
}

function mapRawPlotToUiItem(item: RawServerPlotItem): PlotUiItem {
  const plotCode = item.plotCode || "PLT-UNKNOWN";
  const plotNumber = item.plotNumber || `Ô ${plotCode}`;
  const areaSquareMeters = item.areaSqm !== null && item.areaSqm !== undefined
    ? Number(item.areaSqm)
    : (item.areaSquareMeters ?? 15);
  const pricePerMonth = item.pricePerMonth !== null && item.pricePerMonth !== undefined
    ? Number(item.pricePerMonth)
    : 1200000;

  let soilType = "Đất đỏ Bazan Lâm Đồng";
  if (item.soilTypeI18n) {
    if (typeof item.soilTypeI18n === "object" && item.soilTypeI18n.vi) {
      soilType = item.soilTypeI18n.vi;
    } else if (typeof item.soilTypeI18n === "string") {
      soilType = item.soilTypeI18n;
    }
  } else if (item.soilType) {
    soilType = item.soilType;
  }

  const zone = item.zone || (
    plotCode.startsWith("PLT-A") ? "Khu A (Rau Ăn Lá)" :
    plotCode.startsWith("PLT-B") ? "Khu B (Củ Quả)" :
    plotCode.startsWith("PLT-C") ? "Khu C (Dược Liệu)" :
    "Khu D (Nông Sản Cao Cấp)"
  );

  let cropName = item.cropName;
  if (!cropName && item.defaultCrop?.nameI18n) {
    cropName = typeof item.defaultCrop.nameI18n === "object"
      ? (item.defaultCrop.nameI18n.vi || item.defaultCrop.nameI18n.en)
      : String(item.defaultCrop.nameI18n);
  }

  const numMatches = plotCode.match(/\d+/);
  const imgIdx = numMatches ? ((parseInt(numMatches[0], 10) - 1) % 10) + 1 : 1;
  const imageUrl = item.imageUrl || `/images/plot-${imgIdx}.jpg`;

  return {
    id: item.id,
    plotCode,
    plotNumber,
    areaSquareMeters,
    status: item.status || "AVAILABLE",
    pricePerMonth,
    soilType,
    iotSensorInstalled: item.iotSensorInstalled ?? true,
    cameraSupported: item.cameraSupported ?? Boolean(item.streamUrl),
    streamUrl: item.streamUrl ?? undefined,
    zone,
    cropName,
    description: item.description || `Ô đất ${plotNumber} chuẩn nông nghiệp sạch sinh thái Đà Lạt.`,
    imageUrl,
  };
}

export async function fetchPlotsApi(query?: PlotsQuery): Promise<{
  plots: PlotUiItem[];
  total: number;
}> {
  try {
    const response = await axiosClient.get<{
      success: boolean;
      data: {
        items?: RawServerPlotItem[];
        plots?: RawServerPlotItem[];
        pagination?: { total: number };
      } | RawServerPlotItem[];
    }>("/plots", { params: query });

    const rawData = response.data?.data;
    let rawList: RawServerPlotItem[] = [];
    let totalCount = 0;

    if (Array.isArray(rawData)) {
      rawList = rawData;
      totalCount = rawData.length;
    } else if (rawData && typeof rawData === "object") {
      if ("items" in rawData && Array.isArray(rawData.items)) {
        rawList = rawData.items;
        totalCount = rawData.pagination?.total ?? rawList.length;
      } else if ("plots" in rawData && Array.isArray(rawData.plots)) {
        rawList = rawData.plots;
        totalCount = rawData.pagination?.total ?? rawList.length;
      }
    }

    if (rawList.length > 0) {
      return {
        plots: rawList.map(mapRawPlotToUiItem),
        total: totalCount,
      };
    }


    return { plots: filterMockPlots(query), total: MOCK_FALLBACK_PLOTS.length };
  } catch (error) {
    const apiError = parseApiError(error);
    if (process.env.NODE_ENV !== "test") {
      console.warn(`[fetchPlotsApi] Failed to fetch plots: ${apiError.message}. Using fallback.`);
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
