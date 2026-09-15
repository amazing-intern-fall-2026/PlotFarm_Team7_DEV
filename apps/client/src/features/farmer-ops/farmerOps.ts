/**
 * Farmer Ops Business Logic & Helpers
 * - Harvest weight validation & standard range checks (16.0 - 20.0 kg)
 * - Incident classification & solution proposals
 * - Work history filtering & KPI calculations
 */

export interface HarvestWeightCheck {
  weightKg: number;
  isStandard: boolean;
  statusText: string;
  badgeVariant: "success" | "warning";
}

export const HARVEST_STANDARDS = {
  MIN_STANDARD_KG: 16.0,
  MAX_STANDARD_KG: 20.0,
  DEFAULT_STEP_KG: 0.5,
  MIN_ALLOWED_KG: 1.0,
};

/**
 * Validates actual harvest weight against standard yield threshold (16 - 20 kg)
 */
export function checkHarvestWeight(weightKg: number): HarvestWeightCheck {
  const isStandard =
    weightKg >= HARVEST_STANDARDS.MIN_STANDARD_KG &&
    weightKg <= HARVEST_STANDARDS.MAX_STANDARD_KG;

  return {
    weightKg,
    isStandard,
    statusText: isStandard
      ? `Đạt chuẩn dự kiến (${HARVEST_STANDARDS.MIN_STANDARD_KG}–${HARVEST_STANDARDS.MAX_STANDARD_KG} kg)`
      : weightKg < HARVEST_STANDARDS.MIN_STANDARD_KG
      ? `Dưới mức chuẩn tối thiểu (${HARVEST_STANDARDS.MIN_STANDARD_KG} kg)`
      : `Vượt mức chuẩn tối đa (${HARVEST_STANDARDS.MAX_STANDARD_KG} kg)`,
    badgeVariant: isStandard ? "success" : "warning",
  };
}

/**
 * Increment / Decrement harvest weight stepper with precision
 */
export function stepHarvestWeight(
  current: number,
  delta: number,
  minAllowed: number = HARVEST_STANDARDS.MIN_ALLOWED_KG
): number {
  const next = Math.max(minAllowed, parseFloat((current + delta).toFixed(1)));
  return next;
}

// ─────────────────────────────────────────────────────────────
// INCIDENTS LOGIC
// ─────────────────────────────────────────────────────────────

export type IncidentCategory =
  | "pest_fungus"
  | "irrigation_clog"
  | "sensor_error"
  | "soil_waterlogged";

export interface IncidentTypeDefinition {
  id: IncidentCategory;
  title: string;
  description: string;
  defaultProposals: string[];
}

export const INCIDENT_CATEGORIES: Record<IncidentCategory, IncidentTypeDefinition> = {
  pest_fungus: {
    id: "pest_fungus",
    title: "Phát hiện sâu bệnh / Nấm lá",
    description: "Rệp sáp, bọ nhảy hoặc đốm nấm trên tán lá",
    defaultProposals: [
      "Phun dung dịch sinh học tỏi ớt",
      "Cắt tỉa lá bệnh tiêu hủy",
      "Cách ly luống lân cận",
    ],
  },
  irrigation_clog: {
    id: "irrigation_clog",
    title: "Hệ thống tưới bị nghẽn",
    description: "Đầu béc tưới nhỏ giọt bị cặn bám, không ra nước",
    defaultProposals: [
      "Tạm ngừng tưới nhỏ giọt 24h",
      "Súc rửa đầu béc luống 5",
      "Bổ sung tưới tay thủ công",
    ],
  },
  sensor_error: {
    id: "sensor_error",
    title: "Cảm biến báo sai số",
    description: "Chỉ số độ ẩm/EC nhảy bất thường so với thực tế",
    defaultProposals: [
      "Kiểm tra pin cảm biến IoT",
      "Đo đối chứng bằng máy đo cơ cầm tay",
      "Yêu cầu kỹ thuật hiệu chuẩn lại",
    ],
  },
  soil_waterlogged: {
    id: "soil_waterlogged",
    title: "Đất ngập úng rễ",
    description: "Thoát nước chậm sau đợt mưa hoặc tưới thừa",
    defaultProposals: [
      "Xới rãnh thoát nước luống",
      "Ngưng tưới 48h",
      "Rải tro trấu xốp đất",
    ],
  },
};

export interface IncidentReportPayload {
  plotId: string;
  category: IncidentCategory;
  description: string;
  photoUrls: string[];
  proposals: string[];
}

export function validateIncidentReport(payload: Partial<IncidentReportPayload>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!payload.plotId || payload.plotId.trim() === "") {
    errors.push("Vui lòng chọn ô đất gặp sự cố");
  }

  if (!payload.category || !INCIDENT_CATEGORIES[payload.category]) {
    errors.push("Vui lòng chọn danh mục sự cố");
  }

  if (!payload.description || payload.description.trim().length < 5) {
    errors.push("Mô tả chi tiết sự cố cần ít nhất 5 ký tự");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ─────────────────────────────────────────────────────────────
// WORK HISTORY LOGIC
// ─────────────────────────────────────────────────────────────

export type HistoryFilterType = "ALL" | "care" | "harvest" | "feedback";

export interface WorkHistoryItem {
  id: string;
  taskType: "care" | "harvest";
  title: string;
  plotCode: string;
  cropName: string;
  completedAt: string;
  hasPhoto: boolean;
  customerRating?: number;
  customerFeedback?: string;
  metric?: string;
}

/**
 * Filter work history items by category
 */
export function filterHistoryItems(
  items: WorkHistoryItem[],
  filter: HistoryFilterType
): WorkHistoryItem[] {
  if (filter === "ALL") return items;
  if (filter === "care") return items.filter((i) => i.taskType === "care");
  if (filter === "harvest") return items.filter((i) => i.taskType === "harvest");
  if (filter === "feedback")
    return items.filter((i) => Boolean(i.customerRating || i.customerFeedback));
  return items;
}

/**
 * Calculate KPI summary metrics for farmer history dashboard
 */
export function calculateHistoryKPI(items: WorkHistoryItem[]) {
  const total = items.length;
  const withPhoto = items.filter((i) => i.hasPhoto).length;
  const photoRate = total > 0 ? Math.round((withPhoto / total) * 100) : 100;

  const ratedItems = items.filter((i) => typeof i.customerRating === "number");
  const avgRating =
    ratedItems.length > 0
      ? parseFloat(
          (
            ratedItems.reduce((acc, curr) => acc + (curr.customerRating || 0), 0) /
            ratedItems.length
          ).toFixed(1)
        )
      : 5.0;

  return {
    totalCompleted: total,
    photoProofPercentage: photoRate,
    averageRating: avgRating,
    feedbackCount: ratedItems.length,
  };
}
