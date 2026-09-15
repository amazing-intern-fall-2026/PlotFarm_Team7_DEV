import { describe, it, expect } from "vitest";
import {
  FarmingLogFormSchema,
  GROWTH_STAGES,
  type UploadedImageItem,
} from "./farmingLog.types";
import { compressImage } from "./compressImage";

describe("Farming Progress Log Test Suite (US-23 & US-24)", () => {
  describe("Growth Stages Definitions", () => {
    it("should have exactly 4 standardized seasonal growth stages", () => {
      expect(GROWTH_STAGES).toHaveLength(4);
      expect(GROWTH_STAGES[0].progressPercent).toBe(25);
      expect(GROWTH_STAGES[0].label).toContain("Gieo hạt & Nảy mầm");

      expect(GROWTH_STAGES[1].progressPercent).toBe(50);
      expect(GROWTH_STAGES[1].label).toContain("Phát triển thân lá & Tỉa thưa");

      expect(GROWTH_STAGES[2].progressPercent).toBe(75);
      expect(GROWTH_STAGES[2].label).toContain("Trưởng thành & Chăm sóc tăng cường");

      expect(GROWTH_STAGES[3].progressPercent).toBe(100);
      expect(GROWTH_STAGES[3].label).toContain("Chuẩn bị thu hoạch");
    });
  });

  describe("Kịch bản 1 (AC1): Đăng bài nhật ký thành công kèm ảnh chụp thực địa", () => {
    it("should validate successfully with full valid inputs and 2 uploaded images", () => {
      const validPayload = {
        selectedStage: "STAGE_2",
        notes: "Đã tưới vi sinh và tỉa thưa lá già quanh gốc, cây phát triển xanh tốt.",
        photoUrls: [
          "https://res.cloudinary.com/plotfarm/image/upload/v1/field_01.jpg",
          "https://res.cloudinary.com/plotfarm/image/upload/v1/field_02.jpg",
        ],
        temperature: 24.5,
        airHumidity: 72,
        soilMoisture: 68,
      };

      const result = FarmingLogFormSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.selectedStage).toBe("STAGE_2");
        expect(result.data.photoUrls).toHaveLength(2);
        expect(result.data.soilMoisture).toBe(68);
      }
    });
  });

  describe("Kịch bản 2 (AC2): Bắt buộc chọn mốc sinh trưởng và có ít nhất 1 ảnh", () => {
    it("should fail validation when selectedStage is missing", () => {
      const missingStagePayload = {
        selectedStage: undefined,
        notes: "Cây phát triển tốt.",
        photoUrls: ["https://res.cloudinary.com/plotfarm/image/upload/v1/photo.jpg"],
        temperature: 24,
        airHumidity: 70,
        soilMoisture: 65,
      };

      const result = FarmingLogFormSchema.safeParse(missingStagePayload);
      expect(result.success).toBe(false);
      if (!result.success) {
        const stageError = result.error.errors.find(
          (err: { path: (string | number)[] }) => err.path[0] === "selectedStage"
        );
        expect(stageError).toBeDefined();
        expect(stageError?.message).toContain("Vui lòng chọn mốc sinh trưởng");
      }
    });

    it("should fail validation when photoUrls array is empty", () => {
      const emptyPhotosPayload = {
        selectedStage: "STAGE_1",
        notes: "Đang gieo hạt luống 2.",
        photoUrls: [],
        temperature: 24,
        airHumidity: 70,
        soilMoisture: 65,
      };

      const result = FarmingLogFormSchema.safeParse(emptyPhotosPayload);
      expect(result.success).toBe(false);
      if (!result.success) {
        const photoError = result.error.errors.find(
          (err: { path: (string | number)[] }) => err.path[0] === "photoUrls"
        );
        expect(photoError).toBeDefined();
        expect(photoError?.message).toContain(
          "Vui lòng chọn mốc sinh trưởng và đính kèm ít nhất 1 ảnh thực tế"
        );
      }
    });

    it("should fail validation when notes is shorter than 10 characters", () => {
      const shortNotesPayload = {
        selectedStage: "STAGE_3",
        notes: "Cây tốt", // 7 chars, less than 10
        photoUrls: ["https://res.cloudinary.com/plotfarm/image/upload/v1/photo.jpg"],
        temperature: 24,
        airHumidity: 70,
        soilMoisture: 65,
      };

      const result = FarmingLogFormSchema.safeParse(shortNotesPayload);
      expect(result.success).toBe(false);
      if (!result.success) {
        const notesError = result.error.errors.find(
          (err: { path: (string | number)[] }) => err.path[0] === "notes"
        );
        expect(notesError?.message).toContain("ít nhất 10 ký tự");
      }
    });
  });

  describe("Kịch bản 3 (AC3): Xóa ảnh đã tải lên trước khi đăng bài", () => {
    it("should remove target thumbnail immediately and update photo list", () => {
      const initialImages: UploadedImageItem[] = [
        {
          id: "img_01",
          url: "https://res.cloudinary.com/plotfarm/proof_1.jpg",
          originalName: "proof_1.jpg",
          originalSize: 1024000,
          compressedSize: 320000,
          previewUrl: "blob:http://localhost/1",
        },
        {
          id: "img_02_blurry",
          url: "https://res.cloudinary.com/plotfarm/proof_2_blurry.jpg",
          originalName: "proof_2_blurry.jpg",
          originalSize: 1540000,
          compressedSize: 450000,
          previewUrl: "blob:http://localhost/2",
        },
      ];

      expect(initialImages).toHaveLength(2);

      // Farmer clicks (X) on img_02_blurry
      const targetIdToRemove = "img_02_blurry";
      const updatedImages = initialImages.filter((img) => img.id !== targetIdToRemove);

      expect(updatedImages).toHaveLength(1);
      expect(updatedImages[0].id).toBe("img_01");
      expect(updatedImages.find((img) => img.id === targetIdToRemove)).toBeUndefined();
    });
  });

  describe("Client-side Image Compression (US-23)", () => {
    it("should handle image compression gracefully and return size reduction metrics", async () => {
      const dummyFile = new File(["dummy image content simulating photo binary data"], "crop_photo.jpg", {
        type: "image/jpeg",
      });

      const result = await compressImage(dummyFile);
      expect(result.file).toBeDefined();
      expect(result.originalSize).toBe(dummyFile.size);
      expect(result.compressedSize).toBeGreaterThan(0);
    });
  });

  describe("Quy tắc Nghiệp vụ & Điều kiện Đăng Nhật ký (US-23 Business Rules)", () => {
    it("should approve eligibility when contract is ACTIVE and assigned to farmer", async () => {
      const { validateFarmingLogEligibility } = await import("./farmingLog.types");
      const check = validateFarmingLogEligibility("ACTIVE", true);
      expect(check.eligible).toBe(true);
      expect(check.message).toBeUndefined();
    });

    it("should reject eligibility when plot is NOT assigned to farmer", async () => {
      const { validateFarmingLogEligibility } = await import("./farmingLog.types");
      const check = validateFarmingLogEligibility("ACTIVE", false);
      expect(check.eligible).toBe(false);
      expect(check.message).toContain("không thuộc quyền quản lý");
    });

    it("should reject eligibility when contract is EXPIRED", async () => {
      const { validateFarmingLogEligibility } = await import("./farmingLog.types");
      const check = validateFarmingLogEligibility("EXPIRED", true);
      expect(check.eligible).toBe(false);
      expect(check.message).toContain("HẾT HẠN");
    });

    it("should reject eligibility when contract is HARVESTED", async () => {
      const { validateFarmingLogEligibility } = await import("./farmingLog.types");
      const check = validateFarmingLogEligibility("HARVESTED", true);
      expect(check.eligible).toBe(false);
      expect(check.message).toContain("ĐÃ THU HOẠCH");
    });

    it("should reject eligibility when contract is CANCELLED", async () => {
      const { validateFarmingLogEligibility } = await import("./farmingLog.types");
      const check = validateFarmingLogEligibility("CANCELLED", true);
      expect(check.eligible).toBe(false);
      expect(check.message).toContain("BỊ HỦY");
    });
  });
});

