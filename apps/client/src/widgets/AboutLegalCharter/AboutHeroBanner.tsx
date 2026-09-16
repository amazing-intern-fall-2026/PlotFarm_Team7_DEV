import * as React from "react";
import {
  CheckCircle2,
  Sparkles,
  Shield,
  Sprout,
  Star,
  ArrowRight,
  FileText,
} from "lucide-react";
import { Box, Typography, Button, Avatar } from "@/shared/ui";

interface AboutHeroBannerProps {
  onSelectTab?: (tab: "organic" | "insurance") => void;
}

export function AboutHeroBanner({ onSelectTab }: AboutHeroBannerProps) {
  const [liveTime, setLiveTime] = React.useState("14:28:05");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveTime(
        now.toTimeString().split(" ")[0] ||
          now.toLocaleTimeString("vi-VN", { hour12: false }),
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollToContent = (tab: "organic" | "insurance") => {
    onSelectTab?.(tab);
    const target = document.getElementById(
      tab === "insurance" ? "crop-insurance" : "organic-standards",
    );
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box className="relative w-full overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-8 lg:pt-12 pb-12 lg:pb-16 flex flex-col justify-center select-none">
      <Box className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <Box className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <Box className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      <Box className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Box className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ═══════════════════════════════════════════════════════════
              CỘT TRÁI: GIỚI THIỆU & CAM KẾT (COL-SPAN-7)
             ═══════════════════════════════════════════════════════════ */}
          <Box className="lg:col-span-7 flex flex-col items-start text-left space-y-4">
            <Box className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
              <Typography.Text className="text-xs font-bold uppercase tracking-wider text-primary">
                HỆ SINH THÁI NÔNG NGHIỆP SỐ ĐÀ LẠT
              </Typography.Text>
            </Box>

            <Typography.H1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              Về Green Farm —{" "}
              <Typography.Text as="span" className="text-primary font-extrabold">
                Nông Nghiệp Hữu Cơ Minh Bạch
              </Typography.Text>
            </Typography.H1>

            <Box className="space-y-2.5 max-w-xl">
              <Typography.P className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                Hệ sinh thái kết nối cư dân đô thị đồng sở hữu & canh tác vườn rau sạch từ xa tại Đạ Sar - Lạc Dương, Đà Lạt. Giám sát 24/7 qua cảm biến vi khí hậu IoT và luồng camera trực tiếp thời gian thực.
              </Typography.P>

              <Box className="space-y-2 pt-1">
                <Box className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <Typography.Text className="text-xs sm:text-sm text-foreground font-medium">
                    100% chuẩn hữu cơ quốc gia TCVN 11041:2017 & nguồn nước ngầm sâu 85m.
                  </Typography.Text>
                </Box>
                <Box className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <Typography.Text className="text-xs sm:text-sm text-foreground font-medium">
                    Bảo hiểm rủi ro mùa vụ 100% — Đền bù gấp 10 lần nếu có tồn dư hóa chất cấm.
                  </Typography.Text>
                </Box>
              </Box>
            </Box>

            <Box className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                variant="default"
                size="default"
                onClick={() => handleScrollToContent("organic")}
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="h-11 px-5 rounded-xl font-semibold shadow-md shadow-primary/20"
              >
                Cam kết chuẩn hữu cơ
              </Button>

              <Button
                variant="outline"
                size="default"
                onClick={() => handleScrollToContent("insurance")}
                leftIcon={<FileText className="h-4 w-4 text-primary" />}
                className="h-11 px-5 rounded-xl font-medium"
              >
                Chính sách bảo hiểm mùa vụ
              </Button>
            </Box>

            {/* Social proof */}
            <Box className="pt-2 flex items-center gap-3 text-left">
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
                <Typography.Text className="text-xs text-muted-foreground pt-0.5">
                  Được tin chọn bởi{" "}
                  <Typography.Text as="span" className="text-foreground font-bold">
                    1.200+
                  </Typography.Text>{" "}
                  gia đình thành thị đồng canh tác
                </Typography.Text>
              </Box>
            </Box>
          </Box>

          {/* ═══════════════════════════════════════════════════════════
              CỘT PHẢI: LIVE FARM OVERVIEW PREVIEW (COL-SPAN-5)
             ═══════════════════════════════════════════════════════════ */}
          <Box className="lg:col-span-5 w-full relative">
            <Box className="absolute -inset-2 rounded-[28px] bg-primary/10 blur-xl opacity-80 pointer-events-none" />

            <Box className="relative w-full h-[300px] sm:h-[330px] lg:h-[350px] rounded-2xl border-4 border-card shadow-xl ring-1 ring-border/80 overflow-hidden bg-slate-950 group">
              {/* Ảnh mới về nhà màng rau hữu cơ xanh ngát */}
              <img
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80"
                alt="Tổ hợp nông trại hữu cơ công nghệ cao Green Farm Lạc Dương"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              <Box className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

              {/* Top Live Bar */}
              <Box className="absolute top-0 inset-x-0 bg-black/40 backdrop-blur-md px-3.5 py-2 flex justify-between items-center text-white text-xs z-10 border-b border-white/10">
                <Box className="flex items-center gap-2">
                  <Box className="relative flex h-2 w-2">
                    <Box className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <Box className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </Box>
                  <Typography.Text as="span" className="font-bold uppercase tracking-wider text-emerald-300 text-[11px]">
                    TRỰC TIẾP
                  </Typography.Text>
                  <Typography.Text as="span" className="text-white/40">•</Typography.Text>
                  <Typography.Text as="span" className="text-white/90 font-medium text-[11px]">
                    Nông trại Hữu cơ #Zone-A Lạc Dương
                  </Typography.Text>
                </Box>

                <Box className="font-mono text-white/90 bg-white/10 px-2 py-0.5 rounded text-[11px] border border-white/10">
                  {liveTime}
                </Box>
              </Box>

              {/* Status Badge */}
              <Box className="absolute top-10 right-2.5 z-10">
                <Box className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-emerald-300 text-[10px] font-medium shadow-md">
                  <Sparkles className="h-3 w-3 text-emerald-400 shrink-0" />
                  <span>Chuẩn VietGAP & GlobalGAP</span>
                </Box>
              </Box>

              {/* Bottom Telemetry Info */}
              <Box className="absolute bottom-3 inset-x-3 grid grid-cols-2 gap-2.5 z-10">
                <Box className="bg-card/95 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-border/80 flex items-center gap-2.5">
                  <Box className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900">
                    <Sprout className="h-4 w-4" />
                  </Box>
                  <Box className="flex flex-col min-w-0 text-left">
                    <Typography.Text className="text-[10px] text-muted-foreground font-medium truncate">
                      Quy chuẩn canh tác
                    </Typography.Text>
                    <Typography.Text className="text-xs font-extrabold text-foreground truncate">
                      TCVN 11041:2017
                    </Typography.Text>
                    <Typography.Text className="text-[9px] font-semibold text-primary">
                      100% Không hóa chất
                    </Typography.Text>
                  </Box>
                </Box>

                <Box className="bg-card/95 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-border/80 flex items-center gap-2.5">
                  <Box className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 dark:border-amber-900">
                    <Shield className="h-4 w-4" />
                  </Box>
                  <Box className="flex flex-col min-w-0 text-left">
                    <Typography.Text className="text-[10px] text-muted-foreground font-medium truncate">
                      Bảo hiểm rủi ro
                    </Typography.Text>
                    <Typography.Text className="text-xs font-extrabold text-foreground truncate">
                      Bảo lãnh 100%
                    </Typography.Text>
                    <Typography.Text className="text-[9px] font-semibold text-amber-600">
                      Green Farm Care
                    </Typography.Text>
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
