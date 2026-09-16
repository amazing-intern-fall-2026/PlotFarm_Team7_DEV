import { ArrowRight } from "lucide-react";
import { Box, Button, Heading, Text } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { HOME_CTA_MESSAGES } from "./constants";
import type { HomeCtaBannerViewProps } from "./types";

export function HomeCtaBannerMobile({
  badge = HOME_CTA_MESSAGES.BADGE,
  title = HOME_CTA_MESSAGES.TITLE,
  subtitle = HOME_CTA_MESSAGES.SUBTITLE,
  buttonText = HOME_CTA_MESSAGES.BUTTON_TEXT,
  handleCtaClick,
  className,
}: HomeCtaBannerViewProps) {
  return (
    <section
      aria-labelledby="home-cta-banner-mobile-title"
      className={cn("w-full select-none px-1", className)}
    >
      <Box className="relative overflow-hidden rounded-2xl bg-[#1d5c22] dark:bg-[#164619] p-6 text-white shadow-lg space-y-5">
        <svg
          className="absolute -right-12 -bottom-12 h-56 w-56 pointer-events-none opacity-15 text-white"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="100"
            cy="100"
            r="88"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
          <path
            d="M100 25C135 60 155 115 100 175C45 115 65 60 100 25Z"
            fill="currentColor"
            opacity="0.6"
          />
        </svg>

        <Box className="relative z-10 space-y-3.5 text-left">
          <Box className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-white/95 text-[11px] font-semibold backdrop-blur-md border border-white/20">
            <span className="h-2 w-2 rounded-full bg-orange-400 shrink-0 animate-pulse" />
            <span>{badge}</span>
          </Box>

          <Heading
            level={2}
            id="home-cta-banner-mobile-title"
            className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug"
          >
            {title}
          </Heading>

          <Text className="text-xs text-white/85 leading-relaxed font-normal">
            {subtitle}
          </Text>
        </Box>

        <Box className="relative z-10 pt-1">
          <Button
            type="button"
            size="lg"
            onClick={handleCtaClick}
            className="w-full h-11 rounded-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-sm shadow-md shadow-orange-950/20 active:scale-95 transition-all justify-center cursor-pointer border-none"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
    </section>
  );
}
