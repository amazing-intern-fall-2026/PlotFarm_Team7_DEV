import { db } from "@repo/database";
import { ERROR_CODES } from "@repo/shared";
import { AppError } from "../../errors/AppError";
import type { CreateContractInput } from "./contracts.schema";

let contractSeq = Math.floor(Math.random() * 9000) + 1000;

export function generateContractCode(startDateStr?: string): string {
  const datePart = (startDateStr || new Date().toISOString().split("T")[0]).replace(/-/g, "");
  contractSeq = ((contractSeq + 1) % 9000) + 1000;
  const suffix = String(contractSeq).padStart(4, "0");
  return `HD-${datePart}-${suffix}`;
}

export class ContractsService {
  static async createContract(userId: string, input: CreateContractInput) {
    const plot = await db.plot.findUnique({
      where: { id: input.plotId },
    });

    if (!plot || plot.deletedAt !== null) {
      throw AppError.notFound("Không tìm thấy ô đất hoặc giống rau hợp lệ");
    }

    const crop = await db.crop.findUnique({
      where: { id: input.cropId },
    });

    if (!crop || crop.deletedAt !== null || crop.isActive === false) {
      throw AppError.notFound("Không tìm thấy ô đất hoặc giống rau hợp lệ");
    }

    const now = new Date();
    const isLockedByUser = plot.lockedByUserId === userId;
    const isLockActive = plot.lockedUntil ? new Date(plot.lockedUntil) > now : false;

    if (!isLockedByUser || !isLockActive) {
      throw AppError.badRequest(
        "Người dùng chưa giữ chỗ ô đất này",
        ERROR_CODES.LOCK_REQUIRED
      );
    }

    const durationDays = crop.durationDays;
    const startDate = new Date(`${input.startDate}T00:00:00.000Z`);

    const expectedHarvestDate = new Date(startDate);
    expectedHarvestDate.setUTCDate(expectedHarvestDate.getUTCDate() + durationDays);
    const expectedHarvestDateStr = expectedHarvestDate.toISOString().split("T")[0];

    const pricePerMonth = Number(plot.pricePerMonth || 0);
    const plotPriceSnapshot = Math.round((pricePerMonth / 30) * durationDays);
    const cropPriceSnapshot = Number(crop.basePrice || 0);

    const subtotal = plotPriceSnapshot + cropPriceSnapshot;
    const totalPrice = subtotal;

    const contractCode = generateContractCode(input.startDate);

    const contract = await db.$transaction(async (tx) => {
      return tx.contract.create({
        data: {
          contractCode,
          userId,
          plotId: plot.id,
          cropId: crop.id,
          startDate,
          expectedHarvestDate,
          cropPriceSnapshot,
          plotPriceSnapshot,
          subtotal,
          totalPrice,
          status: "PENDING_PAYMENT",
        },
      });
    });

    return {
      id: contract.id,
      contractCode: contract.contractCode,
      userId: contract.userId,
      plotId: contract.plotId,
      cropId: contract.cropId,
      durationDays,
      startDate: input.startDate,
      expectedHarvestDate: expectedHarvestDateStr,
      plotPriceSnapshot,
      cropPriceSnapshot,
      subtotal,
      totalPrice,
      status: contract.status,
    };
  }
}
