import { Link } from "react-router-dom";
import {
  Radio,
  ChevronLeft,
  CheckCircle2,
  Monitor,
  Truck,
} from "lucide-react";
import {
  Box,
  Typography,
  Text,
  Badge,
  Logo,
  Avatar,
} from "@/shared/ui";
import { AUTH_UI_TEXT } from "../../constants";

export function HeroBanner() {
  return (
    <Box className="relative hidden lg:flex flex-col justify-between h-full p-8 xl:p-10 2xl:p-12 overflow-hidden select-none">
      <img
        src="/images/background.jpg"
        alt="Green Farm Agriculture Sanctuary"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <Box className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/75" />
      <Box className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
      <Box className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
      <Box className="absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-[hsl(154,50%,32%)]/25 blur-3xl pointer-events-none" />

      <Box className="relative z-10 flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-3 group transition-transform active:scale-95">
          <Logo size="md" />
          <Box>
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
              Green Farm
            </span>
            <Text
              variant="muted"
              className="text-[9px] text-emerald-200/70 font-medium tracking-widest uppercase block"
            >
              {AUTH_UI_TEXT.HERO_BRAND_SUB}
            </Text>
          </Box>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>{AUTH_UI_TEXT.BACK_TO_HOME}</span>
        </Link>
      </Box>

      <Box className="relative z-10 max-w-xl my-auto py-4 xl:py-6 space-y-4">
        <Box className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-emerald-300 backdrop-blur-md">
          <Radio className="h-2.5 w-2.5 text-emerald-400 animate-pulse" />
          <span>{AUTH_UI_TEXT.HERO_LIVE_BADGE}</span>
        </Box>

        <Typography
          as="h1"
          className="text-2xl xl:text-3xl 2xl:text-4xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md"
        >
          {AUTH_UI_TEXT.HERO_HEADLINE}
        </Typography>

        <Text className="text-xs xl:text-sm text-white/85 leading-relaxed font-normal">
          {AUTH_UI_TEXT.HERO_SUBTITLE}
        </Text>

        <Box className="pt-2 flex items-center gap-3">
          <Box className="flex -space-x-2">
            {["HN", "SG", "DL", "DN"].map((initials) => (
              <Avatar
                key={initials}
                name={initials}
                size="sm"
                className="border-2 border-black/60 bg-emerald-800 text-white text-[10px] font-semibold h-7 w-7 shadow-sm"
              />
            ))}
          </Box>
          <Text className="text-xs text-white/80">
            {AUTH_UI_TEXT.HERO_PROOF_PREFIX}{" "}
            <strong className="text-emerald-300 font-bold">
              {AUTH_UI_TEXT.HERO_PROOF_COUNT}
            </strong>{" "}
            {AUTH_UI_TEXT.HERO_PROOF_SUFFIX}
          </Text>
        </Box>

        <Box className="flex flex-wrap gap-2 pt-1">
          {[
            { icon: CheckCircle2, label: AUTH_UI_TEXT.HERO_PILL_SOIL },
            { icon: Monitor, label: AUTH_UI_TEXT.HERO_PILL_CAMERA },
            { icon: Truck, label: AUTH_UI_TEXT.HERO_PILL_DELIVERY },
          ].map(({ icon: Icon, label }) => (
            <Badge
              key={label}
              variant="outline"
              icon={<Icon className="h-3 w-3 text-emerald-400" />}
              className="rounded-full bg-black/40 border-white/15 text-[11px] text-white/90 px-3 py-1 backdrop-blur-md"
            >
              {label}
            </Badge>
          ))}
        </Box>
      </Box>

      <Box className="relative z-10 flex flex-wrap items-center justify-between text-xs text-white/60 border-t border-white/10 pt-4">
        <Box className="flex items-center gap-6">
          <Link to="/terms" className="hover:text-white transition-colors">
            {AUTH_UI_TEXT.POLICY}
          </Link>
          <Link to="/about" className="hover:text-white transition-colors">
            {AUTH_UI_TEXT.ABOUT_US}
          </Link>
          <Link to="/support" className="hover:text-white transition-colors">
            {AUTH_UI_TEXT.REPORT_ISSUE}
          </Link>
        </Box>
        <Text className="text-[11px] text-white/50">
          © 2026 Green Farm Ecosystem.
        </Text>
      </Box>
    </Box>
  );
}
