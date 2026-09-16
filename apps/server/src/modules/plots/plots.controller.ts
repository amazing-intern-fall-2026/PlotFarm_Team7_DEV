import type { Request, Response, NextFunction } from "express";
import { PlotsQuerySchema, PlotDetailParamsSchema } from "@repo/shared";
import { PlotsService } from "./plots.service";

export class PlotsController {
  static async getPlots(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsedQuery = PlotsQuerySchema.parse(req.query);
      const result = await PlotsService.getPlotsList(parsedQuery);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPlotById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsedParams = PlotDetailParamsSchema.parse(req.params);
      const result = await PlotsService.getPlotById(parsedParams.id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async holdPlot(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsedParams = PlotDetailParamsSchema.parse(req.params);
      const userId = req.userId || req.user?.userId;
      if (!userId) {
        throw new Error("Yêu cầu đăng nhập để truy cập tài nguyên");
      }

      const result = await PlotsService.holdPlot(parsedParams.id, userId);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async releaseHoldPlot(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsedParams = PlotDetailParamsSchema.parse(req.params);
      const userId = req.userId || req.user?.userId;
      const userRole = req.userRole || req.user?.role;
      if (!userId || !userRole) {
        throw new Error("Yêu cầu đăng nhập để truy cập tài nguyên");
      }

      const result = await PlotsService.releaseHoldPlot(parsedParams.id, userId, userRole);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

