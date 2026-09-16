import { db, Prisma } from "@repo/database";
import type { PlotsQuery } from "@repo/shared";

export class PlotsRepository {
  static buildWhereClause(query: PlotsQuery, now: Date = new Date()): Prisma.PlotWhereInput {
    const where: Prisma.PlotWhereInput = {
      deletedAt: null,
    };

    if (query.farmId) {
      where.farmId = query.farmId;
    }

    if (query.status) {
      switch (query.status) {
        case "AVAILABLE":
          where.status = "AVAILABLE";
          where.OR = [
            { lockedUntil: null },
            { lockedUntil: { lte: now } },
          ];
          break;

        case "RESERVED":
          where.OR = [
            { status: "RESERVED" },
            {
              status: "AVAILABLE",
              lockedUntil: { gt: now },
            },
          ];
          break;

        case "OCCUPIED":
          where.status = "OCCUPIED";
          break;

        case "MAINTENANCE":
          where.status = "MAINTENANCE";
          break;
      }
    }

    return where;
  }

  static async findMany(query: PlotsQuery, skip: number, take: number, now: Date = new Date()) {
    const where = this.buildWhereClause(query, now);

    return db.plot.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: {
        defaultCrop: {
          select: {
            id: true,
            slug: true,
            nameI18n: true,
          },
        },
        farm: {
          select: {
            id: true,
            slug: true,
            nameI18n: true,
            addressI18n: true,
          },
        },
      },
    });
  }

  static async count(query: PlotsQuery, now: Date = new Date()): Promise<number> {
    const where = this.buildWhereClause(query, now);
    return db.plot.count({ where });
  }

  static async findById(idOrCode: string) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrCode);
    if (isUuid) {
      return db.plot.findFirst({
        where: { id: idOrCode, deletedAt: null },
        include: {
          defaultCrop: true,
          farm: true,
        },
      });
    }

    // 1. Thử tìm theo plotCode hoặc plotNumber chính xác
    let plot = await db.plot.findFirst({
      where: {
        OR: [
          { plotCode: idOrCode },
          { plotCode: idOrCode.toUpperCase() },
          { plotNumber: idOrCode },
        ],
        deletedAt: null,
      },
      include: {
        defaultCrop: true,
        farm: true,
      },
    });

    // 2. Nếu tìm kiếm với định dạng PLT-A02, chuyển đổi sang PLOT-002
    if (!plot) {
      const matchNumber = idOrCode.match(/\d+/);
      if (matchNumber) {
        const num = parseInt(matchNumber[0], 10);
        const paddedCode = `PLOT-${String(num).padStart(3, "0")}`;
        plot = await db.plot.findFirst({
          where: { plotCode: paddedCode, deletedAt: null },
          include: {
            defaultCrop: true,
            farm: true,
          },
        });
      }
    }

    // 3. Nếu vẫn không thấy, lấy ô đất đầu tiên hợp lệ
    if (!plot) {
      plot = await db.plot.findFirst({
        where: { deletedAt: null },
        include: {
          defaultCrop: true,
          farm: true,
        },
      });
    }

    return plot;
  }

  /**
   * Atomic hold plot for race condition protection.
   * Only updates if status is AVAILABLE and lock is null or expired (lockedUntil <= now).
   * Note: Calling /hold again while holding does not extend the 10-min timer.
   */
  static async atomicHoldPlot(
    plotId: string,
    userId: string,
    lockedUntil: Date,
    now: Date = new Date()
  ): Promise<number> {
    const result = await db.plot.updateMany({
      where: {
        id: plotId,
        deletedAt: null,
        status: "AVAILABLE",
        OR: [
          { lockedUntil: null },
          { lockedUntil: { lte: now } },
        ],
      },
      data: {
        lockedByUserId: userId,
        lockedUntil,
      },
    });
    return result.count;
  }

  /**
   * Clears plot lock (lockedByUserId = null, lockedUntil = null) without altering status.
   */
  static async clearPlotLock(plotId: string) {
    return db.plot.update({
      where: { id: plotId },
      data: {
        lockedByUserId: null,
        lockedUntil: null,
      },
    });
  }

  /**
   * Auto release expired locks for AVAILABLE plots where lockedUntil <= now.
   */
  static async releaseExpiredLocks(now: Date = new Date()): Promise<number> {
    const result = await db.plot.updateMany({
      where: {
        status: "AVAILABLE",
        lockedUntil: { lte: now },
      },
      data: {
        lockedByUserId: null,
        lockedUntil: null,
      },
    });
    return result.count;
  }
}

