import { z } from "zod";

export const CreateContractSchema = z.object({
  plotId: z.string({ required_error: "plotId là bắt buộc" }).min(1, "plotId không được để trống"),
  cropId: z.string({ required_error: "cropId là bắt buộc" }).min(1, "cropId không được để trống"),
  startDate: z.string({ required_error: "startDate là bắt buộc" }).regex(/^\d{4}-\d{2}-\d{2}$/, "startDate phải theo định dạng YYYY-MM-DD"),
});

export type CreateContractInput = z.infer<typeof CreateContractSchema>;
