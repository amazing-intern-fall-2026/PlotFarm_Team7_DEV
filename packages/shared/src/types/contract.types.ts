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

export const CreateContractSchema = z.object({
  plotId: z.string({ required_error: "plotId là bắt buộc" }).min(1, "plotId không được để trống"),
  cropId: z.string({ required_error: "cropId là bắt buộc" }).min(1, "cropId không được để trống"),
  startDate: z.string({ required_error: "startDate là bắt buộc" }).regex(/^\d{4}-\d{2}-\d{2}$/, "startDate phải theo định dạng YYYY-MM-DD"),
});
export type CreateContractInput = z.infer<typeof CreateContractSchema>;

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
