import { Link, useNavigate } from "react-router-dom";
import {
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
import { AUTH_ROUTES, AUTH_UI_TEXT } from "../../constants";
import { LoginForm } from "./LoginForm";

export function HeroBanner() {
  return (
    <Box className="relative hidden lg:flex flex-col justify-between h-full p-8 xl:p-10 2xl:p-12 overflow-hidden select-none">
      {/* Background image loaded from public/images/background.jpg */}
      <img
        src="/images/background.jpg"
        alt="Green Farm Agriculture Sanctuary"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Cinematic dark & bio-green gradient overlays */}
      <Box className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/75" />
      <Box className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
      <Box className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
      <Box className="absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-[hsl(154,50%,32%)]/25 blur-3xl pointer-events-none" />

      {/* Top Header inside Hero */}
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

      {/* Center Hero Content */}
      <Box className="relative z-10 max-w-lg space-y-6 my-auto py-8">
        <Box className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-950/60 backdrop-blur-md shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-emerald-300 tracking-wide">
            {AUTH_UI_TEXT.HERO_LIVE_BADGE}
          </span>
        </Box>

        <Box className="space-y-3">
          <Typography
            variant="h1"
            className="text-3xl xl:text-4xl 2xl:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md"
          >
            {AUTH_UI_TEXT.HERO_HEADLINE}
          </Typography>
          <Text className="text-sm xl:text-base text-white/85 leading-relaxed font-normal max-w-md">
            {AUTH_UI_TEXT.HERO_SUBTITLE}
          </Text>
        </Box>

        {/* Feature Pills */}
        <Box className="grid grid-cols-3 gap-2.5 pt-2">
          <Box className="flex items-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="text-xs text-white/90 font-medium">
              {AUTH_UI_TEXT.HERO_PILL_SOIL}
            </span>
          </Box>
          <Box className="flex items-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
            <Monitor className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="text-xs text-white/90 font-medium">
              {AUTH_UI_TEXT.HERO_PILL_CAMERA}
            </span>
          </Box>
          <Box className="flex items-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
            <Truck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="text-xs text-white/90 font-medium">
              {AUTH_UI_TEXT.HERO_PILL_DELIVERY}
            </span>
          </Box>
        </Box>

        {/* Testimonial Quote Card */}
        <Box className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/40 backdrop-blur-md space-y-3">
          <Text className="text-xs xl:text-sm text-emerald-100/90 italic leading-relaxed">
            {AUTH_UI_TEXT.HERO_QUOTE}
          </Text>
          <Box className="flex items-center justify-between pt-1 border-t border-emerald-500/20">
            <Box className="flex items-center gap-2.5">
              <Avatar
                name="Minh Thư"
                size="sm"
                className="border border-emerald-400/50 bg-emerald-800 text-white font-bold"
              />
              <Box>
                <span className="text-xs font-semibold text-white block">
                  Chị Minh Thư
                </span>
                <span className="text-[10px] text-emerald-300/80">
                  Chủ thửa A-12 (Đã gắn bó 2 năm)
                </span>
              </Box>
            </Box>
            <Badge variant="success" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px]">
              {AUTH_UI_TEXT.HERO_MODEL_BADGE}
            </Badge>
          </Box>
        </Box>
      </Box>

      {/* Hero Bottom Bar */}
      <Box className="relative z-10 flex items-center justify-between text-xs text-white/70 pt-4 border-t border-white/10">
        <Box className="flex items-center gap-4">
          <Link to="/about" className="hover:text-white transition-colors">
            {AUTH_UI_TEXT.ABOUT_US}
          </Link>
          <span>•</span>
          <Link to="/terms" className="hover:text-white transition-colors">
            {AUTH_UI_TEXT.POLICY}
          </Link>
          <span>•</span>
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

export interface LoginDesktopViewProps {
  onSwitchToRegister?: () => void;
}

export function LoginDesktopView({ onSwitchToRegister }: LoginDesktopViewProps) {
  const navigate = useNavigate();
  const handleSwitchToRegister = onSwitchToRegister ?? (() => navigate(AUTH_ROUTES.REGISTER));

  return (
    <Box className="h-full w-full grid grid-cols-2 overflow-hidden bg-background">
      {/* Left Column: Hero Banner */}
      <HeroBanner />

      {/* Right Column: Desktop Login Form Panel */}
      <Box className="flex flex-col justify-between h-full px-6 xl:px-12 py-4 xl:py-6 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <Box className="w-full max-w-[460px] mx-auto my-auto py-1 flex flex-col justify-center">
          <LoginForm onSwitchToRegister={handleSwitchToRegister} />
        </Box>

        {/* Desktop Terms Footer */}
        <Box className="w-full max-w-[460px] mx-auto pt-2 text-center">
          <Text variant="muted" className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {AUTH_UI_TEXT.TERMS_PREFIX}{" "}
            <Link
              to="/terms"
              className="underline underline-offset-2 hover:text-foreground transition-colors font-medium"
            >
              {AUTH_UI_TEXT.TERMS_CONTRACT}
            </Link>{" "}
            {AUTH_UI_TEXT.TERMS_AND}{" "}
            <Link
              to="/privacy"
              className="underline underline-offset-2 hover:text-foreground transition-colors font-medium"
            >
              {AUTH_UI_TEXT.TERMS_PRIVACY}
            </Link>{" "}
            {AUTH_UI_TEXT.TERMS_SUFFIX}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
