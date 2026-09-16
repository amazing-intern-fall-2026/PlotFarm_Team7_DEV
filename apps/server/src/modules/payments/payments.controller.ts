import type { Request, Response, NextFunction } from "express";
import { CreatePaymentQrRequestSchema } from "@repo/shared";
import { PaymentsService } from "./payments.service";
import { AppError } from "../../errors/AppError";

export class PaymentsController {
  /**
   * Endpoint: POST /api/v1/payments/create-qr
   * Tạo payment order + sinh QR VietQR chuẩn Napas cho hợp đồng đang chờ thanh toán
   */
  static async createQr(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (req.user?.role !== "CUSTOMER") {
        throw AppError.forbidden("Chỉ khách hàng mới có thể tạo thanh toán");
      }

      const payload = req.body?.payload ?? req.body;
      const { contractId } = CreatePaymentQrRequestSchema.parse(payload);
      const result = await PaymentsService.createQr(contractId);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Endpoint: GET /api/v1/payments/check-status/:orderCode
   * Tra cứu trạng thái đơn thanh toán VietQR phục vụ polling US-21
   */
  static async checkStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { orderCode } = req.params;
      if (!orderCode) {
        throw AppError.badRequest("Mã đơn thanh toán không hợp lệ");
      }
      const result = await PaymentsService.checkStatus(orderCode);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
