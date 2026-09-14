import { useNavigate } from "react-router-dom";
import {
  Bot,
  Sparkles,
  Wifi,
  ThermometerSun,
  Droplets,
  Video,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  ArrowRight,
  TrendingUp,
  Sprout,
  Activity,
  Calendar,
} from "lucide-react";
import { Box, Button, Badge, Text } from "@/shared/ui";

export function HowItWorksGuide() {
  const navigate = useNavigate();

  return (
    <section aria-labelledby="how-it-works-title" className="w-full space-y-10 select-none">
      {/* ── 1. Section Header & Focal Typography ── */}
      <Box className="text-center space-y-3 max-w-3xl mx-auto px-4">
        <Box className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Hệ sinh thái nông nghiệp thông minh 4.0
          </span>
        </Box>

        <Text
          as="h2"
          id="how-it-works-title"
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
        >
          Số Hóa Toàn Diện Chuỗi Giá Trị Nông Sản
        </Text>

        <Text className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Minh bạch từng công đoạn từ gieo trồng đến bàn ăn. Trợ lý AI gợi ý mùa vụ,
          cảm biến IoT giám sát 24/7 và mã QR kiểm định chất lượng VietGAP chuẩn xuất khẩu.
        </Text>
      </Box>

      {/* ── 2. Bento Grid: 3 Independent High-Impact Cards ── */}
      <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── CARD 1: Trợ lý AI Advisor ── */}
        <Box className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-card border border-emerald-100/80 dark:border-emerald-950/60 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 relative overflow-hidden group">
          {/* Subtle Ambient Glow */}
          <Box className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

          {/* Card Header */}
          <Box className="space-y-4">
            <Box className="flex items-center justify-between gap-3">
              <Box className="flex items-center gap-2.5">
                <Box className="w-10 h-10 rounded-2xl bg-emerald-100/80 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shadow-xs">
                  <Bot className="w-5 h-5" />
                </Box>
                <Box>
                  <Text className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Decision Support
                  </Text>
                  <Text as="h3" className="text-base sm:text-lg font-bold text-foreground">
                    Trợ Lý AI Advisor
                  </Text>
                </Box>
              </Box>

              {/* Status Badge with Pulsing Green Dot */}
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-300"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                AI Trực tuyến
              </Badge>
            </Box>

            {/* Core Feature Insight Card */}
            <Box className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3.5">
              <Box className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Gợi ý mùa vụ tháng 9
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                  Độ phù hợp: 98%
                </span>
              </Box>

              {/* Recommended Crops Highlight */}
              <Box className="flex items-start gap-3 p-2.5 rounded-xl bg-card border border-border/80 shadow-2xs">
                <Box className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 flex items-center justify-center text-emerald-600 shrink-0">
                  <Sprout className="w-4 h-4" />
                </Box>
                <Box className="space-y-0.5 min-w-0">
                  <Text className="text-xs font-bold text-foreground truncate">
                    Cà Chua Bi & Xà Lách Romaine
                  </Text>
                  <Text className="text-[11px] text-muted-foreground">
                    Thổ nhưỡng Đạ Sar giữ ẩm tốt, sinh trưởng vượt trội
                  </Text>
                </Box>
              </Box>

              {/* Forecast Progress Bar */}
              <Box className="space-y-1.5 pt-0.5">
                <Box className="flex justify-between text-[11px] font-medium text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-600" /> Năng suất dự kiến
                  </span>
                  <span className="font-bold text-foreground">~180kg / vụ (+35%)</span>
                </Box>
                <Box className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <Box className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full w-[88%]" />
                </Box>
              </Box>
            </Box>

            <Text className="text-xs text-muted-foreground leading-relaxed">
              Thuật toán học máy phân tích dữ liệu vi khí hậu và lịch sử thu hoạch
              để tối ưu hóa tỷ lệ hạt nảy mầm và tối đa lợi nhuận mùa vụ.
            </Text>
          </Box>

          {/* Card Footer / Action Button */}
          <Box className="pt-6 mt-auto">
            <Button
              type="button"
              variant="outline"
              className="w-full min-h-[44px] rounded-xl font-bold text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 flex items-center justify-center gap-2 group/btn"
              onClick={() => navigate("/plots")}
            >
              <span>Trải nghiệm tư vấn AI</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Box>
        </Box>

        {/* ── CARD 2: Giám sát Ô Đất IoT 360 ── */}
        <Box className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-card border border-emerald-100/90 dark:border-emerald-950/60 shadow-xs hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 relative overflow-hidden group">
          {/* Subtle Ambient Glow */}
          <Box className="absolute -top-12 -right-12 w-36 h-36 bg-sky-500/8 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

          {/* Card Header */}
          <Box className="space-y-4">
            <Box className="flex items-center justify-between gap-3">
              <Box className="flex items-center gap-2.5">
                <Box className="w-10 h-10 rounded-2xl bg-sky-100/80 dark:bg-sky-950 flex items-center justify-center text-sky-700 dark:text-sky-300 shadow-xs">
                  <Activity className="w-5 h-5" />
                </Box>
                <Box>
                  <Text className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-400">
                    Farm Management IoT
                  </Text>
                  <Text as="h3" className="text-base sm:text-lg font-bold text-foreground">
                    Giám Sát Ô Đất 360°
                  </Text>
                </Box>
              </Box>

              {/* Active Plot Badge */}
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-foreground"
              >
                <Wifi className="w-3 h-3 text-emerald-600 animate-pulse" />
                #A01 • Đạ Sar
              </Badge>
            </Box>

            {/* Core Feature: 3 Key High-Contrast IoT Metrics */}
            <Box className="grid grid-cols-3 gap-2.5 p-3.5 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              {/* Metric 1: Temperature */}
              <Box className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-card border border-border/70 text-center shadow-2xs">
                <ThermometerSun className="w-4 h-4 text-amber-500 mb-1" />
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                  Nhiệt độ
                </span>
                <span className="text-base sm:text-lg font-extrabold text-foreground tracking-tight mt-0.5">
                  23.8°C
                </span>
              </Box>

              {/* Metric 2: Soil Moisture */}
              <Box className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-card border border-border/70 text-center shadow-2xs">
                <Droplets className="w-4 h-4 text-sky-500 mb-1" />
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                  Độ ẩm đất
                </span>
                <span className="text-base sm:text-lg font-extrabold text-foreground tracking-tight mt-0.5">
                  74%
                </span>
              </Box>

              {/* Metric 3: Live Camera Stream */}
              <Box className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-card border border-border/70 text-center shadow-2xs">
                <Video className="w-4 h-4 text-emerald-500 mb-1" />
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                  Camera
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight mt-1">
                  1080p Live
                </span>
              </Box>
            </Box>

            {/* System Status Pill */}
            <Box className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 text-xs">
              <span className="text-emerald-900 dark:text-emerald-100 font-medium">
                Hệ thống tưới tự động
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Đang kích hoạt
              </span>
            </Box>

            <Text className="text-xs text-muted-foreground leading-relaxed">
              Hệ thống telemetry thu thập thông số 15 phút/lần, tự động kích hoạt
              tưới nhỏ giọt khi độ ẩm đất xuống dưới ngưỡng tối ưu.
            </Text>
          </Box>

          {/* Card Footer / Action Button */}
          <Box className="pt-6 mt-auto">
            <Button
              type="button"
              variant="outline"
              className="w-full min-h-[44px] rounded-xl font-bold text-xs sm:text-sm text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-950/50 flex items-center justify-center gap-2 group/btn"
              onClick={() => navigate("/plots")}
            >
              <span>Xem camera trực tiếp</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Box>
        </Box>

        {/* ── CARD 3: Truy Xuất & An Toàn VietGAP ── */}
        <Box className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-card border border-emerald-100/80 dark:border-emerald-950/60 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 relative overflow-hidden group">
          {/* Subtle Ambient Glow */}
          <Box className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/8 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

          {/* Card Header */}
          <Box className="space-y-4">
            <Box className="flex items-center justify-between gap-3">
              <Box className="flex items-center gap-2.5">
                <Box className="w-10 h-10 rounded-2xl bg-amber-100/80 dark:bg-amber-950 flex items-center justify-center text-amber-700 dark:text-amber-300 shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </Box>
                <Box>
                  <Text className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    Traceability & Delivery
                  </Text>
                  <Text as="h3" className="text-base sm:text-lg font-bold text-foreground">
                    Truy Xuất VietGAP
                  </Text>
                </Box>
              </Box>

              {/* Certification Badge */}
              <Badge
                variant="outline"
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full border-amber-300 bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:border-amber-800 dark:text-amber-300"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                VietGAP 100%
              </Badge>
            </Box>

            {/* Core Feature: QR Batch Card & Key Commitments */}
            <Box className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
              {/* Simulated QR Code Badge */}
              <Box className="flex items-center gap-3 p-2.5 rounded-xl bg-card border border-border/80 shadow-2xs">
                <Box className="w-11 h-11 rounded-lg bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-700 shrink-0 border border-amber-200/70 dark:border-amber-900/70">
                  <QrCode className="w-6 h-6" />
                </Box>
                <Box className="space-y-0.5 min-w-0">
                  <Text className="text-xs font-bold text-foreground truncate">
                    Mã Lô Trồng #DF-2026
                  </Text>
                  <Text className="text-[11px] text-muted-foreground">
                    Quét xem chứng thư VietGAP & nhật ký canh tác
                  </Text>
                </Box>
              </Box>

              {/* Commitments Checklist */}
              <Box className="space-y-2 pt-1">
                <Box className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Không thuốc bảo vệ thực vật độc hại</span>
                </Box>
                <Box className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Giao tươi tận nhà trong 24h sau thu hoạch</span>
                </Box>
              </Box>
            </Box>

            <Text className="text-xs text-muted-foreground leading-relaxed">
              Mỗi giỏ nông sản đến tay gia đình đều kèm mã định danh lô gieo trồng,
              cho phép xem lại toàn bộ hành trình nhật ký bón phân hữu cơ.
            </Text>
          </Box>

          {/* Card Footer / Action Button */}
          <Box className="pt-6 mt-auto">
            <Button
              type="button"
              variant="outline"
              className="w-full min-h-[44px] rounded-xl font-bold text-xs sm:text-sm text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-950/50 flex items-center justify-center gap-2 group/btn"
              onClick={() => navigate("/plots")}
            >
              <span>Quét thử nguồn gốc</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Box>
        </Box>
      </Box>
    </section>
  );
}
