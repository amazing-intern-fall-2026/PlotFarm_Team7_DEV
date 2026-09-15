import type { Request, Response, NextFunction } from "express";
import { PlotsQuerySchema, PlotDetailParamsSchema } from "@repo/shared";
import { PlotsService } from "./plots.service";
import { buildSuccessResponse } from "../../common/utils/envelope";

export class PlotsController {
  static async getPlots(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsedQuery = PlotsQuerySchema.parse(req.query);
      const result = await PlotsService.getPlotsList(parsedQuery);

      res.status(200).json(
        buildSuccessResponse(result, "Lấy danh sách ô đất thành công")
      );
    } catch (error) {
      next(error);
    }
  }

  static async getPlotById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsedParams = PlotDetailParamsSchema.parse(req.params);
      const result = await PlotsService.getPlotById(parsedParams.id);

      res.status(200).json(
        buildSuccessResponse(result, "Lấy chi tiết ô đất thành công")
      );
    } catch (error) {
      next(error);
    }
  }
}
