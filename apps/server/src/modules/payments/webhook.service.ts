import { db } from "@repo/database";
import type { Prisma } from "@repo/database";
import { ERROR_CODES, ERROR_MESSAGES } from "@repo/shared";
import { AppError } from "../../errors/AppError";

export interface WebhookPayload {
  gatewayReference: string;
  transferAmount: number;
  transferContent: string;
  senderBankCode?: string;
  senderAccountNo?: string;
  senderAccountName?: string;
  idempotencyKey: string;
}

export interface WebhookResult {
  processed: boolean;
  orderCode: string;
  contractStatus: string;
  plotStatus: string;
}

// Bắt "CF" + "PAY-PF{yyyy}-{MMDD}-{3 ký tự}", chịu được thiếu dấu gạch ngang
// (Napas tự bỏ dấu "-" khi hiển thị nội dung chuyển khoản) và ký tự thừa trước/sau.
const ORDER_CODE_PATTERN = /CF\s*PAY-?PF-?(\d{4})-?(\d{4})-?([A-Z0-9]{3})/i;

export function extractOrderCodeFromContent(content: string): string | null {
  const match = content.toUpperCase().match(ORDER_CODE_PATTERN);
  if (!match) return null;
  const [, year, monthDay, suffix] = match;
  return `PAY-PF${year}-${monthDay}-${suffix}`;
}

export class WebhookService {
  static async processWebhook(payload: WebhookPayload): Promise<WebhookResult> {
    // 1. Idempotency: đã xử lý giao dịch này trước đó thì trả kết quả cũ, không làm lại
    const existingTransaction = await db.paymentTransaction.findUnique({
      where: { idempotencyKey: payload.idempotencyKey },
      include: {
        paymentOrder: { include: { contract: { include: { plot: true } } } },
      },
    });

    if (existingTransaction) {
      const order = existingTransaction.paymentOrder;
      return {
        processed: true,
        orderCode: order.orderCode,
        contractStatus: order.contract.status,
        plotStatus: order.contract.plot.status,
      };
    }

    // 2. Trích mã đơn từ nội dung chuyển khoản
    const orderCode = extractOrderCodeFromContent(payload.transferContent);
    if (!orderCode) {
      throw AppError.badRequest(
        ERROR_MESSAGES.PAYMENT.ORDER_CODE_NOT_FOUND,
        ERROR_CODES.ORDER_CODE_NOT_FOUND,
      );
    }

    const paymentOrder = await db.paymentOrder.findUnique({
      where: { orderCode },
      include: { contract: { include: { plot: true } } },
    });

    if (!paymentOrder) {
      throw AppError.badRequest(
        ERROR_MESSAGES.PAYMENT.ORDER_CODE_NOT_FOUND,
        ERROR_CODES.ORDER_CODE_NOT_FOUND,
      );
    }

    // 3. Check đủ tiền
    if (Number(payload.transferAmount) < Number(paymentOrder.amount)) {
      throw AppError.badRequest(
        ERROR_MESSAGES.PAYMENT.INSUFFICIENT_AMOUNT,
        ERROR_CODES.INSUFFICIENT_AMOUNT,
      );
    }

    // 4. Đơn đã được đối soát bằng đường khác trước đó
    if (paymentOrder.status === "SUCCESS") {
      throw AppError.conflict(
        ERROR_MESSAGES.PAYMENT.TRANSACTION_ALREADY_PROCESSED,
        ERROR_CODES.TRANSACTION_ALREADY_PROCESSED,
      );
    }

    // 5. Kích hoạt dây chuyền trong 1 transaction duy nhất
    try {
      const result = await db.$transaction(async (tx) => {
        const updatedOrder = await tx.paymentOrder.update({
          where: { id: paymentOrder.id },
          data: { status: "SUCCESS", paidAt: new Date() },
        });

        await tx.paymentTransaction.create({
          data: {
            paymentOrderId: paymentOrder.id,
            gatewayReference: payload.gatewayReference,
            senderBankCode: payload.senderBankCode,
            senderAccountNo: payload.senderAccountNo,
            senderAccountName: payload.senderAccountName,
            transferAmount: payload.transferAmount,
            transferContent: payload.transferContent,
            rawWebhookPayload: payload as unknown as Prisma.InputJsonValue,
            idempotencyKey: payload.idempotencyKey,
          },
        });

        const updatedContract = await tx.contract.update({
          where: { id: paymentOrder.contractId },
          data: { status: "ACTIVE" },
        });

        const updatedPlot = await tx.plot.update({
          where: { id: updatedContract.plotId },
          data: { status: "OCCUPIED", lockedByUserId: null, lockedUntil: null },
        });

        return { updatedOrder, updatedContract, updatedPlot };
      });

      return {
        processed: true,
        orderCode: result.updatedOrder.orderCode,
        contractStatus: result.updatedContract.status,
        plotStatus: result.updatedPlot.status,
      };
    } catch (err) {
      // Race condition: 2 webhook cùng idempotencyKey chạy song song, unique constraint chặn ở DB
      if (
        err instanceof Error &&
        "code" in err &&
        (err as { code?: string }).code === "P2002"
      ) {
        throw AppError.conflict(
          ERROR_MESSAGES.PAYMENT.TRANSACTION_ALREADY_PROCESSED,
          ERROR_CODES.TRANSACTION_ALREADY_PROCESSED,
        );
      }
      throw err;
    }
  }
}
