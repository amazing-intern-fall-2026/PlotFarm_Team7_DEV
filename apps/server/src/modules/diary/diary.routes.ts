import { Router } from "express";
import { createFarmingLog, getFarmingLogs } from "./diary.controller";

export const diaryRouter: Router = Router();

diaryRouter.post("/contracts/:id/farming-logs", createFarmingLog);
diaryRouter.get("/contracts/:id/farming-logs", getFarmingLogs);
