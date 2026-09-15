import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Layers,
  Search,
  X,
  MapPin,
  RefreshCw,
  Tractor,
  AlertCircle,
  Hash,
  ChevronLeft,
  ChevronRight,
  Video,
  Droplets,
  Users,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  Button,
  Box,
  Avatar,
} from "@/shared/ui";

interface PlotRow {
  id: string;
  code: string;
  specs: string;
  status: "cultivating" | "harvest_ready" | "available" | "rented" | "maintenance";
  statusText: string;
  customerName?: string;
  contractCode?: string;
  cropName?: string;
  farmerName?: string;
  farmerAvatar?: string;
}

const STORAGE_KEY_ADMIN_PLOTS = "admin_managed_plots_data_v2";

export function AdminPlotsPage() {
  const navigate = useNavigate();
  const [plots, setPlots] = React.useState<PlotRow[]>(() => {
    try {
      // Clear legacy mock data keys
      localStorage.removeItem("admin_managed_plots_data");
      localStorage.removeItem("admin_plots_data");
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_PLOTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const hasOldMocks = parsed.some((p: PlotRow) =>
            !p?.id ||
            ["A-104", "A-101", "A-102", "B-205", "B-208", "A-103", "B-201", "1", "2", "3"].includes(p?.id) ||
            ["#A-104", "#A-101", "#A-102", "#B-205", "#B-208", "#A-103", "#B-201"].includes(p?.code) ||
            p?.customerName === "Nguyễn Thu Hà" ||
            p?.customerName === "Lê Hoàng Nam" ||
            p?.customerName === "Trần Minh Quang"
          );
          if (hasOldMocks) {
            localStorage.setItem(STORAGE_KEY_ADMIN_PLOTS, JSON.stringify([]));
            return [];
          }
          return parsed;
        }
      }
    } catch {
      // Ignore storage read error
    }
    localStorage.setItem(STORAGE_KEY_ADMIN_PLOTS, JSON.stringify([]));
    return [];
  });

  const [zoneTab, setZoneTab] = React.useState<"all" | "zoneA" | "zoneB">("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Modal form state
  const [bulkZone, setBulkZone] = React.useState("Khu A Đà Lạt - Vườn 1");
  const [bulkCount, setBulkCount] = React.useState(10);
  const [bulkArea, setBulkArea] = React.useState(20);

  // Dynamic Metrics
  const totalPlots = plots.length;
  const zoneACount = plots.filter((p) => p.specs.includes("Khu A")).length;
  const zoneBCount = plots.filter((p) => p.specs.includes("Khu B")).length;
  const availableCount = plots.filter((p) => p.status === "available").length;
  const cultivatingCount = plots.filter((p) => ["cultivating", "rented"].includes(p.status)).length;
  const harvestReadyCount = plots.filter((p) => p.status === "harvest_ready").length;
  const maintenanceCount = plots.filter((p) => p.status === "maintenance").length;

  const totalArea = plots.reduce((sum, p) => {
    const match = p.specs.match(/(\d+)\s*m²/);
    return sum + (match ? parseInt(match[1], 10) : 20);
  }, 0);

  const occupancyRate = totalPlots > 0 ? ((cultivatingCount / totalPlots) * 100).toFixed(1) : "0.0";

  // Filtered list
  const filteredPlots = React.useMemo(() => {
    return plots.filter((plot) => {
      // Zone filter
      if (zoneTab === "zoneA" && !plot.specs.includes("Khu A")) return false;
      if (zoneTab === "zoneB" && !plot.specs.includes("Khu B")) return false;

      // Status filter
      if (statusFilter === "available" && plot.status !== "available") return false;
      if (statusFilter === "cultivating" && !["cultivating", "rented"].includes(plot.status)) return false;
      if (statusFilter === "maintenance" && plot.status !== "maintenance") return false;

      // Search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchCode = plot.code.toLowerCase().includes(q);
        const matchCust = plot.customerName?.toLowerCase().includes(q);
        const matchCrop = plot.cropName?.toLowerCase().includes(q);
        if (!matchCode && !matchCust && !matchCrop) return false;
      }

      return true;
    });
  }, [plots, zoneTab, statusFilter, searchTerm]);

  const handleBulkCreateSubmit = () => {
    const newPlots: PlotRow[] = Array.from({ length: bulkCount }, (_, i) => {
      const idNum = plots.length + i + 1;
      const prefix = bulkZone.includes("Khu B") ? "B" : "A";
      const code = `#${prefix}-${100 + idNum}`;
      return {
        id: `${prefix}-${100 + idNum}`,
        code,
        specs: `${bulkArea}m² • Đất đỏ Bazan • ${bulkZone}`,
        status: "available" as const,
        statusText: "Sẵn sàng",
      };
    });

    const updated = [...plots, ...newPlots];
    setPlots(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_PLOTS, JSON.stringify(updated));
    } catch {
      // Ignore storage write error
    }
    setIsModalOpen(false);
  };

  return (
    <Box className="w-full space-y-6 pb-12">
      {/* ── Sub-breadcrumbs & Page Header ── */}
      <Box className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Box className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span>Hệ thống</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Quản lý Ô đất</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-semibold">Danh mục Ô đất Canh tác</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Danh mục Ô đất Canh tác <span className="text-muted-foreground font-normal text-xl">({totalPlots} ô)</span>
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <MapPin className="h-3.5 w-3.5 text-emerald-600" />
              Phân khu công nghệ cao Đơn Dương – Đà Lạt
            </span>
          </div>
        </Box>

        {/* Top actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 font-semibold shadow-xs"
          >
            <Layers className="h-4 w-4" />
            <span>+ Tạo lô hàng loạt (15m² – 20m²)</span>
          </Button>

          <Button
            size="sm"
            onClick={() => navigate("/admin/plots/A-104/config")}
            className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>+ Thêm ô đất mới</span>
          </Button>
        </div>
      </Box>

      {/* ── 4 Top KPI Metric Cards ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">TỔNG DIỆN TÍCH</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
                {totalArea} m²
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <Hash className="h-5 w-5" />
            </div>
          </div>
        </Card>

        {/* Metric 2 */}
        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">TỶ LỆ LẤP ĐẦY</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
                {occupancyRate}%
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
              <RefreshCw className="h-5 w-5" />
            </div>
          </div>
        </Card>

        {/* Metric 3 */}
        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Ô SẮP THU HOẠCH</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
                {harvestReadyCount} ô
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600">
              <Tractor className="h-5 w-5" />
            </div>
          </div>
        </Card>

        {/* Metric 4 */}
        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">CẦN BẢO DƯỠNG ĐẤT</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
                {maintenanceCount} ô
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-500">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* ── Filter Bar ── */}
      <Card className="border-border bg-white dark:bg-slate-900 p-4 shadow-xs space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Zone tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setZoneTab("all")}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  zoneTab === "all"
                    ? "bg-white dark:bg-slate-900 text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Tất cả ({totalPlots})
              </button>
              <button
                type="button"
                onClick={() => setZoneTab("zoneA")}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  zoneTab === "zoneA"
                    ? "bg-white dark:bg-slate-900 text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Khu A Đà Lạt ({zoneACount})
              </button>
              <button
                type="button"
                onClick={() => setZoneTab("zoneB")}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  zoneTab === "zoneB"
                    ? "bg-white dark:bg-slate-900 text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Khu B ({zoneBCount})
              </button>
            </div>

            {/* Status pills */}
            <div className="flex flex-wrap items-center gap-1.5 pl-2">
              <button
                type="button"
                onClick={() => setStatusFilter("all")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  statusFilter === "all"
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                Tất cả trạng thái
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("available")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  statusFilter === "available"
                    ? "bg-emerald-700 text-white"
                    : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Sẵn sàng thuê ({availableCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("cultivating")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  statusFilter === "cultivating"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 text-blue-800 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Đang canh tác ({cultivatingCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("maintenance")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  statusFilter === "maintenance"
                    ? "bg-amber-600 text-white"
                    : "bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Đang làm đất ({maintenanceCount})
              </button>
            </div>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Mã ô đất (#A-101) hoặc tên"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-border bg-slate-50/50 dark:bg-slate-800/50 py-2 pl-9 pr-8 text-xs font-medium text-foreground focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-xl border border-border/80">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 dark:bg-slate-800/60 text-muted-foreground border-b border-border uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Mã Ô Đất</th>
                <th className="py-3.5 px-4">Quy Cách &amp; Phân Khu</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4">Khách Thuê &amp; Hợp Đồng</th>
                <th className="py-3.5 px-4">Giống Cây Hiện Tại</th>
                <th className="py-3.5 px-4">Nông Dân Phụ Trách</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-medium">
              {filteredPlots.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60">
                        <Layers className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Chưa có ô đất canh tác nào</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Nhấn "+ Tạo lô hàng loạt" hoặc "+ Thêm ô đất mới" ở góc trên để bắt đầu khởi tạo.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPlots.map((plot) => {
                  const getStatusBadge = () => {
                    switch (plot.status) {
                      case "cultivating":
                        return (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            Đang canh tác
                          </span>
                        );
                      case "harvest_ready":
                        return (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                            Đến hạn thu hoạch
                          </span>
                        );
                      case "available":
                        return (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Sẵn sàng
                          </span>
                        );
                      case "rented":
                        return (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                            Đang thuê
                          </span>
                        );
                      case "maintenance":
                        return (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-950/60 dark:text-orange-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                            Làm đất (Bảo dưỡng)
                          </span>
                        );
                    }
                  };

                  return (
                    <tr
                      key={plot.id}
                      onClick={() => navigate(`/admin/plots/${plot.id}/config`)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-foreground">
                        {plot.code}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                        {plot.specs}
                      </td>
                      <td className="py-3.5 px-4">
                        {getStatusBadge()}
                      </td>
                      <td className="py-3.5 px-4">
                        {plot.customerName ? (
                          <div className="flex items-center gap-2">
                            <span className="text-foreground font-semibold">{plot.customerName}</span>
                            <span className="text-[11px] font-mono text-muted-foreground bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-sm">
                              {plot.contractCode}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                        {plot.cropName || <span className="text-muted-foreground">—</span>}
                      </td>
                      <td className="py-3.5 px-4">
                        {plot.farmerName ? (
                          <div className="flex items-center gap-2">
                            <Avatar name={plot.farmerName} size="sm" src={plot.farmerAvatar} />
                            <span className="text-foreground">{plot.farmerName}</span>
                          </div>
                        ) : (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-muted-foreground dark:bg-slate-800">
                            Chưa phân công
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>
              Hiển thị <strong>{filteredPlots.length === 0 ? 0 : (currentPage - 1) * 10 + 1} – {Math.min(currentPage * 10, filteredPlots.length)}</strong> trên <strong>{filteredPlots.length}</strong> kết quả
            </span>
          </div>

          {filteredPlots.length > 10 && (
            <div className="flex items-center gap-1 self-end sm:self-auto">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Trước
              </button>
              <button type="button" className="h-7 w-7 rounded-lg bg-emerald-800 text-white font-bold text-xs">1</button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => p + 1)}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Sau
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </Card>

      {/* ── Bottom 3 Technical Monitoring Cards ── */}
      {plots.length > 0 && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Card 1: Camera Live Feed */}
        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-foreground">Camera Trực tiếp Khu A</h3>
              </div>
              <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider animate-pulse">
                LIVE 4K
              </span>
            </div>

            {/* Video preview representation */}
            <div className="mt-4 relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group">
              <img
                src="/images/plot-1.jpg"
                alt="Greenhouse Live Camera"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Fallback to high quality farm image
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white">
                <span>Cam 01 - Ô #A-101 đến #A-110</span>
                <span>FPS: 30 • 24.2 °C</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">Băng thông: 3.2 Mbps</span>
            <button
              type="button"
              onClick={() => navigate("/admin/plots/A-104/config")}
              className="text-emerald-700 hover:text-emerald-800 font-bold"
            >
              Mở camera chi tiết →
            </button>
          </div>
        </Card>

        {/* Card 2: Soil Moisture & Nutrients */}
        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-foreground">Độ Ẩm &amp; Dưỡng Chất Đất</h3>
            </div>
            <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
              Bình thường
            </span>
          </div>

          <div className="space-y-3 pt-1 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-muted-foreground">Độ ẩm đất trung bình (Bazan)</span>
                <span className="text-foreground">68% / 75%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-600" style={{ width: "68%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-muted-foreground">Nồng độ dinh dưỡng EC</span>
                <span className="text-foreground">1.8 mS/cm (Chuẩn)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-amber-700" style={{ width: "72%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-muted-foreground">Độ pH tầng mặt</span>
                <span className="text-foreground">pH 6.2 (Lý tưởng)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-700" style={{ width: "80%" }} />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>Cập nhật từ 12 cảm biến IoT</span>
            <button type="button" className="text-emerald-700 hover:text-emerald-800 font-semibold">
              Hiệu chuẩn cảm biến
            </button>
          </div>
        </Card>

        {/* Card 3: Farmer Workload */}
        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-foreground">Tải Việc Nông Dân Trực</h3>
              </div>
              <span className="rounded-full bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 text-[11px] font-bold text-blue-700 dark:text-blue-300">
                3 Nông dân
              </span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-2.5">
                  <Avatar name="Bác Bảy" size="sm" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" />
                  <div>
                    <p className="font-bold text-foreground">Bác Bảy</p>
                    <p className="text-muted-foreground text-[11px]">Phụ trách 18 ô</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                  Tối ưu
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-2.5">
                  <Avatar name="Chú Năm" size="sm" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" />
                  <div>
                    <p className="font-bold text-foreground">Chú Năm</p>
                    <p className="text-muted-foreground text-[11px]">Phụ trách 16 ô</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                  Tối ưu
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-2.5">
                  <Avatar name="Chú Tư" size="sm" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80" />
                  <div>
                    <p className="font-bold text-foreground">Chú Tư</p>
                    <p className="text-muted-foreground text-[11px]">Phụ trách 16 ô</p>
                  </div>
                </div>
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  Bình thường
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border flex justify-end">
            <button
              type="button"
              onClick={() => alert("Mở modal điều phối lại phân bổ nhân sự.")}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              Điều phối lại phân công →
            </button>
          </div>
        </Card>
      </div>
      )}

      {/* Bulk Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-border space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">Tạo Lô Hàng Loạt</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-foreground">Phân khu gieo trồng</label>
                <select
                  value={bulkZone}
                  onChange={(e) => setBulkZone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border p-2.5 bg-white dark:bg-slate-800 text-foreground"
                >
                  <option value="Khu A Đà Lạt - Vườn 1">Khu A Đà Lạt - Vườn 1</option>
                  <option value="Khu B Đà Lạt - Vườn 2">Khu B Đà Lạt - Vườn 2</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-foreground">Số lượng ô cần tạo</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={bulkCount}
                  onChange={(e) => setBulkCount(Math.max(1, parseInt(e.target.value || "1", 10)))}
                  className="mt-1 w-full rounded-xl border border-border p-2.5 bg-white dark:bg-slate-800 text-foreground"
                />
              </div>
              <div>
                <label className="font-semibold text-foreground">Diện tích mỗi ô (m²)</label>
                <input
                  type="number"
                  min={10}
                  max={500}
                  value={bulkArea}
                  onChange={(e) => setBulkArea(Math.max(1, parseInt(e.target.value || "1", 10)))}
                  className="mt-1 w-full rounded-xl border border-border p-2.5 bg-white dark:bg-slate-800 text-foreground"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
              <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                Hủy
              </Button>
              <Button
                size="sm"
                className="bg-emerald-800 text-white"
                onClick={handleBulkCreateSubmit}
              >
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                Xác nhận tạo ({bulkCount} ô)
              </Button>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
}
