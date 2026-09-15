import { describe, it, expect } from "vitest";
import {
  UserSchema,
  PlotSchema,
  CropSchema,
  ContractListItemSchema,
  CareRequestSchema,
  ShipmentSchema,
  FarmListItemSchema,
  VietQRPaymentSchema,
} from "./index";

describe("auth.types - UserSchema", () => {
  it("accepts a valid user", () => {
    const result = UserSchema.safeParse({
      userCode: "USR-CUST-2026-0001",
      email: "customer@example.com",
      fullName: "Nguyễn Văn An",
      role: "CUSTOMER",
      isVerified: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a role outside CUSTOMER/STAFF/ADMIN", () => {
    const result = UserSchema.safeParse({
      userCode: "USR-CUST-2026-0001",
      email: "customer@example.com",
      fullName: "Nguyễn Văn An",
      role: "MANAGER",
      isVerified: true,
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = UserSchema.safeParse({
      userCode: "USR-CUST-2026-0001",
      email: "not-an-email",
      fullName: "Nguyễn Văn An",
      role: "CUSTOMER",
      isVerified: true,
    });
    expect(result.success).toBe(false);
  });
});

describe("plot.types - PlotSchema", () => {
  it("accepts a valid plot", () => {
    const result = PlotSchema.safeParse({
      plotCode: "PLT-A01",
      plotNumber: "Plot A-01",
      areaSquareMeters: 50,
      status: "AVAILABLE",
      pricePerMonth: 1000000,
      soilType: "Đất đỏ Bazan Lâm Đồng",
      iotSensorInstalled: true,
      cameraSupported: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a status not in PLOT_STATUSES", () => {
    const result = PlotSchema.safeParse({
      plotCode: "PLT-A01",
      plotNumber: "Plot A-01",
      areaSquareMeters: 50,
      status: "RENTED",
      pricePerMonth: 1000000,
      iotSensorInstalled: true,
      cameraSupported: true,
    });
    expect(result.success).toBe(false);
  });
});

describe("crop.types - CropSchema", () => {
  it("accepts a valid crop", () => {
    const result = CropSchema.safeParse({
      cropCode: "CRP-TOMATO-01",
      cropSlug: "ca-chua-cherry",
      name: "Cà chua Cherry Đà Lạt",
      description: "Vị ngọt thanh, giòn rụm.",
      growthDurationDays: 75,
      expectedYieldKg: 20,
      basePricePerPlot: 1500000,
      carePackageFeePerMonth: 400000,
    });
    expect(result.success).toBe(true);
  });
});

describe("contract.types - ContractListItemSchema", () => {
  it("accepts a valid contract list item", () => {
    const result = ContractListItemSchema.safeParse({
      contractCode: "PF-2026-0915-A01",
      plotCode: "PLT-A01",
      plotNumber: "Plot A-01",
      farmSlug: "da-lat-green",
      cropCode: "CRP-TOMATO-01",
      cropName: "Cà chua Cherry Đà Lạt",
      status: "ACTIVE",
      startDate: "2026-09-15",
      expectedHarvestDate: "2026-11-29",
      totalAmount: 2650000,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a status not in CONTRACT_STATUSES", () => {
    const result = ContractListItemSchema.safeParse({
      contractCode: "PF-2026-0915-A01",
      plotCode: "PLT-A01",
      plotNumber: "Plot A-01",
      farmSlug: "da-lat-green",
      cropCode: "CRP-TOMATO-01",
      cropName: "Cà chua Cherry Đà Lạt",
      status: "PAID",
      startDate: "2026-09-15",
      expectedHarvestDate: "2026-11-29",
      totalAmount: 2650000,
    });
    expect(result.success).toBe(false);
  });
});

describe("diary.types - CareRequestSchema", () => {
  it("accepts a valid care request", () => {
    const result = CareRequestSchema.safeParse({
      requestCode: "REQ-2026-0089",
      contractCode: "PF-2026-0915-A01",
      serviceType: "ORGANIC_FERTILIZER",
      status: "PENDING",
      extraFee: 150000,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a status not in CARE_REQUEST_STATUSES", () => {
    const result = CareRequestSchema.safeParse({
      requestCode: "REQ-2026-0089",
      contractCode: "PF-2026-0915-A01",
      serviceType: "ORGANIC_FERTILIZER",
      status: "DONE",
      extraFee: 150000,
    });
    expect(result.success).toBe(false);
  });
});

describe("shipment.types - ShipmentSchema", () => {
  it("accepts a valid shipment", () => {
    const result = ShipmentSchema.safeParse({
      trackingCode: "GHN-PF2026-881923",
      carrierCode: "GHN",
      carrierName: "Giao Hàng Nhanh",
      status: "IN_TRANSIT",
      receiverName: "Nguyễn Văn An",
      receiverPhone: "0987654321",
      destination: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
      history: [
        { status: "PICKED_UP", location: "Kho Đà Lạt", timestamp: "2026-11-29T10:00:00.000Z" },
      ],
    });
    expect(result.success).toBe(true);
  });
});

describe("farm.types - FarmListItemSchema", () => {
  it("accepts a valid farm list item", () => {
    const result = FarmListItemSchema.safeParse({
      farmCode: "FRM-DALAT-01",
      farmSlug: "da-lat-green",
      name: "Nông trại Xanh Đà Lạt",
      province: "Lâm Đồng",
      address: "Thung Lũng Tình Yêu, TP. Đà Lạt",
      totalPlots: 50,
      availablePlots: 12,
    });
    expect(result.success).toBe(true);
  });
});

describe("payment.types - VietQRPaymentSchema", () => {
  it("accepts a valid VietQR payment order", () => {
    const result = VietQRPaymentSchema.safeParse({
      orderCode: "PAY-PF2026-0915-A01",
      contractCode: "PF-2026-0915-A01",
      amountVnd: 2650000,
      qrContent: "00020101021238580010A00000072701",
      qrImage: "https://api.vietqr.io/image/970422-0987654321-compact.jpg",
      beneficiaryAccount: "0987654321",
      beneficiaryBank: "MBBank",
      transferContent: "PAY-PF2026-0915-A01",
      expiresAt: "2026-09-10T04:38:00.000Z",
    });
    expect(result.success).toBe(true);
  });
});
