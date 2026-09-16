import { PlotSchema, ERROR_CODES, type Plot, type PlotsQuery, type PlotStatus } from "@repo/shared";
import { PlotsRepository } from "./plots.repository";
import { AppError } from "../../errors/AppError";

const DEFAULT_HOLD_DURATION_SECONDS = 600;

export function getPlotHoldDurationSeconds(): number {
  const envVal = process.env.PLOT_HOLD_DURATION_SECONDS;
  if (envVal) {
    const parsed = parseInt(envVal, 10);
    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }
  return DEFAULT_HOLD_DURATION_SECONDS;
}

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

export interface CropDetail {
  id: string;
  slug: string;
  nameI18n: unknown;
  descriptionI18n?: unknown;
  guideI18n?: unknown;
  durationDays?: unknown;
  expectedYieldKgPerSqm?: unknown;
  coverImageUrl?: string | null;
}

export interface FarmDetail {
  id: string;
  slug: string;
  nameI18n: unknown;
  addressI18n?: unknown;
  contactPhone?: string | null;
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
  lockedUntil?: Date | string | null;
  lockedByUserId?: string | null;
  defaultCrop?: {
    id: string;
    slug: string;
    nameI18n: unknown;
  } | null;
  farm?: {
    id: string;
    slug: string;
    nameI18n: unknown;
    addressI18n: unknown;
  } | null;
}

export class PlotsService {
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
    const dynamicStatus = this.calculateDynamicStatus(
      plot.status,
      plot.lockedUntil,
      now
    );

    return {
      id: plot.id,
      plotCode: plot.plotCode ?? "",
      plotNumber: plot.plotNumber ?? "",
      areaSqm: Number(plot.areaSqm ?? 0),
      soilTypeI18n: plot.soilTypeI18n,
      pricePerMonth: Number(plot.pricePerMonth ?? 0),
      status: dynamicStatus,
      streamUrl: plot.streamUrl ?? null,
      defaultCrop: plot.defaultCrop
        ? {
          id: plot.defaultCrop.id,
          slug: plot.defaultCrop.slug,
          nameI18n: plot.defaultCrop.nameI18n,
        }
        : null,
    };
  }

  static formatPlotDetailItem(plot: PlotWithRelations, now: Date = new Date()) {
    const listItem = this.formatPlotListItem(plot, now);
    const crop = plot.defaultCrop;
    const farm = plot.farm;
    return {
      ...listItem,
      defaultCrop: crop
        ? {
          id: crop.id,
          slug: crop.slug,
          nameI18n: crop.nameI18n,
          descriptionI18n: crop.descriptionI18n ?? null,
          guideI18n: crop.guideI18n ?? null,
          durationDays: crop.durationDays ? Number(crop.durationDays) : 60,
          expectedYieldKgPerSqm: crop.expectedYieldKgPerSqm ? Number(crop.expectedYieldKgPerSqm) : 3.5,
          coverImageUrl: crop.coverImageUrl ?? null,
        }
        : null,
      farm: farm
        ? {
          id: farm.id,
          slug: farm.slug,
          nameI18n: farm.nameI18n,
          addressI18n: farm.addressI18n,
          contactPhone: farm.contactPhone ?? "1900 6868",
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

  static async holdPlot(plotId: string, userId: string) {
    const now = new Date();
    const plot = await PlotsRepository.findById(plotId);

    if (!plot) {
      throw AppError.notFound("Không tìm thấy ô đất", ERROR_CODES.NOT_FOUND);
    }

    if (plot.status !== "AVAILABLE") {
      throw AppError.badRequest(
        "Ô đất không ở trạng thái AVAILABLE",
        ERROR_CODES.PLOT_NOT_AVAILABLE
      );
    }

    if (plot.lockedUntil && plot.lockedUntil > now) {
      throw AppError.conflict(
        "Ô đất đã bị khóa bởi người dùng khác",
        ERROR_CODES.PLOT_ALREADY_LOCKED
      );
    }

    const durationSeconds = getPlotHoldDurationSeconds();
    const lockedUntil = new Date(now.getTime() + durationSeconds * 1000);

    const updatedCount = await PlotsRepository.atomicHoldPlot(
      plotId,
      userId,
      lockedUntil,
      now
    );

    if (updatedCount === 0) {
      throw AppError.conflict(
        "Ô đất đã bị khóa bởi người dùng khác",
        ERROR_CODES.PLOT_ALREADY_LOCKED
      );
    }

    return {
      plotId,
      lockedUntil: lockedUntil.toISOString(),
      expiresInSeconds: durationSeconds,
    };
  }

  static async releaseHoldPlot(plotId: string, userId: string, userRole: string) {
    const plot = await PlotsRepository.findById(plotId);

    if (!plot) {
      throw AppError.notFound("Không tìm thấy ô đất", ERROR_CODES.NOT_FOUND);
    }

    const isOwner = plot.lockedByUserId === userId;
    const isAdmin = userRole === "ADMIN";

    if (!isOwner && !isAdmin) {
      throw AppError.forbidden(
        "Bạn không có quyền mở khóa ô đất này",
        ERROR_CODES.FORBIDDEN
      );
    }

    await PlotsRepository.clearPlotLock(plotId);

    return {
      unlocked: true,
    };
  }
}

