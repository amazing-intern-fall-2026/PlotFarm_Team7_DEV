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
export const WebhookRequestSchema = z.object({
  gatewayReference: z.string().min(1),
  transferAmount: z.number().positive(),
  transferContent: z.string().min(1),
  senderBankCode: z.string().optional(),
  senderAccountNo: z.string().optional(),
  senderAccountName: z.string().optional(),
  idempotencyKey: z.string().min(1),
});
export type WebhookRequest = z.infer<typeof WebhookRequestSchema>;

export const MockWebhookRequestSchema = z.object({
  orderCode: z.string().min(1),
});
export type MockWebhookRequest = z.infer<typeof MockWebhookRequestSchema>;
