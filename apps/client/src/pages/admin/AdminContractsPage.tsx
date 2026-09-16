import * as React from "react";
import {
  Wallet,
  Hourglass,
  Zap,
  Download,
  Search,
  Calendar,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
} from "lucide-react";
import {
  Card,
  Button,
  Box,
} from "@/shared/ui";

interface ContractItem {
  id: string;
  code: string;
  customerName: string;
  customerPhone: string;
  plotCode: string;
  cropName: string;
  seasonRange: string;
  amount: number;
  qrSyntax: string;
  status: "pending" | "paid";
  countdown?: string;
}

const STORAGE_KEY_ADMIN_CONTRACTS = "admin_managed_contracts_data_v2";

export function AdminContractsPage() {
  const [contracts, setContracts] = React.useState<ContractItem[]>(() => {
    try {
      localStorage.removeItem("admin_managed_contracts_data");
      localStorage.removeItem("admin_contracts_data");
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_CONTRACTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const hasOldMocks = parsed.some((c: ContractItem) =>
            ["c-1", "c-2", "c-3", "c-4", "c-5", "#CF-8921", "c-101", "c-102"].includes(c?.id || c?.code) ||
            c?.customerName === "Nguyễn Thu Hà" ||
            c?.customerName === "Lê Hoàng Nam"
          );
          if (hasOldMocks) {
            localStorage.setItem(STORAGE_KEY_ADMIN_CONTRACTS, JSON.stringify([]));
            return [];
          }
          return parsed;
        }
      }
    } catch {
      /* Ignore exception intentionally */
    }
    localStorage.setItem(STORAGE_KEY_ADMIN_CONTRACTS, JSON.stringify([]));
    return [];
  });

  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | "pending" | "paid">("all");
  const [webhookToast, setWebhookToast] = React.useState<string | null>(null);
  const [selectedContract, setSelectedContract] = React.useState<ContractItem | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalRevenue = React.useMemo(() => {
    return contracts.filter((c) => c.status === "paid").reduce((sum, c) => sum + c.amount, 0);
  }, [contracts]);

  const pendingTotal = React.useMemo(() => {
    return contracts.filter((c) => c.status === "pending").reduce((sum, c) => sum + c.amount, 0);
  }, [contracts]);

  const paidCount = React.useMemo(() => {
    return contracts.filter((c) => c.status === "paid").length;
  }, [contracts]);

  const pendingCount = React.useMemo(() => {
    return contracts.filter((c) => c.status === "pending").length;
  }, [contracts]);

  const reconciliationRate = React.useMemo(() => {
    if (contracts.length === 0) return "100";
    return ((paidCount / contracts.length) * 100).toFixed(1);
  }, [contracts.length, paidCount]);

  const handleSimulateWebhook = (contract: ContractItem) => {
    setContracts((prev) => {
      const updated = prev.map((c) => (c.id === contract.id ? { ...c, status: "paid" as const, countdown: undefined } : c));
      try {
        localStorage.setItem(STORAGE_KEY_ADMIN_CONTRACTS, JSON.stringify(updated));
      } catch {
      /* Ignore exception intentionally */
    }
      return updated;
    });

    setWebhookToast(
      `⚡ Webhook Napas 200 OK: Đã nhận thanh toán [${contract.qrSyntax}] ${contract.amount.toLocaleString("vi-VN")} đ! Hợp đồng ${contract.code} đã tự động kích hoạt.`
    );
    setTimeout(() => setWebhookToast(null), 4000);
  };

  const filteredContracts = React.useMemo(() => {
    return contracts.filter((c) => {
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchCode = c.code.toLowerCase().includes(q);
        const matchName = c.customerName.toLowerCase().includes(q);
        const matchPhone = c.customerPhone.includes(q);
        const matchQr = c.qrSyntax.toLowerCase().includes(q);
        if (!matchCode && !matchName && !matchPhone && !matchQr) return false;
      }
      return true;
    });
  }, [contracts, statusFilter, searchTerm]);

  return (
    <Box className="w-full space-y-6 pb-16">
      <Box className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Box className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span>Hệ thống</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-semibold">Hợp đồng &amp; Thanh toán</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Quản lý Hợp đồng &amp; Đối soát Doanh thu VietQR
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Theo dõi dòng tiền thuê ô đất thanh toán qua VietQR Napas 24/7 và đối soát tự động qua Webhook
          </p>
        </Box>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Webhook Listener: Active (200 OK)
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => alert("Đã xuất báo cáo đối soát doanh thu VietQR ra file Excel!")}
            className="flex items-center gap-2 font-semibold shadow-xs"
          >
            <Download className="h-4 w-4" />
            <span>Xuất báo cáo Excel</span>
          </Button>
        </div>
      </Box>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">TỔNG THỰC THU (NAPAS 24/7)</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
                {totalRevenue.toLocaleString("vi-VN")} đ
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
              +{paidCount} đơn đã thanh toán
            </span>
            <span className="text-xs text-muted-foreground">Thanh toán tự động</span>
          </div>
        </Card>

        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">TIỀN ĐANG CHỜ CHUYỂN KHOẢN</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-amber-700 dark:text-amber-400">
                {pendingTotal.toLocaleString("vi-VN")} đ
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600">
              <Hourglass className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <span>{pendingCount} hợp đồng đang giữ chỗ (10 phút)</span>
            <span className="text-amber-700 font-semibold">Tự nhả ô khi quá hạn</span>
          </div>
        </Card>

        <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">TỶ LỆ ĐỐI SOÁT TỰ ĐỘNG</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
                {reconciliationRate}% <span className="text-xs font-normal text-muted-foreground">qua Webhook</span>
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600">
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>Khớp tức thời qua mã đơn VietQR</span>
          </div>
        </Card>
      </div>

      <Card className="border-border bg-white dark:bg-slate-900 p-4 shadow-xs space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm theo mã HĐ (#CF-8921), SĐT, tên khách"
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

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "pending" | "paid")}
              className="rounded-xl border border-border bg-white dark:bg-slate-800 px-3 py-2 text-xs font-semibold text-foreground focus:outline-hidden"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ thanh toán</option>
              <option value="paid">Đã khớp Napas</option>
            </select>

            <div className="flex items-center gap-2 rounded-xl border border-border bg-white dark:bg-slate-800 px-3 py-2 text-xs font-semibold text-foreground">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>Vụ mùa Đông Xuân 2026</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground self-end lg:self-auto">
            <RefreshCw className="h-3.5 w-3.5 text-emerald-600 animate-spin" />
            <span>Napas VietQR Vụ Mùa • Đồng bộ tức thời: <strong>0.8s</strong></span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/80">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 dark:bg-slate-800/60 text-muted-foreground border-b border-border uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Mã HĐ</th>
                <th className="py-3.5 px-4">Khách Hàng</th>
                <th className="py-3.5 px-4">Ô Đất &amp; Giống</th>
                <th className="py-3.5 px-4">Chu Kỳ Vụ Mùa</th>
                <th className="py-3.5 px-4">Số Tiền</th>
                <th className="py-3.5 px-4">Cú Pháp VietQR</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-medium">
              {filteredContracts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60">
                        <Wallet className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Chưa có hợp đồng nào phát sinh</p>
                        <p className="text-xs text-muted-foreground mt-0.5 max-w-sm mx-auto">
                          Hệ thống đang sẵn sàng tiếp nhận và đối soát tự động qua Webhook Napas 24/7 khi khách đặt thuê ô đất.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredContracts.map((contract) => (
                  <tr
                    key={contract.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-bold text-foreground">
                      {contract.code}
                    </td>
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-bold text-foreground">{contract.customerName}</p>
                        <p className="text-[11px] text-muted-foreground font-mono">{contract.customerPhone}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded-sm bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 font-mono text-[11px] font-bold text-blue-700 dark:text-blue-300">
                          {contract.plotCode}
                        </span>
                        <span className="text-slate-700 dark:text-slate-300">{contract.cropName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 text-[11px]">
                      {contract.seasonRange}
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-foreground whitespace-nowrap">
                      {contract.amount.toLocaleString("vi-VN")} đ
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/40 px-2 py-1 font-mono text-xs font-bold text-amber-900 dark:text-amber-300">
                        {contract.qrSyntax}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {contract.status === "paid" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          Đã khớp Napas
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
                          <Hourglass className="h-3.5 w-3.5 text-amber-600" />
                          Chờ thanh toán ({contract.countdown})
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          title="Xem chi tiết"
                          onClick={() => setSelectedContract(contract)}
                          className="rounded-lg p-1.5 text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {contract.status === "pending" && (
                          <button
                            type="button"
                            onClick={() => handleSimulateWebhook(contract)}
                            className="inline-flex items-center gap-1 rounded-lg bg-amber-700 hover:bg-amber-800 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs transition-all active:scale-95"
                          >
                            <Zap className="h-3 w-3" />
                            <span>Giả lập Webhook</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2 text-xs text-muted-foreground">
          <span>
            Hiển thị <strong>{filteredContracts.length === 0 ? 0 : (currentPage - 1) * 10 + 1} – {Math.min(currentPage * 10, filteredContracts.length)}</strong> trên tổng số <strong>{contracts.length}</strong> hợp đồng
          </span>

          {filteredContracts.length > 10 && (
            <div className="flex items-center gap-1 self-end sm:self-auto">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Trang trước
              </button>
              <button type="button" className="h-7 w-7 rounded-lg bg-emerald-800 text-white font-bold text-xs">1</button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => p + 1)}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Trang sau
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </Card>

      {webhookToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-slate-900 text-white p-4 shadow-2xl border border-slate-700 animate-in slide-in-from-bottom duration-300 max-w-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <Zap className="h-5 w-5" />
          </div>
          <div className="text-xs leading-relaxed">
            <p className="font-bold text-emerald-400">Webhook Napas 200 OK</p>
            <p className="text-slate-200 mt-0.5">{webhookToast}</p>
          </div>
        </div>
      )}

      {selectedContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-border space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">Chi Tiết Hợp Đồng {selectedContract.code}</h3>
              <button
                type="button"
                onClick={() => setSelectedContract(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs divide-y divide-border/60">
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Khách hàng:</span>
                <strong className="text-foreground">{selectedContract.customerName} ({selectedContract.customerPhone})</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Ô đất &amp; Giống:</span>
                <strong className="text-foreground">{selectedContract.plotCode} – {selectedContract.cropName}</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Chu kỳ vụ mùa:</span>
                <span className="text-foreground">{selectedContract.seasonRange}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Số tiền:</span>
                <strong className="text-lg font-bold text-emerald-700">{selectedContract.amount.toLocaleString("vi-VN")} đ</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Cú pháp VietQR Napas:</span>
                <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-sm">{selectedContract.qrSyntax}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Trạng thái:</span>
                <span className="font-bold text-foreground">{selectedContract.status === "paid" ? "Đã thanh toán thành công" : "Đang chờ thanh toán"}</span>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-border">
              <Button size="sm" onClick={() => setSelectedContract(null)}>
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
}
