import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Camera,
  Maximize2,
  Activity,
  Droplets,
  Award,
  ChevronLeft,
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
  Image,
  Breadcrumb,
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
import { fetchPlotsApi, type PlotUiItem } from "@/entities/plot/api/plotsApi";

export function PlotDetailPage() {
  const { id, plotId } = useParams<{ id?: string; plotId?: string }>();
  const currentPlotId = id || plotId || "A-104";
  const navigate = useNavigate();

  const [plotData, setPlotData] = React.useState<PlotUiItem | null>(null);
  const [isZoomCamera, setIsZoomCamera] = React.useState<boolean>(false);

  React.useEffect(() => {
    let isMounted = true;
    async function loadPlot() {
      try {
        const { plots } = await fetchPlotsApi();
        if (isMounted) {
          const found = plots.find(
            (p) =>
              p.plotCode.toLowerCase() === currentPlotId.toLowerCase() ||
              p.id === currentPlotId ||
              p.plotCode.replace("PLT-", "").toLowerCase() === currentPlotId.toLowerCase(),
          );
          if (found) {
            setPlotData(found);
          }
        }
      } catch (err) {
        if (process.env.NODE_ENV !== "test") {
          console.warn("[PlotDetailPage] Could not load plot details:", err);
        }
      }
    }
    void loadPlot();
    return () => {
      isMounted = false;
    };
  }, [currentPlotId]);

  const displayPlotCode =
    plotData?.plotCode || (currentPlotId.startsWith("PLT-") ? currentPlotId : `PLT-${currentPlotId}`);
  const displayZone = plotData?.zone || PLOT_DETAIL_TEXTS.defaultZoneName;
  const displayArea = plotData?.areaSquareMeters || PLOT_DETAIL_TEXTS.defaultArea;
  const displayBasePrice = plotData?.pricePerMonth || PLOT_DETAIL_TEXTS.defaultBaseRentalPrice;
  const displayImageUrl = plotData?.imageUrl || "/images/plot-1.jpg";

  const currentCrop: PlotCropInfo = {
    ...DEFAULT_PLOT_CROP,
    name: plotData?.cropName || DEFAULT_PLOT_CROP.name,
  };

  const breadcrumbItems: BreadcrumbItemData[] = [
    { label: "Khám phá ô đất", href: "/plots" },
    { label: `Ô đất #${displayPlotCode.replace("PLT-", "")}`, isActive: true },
  ];

  const handleCheckout = () => {
    navigate(`/checkout/${displayPlotCode}`);
  };

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

        <Box className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <Box className="lg:col-span-8 space-y-6">
            <Card className="border border-emerald-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
              <Box className="relative w-full aspect-video sm:h-[340px] bg-slate-950 overflow-hidden group">
                <Image
                  src={displayImageUrl}
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
                      className="text-white font-bold text-[11px] tracking-wider"
                    >
                      LIVE 1080P
                    </Text>
                  </Flex>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsZoomCamera((prev) => !prev)}
                    className="bg-slate-950/70 hover:bg-slate-900 text-white rounded-full p-2 h-8 w-8 border border-white/20 flex items-center justify-center"
                    aria-label="Phóng to camera"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </Box>

                <Box className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 rounded-lg">
                  <Text variant="caption" className="font-mono">
                    CAM-#{displayPlotCode.replace("PLT-", "")} • Góc bao quát phân khu
                  </Text>
                  <Text variant="caption" className="font-mono">
                    FPS: 30 • Bitrate: 4.2 Mbps
                  </Text>
                </Box>
              </Box>

              <CardContent className="p-5 sm:p-6 space-y-4">
                <Flex
                  justify="between"
                  align="start"
                  className="flex-col sm:flex-row gap-3"
                >
                  <Box>
                    <Text
                      variant="caption"
                      className="text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider text-[11px] block mb-1"
                    >
                      Hồ sơ lô canh tác
                    </Text>
                    <Heading
                      level={2}
                      className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white"
                    >
                      Ô ĐẤT #{displayPlotCode.replace("PLT-", "")}
                    </Heading>
                    <Text variant="muted" className="text-xs sm:text-sm mt-1">
                      {displayZone}
                    </Text>
                  </Box>

                  <Box className="text-left sm:text-right bg-emerald-50/70 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                    <Heading
                      level={3}
                      className="text-xl font-bold text-emerald-800 dark:text-emerald-400"
                    >
                      {displayArea} m²
                    </Heading>
                    <Text
                      variant="caption"
                      className="text-slate-500 dark:text-slate-400 text-xs"
                    >
                      {PLOT_DETAIL_TEXTS.defaultDimensions}
                    </Text>
                  </Box>
                </Flex>

                <Box className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <Box className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <Flex justify="between" align="center">
                      <Flex align="center" gap={2}>
                        <Droplets className="w-4 h-4 text-emerald-600" />
                        <Text
                          variant="body2"
                          className="font-semibold text-slate-700 dark:text-slate-200 text-xs"
                        >
                          {PLOT_DETAIL_TEXTS.soilMetrics.phLabel}
                        </Text>
                      </Flex>
                      <Badge
                        variant="success"
                        className="bg-emerald-100 text-emerald-800 text-[10px] font-bold"
                      >
                        {PLOT_DETAIL_TEXTS.soilMetrics.phIdeal}
                      </Badge>
                    </Flex>
                    <Text
                      variant="h4"
                      className="text-base font-bold text-slate-900 dark:text-white mt-1"
                    >
                      {PLOT_DETAIL_TEXTS.soilMetrics.phRange}
                    </Text>
                  </Box>

                  <Box className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <Flex justify="between" align="center">
                      <Flex align="center" gap={2}>
                        <Activity className="w-4 h-4 text-amber-600" />
                        <Text
                          variant="body2"
                          className="font-semibold text-slate-700 dark:text-slate-200 text-xs"
                        >
                          {PLOT_DETAIL_TEXTS.soilMetrics.moistureLabel}
                        </Text>
                      </Flex>
                      <Badge
                        variant="secondary"
                        className="bg-amber-100 text-amber-800 text-[10px] font-bold"
                      >
                        {PLOT_DETAIL_TEXTS.soilMetrics.moistureOptimal}
                      </Badge>
                    </Flex>
                    <Text
                      variant="h4"
                      className="text-base font-bold text-slate-900 dark:text-white mt-1"
                    >
                      {PLOT_DETAIL_TEXTS.soilMetrics.moistureRange}
                    </Text>
                  </Box>
                </Box>

                <Box className="space-y-2 pt-1 text-xs">
                  <Flex
                    align="start"
                    gap={2}
                    className="text-slate-600 dark:text-slate-400"
                  >
                    <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <Text variant="caption" className="text-xs">
                      {PLOT_DETAIL_TEXTS.systemSpecs.soilTreatment}
                    </Text>
                  </Flex>
                  <Flex
                    align="start"
                    gap={2}
                    className="text-slate-600 dark:text-slate-400"
                  >
                    <Activity className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <Text variant="caption" className="text-xs">
                      {PLOT_DETAIL_TEXTS.systemSpecs.irrigation}
                    </Text>
                  </Flex>
                </Box>
              </CardContent>
            </Card>

            <PlotCropCard crop={currentCrop} />

            <CropTimeline />

            <FarmerProfileCard />
          </Box>

          <Box className="lg:col-span-4">
            <PlotBookingSummary
              basePrice={displayBasePrice}
              crop={currentCrop}
              plotCode={displayPlotCode.replace("PLT-", "")}
              areaSqm={displayArea}
              onCheckout={handleCheckout}
            />
          </Box>
        </Box>
      </Box>

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
                  Camera 1080P Trực tiếp • Ô #{displayPlotCode.replace("PLT-", "")}
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
            <Image
              src={displayImageUrl}
              alt="Fullscreen camera"
              className="w-full h-auto max-h-[75vh] object-contain"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
