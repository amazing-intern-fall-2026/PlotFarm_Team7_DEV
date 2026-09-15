import { PlotSchema, type Plot, type PlotsQuery, type PlotStatus } from "@repo/shared";
import { PlotsRepository } from "./plots.repository";
import { AppError } from "../../errors/AppError";

const mockPlots: Plot[] = [
  {
    plotCode: "PLT-A01",
    plotNumber: "Plot A-01",
    areaSquareMeters: 50,
    status: "AVAILABLE",
    pricePerMonth: 1000000,
    soilType: "Đất đỏ Bazan Lâm Đồng",
    iotSensorInstalled: true,
    cameraSupported: true,
  },
  {
    plotCode: "PLT-A02",
    plotNumber: "Plot A-02",
    areaSquareMeters: 45,
    status: "OCCUPIED",
    pricePerMonth: 950000,
    soilType: "Đất phù sa",
    iotSensorInstalled: true,
    cameraSupported: false,
  },
];

export function getMockPlots(): Plot[] {
  return mockPlots.map((plot) => {
    const result = PlotSchema.safeParse(plot);
    if (!result.success) {
      throw new Error(
        `Mock plot data does not match PlotSchema: ${result.error.message}`,
      );
    }
    return result.data;
  });
}

export interface PlotWithRelations {
  id: string;
  plotCode?: string | null;
  plotNumber?: string | null;
  areaSqm?: unknown;
  soilTypeI18n?: unknown;
  pricePerMonth?: unknown;
  status: PlotStatus;
  streamUrl?: string | null;
  imageUrl?: string | null;
  lockedUntil?: Date | string | null;
  defaultCrop?: {
    id: string;
    slug: string;
    nameI18n: unknown;
    coverImageUrl?: string | null;
    iconUrl?: string | null;
  } | null;
  farm?: {
    id: string;
    slug: string;
    nameI18n: unknown;
    addressI18n: unknown;
  } | null;
}

export class PlotsService {
  static DEFAULT_PLOT_IMAGE_URL = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80";
  static DEFAULT_MOCK_STREAM_URL = process.env.MOCK_STREAM_URL || process.env.VITE_MOCK_STREAM_URL || "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

  /**
   * Tính trạng thái động của plot dựa trên lockedUntil.
   * Business rule: lockedUntil > now => status = RESERVED
   */
  static calculateDynamicStatus(
    status: PlotStatus,
    lockedUntil?: Date | string | null,
    now: Date = new Date()
  ): PlotStatus {
    if (status === "AVAILABLE" && lockedUntil && new Date(lockedUntil) > now) {
      return "RESERVED";
    }
    return status;
  }

  static formatPlotListItem(plot: PlotWithRelations, now: Date = new Date()) {
    const imageUrl = plot.imageUrl ?? plot.defaultCrop?.coverImageUrl ?? this.DEFAULT_PLOT_IMAGE_URL;

    return {
      id: plot.id,
      plotCode: plot.plotCode ?? null,
      plotNumber: plot.plotNumber ?? null,
      areaSqm: plot.areaSqm !== null && plot.areaSqm !== undefined ? Number(plot.areaSqm) : null,
      soilTypeI18n: plot.soilTypeI18n ?? null,
      pricePerMonth: plot.pricePerMonth !== null && plot.pricePerMonth !== undefined ? Number(plot.pricePerMonth) : null,
      status: this.calculateDynamicStatus(plot.status, plot.lockedUntil, now),
      imageUrl,
      streamUrl: plot.streamUrl ?? this.DEFAULT_MOCK_STREAM_URL,
      defaultCrop: plot.defaultCrop
        ? {
          id: plot.defaultCrop.id,
          slug: plot.defaultCrop.slug,
          nameI18n: plot.defaultCrop.nameI18n,
          coverImageUrl: plot.defaultCrop.coverImageUrl ?? null,
          iconUrl: plot.defaultCrop.iconUrl ?? null,
        }
        : null,
    };
  }

  static formatPlotDetailItem(plot: PlotWithRelations, now: Date = new Date()) {
    const listItem = this.formatPlotListItem(plot, now);
    return {
      ...listItem,
      farm: plot.farm
        ? {
          id: plot.farm.id,
          slug: plot.farm.slug,
          nameI18n: plot.farm.nameI18n,
          addressI18n: plot.farm.addressI18n,
        }
        : null,
    };
  }

  static async getPlotsList(query: PlotsQuery) {
    const now = new Date();
    const skip = (query.page - 1) * query.limit;
    const take = query.limit;

    const [plots, total] = await Promise.all([
      PlotsRepository.findMany(query, skip, take, now),
      PlotsRepository.count(query, now),
    ]);

    const totalPages = total > 0 ? Math.ceil(total / query.limit) : 0;
    const items = plots.map((plot) => this.formatPlotListItem(plot, now));

    return {
      items,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages,
      },
    };
  }

  static async getPlotById(id: string) {
    const now = new Date();
    const plot = await PlotsRepository.findById(id);

    if (!plot) {
      throw AppError.notFound("Không tìm thấy ô đất");
    }

    return this.formatPlotDetailItem(plot, now);
  }
}
