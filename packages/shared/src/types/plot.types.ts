import { z } from "zod";

export const PLOT_STATUSES = [
  "AVAILABLE",
  "RESERVED",
  "OCCUPIED",
  "HARVESTING",
  "MAINTENANCE",
  "INACTIVE",
] as const;
export type PlotStatus = (typeof PLOT_STATUSES)[number];

export const PlotSchema = z.object({
  plotCode: z.string(),
  plotNumber: z.string(),
  areaSquareMeters: z.number(),
  status: z.enum(PLOT_STATUSES),
  pricePerMonth: z.number(),
  soilType: z.string().nullable().optional(),
  iotSensorInstalled: z.boolean(),
  cameraSupported: z.boolean(),
});
export type Plot = z.infer<typeof PlotSchema>;

export const LockPlotResponseDataSchema = z.object({
  plotCode: z.string(),
  status: z.enum(PLOT_STATUSES),
  reservedUntil: z.string(),
  remainingSeconds: z.number(),
});
export type LockPlotResponseData = z.infer<typeof LockPlotResponseDataSchema>;

export const AssignStaffRequestSchema = z.object({
  staffUserCode: z.string(),
  notes: z.string().optional(),
});
export type AssignStaffRequest = z.infer<typeof AssignStaffRequestSchema>;

export const PlotsQuerySchema = z.object({
  farmId: z.string().uuid("farmId phải là UUID hợp lệ").optional(),
  status: z.enum(["AVAILABLE", "OCCUPIED", "MAINTENANCE", "RESERVED"]).optional(),
  page: z.coerce.number().int("page phải là số nguyên").min(1, "page phải lớn hơn hoặc bằng 1").default(1),
  limit: z.coerce.number().int("limit phải là số nguyên").min(1, "limit phải lớn hơn hoặc bằng 1").max(100, "limit không vượt quá 100").default(20),
});
export type PlotsQuery = z.infer<typeof PlotsQuerySchema>;

export const PlotDetailParamsSchema = z.object({
  id: z.string().min(1, "ID hoặc mã ô đất không hợp lệ"),
});
export type PlotDetailParams = z.infer<typeof PlotDetailParamsSchema>;

export const HoldPlotResponseSchema = z.object({
  plotId: z.string(),
  lockedUntil: z.string(),
  expiresInSeconds: z.number(),
});
export type HoldPlotResponse = z.infer<typeof HoldPlotResponseSchema>;

export const ReleaseHoldResponseSchema = z.object({
  unlocked: z.boolean(),
});
export type ReleaseHoldResponse = z.infer<typeof ReleaseHoldResponseSchema>;

