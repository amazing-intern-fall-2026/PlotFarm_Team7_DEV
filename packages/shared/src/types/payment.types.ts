import { z } from "zod";

export const TRANSACTION_STATUSES = [
  "PENDING",
  "SUCCESS",
  "FAILED",
  "EXPIRED",
  "REFUNDED",
  "PARTIALLY_REFUNDED",
] as const;
export type PaymentStatus = (typeof TRANSACTION_STATUSES)[number];

export const CreatePaymentQrRequestSchema = z.object({
  contractId: z.string().uuid(),
});
export type CreatePaymentQrRequest = z.infer<
  typeof CreatePaymentQrRequestSchema
>;

export const VietQRPaymentSchema = z.object({
  orderCode: z.string(),
  contractCode: z.string(),
  amountVnd: z.number(),
  qrContent: z.string(),
  qrImage: z.string().url(),
  beneficiaryAccount: z.string(),
  beneficiaryBank: z.string(),
  transferContent: z.string(),
  expiresAt: z.string(),
});
export type VietQRPayment = z.infer<typeof VietQRPaymentSchema>;
