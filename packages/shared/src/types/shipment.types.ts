import { z } from "zod";

export const SHIPMENT_STATUSES = [
  "PREPARING",
  "PICKED_UP",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "FAILED_DELIVERY",
  "RETURNED",
] as const;
export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[number];

export const CreateShipmentRequestSchema = z.object({
  carrierCode: z.string(),
  trackingCode: z.string(),
  receiverName: z.string(),
  receiverPhone: z.string(),
  receiverAddress: z.string(),
  totalWeightKg: z.number(),
});
export type CreateShipmentRequest = z.infer<typeof CreateShipmentRequestSchema>;

export const ShipmentHistoryEntrySchema = z.object({
  status: z.enum(SHIPMENT_STATUSES),
  location: z.string(),
  timestamp: z.string(),
});
export type ShipmentHistoryEntry = z.infer<typeof ShipmentHistoryEntrySchema>;

export const ShipmentSchema = z.object({
  trackingCode: z.string(),
  carrierCode: z.string(),
  carrierName: z.string(),
  status: z.enum(SHIPMENT_STATUSES),
  receiverName: z.string(),
  receiverPhone: z.string(),
  destination: z.string(),
  history: z.array(ShipmentHistoryEntrySchema),
});
export type Shipment = z.infer<typeof ShipmentSchema>;

export const CreateHarvestRequestSchema = z.object({
  harvestDate: z.string(),
  actualYieldKg: z.number(),
  qualityGrade: z.string(),
  proofPhotos: z.array(z.string().url()).optional(),
  notes: z.string().optional(),
});
export type CreateHarvestRequest = z.infer<typeof CreateHarvestRequestSchema>;

export const HarvestSchema = z.object({
  harvestCode: z.string(),
  contractCode: z.string(),
  actualYieldKg: z.number(),
  qualityGrade: z.string(),
});
export type Harvest = z.infer<typeof HarvestSchema>;
