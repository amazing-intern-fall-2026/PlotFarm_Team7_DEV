import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Camera,
  Maximize2,
  Activity,
  Droplets,
  Award,
  ChevronLeft,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import {
  Box,
  Flex,
  Card,
  CardContent,
  Heading,
  Text,
  Badge,
  Button,
  Breadcrumb,
  HlsVideoPlayer,
  type BreadcrumbItemData,
} from "@/shared/ui";
import {
  DEFAULT_PLOT_CROP,
  PLOT_DETAIL_TEXTS,
  type PlotCropInfo,
} from "@/widgets/PlotDetail/plot-detail.constants";
import { PlotCropCard } from "@/widgets/PlotDetail/PlotCropCard";
import { CropTimeline } from "@/widgets/PlotDetail/CropTimeline";
import { FarmerProfileCard } from "@/widgets/PlotDetail/FarmerProfileCard";
import { PlotBookingSummary } from "@/widgets/PlotDetail/PlotBookingSummary";
import {
  fetchPlotDetailApi,
  type PlotDetailUiItem,
} from "@/entities/plot/api/plotsApi";

export function PlotDetailPage() {
  const { id, plotId } = useParams<{ id?: string; plotId?: string }>();
  const currentPlotId = id || plotId || "PLOT-001";
  const navigate = useNavigate();

  const [plotData, setPlotData] = React.useState<PlotDetailUiItem | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isZoomCamera, setIsZoomCamera] = React.useState<boolean>(false);

  const loadPlot = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPlotDetailApi(currentPlotId);
      setPlotData(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Không thể tải thông tin ô đất từ máy chủ";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [currentPlotId]);

  React.useEffect(() => {
    loadPlot();
  }, [loadPlot]);

  // Loading State UI (Skeleton)
  if (loading) {
    return (
      <Box className="min-h-screen pb-24 lg:pb-12 bg-slate-50/50 dark:bg-slate-950 font-sans">
        <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 animate-pulse space-y-6">
          <Flex justify="between" align="center">
            <Box className="h-5 w-48 bg-muted/70 rounded-md" />
            <Box className="h-8 w-32 bg-muted/60 rounded-md" />
          </Flex>

          <Box className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <Box className="lg:col-span-8 space-y-6">
              {/* Camera skeleton */}
              <Box className="w-full aspect-video sm:h-[340px] bg-muted/60 rounded-2xl" />
              {/* Specs card skeleton */}
              <Card className="p-6 border border-border/60">
                <Box className="space-y-4">
                  <Box className="h-6 w-1/3 bg-muted/70 rounded" />
                  <Box className="grid grid-cols-3 gap-4">
                    <Box className="h-16 bg-muted/50 rounded-xl" />
                    <Box className="h-16 bg-muted/50 rounded-xl" />
                    <Box className="h-16 bg-muted/50 rounded-xl" />
                  </Box>
                </Box>
              </Card>
              {/* Crop info skeleton */}
              <Box className="h-44 bg-muted/50 rounded-2xl" />
              {/* Timeline skeleton */}
              <Box className="h-36 bg-muted/40 rounded-2xl" />
            </Box>

            <Box className="lg:col-span-4">
              <Box className="h-96 bg-muted/60 rounded-2xl" />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  // Error State UI (Edge Case: Not found or API down)
  if (error || !plotData) {
    return (
      <Box className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-50/50 dark:bg-slate-950">
        <Card className="max-w-lg w-full p-8 text-center border-border/80 shadow-lg space-y-6">
          <Box className="w-14 h-14 mx-auto rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7" />
          </Box>

          <Box className="space-y-2">
            <Heading level={2} className="text-xl font-bold text-foreground">
              Không tìm thấy thông tin ô đất
            </Heading>
            <Text className="text-sm text-muted-foreground">
              {error || `Ô đất #${currentPlotId} không tồn tại hoặc đã được chuyển trạng thái trên hệ thống.`}
            </Text>
          </Box>

          <Flex justify="center" gap={3} className="pt-2">
            <Button
              variant="outline"
              onClick={() => navigate("/plots")}
              className="text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4 mr-1.5" />
              Xem danh sách ô đất
            </Button>
            <Button
              variant="default"
              onClick={loadPlot}
              className="text-xs font-semibold"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Thử tải lại
            </Button>
          </Flex>
        </Card>
      </Box>
    );
  }

  const displayPlotCode = plotData.plotCode || currentPlotId;
  const cleanPlotNumber = displayPlotCode.replace("PLT-", "").replace("PLOT-", "");
  const displayZone = plotData.zone || PLOT_DETAIL_TEXTS.defaultZoneName;
  const displayArea = plotData.areaSquareMeters || 20;
  const displayBasePrice = plotData.pricePerMonth || 1200000;
  const displayImageUrl = plotData.imageUrl || "/images/plot-1.jpg";

  // Stream URL: ưu tiên từ DB, fallback về VITE_MOCK_STREAM_URL nếu ô đất có camera
  const MOCK_STREAM_URL = import.meta.env.VITE_MOCK_STREAM_URL as string | undefined;
  const displayStreamUrl =
    plotData.streamUrl ||
    (plotData.cameraSupported && MOCK_STREAM_URL ? MOCK_STREAM_URL : null);

  const currentCrop: PlotCropInfo = {
    ...DEFAULT_PLOT_CROP,
    name: plotData.cropName || DEFAULT_PLOT_CROP.name,
    description: plotData.cropDetails?.description || DEFAULT_PLOT_CROP.description,
    harvestCycleDays: plotData.cropDetails?.durationDays || DEFAULT_PLOT_CROP.harvestCycleDays,
    expectedYieldKg: plotData.cropDetails?.expectedYieldKgPerSqm
      ? `${Math.round(plotData.cropDetails.expectedYieldKgPerSqm * displayArea * 0.8)} - ${Math.round(plotData.cropDetails.expectedYieldKgPerSqm * displayArea)} kg`
      : DEFAULT_PLOT_CROP.expectedYieldKg,
  };

  const breadcrumbItems: BreadcrumbItemData[] = [
    { label: "Khám phá ô đất", href: "/plots" },
    { label: `Ô đất #${cleanPlotNumber}`, isActive: true },
  ];

  const handleCheckout = () => {
    navigate(`/checkout/${displayPlotCode}`);
  };

  const isAvailable = plotData.status === "AVAILABLE";
  const isOccupied = plotData.status === "OCCUPIED";
  const isReserved = plotData.status === "RESERVED";
  const isMaintenance = plotData.status === "MAINTENANCE";

  return (
    <Box className="min-h-screen pb-24 lg:pb-12 bg-slate-50/50 dark:bg-slate-950 font-sans">
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <Flex
          justify="between"
          align="center"
          className="mb-4 sm:mb-6 flex-wrap gap-3"
        >
          <Breadcrumb items={breadcrumbItems} />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/plots")}
            className="text-slate-600 hover:text-emerald-700 text-xs font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Danh sách ô đất
          </Button>
        </Flex>

        {/* Cảnh báo trạng thái nếu ô đất không còn sẵn sàng */}
        {!isAvailable && (
          <Box className="mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50/90 dark:bg-amber-950/40 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-center justify-between flex-wrap gap-3">
            <Flex align="center" gap={3}>
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <Text className="text-xs sm:text-sm font-medium">
                {isOccupied && "Ô đất này hiện đang được canh tác. Quý khách có thể xem camera trực tiếp hoặc chọn ô đất khác."}
                {isReserved && "Ô đất này đang có khách giữ chỗ tạm thời trong phiên thanh toán."}
                {isMaintenance && "Ô đất đang trong quy trình khử trùng và cải tạo vi sinh đất định kỳ."}
              </Text>
            </Flex>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/plots")}
              className="text-xs font-medium border-amber-300 hover:bg-amber-100 dark:border-amber-700"
            >
              Chọn ô đất khác
            </Button>
          </Box>
        )}

        <Box className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <Box className="lg:col-span-8 space-y-6">
            {/* Live Camera View Card */}
            <Card className="border border-emerald-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
              <Box className="relative w-full aspect-video sm:h-[340px] bg-slate-950 overflow-hidden group">
                {/* HLS stream nếu có, fallback về ảnh tĩnh */}
                <HlsVideoPlayer
                  streamUrl={displayStreamUrl}
                  fallbackImageUrl={displayImageUrl}
                  alt={`Live Camera ${displayPlotCode}`}
                  className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                />

                <Box className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <Flex
                    align="center"
                    gap={2}
                    className="bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20"
                  >
                    <Box className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <Camera className="w-3.5 h-3.5 text-white" />
                    <Text
                      variant="caption"
                      className="text-white font-mono text-[11px] font-semibold"
                    >
                      LIVE CAM 1080P • KHU VỰC {displayZone.toUpperCase()}
                    </Text>
                  </Flex>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsZoomCamera(true)}
                    className="h-8 w-8 p-0 rounded-full bg-slate-950/60 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20"
                    aria-label="Phóng to camera"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </Box>

                <Box className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                  <Flex
                    align="center"
                    gap={3}
                    className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10"
                  >
                    <Text variant="caption">Nhiệt độ: 19.4°C</Text>
                    <Text variant="caption">•</Text>
                    <Text variant="caption">Độ ẩm đất: 74%</Text>
                    <Text variant="caption">•</Text>
                    <Text variant="caption">pH: 6.5</Text>
                  </Flex>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-600/90 text-white text-[11px] font-medium border-0 backdrop-blur-md"
                  >
                    {isAvailable ? "Sẵn sàng gieo trồng" : plotData.status}
                  </Badge>
                </Box>
              </Box>

              {/* Thông số ô đất */}
              <CardContent className="p-4 sm:p-6 space-y-4">
                <Flex
                  justify="between"
                  align="start"
                  className="flex-wrap gap-2"
                >
                  <Box>
                    <Heading
                      level={2}
                      className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
                    >
                      {plotData.plotNumber || `Ô đất #${cleanPlotNumber}`}
                    </Heading>
                    <Text className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      {displayZone} • {plotData.farmAddress || "Lạc Dương, Đà Lạt, Lâm Đồng"}
                    </Text>
                  </Box>

                  <Badge
                    variant="outline"
                    className="border-emerald-200 text-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300 font-semibold"
                  >
                    Mã số: #{cleanPlotNumber}
                  </Badge>
                </Flex>

                <Box className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <Box className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <Text className="text-xs text-slate-500 dark:text-slate-400">
                      Diện tích
                    </Text>
                    <Text className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {displayArea} m²
                    </Text>
                  </Box>
                  <Box className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <Text className="text-xs text-slate-500 dark:text-slate-400">
                      Cây quy hoạch
                    </Text>
                    <Text className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 truncate" title={currentCrop.name}>
                      {currentCrop.name}
                    </Text>
                  </Box>
                  <Box className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <Text className="text-xs text-slate-500 dark:text-slate-400">
                      Chu kỳ thu hoạch
                    </Text>
                    <Text className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {currentCrop.harvestCycleDays} ngày
                    </Text>
                  </Box>
                  <Box className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <Text className="text-xs text-slate-500 dark:text-slate-400">
                      Hệ thống tưới
                    </Text>
                    <Text className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      Nhỏ giọt Israel
                    </Text>
                  </Box>
                </Box>

                <Box className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Flex
                    align="start"
                    gap={2}
                    className="text-slate-600 dark:text-slate-400"
                  >
                    <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <Text variant="caption" className="text-xs">
                      {PLOT_DETAIL_TEXTS.systemSpecs.standard}
                    </Text>
                  </Flex>
                  <Flex
                    align="start"
                    gap={2}
                    className="text-slate-600 dark:text-slate-400"
                  >
                    <Droplets className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <Text variant="caption" className="text-xs">
                      Cải tạo vi sinh hữu cơ 100%
                    </Text>
                  </Flex>
                  <Flex
                    align="start"
                    gap={2}
                    className="text-slate-600 dark:text-slate-400"
                  >
                    <Activity className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <Text variant="caption" className="text-xs">
                      Giám sát IoT 24/7 tự động
                    </Text>
                  </Flex>
                </Box>
              </CardContent>
            </Card>

            {/* Giống Cây Trồng Quy Hoạch Của Ô Đất */}
            <PlotCropCard crop={currentCrop} />

            {/* Lộ Trình Sinh Trưởng */}
            <CropTimeline />

            {/* Kỹ Sư Nông Học Phụ Trách */}
            <FarmerProfileCard />
          </Box>

          {/* Thanh toán và Đặt thuê */}
          <Box className="lg:col-span-4">
            <PlotBookingSummary
              basePrice={displayBasePrice}
              crop={currentCrop}
              plotCode={cleanPlotNumber}
              areaSqm={displayArea}
              onCheckout={handleCheckout}
            />
          </Box>
        </Box>
      </Box>

      {/* Fullscreen Video Zoom Modal */}
      {isZoomCamera && (
        <Box
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
        >
          <Box className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <Flex
              justify="between"
              align="center"
              className="p-4 bg-slate-900 text-white"
            >
              <Flex align="center" gap={2}>
                <Camera className="w-5 h-5 text-emerald-400" />
                <Heading level={4} className="text-sm font-bold text-white">
                  Camera 1080P Trực tiếp • Ô #{cleanPlotNumber}
                </Heading>
              </Flex>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsZoomCamera(false)}
                className="text-white border-slate-700 hover:bg-slate-800"
              >
                Đóng
              </Button>
            </Flex>
            <HlsVideoPlayer
              streamUrl={displayStreamUrl}
              fallbackImageUrl={displayImageUrl}
              alt="Fullscreen camera"
              className="w-full h-auto max-h-[75vh] object-contain"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
