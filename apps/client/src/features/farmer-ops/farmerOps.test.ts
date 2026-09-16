import { describe, it, expect } from "vitest";
import {
  checkHarvestWeight,
  stepHarvestWeight,
  INCIDENT_CATEGORIES,
  validateIncidentReport,
  filterHistoryItems,
  calculateHistoryKPI,
  type WorkHistoryItem,
  type IncidentCategory,
} from "./farmerOps";

describe("Farmer Operations Test Suite (Harvest, Incidents, Work History)", () => {
  // ─────────────────────────────────────────────────────────────
  // 1. HARVEST QUEUE & WEIGHT VALIDATION
  // ─────────────────────────────────────────────────────────────
  describe("1. Harvest Weight & Range Standard Check (16.0–20.0 kg)", () => {
    it("should accept 18.5 kg as within standard yield", () => {
      const result = checkHarvestWeight(18.5);
      expect(result.isStandard).toBe(true);
      expect(result.badgeVariant).toBe("success");
      expect(result.statusText).toContain("Đạt chuẩn");
    });

    it("should accept lower and upper boundary values (16.0 kg & 20.0 kg)", () => {
      const lower = checkHarvestWeight(16.0);
      expect(lower.isStandard).toBe(true);

      const upper = checkHarvestWeight(20.0);
      expect(upper.isStandard).toBe(true);
    });

    it("should flag weights below 16.0 kg or above 20.0 kg as warning", () => {
      const below = checkHarvestWeight(14.2);
      expect(below.isStandard).toBe(false);
      expect(below.badgeVariant).toBe("warning");
      expect(below.statusText).toContain("Dưới mức chuẩn");

      const above = checkHarvestWeight(22.8);
      expect(above.isStandard).toBe(false);
      expect(above.badgeVariant).toBe("warning");
      expect(above.statusText).toContain("Vượt mức chuẩn");
    });

    it("should step weight up and down cleanly with 0.5 kg increments without float precision errors", () => {
      let weight = 18.5;
      weight = stepHarvestWeight(weight, 0.5);
      expect(weight).toBe(19.0);

      weight = stepHarvestWeight(weight, -0.5);
      expect(weight).toBe(18.5);

      weight = stepHarvestWeight(weight, -0.5);
      expect(weight).toBe(18.0);
    });

    it("should not decrease weight below minimum allowed (1.0 kg)", () => {
      const weight = stepHarvestWeight(1.0, -0.5);
      expect(weight).toBe(1.0);
    });
  });

  // ─────────────────────────────────────────────────────────────
  // 2. INCIDENT REPORTING
  // ─────────────────────────────────────────────────────────────
  describe("2. Incident Reporting & Proposals", () => {
    it("should support exactly 4 standardized incident categories", () => {
      const categories = Object.keys(INCIDENT_CATEGORIES) as IncidentCategory[];
      expect(categories).toHaveLength(4);
      expect(categories).toEqual([
        "pest_fungus",
        "irrigation_clog",
        "sensor_error",
        "soil_waterlogged",
      ]);

      expect(INCIDENT_CATEGORIES.pest_fungus.title).toBe("Phát hiện sâu bệnh / Nấm lá");
      expect(INCIDENT_CATEGORIES.irrigation_clog.title).toBe("Hệ thống tưới bị nghẽn");
      expect(INCIDENT_CATEGORIES.sensor_error.title).toBe("Cảm biến báo sai số");
      expect(INCIDENT_CATEGORIES.soil_waterlogged.title).toBe("Đất ngập úng rễ");
    });

    it("should provide default solution proposals for each incident category", () => {
      expect(INCIDENT_CATEGORIES.pest_fungus.defaultProposals).toContain(
        "Phun dung dịch sinh học tỏi ớt"
      );
      expect(INCIDENT_CATEGORIES.irrigation_clog.defaultProposals).toContain(
        "Tạm ngừng tưới nhỏ giọt 24h"
      );
      expect(INCIDENT_CATEGORIES.soil_waterlogged.defaultProposals).toContain(
        "Ngưng tưới 48h"
      );
    });

    it("should validate valid incident report payload", () => {
      const valid = validateIncidentReport({
        plotId: "B-205",
        category: "irrigation_clog",
        description: "Đầu béc tưới số 3 bị nghẽn cặn vôi, đất khô cục bộ.",
        photoUrls: ["https://res.cloudinary.com/proof.jpg"],
        proposals: ["Súc rửa đầu béc luống 5"],
      });

      expect(valid.isValid).toBe(true);
      expect(valid.errors).toHaveLength(0);
    });

    it("should reject payload with missing plotId or empty description", () => {
      const invalid = validateIncidentReport({
        plotId: "",
        category: "pest_fungus",
        description: "",
      });

      expect(invalid.isValid).toBe(false);
      expect(invalid.errors).toContain("Vui lòng chọn ô đất gặp sự cố");
      expect(invalid.errors).toContain("Mô tả chi tiết sự cố cần ít nhất 5 ký tự");
    });
  });

  // ─────────────────────────────────────────────────────────────
  // 3. WORK HISTORY & KPI CALCULATIONS
  // ─────────────────────────────────────────────────────────────
  describe("3. Work History Filtering & Audit KPI Metrics", () => {
    const mockHistory: WorkHistoryItem[] = [
      {
        id: "T-01",
        taskType: "care",
        title: "Tưới vi sinh & xới đất",
        plotCode: "Ô đất A-104",
        cropName: "Cải cầu vồng",
        completedAt: "2026-10-12",
        hasPhoto: true,
        customerRating: 5.0,
        customerFeedback: "Rau rất xanh tốt, cảm ơn bác nông dân!",
      },
      {
        id: "T-02",
        taskType: "harvest",
        title: "Thu hoạch & đóng thùng Eco-box #8842",
        plotCode: "Ô đất A-101",
        cropName: "Xà lách búp",
        completedAt: "2026-10-11",
        hasPhoto: true,
        customerRating: 4.8,
        customerFeedback: "Rau giao rất tươi và giòn!",
      },
      {
        id: "T-03",
        taskType: "care",
        title: "Kiểm tra bẫy pheromone sinh học",
        plotCode: "Ô đất B-205",
        cropName: "Cải bó xôi",
        completedAt: "2026-10-10",
        hasPhoto: true,
      },
    ];

    it("should filter items correctly based on selected filter tab", () => {
      const all = filterHistoryItems(mockHistory, "ALL");
      expect(all).toHaveLength(3);

      const care = filterHistoryItems(mockHistory, "care");
      expect(care).toHaveLength(2);
      expect(care.every((item) => item.taskType === "care")).toBe(true);

      const harvest = filterHistoryItems(mockHistory, "harvest");
      expect(harvest).toHaveLength(1);
      expect(harvest[0].id).toBe("T-02");

      const feedback = filterHistoryItems(mockHistory, "feedback");
      expect(feedback).toHaveLength(2);
      expect(feedback.every((item) => item.customerRating !== undefined)).toBe(true);
    });

    it("should accurately compute KPI summary metrics (100% photo proof, 4.9 average rating)", () => {
      const kpis = calculateHistoryKPI(mockHistory);
      expect(kpis.totalCompleted).toBe(3);
      expect(kpis.photoProofPercentage).toBe(100);
      expect(kpis.averageRating).toBe(4.9);
      expect(kpis.feedbackCount).toBe(2);
    });
  });
});
