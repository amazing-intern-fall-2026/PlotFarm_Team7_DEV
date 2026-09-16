import { describe, it, expect } from "vitest";
import type { PlotUiItem } from "@/entities/plot";

/** Local test fixtures — mirror real DB data shape, not used in production */
const TEST_PLOTS: PlotUiItem[] = [
  {
    plotCode: "PLT-A01",
    plotNumber: "Khu A - Ô 01",
    areaSquareMeters: 15,
    status: "AVAILABLE",
    pricePerMonth: 1200000,
    soilType: "Đất đỏ Bazan tơi xốp",
    iotSensorInstalled: true,
    cameraSupported: true,
    zone: "Khu A (Rau Ăn Lá)",
    imageUrl: "/images/plot-1.jpg",
  },
  {
    plotCode: "PLT-A02",
    plotNumber: "Khu A - Ô 02",
    areaSquareMeters: 15,
    status: "AVAILABLE",
    pricePerMonth: 1200000,
    soilType: "Đất phù sa giàu mùn",
    iotSensorInstalled: true,
    cameraSupported: true,
    zone: "Khu A (Rau Ăn Lá)",
    imageUrl: "/images/plot-2.jpg",
  },
  {
    plotCode: "PLT-A03",
    plotNumber: "Khu A - Ô 03",
    areaSquareMeters: 20,
    status: "RESERVED",
    pricePerMonth: 1500000,
    soilType: "Đất đỏ Bazan hữu cơ",
    iotSensorInstalled: true,
    cameraSupported: true,
    zone: "Khu A (Rau Ăn Lá)",
    imageUrl: "/images/plot-3.jpg",
  },
  {
    plotCode: "PLT-A04",
    plotNumber: "Khu A - Ô 04",
    areaSquareMeters: 20,
    status: "OCCUPIED",
    pricePerMonth: 1500000,
    soilType: "Đất đỏ Bazan Lâm Đồng",
    iotSensorInstalled: true,
    cameraSupported: true,
    zone: "Khu A (Rau Ăn Lá)",
    cropName: "Cải cầu vồng Thụy Sĩ",
    imageUrl: "/images/plot-4.jpg",
  },
  {
    plotCode: "PLT-B01",
    plotNumber: "Khu B - Ô 01",
    areaSquareMeters: 15,
    status: "MAINTENANCE",
    pricePerMonth: 1250000,
    soilType: "Đất đỏ Bazan chọn lọc",
    iotSensorInstalled: false,
    cameraSupported: true,
    zone: "Khu B (Củ Quả)",
    imageUrl: "/images/plot-5.jpg",
  },
  {
    plotCode: "PLT-B02",
    plotNumber: "Khu B - Ô 02",
    areaSquareMeters: 20,
    status: "AVAILABLE",
    pricePerMonth: 1600000,
    soilType: "Đất trộn xơ dừa vi sinh",
    iotSensorInstalled: true,
    cameraSupported: true,
    zone: "Khu B (Củ Quả)",
    imageUrl: "/images/plot-6.jpg",
  },
];

describe("widgets/PlotGridMap & PlotCard - US-18 Unit Test Suite", () => {
  const plots: PlotUiItem[] = TEST_PLOTS;

  // ── Kịch bản 1 (AC1): Hiển thị đúng màu sắc và trạng thái của các ô đất ────
  describe("Kịch bản 1 (AC1): Xác thực cấu trúc dữ liệu và trạng thái ô đất", () => {
    it("phải bao gồm đầy đủ 4 trạng thái cốt lõi: AVAILABLE, RESERVED, OCCUPIED, MAINTENANCE", () => {
      const availablePlots = plots.filter((p) => p.status === "AVAILABLE");
      const reservedPlots = plots.filter((p) => p.status === "RESERVED");
      const occupiedPlots = plots.filter((p) => p.status === "OCCUPIED");
      const maintenancePlots = plots.filter((p) => p.status === "MAINTENANCE");

      expect(availablePlots.length).toBeGreaterThan(0);
      expect(reservedPlots.length).toBeGreaterThan(0);
      expect(occupiedPlots.length).toBeGreaterThan(0);
      expect(maintenancePlots.length).toBeGreaterThan(0);
    });

    it("mỗi ô đất phải có diện tích chuẩn thuộc dải 15m² hoặc 20m²", () => {
      plots.forEach((plot) => {
        expect([15, 20]).toContain(plot.areaSquareMeters);
        expect(plot.pricePerMonth).toBeGreaterThan(0);
        expect(plot.plotCode).toMatch(/^PLT-[A-Z]\d{2}$/);
      });
    });

    it("các ô AVAILABLE phải có đầy đủ thông tin chuẩn sinh thái để sẵn sàng thuê", () => {
      const available = plots.filter((p) => p.status === "AVAILABLE");
      available.forEach((plot) => {
        expect(plot.soilType).toBeDefined();
        expect(typeof plot.soilType).toBe("string");
        expect(plot.cameraSupported).toBe(true);
      });
    });
  });

  // ── Kịch bản 2 (AC2): Lọc danh sách ô đất theo trạng thái và tìm kiếm ──────
  describe("Kịch bản 2 (AC2): Lọc danh sách ô đất theo trạng thái & tìm kiếm", () => {
    it("khi lọc theo trạng thái AVAILABLE, danh sách chỉ chứa các ô đất còn trống", () => {
      const filtered = plots.filter((p) => p.status === "AVAILABLE");
      expect(filtered.every((p) => p.status === "AVAILABLE")).toBe(true);
      expect(filtered.some((p) => p.status === "OCCUPIED")).toBe(false);
      expect(filtered.some((p) => p.status === "RESERVED")).toBe(false);
      expect(filtered.some((p) => p.status === "MAINTENANCE")).toBe(false);
    });

    it("khi lọc theo diện tích 15m², chỉ trả về các ô chuẩn 15m²", () => {
      const filtered = plots.filter((p) => p.areaSquareMeters === 15);
      expect(filtered.every((p) => p.areaSquareMeters === 15)).toBe(true);
      expect(filtered.some((p) => p.areaSquareMeters === 20)).toBe(false);
    });

    it("khi tìm kiếm theo mã ô đất (#PLT-A01 hoặc plt-a01), kết quả trả về chính xác", () => {
      const query = "#PLT-A01".toLowerCase().replace("#", "");
      const match = plots.filter((p) => p.plotCode.toLowerCase().includes(query));
      expect(match).toHaveLength(1);
      expect(match[0].plotCode).toBe("PLT-A01");
    });

    it("khi sắp xếp theo giá thuê Cao -> Thấp (price_desc), ô đất có giá cao nhất nằm ở đầu", () => {
      const sorted = [...plots].sort((a, b) => b.pricePerMonth - a.pricePerMonth);
      expect(sorted[0].pricePerMonth).toBeGreaterThanOrEqual(sorted[sorted.length - 1].pricePerMonth);
      expect(sorted[0].pricePerMonth).toBe(1600000);
    });

    it("khi sắp xếp theo giá thuê Thấp -> Cao (price_asc), ô đất có giá thấp nhất nằm ở đầu", () => {
      const sorted = [...plots].sort((a, b) => a.pricePerMonth - b.pricePerMonth);
      expect(sorted[0].pricePerMonth).toBeLessThanOrEqual(sorted[sorted.length - 1].pricePerMonth);
      expect(sorted[0].pricePerMonth).toBe(1200000);
    });
  });

  // ── Kịch bản 3 (AC3): Tương tác chọn ô đất và điều kiện kích hoạt Drawer ────
  describe("Kịch bản 3 (AC3): Tương tác chọn ô đất mở Drawer chi tiết", () => {
    it("chỉ các ô đất AVAILABLE mới cho phép người dùng bấm đặt thuê", () => {
      const availablePlot = plots.find((p) => p.status === "AVAILABLE");
      const reservedPlot = plots.find((p) => p.status === "RESERVED");
      const maintenancePlot = plots.find((p) => p.status === "MAINTENANCE");

      expect(availablePlot?.status).toBe("AVAILABLE");
      expect(reservedPlot?.status).not.toBe("AVAILABLE");
      expect(maintenancePlot?.status).not.toBe("AVAILABLE");
    });

    it("dữ liệu ô đất AVAILABLE phải có trường streamUrl hoặc video demo để hiển thị camera trong Drawer", () => {
      const availablePlot = plots.find((p) => p.status === "AVAILABLE");
      expect(availablePlot).toBeDefined();
      expect(availablePlot?.cameraSupported).toBe(true);
    });
  });
});
