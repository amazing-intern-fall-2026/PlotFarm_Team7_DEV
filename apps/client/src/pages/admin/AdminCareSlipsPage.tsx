import * as React from "react";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Check,
  RotateCcw,
  XCircle,
  Maximize2,
  ChevronRight,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import {
  Card,
  Button,
  Box,
} from "@/shared/ui";

interface CareSlip {
  id: string;
  code: string;
  plotLocation: string;
  plotBed: string;
  customerName: string;
  taskDescription: string;
  serviceType: string;
  quotaText: string;
  farmerName: string;
  farmerTag: string;
  farmerAvatarCode: string;
  status: "verified" | "processing" | "pending";
  photoUrl: string;
  camId: string;
  timestamp: string;
  farmerNotes: string;
  moistureAfter: number;
  ndviScore: number;
}

const STORAGE_KEY_ADMIN_CARE_SLIPS = "admin_managed_care_slips_data_v2";

export function AdminCareSlipsPage() {
  const [slips, setSlips] = React.useState<CareSlip[]>(() => {
    try {
      localStorage.removeItem("admin_managed_care_slips_data");
      localStorage.removeItem("admin_care_slips_data");
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_CARE_SLIPS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const hasOldMocks = parsed.some((s: CareSlip) =>
            ["cs-1", "cs-2", "cs-3", "cs-4", "1", "2", "3"].includes(s?.id) ||
            s?.code?.includes("CS-2026") ||
            s?.customerName === "Nguyễn Thu Hà"
          );
          if (hasOldMocks) {
            localStorage.setItem(STORAGE_KEY_ADMIN_CARE_SLIPS, JSON.stringify([]));
            return [];
          }
          return parsed;
        }
      }
    } catch {
      // Ignore storage read error
    }
    localStorage.setItem(STORAGE_KEY_ADMIN_CARE_SLIPS, JSON.stringify([]));
    return [];
  });

  const [selectedSlip, setSelectedSlip] = React.useState<CareSlip | null>(null);
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [actionToast, setActionToast] = React.useState<string | null>(null);

  const totalSlips = slips.length;
  const verifiedCount = slips.filter((s) => s.status === "verified").length;
  const processingCount = slips.filter((s) => s.status === "processing").length;
  const pendingCount = slips.filter((s) => s.status === "pending").length;

  const fertilizerCount = slips.filter((s) => s.serviceType.includes("Bón phân")).length;
  const weedingCount = slips.filter((s) => s.serviceType.includes("Nhổ cỏ")).length;
  const pruningCount = slips.filter((s) => s.serviceType.includes("Tỉa cành")).length;

  React.useEffect(() => {
    if (!selectedSlip && slips.length > 0) {
      setSelectedSlip(slips[0]);
    } else if (selectedSlip && !slips.some((s) => s.id === selectedSlip.id)) {
      setSelectedSlip(slips[0] || null);
    }
  }, [slips, selectedSlip]);

  const handleApprove = (slipId: string) => {
    setSlips((prev) => {
      const updated = prev.map((s) => (s.id === slipId ? { ...s, status: "verified" as const } : s));
      try {
        localStorage.setItem(STORAGE_KEY_ADMIN_CARE_SLIPS, JSON.stringify(updated));
      } catch {
        // Ignore storage write error
      }
      return updated;
    });
    setSelectedSlip((prev) => (prev ? { ...prev, status: "verified" } : null));
    setActionToast(`✓ Đã xác nhận đạt chuẩn QA cho phiếu ${selectedSlip?.code}! Dữ liệu đã ghi nhận vào sổ nhật ký.`);
    setTimeout(() => setActionToast(null), 3500);
  };

  const handleRequestRetake = () => {
    setActionToast(`↻ Đã gửi yêu cầu chụp lại ảnh minh chứng tới ${selectedSlip?.farmerName}!`);
    setTimeout(() => setActionToast(null), 3500);
  };

  const handleReject = () => {
    setActionToast(`⊗ Đã từ chối phiếu ${selectedSlip?.code}. Thông báo kiểm tra lại đã gửi tới đội kỹ thuật.`);
    setTimeout(() => setActionToast(null), 3500);
  };

  const filteredSlips = React.useMemo(() => {
    return slips.filter((slip) => {
      if (statusFilter === "verified" && slip.status !== "verified") return false;
      if (statusFilter === "processing" && slip.status !== "processing") return false;
      if (statusFilter === "pending" && slip.status !== "pending") return false;

      if (activeCategory === "fertilizer" && !slip.serviceType.includes("Bón phân")) return false;
      if (activeCategory === "weeding" && !slip.serviceType.includes("Nhổ cỏ")) return false;
      if (activeCategory === "pruning" && !slip.serviceType.includes("Tỉa cành")) return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        if (
          !slip.code.toLowerCase().includes(q) &&
          !slip.customerName.toLowerCase().includes(q) &&
          !slip.plotLocation.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [slips, statusFilter, activeCategory, searchTerm]);

  return (
    <Box className="w-full space-y-6 pb-16">
      {actionToast && (
        <div className="fixed top-5 right-5 z-50 rounded-xl bg-slate-900 dark:bg-slate-100 px-4 py-3 text-xs font-semibold text-white dark:text-slate-900 shadow-lg animate-fade-in">
          {actionToast}
        </div>
      )}

      <Box className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Box className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span>Hệ thống</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Phiếu Chăm sóc</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-semibold">Giám sát Nghiệm thu QA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Giám sát Phiếu Chăm sóc &amp; Thẩm định Nghiệm thu (QA)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Kiểm tra toàn bộ yêu cầu chăm sóc từ khách hàng và thẩm định minh chứng hình ảnh thực tế của nông dân
          </p>
        </Box>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 self-start lg:self-auto">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          KÊNH QA TRỰC TUYẾN • {pendingCount} Chờ duyệt
        </span>
      </Box>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Phiếu đã hoàn thành</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-foreground">{verifiedCount}</span>
                <span className="text-xs font-medium text-muted-foreground">phiếu</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span>100% có ảnh nghiệm thu xác thực</span>
          </div>
        </Card>

        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Phiếu đang thực hiện ngoài vườn</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-foreground">{processingCount}</span>
                <span className="text-xs font-medium text-muted-foreground">phiếu</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span>Nông dân đang tác nghiệp tại luống</span>
          </div>
        </Card>

        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Phiếu chờ thẩm định ảnh</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-rose-600">{pendingCount}</span>
                <span className="text-xs font-medium text-muted-foreground">phiếu</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-500">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
            <span className="text-rose-600 font-semibold">⏰ Hạn xử lý SLA: dưới 30 phút</span>
          </div>
        </Card>
      </div>

      <Card className="border-border bg-white dark:bg-slate-900 p-4 shadow-xs space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
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
              Tất cả ({totalSlips})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("fertilizer")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === "fertilizer"
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              Bón phân hữu cơ ({fertilizerCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("weeding")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === "weeding"
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              Nhổ cỏ bắt sâu ({weedingCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("pruning")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === "pruning"
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              Tỉa cành xới đất ({pruningCount})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm mã phiếu, khách, ô đất..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-border bg-slate-50/50 dark:bg-slate-800/50 py-1.5 pl-8 pr-3 text-xs font-medium text-foreground focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 border-t border-border pt-3 text-xs">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`rounded-md px-2.5 py-1 font-semibold transition-colors ${
              statusFilter === "all" ? "bg-slate-800 text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300"
            }`}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("verified")}
            className={`rounded-md px-2.5 py-1 font-semibold transition-colors ${
              statusFilter === "verified" ? "bg-emerald-800 text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300"
            }`}
          >
            Đã nghiệm thu ({verifiedCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("processing")}
            className={`rounded-md px-2.5 py-1 font-semibold transition-colors ${
              statusFilter === "processing" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300"
            }`}
          >
            Đang xử lý ({processingCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("pending")}
            className={`rounded-md px-2.5 py-1 font-semibold transition-colors ${
              statusFilter === "pending" ? "bg-amber-700 text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300"
            }`}
          >
            Chờ tiếp nhận (03)
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-sm font-bold text-foreground">Danh sách Phiếu Chăm sóc Cần Thẩm định</h3>
              <span className="text-xs text-muted-foreground">Hiển thị 4 phiếu mới nhất</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 dark:bg-slate-800/60 text-muted-foreground border-b border-border uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3 px-3">MÃ PHIẾU</th>
                    <th className="py-3 px-3">VỊ TRÍ Ô ĐẤT</th>
                    <th className="py-3 px-3">KHÁCH HÀNG</th>
                    <th className="py-3 px-3">DỊCH VỤ &amp; HẠN MỨC</th>
                    <th className="py-3 px-3">NÔNG DÂN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredSlips.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60">
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                          <p className="text-sm font-semibold text-foreground">Chưa có phiếu chăm sóc cần thẩm định</p>
                          <p className="text-xs text-muted-foreground">Tất cả các lượt chăm sóc ngoài vườn sẽ xuất hiện tại đây khi nông dân thực hiện.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredSlips.map((slip) => {
                      const isSelected = selectedSlip?.id === slip.id;
                      return (
                        <tr
                          key={slip.id}
                          onClick={() => setSelectedSlip(slip)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-emerald-50/70 dark:bg-emerald-950/40 font-semibold"
                              : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                          }`}
                        >
                          <td className="py-3.5 px-3 font-bold text-foreground whitespace-nowrap">
                            {slip.code}
                          </td>
                          <td className="py-3.5 px-3">
                            <p className="font-bold text-foreground">{slip.plotLocation}</p>
                            <p className="text-[11px] text-muted-foreground">{slip.plotBed}</p>
                          </td>
                          <td className="py-3.5 px-3">
                            <p className="font-semibold text-foreground">{slip.customerName}</p>
                            <p className="text-[11px] text-muted-foreground truncate max-w-[120px]">{slip.taskDescription}</p>
                          </td>
                          <td className="py-3.5 px-3">
                            <p className="font-semibold text-foreground">{slip.serviceType}</p>
                            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">{slip.quotaText}</p>
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-foreground">
                                {slip.farmerAvatarCode}
                              </span>
                              <span className="truncate max-w-[90px] text-muted-foreground text-[11px]">{slip.farmerName}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground border-t border-border">
              <span>Hiển thị {filteredSlips.length === 0 ? 0 : 1} – {filteredSlips.length} của {totalSlips} phiếu chăm sóc</span>
            </div>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-5">
          <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4">
            {!selectedSlip ? (
              <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-foreground">Chưa chọn phiếu chăm sóc</h3>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Chọn một phiếu chăm sóc từ danh sách bên trái để kiểm tra hình ảnh thực địa và chỉ số NDVI/độ ẩm.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Thẩm Định Ảnh Thực Địa</h3>
                      <p className="text-xs text-muted-foreground">Chi tiết minh chứng phiếu {selectedSlip.code}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-sm">
                    {selectedSlip.id}
                  </span>
                </div>

                <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group">
                  <img
                    src={selectedSlip.photoUrl}
                    alt="Minh chứng thực địa"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-mono text-white backdrop-blur-xs">
                    <MapPin className="h-3 w-3 text-emerald-400" />
                    <span>{selectedSlip.plotLocation} • {selectedSlip.timestamp}</span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 px-2.5 py-1 text-[11px] font-bold text-emerald-300 backdrop-blur-xs">
                    <Check className="h-3 w-3" />
                    <span>GPS Khớp 100%</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => window.open(selectedSlip.photoUrl, "_blank")}
                    className="absolute bottom-3 right-3 rounded-lg bg-black/60 p-1.5 text-white hover:bg-black/80"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3.5 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nông dân thực hiện:</span>
                    <strong className="text-foreground">{selectedSlip.farmerName}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Thiết bị gửi ảnh:</span>
                    <span className="font-mono text-foreground font-medium">{selectedSlip.camId}</span>
                  </div>
                  <div className="rounded-lg bg-white dark:bg-slate-800 p-2.5 border border-border/60">
                    <span className="text-[11px] text-muted-foreground font-semibold">Ghi chú từ nông dân:</span>
                    <p className="text-foreground italic font-medium mt-0.5">&quot;{selectedSlip.farmerNotes}&quot;</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="rounded-lg bg-white dark:bg-slate-800 p-2 border border-border/60">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-muted-foreground">Độ ẩm đất sau bón</span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">Tối ưu</span>
                      </div>
                      <p className="text-lg font-extrabold text-foreground mt-0.5">{selectedSlip.moistureAfter}%</p>
                      <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700 mt-1">
                        <div className="h-full rounded-full bg-emerald-600" style={{ width: `${selectedSlip.moistureAfter}%` }} />
                      </div>
                    </div>

                    <div className="rounded-lg bg-white dark:bg-slate-800 p-2 border border-border/60">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-muted-foreground">Chỉ số sinh khối (NDVI)</span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">Khỏe mạnh</span>
                      </div>
                      <p className="text-lg font-extrabold text-foreground mt-0.5">{selectedSlip.ndviScore}</p>
                      <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700 mt-1">
                        <div className="h-full rounded-full bg-emerald-700" style={{ width: `${selectedSlip.ndviScore * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <Button
                    size="sm"
                    onClick={() => handleApprove(selectedSlip.id)}
                    className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow-xs py-2.5 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Xác nhận đạt chuẩn QA</span>
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRequestRetake}
                      className="flex items-center justify-center gap-1.5 text-xs font-semibold"
                    >
                      <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
                      <span>Yêu cầu chụp lại</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReject}
                      className="flex items-center justify-center gap-1.5 text-xs font-semibold text-rose-600 border-rose-200 hover:bg-rose-50"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      <span>Từ chối duyệt</span>
                    </Button>
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1 pt-1 border-t border-border/60">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Mã hóa minh chứng SHA-256 trên BioCloud Ledger</span>
                </p>
              </>
            )}
          </Card>
        </div>
      </div>

      {actionToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-emerald-900 text-white px-5 py-3 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <span className="text-xs font-bold">{actionToast}</span>
        </div>
      )}
    </Box>
  );
}
