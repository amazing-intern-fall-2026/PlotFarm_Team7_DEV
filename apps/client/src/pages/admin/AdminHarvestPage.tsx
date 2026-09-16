import * as React from "react";
import {
  Truck,
  Sprout,
  RefreshCw,
  Printer,
  Search,
  CheckCircle2,
  FileText,
  Thermometer,
  RotateCcw,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Radio,
  Clock,
  Box as BoxIcon,
  X,
  QrCode,
} from "lucide-react";
import {
  Card,
  Button,
} from "@/shared/ui";

interface ShipmentOrder {
  id: string;
  waybillCode: string;
  plotCode: string;
  cropName: string;
  growthDay: string;
  recipientName: string;
  recipientAddress: string;
  recipientPhone: string;
  actualYieldKg: number;
  yieldStatus: "standard" | "exceeded";
  boxPhotoUrl: string;
  status: "pending_export" | "waybill_created" | "delivering" | "delivered";
  deliveryTemp: string;
  createdAt: string;
}

const STORAGE_KEY_ADMIN_HARVEST = "admin_managed_harvest_data_v2";

export function AdminHarvestPage() {
  const [shipments, setShipments] = React.useState<ShipmentOrder[]>(() => {
    try {
      localStorage.removeItem("admin_managed_harvest_data");
      localStorage.removeItem("admin_harvest_data");
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_HARVEST);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const hasOldMocks = parsed.some((s: ShipmentOrder) =>
            !s?.id ||
            ["shp-1", "shp-2", "shp-3", "shp-4", "shp-5", "shp-6", "shp-7", "shp-8", "1", "2", "3"].includes(s?.id) ||
            s?.waybillCode?.includes("AGRI")
          );
          if (hasOldMocks) {
            localStorage.setItem(STORAGE_KEY_ADMIN_HARVEST, JSON.stringify([]));
            return [];
          }
          return parsed;
        }
      }
    } catch {
      // Ignore storage read error
    }
    localStorage.setItem(STORAGE_KEY_ADMIN_HARVEST, JSON.stringify([]));
    return [];
  });

  const [filterTab, setFilterTab] = React.useState<"all" | "pending_export" | "delivering" | "delivered">("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [regionFilter, setRegionFilter] = React.useState("all");
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [apiLatency, setApiLatency] = React.useState(42);
  const [showA6Modal, setShowA6Modal] = React.useState(false);
  const [selectedShipmentForA6, setSelectedShipmentForA6] = React.useState<ShipmentOrder | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [zoomPhotoUrl, setZoomPhotoUrl] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const countAll = shipments.length;
  const countPending = shipments.filter((s) => s.status === "pending_export").length;
  const countDelivering = shipments.filter((s) => s.status === "delivering" || s.status === "waybill_created").length;
  const countDelivered = shipments.filter((s) => s.status === "delivered").length;
  const totalYieldKg = shipments.reduce((sum, s) => sum + s.actualYieldKg, 0);

  const filteredShipments = React.useMemo(() => {
    return shipments.filter((item) => {
      const matchSearch =
        item.waybillCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.plotCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cropName.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      if (filterTab === "pending_export") return item.status === "pending_export";
      if (filterTab === "delivering") return item.status === "delivering" || item.status === "waybill_created";
      if (filterTab === "delivered") return item.status === "delivered";

      return true;
    });
  }, [shipments, searchQuery, filterTab]);

  const handleSyncApi = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setApiLatency(Math.floor(35 + Math.random() * 20));
      showToast("✓ Đã đồng bộ dữ liệu đối tác vận chuyển AgriExpress");
    }, 1200);
  };

  const handleTestLatency = () => {
    setApiLatency(18);
    setTimeout(() => {
      setApiLatency(38);
      showToast("📡 Cổng API AgriExpress Gateway phản hồi ổn định (38 ms, HTTP 200 OK)");
    }, 600);
  };

  const handleCompleteAllDemo = () => {
    const updated = shipments.map((s) => ({
      ...s,
      status: "delivered" as const,
    }));
    setShipments(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_HARVEST, JSON.stringify(updated));
    } catch {
      // Ignore storage write error
    }
    showToast("⚡ Đã xác nhận giao thành công tất cả đơn hàng!");
  };

  const handleResetDemo = () => {
    setShipments([]);
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_HARVEST, JSON.stringify([]));
    } catch {
      // Ignore storage write error
    }
    showToast("↺ Đã làm trống danh mục vận đơn");
  };

  const handlePrintBatchA6 = () => {
    showToast(`🖨 Đã gửi lệnh in ${filteredShipments.length} phiếu vận đơn A6 sang máy in tem nhiệt.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-medium text-white shadow-2xl transition-all">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <span>Hệ thống</span>
            <span>&gt;</span>
            <span className="text-emerald-700">Thu hoạch &amp; Giao hàng</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Duyệt Lệnh Thu hoạch &amp; Cổng Vận chuyển AgriExpress
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Chốt sản lượng thực tế, kiểm định đóng thùng Eco-Box và điều phối phiếu vận đơn A6 sang đối tác logistics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleSyncApi}
            disabled={isSyncing}
            className="flex items-center gap-2 rounded-xl border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <RefreshCw className={`h-4 w-4 text-slate-500 ${isSyncing ? "animate-spin" : ""}`} />
            <span>Đồng bộ API Đối tác</span>
          </Button>

          <Button
            onClick={() => {
              if (shipments.length === 0) {
                showToast("Chưa có vận đơn thu hoạch để xem mẫu A6");
                return;
              }
              setSelectedShipmentForA6(shipments[0]);
              setShowA6Modal(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-[#0F5132] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#0c4128]"
          >
            <FileText className="h-4 w-4" />
            <span>Xem Phiếu A6 Mẫu</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              TỔNG SẢN LƯỢNG ĐÃ THU HOẠCH
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Sprout className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{totalYieldKg.toFixed(1)}</span>
            <span className="text-sm font-medium text-slate-500">kg rau củ hữu cơ</span>
            <span className="ml-auto inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
              {shipments.length > 0 ? `+${totalYieldKg.toFixed(0)} kg` : "0 kg"}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            <span>100% đạt chuẩn hữu cơ VietGAP</span>
          </div>
        </Card>

        <Card className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              ĐƠN ĐANG GIAO (AGRIEXPRESS)
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Truck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{countDelivering}</span>
            <span className="text-sm font-medium text-slate-500">đơn hàng hoạt động</span>
            <span className="ml-auto inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700">
              ❄️ Bảo quản mát 10 - 15°C
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
            <Clock className="h-4 w-4 text-slate-400" />
            <span>Thời gian giao trung bình: 4.2 giờ nội thành</span>
          </div>
        </Card>

        <Card className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Ô ĐẤT CHỜ NGHIỆM THU CẮT RAU
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <BoxIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{countPending.toString().padStart(2, "0")}</span>
            <span className="text-sm font-medium text-slate-500">ô đất (100% chu kỳ vụ)</span>
            <span className="ml-auto inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
              ! Cần duyệt xuất kho
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-amber-700">
            <span>Sẵn sàng cắt rau giao trong khung giờ chiều</span>
          </div>
        </Card>
      </div>

      <Card className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            <div className="relative min-w-[240px]">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo mã vận đơn, khách hàng, ô đất..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:border-emerald-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
              <button
                onClick={() => setFilterTab("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  filterTab === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Tất cả ({countAll})
              </button>
              <button
                onClick={() => setFilterTab("pending_export")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  filterTab === "pending_export" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Chờ xuất ({countPending})
              </button>
              <button
                onClick={() => setFilterTab("delivering")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  filterTab === "delivering" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Đang giao ({countDelivering})
              </button>
              <button
                onClick={() => setFilterTab("delivered")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  filterTab === "delivered" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Hoàn tất ({countDelivered})
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Khu vực:</span>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-emerald-500"
              >
                <option value="all">Tất cả Trang trại Đà Lạt</option>
                <option value="khu-a">Khu A (Nhà kính Thủy canh)</option>
                <option value="khu-b">Khu B (Vườn Hữu cơ)</option>
                <option value="khu-c">Khu C (Dàn Leo Thông Minh)</option>
              </select>
            </div>

            <Button
              variant="outline"
              onClick={handlePrintBatchA6}
              className="flex items-center gap-2 rounded-xl border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <Printer className="h-4 w-4 text-slate-500" />
              <span>In loạt A6</span>
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3.5 pl-6 pr-4">MÃ VẬN ĐƠN</th>
                <th className="px-4 py-3.5">Ô ĐẤT &amp; VỤ MÙA</th>
                <th className="px-4 py-3.5">KHÁCH HÀNG NHẬN</th>
                <th className="px-4 py-3.5">SẢN LƯỢNG CHỐT</th>
                <th className="px-4 py-3.5 text-center">ẢNH THÙNG HÀNG</th>
                <th className="px-4 py-3.5">TRẠNG THÁI VẬN CHUYỂN</th>
                <th className="py-3.5 pl-4 pr-6 text-right">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredShipments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60">
                        <Truck className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Chưa có vận đơn thu hoạch nào</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Khi nông dân chốt sản lượng ô đất và cắt rau đóng thùng Eco-Box, vận đơn sẽ hiển thị tại đây.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredShipments.map((item) => (
                  <tr key={item.id} className="transition hover:bg-slate-50/80">
                    <td className="py-4 pl-6 pr-4 font-mono font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="tracking-wide">{item.waybillCode}</span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800">{item.plotCode}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600">{item.cropName}</span>
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                          {item.growthDay}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div>
                        <div className="font-semibold text-slate-900">{item.recipientName}</div>
                        <div className="text-[11px] text-slate-500">{item.recipientAddress}</div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{item.actualYieldKg} kg</span>
                        {item.yieldStatus === "standard" ? (
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                            Đạt chuẩn
                          </span>
                        ) : (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-800">
                            Vượt định mức
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <div
                        onClick={() => setZoomPhotoUrl(item.boxPhotoUrl)}
                        className="group relative mx-auto h-12 w-12 cursor-pointer overflow-hidden rounded-lg border border-slate-200 shadow-sm"
                      >
                        <img
                          src={item.boxPhotoUrl}
                          alt="Eco-Box Produce"
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
                          <ExternalLink className="h-3.5 w-3.5 text-white" />
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      {item.status === "delivering" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Đang giao
                        </span>
                      )}
                      {item.status === "waybill_created" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          <FileText className="h-3 w-3 text-slate-500" />
                          Đã tạo vận đơn
                        </span>
                      )}
                      {item.status === "pending_export" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
                          <BoxIcon className="h-3 w-3 text-amber-600" />
                          Chờ xuất kho
                        </span>
                      )}
                      {item.status === "delivered" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
                          <CheckCircle2 className="h-3 w-3 text-teal-600" />
                          Giao thành công
                        </span>
                      )}
                    </td>

                    <td className="py-4 pl-4 pr-6 text-right">
                      <button
                        onClick={() => {
                          setSelectedShipmentForA6(item);
                          setShowA6Modal(true);
                        }}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-emerald-700"
                        title="Xem tem nhãn A6"
                      >
                        <Printer className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 p-4 sm:flex-row text-xs text-slate-500">
          <span>
            Hiển thị <strong>{filteredShipments.length === 0 ? 0 : 1} – {filteredShipments.length}</strong> / {countAll} đơn hàng thu hoạch • Tự động làm mới dữ liệu sau 30s
          </span>

          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-3 text-xs font-bold text-slate-800">1 / 1</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Kiểm soát Chuỗi lạnh (Cold-Chain)</h3>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                100% Đạt
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Cảm biến IoT trong xe lạnh AgriExpress gửi dữ liệu nhiệt độ &amp; độ ẩm thời gian thực về kho.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Nhiệt độ trung bình kho xe</span>
                  <span className="font-bold text-slate-900">11.8°C <span className="font-normal text-slate-400">(Mục tiêu 10-15°C)</span></span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: "45%" }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Độ ẩm đóng thùng Eco-Box</span>
                  <span className="font-bold text-slate-900">88% <span className="font-normal text-slate-400">(Tối ưu độ tươi)</span></span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-sky-500" style={{ width: "88%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 border border-slate-100">
            <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
            <span>Đạt chuẩn VietGAP &amp; GlobalGAP trong đóng gói bảo quản</span>
          </div>
        </Card>

        <Card className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="h-5 w-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">Cổng API AgriExpress Gateway</h3>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Kết nối Live
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Tự động sinh mã barcode 128 và truyền tải biên bản bàn giao điện tử qua giao thức REST.
            </p>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-900 p-3.5 font-mono text-[11px] text-emerald-400">
              <div className="text-slate-400">API Endpoint: api.agriexpress.vn/v1/shipment</div>
              <div className="mt-1 text-slate-300">
                Độ trễ phản hồi: <span className="text-amber-300">{apiLatency} ms</span>
              </div>
              <div className="mt-1 text-emerald-300">
                Tỷ lệ đồng bộ hóa: <span className="font-bold">100% (24/24 đơn)</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <Button
              variant="outline"
              onClick={handleTestLatency}
              className="w-full flex items-center justify-center gap-2 rounded-xl border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
              <span>Kiểm tra tín hiệu đường truyền</span>
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-amber-700" />
                <h3 className="text-base font-bold text-slate-900">Bộ Công cụ Giả lập Demo</h3>
              </div>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                Chế độ Demo
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Mô phỏng vòng đời nhanh của Shipper ngoài thực địa mà không cần quét mã app điện thoại vật lý.
            </p>

            <div className="mt-4 space-y-2.5">
              <button
                onClick={handleCompleteAllDemo}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#8B4513] py-2.5 px-4 text-xs font-bold text-white shadow transition hover:bg-[#72380f]"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Hoàn tất tất cả đơn hàng (Giao thành công)</span>
              </button>

              <button
                onClick={handleResetDemo}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 px-4 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4 text-slate-400" />
                <span>Khôi phục trạng thái ban đầu</span>
              </button>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-center text-slate-400">
            Phục vụ kiểm thử Hội đồng Đồ án Nông nghiệp BioCloud
          </p>
        </Card>
      </div>

      {showA6Modal && selectedShipmentForA6 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <button
              onClick={() => setShowA6Modal(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-800 text-white font-bold text-sm">
                  BC
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">PHIẾU GIAO HÀNG TIÊU CHUẨN A6</h3>
                  <p className="text-xs text-slate-500">Đối tác vận chuyển: AgriExpress Cold-Chain</p>
                </div>
              </div>
              <span className="rounded bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                ECO-BOX FRESH
              </span>
            </div>

            <div className="my-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center">
              <div className="mx-auto h-12 w-3/4 bg-[repeating-linear-gradient(90deg,#111_0px,#111_2px,#fff_2px,#fff_4px,#111_4px,#111_7px,#fff_7px,#fff_9px)]" />
              <div className="mt-2 font-mono text-sm font-bold text-slate-800 tracking-widest">
                *{selectedShipmentForA6.waybillCode}*
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                <span className="font-bold uppercase text-slate-400 text-[10px]">Người gửi (Trang trại)</span>
                <p className="mt-1 font-semibold text-slate-800">BioCloud Farm Đà Lạt</p>
                <p className="text-slate-500">Khu Nông nghiệp Công nghệ cao</p>
                <p className="text-slate-500">Hotline: 1900-8888</p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                <span className="font-bold uppercase text-slate-400 text-[10px]">Người nhận (Khách hàng)</span>
                <p className="mt-1 font-semibold text-slate-800">{selectedShipmentForA6.recipientName}</p>
                <p className="text-slate-500">{selectedShipmentForA6.recipientAddress}</p>
                <p className="text-slate-500">SĐT: {selectedShipmentForA6.recipientPhone}</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 text-xs">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Sản phẩm vụ mùa:</span>
                <span className="font-bold text-slate-800">
                  {selectedShipmentForA6.plotCode} - {selectedShipmentForA6.cropName}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-slate-500">Khối lượng tịnh:</span>
                <span className="font-bold text-emerald-700">{selectedShipmentForA6.actualYieldKg} kg</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-500">Điều kiện lưu kho xe:</span>
                <span className="font-semibold text-sky-700">10°C - 15°C (Thùng xốp sinh học Bio-Eco)</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 p-3">
              <div className="flex items-center gap-3">
                <QrCode className="h-10 w-10 text-slate-700" />
                <div className="text-[11px] text-slate-500">
                  <span>Quét để tra cứu nhật ký canh tác</span>
                  <div className="font-mono text-[10px] text-slate-400">HASH: 8f92-a11b-cc02</div>
                </div>
              </div>
              <div className="rounded-lg border border-amber-300 bg-amber-50 px-2 py-1 text-center">
                <span className="block text-[9px] font-bold text-amber-800">TEM NIÊM PHONG</span>
                <span className="font-mono text-[10px] text-amber-700">SEAL #9021</span>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <Button
                onClick={() => {
                  setShowA6Modal(false);
                  showToast(`Đã in phiếu A6 cho đơn hàng ${selectedShipmentForA6.waybillCode}`);
                }}
                className="flex-1 rounded-xl bg-[#0F5132] py-2 text-xs font-semibold text-white hover:bg-[#0c4128]"
              >
                <Printer className="mr-2 h-4 w-4" />
                Xác nhận In phiếu A6 này
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowA6Modal(false)}
                className="rounded-xl border-slate-200 px-4 py-2 text-xs text-slate-600"
              >
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}

      {zoomPhotoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setZoomPhotoUrl(null)}
        >
          <div className="relative max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <img src={zoomPhotoUrl} alt="Zoom produce box" className="max-h-[80vh] w-full object-cover" />
            <button
              onClick={() => setZoomPhotoUrl(null)}
              className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
