import { describe, it, expect, vi, beforeEach } from "vitest";
import { db } from "@repo/database";
import {
  WebhookService,
  extractOrderCodeFromContent,
  type WebhookPayload,
} from "./webhook.service";

type PaymentTransactionWithOrder = Awaited<
  ReturnType<typeof db.paymentTransaction.findUnique>
>;
type PaymentOrderWithContract = Awaited<
  ReturnType<typeof db.paymentOrder.findUnique>
>;

describe("extractOrderCodeFromContent", () => {
  it("trích đúng mã đơn khi nội dung có đầy đủ dấu gạch ngang", () => {
    expect(extractOrderCodeFromContent("CFPAY-PF2026-0914-A3F")).toBe(
      "PAY-PF2026-0914-A3F",
    );
  });

  it("trích đúng mã đơn khi Napas đã bỏ hết dấu gạch ngang", () => {
    expect(extractOrderCodeFromContent("CFPAYPF20260914A3F")).toBe(
      "PAY-PF2026-0914-A3F",
    );
  });

  it("trích đúng mã đơn dù khách gõ thêm ký tự thừa trước/sau", () => {
    expect(
      extractOrderCodeFromContent("chuyen tien CFPAYPF20260914A3F thanh toan"),
    ).toBe("PAY-PF2026-0914-A3F");
  });

  it("trả về null khi nội dung không chứa mã đơn hợp lệ", () => {
    expect(extractOrderCodeFromContent("chuyen tien mua rau")).toBeNull();
  });
});

describe("WebhookService.processWebhook", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(db, "$transaction").mockImplementation(
      (async (callback: (tx: typeof db) => Promise<unknown>) =>
        callback(db)) as unknown as typeof db.$transaction,
    );
  });

  const basePayload: WebhookPayload = {
    gatewayReference: "FT26256123456789",
    transferAmount: 1150000,
    transferContent: "CFPAY-PF2026-0914-A3F thanh toan",
    senderBankCode: "VCB",
    senderAccountNo: "0123456789",
    senderAccountName: "NGUYEN VAN A",
    idempotencyKey: "SEPAY_TXN_998124",
  };

  it("kịch bản 1: đối soát thành công, kích hoạt hợp đồng ACTIVE và ô đất OCCUPIED", async () => {
    vi.spyOn(db.paymentTransaction, "findUnique").mockResolvedValue(
      null as unknown as PaymentTransactionWithOrder,
    );
    vi.spyOn(db.paymentOrder, "findUnique").mockResolvedValue({
      id: "order-1",
      orderCode: "PAY-PF2026-0914-A3F",
      contractId: "contract-1",
      amount: 1150000,
      status: "PENDING",
      contract: { plotId: "plot-1" },
    } as unknown as PaymentOrderWithContract);
    vi.spyOn(db.paymentOrder, "update").mockImplementation(
      ((args: Parameters<typeof db.paymentOrder.update>[0]) =>
        Promise.resolve({
          orderCode: "PAY-PF2026-0914-A3F",
          ...args.data,
        })) as unknown as typeof db.paymentOrder.update,
    );
    vi.spyOn(db.paymentTransaction, "create").mockResolvedValue(
      {} as unknown as Awaited<ReturnType<typeof db.paymentTransaction.create>>,
    );
    vi.spyOn(db.contract, "update").mockImplementation(
      ((args: Parameters<typeof db.contract.update>[0]) =>
        Promise.resolve({
          plotId: "plot-1",
          ...args.data,
        })) as unknown as typeof db.contract.update,
    );
    vi.spyOn(db.plot, "update").mockImplementation(
      ((args: Parameters<typeof db.plot.update>[0]) =>
        Promise.resolve({ ...args.data })) as unknown as typeof db.plot.update,
    );

    const result = await WebhookService.processWebhook(basePayload);

    expect(result.processed).toBe(true);
    expect(result.orderCode).toBe("PAY-PF2026-0914-A3F");
    expect(result.contractStatus).toBe("ACTIVE");
    expect(result.plotStatus).toBe("OCCUPIED");
  });

  it("kịch bản 2: từ chối khi Webhook gọi lại cùng idempotencyKey (không xử lý lặp lại)", async () => {
    vi.spyOn(db.paymentTransaction, "findUnique").mockResolvedValue({
      idempotencyKey: "SEPAY_TXN_998124",
      paymentOrder: {
        orderCode: "PAY-PF2026-0914-A3F",
        contract: { status: "ACTIVE", plot: { status: "OCCUPIED" } },
      },
    } as unknown as PaymentTransactionWithOrder);
    const transactionSpy = vi.spyOn(db, "$transaction");

    const result = await WebhookService.processWebhook(basePayload);

    expect(result).toEqual({
      processed: true,
      orderCode: "PAY-PF2026-0914-A3F",
      contractStatus: "ACTIVE",
      plotStatus: "OCCUPIED",
    });
    expect(transactionSpy).not.toHaveBeenCalled();
  });

  it("kịch bản 3: từ chối khi khách chuyển thiếu tiền (INSUFFICIENT_AMOUNT)", async () => {
    vi.spyOn(db.paymentTransaction, "findUnique").mockResolvedValue(
      null as unknown as PaymentTransactionWithOrder,
    );
    vi.spyOn(db.paymentOrder, "findUnique").mockResolvedValue({
      id: "order-1",
      orderCode: "PAY-PF2026-0914-A3F",
      contractId: "contract-1",
      amount: 1150000,
      status: "PENDING",
      contract: { plotId: "plot-1" },
    } as unknown as PaymentOrderWithContract);

    await expect(
      WebhookService.processWebhook({ ...basePayload, transferAmount: 115000 }),
    ).rejects.toMatchObject({
      statusCode: 400,
      errorCode: "ERR_INSUFFICIENT_AMOUNT",
    });
  });

  it("từ chối khi nội dung chuyển khoản sai cú pháp, không tìm thấy mã đơn (ORDER_CODE_NOT_FOUND)", async () => {
    vi.spyOn(db.paymentTransaction, "findUnique").mockResolvedValue(
      null as unknown as PaymentTransactionWithOrder,
    );

    await expect(
      WebhookService.processWebhook({
        ...basePayload,
        transferContent: "chuyen tien mua rau",
      }),
    ).rejects.toMatchObject({
      statusCode: 400,
      errorCode: "ERR_ORDER_CODE_NOT_FOUND",
    });
  });

  it("từ chối khi đơn hàng đã ở trạng thái SUCCESS từ trước (TRANSACTION_ALREADY_PROCESSED)", async () => {
    vi.spyOn(db.paymentTransaction, "findUnique").mockResolvedValue(
      null as unknown as PaymentTransactionWithOrder,
    );
    vi.spyOn(db.paymentOrder, "findUnique").mockResolvedValue({
      id: "order-1",
      orderCode: "PAY-PF2026-0914-A3F",
      contractId: "contract-1",
      amount: 1150000,
      status: "SUCCESS",
      contract: { plotId: "plot-1" },
    } as unknown as PaymentOrderWithContract);

    await expect(WebhookService.processWebhook(basePayload)).rejects.toMatchObject({
      statusCode: 409,
      errorCode: "ERR_TRANSACTION_ALREADY_PROCESSED",
    });
  });
});
