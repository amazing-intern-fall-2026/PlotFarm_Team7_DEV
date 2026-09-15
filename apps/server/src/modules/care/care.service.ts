import { CareRequestSchema, type CareRequest } from "@repo/shared";

export function createMockCareRequest(
  contractCode: string,
  serviceType: string,
): CareRequest {
  const mockRequest: CareRequest = {
    requestCode: `REQ-2026-${Math.floor(Math.random() * 9000 + 1000)}`,
    contractCode,
    serviceType,
    status: "PENDING",
    extraFee: 150000,
    staffResponse: null,
  };

  const result = CareRequestSchema.safeParse(mockRequest);
  if (!result.success) {
    throw new Error(
      `Mock care request does not match CareRequestSchema: ${result.error.message}`,
    );
  }
  return result.data;
}
