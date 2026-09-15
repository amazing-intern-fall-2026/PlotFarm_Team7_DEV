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

export function PlotsExploreHeroMobile({
  liveTime,
  onExploreClick,
  onOpenVideoModal,
  className,
}: PlotsExploreHeroViewProps) {
  return (
    <Box
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-6 pb-14 select-none",
        className,
      )}
    >
      {/* Background Glow */}
      <Box className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

      <Box className="relative z-10 px-4 space-y-4">
        {/* ── 1. VALUE PROPOSITION & HEADING ── */}
        <Box className="space-y-3 text-left">
          {/* Tagline — Đồng bộ theo chuẩn HowItWorksGuide, bỏ icon */}
          <Box className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Nông nghiệp số tuần hoàn tại Đà Lạt
            </span>
          </Box>

          {/* Heading */}
          <Heading
            as="h1"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight"
          >
            Sở hữu vườn rau hữu cơ riêng của bạn —{" "}
            <span className="text-primary">Giám sát 24/7 từ xa</span>
          </Heading>

          {/* Sub-copy */}
          <Text className="text-sm text-muted-foreground leading-relaxed font-normal">
            Trải nghiệm cảm giác làm chủ nông trại sinh thái tại Đạ Sar - Đà Lạt ngay
            trên điện thoại.
          </Text>

          {/* 2 checkmarks */}
          <Box className="space-y-1.5 pt-0.5">
            <Box className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
              <Text className="text-xs text-foreground font-medium">
                Đội ngũ kỹ sư chăm sóc chuẩn VietGAP.
              </Text>
            </Box>
            <Box className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
              <Text className="text-xs text-foreground font-medium">
                Cảm biến IoT truyền độ ẩm, dinh dưỡng thời gian thực.
              </Text>
            </Box>
          </Box>
        </Box>

        {/* ── 2. INTERACTIVE LIVE FARM MOCKUP ── */}
        <Box className="relative w-full h-[220px] rounded-2xl border-4 border-card shadow-xl ring-1 ring-border/80 overflow-hidden bg-slate-950 group">
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
            <Box className="bg-card/95 backdrop-blur-md p-2 rounded-xl shadow-md border border-border/80 flex items-center gap-2">
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
                  <span className="text-[9px] font-bold text-primary bg-primary/15 px-1 rounded">
                    Tối ưu
                  </span>
                </Box>
              </Box>
            </Box>

            {/* Thẻ 2: Nhiệt độ */}
            <Box className="bg-card/95 backdrop-blur-md p-2 rounded-xl shadow-md border border-border/80 flex items-center gap-2">
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
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ── 3. CTA BUTTONS & SOCIAL PROOF ── */}
        <Box className="space-y-3 pt-1">
          <Button
            variant="primary"
            size="default"
            onClick={onExploreClick}
            rightIcon={<ArrowRight className="h-4 w-4" />}
            className="w-full h-11 rounded-xl font-semibold shadow-md shadow-primary/20"
          >
            Khám phá ô đất trồng ngay
          </Button>

          <Button
            variant="outline"
            size="default"
            onClick={onOpenVideoModal}
            leftIcon={<Play className="h-3.5 w-3.5 fill-current" />}
            className="w-full h-11 rounded-xl font-medium"
          >
            Xem Video Vườn & Camera Live
          </Button>

          {/* Social Proof */}
          <Box className="pt-1 flex items-center justify-center gap-3 text-left">
            <Box className="flex -space-x-2 items-center">
              <Avatar
                size="sm"
                name="Thu Hằng"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
                className="w-7 h-7 ring-2 ring-background shadow-xs"
              />
              <Avatar
                size="sm"
                name="Tuấn Anh"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80"
                className="w-7 h-7 ring-2 ring-background shadow-xs"
              />
              <Box className="w-7 h-7 rounded-full bg-primary/15 text-primary ring-2 ring-background flex items-center justify-center text-[10px] font-bold shadow-xs">
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
              <Text className="text-[11px] text-muted-foreground font-normal">
                Được tin chọn bởi{" "}
                <strong className="text-foreground font-bold">1.200+</strong> gia đình
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
