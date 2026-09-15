import { describe, it, expect, vi, beforeEach } from "vitest";
import { db } from "@repo/database";
import { ContractsService } from "./contracts.service";

type PlotQueryResult = Awaited<ReturnType<typeof db.plot.findUnique>>;
type CropQueryResult = Awaited<ReturnType<typeof db.crop.findUnique>>;

describe("ContractsService.createContract", () => {
  const mockUserId = "user-customer-1";
  const futureLockedUntil = new Date(Date.now() + 30 * 60 * 1000); // +30 minutes

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("Kịch bản 1: Tính toán chính xác thời hạn vụ mùa theo giống rau 30 ngày (Xà lách)", async () => {
    const mockPlot = {
      id: "plot-a01",
      plotCode: "PLOT-A01",
      pricePerMonth: 500000,
      lockedByUserId: mockUserId,
      lockedUntil: futureLockedUntil,
      deletedAt: null,
    } as unknown as PlotQueryResult;

    const mockCrop = {
      id: "crop-xa-lach",
      durationDays: 30,
      basePrice: 100000,
      isActive: true,
      deletedAt: null,
    } as unknown as CropQueryResult;

    vi.spyOn(db.plot, "findUnique").mockResolvedValue(mockPlot);
    vi.spyOn(db.crop, "findUnique").mockResolvedValue(mockCrop);

    vi.spyOn(db, "$transaction").mockImplementation(async (cb) => {
      const tx = {
        contract: {
          create: vi.fn().mockImplementation((args) =>
            Promise.resolve({
              id: "contract-30-days",
              ...args.data,
            })
          ),
        },
      };
      return cb(tx as unknown as Parameters<Parameters<typeof db.$transaction>[0]>[0]);
    });

    const result = await ContractsService.createContract(mockUserId, {
      plotId: "plot-a01",
      cropId: "crop-xa-lach",
      startDate: "2026-09-15",
    });

    expect(result.durationDays).toBe(30);
    expect(result.startDate).toBe("2026-09-15");
    expect(result.expectedHarvestDate).toBe("2026-10-15");
    expect(result.plotPriceSnapshot).toBe(500000);
    expect(result.cropPriceSnapshot).toBe(100000);
    expect(result.subtotal).toBe(600000);
    expect(result.totalPrice).toBe(600000);
    expect(result.status).toBe("PENDING_PAYMENT");
    expect(result.contractCode).toMatch(/^HD-20260915-\d{4}$/);
  });

  it("Kịch bản 2: Tính toán chính xác thời hạn vụ mùa theo giống rau 60 ngày (Cải bó xôi)", async () => {
    const mockPlot = {
      id: "plot-a01",
      plotCode: "PLOT-A01",
      pricePerMonth: 500000,
      lockedByUserId: mockUserId,
      lockedUntil: futureLockedUntil,
      deletedAt: null,
    } as unknown as PlotQueryResult;

    const mockCrop = {
      id: "crop-cai-bo-xoi",
      durationDays: 60,
      basePrice: 150000,
      isActive: true,
      deletedAt: null,
    } as unknown as CropQueryResult;

    vi.spyOn(db.plot, "findUnique").mockResolvedValue(mockPlot);
    vi.spyOn(db.crop, "findUnique").mockResolvedValue(mockCrop);

    vi.spyOn(db, "$transaction").mockImplementation(async (cb) => {
      const tx = {
        contract: {
          create: vi.fn().mockImplementation((args) =>
            Promise.resolve({
              id: "contract-60-days",
              ...args.data,
            })
          ),
        },
      };
      return cb(tx as unknown as Parameters<Parameters<typeof db.$transaction>[0]>[0]);
    });

    const result = await ContractsService.createContract(mockUserId, {
      plotId: "plot-a01",
      cropId: "crop-cai-bo-xoi",
      startDate: "2026-09-15",
    });

    expect(result.durationDays).toBe(60);
    expect(result.startDate).toBe("2026-09-15");
    expect(result.expectedHarvestDate).toBe("2026-11-14");
    expect(result.plotPriceSnapshot).toBe(1000000);
    expect(result.cropPriceSnapshot).toBe(150000);
    expect(result.subtotal).toBe(1150000);
    expect(result.totalPrice).toBe(1150000);
    expect(result.status).toBe("PENDING_PAYMENT");
  });

  it("Tính toán chính xác thời hạn vụ mùa theo giống rau 45 ngày", async () => {
    const mockPlot = {
      id: "uuid-plot-1",
      pricePerMonth: 500000,
      lockedByUserId: mockUserId,
      lockedUntil: futureLockedUntil,
      deletedAt: null,
    } as unknown as PlotQueryResult;

    const mockCrop = {
      id: "uuid-crop-1",
      durationDays: 45,
      basePrice: 150000,
      isActive: true,
      deletedAt: null,
    } as unknown as CropQueryResult;

    vi.spyOn(db.plot, "findUnique").mockResolvedValue(mockPlot);
    vi.spyOn(db.crop, "findUnique").mockResolvedValue(mockCrop);

    vi.spyOn(db, "$transaction").mockImplementation(async (cb) => {
      const tx = {
        contract: {
          create: vi.fn().mockImplementation((args) =>
            Promise.resolve({
              id: "uuid-contract-1",
              ...args.data,
            })
          ),
        },
      };
      return cb(tx as unknown as Parameters<Parameters<typeof db.$transaction>[0]>[0]);
    });

    const result = await ContractsService.createContract(mockUserId, {
      plotId: "uuid-plot-1",
      cropId: "uuid-crop-1",
      startDate: "2026-09-15",
    });

    expect(result.durationDays).toBe(45);
    expect(result.expectedHarvestDate).toBe("2026-10-30");
    expect(result.plotPriceSnapshot).toBe(750000);
    expect(result.cropPriceSnapshot).toBe(150000);
    expect(result.subtotal).toBe(900000);
    expect(result.totalPrice).toBe(900000);
  });

  it("Kịch bản 3: Chặn tạo hợp đồng khi chưa giữ chỗ ô đất (mã lỗi LOCK_REQUIRED)", async () => {
    const mockPlotLockedByOther = {
      id: "plot-locked-other",
      lockedByUserId: "user-customer-2",
      lockedUntil: futureLockedUntil,
      deletedAt: null,
    } as unknown as PlotQueryResult;

    const mockCrop = {
      id: "crop-xa-lach",
      durationDays: 30,
      basePrice: 100000,
      isActive: true,
      deletedAt: null,
    } as unknown as CropQueryResult;

    vi.spyOn(db.plot, "findUnique").mockResolvedValue(mockPlotLockedByOther);
    vi.spyOn(db.crop, "findUnique").mockResolvedValue(mockCrop);

    await expect(
      ContractsService.createContract(mockUserId, {
        plotId: "plot-locked-other",
        cropId: "crop-xa-lach",
        startDate: "2026-09-15",
      })
    ).rejects.toMatchObject({
      statusCode: 400,
      errorCode: "LOCK_REQUIRED",
    });
  });

  it("Chặn tạo hợp đồng khi ô đất hết hạn giữ chỗ (lockedUntil < now)", async () => {
    const mockPlotExpiredLock = {
      id: "plot-expired",
      lockedByUserId: mockUserId,
      lockedUntil: new Date(Date.now() - 5 * 60 * 1000), // 5 mins ago
      deletedAt: null,
    } as unknown as PlotQueryResult;

    const mockCrop = {
      id: "crop-xa-lach",
      durationDays: 30,
      basePrice: 100000,
      isActive: true,
      deletedAt: null,
    } as unknown as CropQueryResult;

    vi.spyOn(db.plot, "findUnique").mockResolvedValue(mockPlotExpiredLock);
    vi.spyOn(db.crop, "findUnique").mockResolvedValue(mockCrop);

    await expect(
      ContractsService.createContract(mockUserId, {
        plotId: "plot-expired",
        cropId: "crop-xa-lach",
        startDate: "2026-09-15",
      })
    ).rejects.toMatchObject({
      statusCode: 400,
      errorCode: "LOCK_REQUIRED",
    });
  });

  it("Trả về lỗi 404 Not Found khi không tìm thấy ô đất", async () => {
    vi.spyOn(db.plot, "findUnique").mockResolvedValue(null);

    await expect(
      ContractsService.createContract(mockUserId, {
        plotId: "non-existent-plot",
        cropId: "crop-1",
        startDate: "2026-09-15",
      })
    ).rejects.toMatchObject({
      statusCode: 404,
    });
  });

  it("Trả về lỗi 404 Not Found khi không tìm thấy giống rau", async () => {
    vi.spyOn(db.plot, "findUnique").mockResolvedValue({
      id: "plot-1",
      deletedAt: null,
    } as unknown as PlotQueryResult);
    vi.spyOn(db.crop, "findUnique").mockResolvedValue(null);

    await expect(
      ContractsService.createContract(mockUserId, {
        plotId: "plot-1",
        cropId: "non-existent-crop",
        startDate: "2026-09-15",
      })
    ).rejects.toMatchObject({
      statusCode: 404,
    });
  });
});
