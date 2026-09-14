import * as React from "react";
import { useDevice } from "@/shared/lib/device";
import { DEFAULT_FARM_VIDEOS, type VideoHeroBannerProps, type VideoHeroBannerViewProps } from "./types";
import { VideoHeroBannerDesktop } from "./VideoHeroBannerDesktop";
import { VideoHeroBannerMobile } from "./VideoHeroBannerMobile";

export * from "./types";
export * from "./VideoHeroBannerDesktop";
export * from "./VideoHeroBannerMobile";

export function VideoHeroBanner({
  slides = DEFAULT_FARM_VIDEOS,
  primaryCtaText = "Khám phá ô đất ngay",
  primaryCtaLink = "/plots",
  secondaryCtaText = "Đặt lịch tham quan",
  onSecondaryCtaClick,
  className,
}: VideoHeroBannerProps) {
  const { isMobile } = useDevice();
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

  // Tự động nạp và phát video khi đổi slide
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Trình duyệt tự xử lý theo Autoplay Policy
        });
      }
    }
  }, [currentIndex]);

  // Mỗi lần chuyển video: Tự động hiển thị thẻ thông số trong 5 giây rồi ẩn đi
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

  const viewProps: VideoHeroBannerViewProps = {
    slides,
    currentIndex,
    currentSlide,
    isTransitioning,
    showStatsCard,
    videoRef,
    handleVideoEnded,
    switchVideo,
    setShowStatsCard,
    primaryCtaText,
    primaryCtaLink,
    secondaryCtaText,
    onSecondaryCtaClick,
    className,
  };

  if (isMobile) {
    return <VideoHeroBannerMobile {...viewProps} />;
  }

  return <VideoHeroBannerDesktop {...viewProps} />;
}
