import { z } from "zod";

export const CropStageSchema = z.object({
  stageOrder: z.number(),
  stageName: z.string(),
  durationDays: z.number(),
});
export type CropStage = z.infer<typeof CropStageSchema>;

export const CropSchema = z.object({
  cropCode: z.string(),
  cropSlug: z.string(),
  name: z.string(),
  description: z.string(),
  growthDurationDays: z.number(),
  expectedYieldKg: z.number(),
  basePricePerPlot: z.number(),
  carePackageFeePerMonth: z.number(),
  riskMitigationCommitment: z.string().optional(),
  thumbnailUrl: z.string().url().optional(),
  stages: z.array(CropStageSchema).optional(),
});
export type Crop = z.infer<typeof CropSchema>;

export const CreateCropRequestSchema = CropSchema.pick({
  cropCode: true,
  cropSlug: true,
  name: true,
  description: true,
  growthDurationDays: true,
});
export type CreateCropRequest = z.infer<typeof CreateCropRequestSchema>;
