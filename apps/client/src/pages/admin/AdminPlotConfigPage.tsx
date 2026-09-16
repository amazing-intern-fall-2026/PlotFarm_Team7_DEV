import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Copy,
  Check,
  Video,
  Radio,
  Sliders,
  Users,
  Eye,
  RefreshCw,
  Camera,
  Compass,
  CheckCircle2,
  AlertCircle,
  Thermometer,
  Droplets,
  Sprout,
} from "lucide-react";
import {
  Card,
  Button,
  Box,
} from "@/shared/ui";

export function AdminPlotConfigPage() {
  const { id = "A-104" } = useParams();
  const navigate = useNavigate();

  const [copied, setCopied] = React.useState(false);
  const [isPinging, setIsPinging] = React.useState(false);
  const [pingStatus, setPingStatus] = React.useState<{ ping: number; ok: boolean } | null>({
    ping: 18,
    ok: true,
  });
  const [isSaving, setIsSaving] = React.useState(false);
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const [plotCode, setPlotCode] = React.useState(id.startsWith("#") ? id : `#${id}`);
  const [plotArea, setPlotArea] = React.useState("20");
  const [soilType, setSoilType] = React.useState("Đất đỏ Bazan hữu cơ");
  const [streamUrl, setStreamUrl] = React.useState(
    `https://stream.cloudfarm.vn/live/plot-${id.toLowerCase().replace("#", "")}/index.m3u8`
  );
  const [sensorId, setSensorId] = React.useState(`SENSOR-${id.replace("#", "")}-IOT-V2`);
  const [maxTemp, setMaxTemp] = React.useState("32");
  const [minMoisture, setMinMoisture] = React.useState("55");
  const [assignedFarmer, setAssignedFarmer] = React.useState("bac-bay");

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(streamUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      const randomPing = Math.floor(Math.random() * 10) + 15;
      setPingStatus({ ping: randomPing, ok: true });
    }, 600);
  };

  const handleSaveConfig = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 700);
  };

  return (
    <Box className="w-full space-y-6 pb-16">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/plots")}
            className="flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Quay lại danh mục</span>
          </Button>

          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Cấu hình Kỹ thuật Ô đất {plotCode}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Đang canh tác
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Nguyễn Thu Hà (#CF-8921)
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <Sprout className="h-3.5 w-3.5 text-emerald-600" />
            Cải cầu vồng Thụy Sĩ
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-7">
          <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-foreground">Khối 1: Thông số cơ bản Ô đất</h3>
              </div>
              <span className="text-[11px] font-mono font-bold text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-sm">
                MÃ PHÂN VÙNG #ZONE-A
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs">
              <div>
                <label className="font-semibold text-foreground">Mã định danh ô đất</label>
                <input
                  type="text"
                  value={plotCode}
                  onChange={(e) => setPlotCode(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-slate-50/50 dark:bg-slate-800/50 p-2.5 font-mono font-bold text-foreground"
                />
              </div>
              <div>
                <label className="font-semibold text-foreground">Diện tích canh tác chuẩn</label>
                <div className="relative mt-1.5">
                  <input
                    type="text"
                    value={plotArea}
                    onChange={(e) => setPlotArea(e.target.value)}
                    className="w-full rounded-xl border border-border bg-slate-50/50 dark:bg-slate-800/50 p-2.5 pr-10 font-bold text-foreground"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">m²</span>
                </div>
              </div>
              <div>
                <label className="font-semibold text-foreground">Loại thổ nhưỡng chuẩn</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-slate-50/50 dark:bg-slate-800/50 p-2.5 font-medium text-foreground"
                >
                  <option>Đất đỏ Bazan hữu cơ</option>
                  <option>Đất phù sa bồi tụ</option>
                  <option>Đất cát pha mùn hữu cơ</option>
                </select>
              </div>
            </div>
          </Card>

          <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-foreground">Khối 2: Cấu hình Luồng Camera HLS (RTSP to HLS)</h3>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-sm">
                Chuẩn HLS.js HTML5
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-foreground flex items-center justify-between">
                  <span>URL Luồng Video Stream HLS (.m3u8 hoặc MP4 Mock)</span>
                  <span className="text-muted-foreground font-normal">Giao thức HTTPS m3u8</span>
                </label>
                <div className="relative mt-1.5">
                  <input
                    type="text"
                    value={streamUrl}
                    onChange={(e) => setStreamUrl(e.target.value)}
                    className="w-full rounded-xl border border-border bg-slate-50/50 dark:bg-slate-800/50 p-2.5 pr-10 font-mono text-foreground"
                  />
                  <button
                    type="button"
                    onClick={handleCopyUrl}
                    title="Sao chép URL"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-foreground"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTestPing}
                  disabled={isPinging}
                  className="flex items-center gap-1.5 text-xs font-semibold"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isPinging ? "animate-spin" : ""}`} />
                  <span>{isPinging ? "Đang kiểm tra..." : "Kiểm tra kết nối luồng (Test Ping)"}</span>
                </Button>

                {pingStatus && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Ping {pingStatus.ping}ms • Kết nối 100% (Bitrate ổn định)
                  </span>
                )}
              </div>
            </div>
          </Card>

          <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-foreground">Khối 3: Liên kết Cảm biến IoT Vi khí hậu</h3>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-sm">
                LoRaWAN Active
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-foreground">ID Cảm biến telemetry liên kết</label>
                <div className="mt-1.5 flex items-center gap-2">
                  <input
                    type="text"
                    value={sensorId}
                    onChange={(e) => setSensorId(e.target.value)}
                    className="flex-1 rounded-xl border border-border bg-slate-50/50 dark:bg-slate-800/50 p-2.5 font-mono text-foreground"
                  />
                  <span className="rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-2.5 text-xs font-medium text-muted-foreground whitespace-nowrap">
                    Trạm LoRaWAN Modbus RS485
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">Cài đặt quy chuẩn ngưỡng cảnh báo (Trigger Rules)</span>
                  <span className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Cảnh báo khẩn cấp đẩy về app
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-xl border border-border p-3 bg-slate-50/50 dark:bg-slate-800/30">
                    <div className="flex items-center gap-2.5">
                      <Thermometer className="h-4 w-4 text-rose-500" />
                      <div>
                        <p className="font-medium text-foreground">Nhiệt độ tối đa</p>
                        <div className="flex items-center gap-1">
                          <span className="text-slate-800 dark:text-slate-200 font-bold">Ngưỡng &gt;</span>
                          <input
                            type="number"
                            value={maxTemp}
                            onChange={(e) => setMaxTemp(e.target.value)}
                            className="w-10 bg-transparent font-bold text-foreground focus:outline-hidden"
                          />
                          <span className="font-bold">°C</span>
                        </div>
                      </div>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-border p-3 bg-slate-50/50 dark:bg-slate-800/30">
                    <div className="flex items-center gap-2.5">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="font-medium text-foreground">Độ ẩm đất tối thiểu</p>
                        <div className="flex items-center gap-1">
                          <span className="text-slate-800 dark:text-slate-200 font-bold">Ngưỡng &lt;</span>
                          <input
                            type="number"
                            value={minMoisture}
                            onChange={(e) => setMinMoisture(e.target.value)}
                            className="w-10 bg-transparent font-bold text-foreground focus:outline-hidden"
                          />
                          <span className="font-bold">%</span>
                        </div>
                      </div>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-foreground">Khối 4: Phân công nhân sự &amp; trách nhiệm</h3>
              </div>
              <span className="text-[11px] font-semibold text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-sm">
                Tổ Canh Tác 01
              </span>
            </div>

            <div className="text-xs space-y-2">
              <label className="font-semibold text-foreground">Nông dân chịu trách nhiệm kỹ thuật ô đất</label>
              <div className="flex items-center justify-between rounded-xl border border-border p-3 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-800 text-white font-bold text-sm">
                    7
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Bác Bảy (Nguyễn Văn Bảy)</p>
                    <p className="text-muted-foreground text-[11px]">Đội Vườn 1 • 8 năm kinh nghiệm canh tác Bio</p>
                  </div>
                </div>
                <select
                  value={assignedFarmer}
                  onChange={(e) => setAssignedFarmer(e.target.value)}
                  className="rounded-lg border border-border bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-emerald-800 focus:outline-hidden"
                >
                  <option value="bac-bay">Đã phân công ✓</option>
                  <option value="chu-nam">Đổi sang Chú Năm</option>
                  <option value="chu-tu">Đổi sang Chú Tư</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-5 lg:col-span-5">
          <Card className="border-border bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-foreground">Kiểm tra trực tiếp góc máy Camera HLS</h3>
              </div>
              <span className="text-[11px] font-mono font-bold text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-sm">
                CAM_HUB_#04
              </span>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src="/images/plot-2.jpg"
                alt="Camera HLS View"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=600&auto=format&fit=crop&q=80";
                }}
              />

              <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between text-[10px] text-white">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-rose-600 px-2 py-0.5 font-bold uppercase tracking-wider">
                    • LIVE 1080p
                  </span>
                  <span className="rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-xs font-mono">
                    HLS: Stream Active
                  </span>
                </div>
                <span className="rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-xs font-mono">
                  6:10:18 AM
                </span>
              </div>

              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white font-mono rounded-lg bg-black/60 px-3 py-1.5 backdrop-blur-xs">
                <span>🌱 Đất: 68%</span>
                <span>🌡 Khí: 24.5°C</span>
                <span className="text-emerald-400">Buffer 3.4s</span>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3.5 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-muted-foreground">Chỉ số truyền tải thực tế (HLS Inspector)</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Ổn định
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="rounded-lg bg-white dark:bg-slate-800 p-2 shadow-2xs border border-border/40">
                  <p className="text-[10px] text-muted-foreground">Độ phân giải</p>
                  <p className="font-mono font-bold text-foreground mt-0.5">1080p</p>
                </div>
                <div className="rounded-lg bg-white dark:bg-slate-800 p-2 shadow-2xs border border-border/40">
                  <p className="text-[10px] text-muted-foreground">FPS</p>
                  <p className="font-mono font-bold text-foreground mt-0.5">30fps</p>
                </div>
                <div className="rounded-lg bg-white dark:bg-slate-800 p-2 shadow-2xs border border-border/40">
                  <p className="text-[10px] text-muted-foreground">Bitrate</p>
                  <p className="font-mono font-bold text-foreground mt-0.5">2840 Kbps</p>
                </div>
                <div className="rounded-lg bg-white dark:bg-slate-800 p-2 shadow-2xs border border-border/40">
                  <p className="text-[10px] text-muted-foreground">Độ trễ</p>
                  <p className="font-mono font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">1.2s</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <p className="text-xs font-semibold text-muted-foreground">Thao tác điều phối kỹ thuật</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => alert("Đang khởi động lại encoder luồng HLS...")}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-white dark:bg-slate-800 py-2.5 text-xs font-semibold text-foreground hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
                  <span>Khởi động lại</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert("Đã chụp và lưu ảnh thumbnail mới vào CDN!")}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-white dark:bg-slate-800 py-2.5 text-xs font-semibold text-foreground hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <Camera className="h-3.5 w-3.5 text-slate-500" />
                  <span>Chụp thumbnail</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert("Mở bàn điều khiển góc quay PTZ")}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-white dark:bg-slate-800 py-2.5 text-xs font-semibold text-foreground hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <Compass className="h-3.5 w-3.5 text-slate-500" />
                  <span>Góc quay PTZ</span>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Khởi tạo luồng: 12 phút trước</span>
              <span>Codec H.264/AAC</span>
            </div>
          </Card>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          <AlertCircle className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Thay đổi cấu hình luồng và cảm biến sẽ áp dụng tức thời cho ứng dụng người dùng.</span>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/plots")}
            className="text-xs font-semibold"
          >
            Hủy bỏ
          </Button>

          <Button
            size="sm"
            onClick={handleSaveConfig}
            disabled={isSaving}
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md"
          >
            {isSaving ? "Đang lưu..." : "✓ Lưu cấu hình ô đất"}
          </Button>
        </div>
      </div>

      {savedSuccess && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-emerald-800 text-white px-5 py-3 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="h-5 w-5 text-white" />
          <span className="text-xs font-bold">Cập nhật cấu hình ô đất thành công!</span>
        </div>
      )}
    </Box>
  );
}
