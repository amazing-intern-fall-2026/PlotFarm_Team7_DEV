import { db } from "@repo/database";
import {
  GROWTH_STAGES,
  ERROR_CODES,
  ERROR_MESSAGES,
  type CreateFarmingLogRequest,
  type FarmingLog,
} from "@repo/shared";
import { AppError } from "../../errors/AppError";

interface RawFarmingLog {
  id: string;
  stageNameI18n: unknown;
  notes: string | null;
  imageUrls: unknown;
  temperature: unknown;
  humidity: unknown;
  soilMoisture: unknown;
  loggedAt: Date;
}

interface StaffInfo {
  userCode: string | null;
  fullName: string;
}

function mapFarmingLogToResponse(
  log: RawFarmingLog,
  contractCode: string,
  staff: StaffInfo,
): FarmingLog {
  const stageLabel = (log.stageNameI18n as { vi?: string } | null)?.vi;
  const stageDef = GROWTH_STAGES.find((s) => s.label === stageLabel);

  return {
    logCode: `LOG-${log.id.slice(0, 8).toUpperCase()}`,
    contractCode,
    authorStaff: {
      userCode: staff.userCode || "N/A",
      fullName: staff.fullName,
    },
    actionType: "LOG_GROWTH",
    title: stageLabel
      ? `Nhật ký sinh trưởng • ${stageLabel}`
      : "Cập nhật nhật ký canh tác",
    description: log.notes || "",
    growthStage: stageDef?.id,
    progressPercent: stageDef?.progressPercent,
    photoUrls: (log.imageUrls as string[]) || [],
    sensorSnapshot: {
      temperature: Number(log.temperature ?? 0),
      humidity: Number(log.humidity ?? 0),
      soilMoisture: Number(log.soilMoisture ?? 0),
    },
    isAmended: false,
    createdAt: log.loggedAt.toISOString(),
  };
}

export class DiaryService {
  static async createFarmingLog(
    contractId: string,
    staffId: string,
    staffRole: string,
    data: CreateFarmingLogRequest,
  ): Promise<FarmingLog> {
    const contract = await db.contract.findUnique({
      where: { id: contractId },
      include: { plot: true },
    });

    if (!contract) {
      throw AppError.notFound("Không tìm thấy hợp đồng");
    }

    if (contract.status !== "ACTIVE" && contract.status !== "IN_HARVEST") {
      throw AppError.badRequest(
        ERROR_MESSAGES.DIARY.CONTRACT_NOT_ACTIVE,
        ERROR_CODES.CONTRACT_NOT_ACTIVE,
      );
    }

    if (staffRole !== "ADMIN" && contract.plot.assignedStaffId !== staffId) {
      throw AppError.forbidden(
        ERROR_MESSAGES.DIARY.NOT_ASSIGNED_STAFF,
        ERROR_CODES.NOT_ASSIGNED_STAFF,
      );
    }

    const stageDef = GROWTH_STAGES.find((s) => s.id === data.growthStage);
    const progressPercent =
      stageDef?.progressPercent ?? contract.progressPercent;

    const { log, staff } = await db.$transaction(async (tx) => {
      const createdLog = await tx.farmingLog.create({
        data: {
          contractId: contract.id,
          staffId,
          stageNameI18n: stageDef ? { vi: stageDef.label } : {},
          notes: data.description,
          imageUrls: data.photoUrls,
          temperature: data.sensorSnapshot?.temperature,
          humidity: data.sensorSnapshot?.humidity,
          soilMoisture: data.sensorSnapshot?.soilMoisture,
        },
      });

      await tx.contract.update({
        where: { id: contract.id },
        data: { progressPercent },
      });

      const staffUser = await tx.user.findUnique({ where: { id: staffId } });

      return { log: createdLog, staff: staffUser };
    });

    return mapFarmingLogToResponse(log, contract.contractCode, {
      userCode: staff?.userCode ?? null,
      fullName: staff?.fullName ?? "",
    });
  }

  static async getFarmingLogs(
    contractId: string,
    requester: { userId: string; role: string },
  ): Promise<FarmingLog[]> {
    const contract = await db.contract.findUnique({
      where: { id: contractId },
    });

    if (!contract) {
      throw AppError.notFound("Không tìm thấy hợp đồng");
    }

    const isOwner = contract.userId === requester.userId;
    const isStaffOrAdmin =
      requester.role === "STAFF" || requester.role === "ADMIN";
    if (!isOwner && !isStaffOrAdmin) {
      throw AppError.forbidden(
        "Bạn không có quyền xem nhật ký của hợp đồng này",
      );
    }

    const logs = await db.farmingLog.findMany({
      where: { contractId },
      include: { staff: true },
      orderBy: { loggedAt: "desc" },
    });

    return logs.map((log) =>
      mapFarmingLogToResponse(log, contract.contractCode, {
        userCode: log.staff.userCode,
        fullName: log.staff.fullName,
      }),
    );
  }
}
