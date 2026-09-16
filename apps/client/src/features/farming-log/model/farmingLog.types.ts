import { z, GROWTH_STAGE_IDS } from "@repo/shared";

export { GROWTH_STAGES, type GrowthStageId, type GrowthStageDefinition } from "@repo/shared";

export const FarmingLogFormSchema = z.object({
  selectedStage: z.enum(GROWTH_STAGE_IDS, {
    errorMap: () => ({ message: "Vui lòng chọn mốc sinh trưởng của cây trồng." }),
  }),
  notes: z
    .string()
    .min(10, "Ghi chú hiện trạng cây trồng phải có ít nhất 10 ký tự.")
    .max(1000, "Ghi chú không được vượt quá 1000 ký tự."),
  photoUrls: z
    .array(z.string())
    .min(1, "Vui lòng chọn mốc sinh trưởng và đính kèm ít nhất 1 ảnh thực tế."),
  temperature: z.number().min(0, "Nhiệt độ không hợp lệ").max(50, "Nhiệt độ tối đa 50°C"),
  airHumidity: z.number().min(0, "Độ ẩm từ 0-100%").max(100, "Độ ẩm từ 0-100%"),
  soilMoisture: z.number().min(0, "Độ ẩm đất từ 0-100%").max(100, "Độ ẩm đất từ 0-100%"),
});

export type FarmingLogFormData = z.infer<typeof FarmingLogFormSchema>;

export type ContractStatus = "ACTIVE" | "EXPIRED" | "HARVESTED" | "CANCELLED";

export interface UploadedImageItem {
  id: string;
  url: string;
  originalName: string;
  originalSize: number;
  compressedSize: number;
  previewUrl: string;
}

export interface FarmingLogDraft {
  contractId: string;
  selectedStage?: string;
  notes: string;
  uploadedImages: UploadedImageItem[];
  temperature: number;
  airHumidity: number;
  soilMoisture: number;
  savedAt: string;
}

export function validateFarmingLogEligibility(
  contractStatus: ContractStatus = "ACTIVE",
  isAssignedToFarmer = true
): { eligible: boolean; message?: string } {
  if (!isAssignedToFarmer) {
    return {
      eligible: false,
      message: "Ô đất này không thuộc quyền quản lý phân công của bạn. Bạn không thể đăng nhật ký.",
    };
  }
  if (contractStatus === "EXPIRED") {
    return {
      eligible: false,
      message: "Hợp đồng đã HẾT HẠN (EXPIRED). Nông dân chỉ được quyền đăng nhật ký cho các hợp đồng đang ở trạng thái ACTIVE.",
    };
  }
  if (contractStatus === "HARVESTED") {
    return {
      eligible: false,
      message: "Vụ mùa đã ĐÃ THU HOẠCH (HARVESTED). Không thể tiếp tục cập nhật tiến độ sinh trưởng.",
    };
  }
  if (contractStatus === "CANCELLED") {
    return {
      eligible: false,
      message: "Hợp đồng đã BỊ HỦY (CANCELLED). Không thể đăng nhật ký canh tác.",
    };
  }
  return { eligible: true };
}
