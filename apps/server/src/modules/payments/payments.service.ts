import { randomUUID } from "crypto";
import { db } from "@repo/database";
import type { CreatePaymentOrderRequest } from "@repo/shared";
import { AppError } from "../../errors/AppError";
import { VietQRService } from "./vietqr.service";

const QR_EXPIRES_MINUTES = 15;

export class PaymentsService {
  static async createPaymentOrder(data: CreatePaymentOrderRequest) {
    const contract = await db.contract.findUnique({
      where: { contractCode: data.contractCode },
    });

    if (!contract) {
      throw AppError.notFound("Không tìm thấy hợp đồng");
    }

    const orderCode = generateOrderCode();
    const transferContent = buildTransferContent(orderCode);
    const amount = Number(contract.totalPrice);

    const { qrContent, qrImage } = await VietQRService.generateQr({
      amount,
      addInfo: transferContent,
    });

    const expiresAt = new Date(Date.now() + QR_EXPIRES_MINUTES * 60 * 1000);

    const paymentOrder = await db.paymentOrder.create({
      data: {
        orderCode,
        contractId: contract.id,
        userId: contract.userId,
        amount,
        paymentMethod: data.paymentMethod,
        paymentType: "CONTRACT_INITIAL",
        status: "PENDING",
        qrContent,
        qrImageUrl: qrImage,
        expiresAt,
      },
    });

    return paymentOrder;
  }
}

function generateOrderCode(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const random = randomUUID().slice(0, 3).toUpperCase();
  return `PAY-PF${year}-${month}${day}-${random}`;
}

function buildTransferContent(orderCode: string): string {
  return `CF${orderCode}`;
}
