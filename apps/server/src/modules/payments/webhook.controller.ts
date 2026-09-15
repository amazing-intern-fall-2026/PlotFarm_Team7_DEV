import type { Request, Response, NextFunction } from "express";
import { db } from "@repo/database";
import { WebhookRequestSchema, MockWebhookRequestSchema } from "@repo/shared";
import { WebhookService } from "./webhook.service";
import { AppError } from "../../errors/AppError";

export class WebhookController {
  /**
   * Endpoint: POST /api/v1/payments/webhook
   * Webhook thật từ cổng ngân hàng/SePay/Casso (xác thực qua webhookGuard)
   */
  static async handleWebhook(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const payload = WebhookRequestSchema.parse(req.body);
      const result = await WebhookService.processWebhook(payload);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Endpoint: POST /api/v1/payments/mock-webhook
   * Endpoint giả lập phục vụ demo (chủ đơn hàng hoặc ADMIN)
   */
  static async mockWebhook(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { orderCode } = MockWebhookRequestSchema.parse(req.body);

      const paymentOrder = await db.paymentOrder.findUnique({
        where: { orderCode },
      });
      if (!paymentOrder) {
        throw AppError.notFound("Không tìm thấy đơn hàng");
      }

      const isOwner = paymentOrder.userId === req.user?.userId;
      const isAdmin = req.user?.role === "ADMIN";
      if (!isOwner && !isAdmin) {
        throw AppError.forbidden(
          "Bạn không có quyền thao tác trên đơn hàng này",
        );
      }

      const result = await WebhookService.processWebhook({
        gatewayReference: `MOCK_${orderCode}_${Date.now()}`,
        transferAmount: Number(paymentOrder.amount),
        transferContent: `CF${orderCode}`,
        senderBankCode: "MOCK",
        senderAccountNo: "0000000000",
        senderAccountName: "MOCK DEMO",
        idempotencyKey: `MOCK_${paymentOrder.id}_${Date.now()}`,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
