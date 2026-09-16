import * as React from "react";
import { useDevice } from "@/shared/lib/device";
import { Box, Modal, Text } from "@/shared/ui";
import { PlotsExploreHeroDesktop } from "./PlotsExploreHeroDesktop";
import { PlotsExploreHeroMobile } from "./PlotsExploreHeroMobile";
import { PLOTS_HERO_MESSAGES } from "./constants";
import type { PlotsExploreHeroProps, PlotsExploreHeroViewProps } from "./types";

export * from "./types";
export * from "./constants";
export * from "./PlotsExploreHeroDesktop";
export * from "./PlotsExploreHeroMobile";

export function PlotsExploreHero({
  onExploreClick,
  className,
}: PlotsExploreHeroProps) {
  const { isMobile } = useDevice();
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);
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

      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={PLOTS_HERO_MESSAGES.MODAL_TITLE}
        description={PLOTS_HERO_MESSAGES.MODAL_DESC}
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
              src="/video/plot-farming.mp4"
            >
              <track kind="captions" />
            </video>
          </Box>
          <Box className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <Text as="span">{PLOTS_HERO_MESSAGES.MODAL_RESOLUTION}</Text>
            <Text as="span" className="text-primary font-semibold flex items-center gap-1.5">
              <Box className="inline-block w-2 h-2 rounded-full bg-primary" />
              {PLOTS_HERO_MESSAGES.MODAL_CONNECTION_STATUS}
            </Text>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
