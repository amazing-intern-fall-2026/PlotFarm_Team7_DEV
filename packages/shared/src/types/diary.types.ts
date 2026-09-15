import { z } from "zod";

export const SensorSnapshotSchema = z.object({
  temperature: z.number(),
  humidity: z.number(),
  soilMoisture: z.number(),
});
export type SensorSnapshot = z.infer<typeof SensorSnapshotSchema>;

export const GROWTH_STAGE_IDS = [
  "STAGE_1",
  "STAGE_2",
  "STAGE_3",
  "STAGE_4",
] as const;
export type GrowthStageId = (typeof GROWTH_STAGE_IDS)[number];

export interface GrowthStageDefinition {
  id: GrowthStageId;
  label: string;
  progressPercent: number;
  description: string;
}

export const GROWTH_STAGES: readonly GrowthStageDefinition[] = [
  {
    id: "STAGE_1",
    label: "Gieo hạt & Nảy mầm",
    progressPercent: 25,
    description: "Hạt giống nảy mầm, mầm non nhú đều và rễ non bám đất tốt.",
  },
  {
    id: "STAGE_2",
    label: "Phát triển thân lá & Tỉa thưa",
    progressPercent: 50,
    description: "Cây bung tán lá thật, tỉa thưa định hình mật độ và tưới vi sinh kích rễ.",
  },
  {
    id: "STAGE_3",
    label: "Trưởng thành & Chăm sóc tăng cường",
    progressPercent: 75,
    description: "Tán lá phủ kín luống, kiểm soát sâu bọ sinh học và bổ sung dinh dưỡng hữu cơ.",
  },
  {
    id: "STAGE_4",
    label: "Chuẩn bị thu hoạch",
    progressPercent: 100,
    description: "Rau đạt kích thước và trọng lượng chuẩn VietGAP, sẵn sàng đóng gói giao khách.",
  },
] as const;

export const FarmingLogSchema = z.object({
  logCode: z.string(),
  contractCode: z.string(),
  authorStaff: z.object({
    userCode: z.string(),
    fullName: z.string(),
  }),
  actionType: z.string(),
  title: z.string(),
  description: z.string(),
  growthStage: z.enum(GROWTH_STAGE_IDS).optional(),
  progressPercent: z.number().optional(),
  photoUrls: z.array(z.string()),
  sensorSnapshot: SensorSnapshotSchema,
  isAmended: z.boolean(),
  createdAt: z.string(),
});
export type FarmingLog = z.infer<typeof FarmingLogSchema>;

export const CreateFarmingLogRequestSchema = z.object({
  actionType: z.string().default("LOG_GROWTH"),
  title: z.string().optional(),
  description: z.string(),
  growthStage: z.enum(GROWTH_STAGE_IDS).optional(),
  progressPercent: z.number().optional(),
  photoUrls: z.array(z.string()).min(1, "Vui lòng chọn mốc sinh trưởng và đính kèm ít nhất 1 ảnh thực tế"),
  sensorSnapshot: SensorSnapshotSchema.optional(),
});
export type CreateFarmingLogRequest = z.infer<
  typeof CreateFarmingLogRequestSchema
>;

export const AmendFarmingLogRequestSchema = z.object({
  replacesLogCode: z.string(),
  amendmentReason: z.string(),
  actionType: z.string(),
  title: z.string(),
  description: z.string(),
  photoUrls: z.array(z.string().url()).optional(),
});
export type AmendFarmingLogRequest = z.infer<
  typeof AmendFarmingLogRequestSchema
>;

export const FarmingLogReviewRequestSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string(),
  isFraudSuspected: z.boolean(),
  fraudReason: z.string().optional(),
});
export type FarmingLogReviewRequest = z.infer<
  typeof FarmingLogReviewRequestSchema
>;

export const CARE_REQUEST_STATUSES = [
  "PENDING",
  "ASSIGNED",
  "IN_PROGRESS",
  "VERIFIED",
  "REJECTED",
] as const;
export type CareRequestStatus = (typeof CARE_REQUEST_STATUSES)[number];

export const CreateCareRequestSchema = z.object({
  serviceType: z.string(),
  customerNote: z.string().optional(),
});
export type CreateCareRequest = z.infer<typeof CreateCareRequestSchema>;

export const CareRequestSchema = z.object({
  requestCode: z.string(),
  contractCode: z.string(),
  serviceType: z.string(),
  status: z.enum(CARE_REQUEST_STATUSES),
  extraFee: z.number(),
  staffResponse: z.string().nullable().optional(),
  proofImages: z.array(z.string().url()).optional(),
  completedAt: z.string().nullable().optional(),
});
export type CareRequest = z.infer<typeof CareRequestSchema>;

export const UpdateCareRequestStatusSchema = z.object({
  status: z.enum(CARE_REQUEST_STATUSES),
  staffResponse: z.string().optional(),
  proofImages: z.array(z.string().url()).optional(),
});
export type UpdateCareRequestStatus = z.infer<
  typeof UpdateCareRequestStatusSchema
>;
