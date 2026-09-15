import type { Request, Response } from "express";
import { CreateFarmingLogRequestSchema, type FarmingLog } from "@repo/shared";
import { buildSuccessResponse } from "../../common/utils/envelope";

// In-memory store for dev / fallback
const memoryFarmingLogs: FarmingLog[] = [];

export function createFarmingLog(req: Request, res: Response): void {
  const parsed = CreateFarmingLogRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      code: 400,
      message: "Dữ liệu nhật ký canh tác không hợp lệ.",
      error: parsed.error.flatten(),
    });
    return;
  }

  const { contractId = req.params.id || req.params.contractCode || "CONTRACT-A104" } = req.params;
  const newLog = {
    logCode: `LOG-${Date.now().toString().slice(-6)}`,
    contractCode: contractId,
    authorStaff: {
      userCode: "STAFF-01",
      fullName: "Bác Bảy (Kỹ thuật viên Trồng trọt)",
    },
    actionType: parsed.data.actionType || "LOG_GROWTH",
    title: parsed.data.title || "Cập nhật tiến độ sinh trưởng",
    description: parsed.data.description,
    growthStage: parsed.data.growthStage || "STAGE_2",
    progressPercent: parsed.data.progressPercent || 50,
    photoUrls: parsed.data.photoUrls,
    sensorSnapshot: parsed.data.sensorSnapshot || {
      temperature: 24.5,
      humidity: 72,
      soilMoisture: 68,
    },
    isAmended: false,
    createdAt: new Date().toISOString(),
  };

  memoryFarmingLogs.push(newLog);

  res.status(201).json(
    buildSuccessResponse(newLog, "Đăng bài viết nhật ký canh tác thành công.", {
      code: 201,
    })
  );
}

export function getFarmingLogs(req: Request, res: Response): void {
  const { contractId = req.params.id || req.params.contractCode } = req.params;
  const logs = memoryFarmingLogs.filter(
    (log) => !contractId || log.contractCode === contractId
  );
  res.status(200).json(
    buildSuccessResponse(logs, "Lấy danh sách nhật ký thành công.")
  );
}
