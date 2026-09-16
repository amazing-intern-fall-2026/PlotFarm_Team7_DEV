import { ArrowRight } from "lucide-react";
import { Box, Button, Heading, Text } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { HOME_CTA_MESSAGES } from "./constants";
import type { HomeCtaBannerViewProps } from "./types";

export function HomeCtaBannerDesktop({
  badge = HOME_CTA_MESSAGES.BADGE,
  title = HOME_CTA_MESSAGES.TITLE,
  subtitle = HOME_CTA_MESSAGES.SUBTITLE,
  buttonText = HOME_CTA_MESSAGES.BUTTON_TEXT,
  handleCtaClick,
  className,
}: HomeCtaBannerViewProps) {
  return (
    <section
      aria-labelledby="home-cta-banner-desktop-title"
      className={cn("w-full select-none", className)}
    >
      <Box className="relative overflow-hidden rounded-3xl bg-[#1d5c22] dark:bg-[#164619] p-8 md:p-10 lg:p-12 text-white shadow-xl">
        <svg
          className="absolute -right-8 top-1/2 -translate-y-1/2 h-[340px] w-[340px] pointer-events-none opacity-20 text-white"
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
          <path
            d="M100 35V165"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.4"
          />
        </svg>

        <Box className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

        <Box className="relative z-10 flex items-center justify-between gap-8">
          <Box className="space-y-4 max-w-2xl text-left">
            <Box className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-semibold backdrop-blur-md border border-white/20">
              <span className="h-2 w-2 rounded-full bg-orange-400 shrink-0 animate-pulse" />
              <span>{badge}</span>
            </Box>

            <Heading
              level={2}
              id="home-cta-banner-desktop-title"
              className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-white tracking-tight leading-snug"
            >
              {title}
            </Heading>

            <Text className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal max-w-xl">
              {subtitle}
            </Text>
          </Box>

          <Box className="shrink-0">
            <Button
              type="button"
              size="lg"
              onClick={handleCtaClick}
              className="h-12 px-7 rounded-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-950/20 transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap border-none group"
              rightIcon={
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              }
            >
              {buttonText}
            </Button>
          </Box>
        </Box>
      </Box>
    </section>
  );
}
