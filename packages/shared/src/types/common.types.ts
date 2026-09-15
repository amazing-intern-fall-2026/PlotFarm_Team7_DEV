import { z } from "zod";

export const RateLimitSchema = z.object({
  limit: z.number(),
  remaining: z.number(),
  resetInSeconds: z.number(),
  isSpamWarning: z.boolean(),
});
export type RateLimit = z.infer<typeof RateLimitSchema>;

export const MetaSchema = z.object({
  correlationId: z.string(),
  traceId: z.string(),
  userCode: z.string(),
  timestamp: z.string(),
  rateLimit: RateLimitSchema,
});
export type Meta = z.infer<typeof MetaSchema>;

export const PaginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});
export type Pagination = z.infer<typeof PaginationSchema>;

export const ErrorDetailSchema = z.object({
  code: z.string(),
  message: z.string(),
  field: z.string().optional(),
});
export type ErrorDetail = z.infer<typeof ErrorDetailSchema>;

export const ApiErrorDetailSchema = z
  .object({
    field: z.string().optional(),
    message: z.string().optional(),
    code: z.string().optional(),
  })
  .passthrough();
export type ApiErrorDetail = z.infer<typeof ApiErrorDetailSchema>;

export const ApiErrorPayloadSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.array(ApiErrorDetailSchema),
});
export type ApiErrorPayload = z.infer<typeof ApiErrorPayloadSchema>;

export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  error: ApiErrorPayloadSchema,
});
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  code?: number;
  message?: string;
  meta?: Meta;
  data: T;
  pagination?: Pagination;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

