import { Box, Typography } from "@/shared/ui";

interface AboutHeroBannerProps {
  onSelectTab?: (tab: "organic" | "insurance") => void;
}

export function AboutHeroBanner(_props?: AboutHeroBannerProps) {
  return (
    <Box className="relative w-full overflow-hidden bg-[#071309] text-white py-24 sm:py-28 lg:py-36 flex items-center justify-center select-none">
      {/* 1. Background Photo: Hands holding seedling in rich dark soil */}
      <Box
        className="absolute inset-0 bg-cover bg-left md:bg-center transform scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=80')",
        }}
      />

      {/* 2. Dark Green & Vignette Gradients (Agrivi Dark Forest Green aesthetic) */}
      <Box className="absolute inset-0 bg-[#081a0e]/75 mix-blend-multiply" />
      <Box className="absolute inset-0 bg-gradient-to-r from-[#051108]/90 via-[#07180c]/70 to-[#051108]/90" />
      <Box className="absolute inset-0 bg-gradient-to-t from-[#051108] via-transparent to-[#051108]/80" />

      {/* 3. Digital Agriculture Constellation Network SVG Overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 md:opacity-50"
        viewBox="0 0 1440 450"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="agriLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#15803d" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="1" />
            <stop offset="100%" stopColor="#15803d" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Constellation Network Lines */}
        <g stroke="url(#agriLineGrad)" strokeWidth="1">
          {/* Left/Center connecting mesh */}
          <line x1="380" y1="280" x2="450" y2="210" />
          <line x1="450" y1="210" x2="520" y2="290" />
          <line x1="450" y1="210" x2="560" y2="170" />
          <line x1="520" y1="290" x2="600" y2="340" />
          <line x1="560" y1="170" x2="650" y2="240" />
          <line x1="520" y1="290" x2="650" y2="240" />

          {/* Center to Right Mesh */}
          <line x1="650" y1="240" x2="720" y2="160" />
          <line x1="650" y1="240" x2="740" y2="320" />
          <line x1="600" y1="340" x2="740" y2="320" />
          <line x1="720" y1="160" x2="810" y2="220" />
          <line x1="740" y1="320" x2="830" y2="360" />
          <line x1="740" y1="320" x2="810" y2="220" />
          <line x1="810" y1="220" x2="890" y2="150" />
          <line x1="810" y1="220" x2="900" y2="280" />
          <line x1="830" y1="360" x2="900" y2="280" />

          {/* Far Right Tech Mesh */}
          <line x1="890" y1="150" x2="980" y2="210" />
          <line x1="900" y1="280" x2="980" y2="210" />
          <line x1="900" y1="280" x2="990" y2="340" />
          <line x1="980" y1="210" x2="1080" y2="140" />
          <line x1="980" y1="210" x2="1070" y2="260" />
          <line x1="990" y1="340" x2="1070" y2="260" />
          <line x1="990" y1="340" x2="1090" y2="380" />
          <line x1="1080" y1="140" x2="1180" y2="190" />
          <line x1="1070" y1="260" x2="1180" y2="190" />
          <line x1="1070" y1="260" x2="1190" y2="310" />
          <line x1="1090" y1="380" x2="1190" y2="310" />
          <line x1="1180" y1="190" x2="1280" y2="130" />
          <line x1="1180" y1="190" x2="1290" y2="240" />
          <line x1="1190" y1="310" x2="1290" y2="240" />
          <line x1="1190" y1="310" x2="1310" y2="360" />
          <line x1="1280" y1="130" x2="1380" y2="180" />
          <line x1="1290" y1="240" x2="1380" y2="180" />
          <line x1="1290" y1="240" x2="1400" y2="290" />
          <line x1="1310" y1="360" x2="1400" y2="290" />
          <line x1="1380" y1="180" x2="1440" y2="140" />
          <line x1="1400" y1="290" x2="1440" y2="270" />

          {/* Top subtle cross-lines */}
          <line x1="650" y1="90" x2="720" y2="160" strokeDasharray="3 3" opacity="0.4" />
          <line x1="810" y1="90" x2="890" y2="150" strokeDasharray="3 3" opacity="0.4" />
          <line x1="1000" y1="80" x2="1080" y2="140" strokeDasharray="3 3" opacity="0.4" />
          <line x1="1200" y1="70" x2="1280" y2="130" strokeDasharray="3 3" opacity="0.4" />
        </g>

        {/* Constellation Dots / Nodes */}
        <g fill="url(#nodeGlow)">
          <circle cx="380" cy="280" r="3.5" />
          <circle cx="450" cy="210" r="4" />
          <circle cx="520" cy="290" r="3.5" />
          <circle cx="560" cy="170" r="3" />
          <circle cx="600" cy="340" r="4.5" />
          <circle cx="650" cy="240" r="5" />
          <circle cx="720" cy="160" r="4" />
          <circle cx="740" cy="320" r="4.5" />
          <circle cx="810" cy="220" r="5.5" />
          <circle cx="830" cy="360" r="3.5" />
          <circle cx="890" cy="150" r="4" />
          <circle cx="900" cy="280" r="5" />
          <circle cx="980" cy="210" r="6" />
          <circle cx="990" cy="340" r="4" />
          <circle cx="1080" cy="140" r="4" />
          <circle cx="1070" cy="260" r="6.5" />
          <circle cx="1090" cy="380" r="3.5" />
          <circle cx="1180" cy="190" r="5" />
          <circle cx="1190" cy="310" r="4.5" />
          <circle cx="1280" cy="130" r="4" />
          <circle cx="1290" cy="240" r="6" />
          <circle cx="1310" cy="360" r="3.5" />
          <circle cx="1380" cy="180" r="4" />
          <circle cx="1400" cy="290" r="4.5" />
        </g>
      </svg>

      {/* 4. Centered Hero Content */}
      <Box className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center space-y-6">
        {/* Main Title */}
        <Typography.H1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-wider uppercase text-white font-sans drop-shadow-md">
          ABOUT US
        </Typography.H1>

        {/* Subtitle / Tagline */}
        <Typography.P className="text-base sm:text-xl lg:text-2xl font-light text-slate-100 max-w-3xl mx-auto leading-relaxed tracking-wide drop-shadow-sm">
          Solving the Global Food Problem by Digitalizing Agriculture.
        </Typography.P>

        {/* Button: CONTACT US */}
        <Box className="pt-2">
          <a
            href="tel:19006868"
            className="inline-flex items-center justify-center px-9 py-3 border border-white text-white text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            CONTACT US
          </a>
        </Box>
      </Box>
    </Box>
  );
}

