import type { Request, Response, NextFunction } from "express";
import { CreatePaymentOrderRequestSchema } from "@repo/shared";
import { PaymentsService } from "./payments.service";
import { buildSuccessResponse } from "../../common/utils/envelope";

export class PaymentsController {
  /**
   * Endpoint: POST /api/v1/payments
   * Tạo payment order mới, sinh mã QR VietQR với nội dung CF[orderCode]
   */
  static async createPaymentOrder(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const payload = req.body?.payload ?? req.body;
      const parsedData = CreatePaymentOrderRequestSchema.parse(payload);
      const result = await PaymentsService.createPaymentOrder(parsedData);

      res.status(201).json(
        buildSuccessResponse(result, "Tạo payment order thành công", {
          userCode: req.user?.userId,
        }),
      );
    } catch (error) {
      next(error);
    }
  }
}
