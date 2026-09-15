import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Wifi,
  ThermometerSun,
  Droplets,
  Video,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  ArrowRight,
  Clock,
  Sprout,
  Activity,
  Truck,
  Layers,
} from "lucide-react";
import { Box, Button, Badge, Text } from "@/shared/ui";

export function HowItWorksGuide() {
  const navigate = useNavigate();

  return (
    <section aria-labelledby="how-it-works-title" className="w-full space-y-10 select-none">
      {/* ── 1. Section Header & Focal Typography ── */}
      <Box className="text-center space-y-3 max-w-3xl mx-auto px-4">
        <Box className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
          <span className="text-xs font-bold uppercase tracking-wider">
            Hệ sinh thái nông nghiệp thông minh 4.0 • Cloud Farming
          </span>
        </Box>

        <Text
          as="h2"
          id="how-it-works-title"
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
        >
          Số Hóa Toàn Diện Mô Hình Thuê Đất <br className="hidden sm:inline" /> & Canh Tác
        </Text>

        <Text className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Kết nối trực tiếp cư dân với nông trại Đạ Sar (Lạc Dương) qua 4 phân hệ khép kín:
          từ đặt giữ chỗ 5 phút, giám sát Camera HLS & cảm biến IoT 24/7, đến thu hoạch và tra cứu vận đơn QR.
        </Text>
      </Box>

      {/* ── 2. Bento Grid: 3 Independent High-Impact Cards ── */}
      <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── CARD 1: Phân Hệ Thuê Ô Đất & Thanh Toán VietQR ── */}
        <Box className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-card border border-emerald-100/80 dark:border-emerald-950/60 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 relative overflow-hidden group">
          <Box className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

          {/* Card Header */}
          <Box className="space-y-4">
            <Box className="flex items-center justify-between gap-3">
              <Box className="flex items-center gap-2.5">
                <Box className="w-10 h-10 rounded-2xl bg-emerald-100/80 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </Box>
                <Box>
                  <Text className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Booking & VietQR
                  </Text>
                  <Text as="h3" className="text-base sm:text-lg font-bold text-foreground">
                    Thuê Ô Đất & Gói Vụ Mùa
                  </Text>
                </Box>
              </Box>

              {/* Concurrency Lock Badge */}
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-300"
              >
                <Clock className="w-3 h-3 text-emerald-600 animate-pulse" />
                Khóa giữ chỗ 5 phút
              </Badge>
            </Box>

            {/* Core Feature Insight Card */}
            <Box className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3.5">
              <Box className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" /> Bản đồ ô đất trực quan
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                  Lạc Dương, Đạ Sar
                </span>
              </Box>

              {/* Crop Seasonality Highlight */}
              <Box className="flex items-start gap-3 p-2.5 rounded-xl bg-card border border-border/80 shadow-2xs">
                <Box className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 flex items-center justify-center text-emerald-600 shrink-0">
                  <Sprout className="w-4 h-4" />
                </Box>
                <Box className="space-y-0.5 min-w-0">
                  <Text className="text-xs font-bold text-foreground truncate">
                    Quy hoạch sẵn giống cây theo vụ
                  </Text>
                  <Text className="text-[11px] text-muted-foreground">
                    Cải bó xôi, Cà chua bi, Xà lách • Chu kỳ 30 - 60 ngày
                  </Text>
                </Box>
              </Box>

              {/* Real VietQR payment pill */}
              <Box className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-border text-[11px]">
                <span className="text-muted-foreground font-medium">
                  Chuyển khoản VietQR Napas 24/7
                </span>
                <span className="font-bold text-emerald-600">
                  Kích hoạt hợp đồng tự động
                </span>
              </Box>
            </Box>

            <Text className="text-xs text-muted-foreground leading-relaxed">
              Cơ chế Hold Lock 5 phút độc quyền chống xung đột đặt trùng. Khi thanh toán hoàn tất,
              hệ thống tự động kích hoạt hợp đồng vụ mùa với snapshot giá minh bạch.
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
              <span>Khám phá bản đồ ô đất</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Box>
        </Box>

        {/* ── CARD 2: Giám Sát Camera HLS & Telemetry IoT ── */}
        <Box className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-card border border-emerald-100/80 dark:border-emerald-950/60 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 relative overflow-hidden group">
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
                    Surveillance & Farming
                  </Text>
                  <Text as="h3" className="text-base sm:text-lg font-bold text-foreground">
                    Camera HLS & Cảm Biến IoT
                  </Text>
                </Box>
              </Box>

              {/* Active Plot Badge */}
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-foreground"
              >
                <Wifi className="w-3 h-3 text-emerald-600 animate-pulse" />
                PLT-A01 • HLS Live
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
                  HLS HD
                </span>
              </Box>
            </Box>

            {/* Care request & Farming Log highlight */}
            <Box className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 text-xs">
              <span className="text-emerald-900 dark:text-emerald-100 font-medium">
                Dịch vụ chăm sóc định kỳ
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                2 lần miễn phí / tháng
              </span>
            </Box>

            <Text className="text-xs text-muted-foreground leading-relaxed">
              Phát luồng video trực tiếp HLS với lớp phủ HUD Overlay thời gian thực. Nông dân cập nhật ảnh
              nhật ký qua Cloudinary và nghiệm thu phiếu chăm sóc có bằng chứng đối chứng.
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
              <span>Xem camera & nhật ký ô đất</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Box>
        </Box>

        {/* ── CARD 3: Thu Hoạch & Tra Cứu Vận Đơn QR A6 ── */}
        <Box className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-card border border-emerald-100/80 dark:border-emerald-950/60 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 relative overflow-hidden group">
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
                    Fulfillment & Logistics
                  </Text>
                  <Text as="h3" className="text-base sm:text-lg font-bold text-foreground">
                    Thu Hoạch & Tra Cứu Mã QR
                  </Text>
                </Box>
              </Box>

              {/* Certification Badge */}
              <Badge
                variant="outline"
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full border-amber-300 bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:border-amber-800 dark:text-amber-300"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                Phiếu A6 VietGAP
              </Badge>
            </Box>

            {/* Core Feature: QR Tracking Code & Format */}
            <Box className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
              {/* Simulated QR Code Badge according to requirement format */}
              <Box className="flex items-center gap-3 p-2.5 rounded-xl bg-card border border-border/80 shadow-2xs">
                <Box className="w-11 h-11 rounded-lg bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-700 shrink-0 border border-amber-200/70 dark:border-amber-900/70">
                  <QrCode className="w-6 h-6" />
                </Box>
                <Box className="space-y-0.5 min-w-0">
                  <Text className="text-xs font-bold text-foreground truncate">
                    Mã Vận Đơn: AGRI-VN-20260915-K8X29Q
                  </Text>
                  <Text className="text-[11px] text-muted-foreground">
                    Barcode Code128 + Deep Link tra cứu kiện hàng
                  </Text>
                </Box>
              </Box>

              {/* Logistics Checklist from specs */}
              <Box className="space-y-2 pt-1">
                <Box className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sản lượng cân nặng thực tế chuẩn xác (kg)</span>
                </Box>
                <Box className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Quét QR xem lộ trình giao hàng & bảo mật SĐT</span>
                </Box>
              </Box>
            </Box>

            <Text className="text-xs text-muted-foreground leading-relaxed">
              Nông dân tạo lệnh thu hoạch, hệ thống tự động sinh phiếu gửi hàng A6 tích hợp Barcode Code128
              và mã QR tra cứu công khai lộ trình vận chuyển AgriExpress Logistics.
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
              <span>Tra cứu vận đơn nông sản</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Box>
        </Box>
      </Box>
    </section>
  );
}
