import { describe, it, expect, vi, beforeEach } from "vitest";
import { db } from "@repo/database";
import { PlotsService } from "./plots.service";
import { PlotsController } from "./plots.controller";
import type { Request, Response, NextFunction } from "express";

describe("US-13: Plots API Unit & Integration Tests", () => {
  const farmIdMock = "11111111-1111-4111-a111-111111111111";
  const validPlotId1 = "22222222-2222-4222-a222-222222222222";
  const validPlotId2 = "33333333-3333-4333-a333-333333333333";

  const futureLockDate = new Date(Date.now() + 10 * 60 * 1000); // +10 minutes
  const pastLockDate = new Date(Date.now() - 10 * 60 * 1000); // -10 minutes

  const mockPlotsDbData = [
    {
      id: validPlotId1,
      farmId: farmIdMock,
      defaultCropId: "crop-1",
      plotCode: "PLT-001",
      plotNumber: "001",
      name: "Lô 001",
      area: 50,
      areaSqm: 50,
      soilTypeI18n: { vi: "Đất phù sa" },
      pricePerMonth: 1000000,
      status: "AVAILABLE" as const,
      streamUrl: "http://stream.test/1",
      lockedByUserId: "user-1",
      lockedUntil: futureLockDate, // Active lock -> dynamic status = RESERVED
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      defaultCrop: {
        id: "crop-1",
        slug: "ca-chua",
        nameI18n: { vi: "Cà chua" },
      },
      farm: {
        id: farmIdMock,
        slug: "nong-trai-da-lat",
        nameI18n: { vi: "Nông trại Đà Lạt" },
        addressI18n: { vi: "Đà Lạt, Lâm Đồng" },
      },
    },
    {
      id: validPlotId2,
      farmId: farmIdMock,
      defaultCropId: "crop-2",
      plotCode: "PLT-002",
      plotNumber: "002",
      name: "Lô 002",
      area: 60,
      areaSqm: 60,
      soilTypeI18n: { vi: "Đất đỏ" },
      pricePerMonth: 1200000,
      status: "AVAILABLE" as const,
      streamUrl: null,
      lockedByUserId: null,
      lockedUntil: null, // No lock -> status = AVAILABLE
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      defaultCrop: {
        id: "crop-2",
        slug: "dap-cau",
        nameI18n: { vi: "Dưa lưới" },
      },
      farm: {
        id: farmIdMock,
        slug: "nong-trai-da-lat",
        nameI18n: { vi: "Nông trại Đà Lạt" },
        addressI18n: { vi: "Đà Lạt, Lâm Đồng" },
      },
    },
  ];

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("Dynamic Status Business Logic", () => {
    it("should return RESERVED if lockedUntil is in the future", () => {
      const status = PlotsService.calculateDynamicStatus("AVAILABLE", futureLockDate);
      expect(status).toBe("RESERVED");
    });

    it("should return database status (AVAILABLE) if lockedUntil is in the past", () => {
      const status = PlotsService.calculateDynamicStatus("AVAILABLE", pastLockDate);
      expect(status).toBe("AVAILABLE");
    });

    it("should return database status (AVAILABLE) if lockedUntil is null", () => {
      const status = PlotsService.calculateDynamicStatus("AVAILABLE", null);
      expect(status).toBe("AVAILABLE");
    });

    it("should return database status (OCCUPIED) even if lockedUntil is in future", () => {
      const status = PlotsService.calculateDynamicStatus("OCCUPIED", futureLockDate);
      expect(status).toBe("OCCUPIED");
    });
  });

  describe("AC-1: status=AVAILABLE filter", () => {
    it("excludes plot with status=AVAILABLE but active lockedUntil > now", async () => {
      vi.spyOn(db.plot, "findMany").mockImplementation((args) => {
        const where = args?.where as { status?: string; OR?: unknown };
        expect(where?.status).toBe("AVAILABLE");
        expect(where?.OR).toBeDefined();
        return Promise.resolve([mockPlotsDbData[1]]) as unknown as ReturnType<typeof db.plot.findMany>;
      });
      vi.spyOn(db.plot, "count").mockResolvedValue(1);

      const result = await PlotsService.getPlotsList({
        status: "AVAILABLE",
        page: 1,
        limit: 20,
      });

      expect(result.items.length).toBe(1);
      expect(result.items[0].id).toBe(validPlotId2);
      expect(result.items[0].status).toBe("AVAILABLE");
    });
  });

  describe("AC-2: Dynamic RESERVED in List, Detail, and Filter", () => {
    it("returns RESERVED for AVAILABLE plot with active lock in list and detail API", async () => {
      // List
      vi.spyOn(db.plot, "findMany").mockResolvedValue([mockPlotsDbData[0]] as unknown as Awaited<ReturnType<typeof db.plot.findMany>>);
      vi.spyOn(db.plot, "count").mockResolvedValue(1);

      const listResult = await PlotsService.getPlotsList({ page: 1, limit: 20 });
      expect(listResult.items[0].status).toBe("RESERVED");
      expect(mockPlotsDbData[0].status).toBe("AVAILABLE"); // DB status remains unchanged

      // Detail
      vi.spyOn(db.plot, "findFirst").mockResolvedValue(mockPlotsDbData[0] as unknown as Awaited<ReturnType<typeof db.plot.findFirst>>);
      const detailResult = await PlotsService.getPlotById(validPlotId1);
      expect(detailResult.status).toBe("RESERVED");
    });

    it("includes plot with status=AVAILABLE and active lock when querying status=RESERVED", async () => {
      vi.spyOn(db.plot, "findMany").mockImplementation((args) => {
        const where = args?.where as { OR?: unknown };
        expect(where?.OR).toEqual([
          { status: "RESERVED" },
          {
            status: "AVAILABLE",
            lockedUntil: { gt: expect.any(Date) },
          },
        ]);
        return Promise.resolve([mockPlotsDbData[0]]) as unknown as ReturnType<typeof db.plot.findMany>;
      });
      vi.spyOn(db.plot, "count").mockResolvedValue(1);

      const result = await PlotsService.getPlotsList({
        status: "RESERVED",
        page: 1,
        limit: 20,
      });

      expect(result.items.length).toBe(1);
      expect(result.items[0].id).toBe(validPlotId1);
      expect(result.items[0].status).toBe("RESERVED");
    });
  });

  describe("AC-3: Not Found handling", () => {
    it("throws AppError 404 NOT_FOUND when plot UUID does not exist", async () => {
      vi.spyOn(db.plot, "findFirst").mockResolvedValue(null);

      const nonExistentId = "99999999-9999-4999-a999-999999999999";
      await expect(PlotsService.getPlotById(nonExistentId)).rejects.toThrow("Không tìm thấy ô đất");
    });
  });

  describe("Additional Filters, Pagination & Validation", () => {
    it("filters by farmId correctly", async () => {
      vi.spyOn(db.plot, "findMany").mockImplementation((args) => {
        const where = args?.where as { farmId?: string };
        expect(where?.farmId).toBe(farmIdMock);
        return Promise.resolve(mockPlotsDbData) as unknown as ReturnType<typeof db.plot.findMany>;
      });
      vi.spyOn(db.plot, "count").mockResolvedValue(2);

      const result = await PlotsService.getPlotsList({
        farmId: farmIdMock,
        page: 1,
        limit: 20,
      });

      expect(result.items.length).toBe(2);
      expect(result.pagination.total).toBe(2);
      expect(result.pagination.totalPages).toBe(1);
    });

    it("calculates pagination correctly when empty or multi-page", async () => {
      vi.spyOn(db.plot, "findMany").mockResolvedValue([]);
      vi.spyOn(db.plot, "count").mockResolvedValue(0);

      const result = await PlotsService.getPlotsList({
        page: 1,
        limit: 20,
      });

      expect(result.items).toEqual([]);
      expect(result.pagination.total).toBe(0);
      expect(result.pagination.totalPages).toBe(0);
    });

    it("formats list and detail item fields properly without exposing internal fields", async () => {
      vi.spyOn(db.plot, "findFirst").mockResolvedValue(mockPlotsDbData[1] as unknown as Awaited<ReturnType<typeof db.plot.findFirst>>);

      const detail = await PlotsService.getPlotById(validPlotId2);
      expect(detail).toEqual({
        id: validPlotId2,
        plotCode: "PLT-002",
        plotNumber: "002",
        areaSqm: 60,
        soilTypeI18n: { vi: "Đất đỏ" },
        pricePerMonth: 1200000,
        status: "AVAILABLE",
        imageUrl: PlotsService.DEFAULT_PLOT_IMAGE_URL,
        streamUrl: PlotsService.DEFAULT_MOCK_STREAM_URL,
        defaultCrop: {
          id: "crop-2",
          slug: "dap-cau",
          nameI18n: { vi: "Dưa lưới" },
          coverImageUrl: null,
          iconUrl: null,
        },
        farm: {
          id: farmIdMock,
          slug: "nong-trai-da-lat",
          nameI18n: { vi: "Nông trại Đà Lạt" },
          addressI18n: { vi: "Đà Lạt, Lâm Đồng" },
        },
      });

      const detailRecord = detail as Record<string, unknown>;
      expect(detailRecord.lockedUntil).toBeUndefined();
      expect(detailRecord.deletedAt).toBeUndefined();
    });

    it("controller getPlots passes validation error on invalid query limit", async () => {
      const mockReq = {
        query: { limit: "150" },
      } as unknown as Request;

      const mockRes = {} as Response;
      const mockNext = vi.fn() as unknown as NextFunction;

      await PlotsController.getPlots(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });

    it("controller getPlotById passes validation error on invalid UUID format", async () => {
      const mockReq = {
        params: { id: "invalid-uuid" },
      } as unknown as Request;

      const mockRes = {} as Response;
      const mockNext = vi.fn() as unknown as NextFunction;

      await PlotsController.getPlotById(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
