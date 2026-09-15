import type { Request, Response, NextFunction } from "express";
import { CreateFarmingLogRequestSchema } from "@repo/shared";
import { DiaryService } from "./diary.service";
import { AppError } from "../../errors/AppError";

export class DiaryController {
  /**
   * Endpoint: POST /api/v1/contracts/:id/farming-logs
   * Nhân viên nông dân đăng bài nhật ký canh tác (yêu cầu vai trò STAFF hoặc ADMIN)
   */
  static async createFarmingLog(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (req.user?.role !== "STAFF" && req.user?.role !== "ADMIN") {
        throw AppError.forbidden(
          "Chỉ nhân viên nông dân mới có thể đăng nhật ký",
        );
      }

      const contractId = req.params.id;
      const payload = req.body?.payload ?? req.body;
      const data = CreateFarmingLogRequestSchema.parse(payload);

      const result = await DiaryService.createFarmingLog(
        contractId,
        req.user.userId,
        req.user.role,
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
   * Endpoint: GET /api/v1/contracts/:id/farming-logs
   * Khách hàng sở hữu hợp đồng, STAFF hoặc ADMIN xem danh sách nhật ký
   */
  static async getFarmingLogs(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const contractId = req.params.id;

      const result = await DiaryService.getFarmingLogs(contractId, {
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
