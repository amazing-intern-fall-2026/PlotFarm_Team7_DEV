import { z } from "zod";

export const FarmListItemSchema = z.object({
  farmCode: z.string(),
  farmSlug: z.string(),
  name: z.string(),
  province: z.string(),
  address: z.string(),
  totalPlots: z.number(),
  availablePlots: z.number(),
  imageUrl: z.string().url().optional(),
});
export type FarmListItem = z.infer<typeof FarmListItemSchema>;

export const FarmCameraSchema = z.object({
  cameraCode: z.string(),
  name: z.string(),
  hlsUrl: z.string().url(),
});
export type FarmCamera = z.infer<typeof FarmCameraSchema>;

export const FarmDetailSchema = z.object({
  farmCode: z.string(),
  farmSlug: z.string(),
  name: z.string(),
  description: z.string().optional(),
  province: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  totalPlots: z.number(),
  availablePlots: z.number(),
  cameras: z.array(FarmCameraSchema).optional(),
});
export type FarmDetail = z.infer<typeof FarmDetailSchema>;

export const CreateFarmRequestSchema = z.object({
  farmCode: z.string(),
  farmSlug: z.string(),
  name: z.string(),
  description: z.string().optional(),
  province: z.string(),
  address: z.string(),
  totalPlots: z.number(),
  latitude: z.number(),
  longitude: z.number(),
});
export type CreateFarmRequest = z.infer<typeof CreateFarmRequestSchema>;
