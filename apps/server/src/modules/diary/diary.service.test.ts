import { describe, it, expect, vi, beforeEach } from "vitest";
import { db } from "@repo/database";
import { DiaryService } from "./diary.service";
import type { CreateFarmingLogRequest } from "@repo/shared";

type ContractQueryResult = Awaited<ReturnType<typeof db.contract.findUnique>>;
type FarmingLogListResult = Awaited<ReturnType<typeof db.farmingLog.findMany>>;

const baseRequest: CreateFarmingLogRequest = {
  actionType: "LOG_GROWTH",
  title: "Cập nhật tiến độ",
  description: "Hạt mầm lên đều, đã tưới ẩm phân hữu cơ vi sinh.",
  growthStage: "STAGE_2",
  progressPercent: 50,
  photoUrls: ["https://res.cloudinary.com/demo/img1.jpg"],
  sensorSnapshot: { temperature: 27.5, humidity: 80, soilMoisture: 65 },
};

describe("DiaryService.createFarmingLog", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(db, "$transaction").mockImplementation(
      ((callback: (tx: typeof db) => Promise<unknown>) =>
        callback(db)) as unknown as typeof db.$transaction,
    );
  });

  it("từ chối khi không tìm thấy hợp đồng (404)", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue(
      null as unknown as ContractQueryResult,
    );

    await expect(
      DiaryService.createFarmingLog("c1", "staff-1", "STAFF", baseRequest),
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  it("từ chối khi hợp đồng không ở trạng thái ACTIVE/IN_HARVEST (400 CONTRACT_NOT_ACTIVE)", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue({
      id: "c1",
      status: "PENDING_PAYMENT",
      progressPercent: 0,
      plot: { assignedStaffId: "staff-1" },
    } as unknown as ContractQueryResult);

    await expect(
      DiaryService.createFarmingLog("c1", "staff-1", "STAFF", baseRequest),
    ).rejects.toMatchObject({
      statusCode: 400,
      errorCode: "ERR_CONTRACT_NOT_ACTIVE",
    });
  });

  it("từ chối khi nhân viên không được phân công phụ trách ô đất (403 NOT_ASSIGNED_STAFF)", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue({
      id: "c1",
      status: "ACTIVE",
      progressPercent: 0,
      plot: { assignedStaffId: "other-staff" },
    } as unknown as ContractQueryResult);

    await expect(
      DiaryService.createFarmingLog("c1", "staff-1", "STAFF", baseRequest),
    ).rejects.toMatchObject({
      statusCode: 403,
      errorCode: "ERR_NOT_ASSIGNED_STAFF",
    });
  });

  it("ADMIN được đăng nhật ký dù không được phân công phụ trách ô đất", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue({
      id: "c1",
      contractCode: "PF-2026-0001",
      status: "ACTIVE",
      progressPercent: 0,
      plot: { assignedStaffId: "other-staff" },
    } as unknown as ContractQueryResult);

    vi.spyOn(db.farmingLog, "create").mockResolvedValue({
      id: "log-1",
      stageNameI18n: { vi: "Phát triển thân lá & Tỉa thưa" },
      notes: baseRequest.description,
      imageUrls: baseRequest.photoUrls,
      temperature: 27.5,
      humidity: 80,
      soilMoisture: 65,
      loggedAt: new Date(),
    } as unknown as Awaited<ReturnType<typeof db.farmingLog.create>>);
    vi.spyOn(db.contract, "update").mockResolvedValue(
      {} as unknown as Awaited<ReturnType<typeof db.contract.update>>,
    );
    vi.spyOn(db.user, "findUnique").mockResolvedValue({
      userCode: "USR-ADMIN-01",
      fullName: "Quản trị viên",
    } as unknown as Awaited<ReturnType<typeof db.user.findUnique>>);

    const result = await DiaryService.createFarmingLog(
      "c1",
      "admin-1",
      "ADMIN",
      baseRequest,
    );

    expect(result.contractCode).toBe("PF-2026-0001");
    expect(result.progressPercent).toBe(50);
  });

  it("tạo nhật ký thành công, tự tính đúng progressPercent theo mốc sinh trưởng", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue({
      id: "c1",
      contractCode: "PF-2026-0001",
      status: "ACTIVE",
      progressPercent: 25,
      plot: { assignedStaffId: "staff-1" },
    } as unknown as ContractQueryResult);

    vi.spyOn(db.farmingLog, "create").mockResolvedValue({
      id: "log-1",
      stageNameI18n: { vi: "Phát triển thân lá & Tỉa thưa" },
      notes: baseRequest.description,
      imageUrls: baseRequest.photoUrls,
      temperature: 27.5,
      humidity: 80,
      soilMoisture: 65,
      loggedAt: new Date(),
    } as unknown as Awaited<ReturnType<typeof db.farmingLog.create>>);

    const updateSpy = vi
      .spyOn(db.contract, "update")
      .mockResolvedValue(
        {} as unknown as Awaited<ReturnType<typeof db.contract.update>>,
      );

    vi.spyOn(db.user, "findUnique").mockResolvedValue({
      userCode: "USR-STAFF-01",
      fullName: "Bác Bảy",
    } as unknown as Awaited<ReturnType<typeof db.user.findUnique>>);

    const result = await DiaryService.createFarmingLog(
      "c1",
      "staff-1",
      "STAFF",
      baseRequest,
    );

    expect(result.progressPercent).toBe(50);
    expect(result.authorStaff.fullName).toBe("Bác Bảy");
    expect(result.photoUrls).toEqual(baseRequest.photoUrls);
    expect(updateSpy).toHaveBeenCalledWith({
      where: { id: "c1" },
      data: { progressPercent: 50 },
    });
  });
});

describe("DiaryService.getFarmingLogs", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("từ chối khi không tìm thấy hợp đồng (404)", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue(
      null as unknown as ContractQueryResult,
    );

    await expect(
      DiaryService.getFarmingLogs("c1", { userId: "u1", role: "CUSTOMER" }),
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  it("chặn khách hàng xem nhật ký của hợp đồng không thuộc sở hữu (403)", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue({
      id: "c1",
      userId: "owner-1",
    } as unknown as ContractQueryResult);

    await expect(
      DiaryService.getFarmingLogs("c1", { userId: "other-user", role: "CUSTOMER" }),
    ).rejects.toMatchObject({ statusCode: 403 });
  });

  it("cho phép khách hàng sở hữu hợp đồng xem danh sách nhật ký", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue({
      id: "c1",
      contractCode: "PF-2026-0001",
      userId: "owner-1",
    } as unknown as ContractQueryResult);

    vi.spyOn(db.farmingLog, "findMany").mockResolvedValue([
      {
        id: "log-1",
        stageNameI18n: { vi: "Gieo hạt & Nảy mầm" },
        notes: "note",
        imageUrls: ["url1"],
        temperature: 25,
        humidity: 70,
        soilMoisture: 60,
        loggedAt: new Date(),
        staff: { userCode: "USR-STAFF-01", fullName: "Bác Bảy" },
      },
    ] as unknown as FarmingLogListResult);

    const result = await DiaryService.getFarmingLogs("c1", {
      userId: "owner-1",
      role: "CUSTOMER",
    });

    expect(result).toHaveLength(1);
    expect(result[0].contractCode).toBe("PF-2026-0001");
    expect(result[0].growthStage).toBe("STAGE_1");
  });

  it("cho phép STAFF/ADMIN xem nhật ký dù không sở hữu hợp đồng", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue({
      id: "c1",
      contractCode: "PF-2026-0001",
      userId: "owner-1",
    } as unknown as ContractQueryResult);

    vi.spyOn(db.farmingLog, "findMany").mockResolvedValue(
      [] as unknown as FarmingLogListResult,
    );

    const result = await DiaryService.getFarmingLogs("c1", {
      userId: "staff-2",
      role: "STAFF",
    });

    expect(result).toEqual([]);
  });
});
