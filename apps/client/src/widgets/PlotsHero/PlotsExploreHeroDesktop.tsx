import {
  ArrowRight,
  Play,
  Droplets,
  Thermometer,
  Star,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Box, Heading, Text, Button, Avatar } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import type { PlotsExploreHeroViewProps } from "./types";

export function PlotsExploreHeroDesktop({
  liveTime,
  onExploreClick,
  onOpenVideoModal,
  className,
}: PlotsExploreHeroViewProps) {
  return (
    <Box
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-8 lg:py-12 border-b border-border/60 flex flex-col justify-center select-none",
        className,
      )}
    >
      {/* ── Background Ambient Glows & Subtle Pattern ── */}
      <Box className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <Box className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      <Box className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <Box className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ═══════════════════════════════════════════════════════════
              CỘT TRÁI: VALUE PROPOSITION & CTA (COL-SPAN-7)
             ═══════════════════════════════════════════════════════════ */}
          <Box className="col-span-7 flex flex-col items-start text-left space-y-4">
            {/* Pill Tagline — Đồng bộ theo chuẩn HowItWorksGuide, bỏ icon */}
            <Box className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
              <span className="text-xs font-bold uppercase tracking-wider">
                Nông nghiệp số tuần hoàn tại Đà Lạt
              </span>
            </Box>

            {/* Tiêu đề chính (Typography H1 chuẩn Design System) */}
            <Heading
              as="h1"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
            >
              Sở hữu vườn rau hữu cơ riêng của bạn —{" "}
              <span className="text-primary">Giám sát 24/7 từ xa</span>
            </Heading>

            {/* Sub-copy: 1 câu đắt giá kèm 2 gạch đầu dòng icon tick */}
            <Box className="space-y-2.5 max-w-xl">
              <Text className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                Trải nghiệm cảm giác làm chủ nông trại sinh thái tại Đạ Sar - Đà
                Lạt ngay trên điện thoại.
              </Text>

              <Box className="space-y-1.5 pt-0.5">
                <Box className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <Text className="text-xs sm:text-sm text-foreground font-medium">
                    Đội ngũ kỹ sư chăm sóc chuẩn VietGAP.
                  </Text>
                </Box>
                <Box className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <Text className="text-xs sm:text-sm text-foreground font-medium">
                    Cảm biến IoT truyền dữ liệu độ ẩm, dinh dưỡng theo thời gian
                    thực.
                  </Text>
                </Box>
              </Box>
            </Box>

            {/* Cụm Action Buttons (dùng Button chuẩn shared/ui) */}
            <Box className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                variant="primary"
                size="default"
                onClick={onExploreClick}
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="h-11 px-6 rounded-xl font-semibold shadow-md shadow-primary/20"
              >
                Khám phá ô đất trồng ngay
              </Button>

              <Button
                variant="outline"
                size="default"
                onClick={onOpenVideoModal}
                leftIcon={<Play className="h-3.5 w-3.5 fill-current" />}
                className="h-11 px-5 rounded-xl font-medium"
              >
                Xem Video Vườn & Camera Live
              </Button>
            </Box>

            {/* Social Proof (Avatar stack + Star rating) */}
            <Box className="pt-1 flex items-center gap-3 text-left">
              <Box className="flex -space-x-2 items-center">
                <Avatar
                  size="sm"
                  name="Thu Hằng"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
                  className="ring-2 ring-background shadow-xs"
                />
                <Avatar
                  size="sm"
                  name="Tuấn Anh"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80"
                  className="ring-2 ring-background shadow-xs"
                />
                <Avatar
                  size="sm"
                  name="Thanh Mai"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80"
                  className="ring-2 ring-background shadow-xs"
                />
                <Box className="w-8 h-8 rounded-full bg-primary/15 text-primary ring-2 ring-background flex items-center justify-center text-[11px] font-bold shadow-xs">
                  +1.2k
                </Box>
              </Box>

              <Box className="flex flex-col">
                <Box className="flex items-center gap-0.5 text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-amber-500" />
                  <Star className="h-3.5 w-3.5 fill-amber-500" />
                  <Star className="h-3.5 w-3.5 fill-amber-500" />
                  <Star className="h-3.5 w-3.5 fill-amber-500" />
                  <Star className="h-3.5 w-3.5 fill-amber-500" />
                </Box>
                <Text className="text-xs text-muted-foreground pt-0.5">
                  Được tin chọn bởi{" "}
                  <strong className="text-foreground font-bold">1.200+</strong> gia
                  đình thành thị
                </Text>
              </Box>
            </Box>
          </Box>

          {/* ═══════════════════════════════════════════════════════════
              CỘT PHẢI: INTERACTIVE LIVE FARM MOCKUP (COL-SPAN-5)
             ═══════════════════════════════════════════════════════════ */}
          <Box className="col-span-5 w-full relative">
            <Box className="absolute -inset-2 rounded-[28px] bg-primary/10 blur-xl opacity-80 pointer-events-none" />

            {/* Khung máy tính bảng / streaming cao cấp */}
            <Box className="relative w-full h-[320px] lg:h-[350px] rounded-2xl border-4 border-card shadow-xl ring-1 ring-border/80 overflow-hidden bg-slate-950 group">
              {/* Ảnh vườn rau xanh tươi */}
              <img
                src="https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=1000&q=80"
                alt="Vườn xà lách & rau hữu cơ sinh thái Luống #A-102 Đà Lạt"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Scrim */}
              <Box className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

              {/* Header trên ảnh */}
              <Box className="absolute top-0 inset-x-0 bg-black/40 backdrop-blur-md px-3.5 py-2 flex justify-between items-center text-white text-xs z-10 border-b border-white/10">
                <Box className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                  </span>
                  <span className="font-bold uppercase tracking-wider text-rose-300 text-[11px]">
                    LIVE
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/90 font-medium text-[11px]">
                    Cam 01 • Luống Cà Chua #A-102
                  </span>
                </Box>

                <Box className="font-mono text-white/90 bg-white/10 px-2 py-0.5 rounded text-[11px] border border-white/10">
                  {liveTime}
                </Box>
              </Box>

              {/* Mini notification badge */}
              <Box className="absolute top-10 right-2.5 z-10">
                <Box className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-emerald-300 text-[10px] font-medium shadow-md">
                  <Sparkles className="h-3 w-3 text-emerald-400 shrink-0" />
                  <span>Tưới phun sương lúc 07:30</span>
                </Box>
              </Box>

              {/* Floating Telemetry Frosted Glass Cards */}
              <Box className="absolute bottom-3 inset-x-3 grid grid-cols-2 gap-2.5 z-10">
                {/* Thẻ 1: Độ ẩm đất */}
                <Box className="bg-card/95 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-border/80 flex items-center gap-2.5">
                  <Box className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100 dark:border-sky-900">
                    <Droplets className="h-4 w-4" />
                  </Box>
                  <Box className="flex flex-col min-w-0 text-left">
                    <Text className="text-[10px] text-muted-foreground font-medium truncate">
                      Độ ẩm đất
                    </Text>
                    <Box className="flex items-baseline gap-1">
                      <span className="text-sm font-extrabold text-foreground">
                        68%
                      </span>
                      <span className="text-[9px] font-bold px-1 rounded-sm bg-primary/15 text-primary">
                        Tối ưu
                      </span>
                    </Box>
                  </Box>
                </Box>

                {/* Thẻ 2: Nhiệt độ */}
                <Box className="bg-card/95 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-border/80 flex items-center gap-2.5">
                  <Box className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 dark:border-amber-900">
                    <Thermometer className="h-4 w-4" />
                  </Box>
                  <Box className="flex flex-col min-w-0 text-left">
                    <Text className="text-[10px] text-muted-foreground font-medium truncate">
                      Nhiệt độ
                    </Text>
                    <span className="text-sm font-extrabold text-foreground">
                      24.2°C
                    </span>
                    <span className="text-[9px] text-primary font-semibold truncate leading-none">
                      Mát mẻ - Ổn định
                    </span>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
