import type { Request, Response, NextFunction } from "express";
import { ERROR_CODES, ERROR_MESSAGES } from "@repo/shared";
import { AppError } from "../errors/AppError";

const PAYMENT_WEBHOOK_SECRET = process.env.PAYMENT_WEBHOOK_SECRET || "";

export const webhookGuard = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!PAYMENT_WEBHOOK_SECRET || apiKey !== PAYMENT_WEBHOOK_SECRET) {
      throw AppError.unauthorized(
        ERROR_MESSAGES.PAYMENT.WEBHOOK_UNAUTHORIZED,
        ERROR_CODES.WEBHOOK_UNAUTHORIZED,
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
