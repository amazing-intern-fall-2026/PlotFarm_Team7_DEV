import type { Request, Response, NextFunction } from "express";
import { CreateContractSchema } from "./contracts.schema";
import { ContractsService } from "./contracts.service";
import { AppError } from "../../errors/AppError";

export class ContractsController {
  /**
   * Endpoint: POST /api/v1/contracts
   * Khởi tạo hợp đồng thuê đất theo chu kỳ sinh trưởng của giống rau
   */
  static async createContract(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.userId || req.user?.userId;
      if (!userId) {
        throw AppError.unauthorized("Yêu cầu đăng nhập để thực hiện hành động này");
      }

      if (req.user?.role && req.user.role !== "CUSTOMER") {
        throw AppError.forbidden("Chỉ khách hàng (CUSTOMER) mới có quyền tạo hợp đồng thuê đất");
      }

      const input = CreateContractSchema.parse(req.body);
      const result = await ContractsService.createContract(userId, input);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
