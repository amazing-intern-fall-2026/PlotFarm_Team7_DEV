import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Sprout,
  ClipboardList,
  AlertTriangle,
  Download,
  Clock,
  RefreshCw,
  Wallet,
  Camera,
  Droplets,
  Truck,
  Sparkles,
} from "lucide-react";
import {
  Card,
  Button,
  Badge,
  Box,
  Flex,
  Grid,
  Breadcrumb,
  Heading,
  Text,
  Typography,
} from "@/shared/ui";

interface TimelineEvent {
  id: string;
  time: string;
  icon: "bank" | "camera" | "droplet" | "truck";
  content: React.ReactNode;
  plotCode: string;
  category: string;
  badgeVariant: "success" | "info" | "warning" | "default";
}

const STORAGE_KEY_ADMIN_EVENTS = "admin_dashboard_events_v2";

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = React.useState<"today" | "7days" | "season">("season");
  const [isExporting, setIsExporting] = React.useState(false);
  const [events, setEvents] = React.useState<TimelineEvent[]>(() => {
    try {
      localStorage.removeItem("admin_dashboard_events");
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_EVENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const hasOldMocks = parsed.some((e: TimelineEvent) =>
            ["evt-1", "evt-2", "evt-3", "evt-4"].includes(e?.id)
          );
          if (hasOldMocks) return [];
          return parsed;
        }
      }
    } catch {
      // Ignore storage read error
    }
    return [];
  });
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const stats = React.useMemo(() => {
    let totalRevenue = 0;
    let activeContracts = 0;
    let totalPlots = 0;
    let cultivatingPlots = 0;
    let harvestReadyCount = 0;

    try {
      const contractsRaw =
        localStorage.getItem("admin_managed_contracts_data_v2") ||
        localStorage.getItem("admin_managed_contracts_data");
      if (contractsRaw) {
        const contracts = JSON.parse(contractsRaw);
        if (Array.isArray(contracts)) {
          activeContracts = contracts.length;
          totalRevenue = contracts
            .filter((c: Record<string, unknown>) => c.status === "paid")
            .reduce((sum: number, c: Record<string, unknown>) => sum + (Number(c.amount) || 0), 0);
        }
      }

      const plotsRaw =
        localStorage.getItem("admin_managed_plots_data_v2") ||
        localStorage.getItem("admin_managed_plots_data");
      if (plotsRaw) {
        const plots = JSON.parse(plotsRaw);
        if (Array.isArray(plots)) {
          totalPlots = plots.length;
          cultivatingPlots = plots.filter(
            (p: Record<string, unknown>) =>
              typeof p.status === "string" && ["cultivating", "rented"].includes(p.status)
          ).length;
          harvestReadyCount = plots.filter(
            (p: Record<string, unknown>) => p.status === "harvest_ready"
          ).length;
        }
      }
    } catch {
      // Ignore storage parsing error
    }

    const occupancyPercent = totalPlots > 0 ? Math.round((cultivatingPlots / totalPlots) * 100) : 0;

    return {
      totalRevenue,
      activeContracts,
      totalPlots,
      cultivatingPlots,
      harvestReadyCount,
      occupancyPercent,
    };
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Đã xuất báo cáo tổng quan vụ mùa Đông Xuân 2026 (PDF/Excel) thành công!");
    }, 800);
  };

  const handleRefreshEvents = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const newEvt: TimelineEvent = {
        id: `evt-${Date.now()}`,
        time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        icon: "droplet",
        content: (
          <Text variant="body2" className="text-foreground">
            Cảm biến vi khí hậu tự động hiệu chỉnh thông số đo tại khu vực nhà màng A
          </Text>
        ),
        plotCode: "Ô #A-102",
        category: "Tự động",
        badgeVariant: "warning",
      };
      const updated = [newEvt, ...events.slice(0, 5)];
      setEvents(updated);
      try {
        localStorage.setItem(STORAGE_KEY_ADMIN_EVENTS, JSON.stringify(updated));
      } catch {
        // Ignore storage write error
      }
    }, 600);
  };

  return (
    <Box className="w-full space-y-6 pb-12">
      <Flex direction="col" justify="between" className="gap-4 lg:flex-row lg:items-center">
        <Box className="space-y-1.5">
          <Breadcrumb
            items={[
              { label: "Hệ thống", href: "/admin" },
              { label: "Bảng điều khiển tổng quan", isCurrent: true },
            ]}
          />
          <Heading level={1} variant="h1" className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Bảng điều khiển Tổng quan &amp; Phân tích Vận hành
          </Heading>
          <Text variant="body2" className="text-muted-foreground">
            Trung tâm điều hành vĩ mô – Giám sát chỉ số tài chính, tình trạng ô đất và chất lượng canh tác
          </Text>
        </Box>

        <Flex wrap="wrap" align="center" className="gap-2.5">
          <Box className="inline-flex rounded-xl bg-muted p-1">
            <Button
              type="button"
              variant={activeFilter === "today" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter("today")}
              className="h-8 text-xs font-semibold"
            >
              Hôm nay
            </Button>
            <Button
              type="button"
              variant={activeFilter === "7days" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter("7days")}
              className="h-8 text-xs font-semibold"
            >
              7 ngày
            </Button>
            <Button
              type="button"
              variant={activeFilter === "season" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter("season")}
              className="h-8 text-xs font-bold"
            >
              Vụ mùa Đông Xuân 2026
            </Button>
          </Box>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={isExporting}
            leftIcon={<Download className="h-4 w-4" />}
            className="h-9 font-semibold shadow-xs"
          >
            {isExporting ? "Đang xuất..." : "Xuất báo cáo PDF/Excel"}
          </Button>
        </Flex>
      </Flex>

      <Grid cols={1} colsSm={2} colsLg={4} gap={4}>
        <Card className="relative overflow-hidden p-5 shadow-xs">
          <Flex justify="between" align="start">
            <Box>
              <Text variant="caption" className="font-semibold text-muted-foreground">
                Tổng doanh thu mùa vụ
              </Text>
              <Heading level={3} variant="h2" className="mt-2 text-2xl font-extrabold tracking-tight">
                {stats.totalRevenue.toLocaleString("vi-VN")} đ
              </Heading>
            </Box>
            <Flex align="center" justify="center" className="h-10 w-10 rounded-xl bg-primary/10 text-primary">
              <Wallet className="h-5 w-5" />
            </Flex>
          </Flex>
          <Flex align="center" className="mt-4 gap-2">
            <Badge variant="outline" className="gap-1 border-primary/20 bg-primary/10 text-primary font-bold">
              <TrendingUp className="h-3.5 w-3.5" />
              {stats.totalRevenue > 0 ? "+14.2%" : "0%"}
            </Badge>
            <Text variant="caption" className="text-muted-foreground">
              {stats.totalRevenue > 0 ? "so với vụ trước" : "Chưa có phát sinh"}
            </Text>
          </Flex>
        </Card>

        <Card className="relative overflow-hidden p-5 shadow-xs">
          <Flex justify="between" align="start">
            <Box>
              <Text variant="caption" className="font-semibold text-muted-foreground">
                Tỷ lệ lấp đầy ô đất
              </Text>
              <Flex align="baseline" className="mt-2 gap-2">
                <Heading level={3} variant="h2" className="text-2xl font-extrabold tracking-tight">
                  {stats.occupancyPercent}%
                </Heading>
                <Text variant="caption" className="text-muted-foreground font-medium">
                  ({stats.cultivatingPlots}/{stats.totalPlots} ô đang canh tác)
                </Text>
              </Flex>
            </Box>
            <Flex align="center" justify="center" className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary">
              <Sprout className="h-5 w-5" />
            </Flex>
          </Flex>
          <Box className="mt-4 w-full">
            <Box className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <Box
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${stats.occupancyPercent}%` }}
              />
            </Box>
          </Box>
        </Card>

        <Card className="relative overflow-hidden p-5 shadow-xs">
          <Flex justify="between" align="start">
            <Box>
              <Text variant="caption" className="font-semibold text-muted-foreground">
                Hợp đồng đang thực hiện
              </Text>
              <Heading level={3} variant="h2" className="mt-2 text-2xl font-extrabold tracking-tight">
                {stats.activeContracts} đơn
              </Heading>
            </Box>
            <Flex align="center" justify="center" className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <ClipboardList className="h-5 w-5" />
            </Flex>
          </Flex>
          <Flex align="center" className="mt-4 gap-2">
            <Badge variant="outline" className="gap-1 border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold">
              <Clock className="h-3.5 w-3.5" />
              {stats.harvestReadyCount} đơn sắp thu hoạch
            </Badge>
          </Flex>
        </Card>

        <Card className="relative overflow-hidden p-5 shadow-xs">
          <Flex justify="between" align="start">
            <Box>
              <Text variant="caption" className="font-semibold text-muted-foreground">
                Cảnh báo vi khí hậu
              </Text>
              <Flex align="center" className="mt-2 gap-2.5">
                <Heading level={3} variant="h2" className="text-2xl font-extrabold tracking-tight">
                  0 ô đất
                </Heading>
                <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary font-bold">
                  Hệ thống an toàn
                </Badge>
              </Flex>
            </Box>
            <Flex align="center" justify="center" className="h-10 w-10 rounded-xl bg-muted text-muted-foreground">
              <AlertTriangle className="h-5 w-5" />
            </Flex>
          </Flex>
          <Flex justify="between" align="center" className="mt-4">
            <Text variant="caption" className="text-muted-foreground">
              Tất cả cảm biến hoạt động bình thường
            </Text>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/plots")}
              className="h-auto p-0 text-xs font-semibold text-primary hover:text-primary hover:bg-transparent"
            >
              Xem →
            </Button>
          </Flex>
        </Card>
      </Grid>

      <Grid cols={1} colsLg={3} gap={6}>
        <Card className="p-6 shadow-xs lg:col-span-2">
          <Flex direction="col" justify="between" className="gap-2 sm:flex-row sm:items-center">
            <Box>
              <Heading level={2} variant="h3" className="text-base font-bold">
                Biểu đồ Doanh thu &amp; Chi phí theo tháng
              </Heading>
              <Text variant="caption" className="text-muted-foreground">
                Chu kỳ luân canh từ Tháng 5 đến Tháng 10 năm 2026 (Triệu VND)
              </Text>
            </Box>
            <Flex align="center" className="gap-4 text-xs font-semibold">
              <Flex align="center" className="gap-1.5">
                <Box className="h-3 w-3 rounded-xs bg-primary" />
                <Typography as="span" variant="caption" className="text-foreground font-semibold">
                  Doanh thu vụ
                </Typography>
              </Flex>
              <Flex align="center" className="gap-1.5">
                <Box className="h-3 w-3 rounded-xs bg-muted-foreground/30" />
                <Typography as="span" variant="caption" className="text-muted-foreground font-semibold">
                  Chi phí vận hành
                </Typography>
              </Flex>
            </Flex>
          </Flex>

          {stats.totalRevenue > 0 ? (
            <Box className="mt-6 w-full pt-4">
              <Flex justify="between" align="end" className="h-52 border-b border-border pb-2 px-2 gap-3">
                {[
                  { month: "Th.5", revenue: 48, cost: 28 },
                  { month: "Th.6", revenue: 60, cost: 32 },
                  { month: "Th.7", revenue: 55, cost: 34 },
                  { month: "Th.8", revenue: 72, cost: 38 },
                  { month: "Th.9", revenue: 70, cost: 35 },
                  { month: "Th.10", revenue: 80, cost: 38 },
                ].map((stat) => {
                  const maxVal = 90;
                  const revHeightPercent = (stat.revenue / maxVal) * 100;
                  const costHeightPercent = (stat.cost / maxVal) * 100;

                  return (
                    <Flex
                      key={stat.month}
                      direction="col"
                      align="center"
                      justify="end"
                      className="flex-1 h-full gap-2 group"
                    >
                      <Flex align="end" justify="center" className="w-full h-full gap-1.5">
                        <Box
                          className="w-5 sm:w-7 rounded-t-md bg-primary transition-all duration-300 hover:opacity-90 relative flex justify-center group-hover:scale-y-105 origin-bottom"
                          style={{ height: `${revHeightPercent}%` }}
                        >
                          <Typography
                            as="span"
                            variant="caption"
                            className="opacity-0 group-hover:opacity-100 absolute -top-6 font-bold text-primary transition-opacity whitespace-nowrap"
                          >
                            {stat.revenue}M
                          </Typography>
                        </Box>
                        <Box
                          className="w-5 sm:w-7 rounded-t-md bg-muted-foreground/25 transition-all duration-300 hover:bg-muted-foreground/35 relative flex justify-center group-hover:scale-y-105 origin-bottom"
                          style={{ height: `${costHeightPercent}%` }}
                        >
                          <Typography
                            as="span"
                            variant="caption"
                            className="opacity-0 group-hover:opacity-100 absolute -top-6 font-bold text-muted-foreground transition-opacity whitespace-nowrap"
                          >
                            {stat.cost}M
                          </Typography>
                        </Box>
                      </Flex>
                      <Typography as="span" variant="caption" className="font-semibold text-muted-foreground">
                        {stat.month}
                      </Typography>
                    </Flex>
                  );
                })}
              </Flex>
            </Box>
          ) : (
            <Flex direction="col" align="center" justify="center" className="py-16 text-center">
              <Flex align="center" justify="center" className="h-12 w-12 rounded-2xl bg-muted text-muted-foreground mb-3">
                <Wallet className="h-6 w-6" />
              </Flex>
              <Text variant="body1" className="font-semibold text-foreground">
                Chưa có phát sinh doanh thu vụ mùa
              </Text>
              <Text variant="caption" className="text-muted-foreground mt-1">
                Khi các hợp đồng thuê ô đất được thanh toán, biểu đồ tài chính sẽ cập nhật tại đây.
              </Text>
            </Flex>
          )}

          <Flex
            direction="col"
            justify="between"
            className="mt-5 gap-2 sm:flex-row sm:items-center rounded-xl bg-muted/50 px-4 py-3 border border-border/60"
          >
            <Flex align="center" className="gap-2 text-xs font-semibold text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <Typography as="span" variant="caption" className="text-foreground">
                Hiệu suất sinh lời bình quân:{" "}
                <Typography as="strong" variant="caption" className="font-bold text-primary">
                  {stats.totalRevenue > 0 ? "54.8% / ô đất" : "0%"}
                </Typography>
              </Typography>
            </Flex>
            <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary self-start sm:self-auto font-semibold">
              {stats.totalRevenue > 0 ? "Tăng trưởng ổn định" : "Khởi tạo hệ thống"}
            </Badge>
          </Flex>
        </Card>

        <Card className="p-6 shadow-xs flex flex-col justify-between">
          <Box>
            <Heading level={2} variant="h3" className="text-base font-bold">
              Cơ cấu Cây trồng Hiện tại
            </Heading>
            <Text variant="caption" className="text-muted-foreground">
              Tỷ trọng phân bổ giống rau trên {stats.cultivatingPlots} ô canh tác
            </Text>

            {stats.cultivatingPlots > 0 ? (
              <Box>
                <Box className="mt-6 flex items-center justify-center relative">
                  <svg viewBox="0 0 160 160" className="w-44 h-44 -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="22"
                      className="text-muted"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="22"
                      strokeDasharray="163.8 200.2"
                      strokeDashoffset="0"
                      fill="none"
                      className="text-primary transition-all duration-500"
                    />
                  </svg>

                  <Flex direction="col" align="center" justify="center" className="absolute inset-0 text-center">
                    <Heading level={3} variant="h3" className="text-xl font-extrabold tracking-tight">
                      {stats.cultivatingPlots} Ô
                    </Heading>
                    <Text variant="caption" className="font-bold text-muted-foreground uppercase tracking-wider">
                      CANH TÁC
                    </Text>
                  </Flex>
                </Box>

                <Box className="mt-6 space-y-2.5 text-xs">
                  <Flex justify="between" align="center">
                    <Flex align="center" className="gap-2">
                      <Box className="h-2.5 w-2.5 rounded-full bg-primary" />
                      <Typography as="span" variant="caption" className="font-semibold text-foreground">
                        Rau ăn lá tự nhiên
                      </Typography>
                    </Flex>
                    <Flex align="center" className="gap-2">
                      <Text variant="caption" className="text-muted-foreground">
                        {stats.cultivatingPlots} ô
                      </Text>
                      <Text variant="caption" className="font-bold text-foreground">
                        100%
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            ) : (
              <Flex direction="col" align="center" justify="center" className="py-16 text-center">
                <Flex align="center" justify="center" className="h-12 w-12 rounded-2xl bg-primary/10 text-primary mb-3">
                  <Sprout className="h-6 w-6" />
                </Flex>
                <Text variant="body1" className="font-semibold text-foreground">
                  Chưa có ô đất canh tác
                </Text>
                <Text variant="caption" className="text-muted-foreground mt-1">
                  Chưa có giống rau nào đang được gieo trồng trong mùa vụ này.
                </Text>
              </Flex>
            )}
          </Box>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/crops")}
            className="mt-4 w-full text-xs font-semibold text-primary hover:text-primary hover:bg-primary/10"
          >
            Quản lý danh mục giống cây →
          </Button>
        </Card>
      </Grid>

      <Card className="p-6 shadow-xs">
        <Flex justify="between" align="center" className="border-b border-border pb-4">
          <Flex align="center" className="gap-3">
            <Heading level={2} variant="h3" className="text-base font-bold">
              Nhật ký tác vụ thời gian thực
            </Heading>
            <Badge variant="outline" className="gap-1.5 border-primary/20 bg-primary/10 text-primary font-bold">
              <Box className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
              Live Event Stream
            </Badge>
          </Flex>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            title="Làm mới sự kiện"
            aria-label="Làm mới sự kiện"
            onClick={handleRefreshEvents}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </Flex>

        {events.length === 0 ? (
          <Flex direction="col" align="center" justify="center" className="py-12 text-center">
            <Clock className="h-6 w-6 text-muted-foreground mb-2" />
            <Text variant="body1" className="font-semibold text-foreground">
              Chưa có nhật ký tác vụ nào phát sinh
            </Text>
            <Text variant="caption" className="text-muted-foreground mt-1">
              Các thao tác thanh toán, cảm biến IoT và vận chuyển sẽ tự động xuất hiện tại đây.
            </Text>
          </Flex>
        ) : (
          <Box className="mt-4 divide-y divide-border/60">
            {events.map((evt) => {
              const getIconComponent = () => {
                switch (evt.icon) {
                  case "bank":
                    return <Wallet className="h-4 w-4 text-primary" />;
                  case "camera":
                    return <Camera className="h-4 w-4 text-blue-500" />;
                  case "droplet":
                    return <Droplets className="h-4 w-4 text-amber-500" />;
                  case "truck":
                    return <Truck className="h-4 w-4 text-indigo-500" />;
                  default:
                    return <Sparkles className="h-4 w-4 text-muted-foreground" />;
                }
              };

              const getBadgeVariantClass = () => {
                switch (evt.badgeVariant) {
                  case "success":
                    return "border-primary/20 bg-primary/10 text-primary";
                  case "info":
                    return "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400";
                  case "warning":
                    return "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400";
                  default:
                    return "border-border bg-muted text-muted-foreground";
                }
              };

              return (
                <Flex
                  key={evt.id}
                  direction="col"
                  justify="between"
                  className="gap-2 py-3 sm:flex-row sm:items-center hover:bg-muted/40 px-2 rounded-lg transition-colors"
                >
                  <Flex align="start" className="gap-3">
                    <Typography
                      as="span"
                      variant="caption"
                      className="font-mono font-medium text-muted-foreground shrink-0 mt-0.5"
                    >
                      {evt.time}
                    </Typography>
                    <Flex
                      align="center"
                      justify="center"
                      className="h-7 w-7 rounded-lg bg-muted shrink-0"
                    >
                      {getIconComponent()}
                    </Flex>
                    <Box className="leading-relaxed">
                      {evt.content}
                    </Box>
                  </Flex>

                  <Flex align="center" className="gap-3 self-end sm:self-center shrink-0">
                    <Typography
                      as="span"
                      variant="caption"
                      className="font-mono font-medium text-muted-foreground"
                    >
                      {evt.plotCode}
                    </Typography>
                    <Badge variant="outline" className={`font-bold ${getBadgeVariantClass()}`}>
                      {evt.category}
                    </Badge>
                  </Flex>
                </Flex>
              );
            })}
          </Box>
        )}
      </Card>
    </Box>
  );
}
