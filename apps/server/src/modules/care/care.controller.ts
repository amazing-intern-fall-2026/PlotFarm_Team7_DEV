import type { Request, Response, NextFunction } from "express";
import { CreateCareRequestSchema } from "@repo/shared";
import { CareService } from "./care.service";
import { AppError } from "../../errors/AppError";

export class CareController {
  /**
   * Endpoint: POST /api/v1/contracts/:id/care-requests
   * Khách hàng gửi phiếu yêu cầu chăm sóc (yêu cầu vai trò CUSTOMER, sở hữu hợp đồng)
   */
  static async createCareRequest(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (req.user?.role !== "CUSTOMER") {
        throw AppError.forbidden(
          "Chỉ khách hàng mới có thể gửi phiếu chăm sóc",
        );
      }

      const contractId = req.params.id;
      const payload = req.body?.payload ?? req.body;
      const data = CreateCareRequestSchema.parse(payload);

      const result = await CareService.createCareRequest(
        contractId,
        req.user.userId,
        data,
      );

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Endpoint: GET /api/v1/contracts/:id/care-requests
   * Khách hàng sở hữu hợp đồng, STAFF hoặc ADMIN xem danh sách phiếu chăm sóc
   */
  static async getCareRequests(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const contractId = req.params.id;

      const result = await CareService.getCareRequests(contractId, {
        userId: req.user!.userId,
        role: req.user!.role,
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
