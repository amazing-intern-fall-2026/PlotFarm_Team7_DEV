import * as React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Radio,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronRight,
  X,
} from "lucide-react";
import { Box, Typography, Text, Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

export interface FarmVideoSlide {
  id: string;
  videoSrc: string;
  badge: string;
  headline: string;
  subheadline: string;
  tag: string;
  shortTitle: string;
  stats: {
    label: string;
    value: string;
  };
}

export const DEFAULT_FARM_VIDEOS: FarmVideoSlide[] = [
  {
    id: "plot-farming",
    videoSrc: "/video/plot-farming.mp4",
    badge: "PHÂN KHU THỰC NGHIỆM 4.0",
    headline: "Kiến Tạo & Giám Sát Ô Đất Của Riêng Bạn",
    subheadline:
      "Sở hữu thửa đất canh tác thông minh, theo dõi sinh trưởng từng luống rau sạch 24/7 qua hệ sinh thái IoT & camera trực tiếp.",
    tag: "01. Ô Đất Canh Tác",
    shortTitle: "Ô đất nông trại",
    stats: { label: "Diện tích canh tác", value: "12.500 m²" },
  },
  {
    id: "do-farming",
    videoSrc: "/video/do-farmming.mp4",
    badge: "KỸ THUẬT NÔNG HỌC CHUYÊN SÂU",
    headline: "Kỹ Sư Nông Nghiệp Đồng Hành Từng Mầm Cây",
    subheadline:
      "Quy trình gieo trồng, tưới tiêu tự động và chăm sóc bằng chế phẩm sinh học đạt chuẩn an toàn VietGAP & GlobalGAP.",
    tag: "02. Chăm Sóc Nông Học",
    shortTitle: "Kỹ thuật canh tác",
    stats: { label: "Kỹ sư chuyên trách", value: "18 chuyên gia" },
  },
  {
    id: "get-rice",
    videoSrc: "/video/get-rice.mp4",
    badge: "MÙA VỤ BỘI THU & THU HOẠCH",
    headline: "Nông Sản Tươi Ngon Thu Hoạch Tận Gốc",
    subheadline:
      "Nông sản được thu hoạch vào sáng sớm theo chu kỳ chuẩn, kiểm định nghiêm ngặt và đóng gói bảo quản lạnh trong ngày.",
    tag: "03. Mùa Vụ Bội Thu",
    shortTitle: "Thu hoạch tươi sạch",
    stats: { label: "Tỷ lệ chuẩn loại 1", value: "98.5% đạt chuẩn" },
  },
  {
    id: "chicken",
    videoSrc: "/video/chicken.mp4",
    badge: "HỆ SINH THÁI TUẦN HOÀN",
    headline: "Mô Hình Vườn — Ao — Chuồng Hữu Cơ Khép Kín",
    subheadline:
      "Chăn thả tự nhiên dưới tán rừng thông Đà Lạt, nguồn thức ăn hữu cơ sạch mang lại nguồn dinh dưỡng an lành cho gia đình bạn.",
    tag: "04. Sinh Thái Tuần Hoàn",
    shortTitle: "Chăn nuôi tự nhiên",
    stats: { label: "Môi trường sống", value: "100% tự nhiên" },
  },
];

export interface VideoHeroBannerProps {
  slides?: FarmVideoSlide[];
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  onSecondaryCtaClick?: () => void;
  className?: string;
}

export function VideoHeroBanner({
  slides = DEFAULT_FARM_VIDEOS,
  primaryCtaText = "Khám phá ô đất ngay",
  primaryCtaLink = "/plots",
  secondaryCtaText = "Đặt lịch tham quan",
  onSecondaryCtaClick,
  className,
}: VideoHeroBannerProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [showStatsCard, setShowStatsCard] = React.useState(true);

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hideTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentSlide = slides[currentIndex] || slides[0];

  // Hàm chuyển video thủ công hoặc tự động
  const switchVideo = React.useCallback(
    (nextIndex: number) => {
      if (nextIndex === currentIndex && !isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setIsTransitioning(false);
      }, 300);
    },
    [currentIndex, isTransitioning],
  );

  // Khi video kết thúc, tự động chuyển mượt sang video kế tiếp (liên tục 4 video)
  const handleVideoEnded = React.useCallback(() => {
    switchVideo((currentIndex + 1) % slides.length);
  }, [currentIndex, slides.length, switchVideo]);

  // Tự động nạp và phát video khi chuyển cảnh
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Trình duyệt tự xử lý autoplay theo policy
        });
      }
    }
  }, [currentIndex]);

  // Mỗi lần chuyển video: Tự động hiển thị thẻ thông số trong đúng 5 giây rồi ẩn đi
  React.useEffect(() => {
    setShowStatsCard(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

    hideTimerRef.current = setTimeout(() => {
      setShowStatsCard(false);
    }, 5000);

    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [currentIndex]);

  return (
    <Box
      className={cn(
        "relative w-full min-h-[420px] sm:min-h-[460px] md:min-h-[480px] flex items-center overflow-hidden select-none bg-emerald-950",
        className,
      )}
    >
      {/* ── 1. Video Element Background ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
        className={cn(
          "absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out",
          isTransitioning ? "scale-105 opacity-40 blur-xs" : "scale-100 opacity-100 blur-none",
        )}
      >
        <source src={currentSlide.videoSrc} type="video/mp4" />
        {/* Fallback ảnh nền mặc định */}
        <img src="/images/background.jpg" alt="Green Farm Agriculture" className="w-full h-full object-cover" />
      </video>

      {/* ── 2. Cinematic Gradient Overlays (Tương phản đọc chữ & hình ảnh) ── */}
      {/* Lớp gradient ngang từ trái sang */}
      <Box className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
      {/* Lớp gradient dọc từ trên và dưới */}
      <Box className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      {/* Vệt ánh sáng sinh thái */}
      <Box className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

      {/* ── 3. Nội dung chính: Cột trái (Narrative) & Cột phải (Khối Thông Số Tự Động Ẩn Sau 5s) ── */}
      <Box className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <Box className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Cột trái: Văn bản & CTA Buttons */}
          <Box className="lg:col-span-7 xl:col-span-8 space-y-3.5 sm:space-y-4 text-left">
            
            {/* Live Indicator Badge */}
            <Box className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/30 text-emerald-300 text-[11px] font-semibold backdrop-blur-md shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="tracking-wide uppercase">{currentSlide.badge}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/80 font-normal">{currentSlide.tag}</span>
            </Box>

            {/* Tiêu đề chính */}
            <Typography
              as="h1"
              className={cn(
                "text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight leading-[1.18] drop-shadow-md transition-all duration-500",
                isTransitioning ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0",
              )}
            >
              {currentSlide.headline}
            </Typography>

            {/* Phụ đề mô tả */}
            <Text
              className={cn(
                "text-xs sm:text-sm md:text-base text-white/85 leading-relaxed max-w-xl font-normal drop-shadow-sm transition-all duration-500 delay-75",
                isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
              )}
            >
              {currentSlide.subheadline}
            </Text>

            {/* 2 cam kết chuẩn nông nghiệp */}
            <Box className="flex flex-wrap items-center gap-3 sm:gap-4 pt-0.5 text-xs text-white/90">
              <Box className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>100% Hữu cơ VietGAP</span>
              </Box>
              <Box className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-sm">
                <Radio className="h-3.5 w-3.5 text-emerald-400 shrink-0 animate-pulse" />
                <span>Camera IoT 24/7</span>
              </Box>
            </Box>

            {/* Nút bấm hành động CTA */}
            <Box className="flex flex-wrap items-center gap-3 pt-2">
              <Link to={primaryCtaLink}>
                <Button
                  variant="primary"
                  size="default"
                  className="h-10 sm:h-11 px-5 rounded-xl text-sm sm:text-base font-bold shadow-md shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all bg-emerald-600 hover:bg-emerald-500 border-none text-white"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  {primaryCtaText}
                </Button>
              </Link>

              {secondaryCtaText && (
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  onClick={onSecondaryCtaClick}
                  className="h-10 sm:h-11 px-4 rounded-xl text-xs sm:text-sm font-semibold border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md active:scale-[0.98] transition-all"
                  leftIcon={<Sparkles className="h-3.5 w-3.5 text-emerald-300" />}
                >
                  {secondaryCtaText}
                </Button>
              )}
            </Box>
          </Box>

          {/* Cột phải: Khối Thông Số Trực Tiếp (Tự động hiện khi đổi video, biến mất sau 5s) */}
          <Box className="lg:col-span-5 xl:col-span-4 flex justify-end">
            {/* Khi ẩn: Nút mở lại nhỏ gọn unobtrusive */}
            {!showStatsCard ? (
              <button
                type="button"
                onClick={() => setShowStatsCard(true)}
                className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-black/40 hover:bg-black/60 text-white/80 hover:text-white text-xs font-medium backdrop-blur-md transition-all shadow-lg animate-fade-in"
              >
                <Layers className="h-3.5 w-3.5 text-emerald-400" />
                <span>Thông số phân cảnh (LIVE)</span>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>
            ) : (
              /* Khối thông số chi tiết khi đang hiển thị (trong vòng 5s) */
              <Box
                onMouseEnter={() => {
                  if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
                }}
                onMouseLeave={() => {
                  hideTimerRef.current = setTimeout(() => setShowStatsCard(false), 3000);
                }}
                className={cn(
                  "w-full max-w-xs p-4 rounded-2xl border border-white/20 bg-black/60 backdrop-blur-xl space-y-3 shadow-2xl text-left transition-all duration-500",
                  showStatsCard
                    ? "opacity-100 translate-x-0 scale-100"
                    : "opacity-0 translate-x-4 scale-95 pointer-events-none",
                )}
              >
                {/* Header card + nút đóng sớm nếu muốn */}
                <Box className="flex items-center justify-between pb-2 border-b border-white/10">
                  <Box className="flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                      Trực tiếp từ trang trại
                    </span>
                  </Box>
                  <Box className="flex items-center gap-1.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                      LIVE 1080p
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowStatsCard(false)}
                      className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                      title="Đóng"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </Box>
                </Box>

                {/* Thông số của phân khu hiện tại */}
                <Box className="space-y-2 text-xs">
                  <Box className="flex justify-between items-center">
                    <span className="text-white/70">Phân cảnh đang chiếu:</span>
                    <span className="font-semibold text-white truncate max-w-[140px]">
                      {currentSlide.shortTitle}
                    </span>
                  </Box>

                  <Box className="flex justify-between items-center">
                    <span className="text-white/70">{currentSlide.stats.label}:</span>
                    <span className="font-bold text-emerald-300">
                      {currentSlide.stats.value}
                    </span>
                  </Box>

                  <Box className="flex justify-between items-center">
                    <span className="text-white/70">Độ ẩm & Nhiệt độ:</span>
                    <span className="font-semibold text-white">78% • 19.4°C (Đà Lạt)</span>
                  </Box>

                  <Box className="flex justify-between items-center">
                    <span className="text-white/70">Tình trạng cảm biến:</span>
                    <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Hoạt động tối ưu
                    </span>
                  </Box>
                </Box>

                {/* Danh sách 4 scene nhanh để click đổi video */}
                <Box className="pt-2 border-t border-white/10 space-y-1.5">
                  <Text className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">
                    Chuyển nhanh phân cảnh (4 Video):
                  </Text>
                  <Box className="grid grid-cols-2 gap-1.5">
                    {slides.map((s, idx) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => switchVideo(idx)}
                        className={cn(
                          "px-2 py-1 rounded-lg text-[11px] font-medium text-left transition-all truncate border",
                          idx === currentIndex
                            ? "border-emerald-400 bg-emerald-950/80 text-emerald-300 shadow-sm"
                            : "border-white/10 bg-white/5 hover:bg-white/10 text-white/70",
                        )}
                      >
                        {s.tag}
                      </button>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>

        </Box>
      </Box>
    </Box>
  );
}
