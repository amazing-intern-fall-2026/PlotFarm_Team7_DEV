import { db } from "@repo/database";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  type CreateCareRequest,
  type CareRequestResult,
} from "@repo/shared";
import { AppError } from "../../errors/AppError";

const DEFAULT_EXTRA_FEE = 50000;

function getCareQuota(crop: {
  durationDays: number;
  guideI18n: unknown;
}): number {
  const guide = crop.guideI18n as { careQuota?: number } | null;
  if (guide?.careQuota && typeof guide.careQuota === "number") {
    return guide.careQuota;
  }
  return Math.ceil(crop.durationDays / 15);
}

export class CareService {
  static async createCareRequest(
    contractId: string,
    customerId: string,
    data: CreateCareRequest,
  ): Promise<CareRequestResult> {
    const contract = await db.contract.findUnique({
      where: { id: contractId },
      include: { crop: true },
    });

    if (!contract) {
      throw AppError.notFound("Không tìm thấy hợp đồng");
    }

    if (contract.userId !== customerId) {
      throw AppError.forbidden(
        ERROR_MESSAGES.CARE.CONTRACT_ACCESS_FORBIDDEN,
        ERROR_CODES.CONTRACT_ACCESS_FORBIDDEN,
      );
    }

    if (contract.status !== "ACTIVE") {
      throw AppError.badRequest(
        ERROR_MESSAGES.DIARY.CONTRACT_NOT_ACTIVE,
        ERROR_CODES.CONTRACT_NOT_ACTIVE,
      );
    }

    const existingPending = await db.careRequest.findFirst({
      where: { contractId, status: "PENDING" },
    });

    if (existingPending) {
      throw AppError.badRequest(
        ERROR_MESSAGES.CARE.EXISTING_PENDING_REQUEST,
        ERROR_CODES.EXISTING_PENDING_REQUEST,
      );
    }

    const careQuota = getCareQuota(contract.crop);

    const usedCareCount = await db.careRequest.count({
      where: { contractId, status: "VERIFIED" },
    });

    const isWithinQuota = usedCareCount < careQuota;
    const extraFee = isWithinQuota ? 0 : DEFAULT_EXTRA_FEE;
    const isFeePaid = isWithinQuota;

    const careRequest = await db.careRequest.create({
      data: {
        contractId: contract.id,
        serviceTitleI18n: data.serviceTitleI18n,
        customerNote: data.customerNote,
        extraFee,
        isFeePaid,
        status: "PENDING",
      },
    });

    return {
      id: careRequest.id,
      contractId: contract.id,
      serviceTitleI18n: data.serviceTitleI18n,
      customerNote: careRequest.customerNote,
      careQuota,
      usedCareCount,
      extraFee: Number(careRequest.extraFee),
      isFeePaid: careRequest.isFeePaid,
      status: careRequest.status,
      createdAt: careRequest.createdAt.toISOString(),
    };
  }

  static async getCareRequests(
    contractId: string,
    requester: { userId: string; role: string },
  ): Promise<CareRequestResult[]> {
    const contract = await db.contract.findUnique({
      where: { id: contractId },
      include: { crop: true },
    });

    if (!contract) {
      throw AppError.notFound("Không tìm thấy hợp đồng");
    }

    const isOwner = contract.userId === requester.userId;
    const isStaffOrAdmin =
      requester.role === "STAFF" || requester.role === "ADMIN";
    if (!isOwner && !isStaffOrAdmin) {
      throw AppError.forbidden(
        ERROR_MESSAGES.CARE.CONTRACT_ACCESS_FORBIDDEN,
        ERROR_CODES.CONTRACT_ACCESS_FORBIDDEN,
      );
    }

    const careQuota = getCareQuota(contract.crop);
    const requests = await db.careRequest.findMany({
      where: { contractId },
      orderBy: { createdAt: "desc" },
    });

    const usedCareCount = requests.filter(
      (r) => r.status === "VERIFIED",
    ).length;

    return requests.map((r) => ({
      id: r.id,
      contractId: contract.id,
      serviceTitleI18n: r.serviceTitleI18n as { vi: string; en?: string },
      customerNote: r.customerNote,
      careQuota,
      usedCareCount,
      extraFee: Number(r.extraFee),
      isFeePaid: r.isFeePaid,
      status: r.status,
      createdAt: r.createdAt.toISOString(),
    }));
  }
}
