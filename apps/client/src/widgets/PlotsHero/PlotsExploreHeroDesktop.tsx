import {
  ArrowRight,
  Play,
  Droplets,
  Thermometer,
  Star,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Box, Button } from "@/shared/ui";
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
        "relative w-full overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-white py-8 lg:py-10 border-b border-slate-100/80 flex flex-col justify-center select-none",
        className,
      )}
    >
      {/* ── Background Ambient Glows & Subtle Pattern ── */}
      <Box className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />
      <Box className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-teal-200/15 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      <Box className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <Box className="grid grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* ═══════════════════════════════════════════════════════════
              CỘT TRÁI: VALUE PROPOSITION & CTA (COL-SPAN-7)
             ═══════════════════════════════════════════════════════════ */}
          <Box className="col-span-7 flex flex-col items-start text-left space-y-4">
            {/* Pill Tagline */}
            <Box className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-800 text-xs font-semibold shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span>🌱 Nông nghiệp số tuần hoàn tại Đà Lạt</span>
            </Box>

            {/* H1 Heading (vừa vặn, không bị quá to) */}
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold tracking-tight text-slate-900 leading-[1.25]">
              Sở hữu vườn rau hữu cơ riêng của bạn —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                Giám sát 24/7 từ xa
              </span>
            </h1>

            {/* Sub-copy: 1 câu đắt giá kèm 2 gạch đầu dòng icon tick */}
            <Box className="space-y-2 max-w-xl">
              <p className="text-slate-600 text-sm lg:text-[15px] leading-relaxed font-normal">
                Trải nghiệm cảm giác làm chủ nông trại sinh thái tại Đạ Sar - Đà
                Lạt ngay trên điện thoại.
              </p>

              <Box className="space-y-1.5 pt-0.5">
                <Box className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Đội ngũ kỹ sư chăm sóc chuẩn VietGAP.</span>
                </Box>
                <Box className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>
                    Cảm biến IoT truyền dữ liệu độ ẩm, dinh dưỡng theo thời gian
                    thực.
                  </span>
                </Box>
              </Box>
            </Box>

            {/* Cụm Action Buttons */}
            <Box className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                type="button"
                onClick={onExploreClick}
                className="group h-11 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all duration-200 active:scale-[0.98] border-none flex items-center gap-2"
              >
                <span>Khám phá ô đất trồng ngay</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={onOpenVideoModal}
                className="h-11 px-5 rounded-xl border border-slate-200 hover:border-emerald-300 bg-white/90 hover:bg-emerald-50/50 text-slate-700 text-sm font-medium shadow-xs backdrop-blur-sm transition-all duration-200 active:scale-[0.98] flex items-center gap-2.5"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs shadow-xs">
                  <Play className="h-3 w-3 fill-current translate-x-0.5" />
                </span>
                <span>Xem Video Vườn & Camera Live</span>
              </Button>
            </Box>

            {/* Social Proof */}
            <Box className="pt-1 flex items-center gap-3 text-left">
              <Box className="flex -space-x-2 items-center">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
                  alt="Khách hàng Green Farm"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80"
                  alt="Khách hàng Green Farm"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80"
                  alt="Khách hàng Green Farm"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
                <Box className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 ring-2 ring-white flex items-center justify-center text-[11px] font-bold shadow-xs">
                  +1.2k
                </Box>
              </Box>

              <Box className="flex flex-col">
                <Box className="flex items-center gap-0.5 text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-amber-400" />
                  <Star className="h-3.5 w-3.5 fill-amber-400" />
                  <Star className="h-3.5 w-3.5 fill-amber-400" />
                  <Star className="h-3.5 w-3.5 fill-amber-400" />
                  <Star className="h-3.5 w-3.5 fill-amber-400" />
                </Box>
                <p className="text-xs text-slate-600 font-normal">
                  Được tin chọn bởi{" "}
                  <strong className="text-slate-900 font-bold">1.200+</strong> gia
                  đình thành thị
                </p>
              </Box>
            </Box>
          </Box>

          {/* ═══════════════════════════════════════════════════════════
              CỘT PHẢI: INTERACTIVE LIVE FARM MOCKUP (COL-SPAN-5)
             ═══════════════════════════════════════════════════════════ */}
          <Box className="col-span-5 w-full relative">
            <Box className="absolute -inset-2 rounded-[28px] bg-gradient-to-tr from-emerald-500/15 to-teal-400/15 blur-lg opacity-70 pointer-events-none" />

            {/* Mockup Card với chiều cao cố định rõ ràng */}
            <Box className="relative w-full h-[320px] lg:h-[350px] rounded-2xl border-4 border-white shadow-xl ring-1 ring-slate-900/10 overflow-hidden bg-slate-950 group">
              {/* Ảnh vườn rau xanh mướt */}
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
                <Box className="bg-white/90 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-white/60 flex items-center gap-2.5">
                  <Box className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                    <Droplets className="h-4 w-4" />
                  </Box>
                  <Box className="flex flex-col min-w-0 text-left">
                    <span className="text-[10px] text-slate-500 font-medium truncate">
                      Độ ẩm đất
                    </span>
                    <Box className="flex items-baseline gap-1">
                      <span className="text-sm font-extrabold text-slate-900">
                        68%
                      </span>
                      <span className="text-[9px] font-bold px-1 rounded-sm bg-emerald-100 text-emerald-700">
                        Tối ưu
                      </span>
                    </Box>
                  </Box>
                </Box>

                {/* Thẻ 2: Nhiệt độ */}
                <Box className="bg-white/90 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-white/60 flex items-center gap-2.5">
                  <Box className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                    <Thermometer className="h-4 w-4" />
                  </Box>
                  <Box className="flex flex-col min-w-0 text-left">
                    <span className="text-[10px] text-slate-500 font-medium truncate">
                      Nhiệt độ
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">
                      24.2°C
                    </span>
                    <span className="text-[9px] text-emerald-600 font-semibold truncate leading-none">
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
