import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import { db } from "@repo/database";

process.env.VIETQR_BANK_ID = "970422";
process.env.VIETQR_BANK_NAME = "MB Bank";
process.env.VIETQR_ACCOUNT_NO = "0987654321";
process.env.VIETQR_ACCOUNT_NAME = "TRAN DANG NGHIA";
process.env.VIETQR_TEMPLATE = "compact2";

type ContractQueryResult = Awaited<ReturnType<typeof db.contract.findUnique>>;

let PaymentsService: typeof import("./payments.service").PaymentsService;
let generateOrderCode: typeof import("./payments.service").generateOrderCode;
let buildTransferContent: typeof import("./payments.service").buildTransferContent;
let VietQRService: typeof import("./vietqr.service").VietQRService;

// Dynamic import bên trong beforeAll: đảm bảo module đọc process.env.VIETQR_*
// SAU khi đã gán ở trên (static import bị hoisted lên trước, sẽ đọc env lúc còn rỗng)
beforeAll(async () => {
  ({ PaymentsService, generateOrderCode, buildTransferContent } = await import(
    "./payments.service"
  ));
  ({ VietQRService } = await import("./vietqr.service"));
});

describe("generateOrderCode", () => {
  it("sinh mã đúng định dạng PAY-PF{yyyy}-{MMDD}-{random 3 ký tự}", () => {
    const code = generateOrderCode();
    expect(code).toMatch(/^PAY-PF\d{4}-\d{4}-[A-Z0-9]{3}$/);
  });

  it("sinh mã khác nhau giữa các lần gọi (tính toàn vẹn, không trùng)", () => {
    const codes = new Set(Array.from({ length: 50 }, () => generateOrderCode()));
    expect(codes.size).toBe(50);
  });
});

describe("buildTransferContent", () => {
  it("thêm tiền tố CF vào orderCode", () => {
    expect(buildTransferContent("PAY-PF2026-0914-A3F")).toBe("CFPAY-PF2026-0914-A3F");
  });
});

describe("VietQRService.buildQrImageUrl", () => {
  it("sinh đúng URL theo domain img.vietqr.io kèm bankId, accountNo, template", () => {
    const url = VietQRService.buildQrImageUrl(1150000, "CFPAY-PF2026-0914-A3F");
    expect(url).toContain("https://img.vietqr.io/image/970422-0987654321-compact2.jpg");
    expect(url).toContain("amount=1150000");
    expect(url).toContain("addInfo=CFPAY");
  });

  it("mã hoá an toàn ký tự đặc biệt (khoảng trắng) trong tên chủ tài khoản", () => {
    const url = VietQRService.buildQrImageUrl(100000, "CFTEST");
    expect(url).toContain("accountName=TRAN+DANG+NGHIA");
  });
});

describe("PaymentsService.createQr", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("từ chối khi không tìm thấy hợp đồng (404)", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue(null as unknown as ContractQueryResult);

    await expect(PaymentsService.createQr("contract-not-exist")).rejects.toMatchObject({
      statusCode: 404,
    });
  });

  it("từ chối khi hợp đồng đã ACTIVE (400 CONTRACT_ALREADY_PAID)", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue({
      id: "c1",
      status: "ACTIVE",
      totalPrice: 1150000,
      userId: "u1",
      plot: { lockedUntil: null },
    } as unknown as ContractQueryResult);

    await expect(PaymentsService.createQr("c1")).rejects.toMatchObject({
      statusCode: 400,
      errorCode: "CONTRACT_ALREADY_PAID",
    });
  });

  it("từ chối khi hợp đồng ở trạng thái khác chưa chờ thanh toán (400 CONTRACT_NOT_PENDING)", async () => {
    vi.spyOn(db.contract, "findUnique").mockResolvedValue({
      id: "c1",
      status: "DRAFT",
      totalPrice: 1150000,
      userId: "u1",
      plot: { lockedUntil: null },
    } as unknown as ContractQueryResult);

    await expect(PaymentsService.createQr("c1")).rejects.toMatchObject({
      statusCode: 400,
      errorCode: "CONTRACT_NOT_PENDING",
    });
  });

  it("tạo QR thành công cho hợp đồng PENDING_PAYMENT, expiresAt tối đa 5 phút", async () => {
    const now = Date.now();
    vi.spyOn(db.contract, "findUnique").mockResolvedValue({
      id: "c1",
      status: "PENDING_PAYMENT",
      totalPrice: 1150000,
      userId: "u1",
      plot: { lockedUntil: null },
    } as unknown as ContractQueryResult);

    vi.spyOn(db.paymentOrder, "create").mockImplementation(
      ((args: Parameters<typeof db.paymentOrder.create>[0]) =>
        Promise.resolve({ id: "pay-1", ...args.data })) as unknown as typeof db.paymentOrder.create,
    );

    const result = await PaymentsService.createQr("c1");

    expect(result.contractId).toBe("c1");
    expect(result.amount).toBe(1150000);
    expect(result.transferContent).toBe(buildTransferContent(result.orderCode));
    expect(result.bankInfo.accountNo).toBe("0987654321");
    expect(new Date(result.expiresAt).getTime()).toBeLessThanOrEqual(now + 5 * 60 * 1000 + 1000);
  });

  it("khớp expiresAt với thời gian còn lại của khoá giữ chỗ ô đất nếu ngắn hơn 5 phút", async () => {
    const lockedUntil = new Date(Date.now() + 2 * 60 * 1000);
    vi.spyOn(db.contract, "findUnique").mockResolvedValue({
      id: "c2",
      status: "PENDING_PAYMENT",
      totalPrice: 500000,
      userId: "u1",
      plot: { lockedUntil },
    } as unknown as ContractQueryResult);

    vi.spyOn(db.paymentOrder, "create").mockImplementation(
      ((args: Parameters<typeof db.paymentOrder.create>[0]) =>
        Promise.resolve({ id: "pay-2", ...args.data })) as unknown as typeof db.paymentOrder.create,
    );

    const result = await PaymentsService.createQr("c2");

    expect(new Date(result.expiresAt).getTime()).toBe(lockedUntil.getTime());
  });
});
