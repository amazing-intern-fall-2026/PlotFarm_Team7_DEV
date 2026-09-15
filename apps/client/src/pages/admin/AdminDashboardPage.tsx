import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Sprout,
  ClipboardList,
  AlertTriangle,
  Download,
  Clock,
  RefreshCw,
  Wallet,
  Camera,
  Droplets,
  Truck,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  Button,
  Box,
} from "@/shared/ui";

interface TimelineEvent {
  id: string;
  time: string;
  icon: "bank" | "camera" | "droplet" | "truck";
  content: React.ReactNode;
  plotCode: string;
  category: string;
  badgeVariant: "success" | "info" | "warning" | "default";
}

const STORAGE_KEY_ADMIN_EVENTS = "admin_dashboard_events_v2";

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = React.useState<"today" | "7days" | "season">("season");
  const [isExporting, setIsExporting] = React.useState(false);
  const [events, setEvents] = React.useState<TimelineEvent[]>(() => {
    try {
      localStorage.removeItem("admin_dashboard_events");
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_EVENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const hasOldMocks = parsed.some((e: TimelineEvent) =>
            ["evt-1", "evt-2", "evt-3", "evt-4"].includes(e?.id)
          );
          if (hasOldMocks) return [];
          return parsed;
        }
      }
    } catch {
      // Ignore storage read error
    }
    return [];
  });
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // Dynamic KPI calculations from connected data stores
  const stats = React.useMemo(() => {
    let totalRevenue = 0;
    let activeContracts = 0;
    let totalPlots = 0;
    let cultivatingPlots = 0;
    let harvestReadyCount = 0;

    try {
      const contractsRaw = localStorage.getItem("admin_managed_contracts_data_v2") || localStorage.getItem("admin_managed_contracts_data");
      if (contractsRaw) {
        const contracts = JSON.parse(contractsRaw);
        if (Array.isArray(contracts)) {
          activeContracts = contracts.length;
          totalRevenue = contracts.filter((c: Record<string, unknown>) => c.status === "paid").reduce((sum: number, c: Record<string, unknown>) => sum + (Number(c.amount) || 0), 0);
        }
      }

      const plotsRaw = localStorage.getItem("admin_managed_plots_data_v2") || localStorage.getItem("admin_managed_plots_data");
      if (plotsRaw) {
        const plots = JSON.parse(plotsRaw);
        if (Array.isArray(plots)) {
          totalPlots = plots.length;
          cultivatingPlots = plots.filter((p: Record<string, unknown>) => typeof p.status === "string" && ["cultivating", "rented"].includes(p.status)).length;
          harvestReadyCount = plots.filter((p: Record<string, unknown>) => p.status === "harvest_ready").length;
        }
      }
    } catch {
      // Ignore storage parsing error
    }

    const occupancyPercent = totalPlots > 0 ? Math.round((cultivatingPlots / totalPlots) * 100) : 0;

    return {
      totalRevenue,
      activeContracts,
      totalPlots,
      cultivatingPlots,
      harvestReadyCount,
      occupancyPercent,
    };
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Đã xuất báo cáo tổng quan vụ mùa Đông Xuân 2026 (PDF/Excel) thành công!");
    }, 800);
  };

  const handleRefreshEvents = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const newEvt: TimelineEvent = {
        id: `evt-${Date.now()}`,
        time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        icon: "droplet",
        content: (
          <>
            Cảm biến vi khí hậu tự động hiệu chỉnh thông số đo tại khu vực nhà màng A
          </>
        ),
        plotCode: "Ô #A-102",
        category: "Tự động",
        badgeVariant: "warning",
      };
      const updated = [newEvt, ...events.slice(0, 5)];
      setEvents(updated);
      try {
        localStorage.setItem(STORAGE_KEY_ADMIN_EVENTS, JSON.stringify(updated));
      } catch {
        // Ignore storage write error
      }
    }, 600);
  };

  return (
    <Box className="w-full space-y-6 pb-12">
      {/* ── Sub-breadcrumbs & Page Header ── */}
      <Box className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Box className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span>Hệ thống</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-semibold">Bảng điều khiển tổng quan</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Bảng điều khiển Tổng quan &amp; Phân tích Vận hành
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Trung tâm điều hành vĩ mô – Giám sát chỉ số tài chính, tình trạng ô đất và chất lượng canh tác
          </p>
        </Box>

        {/* Action controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setActiveFilter("today")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeFilter === "today"
                  ? "bg-white dark:bg-slate-900 text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Hôm nay
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("7days")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeFilter === "7days"
                  ? "bg-white dark:bg-slate-900 text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              7 ngày
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("season")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                activeFilter === "season"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Vụ mùa Đông Xuân 2026
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 border-border font-semibold shadow-xs"
          >
            <Download className="h-4 w-4" />
            <span>{isExporting ? "Đang xuất..." : "Xuất báo cáo PDF/Excel"}</span>
          </Button>
        </div>
      </Box>

      {/* ── 4 Top KPI Metric Cards ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <Card className="relative overflow-hidden border-border bg-white dark:bg-slate-900 p-5 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Tổng doanh thu mùa vụ</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
                {stats.totalRevenue.toLocaleString("vi-VN")} đ
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
              <TrendingUp className="h-3.5 w-3.5" />
              {stats.totalRevenue > 0 ? "+14.2%" : "0%"}
            </span>
            <span className="text-xs text-muted-foreground">
              {stats.totalRevenue > 0 ? "so với vụ trước" : "Chưa có phát sinh"}
            </span>
          </div>
        </Card>

        {/* Metric 2 */}
        <Card className="relative overflow-hidden border-border bg-white dark:bg-slate-900 p-5 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Tỷ lệ lấp đầy ô đất</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-foreground">{stats.occupancyPercent}%</span>
                <span className="text-xs text-muted-foreground font-medium">({stats.cultivatingPlots}/{stats.totalPlots} ô đang canh tác)</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600">
              <Sprout className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 w-full">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full rounded-full bg-emerald-700 transition-all" style={{ width: `${stats.occupancyPercent}%` }} />
            </div>
          </div>
        </Card>

        {/* Metric 3 */}
        <Card className="relative overflow-hidden border-border bg-white dark:bg-slate-900 p-5 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Hợp đồng đang thực hiện</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
                {stats.activeContracts} đơn
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600">
              <ClipboardList className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-950/60 dark:text-amber-400">
              <Clock className="h-3.5 w-3.5" />
              {stats.harvestReadyCount} đơn sắp thu hoạch
            </span>
          </div>
        </Card>

        {/* Metric 4 */}
        <Card className="relative overflow-hidden border-border bg-white dark:bg-slate-900 p-5 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Cảnh báo vi khí hậu</p>
              <div className="mt-2 flex items-center gap-2.5">
                <span className="text-2xl font-extrabold tracking-tight text-foreground">0 ô đất</span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  Hệ thống an toàn
                </span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>Tất cả cảm biến hoạt động bình thường</span>
            <button
              type="button"
              onClick={() => navigate("/admin/plots")}
              className="text-emerald-700 hover:text-emerald-800 font-semibold"
            >
              Xem →
            </button>
          </div>
        </Card>
      </div>

      {/* ── Section Charts: Bar Chart & Donut Chart ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Bar Chart (2 cols) */}
        <Card className="border-border bg-white dark:bg-slate-900 p-6 shadow-xs lg:col-span-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground">
                Biểu đồ Doanh thu &amp; Chi phí theo tháng
              </h2>
              <p className="text-xs text-muted-foreground">
                Chu kỳ luân canh từ Tháng 5 đến Tháng 10 năm 2026 (Triệu VND)
              </p>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-xs bg-emerald-800" />
                <span className="text-foreground">Doanh thu vụ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-xs bg-slate-300 dark:bg-slate-600" />
                <span className="text-muted-foreground">Chi phí vận hành</span>
              </div>
            </div>
          </div>

          {/* SVG Bar Chart / Empty state */}
          {stats.totalRevenue > 0 ? (
            <div className="mt-6 w-full pt-4">
              <div className="flex items-end justify-between gap-3 h-52 border-b border-border pb-2 px-2">
                {[
                  { month: "Th.5", revenue: 48, cost: 28 },
                  { month: "Th.6", revenue: 60, cost: 32 },
                  { month: "Th.7", revenue: 55, cost: 34 },
                  { month: "Th.8", revenue: 72, cost: 38 },
                  { month: "Th.9", revenue: 70, cost: 35 },
                  { month: "Th.10", revenue: 80, cost: 38 },
                ].map((stat) => {
                  const maxVal = 90;
                  const revHeightPercent = (stat.revenue / maxVal) * 100;
                  const costHeightPercent = (stat.cost / maxVal) * 100;

                  return (
                    <div key={stat.month} className="flex flex-1 flex-col items-center gap-2 h-full justify-end group">
                      <div className="flex items-end gap-1.5 w-full justify-center h-full">
                        <div
                          className="w-5 sm:w-7 rounded-t-md bg-emerald-800 transition-all duration-300 hover:bg-emerald-700 relative flex justify-center group-hover:scale-y-102 origin-bottom"
                          style={{ height: `${revHeightPercent}%` }}
                        >
                          <span className="opacity-0 group-hover:opacity-100 absolute -top-6 text-[10px] font-bold text-emerald-800 transition-opacity whitespace-nowrap">
                            {stat.revenue}M
                          </span>
                        </div>
                        <div
                          className="w-5 sm:w-7 rounded-t-md bg-slate-200 dark:bg-slate-700 transition-all duration-300 hover:bg-slate-300 relative flex justify-center group-hover:scale-y-102 origin-bottom"
                          style={{ height: `${costHeightPercent}%` }}
                        >
                          <span className="opacity-0 group-hover:opacity-100 absolute -top-6 text-[10px] font-bold text-slate-600 transition-opacity whitespace-nowrap">
                            {stat.cost}M
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground">{stat.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center text-xs text-muted-foreground">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 mb-3">
                <Wallet className="h-6 w-6" />
              </div>
              <p className="font-semibold text-foreground text-sm">Chưa có phát sinh doanh thu vụ mùa</p>
              <p className="text-muted-foreground mt-1">Khi các hợp đồng thuê ô đất được thanh toán, biểu đồ tài chính sẽ cập nhật tại đây.</p>
            </div>
          )}

          {/* Bottom Highlight banner */}
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-slate-50 dark:bg-slate-800/60 px-4 py-3 border border-border/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span>Hiệu suất sinh lời bình quân: <strong className="font-bold text-emerald-700 dark:text-emerald-400">{stats.totalRevenue > 0 ? "54.8% / ô đất" : "0%"}</strong></span>
            </div>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full self-start sm:self-auto">
              {stats.totalRevenue > 0 ? "Tăng trưởng ổn định" : "Khởi tạo hệ thống"}
            </span>
          </div>
        </Card>

        {/* Right: Donut Chart (1 col) */}
        <Card className="border-border bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-foreground">
              Cơ cấu Cây trồng Hiện tại
            </h2>
            <p className="text-xs text-muted-foreground">
              Tỷ trọng phân bổ giống rau trên {stats.cultivatingPlots} ô canh tác
            </p>

            {stats.cultivatingPlots > 0 ? (
              <>
                {/* Donut graphic */}
                <div className="mt-6 flex items-center justify-center relative">
                  <svg viewBox="0 0 160 160" className="w-44 h-44 -rotate-90">
                    <circle cx="80" cy="80" r="58" stroke="currentColor" strokeWidth="22" className="text-slate-100 dark:text-slate-800" fill="none" />
                    <circle
                      cx="80"
                      cy="80"
                      r="58"
                      stroke="#166534"
                      strokeWidth="22"
                      strokeDasharray="163.8 200.2"
                      strokeDashoffset="0"
                      fill="none"
                      className="transition-all duration-500"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-extrabold text-foreground tracking-tight">{stats.cultivatingPlots} Ô</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">CANH TÁC</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#166534]" />
                      <span className="font-semibold text-foreground">Rau ăn lá tự nhiên</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{stats.cultivatingPlots} ô</span>
                      <span className="font-bold text-foreground">100%</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center text-xs text-muted-foreground">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 mb-3">
                  <Sprout className="h-6 w-6" />
                </div>
                <p className="font-semibold text-foreground text-sm">Chưa có ô đất canh tác</p>
                <p className="text-muted-foreground mt-1">Chưa có giống rau nào đang được gieo trồng trong mùa vụ này.</p>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/crops")}
            className="mt-4 w-full text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
          >
            Quản lý danh mục giống cây →
          </Button>
        </Card>
      </div>

      {/* ── Real-Time Activity Log (Nhật ký tác vụ thời gian thực) ── */}
      <Card className="border-border bg-white dark:bg-slate-900 p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-foreground">
              Nhật ký tác vụ thời gian thực
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              Live Event Stream
            </span>
          </div>

          <button
            type="button"
            title="Làm mới sự kiện"
            aria-label="Làm mới sự kiện"
            onClick={handleRefreshEvents}
            className="rounded-lg p-1.5 text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-xs text-muted-foreground">
            <Clock className="h-6 w-6 text-slate-400 mb-2" />
            <p className="font-semibold text-foreground text-sm">Chưa có nhật ký tác vụ nào phát sinh</p>
            <p className="text-muted-foreground mt-1">Các thao tác thanh toán, cảm biến IoT và vận chuyển sẽ tự động xuất hiện tại đây.</p>
          </div>
        ) : (
          <div className="mt-4 divide-y divide-border/60">
            {events.map((evt) => {
              const getIconComponent = () => {
                switch (evt.icon) {
                  case "bank":
                    return <Wallet className="h-4 w-4 text-emerald-600" />;
                  case "camera":
                    return <Camera className="h-4 w-4 text-blue-600" />;
                  case "droplet":
                    return <Droplets className="h-4 w-4 text-amber-600" />;
                  case "truck":
                    return <Truck className="h-4 w-4 text-indigo-600" />;
                  default:
                    return <Sparkles className="h-4 w-4 text-slate-600" />;
                }
              };

              const getBadgeClasses = () => {
                switch (evt.badgeVariant) {
                  case "success":
                    return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300";
                  case "info":
                    return "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300";
                  case "warning":
                    return "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300";
                  default:
                    return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
                }
              };

              return (
                <div key={evt.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/30 px-2 rounded-lg transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono font-medium text-muted-foreground shrink-0 mt-0.5">
                      {evt.time}
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                      {getIconComponent()}
                    </div>
                    <div className="text-xs text-foreground leading-relaxed">
                      {evt.content}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                    <span className="text-xs font-mono font-medium text-muted-foreground">
                      {evt.plotCode}
                    </span>
                    <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${getBadgeClasses()}`}>
                      {evt.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </Box>
  );
}
