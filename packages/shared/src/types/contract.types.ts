import { z } from "zod";

export const CONTRACT_STATUSES = [
  "DRAFT",
  "PENDING_PAYMENT",
  "ACTIVE",
  "IN_HARVEST",
  "COMPLETED",
  "CANCELLED",
  "DISPUTED",
] as const;
export type ContractStatus = (typeof CONTRACT_STATUSES)[number];

export const BookingRequestSchema = z.object({
  plotCode: z.string(),
  cropCode: z.string(),
  rentalMonths: z.number(),
  startDate: z.string(),
  voucherCode: z.string().optional(),
});
export type BookingRequest = z.infer<typeof BookingRequestSchema>;

export const ContractListItemSchema = z.object({
  contractCode: z.string(),
  plotCode: z.string(),
  plotNumber: z.string(),
  farmSlug: z.string(),
  cropCode: z.string(),
  cropName: z.string(),
  status: z.enum(CONTRACT_STATUSES),
  startDate: z.string(),
  expectedHarvestDate: z.string(),
  totalAmount: z.number(),
  assignedStaff: z
    .object({ userCode: z.string(), fullName: z.string() })
    .nullable()
    .optional(),
});
export type ContractListItem = z.infer<typeof ContractListItemSchema>;

export const ContractFinancialsSchema = z.object({
  basePrice: z.number(),
  carePackageFee: z.number(),
  discountAmount: z.number(),
  totalAmount: z.number(),
  paymentStatus: z.string(),
});
export type ContractFinancials = z.infer<typeof ContractFinancialsSchema>;

export const ContractDetailSchema = z.object({
  contractCode: z.string(),
  plot: z.object({
    plotCode: z.string(),
    plotNumber: z.string(),
    farmName: z.string(),
    farmSlug: z.string(),
  }),
  crop: z.object({
    cropCode: z.string(),
    name: z.string(),
    expectedYieldKg: z.number(),
  }),
  customer: z.object({
    userCode: z.string(),
    fullName: z.string(),
    phone: z.string(),
  }),
  assignedStaff: z
    .object({ userCode: z.string(), fullName: z.string() })
    .nullable()
    .optional(),
  status: z.enum(CONTRACT_STATUSES),
  startDate: z.string(),
  expectedHarvestDate: z.string(),
  financials: ContractFinancialsSchema,
  deliveryAddress: z.string(),
});
export type ContractDetail = z.infer<typeof ContractDetailSchema>;
