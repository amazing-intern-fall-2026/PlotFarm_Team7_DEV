import {
  ShieldCheck,
  Droplets,
  Sprout,
  Sun,
  Dna,
  CheckCircle2,
  FileCheck,
  Award,
  Sparkles,
  Phone,
  Scale,
  BadgeCheck,
} from "lucide-react";
import {
  Box,
  Container,
  Card,
  Typography,
  Button,
  Badge,
  Breadcrumb,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import {
  ORGANIC_PILLARS,
  INSPECTION_CERTIFICATES,
  GUARANTEE_PLEDGE,
  type OrganicPillarItem,
} from "./organic-standards.constants";

export function OrganicStandardsPage() {
  const getPillarIcon = (name: OrganicPillarItem["iconName"]) => {
    switch (name) {
      case "shield":
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case "droplets":
        return <Droplets className="w-6 h-6 text-sky-600" />;
      case "sprout":
        return <Sprout className="w-6 h-6 text-emerald-600" />;
      case "sun":
        return <Sun className="w-6 h-6 text-amber-500" />;
      case "dna":
        return <Dna className="w-6 h-6 text-teal-600" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <Box className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans pb-24 lg:pb-16 w-full max-w-full overflow-hidden">
      <Container size="7xl" className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-10">
        {/* Breadcrumb standard */}
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Pháp lý", href: "/legal/organic-standards" },
            { label: "Cam kết tiêu chuẩn hữu cơ", isCurrent: true },
          ]}
        />

        {/* Hero Banner Bento */}
        <Box className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-emerald-900/50">
          <Box className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <Box className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

          <Box className="relative z-10 max-w-4xl space-y-6">
            <Box className="flex flex-wrap items-center gap-3">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 px-3.5 py-1 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" />
                Chứng thư minh bạch số 2026
              </Badge>
              <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/40 px-3.5 py-1 text-xs font-medium">
                Kiểm định độc lập Eurofins & SGS
              </Badge>
            </Box>

            <Box className="space-y-3">
              <Typography.H1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Cam Kết Tiêu Chuẩn Hữu Cơ Sinh Học
              </Typography.H1>
              <Typography.P className="text-emerald-100/90 text-sm sm:text-base lg:text-lg max-w-3xl leading-relaxed">
                Tại nông trại Green Farm Đạ Sar (Đà Lạt), mọi luống rau được kiến tạo từ nguyên lý tôn trọng hệ sinh thái tự nhiên: 
                nguồn nước ngầm nguyên sinh, dinh dưỡng trùn quế hữu cơ, bảo vệ cây bằng thảo mộc và thiên địch đối kháng.
              </Typography.P>
            </Box>

            {/* Quick Metrics */}
            <Box className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-emerald-800/40">
              <Box className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <Typography.H4 className="text-xl sm:text-2xl font-bold text-emerald-400">0.00%</Typography.H4>
                <Typography.Text className="text-xs text-emerald-200/80">Dư lượng hóa học BVTV</Typography.Text>
              </Box>
              <Box className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <Typography.H4 className="text-xl sm:text-2xl font-bold text-teal-300">120m</Typography.H4>
                <Typography.Text className="text-xs text-teal-200/80">Độ sâu nước khoáng Đạ Sar</Typography.Text>
              </Box>
              <Box className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <Typography.H4 className="text-xl sm:text-2xl font-bold text-emerald-400">15 Ngày</Typography.H4>
                <Typography.Text className="text-xs text-emerald-200/80">Đất nghỉ nuôi vi sinh</Typography.Text>
              </Box>
              <Box className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <Typography.H4 className="text-xl sm:text-2xl font-bold text-amber-300">200%</Typography.H4>
                <Typography.Text className="text-xs text-amber-200/80">Bồi thường nếu sai lệch</Typography.Text>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 5 Trụ Cột Cam Kết Vàng (Bento Grid) */}
        <Box className="space-y-6">
          <Box className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <Box className="space-y-1">
              <Box className="flex items-center gap-2 text-emerald-600 font-semibold text-xs tracking-wider uppercase">
                <BadgeCheck className="w-4 h-4" />
                Nguyên Lý Canh Tác Thuần Khiết
              </Box>
              <Typography.H2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                5 Trụ Cột Cam Kết Vàng
              </Typography.H2>
            </Box>
            <Typography.Text className="text-xs sm:text-sm text-muted-foreground max-w-md">
              Tất cả chỉ số nông học được cảm biến IoT đo đạc và lưu trữ bất biến trên hồ sơ nông trại số.
            </Typography.Text>
          </Box>

          <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ORGANIC_PILLARS.map((pillar, idx) => {
              const isFeatureCard = idx === 0 || idx === 1;
              return (
                <Card
                  key={pillar.id}
                  className={cn(
                    "group relative border-border/80 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-lg hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden",
                    isFeatureCard ? "md:col-span-1 lg:col-span-1" : "md:col-span-1"
                  )}
                >
                  <Box className="space-y-4">
                    {/* Header: Number & Icon */}
                    <Box className="flex items-center justify-between">
                      <Typography.Text className="font-mono font-black text-2xl sm:text-3xl text-slate-300 dark:text-slate-700 tracking-tighter block">
                        {pillar.pillarNumber}
                      </Typography.Text>
                      <Box className="p-3 rounded-2xl bg-muted/60 dark:bg-slate-800 shadow-2xs group-hover:scale-105 transition-transform">
                        {getPillarIcon(pillar.iconName)}
                      </Box>
                    </Box>

                    {/* Titles */}
                    <Box className="space-y-1">
                      <Typography.H3 className="text-base sm:text-lg font-bold text-foreground">
                        {pillar.title}
                      </Typography.H3>
                      <Typography.Text className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block">
                        {pillar.subtitle}
                      </Typography.Text>
                    </Box>

                    <Typography.P className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </Typography.P>

                    {/* Metric Box */}
                    <Box className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 space-y-0.5">
                      <Typography.Text className="font-mono font-black text-lg text-emerald-800 dark:text-emerald-300 block">
                        {pillar.metric}
                      </Typography.Text>
                      <Typography.Text className="text-[11px] text-muted-foreground font-medium block">
                        {pillar.metricLabel}
                      </Typography.Text>
                    </Box>

                    {/* Checkpoints */}
                    <Box className="space-y-2 pt-2 border-t border-border/50">
                      {pillar.checkpoints.map((pt, pIdx) => (
                        <Box key={pIdx} className="flex items-start gap-2 text-xs text-foreground font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <Typography.Text className="text-xs text-foreground">{pt}</Typography.Text>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Card>
              );
            })}
          </Box>
        </Box>

        {/* Khung Chứng Chỉ & Kiểm Định Số */}
        <Box className="space-y-6 pt-4">
          <Box className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <Box>
              <Typography.H2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                Chứng Chỉ & Hồ Sơ Kiểm Định Số
              </Typography.H2>
              <Typography.Text className="text-xs sm:text-sm text-muted-foreground mt-0.5 block">
                Các tổ chức giám định độc lập chứng nhận quy trình canh tác và kết quả kiểm nghiệm định kỳ.
              </Typography.Text>
            </Box>
            <Badge variant="outline" className="text-xs font-bold text-emerald-800 dark:text-emerald-300 border-emerald-300 shrink-0">
              Cập nhật quý 1/2026
            </Badge>
          </Box>

          <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INSPECTION_CERTIFICATES.map((cert) => (
              <Card key={cert.id} className="border-border/80 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
                <Box className="space-y-3">
                  <Box className="flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {cert.badgeLabel}
                    </Badge>
                    <Award className="w-4 h-4 text-emerald-600" />
                  </Box>

                  <Typography.H4 className="text-sm font-bold text-foreground">
                    {cert.standardName}
                  </Typography.H4>

                  <Box className="space-y-1.5 text-xs text-muted-foreground">
                    <Typography.Text className="text-xs block">
                      Mã chứng nhận: <Typography.Text className="text-foreground font-mono font-bold">{cert.code}</Typography.Text>
                    </Typography.Text>
                    <Typography.Text className="text-xs block">
                      Tổ chức cấp: <Typography.Text className="text-foreground">{cert.certifier}</Typography.Text>
                    </Typography.Text>
                    <Typography.Text className="text-xs block">
                      Thời hạn hiệu lực: <Typography.Text className="text-emerald-700 dark:text-emerald-400 font-bold">{cert.validUntil}</Typography.Text>
                    </Typography.Text>
                    <Typography.Text className="text-[11px] italic pt-1 text-slate-500 block">
                      {cert.auditScope}
                    </Typography.Text>
                  </Box>
                </Box>

                <Box className="pt-2 border-t border-border/50">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => alert(`Mở bản scan chứng nhận số: ${cert.code}`)}
                    className="w-full text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    Xem bản chứng thực (PDF)
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Cam Kết Bồi Hoàn Vàng 200% */}
        <Box className="rounded-3xl border-2 border-emerald-600 bg-gradient-to-r from-emerald-50 via-emerald-100/40 to-teal-50 dark:from-emerald-950/40 dark:via-emerald-900/30 dark:to-slate-900 p-6 sm:p-10 shadow-lg space-y-6">
          <Box className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Box className="flex items-center gap-3.5">
              <Box className="p-3.5 rounded-2xl bg-emerald-600 text-white shadow-md">
                <Scale className="w-7 h-7" />
              </Box>
              <Box>
                <Badge variant="outline" className="bg-white text-emerald-800 border-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                  Bảo chứng pháp lý
                </Badge>
                <Typography.H3 className="text-xl sm:text-2xl font-black text-emerald-950 dark:text-white">
                  {GUARANTEE_PLEDGE.headline}
                </Typography.H3>
              </Box>
            </Box>

            <Box className="flex items-center gap-2">
              <Button
                variant="default"
                size="default"
                onClick={() => alert("Đang tải văn bản cam kết bảo chứng pháp lý có mộc đỏ...")}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Tải chứng thư cam kết (PDF)
              </Button>
            </Box>
          </Box>

          <Typography.P className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 leading-relaxed max-w-4xl">
            {GUARANTEE_PLEDGE.description}
          </Typography.P>

          <Box className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {GUARANTEE_PLEDGE.compensationPolicy.map((item, idx) => (
              <Box key={idx} className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-emerald-200/80 dark:border-emerald-800/60 flex items-start gap-2.5 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <Typography.Text className="text-xs font-semibold text-emerald-950 dark:text-emerald-100 leading-snug">
                  {item}
                </Typography.Text>
              </Box>
            ))}
          </Box>

          <Box className="pt-4 border-t border-emerald-300/60 dark:border-emerald-800/60 flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-900 dark:text-emerald-200">
            <Box className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
              <Typography.Text className="text-xs">Đường dây nóng khiếu nại pháp lý: <Typography.Text className="font-bold">1900 6868 (Bấm phím 9)</Typography.Text></Typography.Text>
            </Box>
            <Typography.Text className="text-xs">Email tiếp nhận độc lập: <Typography.Text className="font-bold">phaply@greenfarm.dalat.vn</Typography.Text></Typography.Text>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
