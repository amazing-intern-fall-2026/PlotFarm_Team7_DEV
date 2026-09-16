import * as React from "react";
import {
  Plus,
  Search,
  Zap,
  Bell,
  PackageCheck,
  Edit,
  ChevronRight,
  X,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  Button,
  Box,
} from "@/shared/ui";

interface CropItem {
  id: string;
  name: string;
  category: "leafy" | "tuber" | "herb";
  categoryText: string;
  cycleDays: string;
  yieldPerPlot: string;
  tempRange: string;
  tempPercent: number; // For visualization bar
  moistureRange: string;
  moisturePercent: number;
  activePlotsCount: number;
  customerCount: number;
  tag: string;
  tagColor: string;
  image: string;
  isEnabled: boolean;
}

const STORAGE_KEY_ADMIN_CROPS = "admin_managed_crops_data_v2";

export function AdminCropsPage() {
  const [crops, setCrops] = React.useState<CropItem[]>(() => {
    try {
      localStorage.removeItem("admin_managed_crops_data");
      localStorage.removeItem("admin_crops_data");
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_CROPS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const hasOldMocks = parsed.some((c: CropItem) =>
            ["crop-1", "crop-2", "crop-3", "1", "2", "3"].includes(c?.id) ||
            c?.name === "Cải cầu vồng Thụy Sĩ" ||
            c?.name === "Cải bó xôi Nhật"
          );
          if (hasOldMocks) {
            localStorage.setItem(STORAGE_KEY_ADMIN_CROPS, JSON.stringify([]));
            return [];
          }
          return parsed;
        }
      }
    } catch {
      /* Ignore exception intentionally */
    }
    localStorage.setItem(STORAGE_KEY_ADMIN_CROPS, JSON.stringify([]));
    return [];
  });

  const [activeCategory, setActiveCategory] = React.useState<"all" | "leafy" | "tuber" | "herb">("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [editingCrop, setEditingCrop] = React.useState<CropItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const [newCropName, setNewCropName] = React.useState("");
  const [newCropCat, setNewCropCat] = React.useState<"leafy" | "tuber" | "herb">("leafy");
  const [newCropYield, setNewCropYield] = React.useState("15 – 20 kg/lô (20m²)");
  const [newCropCycle, setNewCropCycle] = React.useState("Vụ 60 ngày");

  const totalCount = crops.length;
  const leafyCount = crops.filter((c) => c.category === "leafy").length;
  const tuberCount = crops.filter((c) => c.category === "tuber").length;
  const herbCount = crops.filter((c) => c.category === "herb").length;

  const toggleCrop = (id: string) => {
    setCrops((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, isEnabled: !c.isEnabled } : c));
      try {
        localStorage.setItem(STORAGE_KEY_ADMIN_CROPS, JSON.stringify(updated));
      } catch {
      /* Ignore exception intentionally */
    }
      return updated;
    });
  };

  const handleAddCropSubmit = () => {
    if (!newCropName.trim()) {
      alert("Vui lòng nhập tên giống cây!");
      return;
    }

    const catTextMap = {
      leafy: "Rau ăn lá cao cấp",
      tuber: "Củ quả ngắn ngày",
      herb: "Thảo mộc gia vị",
    };

    const newCrop: CropItem = {
      id: `crop-${Date.now()}`,
      name: newCropName.trim(),
      category: newCropCat,
      categoryText: catTextMap[newCropCat],
      cycleDays: newCropCycle,
      yieldPerPlot: newCropYield,
      tempRange: "18°C – 26°C",
      tempPercent: 65,
      moistureRange: "60% – 75%",
      moisturePercent: 70,
      activePlotsCount: 0,
      customerCount: 0,
      tag: "GlobalGAP",
      tagColor: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=150&auto=format&fit=crop&q=80",
      isEnabled: true,
    };

    const updated = [newCrop, ...crops];
    setCrops(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_CROPS, JSON.stringify(updated));
    } catch {
      /* Ignore exception intentionally */
    }

    setNewCropName("");
    setIsAddModalOpen(false);
  };

  const filteredCrops = React.useMemo(() => {
    return crops.filter((crop) => {
      if (activeCategory !== "all" && crop.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!crop.name.toLowerCase().includes(q) && !crop.categoryText.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [crops, activeCategory, searchQuery]);

  return (
    <Box className="w-full space-y-6 pb-12">
      <Box className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Box className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span>Hệ thống</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-semibold">Danh mục Giống rau</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Danh mục Giống rau Canh tác <span className="text-muted-foreground font-normal text-xl">({totalCount} giống)</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Thiết lập danh mục cây trồng, định mức năng suất và dải cảm biến an toàn
          </p>
        </Box>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Đang áp dụng tự động cho cảm biến IoT
          </span>

          <Button
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>+ Thêm giống cây mới</span>
          </Button>
        </div>
      </Box>

      <Card className="border-border bg-white dark:bg-slate-900 p-4 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === "all"
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              Tất cả ({totalCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("leafy")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === "leafy"
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              Rau ăn lá ({leafyCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("tuber")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === "tuber"
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              Củ quả ngắn ngày ({tuberCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("herb")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === "herb"
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              Gia vị thảo mộc ({herbCount})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo tên giống..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-slate-50/50 dark:bg-slate-800/50 py-1.5 pl-8 pr-3 text-xs font-medium text-foreground focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCrops.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-border/80 p-12 text-center bg-slate-50/50 dark:bg-slate-900/40">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 mb-3">
              <Plus className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-foreground">Chưa có giống rau nào trong danh mục</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              Nhấn &ldquo;+ Thêm giống cây mới&rdquo; ở góc trên để thiết lập danh mục cây trồng, định mức năng suất và dải cảm biến IoT.
            </p>
            <Button
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              className="mt-4 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold shadow-xs"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Thêm giống cây mới
            </Button>
          </div>
        ) : (
          filteredCrops.map((crop) => (
            <Card
              key={crop.id}
              className={`border-border bg-white dark:bg-slate-900 p-5 shadow-xs transition-all flex flex-col justify-between ${
                !crop.isEnabled ? "opacity-60" : ""
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="h-12 w-12 rounded-full object-cover shadow-2xs border border-border/80"
                    />
                    <div>
                      <h3 className="font-bold text-foreground text-sm leading-snug">{crop.name}</h3>
                      <p className="text-xs text-muted-foreground">{crop.categoryText}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={crop.isEnabled}
                    onClick={() => toggleCrop(crop.id)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      crop.isEnabled ? "bg-emerald-700" : "bg-slate-300 dark:bg-slate-700"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        crop.isEnabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    🌱 {crop.cycleDays}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    ⚖ {crop.yieldPerPlot}
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-muted-foreground mb-1 font-medium">
                      <span>🌡 Nhiệt độ thích hợp:</span>
                      <strong className="text-foreground">{crop.tempRange}</strong>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full rounded-full bg-amber-700" style={{ width: `${crop.tempPercent}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-muted-foreground mb-1 font-medium">
                      <span>💧 Độ ẩm đất tối ưu:</span>
                      <strong className="text-foreground">{crop.moistureRange}</strong>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-700" style={{ width: `${crop.moisturePercent}%` }} />
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  Đang gieo trồng tại <strong>{crop.activePlotsCount} ô đất</strong> • {crop.customerCount} khách hàng chọn
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${crop.tagColor}`}>
                  {crop.tag}
                </span>

                <button
                  type="button"
                  onClick={() => setEditingCrop(crop)}
                  className="flex items-center gap-1 font-semibold text-slate-600 hover:text-foreground dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>Chỉnh sửa cấu hình</span>
                </button>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">
            <Zap className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-foreground text-sm">Đồng bộ tưới tự động</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Hệ thống IoT kích hoạt van nhỏ giọt khi độ ẩm đất dưới ngưỡng cấu hình của từng lô rau.
            </p>
          </div>
        </Card>

        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600">
            <Bell className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-foreground text-sm">Cảnh báo nhiệt độ sốc</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Gửi thông báo đẩy đến kỹ sư nông học nếu nhà màng vượt 3°C so với ngưỡng trần giống rau.
            </p>
          </div>
        </Card>

        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600">
            <PackageCheck className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-foreground text-sm">Dự báo sản lượng tự động</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tự cân đối kế hoạch đóng thùng giao khách dựa trên định mức kg/lô và ngày xuống giống thực tế.
            </p>
          </div>
        </Card>
      </div>

      {editingCrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-border space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">Chỉnh sửa: {editingCrop.name}</h3>
              <button
                type="button"
                onClick={() => setEditingCrop(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-foreground">Thời gian vụ (ngày)</label>
                <input
                  type="text"
                  defaultValue={editingCrop.cycleDays}
                  className="mt-1 w-full rounded-xl border border-border p-2.5 bg-white dark:bg-slate-800 text-foreground"
                />
              </div>
              <div>
                <label className="font-semibold text-foreground">Dải nhiệt độ thích hợp (°C)</label>
                <input
                  type="text"
                  defaultValue={editingCrop.tempRange}
                  className="mt-1 w-full rounded-xl border border-border p-2.5 bg-white dark:bg-slate-800 text-foreground"
                />
              </div>
              <div>
                <label className="font-semibold text-foreground">Dải độ ẩm đất tối ưu (%)</label>
                <input
                  type="text"
                  defaultValue={editingCrop.moistureRange}
                  className="mt-1 w-full rounded-xl border border-border p-2.5 bg-white dark:bg-slate-800 text-foreground"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
              <Button variant="ghost" size="sm" onClick={() => setEditingCrop(null)}>
                Hủy
              </Button>
              <Button
                size="sm"
                className="bg-emerald-800 text-white font-semibold"
                onClick={() => {
                  setEditingCrop(null);
                  alert("Đã cập nhật cấu hình giống rau thành công!");
                }}
              >
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                Lưu thay đổi
              </Button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-border space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">Thêm Giống Cây Mới</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-foreground">Tên giống cây</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Cà chua bi Cherry Đà Lạt"
                  value={newCropName}
                  onChange={(e) => setNewCropName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border p-2.5 bg-white dark:bg-slate-800 text-foreground"
                />
              </div>
              <div>
                <label className="font-semibold text-foreground">Phân loại</label>
                <select
                  value={newCropCat}
                  onChange={(e) => setNewCropCat(e.target.value as "leafy" | "tuber" | "herb")}
                  className="mt-1 w-full rounded-xl border border-border p-2.5 bg-white dark:bg-slate-800 text-foreground"
                >
                  <option value="leafy">Rau ăn lá</option>
                  <option value="tuber">Củ quả ngắn ngày</option>
                  <option value="herb">Thảo mộc gia vị</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-foreground">Thời gian vụ</label>
                <input
                  type="text"
                  value={newCropCycle}
                  onChange={(e) => setNewCropCycle(e.target.value)}
                  placeholder="Vụ 60 ngày"
                  className="mt-1 w-full rounded-xl border border-border p-2.5 bg-white dark:bg-slate-800 text-foreground"
                />
              </div>
              <div>
                <label className="font-semibold text-foreground">Định mức năng suất (kg/lô 20m²)</label>
                <input
                  type="text"
                  value={newCropYield}
                  onChange={(e) => setNewCropYield(e.target.value)}
                  placeholder="15 - 20 kg/lô (20m²)"
                  className="mt-1 w-full rounded-xl border border-border p-2.5 bg-white dark:bg-slate-800 text-foreground"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
              <Button variant="ghost" size="sm" onClick={() => setIsAddModalOpen(false)}>
                Hủy
              </Button>
              <Button
                size="sm"
                className="bg-emerald-800 text-white font-semibold"
                onClick={handleAddCropSubmit}
              >
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                Thêm giống cây
              </Button>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
}
