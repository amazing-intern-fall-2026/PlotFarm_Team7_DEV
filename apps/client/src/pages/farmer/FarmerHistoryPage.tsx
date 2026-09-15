import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
  Box,
  Text,
} from "@/shared/ui";
import {
  Calendar,
  CheckCircle2,
  Camera,
  Star,
  Sprout,
  Truck,
  Droplets,
  ShieldCheck,
  Filter,
  Sparkles,
  ArrowLeft,
  Clock,
  MapPin,
  FileText,
} from "lucide-react";

interface HistoryTaskItem {
  id: string;
  code: string;
  category: "care" | "harvest" | "irrigation" | "pest";
  title: string;
  plotCode: string;
  completedAt: string;
  statusBadge: string;
  statusVariant: "success" | "warning";
  image: string;
  feedback?: {
    rating: number;
    customerName: string;
    comment: string;
  };
  deliveryInfo?: {
    courier: string;
    tempText: string;
  };
  sensorOutcome?: {
    label: string;
    percent: number;
    statusText: string;
  };
  protectionInfo?: string;
}

const HISTORY_TASKS: HistoryTaskItem[] = [];

export function FarmerHistoryPage() {
  const navigate = useNavigate();

  // State
  const [selectedMonth, setSelectedMonth] = React.useState<string>("10/2026");
  const [activeFilter, setActiveFilter] = React.useState<"ALL" | "care" | "harvest" | "feedback">("ALL");

  const careCount = HISTORY_TASKS.filter((t) => t.category === "care").length;
  const harvestCount = HISTORY_TASKS.filter((t) => t.category === "harvest").length;
  const feedbackCount = HISTORY_TASKS.filter((t) => Boolean(t.feedback)).length;

  const filteredTasks = HISTORY_TASKS.filter((task) => {
    if (activeFilter === "care") return task.category === "care";
    if (activeFilter === "harvest") return task.category === "harvest";
    if (activeFilter === "feedback") return Boolean(task.feedback);
    return true;
  });

  return (
    <Box className="w-full space-y-6 pb-12">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & MONTH PICKER
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-0 overflow-hidden border-border shadow-xs">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-emerald-50/40 via-background to-background dark:from-emerald-950/20">
          <Box className="flex items-center gap-3.5">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => navigate("/farmer")}
              className="rounded-full h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Box>
              <Box className="flex items-center gap-2">
                <CardTitle className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                  Lịch sử công việc
                </CardTitle>
                <Badge variant="success" className="font-bold text-xs">
                  Đối soát tháng
                </Badge>
              </Box>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Báo cáo tổng hợp các phiếu chăm sóc, đơn thu hoạch và đánh giá phản hồi từ khách hàng
              </CardDescription>
            </Box>
          </Box>

          <Box className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-emerald-600" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="h-10 px-3.5 rounded-2xl bg-muted/40 border border-border text-xs sm:text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            >
              <option value="10/2026">Tháng 10/2026</option>
              <option value="09/2026">Tháng 09/2026</option>
              <option value="08/2026">Tháng 08/2026</option>
            </select>
          </Box>
        </CardHeader>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          2. KPI METRICS CARDS (3 Cards)
      ───────────────────────────────────────────────────────────── */}
      <Box className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 rounded-3xl border-border shadow-xs bg-card flex items-center gap-4">
          <Box className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-6 w-6" />
          </Box>
          <Box>
            <Text as="h3" className="text-xl sm:text-2xl font-extrabold text-foreground">
              {HISTORY_TASKS.length} việc đã làm
            </Text>
            <Text variant="muted" className="text-xs font-semibold text-emerald-600">
              {HISTORY_TASKS.length > 0 ? "Hoàn thành 100% chỉ tiêu" : "Chưa có tác vụ hoàn tất"}
            </Text>
          </Box>
        </Card>

        <Card className="p-5 rounded-3xl border-border shadow-xs bg-card flex items-center gap-4">
          <Box className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-700 flex items-center justify-center shrink-0">
            <Camera className="h-6 w-6" />
          </Box>
          <Box>
            <Text as="h3" className="text-xl sm:text-2xl font-extrabold text-foreground">
              {HISTORY_TASKS.length > 0 ? "100% có ảnh" : "0% có ảnh"}
            </Text>
            <Text variant="muted" className="text-xs font-semibold text-blue-600">
              {HISTORY_TASKS.length > 0 ? "Đã đối soát minh chứng" : "Chưa có dữ liệu đối soát"}
            </Text>
          </Box>
        </Card>

        <Card className="p-5 rounded-3xl border-border shadow-xs bg-card flex items-center gap-4">
          <Box className="h-12 w-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0">
            <Star className="h-6 w-6 fill-amber-500 text-amber-500" />
          </Box>
          <Box>
            <Text as="h3" className="text-xl sm:text-2xl font-extrabold text-foreground">
              Đánh giá {HISTORY_TASKS.length > 0 ? "4.9 ⭐" : "0.0 ⭐"}
            </Text>
            <Text variant="muted" className="text-xs font-semibold text-amber-600">
              {feedbackCount > 0 ? `Từ ${feedbackCount} khách hàng chấm` : "Chưa có đánh giá"}
            </Text>
          </Box>
        </Card>
      </Box>

      {/* ─────────────────────────────────────────────────────────────
          3. CATEGORY FILTER TABS
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-3.5 border-border shadow-xs rounded-2xl">
        <Box className="flex flex-wrap items-center gap-2">
          <Text variant="muted" className="text-xs font-medium flex items-center gap-1 mr-1">
            <Filter className="h-3 w-3" /> Lọc danh mục:
          </Text>

          <Button
            type="button"
            variant={activeFilter === "ALL" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("ALL")}
            className="rounded-full text-xs font-bold h-8"
          >
            Tất cả ({HISTORY_TASKS.length})
          </Button>

          <Button
            type="button"
            variant={activeFilter === "care" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("care")}
            className="rounded-full text-xs font-bold h-8"
          >
            Chăm sóc ({careCount})
          </Button>

          <Button
            type="button"
            variant={activeFilter === "harvest" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("harvest")}
            className="rounded-full text-xs font-bold h-8"
          >
            Thu hoạch ({harvestCount})
          </Button>

          <Button
            type="button"
            variant={activeFilter === "feedback" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter("feedback")}
            className="rounded-full text-xs font-bold h-8"
          >
            Có phản hồi ({feedbackCount})
          </Button>
        </Box>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          4. WORK HISTORY CARDS LIST
      ───────────────────────────────────────────────────────────── */}
      <Box className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card className="p-12 text-center border-dashed border-2 border-border shadow-none space-y-4">
            <Box className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 mx-auto">
              <FileText className="h-8 w-8" />
            </Box>
            <Box className="space-y-1">
              <CardTitle className="text-lg font-bold text-foreground">
                Chưa có lịch sử công việc trong tháng này
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                Các công việc chăm sóc, thu hoạch sau khi hoàn tất và nghiệm thu thực địa sẽ được lưu trữ và đối soát tại đây.
              </CardDescription>
            </Box>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card
              key={task.id}
              className="p-5 sm:p-6 rounded-3xl border-border shadow-xs hover:shadow-md transition-all space-y-4 bg-card"
            >
              {/* Top row: Icon, Title, Status badge */}
              <Box className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                <Box className="flex items-center gap-2.5">
                  {task.category === "harvest" ? (
                    <Box className="h-8 w-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                      <Truck className="h-4 w-4" />
                    </Box>
                  ) : (
                    <Box className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Sprout className="h-4 w-4" />
                    </Box>
                  )}

                  <Box>
                    <CardTitle className="text-sm sm:text-base font-bold text-foreground">
                      {task.code}
                    </CardTitle>
                    <CardDescription className="text-xs flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" /> {task.plotCode}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" /> {task.completedAt}
                      </span>
                    </CardDescription>
                  </Box>
                </Box>

                <Badge
                  variant={task.statusVariant}
                  className={`font-bold text-xs self-start sm:self-auto ${
                    task.statusVariant === "warning" ? "bg-orange-100 text-orange-800 border-orange-200" : ""
                  }`}
                >
                  {task.statusBadge}
                </Badge>
              </Box>

              {/* Sub-card: Detailed Proof & Feedback */}
              <Box className="flex flex-col md:flex-row items-start md:items-center gap-4 p-3.5 rounded-2xl bg-muted/30 border border-border">
                {/* Proof thumbnail */}
                <Box className="relative h-20 w-24 rounded-xl overflow-hidden bg-black shrink-0 border border-border">
                  <img
                    src={task.image}
                    alt={task.title}
                    className="h-full w-full object-cover"
                  />
                </Box>

                {/* Contextual content based on task type */}
                <Box className="flex-1 space-y-1.5">
                  {/* 1. Customer Feedback Review */}
                  {task.feedback && (
                    <Box className="space-y-1">
                      <Box className="flex items-center gap-2">
                        <Badge variant="warning" className="text-[10px] font-bold gap-1 px-2 py-0.5">
                          <Star className="h-3 w-3 fill-current" /> {task.feedback.rating.toFixed(1)}
                        </Badge>
                        <Text as="span" className="text-xs font-bold text-foreground">
                          {task.feedback.customerName}
                        </Text>
                      </Box>
                      <Text as="p" className="text-xs text-foreground/90 italic">
                        "{task.feedback.comment}"
                      </Text>
                    </Box>
                  )}

                  {/* 2. Cold Chain Courier Info */}
                  {task.deliveryInfo && (
                    <Box className="space-y-1">
                      <Text as="p" className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>{task.deliveryInfo.courier}</span>
                      </Text>
                      <Text variant="muted" className="text-xs">
                        {task.deliveryInfo.tempText}
                      </Text>
                    </Box>
                  )}

                  {/* 3. Irrigation Sensor Outcome */}
                  {task.sensorOutcome && (
                    <Box className="space-y-1.5">
                      <Box className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-foreground flex items-center gap-1">
                          <Droplets className="h-3.5 w-3.5 text-cyan-600" />
                          {task.sensorOutcome.label}:
                        </span>
                        <strong className="text-emerald-700 font-bold">
                          {task.sensorOutcome.percent}% ({task.sensorOutcome.statusText})
                        </strong>
                      </Box>
                      <Box className="w-full h-2 rounded-full bg-muted overflow-hidden">
                        <Box
                          className="h-full bg-emerald-600 rounded-full"
                          style={{ width: `${task.sensorOutcome.percent}%` }}
                        />
                      </Box>
                    </Box>
                  )}

                  {/* 4. Biosecurity Protection */}
                  {task.protectionInfo && (
                    <Text as="p" className="text-xs text-foreground/90 flex items-start gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{task.protectionInfo}</span>
                    </Text>
                  )}
                </Box>
              </Box>
            </Card>
          ))
        )}
      </Box>

      {/* ─────────────────────────────────────────────────────────────
          5. COMPLETION ACHIEVEMENT BANNER
      ───────────────────────────────────────────────────────────── */}
      {HISTORY_TASKS.length > 0 && (
        <Card className="p-5 rounded-3xl border-emerald-200 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 dark:from-emerald-950/40 dark:to-teal-950/20 shadow-xs">
          <CardContent className="p-0 flex items-center gap-4 text-emerald-950 dark:text-emerald-200">
            <Box className="h-12 w-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="h-6 w-6" />
            </Box>
            <Box>
              <CardTitle className="text-sm sm:text-base font-extrabold">
                Nghiệm thu trọn vẹn
              </CardTitle>
              <CardDescription className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5">
                Bạn đã hoàn tất 100% minh chứng thực địa tháng {selectedMonth}. Hồ sơ năng suất lao động đã được gửi đến ban quản lý nông trại.
              </CardDescription>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
