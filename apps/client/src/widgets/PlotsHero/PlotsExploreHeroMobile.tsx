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

export function PlotsExploreHeroMobile({
  liveTime,
  onExploreClick,
  onOpenVideoModal,
  className,
}: PlotsExploreHeroViewProps) {
  return (
    <Box
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-white py-6 border-b border-slate-100 select-none",
        className,
      )}
    >
      {/* Background Glow */}
      <Box className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-emerald-300/20 blur-2xl pointer-events-none" />

      <Box className="relative z-10 px-4 space-y-5">
        {/* ── 1. VALUE PROPOSITION & HEADING ── */}
        <Box className="space-y-3.5 text-left">
          {/* Tagline */}
          <Box className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300/70 text-emerald-800 text-xs font-semibold shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            <span>🌱 Nông nghiệp số tuần hoàn tại Đà Lạt</span>
          </Box>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-[1.2]">
            Sở hữu vườn rau hữu cơ riêng của bạn —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
              Giám sát 24/7 từ xa
            </span>
          </h1>

          {/* Sub-copy */}
          <p className="text-slate-600 text-sm leading-relaxed font-normal">
            Trải nghiệm cảm giác làm chủ nông trại sinh thái tại Đạ Sar - Đà Lạt ngay
            trên điện thoại.
          </p>

          {/* 2 checkmarks */}
          <Box className="space-y-1.5 pt-0.5 text-xs text-slate-700 font-medium">
            <Box className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Đội ngũ kỹ sư chăm sóc chuẩn VietGAP.</span>
            </Box>
            <Box className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Cảm biến IoT truyền độ ẩm, dinh dưỡng thời gian thực.</span>
            </Box>
          </Box>
        </Box>

        {/* ── 2. INTERACTIVE LIVE FARM MOCKUP ── */}
        <Box className="relative w-full h-[220px] rounded-2xl border-2 border-white shadow-xl ring-1 ring-slate-900/10 overflow-hidden bg-slate-950 group">
          <img
            src="https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=1000&q=80"
            alt="Vườn rau hữu cơ sinh thái Luống #A-102"
            className="w-full h-full object-cover"
          />

          <Box className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

          {/* Header trên ảnh */}
          <Box className="absolute top-0 inset-x-0 bg-black/40 backdrop-blur-md px-3 py-2 flex justify-between items-center text-white text-[11px] z-10 border-b border-white/10">
            <Box className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500" />
              </span>
              <span className="font-bold text-rose-300">LIVE</span>
              <span className="text-white/40">•</span>
              <span className="truncate">Cam 01 • #A-102</span>
            </Box>

            <Box className="font-mono text-white/90 bg-white/10 px-1.5 py-0.5 rounded text-[10px]">
              {liveTime}
            </Box>
          </Box>

          {/* Mini notification badge */}
          <Box className="absolute top-9 right-2 z-10">
            <Box className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 text-[10px] font-medium border border-white/20">
              <Sparkles className="h-2.5 w-2.5 text-emerald-400" />
              <span>Phun sương lúc 07:30</span>
            </Box>
          </Box>

          {/* Floating Telemetry Frosted Glass Cards */}
          <Box className="absolute bottom-2.5 inset-x-2.5 grid grid-cols-2 gap-2 z-10">
            {/* Thẻ 1: Độ ẩm đất */}
            <Box className="bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-md border border-white/60 flex items-center gap-2">
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
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1 rounded">
                    Tối ưu
                  </span>
                </Box>
              </Box>
            </Box>

            {/* Thẻ 2: Nhiệt độ */}
            <Box className="bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-md border border-white/60 flex items-center gap-2">
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
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ── 3. CTA BUTTONS & SOCIAL PROOF ── */}
        <Box className="space-y-3">
          <Button
            type="button"
            onClick={onExploreClick}
            className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md shadow-emerald-600/25 transition-all active:scale-[0.98] border-none flex items-center justify-center gap-2"
          >
            <span>Khám phá ô đất trồng ngay</span>
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onOpenVideoModal}
            className="w-full h-12 rounded-xl border border-slate-200 hover:border-emerald-300 bg-white/90 text-slate-700 text-sm font-medium shadow-xs transition-all active:scale-[0.98] flex items-center justify-center gap-2.5"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs">
              <Play className="h-3 w-3 fill-current translate-x-0.5" />
            </span>
            <span>Xem Video Vườn & Camera Live</span>
          </Button>

          {/* Social Proof */}
          <Box className="pt-2 flex items-center justify-center gap-3 text-left">
            <Box className="flex -space-x-2 items-center">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
                alt="Khách hàng"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-xs"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80"
                alt="Khách hàng"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-xs"
              />
              <Box className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 ring-2 ring-white flex items-center justify-center text-[10px] font-bold shadow-xs">
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
              <p className="text-[11px] text-slate-600 font-normal">
                Được tin chọn bởi{" "}
                <strong className="text-slate-900 font-bold">1.200+</strong> gia đình
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
