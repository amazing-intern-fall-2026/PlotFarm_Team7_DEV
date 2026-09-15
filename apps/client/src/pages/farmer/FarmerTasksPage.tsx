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
  CheckCircle2,
  Clock,
  Droplets,
  Thermometer,
  Video,
  ChevronRight,
  Play,
  QrCode,
  AlertTriangle,
  ArrowRight,
  Sprout,
  X,
  FileText,
} from "lucide-react";

interface PriorityTask {
  id: string;
  type: string;
  zone: string;
  bed: string;
  deadline: string;
  plotCode: string;
  cropName: string;
  customerName: string;
  contractCode: string;
  soilMoisture: string;
  temperature: string;
  customerNote: string;
}

const STORAGE_KEY_PLOTS = "farmer_managed_plots_data";

interface RawPlotData {
  id: string;
  code: string;
  cropName: string;
  currentDay?: number;
  totalDays?: number;
  progressPercent?: number;
  readyForHarvest?: boolean;
  image?: string;
  isAssignedToFarmer?: boolean;
  soilMoisture?: number;
  temperature?: number;
}

const FALLBACK_PLOTS: ManagedPlot[] = [];

const loadManagedPlots = (): ManagedPlot[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PLOTS);
    if (raw) {
      const parsed = JSON.parse(raw) as RawPlotData[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        const assigned = parsed.filter((p) => p.isAssignedToFarmer !== false);
        if (assigned.length > 0) {
          return assigned.map((p) => ({
            id: p.id,
            code: p.code,
            cropName: p.cropName,
            currentDay: p.currentDay ?? 30,
            totalDays: p.totalDays ?? 60,
            progressPercent: typeof p.progressPercent === "number" ? p.progressPercent : 50,
            readyForHarvest: p.readyForHarvest ?? ((p.progressPercent ?? 0) >= 100),
            image: p.image || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop&q=60",
          }));
        }
      }
    }
  } catch {
    // fallback
  }
  return FALLBACK_PLOTS;
};

interface SecondaryTask {
  id: string;
  type: string;
  plotCode: string;
  bed: string;
  deadline: string;
  customerName: string;
  status: "pending" | "in_progress" | "done";
}

const DEFAULT_ACTIVE_TASK: PriorityTask | null = null;

const DEFAULT_UPCOMING_TASKS: SecondaryTask[] = [];

interface ManagedPlot {
  id: string;
  code: string;
  cropName: string;
  currentDay: number;
  totalDays: number;
  progressPercent: number;
  readyForHarvest?: boolean;
  image: string;
}

export function FarmerTasksPage() {
  const navigate = useNavigate();
  const [selectedLiveCamPlot, setSelectedLiveCamPlot] = React.useState<string | null>(null);
  const [showHarvestAlert, setShowHarvestAlert] = React.useState(false);

  const [managedPlots, setManagedPlots] = React.useState<ManagedPlot[]>(loadManagedPlots);
  const [activeTask] = React.useState<PriorityTask | null>(DEFAULT_ACTIVE_TASK);
  const [upcomingTasks] = React.useState<SecondaryTask[]>(DEFAULT_UPCOMING_TASKS);

  // Sync with local storage when page regains focus or storage event triggers
  React.useEffect(() => {
    const handleSync = () => {
      setManagedPlots(loadManagedPlots());
    };
    handleSync();
    window.addEventListener("storage", handleSync);
    window.addEventListener("focus", handleSync);
    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("focus", handleSync);
    };
  }, []);

  // Dynamic reading for A-104 if available in managedPlots or raw storage
  const activePlotData = React.useMemo(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PLOTS);
      if (raw) {
        const parsed = JSON.parse(raw) as RawPlotData[];
        const found = parsed.find((p) => p.id === "CONTRACT-A104" || p.code.includes("A-104"));
        if (found) return found;
      }
    } catch {
      // ignore
    }
    return null;
  }, [managedPlots]);

  const activeTaskData = React.useMemo(() => {
    if (!activeTask) return null;
    return {
      ...activeTask,
      soilMoisture: activePlotData?.soilMoisture ? `${activePlotData.soilMoisture}%` : activeTask.soilMoisture,
      temperature: activePlotData?.temperature ? `${activePlotData.temperature}°C` : activeTask.temperature,
    };
  }, [activeTask, activePlotData]);

  const handleHarvestClick = (_plotCode: string) => {
    setShowHarvestAlert(true);
    setTimeout(() => {
      setShowHarvestAlert(false);
      navigate("/farmer/harvest/A-101");
    }, 1200);
  };

  return (
    <Box className="w-full space-y-6 pb-10">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP STAFF HEADER & KPI METRICS (Card with @/shared/ui)
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-0 overflow-hidden">
        <CardHeader className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5">
          {/* Left: Staff Profile Info */}
          <Box className="flex items-center gap-3.5">
            <Box className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Bác Bảy"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-500/30"
              />
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-card" />
            </Box>
            <Box>
              <Box className="flex items-center gap-2.5">
                <CardTitle className="text-lg sm:text-xl font-bold">
                  Bác Bảy
                </CardTitle>
                <Badge variant="success" className="gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Đang làm việc
                </Badge>
              </Box>
              <CardDescription className="text-xs mt-0.5">
                Đội 1 • Phân khu A (Đà Lạt) • Ca sáng: 07:00 – 15:30
              </CardDescription>
            </Box>
          </Box>

          {/* Right: Quick Stat Badges */}
          <Box className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Badge variant="warning" className="flex items-center gap-2 px-3.5 py-2 text-xs rounded-xl">
              <Clock className="h-4 w-4 text-amber-600" />
              <Text as="span" className="text-xs">
                Chờ xử lý: <strong className="font-bold">{activeTaskData ? 1 + upcomingTasks.length : upcomingTasks.length} việc</strong>
              </Text>
            </Badge>

            <Badge variant="secondary" className="flex items-center gap-2 px-3.5 py-2 text-xs rounded-xl border border-border">
              <CheckCircle2 className="h-4 w-4 text-orange-600" />
              <Text as="span" className="text-xs">
                Đến hạn thu hoạch: <strong className="font-bold text-orange-600">{managedPlots.filter((p) => p.readyForHarvest).length} ô</strong>
              </Text>
            </Badge>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/farmer/plots")}
              rightIcon={<ChevronRight className="h-4 w-4" />}
              className="rounded-xl h-9 text-xs font-semibold"
            >
              Ô đất phụ trách ({managedPlots.length} ô)
            </Button>
          </Box>
        </CardHeader>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          2. ALERT NOTIFICATION BANNER
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-0 overflow-hidden border-border bg-gradient-to-r from-emerald-50/60 via-background to-background dark:from-emerald-950/20">
        <CardContent className="flex items-center justify-between p-4 text-xs sm:text-sm text-foreground">
          <Box className="flex items-center gap-2.5 font-medium">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-xs shrink-0 shadow-xs">
              ✓
            </span>
            <Text as="span" className="text-xs sm:text-sm">
              {activeTaskData ? (
                <><strong>Hôm nay:</strong> Có 1 việc ưu tiên chờ xử lý • {activeTaskData.plotCode} ({activeTaskData.type})</>
              ) : (
                <><strong>Hôm nay:</strong> 0 việc tồn đọng • Bạn đã sẵn sàng tiếp nhận lịch phân công mới</>
              )}
            </Text>
          </Box>
          {activeTaskData && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/farmer/tasks/${activeTaskData.id}/execute`)}
              rightIcon={<ChevronRight className="h-4 w-4" />}
              className="text-emerald-800 hover:text-emerald-950 hover:bg-emerald-200/40 font-bold text-xs h-8"
            >
              Xử lý ngay
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Success alert toast when harvesting */}
      {showHarvestAlert && (
        <Card className="bg-emerald-600 text-white p-4 border-none shadow-lg animate-in fade-in">
          <Text className="text-sm font-semibold text-white">
            ✓ Đã tạo lệnh xuất kho & thu hoạch cho Ô đất A-101 thành công! Đang chuyển hướng...
          </Text>
        </Card>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN 2-COLUMN DESKTOP WORKSPACE
      ───────────────────────────────────────────────────────────── */}
      <Box className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── LEFT COLUMN: PRIORITY TASK & UPCOMING SCHEDULE (7 COLS) ── */}
        <Box className="lg:col-span-7 space-y-5">
          {/* Active Priority Task Card or Empty State */}
          {activeTaskData ? (
            <Card className="p-0 overflow-hidden border-2 border-emerald-500/50 shadow-md hover:shadow-lg transition-all relative">
              <Box className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600" />

              <CardHeader className="p-5 sm:p-6 pb-2">
                <Box className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <Box className="flex items-center gap-2">
                    <Badge variant="success" className="px-3 py-1 font-bold">
                      {activeTaskData.type}
                    </Badge>
                    <Text variant="muted" className="text-xs font-medium">
                      {activeTaskData.zone} • {activeTaskData.bed}
                    </Text>
                  </Box>
                  <Badge variant="warning" className="gap-1.5 px-3 py-0.5 text-xs font-bold">
                    <Clock className="h-3.5 w-3.5 text-amber-600" />
                    <span>{activeTaskData.deadline}</span>
                  </Badge>
                </Box>

                <Box className="space-y-1">
                  <CardTitle className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
                    <span>{activeTaskData.plotCode}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-emerald-700 dark:text-emerald-400">
                      {activeTaskData.cropName}
                    </span>
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Chủ vườn: <strong>{activeTaskData.customerName}</strong> (Hợp đồng {activeTaskData.contractCode})
                  </CardDescription>
                </Box>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 pt-0 space-y-4">
                <Box className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-muted/40 border border-border">
                  <Box className="flex items-center gap-2.5">
                    <Box className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 shrink-0">
                      <Droplets className="h-4 w-4" />
                    </Box>
                    <Box>
                      <Text variant="muted" className="text-[11px] font-medium">Độ ẩm đất</Text>
                      <Text as="p" className="text-xs sm:text-sm font-bold text-foreground">
                        {activeTaskData.soilMoisture}{" "}
                        <span className="text-[10px] font-normal text-amber-600">(Cần bón ẩm)</span>
                      </Text>
                    </Box>
                  </Box>

                  <Box className="flex items-center gap-2.5">
                    <Box className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 shrink-0">
                      <Thermometer className="h-4 w-4" />
                    </Box>
                    <Box>
                      <Text variant="muted" className="text-[11px] font-medium">Nhiệt độ luống</Text>
                      <Text as="p" className="text-xs sm:text-sm font-bold text-foreground">
                        {activeTaskData.temperature}
                      </Text>
                    </Box>
                  </Box>
                </Box>

                <Box className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 p-3.5 text-xs text-foreground">
                  <Box className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <Box>
                      <strong className="text-emerald-900 dark:text-emerald-200">
                        Khách dặn dò:
                      </strong>{" "}
                      {activeTaskData.customerNote}
                    </Box>
                  </Box>
                </Box>
              </CardContent>

              <CardFooter className="p-5 sm:p-6 pt-0 border-t border-border flex flex-col sm:flex-row gap-2.5">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate(`/farmer/tasks/${activeTaskData.id}/execute`)}
                  leftIcon={<Play className="h-4 w-4 fill-current" />}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="flex-1"
                >
                  Bắt đầu xử lý nhiệm vụ này
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/farmer/contracts/CONTRACT-A104/new-log")}
                  leftIcon={<FileText className="h-4 w-4 text-emerald-600" />}
                  className="sm:w-auto font-semibold"
                >
                  Đăng nhật ký tiến độ
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="p-8 text-center border-dashed border-2 border-border shadow-none space-y-3">
              <Box className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 mx-auto">
                <CheckCircle2 className="h-7 w-7" />
              </Box>
              <Box className="space-y-1">
                <CardTitle className="text-base font-bold text-foreground">
                  Không có nhiệm vụ ưu tiên cần xử lý
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Bạn không có nhiệm vụ khẩn cấp nào trong ca trực hôm nay. Khi hệ thống phân công phiếu chăm sóc hoặc bón phân, thông tin sẽ xuất hiện tại đây.
                </CardDescription>
              </Box>
            </Card>
          )}

          {/* Secondary / Upcoming Tasks */}
          <Box className="space-y-3">
            <Text variant="small" className="font-bold text-foreground uppercase tracking-wider block">
              Nhiệm Vụ Kế Tiếp Trong Ca Làm Việc
            </Text>

            <Box className="space-y-2.5">
              {upcomingTasks.length === 0 ? (
                <Card className="p-6 text-center border-dashed border border-border shadow-none">
                  <Text variant="muted" className="text-xs">Chưa có công việc kế tiếp trong ca trực.</Text>
                </Card>
              ) : (
                upcomingTasks.map((task) => (
                  <Card
                    key={task.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <Box className="space-y-1">
                      <Box className="flex items-center gap-2">
                        <Text as="strong" className="font-bold text-sm text-foreground">
                          {task.type}
                        </Text>
                        <Text variant="muted" className="text-xs">•</Text>
                        <Text variant="muted" className="text-xs font-medium">
                          {task.plotCode} ({task.bed})
                        </Text>
                      </Box>
                      <Text variant="muted" className="text-xs">
                        Chủ hộ: {task.customerName} • Hạn chót:{" "}
                        <span className="text-orange-600 font-medium">{task.deadline}</span>
                      </Text>
                    </Box>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/farmer/tasks/${task.id}/execute`)}
                      className="self-start sm:self-auto rounded-xl text-xs font-semibold"
                    >
                      Mở phiếu
                    </Button>
                  </Card>
                ))
              )}
            </Box>
          </Box>
        </Box>

        {/* ── RIGHT COLUMN: MANAGED PARCELS & TOOLS (5 COLS) ── */}
        <Box className="lg:col-span-5 space-y-5">
          {/* Managed Plots Quick List */}
          <Card className="p-5 space-y-4">
            <CardHeader className="p-0 flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-bold">
                Ô đất đang phụ trách ({managedPlots.length} ô)
              </CardTitle>
              <Button
                variant="link"
                size="sm"
                onClick={() => navigate("/farmer/plots")}
                className="text-xs font-semibold text-primary p-0 h-auto"
              >
                Xem sơ đồ đầy đủ →
              </Button>
            </CardHeader>

            <CardContent className="p-0 space-y-3">
              {managedPlots.length === 0 ? (
                <Card className="p-6 text-center border-dashed border border-border shadow-none">
                  <Text variant="muted" className="text-xs">Chưa có ô đất nào được phân công phụ trách.</Text>
                </Card>
              ) : (
                managedPlots.map((plot) => (
                  <Box
                    key={plot.id}
                    className="rounded-2xl border border-border p-3.5 bg-muted/30 hover:bg-muted/50 transition-colors space-y-2.5"
                  >
                    <Box className="flex items-center justify-between">
                      <Box>
                        <Box className="flex items-center gap-2">
                          <Text as="strong" className="text-sm font-bold text-foreground">
                            {plot.code}
                          </Text>
                          {plot.readyForHarvest && (
                            <Badge variant="warning" className="text-[10px] px-1.5 py-0.5 font-bold">
                              Sẵn sàng
                            </Badge>
                          )}
                        </Box>
                        <Text variant="muted" className="text-xs">
                          {plot.cropName} • Ngày {plot.currentDay}/{plot.totalDays}
                        </Text>
                      </Box>

                      {plot.readyForHarvest ? (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleHarvestClick(plot.code)}
                          className="rounded-xl text-xs font-bold bg-[#8c4b14] hover:bg-[#733d10] text-white"
                        >
                          🚜 Thu hoạch
                        </Button>
                      ) : (
                        <Box className="flex items-center gap-2">
                          <Text as="span" className="text-xs font-bold text-foreground">
                            {plot.progressPercent}%
                          </Text>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setSelectedLiveCamPlot(plot.code)}
                            aria-label={`Xem camera ${plot.code}`}
                            className="h-8 w-8 text-blue-600 bg-blue-50 dark:bg-blue-950 border-blue-200"
                          >
                            <Video className="h-4 w-4" />
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>

          {/* Field Quick Tools Card */}
          <Card className="p-5 space-y-3">
            <CardHeader className="p-0 pb-1">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tiện Ích Vận Hành Nhanh
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/farmer/plots")}
                className="flex flex-col items-center justify-center gap-2 p-4 h-auto rounded-2xl"
              >
                <QrCode className="h-5 w-5 text-emerald-600" />
                <Text as="span" className="text-xs font-bold">Quét mã QR luống</Text>
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate("/farmer/plots")}
                className="flex flex-col items-center justify-center gap-2 p-4 h-auto rounded-2xl"
              >
                <Sprout className="h-5 w-5 text-teal-600" />
                <Text as="span" className="text-xs font-bold">Bản đồ phân khu</Text>
              </Button>

              <Button
                variant="outline"
                onClick={() => alert("Chức năng báo cáo sự cố vi khí hậu đã được gửi đến Giám sát viên!")}
                className="col-span-2 flex items-center justify-center gap-2 p-3 h-auto rounded-2xl text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <AlertTriangle className="h-4 w-4" />
                <Text as="span" className="text-xs font-bold text-destructive">
                  Báo sự cố sâu bệnh hoặc thiếu nước khẩn cấp
                </Text>
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: LIVE CAMERA PREVIEW OF PLOT
      ───────────────────────────────────────────────────────────── */}
      {selectedLiveCamPlot && (
        <Box className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <Card className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl border border-white/20 p-0">
            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between p-4 bg-slate-900 border-b border-white/10">
              <Box className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                <CardTitle className="text-sm font-bold text-white">
                  Camera Trực Tiếp {selectedLiveCamPlot}
                </CardTitle>
                <Badge variant="secondary" className="bg-white/10 text-slate-300 text-[10px] font-mono">
                  1080P • Góc 01
                </Badge>
              </Box>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedLiveCamPlot(null)}
                className="h-8 w-8 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>

            {/* Video preview frame */}
            <Box className="relative aspect-video w-full overflow-hidden bg-black">
              <img
                src="/images/greenhouse_camera_live.jpg"
                alt="Camera Live"
                className="w-full h-full object-cover"
              />
              <Badge variant="secondary" className="absolute top-3 left-3 bg-black/60 text-white text-xs backdrop-blur-md">
                Luống RA - 102 (Đà Lạt)
              </Badge>
            </Box>

            {/* Footer */}
            <CardFooter className="flex items-center justify-between p-4 bg-slate-900 text-xs text-slate-400">
              <Text as="span" className="text-xs text-slate-300">
                💧 Độ ẩm: <strong>68%</strong> • 🌡 Nhiệt độ: <strong>24.5°C</strong>
              </Text>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedLiveCamPlot(null);
                  navigate("/farmer/plots");
                }}
              >
                Xem chi tiết ô đất
              </Button>
            </CardFooter>
          </Card>
        </Box>
      )}
    </Box>
  );
}
