import * as React from "react";
import { useDevice } from "@/shared/lib/device";
import { Box, Modal } from "@/shared/ui";
import { PlotsExploreHeroDesktop } from "./PlotsExploreHeroDesktop";
import { PlotsExploreHeroMobile } from "./PlotsExploreHeroMobile";
import type { PlotsExploreHeroProps, PlotsExploreHeroViewProps } from "./types";

export * from "./types";
export * from "./PlotsExploreHeroDesktop";
export * from "./PlotsExploreHeroMobile";

export function PlotsExploreHero({
  onExploreClick,
  className,
}: PlotsExploreHeroProps) {
  const { isMobile } = useDevice();
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);
  const [liveTime, setLiveTime] = React.useState("14:28:05");

  // Realtime clock update
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

  const handleExploreScroll = () => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    const target = document.getElementById("plot-grid-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const viewProps: PlotsExploreHeroViewProps = {
    liveTime,
    onExploreClick: handleExploreScroll,
    onOpenVideoModal: () => setIsVideoModalOpen(true),
    className,
  };

  return (
    <>
      {isMobile ? (
        <PlotsExploreHeroMobile {...viewProps} />
      ) : (
        <PlotsExploreHeroDesktop {...viewProps} />
      )}

      {/* ── Video Garden & Camera Live Preview Modal ── */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Camera Trực Tiếp – Luống Rau Hữu Cơ #A-102 Đà Lạt"
        description="Đường truyền HLS độ trễ thấp giám sát sinh trưởng thực tế ngoài nông trại Đạ Sar."
        size="lg"
      >
        <Box className="space-y-4 pt-2">
          <Box className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center">
            <video
              autoPlay
              controls
              loop
              playsInline
              className="w-full h-full object-cover"
              src="/video/video1.mp4"
            >
              <track kind="captions" />
            </video>
          </Box>
          <Box className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Độ phân giải: 1080p @ 30fps</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              Kết nối ổn định (Latency 1.2s)
            </span>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
