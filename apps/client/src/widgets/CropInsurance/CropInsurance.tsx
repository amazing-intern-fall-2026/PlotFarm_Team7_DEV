import * as React from "react";
import {
  ShieldAlert,
  CloudHail,
  Sprout,
  Bug,
  RefreshCw,
  Coins,
  PackageCheck,
  CheckCircle2,
  Clock,
  PhoneCall,
  FileCheck2,
  Camera,
  AlertTriangle,
  ArrowRight,
  Headphones,
  Check,
  Sparkles,
} from "lucide-react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Badge,
  Input,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import {
  CROP_INSURANCE_SUMMARY,
  CROP_INSURANCE_METRICS,
  INSURANCE_COVERAGE_LIST,
  INSURANCE_REMEDIES,
  INSURANCE_ACTIVATION_STEPS,
  INSURANCE_MOCK_CLAIM,
  type InsuranceCoverageItem,
  type InsuranceRemedyItem,
} from "./crop-insurance.constants";

export function CropInsurance() {
  // Modal state for submitting an incident claim
  const [isClaimModalOpen, setIsClaimModalOpen] = React.useState(false);
  const [selectedPlot, setSelectedPlot] = React.useState(INSURANCE_MOCK_CLAIM.plotsAvailable[0].id);
  const [selectedIncident, setSelectedIncident] = React.useState(INSURANCE_MOCK_CLAIM.incidentTypes[0].value);
  const [selectedRemedy, setSelectedRemedy] = React.useState<string>("replant");
  const [incidentNotes, setIncidentNotes] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const getCoverageIcon = (iconName: InsuranceCoverageItem["iconName"]) => {
    switch (iconName) {
      case "cloud-hail":
        return <CloudHail className="w-6 h-6 text-sky-600 dark:text-sky-400" />;
      case "sprout-off":
        return <Sprout className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case "bug-shield":
        return <Bug className="w-6 h-6 text-rose-600 dark:text-rose-400" />;
      default:
        return <ShieldAlert className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  const getRemedyIcon = (type: InsuranceRemedyItem["type"]) => {
    switch (type) {
      case "replant":
        return <RefreshCw className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case "buffer_stock":
        return <PackageCheck className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
      case "refund":
        return <Coins className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
    }
  };

  const handleOpenClaimModal = () => {
    setIsSubmitted(false);
    setIsClaimModalOpen(true);
  };

  const handleSubmitClaim = () => {
    setIsSubmitted(true);
  };

  return (
    <Box className="space-y-10 w-full">
      {/* Hero Section */}
      <Box className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-emerald-800/40">
        <Box className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <Box className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <Box className="relative z-10 max-w-4xl space-y-6">
          <Box className="flex flex-wrap items-center gap-3">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 px-3.5 py-1 text-xs font-semibold tracking-wide uppercase">
              <ShieldAlert className="w-3.5 h-3.5 mr-1.5 inline" />
              Green Farm Safeguard 2026
            </Badge>
            <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/40 px-3.5 py-1 text-xs font-medium">
              Áp dụng mặc định 100% hợp đồng
            </Badge>
          </Box>

          <Box className="space-y-3">
            <Typography.H1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Chính Sách Bảo Hiểm Rủi Ro Mùa Vụ Sinh Học
            </Typography.H1>
            <Typography.P className="text-emerald-100/90 text-sm sm:text-base lg:text-lg max-w-3xl leading-relaxed">
              Nông nghiệp tự nhiên không thể tránh khỏi biến đổi thời tiết cực đoan hay dịch hại bất khả kháng. 
              Green Farm tiên phong bảo hộ toàn diện mọi hợp đồng thuê đất số: đền bù rau dự phòng, trồng lại miễn phí, 
              hoặc hoàn tiền trong 24 giờ.
            </Typography.P>
          </Box>

          {/* Metrics Ribbon */}
          <Box className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-emerald-800/40">
            {CROP_INSURANCE_METRICS.map((metric, idx) => (
              <Box key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-3.5 border border-white/10">
                <Typography.H4 className="text-xl sm:text-2xl font-bold text-emerald-300 mb-0.5">
                  {metric.value}
                </Typography.H4>
                <Typography.Text className="text-xs font-semibold text-white block">
                  {metric.label}
                </Typography.Text>
                <Typography.Text className="text-[11px] text-emerald-200/70 hidden sm:block mt-0.5 leading-snug">
                  {metric.desc}
                </Typography.Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Section 1: Coverage / Phạm vi bảo hiểm (Bento Grid) */}
      <Box className="space-y-6">
        <Box className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <Box className="space-y-1">
            <Box className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-wider uppercase">
              <ShieldAlert className="w-4 h-4" />
              Phạm Vi Bảo Hiểm (Coverage)
            </Box>
            <Typography.H2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              3 Nhóm Rủi Ro Sinh Học & Thiên Tai Được Bảo Hộ
            </Typography.H2>
          </Box>
          <Typography.Text className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
            Kỹ sư nông học giám định định lượng rõ ràng qua dữ liệu cảm biến và camera hiện trường.
          </Typography.Text>
        </Box>

        <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INSURANCE_COVERAGE_LIST.map((cov) => (
            <Card
              key={cov.id}
              className="group relative flex flex-col justify-between border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden"
            >
              <CardHeader className="p-5 sm:p-6 pb-4">
                <Box className="flex items-center justify-between gap-2 mb-3">
                  <Box className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getCoverageIcon(cov.iconName)}
                  </Box>
                  <Badge variant="outline" className="text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                    {cov.badge}
                  </Badge>
                </Box>
                <Typography.H4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {cov.title}
                </Typography.H4>
                <Typography.Text className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1 block">
                  {cov.subtitle}
                </Typography.Text>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 pt-0 space-y-4 flex-1 flex flex-col justify-between">
                <Typography.P className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {cov.description}
                </Typography.P>

                {/* Threshold box */}
                <Box className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60 space-y-0.5">
                  <Typography.Text className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block uppercase tracking-wide">
                    {cov.thresholdLabel}
                  </Typography.Text>
                  <Typography.Text className="text-sm font-extrabold text-emerald-950 dark:text-emerald-100 block">
                    {cov.threshold}
                  </Typography.Text>
                </Box>

                {/* Requirements checklist */}
                <Box className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Typography.Text className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Căn cứ giám định minh bạch:
                  </Typography.Text>
                  <Box className="space-y-1.5">
                    {cov.evidenceRequirements.map((item, i) => (
                      <Box key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <Typography.Text className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                          {item}
                        </Typography.Text>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Section 2: Remedy / Hình thức bồi hoàn */}
      <Box className="space-y-6">
        <Box className="space-y-1">
          <Box className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-wider uppercase">
            <RefreshCw className="w-4 h-4" />
            Hình Thức Bồi Hoàn (Remedy)
          </Box>
          <Typography.H2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            3 Lựa Chọn Bồi Hoàn Linh Hoạt Cho Khách Hàng
          </Typography.H2>
        </Box>

        <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INSURANCE_REMEDIES.map((rem) => (
            <Card
              key={rem.id}
              className="flex flex-col justify-between border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardHeader className="p-5 sm:p-6 pb-3">
                <Box className="flex items-center justify-between gap-2 mb-3">
                  <Box className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center">
                    {getRemedyIcon(rem.type)}
                  </Box>
                  <Badge variant="outline" className="text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <Clock className="w-3 h-3 mr-1 inline text-slate-500" />
                    {rem.processingTime}
                  </Badge>
                </Box>
                <Typography.H4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                  {rem.title}
                </Typography.H4>
                <Typography.Text className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                  {rem.subtitle}
                </Typography.Text>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 pt-0 space-y-4 flex-1 flex flex-col justify-between">
                <Typography.P className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {rem.description}
                </Typography.P>

                <Box className="p-3 bg-teal-50/70 dark:bg-teal-950/30 rounded-xl border border-teal-200/60 dark:border-teal-800/60">
                  <Box className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    <Typography.Text className="text-xs font-bold text-teal-900 dark:text-teal-200">
                      Quyền lợi bổ sung:
                    </Typography.Text>
                  </Box>
                  <Typography.Text className="text-xs text-teal-800 dark:text-teal-300 block">
                    {rem.benefitHighlight}
                  </Typography.Text>
                </Box>

                <Box className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {rem.terms.map((term, i) => (
                    <Box key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <Typography.Text className="text-xs text-slate-600 dark:text-slate-300">
                        {term}
                      </Typography.Text>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Section 3: Quy trình kích hoạt bảo hiểm 3 bước (Horizontal Stepper) */}
      <Box className="space-y-6">
        <Box className="space-y-1">
          <Box className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-wider uppercase">
            <FileCheck2 className="w-4 h-4" />
            Quy Trình Kích Hoạt
          </Box>
          <Typography.H2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Quy Trình Giám Định & Xử Lý Sự Cố Trong 3 Bước
          </Typography.H2>
        </Box>

        <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8">
          <Box className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {INSURANCE_ACTIVATION_STEPS.map((step, idx) => (
              <Box key={step.step} className="relative flex flex-col justify-between space-y-4">
                {/* Step header with badge & number */}
                <Box className="space-y-3">
                  <Box className="flex items-center justify-between">
                    <Box className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-md shadow-emerald-600/30">
                      0{step.step}
                    </Box>
                    <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold border-slate-200">
                      <Clock className="w-3 h-3 mr-1 inline text-emerald-600" />
                      {step.sla}
                    </Badge>
                  </Box>

                  <Typography.H4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {step.title}
                  </Typography.H4>

                  <Typography.Text className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block">
                    Chủ thể: {step.actor}
                  </Typography.Text>

                  <Typography.P className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </Typography.P>
                </Box>

                {/* Step detail items */}
                <Box className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3.5 space-y-2 border border-slate-100 dark:border-slate-800">
                  {step.details.map((detail, dIdx) => (
                    <Box key={dIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <Typography.Text className="text-xs text-slate-600 dark:text-slate-300">
                        {detail}
                      </Typography.Text>
                    </Box>
                  ))}
                </Box>

                {/* Connecting indicator on Desktop */}
                {idx < 2 && (
                  <Box className="hidden lg:block absolute -right-4 top-5 translate-x-1/2 text-slate-300 dark:text-slate-700">
                    <ArrowRight className="w-6 h-6" />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Card>
      </Box>

      {/* Section 4: Large CTA Banner "Yêu cầu hỗ trợ khẩn cấp / Hotline Kỹ sư 24/7" */}
      <Card className="border-emerald-300 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 via-teal-50/60 to-white dark:from-emerald-950/40 dark:via-teal-950/20 dark:to-slate-900 rounded-3xl p-6 sm:p-10 shadow-sm">
        <Box className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          <Box className="space-y-3 text-center lg:text-left max-w-2xl">
            <Badge className="bg-emerald-600 text-white px-3 py-1 text-xs font-semibold">
              <Headphones className="w-3.5 h-3.5 mr-1.5 inline" />
              Túc Trực 24/7 Tại Farm Đà Lạt
            </Badge>
            <Typography.H3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Phát Hiện Ô Đất Có Dấu Hiệu Bất Thường?
            </Typography.H3>
            <Typography.P className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Đừng ngần ngại bấm nút báo cáo sự cố hoặc gọi trực tiếp Hotline kỹ sư nông học để kích hoạt quy trình
              kiểm tra thực địa trong vòng 2 giờ. Mọi tổn thất của bạn đều được chúng tôi bảo vệ 100%.
            </Typography.P>
          </Box>

          <Box className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <Button
              size="lg"
              onClick={handleOpenClaimModal}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              Báo Cáo Sự Cố & Kích Hoạt Bảo Hiểm
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                window.location.href = `tel:${CROP_INSURANCE_SUMMARY.hotline.replace(/\s/g, "")}`;
              }}
              className="w-full sm:w-auto border-emerald-600 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              Hotline: {CROP_INSURANCE_SUMMARY.hotline}
            </Button>
          </Box>
        </Box>
      </Card>

      {/* Claim Submission Modal */}
      {isClaimModalOpen && (
        <Box className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in-50 zoom-in-95">
            <CardHeader className="p-6 border-b border-slate-100 dark:border-slate-800 bg-emerald-50/50 dark:bg-emerald-950/20">
              <Box className="flex items-center justify-between">
                <Box className="flex items-center gap-2">
                  <Box className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5" />
                  </Box>
                  <Box>
                    <Typography.H4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      Báo Cáo Sự Cố Mùa Vụ Khẩn Cấp
                    </Typography.H4>
                    <Typography.Text className="text-xs text-slate-500">
                      Cam kết kỹ sư phản hồi và có mặt trong ≤ 2 giờ
                    </Typography.Text>
                  </Box>
                </Box>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsClaimModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </Button>
              </Box>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              {!isSubmitted ? (
                <>
                  {/* Select plot */}
                  <Box className="space-y-1.5">
                    <Typography.Text className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Chọn ô đất gặp sự cố:
                    </Typography.Text>
                    <Box className="space-y-2">
                      {INSURANCE_MOCK_CLAIM.plotsAvailable.map((plot) => (
                        <Box
                          key={plot.id}
                          onClick={() => setSelectedPlot(plot.id)}
                          className={cn(
                            "p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between",
                            selectedPlot === plot.id
                              ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-semibold"
                              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300"
                          )}
                        >
                          <Typography.Text className="text-xs">{plot.name}</Typography.Text>
                          <Badge variant="outline" className="text-[10px]">{plot.contractId}</Badge>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Incident type */}
                  <Box className="space-y-1.5">
                    <Typography.Text className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Hiện trạng / Triệu chứng ghi nhận:
                    </Typography.Text>
                    <Box className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {INSURANCE_MOCK_CLAIM.incidentTypes.map((inc) => (
                        <Box
                          key={inc.value}
                          onClick={() => setSelectedIncident(inc.value)}
                          className={cn(
                            "p-2.5 rounded-xl border text-left cursor-pointer text-xs transition-all",
                            selectedIncident === inc.value
                              ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 font-bold"
                              : "border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                          )}
                        >
                          {inc.label}
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Preferred remedy */}
                  <Box className="space-y-1.5">
                    <Typography.Text className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Nguyện vọng bồi hoàn ưu tiên:
                    </Typography.Text>
                    <Box className="grid grid-cols-3 gap-2">
                      <Box
                        onClick={() => setSelectedRemedy("replant")}
                        className={cn(
                          "p-2 rounded-xl border text-center cursor-pointer text-xs transition-all",
                          selectedRemedy === "replant"
                            ? "border-emerald-600 bg-emerald-50 font-bold text-emerald-800"
                            : "border-slate-200 text-slate-600"
                        )}
                      >
                        Trồng bù mới
                      </Box>
                      <Box
                        onClick={() => setSelectedRemedy("buffer_stock")}
                        className={cn(
                          "p-2 rounded-xl border text-center cursor-pointer text-xs transition-all",
                          selectedRemedy === "buffer_stock"
                            ? "border-emerald-600 bg-emerald-50 font-bold text-emerald-800"
                            : "border-slate-200 text-slate-600"
                        )}
                      >
                        Bù rau dự phòng
                      </Box>
                      <Box
                        onClick={() => setSelectedRemedy("refund")}
                        className={cn(
                          "p-2 rounded-xl border text-center cursor-pointer text-xs transition-all",
                          selectedRemedy === "refund"
                            ? "border-emerald-600 bg-emerald-50 font-bold text-emerald-800"
                            : "border-slate-200 text-slate-600"
                        )}
                      >
                        Hoàn tiền
                      </Box>
                    </Box>
                  </Box>

                  {/* Notes / description */}
                  <Box className="space-y-1">
                    <Typography.Text className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Ghi chú thêm (khung giờ nhìn thấy trên camera / mức độ):
                    </Typography.Text>
                    <Input
                      placeholder="Ví dụ: Camera 24/7 lúc 06:00 thấy ngọn kale bị táp trắng do sương muối..."
                      value={incidentNotes}
                      onChange={(e) => setIncidentNotes(e.target.value)}
                      className="text-xs"
                    />
                  </Box>

                  <Box className="pt-2 flex items-center justify-end gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsClaimModalOpen(false)}
                      className="rounded-xl text-xs"
                    >
                      Huỷ bỏ
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSubmitClaim}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      Gửi Yêu Cầu Giám Định
                    </Button>
                  </Box>
                </>
              ) : (
                <Box className="py-6 text-center space-y-4">
                  <Box className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </Box>
                  <Box className="space-y-1">
                    <Typography.H4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      Đã Gửi Báo Cáo Thành Công!
                    </Typography.H4>
                    <Typography.Text className="text-xs text-slate-500 block">
                      Mã phiếu bảo hiểm: <Typography.Text className="font-bold text-emerald-600">#BH-2026-9821</Typography.Text>
                    </Typography.Text>
                  </Box>
                  <Box className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-left text-xs text-emerald-900 dark:text-emerald-200 space-y-1 border border-emerald-200/50">
                    <Typography.Text className="font-semibold block">
                      Lộ trình xử lý tiếp theo:
                    </Typography.Text>
                    <Typography.Text className="block text-slate-600 dark:text-slate-400 text-[11px]">
                      1. Kỹ sư Nguyễn Văn Đức (Phụ trách Khu A) đã nhận thông báo và di chuyển tới ô đất trong vòng 2 giờ.
                    </Typography.Text>
                    <Typography.Text className="block text-slate-600 dark:text-slate-400 text-[11px]">
                      2. Biên bản giám định sẽ gửi tự động qua SMS và Zalo của bạn kèm ảnh chụp thực địa.
                    </Typography.Text>
                  </Box>
                  <Button
                    size="sm"
                    onClick={() => setIsClaimModalOpen(false)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs"
                  >
                    Đã Hiểu & Quay Lại Trang
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
}
