import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { ERROR_CODES } from "@repo/shared";

export const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const userRole = req.userRole || req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return next(
        AppError.forbidden(
          "Bạn không có quyền thực hiện thao tác này",
          ERROR_CODES.FORBIDDEN
        )
      );
    }
    next();
  };
};
