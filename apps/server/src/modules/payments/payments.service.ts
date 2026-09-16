import { db } from "@repo/database";
import { AppError } from "../../errors/AppError";
import { VietQRService } from "./vietqr.service";

const MAX_EXPIRES_MINUTES = 5;

export interface CreateQrResult {
  paymentOrderId: string;
  orderCode: string;
  contractId: string;
  amount: number;
  bankInfo: ReturnType<typeof VietQRService.getBankInfo>;
  transferContent: string;
  qrImageUrl: string;
  expiresAt: string;
}

export class PaymentsService {
  static async createQr(contractId: string): Promise<CreateQrResult> {
    const contract = await db.contract.findUnique({
      where: { id: contractId },
      include: { plot: true },
    });

    if (!contract) {
      throw AppError.notFound("Không tìm thấy hợp đồng hợp lệ");
    }

    if (contract.status !== "PENDING_PAYMENT") {
      if (contract.status === "ACTIVE") {
        throw AppError.badRequest(
          "Hợp đồng đã được thanh toán",
          "CONTRACT_ALREADY_PAID",
        );
      }
      throw AppError.badRequest(
        "Hợp đồng không ở trạng thái chờ thanh toán",
        "CONTRACT_NOT_PENDING",
      );
    }

    const orderCode = generateOrderCode();
    const transferContent = buildTransferContent(orderCode);
    const amount = Number(contract.totalPrice);

    const maxExpiresAt = new Date(Date.now() + MAX_EXPIRES_MINUTES * 60 * 1000);
    const lockedUntil = contract.plot.lockedUntil;
    const expiresAt = lockedUntil && lockedUntil < maxExpiresAt ? lockedUntil : maxExpiresAt;

    const bankInfo = VietQRService.getBankInfo();
    const qrImageUrl = VietQRService.buildQrImageUrl(amount, transferContent);

    const paymentOrder = await db.paymentOrder.create({
      data: {
        orderCode,
        contractId: contract.id,
        userId: contract.userId,
        amount,
        paymentMethod: "VIETQR",
        paymentType: "CONTRACT_INITIAL",
        status: "PENDING",
        qrImageUrl,
        expiresAt,
      },
    });

    return {
      paymentOrderId: paymentOrder.id,
      orderCode: paymentOrder.orderCode,
      contractId: contract.id,
      amount,
      bankInfo,
      transferContent,
      qrImageUrl,
      expiresAt: expiresAt.toISOString(),
    };
  }

  static async checkStatus(orderCode: string) {
    const paymentOrder = await db.paymentOrder.findUnique({
      where: { orderCode },
      include: {
        contract: {
          select: {
            id: true,
            status: true,
            plotId: true,
          },
        },
      },
    });

    if (!paymentOrder) {
      throw AppError.notFound("Không tìm thấy đơn thanh toán");
    }

    return {
      orderCode: paymentOrder.orderCode,
      status: paymentOrder.status,
      amount: Number(paymentOrder.amount),
      contractId: paymentOrder.contractId,
      contractStatus: paymentOrder.contract?.status ?? null,
      paidAt: paymentOrder.paidAt?.toISOString() ?? null,
    };
  }
}

let orderSeq = Math.floor(Math.random() * 46656);

export function generateOrderCode(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  orderSeq = (orderSeq + 1) % 46656;
  const suffix = orderSeq.toString(36).padStart(3, "0").toUpperCase();
  return `PAY-PF${year}-${month}${day}-${suffix}`;
}

export function buildTransferContent(orderCode: string): string {
  return `CF${orderCode}`;
}
