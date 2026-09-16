import { describe, it, expect, vi, beforeEach } from "vitest";
import { db } from "@repo/database";
import { CareService } from "./care.service";
import type { CreateCareRequest } from "@repo/shared";

type ContractQueryResult = Awaited<ReturnType<typeof db.contract.findUnique>>;
type CareRequestListResult = Awaited<ReturnType<typeof db.careRequest.findMany>>;

const baseRequest: CreateCareRequest = {
  serviceTitleI18n: { vi: "Bón phân hữu cơ vi sinh", en: "Organic Fertilizing" },
  customerNote: "Nhờ nhà vườn bón thêm phân vi sinh quanh gốc rau giúp mình nhé.",
};

function mockContract(overrides: Record<string, unknown> = {}) {
  return {
    id: "c1",
    userId: "customer-1",
    status: "ACTIVE",
    crop: { durationDays: 30, guideI18n: null },
    ...overrides,
  } as unknown as ContractQueryResult;
}

describe("CareService.createCareRequest", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("từ chối khi không tìm thấy hợp đồng (404)", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue(
      null as unknown as ContractQueryResult,
    );

    await expect(
      CareService.createCareRequest("c1", "customer-1", baseRequest),
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  it("từ chối khi không phải chủ sở hữu hợp đồng (403 CONTRACT_ACCESS_FORBIDDEN)", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue(mockContract());

    await expect(
      CareService.createCareRequest("c1", "other-customer", baseRequest),
    ).rejects.toMatchObject({
      statusCode: 403,
      errorCode: "ERR_CONTRACT_ACCESS_FORBIDDEN",
    });
  });

  it("từ chối khi hợp đồng không ở trạng thái ACTIVE (400 CONTRACT_NOT_ACTIVE)", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue(
      mockContract({ status: "PENDING_PAYMENT" }),
    );

    await expect(
      CareService.createCareRequest("c1", "customer-1", baseRequest),
    ).rejects.toMatchObject({
      statusCode: 400,
      errorCode: "ERR_CONTRACT_NOT_ACTIVE",
    });
  });

  it("từ chối khi hợp đồng đang có phiếu PENDING chờ xử lý (400 EXISTING_PENDING_REQUEST)", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue(mockContract());
    vi.spyOn(db.careRequest, "findFirst").mockResolvedValue(
      { id: "existing-1", status: "PENDING" } as unknown as Awaited<
        ReturnType<typeof db.careRequest.findFirst>
      >,
    );

    await expect(
      CareService.createCareRequest("c1", "customer-1", baseRequest),
    ).rejects.toMatchObject({
      statusCode: 400,
      errorCode: "ERR_EXISTING_PENDING_REQUEST",
    });
  });

  it("kịch bản 1: rau ngắn ngày (30 ngày, quota=2) trong hạn mức → extraFee=0, isFeePaid=true", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue(
      mockContract({ crop: { durationDays: 30, guideI18n: null } }),
    );
    vi.spyOn(db.careRequest, "findFirst").mockResolvedValue(
      null as unknown as Awaited<ReturnType<typeof db.careRequest.findFirst>>,
    );
    vi.spyOn(db.careRequest, "count").mockResolvedValue(1); // đã dùng 1/2 lần
    vi.spyOn(db.careRequest, "create").mockImplementation(
      ((args: Parameters<typeof db.careRequest.create>[0]) =>
        Promise.resolve({
          id: "care-1",
          customerNote: args.data.customerNote,
          extraFee: args.data.extraFee,
          isFeePaid: args.data.isFeePaid,
          status: args.data.status,
          createdAt: new Date(),
        })) as unknown as typeof db.careRequest.create,
    );

    const result = await CareService.createCareRequest(
      "c1",
      "customer-1",
      baseRequest,
    );

    expect(result.careQuota).toBe(2);
    expect(result.usedCareCount).toBe(1);
    expect(result.extraFee).toBe(0);
    expect(result.isFeePaid).toBe(true);
  });

  it("kịch bản 2: rau ngắn ngày vượt hạn mức (đã dùng 2/2) → extraFee=50000, isFeePaid=false", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue(
      mockContract({ crop: { durationDays: 30, guideI18n: null } }),
    );
    vi.spyOn(db.careRequest, "findFirst").mockResolvedValue(
      null as unknown as Awaited<ReturnType<typeof db.careRequest.findFirst>>,
    );
    vi.spyOn(db.careRequest, "count").mockResolvedValue(2); // đã dùng hết 2/2 lần
    vi.spyOn(db.careRequest, "create").mockImplementation(
      ((args: Parameters<typeof db.careRequest.create>[0]) =>
        Promise.resolve({
          id: "care-2",
          customerNote: args.data.customerNote,
          extraFee: args.data.extraFee,
          isFeePaid: args.data.isFeePaid,
          status: args.data.status,
          createdAt: new Date(),
        })) as unknown as typeof db.careRequest.create,
    );

    const result = await CareService.createCareRequest(
      "c1",
      "customer-1",
      baseRequest,
    );

    expect(result.extraFee).toBe(50000);
    expect(result.isFeePaid).toBe(false);
  });

  it("kịch bản 3: rau dài ngày (60 ngày, quota=4) đã dùng 2 lần vẫn trong hạn mức → extraFee=0", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue(
      mockContract({ crop: { durationDays: 60, guideI18n: null } }),
    );
    vi.spyOn(db.careRequest, "findFirst").mockResolvedValue(
      null as unknown as Awaited<ReturnType<typeof db.careRequest.findFirst>>,
    );
    vi.spyOn(db.careRequest, "count").mockResolvedValue(2); // 2/4 lần
    vi.spyOn(db.careRequest, "create").mockImplementation(
      ((args: Parameters<typeof db.careRequest.create>[0]) =>
        Promise.resolve({
          id: "care-3",
          customerNote: args.data.customerNote,
          extraFee: args.data.extraFee,
          isFeePaid: args.data.isFeePaid,
          status: args.data.status,
          createdAt: new Date(),
        })) as unknown as typeof db.careRequest.create,
    );

    const result = await CareService.createCareRequest(
      "c1",
      "customer-1",
      baseRequest,
    );

    expect(result.careQuota).toBe(4);
    expect(result.extraFee).toBe(0);
    expect(result.isFeePaid).toBe(true);
  });

  it("ưu tiên careQuota cấu hình sẵn trong crop.guideI18n nếu có", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue(
      mockContract({ crop: { durationDays: 30, guideI18n: { careQuota: 5 } } }),
    );
    vi.spyOn(db.careRequest, "findFirst").mockResolvedValue(
      null as unknown as Awaited<ReturnType<typeof db.careRequest.findFirst>>,
    );
    vi.spyOn(db.careRequest, "count").mockResolvedValue(3);
    vi.spyOn(db.careRequest, "create").mockImplementation(
      ((args: Parameters<typeof db.careRequest.create>[0]) =>
        Promise.resolve({
          id: "care-4",
          customerNote: args.data.customerNote,
          extraFee: args.data.extraFee,
          isFeePaid: args.data.isFeePaid,
          status: args.data.status,
          createdAt: new Date(),
        })) as unknown as typeof db.careRequest.create,
    );

    const result = await CareService.createCareRequest(
      "c1",
      "customer-1",
      baseRequest,
    );

    expect(result.careQuota).toBe(5);
    expect(result.extraFee).toBe(0);
  });
});

describe("CareService.getCareRequests", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("từ chối khi không tìm thấy hợp đồng (404)", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue(
      null as unknown as ContractQueryResult,
    );

    await expect(
      CareService.getCareRequests("c1", { userId: "u1", role: "CUSTOMER" }),
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  it("chặn khách hàng khác xem phiếu chăm sóc không thuộc sở hữu (403)", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue(mockContract());

    await expect(
      CareService.getCareRequests("c1", {
        userId: "other-customer",
        role: "CUSTOMER",
      }),
    ).rejects.toMatchObject({ statusCode: 403 });
  });

  it("cho phép chủ sở hữu xem danh sách phiếu chăm sóc", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue(mockContract());
    vi.spyOn(db.careRequest, "findMany").mockResolvedValue([
      {
        id: "care-1",
        serviceTitleI18n: { vi: "Bón phân" },
        customerNote: "note",
        extraFee: 0,
        isFeePaid: true,
        status: "VERIFIED",
        createdAt: new Date(),
      },
    ] as unknown as CareRequestListResult);

    const result = await CareService.getCareRequests("c1", {
      userId: "customer-1",
      role: "CUSTOMER",
    });

    expect(result).toHaveLength(1);
    expect(result[0].usedCareCount).toBe(1);
  });

  it("cho phép STAFF/ADMIN xem dù không sở hữu hợp đồng", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue(mockContract());
    vi.spyOn(db.careRequest, "findMany").mockResolvedValue(
      [] as unknown as CareRequestListResult,
    );

    const result = await CareService.getCareRequests("c1", {
      userId: "staff-1",
      role: "STAFF",
    });

    expect(result).toEqual([]);
  });
});
