import * as React from "react";
import {
  Plus,
  RefreshCw,
  Search,
  Filter,
  Users,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Zap,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import {
  Card,
  Button,
  Box,
  Avatar,
} from "@/shared/ui";

interface FarmerMatrixRow {
  id: string;
  name: string;
  code: string;
  avatar: string;
  team: string;
  zone: string;
  plots: string[];
  workloadPercent: number;
  workloadStatus: "optimal" | "underloaded" | "overloaded";
  workloadLabel: string;
  tasksPending: number;
  tasksInProgress: number;
  verificationRate: number;
}

const STORAGE_KEY_ADMIN_FARMERS = "admin_managed_farmers_data_v2";

export function AdminFarmersPage() {
  const [farmers, setFarmers] = React.useState<FarmerMatrixRow[]>(() => {
    try {
      localStorage.removeItem("admin_managed_farmers_data");
      localStorage.removeItem("admin_farmers_data");
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_FARMERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const hasOldMocks = parsed.some((f: FarmerMatrixRow) =>
            ["f-1", "f-2", "f-3", "f-4", "1", "2", "3"].includes(f?.id) ||
            f?.name?.includes("Bác Bảy") ||
            f?.name?.includes("Chú Năm")
          );
          if (hasOldMocks) {
            localStorage.setItem(STORAGE_KEY_ADMIN_FARMERS, JSON.stringify([]));
            return [];
          }
          return parsed;
        }
      }
    } catch {
      /* Ignore exception intentionally */
    }
    localStorage.setItem(STORAGE_KEY_ADMIN_FARMERS, JSON.stringify([]));
    return [];
  });

  const [searchTerm, setSearchTerm] = React.useState("");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalFarmers = farmers.length;
  const totalPlotsAssigned = farmers.reduce((sum, f) => sum + f.plots.length, 0);
  const overloadedFarmers = farmers.filter((f) => f.workloadStatus === "overloaded" || f.plots.length > 5);

  const handleAutoRebalance = () => {
    if (farmers.length === 0) {
      const sampleRebalanced: FarmerMatrixRow[] = [
        {
          id: "f-2",
          name: "Chú Năm",
          code: "NV-012",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
          team: "Đội Vườn 2",
          zone: "Phụ trách Khu B",
          plots: ["#A-107", "#B-201"],
          workloadPercent: 50,
          workloadStatus: "optimal",
          workloadLabel: "Tối ưu",
          tasksPending: 2,
          tasksInProgress: 1,
          verificationRate: 99.1,
        },
        {
          id: "f-4",
          name: "Cô Sáu",
          code: "NV-019",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
          team: "Đội Vườn 3",
          zone: "Phụ trách Khu C",
          plots: ["#B-211", "#C-302"],
          workloadPercent: 50,
          workloadStatus: "optimal",
          workloadLabel: "Tối ưu",
          tasksPending: 1,
          tasksInProgress: 1,
          verificationRate: 100,
        },
      ];
      setFarmers(sampleRebalanced);
      try {
        localStorage.setItem(STORAGE_KEY_ADMIN_FARMERS, JSON.stringify(sampleRebalanced));
      } catch {
      /* Ignore exception intentionally */
    }
      setToastMessage("⚡ AI Cân Bằng Tải Thành Công: Đã gán ô #A-107 cho Chú Năm và ô #B-211 cho Cô Sáu!");
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    const updated = farmers.map((f) => {
      if (f.id === "f-2") {
        return {
          ...f,
          plots: [...f.plots, "#A-107"],
          workloadPercent: 80,
          workloadStatus: "optimal" as const,
          workloadLabel: "Tối ưu",
        };
      }
      if (f.id === "f-4") {
        return {
          ...f,
          plots: [...f.plots, "#B-211"],
          workloadPercent: 80,
          workloadStatus: "optimal" as const,
          workloadLabel: "Tối ưu",
        };
      }
      return f;
    });

    setFarmers(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_FARMERS, JSON.stringify(updated));
    } catch {
      /* Ignore exception intentionally */
    }

    setToastMessage("⚡ AI Cân Bằng Tải Thành Công: Đã gán ô #A-107 cho Chú Năm và ô #B-211 cho Cô Sáu! Định mức toàn hệ thống đạt tối ưu.");
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredFarmers = React.useMemo(() => {
    if (!searchTerm.trim()) return farmers;
    const q = searchTerm.toLowerCase();
    return farmers.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.code.toLowerCase().includes(q) ||
        f.team.toLowerCase().includes(q) ||
        f.plots.some((p) => p.toLowerCase().includes(q))
    );
  }, [farmers, searchTerm]);

  return (
    <Box className="w-full space-y-6 pb-16">
      <Box className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Box className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span>Hệ thống</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-semibold">Điều phối Nông dân</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Ma trận Điều phối Nông dân &amp; Cân bằng Tải <span className="text-muted-foreground font-normal text-xl">({totalFarmers} nhân sự)</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Giám sát định mức ô đất trên từng nông dân, tỷ lệ hoàn thành nghiệm thu và cảnh báo quá tải
          </p>
        </Box>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => alert("Đã đồng bộ lại chỉ số tải nông dân từ trạm IoT!")}
            className="flex items-center gap-1.5 font-semibold text-xs shadow-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Đồng bộ tức thời</span>
          </Button>

          <Button
            size="sm"
            onClick={() => handleAutoRebalance()}
            className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>+ Phân công ô đất mới</span>
          </Button>
        </div>
      </Box>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">NÔNG DÂN ĐANG LÀM VIỆC</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-foreground">{totalFarmers}</span>
                <span className="text-xs font-medium text-muted-foreground">nhân sự</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Trạng thái hoạt động bình thường</span>
          </div>
        </Card>

        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold text-muted-foreground">TỔNG Ô ĐẤT ĐANG CHĂM SÓC</p>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {totalPlotsAssigned > 0 ? `${totalPlotsAssigned} ô` : "0 ô"}
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-foreground">{totalPlotsAssigned}</span>
                <span className="text-xs font-medium text-muted-foreground">ô canh tác</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
              <MapPin className="h-5 w-5" />
            </div>
          </div>
          <div className="w-full pt-1">
            <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-700" style={{ width: totalPlotsAssigned > 0 ? "50%" : "0%" }} />
            </div>
          </div>
        </Card>

        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold text-muted-foreground">CẢNH BÁO QUÁ TẢI (&gt; 5 Ô)</p>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  overloadedFarmers.length > 0
                    ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                    : "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                }`}>
                  {overloadedFarmers.length > 0 ? "Cần san tải" : "Bình thường"}
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className={`text-3xl font-extrabold ${overloadedFarmers.length > 0 ? "text-rose-600" : "text-foreground"}`}>
                  {overloadedFarmers.length}
                </span>
                <span className="text-xs font-medium text-muted-foreground">nhân sự quá ngưỡng</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
            {overloadedFarmers.length > 0 ? (
              <span className="text-rose-600 font-semibold">{overloadedFarmers[0].name} đang gánh tải cao</span>
            ) : (
              <span>Tất cả nông dân đều trong tải an toàn</span>
            )}
          </div>
        </Card>
      </div>

      <Card className="border-border bg-white dark:bg-slate-900 p-4 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm theo tên, mã nông dân, khu đất..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-border bg-slate-50/50 dark:bg-slate-800/50 py-2 pl-9 pr-4 text-xs font-medium text-foreground focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => alert("Lọc theo Đội Vườn")}
              className="flex items-center gap-1.5 text-xs font-semibold"
            >
              <Filter className="h-3.5 w-3.5" />
              <span>Bộ lọc đội</span>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
              <span className="text-foreground">Tối ưu (4 ô)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="text-foreground">Còn trống (&lt; 4 ô)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
              <span className="text-rose-600 font-bold">Quá tải (&gt; 5 ô)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-border/80">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 dark:bg-slate-800/60 text-muted-foreground border-b border-border uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">NÔNG DÂN</th>
                <th className="py-3.5 px-4">ĐỘI PHỤ TRÁCH</th>
                <th className="py-3.5 px-4">Ô ĐẤT ĐANG CHĂM SÓC</th>
                <th className="py-3.5 px-4">ĐÁNH GIÁ TẢI CÔNG VIỆC</th>
                <th className="py-3.5 px-4">NHIỆM VỤ HÔM NAY</th>
                <th className="py-3.5 px-4">TỶ LỆ NGHIỆM THU</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-medium">
              {filteredFarmers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60">
                        <Users className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-semibold text-foreground">Chưa có dữ liệu điều phối nông dân</p>
                      <p className="text-xs text-muted-foreground">Nhấn &ldquo;+ Phân công ô đất mới&rdquo; hoặc áp dụng cân bằng tải để bắt đầu.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredFarmers.map((farmer) => {
                  const getWorkloadBar = () => {
                    if (farmer.workloadStatus === "overloaded") {
                      return {
                        barColor: "bg-rose-600",
                        badgeClasses: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-bold",
                      };
                    }
                    if (farmer.workloadStatus === "underloaded") {
                      return {
                        barColor: "bg-amber-500",
                        badgeClasses: "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold",
                      };
                    }
                    return {
                      barColor: "bg-emerald-700",
                      badgeClasses: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold",
                    };
                  };

                  const wl = getWorkloadBar();

                  return (
                    <tr key={farmer.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={farmer.name} size="sm" src={farmer.avatar} />
                          <div>
                            <p className="font-bold text-foreground flex items-center gap-1.5">
                              {farmer.name}
                              {farmer.workloadStatus === "overloaded" && (
                                <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                              )}
                            </p>
                            <p className="text-[11px] font-mono text-muted-foreground">{farmer.code}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-foreground">{farmer.team}</p>
                        <p className="text-[11px] text-muted-foreground">{farmer.zone}</p>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap items-center gap-1 max-w-xs">
                          <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 mr-1">
                            {farmer.plots.length} ô đất
                          </span>
                          <span className="text-[11px] font-mono text-muted-foreground truncate">
                            ({farmer.plots.join(", ")})
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 min-w-[160px]">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-foreground">{farmer.workloadPercent}%</span>
                            <span className={`rounded-sm px-1.5 py-0.5 text-[10px] ${wl.badgeClasses}`}>
                              {farmer.workloadLabel}
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className={`h-full rounded-full ${wl.barColor}`} style={{ width: `${Math.min(100, farmer.workloadPercent)}%` }} />
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                        {farmer.tasksPending} việc chờ • <strong className="text-foreground">{farmer.tasksInProgress} việc đang làm</strong>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        {farmer.verificationRate}% ảnh hợp lệ
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between pt-3 text-xs text-muted-foreground">
          <span>Hiển thị {filteredFarmers.length === 0 ? 0 : 1} – {filteredFarmers.length} trong tổng số {totalFarmers} nông dân hệ thống</span>
          {filteredFarmers.length > 10 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-7 w-7 rounded-lg border border-border flex items-center justify-center hover:bg-slate-100 disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="font-semibold text-foreground px-2">Trang {currentPage}</span>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => p + 1)}
                className="h-7 w-7 rounded-lg border border-border flex items-center justify-center hover:bg-slate-100"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </Card>

      <div className="rounded-2xl border border-amber-200/80 dark:border-amber-800/40 bg-gradient-to-r from-amber-50 via-orange-50/50 to-emerald-50 dark:from-amber-950/40 dark:via-orange-950/20 dark:to-emerald-950/30 p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 shrink-0">
            <Zap className="h-5 w-5" />
          </div>
          <div className="text-xs leading-relaxed text-foreground">
            <strong className="font-bold text-amber-900 dark:text-amber-300">Đề xuất AI Cân bằng tải: </strong>
            Có 2 ô mới thanh toán (<strong className="font-mono text-emerald-800 dark:text-emerald-400">#A-107</strong>, <strong className="font-mono text-emerald-800 dark:text-emerald-400">#B-211</strong>) chưa có người chăm. Đề xuất gán cho <strong className="font-semibold text-foreground">Chú Năm</strong> &amp; <strong className="font-semibold text-foreground">Cô Sáu</strong> để đạt chuẩn định mức.
          </div>
        </div>

        <Button
          size="sm"
          onClick={handleAutoRebalance}
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs shrink-0 self-end sm:self-auto flex items-center gap-1.5"
        >
          <Zap className="h-3.5 w-3.5" />
          <span>Gán tự động 1 chạm</span>
        </Button>
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-emerald-900 text-white px-5 py-3.5 shadow-2xl animate-in slide-in-from-bottom duration-300 max-w-lg">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold leading-relaxed">{toastMessage}</span>
        </div>
      )}
    </Box>
  );
}
