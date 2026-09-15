import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
  Box,
  Text,
} from "@/shared/ui";
import {
  Search,
  Filter,
  QrCode,
  Droplets,
  Thermometer,
  Video,
  BookOpen,
  User,
  Sprout,
  CheckCircle2,
  X,
  Camera,
  Send,
  Cloud,
  Sun,
  PlusCircle,
} from "lucide-react";
import { CreateFarmingLogModal } from "@/features/farming-log";

interface PlotData {
  id: string;
  code: string;
  area: string;
  bed: string;
  zone: "Khu A" | "Khu B";
  cropName: string;
  customerName: string;
  customerPhone: string;
  currentDay: number;
  totalDays: number;
  progressPercent: number;
  soilMoisture: number;
  soilStatus: "Đạt" | "Cần tưới" | "Tối ưu";
  temperature: number;
  airHumidity: number;
  harvestDate: string;
  status: "growing" | "need_water" | "ready_harvest";
  readyForHarvest?: boolean;
  image: string;
  lastWatered: string;
  contractStatus: "ACTIVE" | "EXPIRED" | "HARVESTED" | "CANCELLED";
  isAssignedToFarmer: boolean;
}

const STORAGE_KEY_PLOTS = "farmer_managed_plots_data";

const INITIAL_PLOTS: PlotData[] = [];

export function FarmerPlotsPage() {
  const navigate = useNavigate();

  // Manage plots in state and persist changes across user operations
  const [plots, setPlots] = React.useState<PlotData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PLOTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // If stored data contains the old mock IDs, reset to empty
          const hasOldMocks = parsed.some((p: PlotData) =>
            ["CONTRACT-A104", "CONTRACT-B205", "CONTRACT-B206", "CONTRACT-A101", "CONTRACT-C301"].includes(p?.id)
          );
          if (hasOldMocks) {
            localStorage.setItem(STORAGE_KEY_PLOTS, JSON.stringify([]));
            return [];
          }
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    localStorage.setItem(STORAGE_KEY_PLOTS, JSON.stringify([]));
    return INITIAL_PLOTS;
  });

  const handleUpdatePlotProgress = React.useCallback(
    (
      contractId: string,
      updatedData: {
        progressPercent?: number;
        soilMoisture?: number;
        temperature?: number;
        airHumidity?: number;
        photoUrls?: string[];
        image?: string;
        sensorSnapshot?: { soilMoisture?: number; temperature?: number; humidity?: number };
      }
    ) => {
      setPlots((prevPlots) => {
        const updated = prevPlots.map((plot) => {
          const isMatch =
            plot.id === contractId ||
            plot.code.toLowerCase().includes(contractId.toLowerCase()) ||
            contractId.toLowerCase().includes(plot.id.toLowerCase());

          if (isMatch) {
            const newProgress = Number(updatedData.progressPercent ?? plot.progressPercent);
            const isHarvestReady = newProgress >= 100;
            const newMoisture =
              updatedData.sensorSnapshot?.soilMoisture ??
              updatedData.soilMoisture ??
              plot.soilMoisture;
            const newTemp =
              updatedData.sensorSnapshot?.temperature ??
              updatedData.temperature ??
              plot.temperature;
            const newHumidity =
              updatedData.sensorSnapshot?.humidity ??
              updatedData.airHumidity ??
              plot.airHumidity;
            const newImage =
              updatedData.photoUrls?.[0] ?? updatedData.image ?? plot.image;

            return {
              ...plot,
              progressPercent: newProgress,
              soilMoisture: newMoisture,
              soilStatus: (newMoisture < 50 ? "Cần tưới" : "Đạt") as "Đạt" | "Cần tưới" | "Tối ưu",
              temperature: newTemp,
              airHumidity: newHumidity,
              status: (isHarvestReady ? "ready_harvest" : newMoisture < 50 ? "need_water" : "growing") as
                | "growing"
                | "need_water"
                | "ready_harvest",
              readyForHarvest: isHarvestReady,
              image: newImage,
              lastWatered: "Vừa cập nhật",
            };
          }
          return plot;
        });

        try {
          localStorage.setItem(STORAGE_KEY_PLOTS, JSON.stringify(updated));
        } catch {
          // ignore quota
        }

        return updated;
      });
    },
    []
  );

  // Filters state
  const [searchQuery, setSearchQuery] = React.useState("");
  const [zoneFilter, setZoneFilter] = React.useState<"ALL" | "Khu A" | "Khu B">("ALL");
  const [statusFilter, setStatusFilter] = React.useState<"ALL" | "need_water" | "growing" | "ready_harvest">("ALL");

  // Selected plot for Detail / Telemetry modal
  const [selectedPlotForDetail, setSelectedPlotForDetail] = React.useState<PlotData | null>(null);
  const [selectedLiveCamPlot, setSelectedLiveCamPlot] = React.useState<PlotData | null>(null);
  const [createLogPlot, setCreateLogPlot] = React.useState<PlotData | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Quick note chips state inside Telemetry modal
  const [activeTags, setActiveTags] = React.useState<string[]>([
    "Cây bung lá khỏe",
    "Nắng ấm",
  ]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered plots
  const filteredPlots = plots.filter((plot) => {
    const matchesSearch =
      plot.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plot.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plot.customerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesZone = zoneFilter === "ALL" || plot.zone === zoneFilter;
    const matchesStatus = statusFilter === "ALL" || plot.status === statusFilter;

    return matchesSearch && matchesZone && matchesStatus;
  });

  const zoneACount = plots.filter((p) => p.zone === "Khu A").length;
  const zoneBCount = plots.filter((p) => p.zone === "Khu B").length;
  const needWaterCount = plots.filter((p) => p.status === "need_water").length;
  const growingCount = plots.filter((p) => p.status === "growing").length;
  const readyHarvestCount = plots.filter((p) => p.status === "ready_harvest").length;

  return (
    <Box className="w-full space-y-6 pb-12">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & ACTIONS (Card with @/shared/ui)
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-0 overflow-hidden shadow-xs border-border">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6">
          <Box>
            <Box className="flex items-center gap-2.5">
              <CardTitle className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                Ô đất của tôi ({plots.length} ô)
              </CardTitle>
              <Badge variant="success">Phân khu A & B</Badge>
            </Box>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
              Giám sát vi khí hậu, độ ẩm đất và tiến độ sinh trưởng nông sản theo thời gian thực
            </CardDescription>
          </Box>

          <Box className="flex flex-wrap items-center gap-2.5">
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => {
                if (plots.length > 0) {
                  setCreateLogPlot(plots[0]);
                } else {
                  showToast("Hiện chưa có ô đất nào được phân công để đăng nhật ký.");
                }
              }}
              leftIcon={<PlusCircle className="h-4 w-4" />}
            >
              <Text as="span" className="text-xs font-bold">+ Đăng nhật ký mới</Text>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => showToast("Đang kết nối đầu đọc mã QR máy ảnh...")}
              leftIcon={<QrCode className="h-4 w-4 text-emerald-600" />}
            >
              <Text as="span" className="text-xs font-bold">Quét mã QR</Text>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => navigate("/farmer")}
            >
              <Text as="span" className="text-xs font-bold">← Nhiệm vụ hôm nay</Text>
            </Button>
          </Box>
        </CardHeader>
      </Card>

      {/* Toast notification */}
      {toastMessage && (
        <Card className="rounded-2xl bg-foreground text-background px-5 py-3 text-sm font-semibold flex items-center justify-between shadow-xl animate-in fade-in">
          <Text as="span" className="text-xs font-medium">{toastMessage}</Text>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setToastMessage(null)}
            className="h-6 w-6 text-muted-foreground hover:text-background p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </Card>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. FILTER TOOLBAR (Card with @/shared/ui)
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-4 shadow-xs border-border space-y-3">
        <CardContent className="p-0 space-y-3">
          {/* Search and primary zone tabs */}
          <Box className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search box */}
            <Box className="relative flex-1 max-w-md">
              <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Tìm theo mã ô (A-104), tên rau, hoặc tên khách..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-2xl bg-muted/40 border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
            </Box>

            {/* Zone tabs */}
            <Box className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-2xl self-start md:self-auto">
              <Button
                type="button"
                variant={zoneFilter === "ALL" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setZoneFilter("ALL")}
                className="h-8 text-xs font-bold"
              >
                Tất cả ({plots.length})
              </Button>
              <Button
                type="button"
                variant={zoneFilter === "Khu A" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setZoneFilter("Khu A")}
                className="h-8 text-xs font-bold"
              >
                Khu A Đà Lạt ({zoneACount})
              </Button>
              <Button
                type="button"
                variant={zoneFilter === "Khu B" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setZoneFilter("Khu B")}
                className="h-8 text-xs font-bold"
              >
                Khu B ({zoneBCount})
              </Button>
            </Box>
          </Box>

          {/* Sub-filters by status */}
          <Box className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
            <Text variant="muted" className="text-xs font-medium flex items-center gap-1">
              <Filter className="h-3 w-3" /> Lọc trạng thái:
            </Text>

            <Button
              type="button"
              variant={statusFilter === "ALL" ? "primary" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("ALL")}
              className="h-7 rounded-full px-3 text-xs"
            >
              Tất cả
            </Button>

            <Button
              type="button"
              variant={statusFilter === "need_water" ? "destructive" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("need_water")}
              className="h-7 rounded-full px-3 text-xs flex items-center gap-1.5"
            >
              <Box className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              <Text as="span">Cần tưới nước ({needWaterCount})</Text>
            </Button>

            <Button
              type="button"
              variant={statusFilter === "growing" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("growing")}
              className="h-7 rounded-full px-3 text-xs flex items-center gap-1.5"
            >
              <Box className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <Text as="span">Đang sinh trưởng ({growingCount})</Text>
            </Button>

            <Button
              type="button"
              variant={statusFilter === "ready_harvest" ? "outline" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("ready_harvest")}
              className="h-7 rounded-full px-3 text-xs flex items-center gap-1.5"
            >
              <Box className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              <Text as="span">Chuẩn bị thu hoạch ({readyHarvestCount})</Text>
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          3. PARCEL CARDS GRID (3 Columns on Desktop with @/shared/ui)
      ───────────────────────────────────────────────────────────── */}
      {filteredPlots.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-2 border-border shadow-none space-y-4">
          <Box className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 mx-auto">
            <Sprout className="h-8 w-8" />
          </Box>
          <Box className="space-y-1">
            <CardTitle className="text-lg font-bold text-foreground">
              Chưa có ô đất canh tác nào
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              Hiện tại bạn chưa được phân công ô đất nào. Khi có hợp đồng canh tác mới từ quản trị viên, thông tin luống rau sẽ được hiển thị tại đây.
            </CardDescription>
          </Box>
        </Card>
      ) : (
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlots.map((plot) => (
          <Card
            key={plot.id}
            className={`flex flex-col p-0 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 relative border ${
              plot.readyForHarvest
                ? "border-orange-400 ring-2 ring-orange-400/20 bg-gradient-to-b from-orange-50/20 to-transparent"
                : plot.status === "need_water"
                ? "border-amber-300 bg-gradient-to-b from-amber-50/20 to-transparent"
                : "border-border"
            }`}
          >
            {/* Card Header: Plot code & Progress Badge */}
            <CardHeader className="p-5 pb-3">
              <Box className="flex items-center justify-between">
                <Box>
                  <CardTitle className="text-base sm:text-lg font-extrabold text-foreground">
                    {plot.code}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {plot.area} • {plot.bed} ({plot.zone})
                  </CardDescription>
                </Box>

                <Box className="flex flex-col items-end gap-1">
                  <Badge
                    variant={
                      plot.readyForHarvest
                        ? "destructive"
                        : plot.status === "need_water"
                        ? "warning"
                        : "secondary"
                    }
                    className="font-bold text-xs"
                  >
                    {plot.readyForHarvest ? "Đạt 60/60 ngày" : `Ngày ${plot.currentDay}/${plot.totalDays}`}
                  </Badge>
                  {!plot.isAssignedToFarmer ? (
                    <Badge variant="destructive" className="text-[10px]">Ngoài quyền quản lý</Badge>
                  ) : plot.contractStatus === "ACTIVE" ? (
                    <Badge variant="success" className="text-[10px]">HĐ ACTIVE</Badge>
                  ) : plot.contractStatus === "EXPIRED" ? (
                    <Badge variant="destructive" className="text-[10px]">HĐ Hết hạn</Badge>
                  ) : (
                    <Badge variant="warning" className="text-[10px]">Đã thu hoạch</Badge>
                  )}
                </Box>
              </Box>

              {/* Crop name & Customer */}
              <Box className="space-y-1 mt-3">
                <Text as="h4" className="text-sm sm:text-base font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                  <Sprout className="h-4 w-4 shrink-0" />
                  <span>{plot.cropName}</span>
                </Text>
                <CardDescription className="text-xs flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{plot.customerName}</span>
                </CardDescription>
              </Box>
            </CardHeader>

            {/* Card Content: IoT Stats & Progress Bar */}
            <CardContent className="p-5 pt-0 space-y-4 flex-1 flex flex-col justify-between">
              {/* IoT Telemetry Stats Bar */}
              <Box className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-muted/40 border border-border text-xs">
                <Box className="flex items-center gap-2">
                  <Droplets
                    className={`h-4 w-4 ${
                      plot.soilMoisture < 50 ? "text-amber-500" : "text-cyan-600"
                    }`}
                  />
                  <Box>
                    <Text variant="muted" className="text-[11px]">Độ ẩm: </Text>
                    <Text as="strong" className="font-bold text-foreground">
                      {plot.soilMoisture}%
                    </Text>{" "}
                    <Text
                      as="span"
                      className={`text-[10px] ${
                        plot.soilStatus === "Đạt" ? "text-emerald-600 font-semibold" : "text-amber-600 font-bold"
                      }`}
                    >
                      ({plot.soilStatus})
                    </Text>
                  </Box>
                </Box>

                <Box className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-amber-600" />
                  <Box>
                    <Text variant="muted" className="text-[11px]">Luống: </Text>
                    <Text as="strong" className="font-bold text-foreground">
                      {plot.temperature}°C
                    </Text>
                  </Box>
                </Box>
              </Box>

              {/* Growth Progress Bar */}
              <Box className="space-y-1.5 mt-auto">
                <Box className="flex items-center justify-between text-xs">
                  <Text variant="muted" className="font-medium">Tiến độ vụ:</Text>
                  <Text as="strong" className="text-foreground font-bold">{plot.progressPercent}%</Text>
                </Box>
                <Box className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <Box
                    className={`h-full rounded-full transition-all duration-500 ${
                      plot.readyForHarvest
                        ? "bg-orange-500"
                        : plot.status === "need_water"
                        ? "bg-amber-500"
                        : "bg-emerald-600"
                    }`}
                    style={{ width: `${plot.progressPercent}%` }}
                  />
                </Box>
                <Text variant="muted" className="text-[11px] pt-0.5">
                  Thu hoạch dự kiến: <Text as="strong" className="text-foreground">{plot.harvestDate}</Text>
                </Text>
              </Box>
            </CardContent>

            {/* Card Footer: Action Buttons */}
            <CardFooter className="p-5 pt-0">
              {plot.readyForHarvest ? (
                <Box className="grid grid-cols-2 gap-2 w-full">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => navigate(`/farmer/harvest/${plot.id}`)}
                    className="bg-[#ea580c] hover:bg-[#c2410c] text-white py-2 text-xs font-bold"
                  >
                    🚜 Thu hoạch
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setCreateLogPlot(plot)}
                    leftIcon={<BookOpen className="h-3.5 w-3.5" />}
                    className="text-xs"
                  >
                    Nhật ký
                  </Button>
                </Box>
              ) : (
                <Box className="grid grid-cols-2 gap-2 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedLiveCamPlot(plot)}
                    leftIcon={<Video className="h-3.5 w-3.5" />}
                    className="text-xs"
                  >
                    Xem camera
                  </Button>

                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={() => setCreateLogPlot(plot)}
                    leftIcon={<BookOpen className="h-3.5 w-3.5" />}
                    className="text-xs"
                  >
                    Nhật ký
                  </Button>
                </Box>
              )}
            </CardFooter>
          </Card>
        ))}
      </Box>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 1: LIVE CAMERA VIEW (Card with @/shared/ui)
      ───────────────────────────────────────────────────────────── */}
      {selectedLiveCamPlot && (
        <Box className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <Card className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl border border-white/20 p-0">
            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between p-4 bg-slate-900 border-b border-white/10">
              <Box className="flex items-center gap-3">
                <Box className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
                <CardTitle className="text-sm font-bold text-white">
                  Camera Trực Tiếp {selectedLiveCamPlot.code} ({selectedLiveCamPlot.bed})
                </CardTitle>
                <Badge variant="success" className="font-mono text-[10px]">
                  1080P HD
                </Badge>
              </Box>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSelectedLiveCamPlot(null)}
                className="rounded-full text-slate-400 hover:text-white h-8 w-8"
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>

            {/* Video representation */}
            <CardContent className="p-0">
              <Box className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src={selectedLiveCamPlot.image}
                  alt={selectedLiveCamPlot.code}
                  className="w-full h-full object-cover"
                />
                <Badge variant="secondary" className="absolute top-4 left-4 bg-black/60 px-3 py-1 font-mono text-xs backdrop-blur-md text-white">
                  Cam góc 01 • {selectedLiveCamPlot.bed} (Trực tiếp)
                </Badge>
              </Box>
            </CardContent>

            {/* Footer Bar */}
            <CardFooter className="flex flex-wrap items-center justify-between p-4 bg-slate-900 text-xs text-slate-300 gap-3 border-t border-white/10">
              <Box className="flex items-center gap-4">
                <Text as="span">🌱 Cây trồng: <Text as="strong" className="text-white font-bold">{selectedLiveCamPlot.cropName}</Text></Text>
                <Text as="span">💧 Độ ẩm đất: <Text as="strong" className="text-white font-bold">{selectedLiveCamPlot.soilMoisture}%</Text></Text>
                <Text as="span">🌡 Nhiệt độ: <Text as="strong" className="text-white font-bold">{selectedLiveCamPlot.temperature}°C</Text></Text>
              </Box>
              <Box className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => showToast("Đã chụp và lưu ảnh vào kho minh chứng!")}
                  leftIcon={<Camera className="h-3.5 w-3.5" />}
                  className="text-white border-white/20 hover:bg-white/10 text-xs"
                >
                  Chụp ảnh lưu kho
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const current = selectedLiveCamPlot;
                    setSelectedLiveCamPlot(null);
                    setSelectedPlotForDetail(current);
                  }}
                  className="text-xs"
                >
                  Mở nhật ký ô đất
                </Button>
              </Box>
            </CardFooter>
          </Card>
        </Box>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 2: PARCEL DETAIL & CROP TELEMETRY (Card with @/shared/ui)
      ───────────────────────────────────────────────────────────── */}
      {selectedPlotForDetail && (
        <Box className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-in fade-in">
          <Card className="relative w-full max-w-4xl rounded-3xl bg-background shadow-2xl border border-border overflow-hidden my-auto max-h-[92vh] flex flex-col p-0">
            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between p-5 border-b border-border bg-muted/30 shrink-0">
              <Box className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedPlotForDetail(null)}
                  className="rounded-full h-8 w-8 text-muted-foreground"
                >
                  <X className="h-5 w-5" />
                </Button>
                <Box>
                  <Box className="flex items-center gap-2">
                    <CardTitle className="text-lg font-bold text-foreground">
                      Chi tiết & Nhật ký • {selectedPlotForDetail.code}
                    </CardTitle>
                    <Badge variant="success">Đang sinh trưởng</Badge>
                  </Box>
                  <CardDescription className="text-xs text-muted-foreground">
                    {selectedPlotForDetail.cropName} • Chủ hộ: {selectedPlotForDetail.customerName} ({selectedPlotForDetail.customerPhone})
                  </CardDescription>
                </Box>
              </Box>

              <Text variant="muted" className="text-xs hidden sm:block">
                Lần tưới: <Text as="strong" className="text-foreground">{selectedPlotForDetail.lastWatered}</Text>
              </Text>
            </CardHeader>

            {/* Modal Body: 2 Columns */}
            <CardContent className="overflow-y-auto p-5 space-y-6 flex-1">
              {/* Stepper vụ mùa: Gieo hạt (25%) > Nảy mầm (50%) > Bung lá (75%) > Thu hoạch (100%) */}
              <Box className="space-y-2 p-3.5 rounded-2xl bg-muted/30 border border-border">
                <Box className="flex items-center justify-between text-xs">
                  <Text as="label" className="font-bold text-foreground flex items-center gap-1.5">
                    <Sprout className="h-4 w-4 text-emerald-600" />
                    <span>Mốc sinh trưởng mùa vụ & Tiến độ thu hoạch:</span>
                  </Text>
                  <Badge variant="success" className="font-bold text-xs">
                    Tiến độ: {selectedPlotForDetail.progressPercent}%
                  </Badge>
                </Box>

                <Box className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {[
                    { label: "Gieo hạt", percent: 25 },
                    { label: "Nảy mầm", percent: 50 },
                    { label: "Bung lá", percent: 75 },
                    { label: "Thu hoạch", percent: 100 },
                  ].map((step) => {
                    const isCurrent = selectedPlotForDetail.progressPercent === step.percent;
                    const isPassed = selectedPlotForDetail.progressPercent >= step.percent;
                    return (
                      <Button
                        key={step.label}
                        type="button"
                        variant={isCurrent ? "primary" : isPassed ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedPlotForDetail((prev) =>
                            prev ? { ...prev, progressPercent: step.percent } : null
                          );
                        }}
                        className={`h-9 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                          isCurrent ? "ring-2 ring-emerald-500/40 shadow-sm" : ""
                        }`}
                      >
                        {isPassed && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                        <span>{step.label} ({step.percent}%)</span>
                      </Button>
                    );
                  })}
                </Box>
              </Box>

              {/* 3 Telemetry Cards */}
              <Box className="grid grid-cols-3 gap-3">
                <Card className="p-3.5 text-center bg-muted/30 border-border shadow-none">
                  <Droplets className="h-5 w-5 text-cyan-600 mx-auto mb-1" />
                  <CardDescription className="text-[11px]">Độ ẩm đất</CardDescription>
                  <CardTitle className="text-base font-extrabold text-foreground">
                    {selectedPlotForDetail.soilMoisture}%
                  </CardTitle>
                  <Badge variant="success" className="mt-1 text-[10px]">Chuẩn 60-75%</Badge>
                </Card>

                <Card className="p-3.5 text-center bg-muted/30 border-border shadow-none">
                  <Thermometer className="h-5 w-5 text-amber-600 mx-auto mb-1" />
                  <CardDescription className="text-[11px]">Nhiệt độ luống</CardDescription>
                  <CardTitle className="text-base font-extrabold text-foreground">
                    {selectedPlotForDetail.temperature}°C
                  </CardTitle>
                  <Badge variant="success" className="mt-1 text-[10px]">Chuẩn 18-26°C</Badge>
                </Card>

                <Card className="p-3.5 text-center bg-muted/30 border-border shadow-none">
                  <Cloud className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <CardDescription className="text-[11px]">Độ ẩm không khí</CardDescription>
                  <CardTitle className="text-base font-extrabold text-foreground">
                    {selectedPlotForDetail.airHumidity}%
                  </CardTitle>
                  <Badge variant="secondary" className="mt-1 text-[10px]">Ổn định</Badge>
                </Card>
              </Box>

              {/* Real Crop Image & Growth update form */}
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left: Crop photo */}
                <Box className="space-y-2">
                  <Text as="h4" className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Ảnh chụp kiểm định luống thực tế
                  </Text>
                  <Box className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-muted border border-border">
                    <img
                      src={selectedPlotForDetail.image}
                      alt={selectedPlotForDetail.code}
                      className="w-full h-full object-cover"
                    />
                    <Badge variant="secondary" className="absolute top-2 left-2 bg-black/60 text-emerald-300 backdrop-blur-md text-[10px]">
                      Cloudinary Synced (1.2 MB)
                    </Badge>
                    <Badge variant="secondary" className="absolute bottom-2 left-2 bg-black/60 text-white backdrop-blur-md text-[10px]">
                      📅 Hôm nay • 08:35
                    </Badge>
                  </Box>
                </Box>

                {/* Right: Quick tags & log submission */}
                <Box className="space-y-3">
                  <Text as="h4" className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Ghi chú nhanh nông vụ hôm nay
                  </Text>

                  <Box className="flex flex-wrap gap-2">
                    {[
                      "Tưới vi sinh",
                      "Cây bung lá khỏe",
                      "Đã xới thoáng đất",
                      "Đã diệt sâu sinh học",
                      "Nắng ấm",
                    ].map((tag) => {
                      const isSelected = activeTags.includes(tag);
                      return (
                        <Button
                          key={tag}
                          type="button"
                          variant={isSelected ? "primary" : "outline"}
                          size="sm"
                          onClick={() => toggleTag(tag)}
                          className="rounded-xl text-xs font-semibold h-8"
                        >
                          {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                        </Button>
                      );
                    })}
                  </Box>

                  <Card className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                    <Box className="flex items-center gap-2 font-bold">
                      <Sun className="h-4 w-4 text-amber-500" />
                      <Text as="span">Vi khí hậu lý tưởng cho đợt bung lá</Text>
                    </Box>
                    <CardDescription className="text-[11px] text-emerald-800 dark:text-emerald-300 leading-relaxed">
                      Độ ẩm {selectedPlotForDetail.soilMoisture}% và quang năng đạt tiêu chuẩn VietGAP giúp rễ cây hút dinh dưỡng tối đa.
                    </CardDescription>
                  </Card>
                </Box>
              </Box>
            </CardContent>

            {/* Footer */}
            <CardFooter className="p-5 border-t border-border bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedPlotForDetail(null)}
                className="w-full sm:w-auto text-xs font-bold"
              >
                Hủy bỏ
              </Button>

              <Button
                type="button"
                variant="primary"
                onClick={() => {
                  handleUpdatePlotProgress(selectedPlotForDetail.id, {
                    progressPercent: selectedPlotForDetail.progressPercent,
                    soilMoisture: selectedPlotForDetail.soilMoisture,
                    temperature: selectedPlotForDetail.temperature,
                    airHumidity: selectedPlotForDetail.airHumidity,
                    image: selectedPlotForDetail.image,
                  });
                  showToast(
                    `Đã cập nhật tiến độ ${selectedPlotForDetail.code} lên ${selectedPlotForDetail.progressPercent}% và gửi thông báo cho khách hàng ${selectedPlotForDetail.customerName}!`
                  );
                  setSelectedPlotForDetail(null);
                }}
                className="w-full sm:w-auto"
                leftIcon={<Send className="h-3.5 w-3.5" />}
              >
                Lưu tiến độ ({selectedPlotForDetail.progressPercent}%) & Gửi thông báo
              </Button>
            </CardFooter>
          </Card>
        </Box>
      )}
      {/* ─────────────────────────────────────────────────────────────
          MODAL 3: CREATE FARMING LOG MODAL (US-23, US-24)
      ───────────────────────────────────────────────────────────── */}
      <CreateFarmingLogModal
        isOpen={Boolean(createLogPlot)}
        onClose={() => setCreateLogPlot(null)}
        contractId={createLogPlot?.id}
        contractStatus={createLogPlot?.contractStatus}
        isAssignedToFarmer={createLogPlot?.isAssignedToFarmer}
        plotCode={createLogPlot?.code}
        cropName={createLogPlot?.cropName}
        customerName={createLogPlot?.customerName}
        onSuccess={(createdLog: unknown) => {
          if (createLogPlot) {
            handleUpdatePlotProgress(createLogPlot.id, (createdLog || {}) as { progressPercent?: number });
            const newPercent = (createdLog as { progressPercent?: number })?.progressPercent ?? createLogPlot.progressPercent;
            showToast(`Đã cập nhật tiến độ ${createLogPlot.code} lên ${newPercent}% và lưu nhật ký thành công!`);
          }
          setCreateLogPlot(null);
        }}
      />
    </Box>
  );
}
