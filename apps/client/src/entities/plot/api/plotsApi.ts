import { axiosClient, parseApiError } from "@/shared/api";
import type { Plot, PlotStatus, PlotsQuery } from "@repo/shared";

// Domain UI Types
export interface PlotUiItem extends Plot {
  id?: string;
  zone?: string;
  cropName?: string;
  description?: string;
  streamUrl?: string;
  imageUrl?: string;
}

// Raw server shapes
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

export interface ServerPlotDetailData extends RawServerPlotItem {
  defaultCrop?: {
    id?: string;
    slug?: string;
    nameI18n?: { vi?: string; en?: string } | string | null;
    descriptionI18n?: { vi?: string; en?: string } | string | null;
    guideI18n?: { vi?: string; en?: string } | string | null;
    durationDays?: number;
    expectedYieldKgPerSqm?: number;
    coverImageUrl?: string | null;
  } | null;
  farm?: {
    id?: string;
    slug?: string;
    nameI18n?: { vi?: string; en?: string } | string | null;
    addressI18n?: { vi?: string; en?: string } | string | null;
    contactPhone?: string;
  } | null;
}

export interface PlotDetailUiItem extends PlotUiItem {
  defaultCropId?: string;
  farmName?: string;
  farmAddress?: string;
  farmPhone?: string;
  cropDetails?: {
    id?: string;
    slug?: string;
    name?: string;
    description?: string;
    durationDays?: number;
    expectedYieldKgPerSqm?: number;
    coverImageUrl?: string;
  };
}

// Helper: resolve i18n object or plain string
function resolveI18n(
  value: { vi?: string; en?: string } | string | null | undefined,
): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value || undefined;
  return value.vi || value.en || undefined;
}

// Mapper: raw server item -> UI item
function mapRawPlotToUiItem(item: RawServerPlotItem): PlotUiItem {
  const plotCode = item.plotCode || "PLT-UNKNOWN";
  const plotNumber = item.plotNumber || `O ${plotCode}`;

  const areaSquareMeters =
    item.areaSqm !== null && item.areaSqm !== undefined
      ? Number(item.areaSqm)
      : (item.areaSquareMeters ?? 15);

  const pricePerMonth =
    item.pricePerMonth !== null && item.pricePerMonth !== undefined
      ? Number(item.pricePerMonth)
      : 1200000;

  let soilType = "Đất đỏ Bazan Lâm Đồng";
  if (item.soilTypeI18n) {
    soilType = resolveI18n(item.soilTypeI18n) ?? soilType;
  } else if (item.soilType) {
    soilType = item.soilType;
  }

  const zone =
    item.zone ||
    (plotCode.startsWith("PLT-A")
      ? "Khu A (Rau Ăn Lá)"
      : plotCode.startsWith("PLT-B")
        ? "Khu B (Củ Quả)"
        : plotCode.startsWith("PLT-C")
          ? "Khu C (Dược Liệu)"
          : "Khu D (Nông Sản Cao Cấp)");

  let cropName = item.cropName;
  if (!cropName && item.defaultCrop?.nameI18n) {
    cropName = resolveI18n(item.defaultCrop.nameI18n);
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
    iotSensorInstalled: item.iotSensorInstalled ?? false,
    cameraSupported: item.cameraSupported ?? Boolean(item.streamUrl),
    streamUrl: item.streamUrl ?? undefined,
    zone,
    cropName,
    description:
      item.description ||
      `Ô đất ${plotNumber} chuẩn nông nghiệp sạch sinh thái Đà Lạt.`,
    imageUrl,
  };
}

// Response parser
interface PlotsListResponseData {
  success: boolean;
  data:
    | {
        items?: RawServerPlotItem[];
        plots?: RawServerPlotItem[];
        pagination?: {
          total: number;
          totalPages?: number;
          page?: number;
          limit?: number;
        };
      }
    | RawServerPlotItem[];
}

function parsePlotsResponse(
  responseData: PlotsListResponseData,
  page: number,
  limit: number,
): { plots: PlotUiItem[]; total: number; totalPages: number; page: number } {
  const rawData = responseData?.data;
  let rawList: RawServerPlotItem[] = [];
  let total = 0;
  let totalPages = 0;

  if (Array.isArray(rawData)) {
    rawList = rawData;
    total = rawData.length;
    totalPages = Math.max(1, Math.ceil(total / limit));
  } else if (rawData && typeof rawData === "object") {
    if ("items" in rawData && Array.isArray(rawData.items)) {
      rawList = rawData.items;
      total = rawData.pagination?.total ?? rawList.length;
      totalPages =
        rawData.pagination?.totalPages ??
        Math.max(1, Math.ceil(total / limit));
    } else if ("plots" in rawData && Array.isArray(rawData.plots)) {
      rawList = rawData.plots;
      total = rawData.pagination?.total ?? rawList.length;
      totalPages =
        rawData.pagination?.totalPages ??
        Math.max(1, Math.ceil(total / limit));
    }
  }

  return {
    plots: rawList.map(mapRawPlotToUiItem),
    total,
    totalPages,
    page,
  };
}

/**
 * Fetch danh sách ô đất từ server.
 * Ném lỗi nếu request thất bại — không có mock fallback.
 */
export async function fetchPlotsApi(query?: PlotsQuery): Promise<{
  plots: PlotUiItem[];
  total: number;
  totalPages: number;
  page: number;
}> {
  const params: Record<string, unknown> = {
    limit: query?.limit ?? 100,
    page: query?.page ?? 1,
  };
  if (query?.status) params.status = query.status;
  if (query?.farmId) params.farmId = query.farmId;

  let lastError: unknown;

  for (const prefix of ["/plots", "/v1/plots"]) {
    try {
      const response =
        await axiosClient.get<PlotsListResponseData>(prefix, { params });
      return parsePlotsResponse(
        response.data,
        (query?.page ?? 1),
        (query?.limit ?? 100),
      );
    } catch (err) {
      lastError = err;
    }
  }

  throw parseApiError(lastError);
}

/**
 * Fetch chi tiết 1 ô đất theo ID hoặc plotCode.
 * Ném lỗi nếu không tìm thấy hoặc server lỗi.
 */
export async function fetchPlotDetailApi(
  idOrCode: string,
): Promise<PlotDetailUiItem> {
  interface PlotDetailResponse {
    success: boolean;
    data: ServerPlotDetailData;
  }

  let lastError: unknown;

  for (const prefix of ["/plots", "/v1/plots"]) {
    try {
      const response = await axiosClient.get<PlotDetailResponse>(
        `${prefix}/${idOrCode}`,
      );
      const raw = response.data?.data;
      if (!raw) throw new Error("Không nhận được dữ liệu ô đất từ máy chủ");

      const baseUi = mapRawPlotToUiItem(raw);
      const cropName =
        resolveI18n(raw.defaultCrop?.nameI18n) || baseUi.cropName;
      const cropDesc = resolveI18n(raw.defaultCrop?.descriptionI18n);
      const farmName = resolveI18n(raw.farm?.nameI18n);
      const farmAddress = resolveI18n(raw.farm?.addressI18n);

      return {
        ...baseUi,
        defaultCropId: raw.defaultCrop?.id,
        cropName,
        imageUrl: raw.defaultCrop?.coverImageUrl || baseUi.imageUrl,
        farmName,
        farmAddress,
        farmPhone: raw.farm?.contactPhone,
        cropDetails: raw.defaultCrop
          ? {
              id: raw.defaultCrop.id,
              slug: raw.defaultCrop.slug,
              name: cropName,
              description: cropDesc,
              durationDays: raw.defaultCrop.durationDays,
              expectedYieldKgPerSqm: raw.defaultCrop.expectedYieldKgPerSqm,
              coverImageUrl: raw.defaultCrop.coverImageUrl || undefined,
            }
          : undefined,
      };
    } catch (err) {
      lastError = err;
    }
  }

  throw parseApiError(lastError);
}

export type { PlotStatus, PlotsQuery };
