import { Router } from "express";
import { DiaryController } from "./diary.controller";
import { authGuard } from "../../middlewares/authGuard";

export const diaryRouter: Router = Router();

diaryRouter.post(
  "/contracts/:id/farming-logs",
  authGuard,
  DiaryController.createFarmingLog,
);
diaryRouter.get(
  "/contracts/:id/farming-logs",
  authGuard,
  DiaryController.getFarmingLogs,
);
