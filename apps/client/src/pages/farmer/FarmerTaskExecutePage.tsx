import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
  Box,
  Text,
} from "@/shared/ui";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Camera,
  FileText,
  Droplets,
  Thermometer,
  ShieldCheck,
  Video,
  X,
} from "lucide-react";

export function FarmerTaskExecutePage() {
  const { id = "CARE-782" } = useParams();
  const navigate = useNavigate();

  // Step state
  const [currentStep, setCurrentStep] = React.useState<number>(2); // 1: Đã nhận, 2: Minh chứng, 3: Đóng phiếu

  // Form states
  const [proofImage, setProofImage] = React.useState<string>("");
  const [resultNote, setResultNote] = React.useState<string>("");
  const [isDosageChecked, setIsDosageChecked] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState<boolean>(false);
  const [isIncidentModalOpen, setIsIncidentModalOpen] = React.useState<boolean>(false);
  const [incidentText, setIncidentText] = React.useState<string>("");

  // Quick chips
  const [selectedChips, setSelectedChips] = React.useState<string[]>([]);

  const toggleChip = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const handleFinishTask = () => {
    if (!isDosageChecked) {
      alert("Vui lòng tích xác nhận liều lượng chuẩn trước khi đóng phiếu!");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(3);
      setIsSuccessModalOpen(true);
    }, 800);
  };

  const handleReportIncident = () => {
    if (!incidentText.trim()) {
      alert("Vui lòng nhập mô tả sự cố!");
      return;
    }
    alert(`Đã gửi báo cáo sự cố cho ô đất B-205 tới Giám sát viên ca trực!`);
    setIsIncidentModalOpen(false);
  };

  return (
    <Box className="w-full space-y-6 pb-12">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER WITH BREADCRUMB & COUNTDOWN
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-0 overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6">
          <Box className="flex items-center gap-3.5">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/farmer")}
              aria-label="Quay lại danh sách nhiệm vụ"
              className="h-10 w-10 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Box>
              <Box className="flex items-center gap-2.5">
                <CardTitle className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Phiếu chăm sóc #{id}
                </CardTitle>
                <Badge variant="success">Bón phân vi sinh</Badge>
              </Box>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Ô đất B-205 (15m²) • Luống 5 (Khu B) • KTV: Bác Bảy (Lê Hoàng Ân)
              </CardDescription>
            </Box>
          </Box>

          {/* Countdown Badge */}
          <Badge
            variant="warning"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold self-start sm:self-auto rounded-xl"
          >
            <Clock className="h-4 w-4 text-amber-600 animate-spin" />
            <Text as="span" className="text-xs font-bold text-amber-900 dark:text-amber-200">
              Hạn hoàn thành: Trước 09:30 (Còn 35 phút)
            </Text>
          </Badge>
        </CardHeader>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          2. STEPPER PROGRESS BAR (Horizontal Web Stepper)
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-4 sm:p-5">
        <Box className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
          {/* Step 1 */}
          <Box className="flex items-center gap-2 sm:gap-3 text-emerald-700 font-bold">
            <Box className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs shrink-0">
              ✓
            </Box>
            <Box>
              <Text as="p" className="font-bold text-xs sm:text-sm text-foreground">
                1. Đã tiếp nhận
              </Text>
              <Text variant="muted" className="text-[11px] hidden md:block">
                08:30 sáng nay
              </Text>
            </Box>
          </Box>

          {/* Step 2 */}
          <Box className="flex items-center gap-2 sm:gap-3 text-emerald-900 dark:text-emerald-300 font-bold">
            <Box className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-extrabold text-xs shrink-0 shadow-xs">
              2
            </Box>
            <Box>
              <Text as="p" className="font-bold text-xs sm:text-sm text-foreground">
                2. Minh chứng (Đang làm)
              </Text>
              <Text as="p" className="text-[11px] text-emerald-600 font-semibold hidden md:block">
                Tải ảnh & Ghi chú
              </Text>
            </Box>
          </Box>

          {/* Step 3 */}
          <Box
            className={`flex items-center gap-2 sm:gap-3 ${
              currentStep === 3 ? "text-emerald-700 font-bold" : "text-muted-foreground"
            }`}
          >
            <Box
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold shrink-0 ${
                currentStep === 3
                  ? "bg-emerald-600 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              3
            </Box>
            <Box>
              <Text as="p" className="font-bold text-xs sm:text-sm">
                3. Đóng phiếu & Đồng bộ
              </Text>
              <Text variant="muted" className="text-[11px] hidden md:block">
                Gửi SMS/Zalo cho khách
              </Text>
            </Box>
          </Box>
        </Box>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN 2-COLUMN DESKTOP WORKSPACE
      ───────────────────────────────────────────────────────────── */}
      <Box className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── LEFT COLUMN: PROOF OF WORK & FORM (7 COLS) ── */}
        <Box className="lg:col-span-7 space-y-6">
          {/* Card: Minh chứng hiện trường bắt buộc */}
          <Card className="p-0 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-5 pb-3">
              <Box>
                <CardTitle className="text-base sm:text-lg font-bold">
                  Minh chứng hiện trường bắt buộc
                </CardTitle>
                <CardDescription className="text-xs">
                  Ảnh chụp luống thực tế để gửi kèm vào nhật ký canh tác của khách
                </CardDescription>
              </Box>
              <Badge variant={proofImage ? "success" : "secondary"}>
                {proofImage ? "1/1 ảnh đã tải" : "Chưa tải ảnh"}
              </Badge>
            </CardHeader>

            <CardContent className="p-5 pt-0 space-y-4">
              {/* Proof Image Preview or Upload Dropzone */}
              {proofImage ? (
                <Box className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 border border-border group">
                  <img
                    src={proofImage}
                    alt="Minh chứng hiện trường"
                    className="w-full h-full object-cover"
                  />

                  {/* Top Watermark & Valid Status Badge */}
                  <Box className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <Badge variant="secondary" className="bg-black/60 text-white border border-white/20 backdrop-blur-md">
                      📍 Minh chứng thực địa
                    </Badge>
                    <Badge variant="success" className="bg-emerald-600 text-white font-bold shadow-xs">
                      ✓ Ảnh hợp lệ
                    </Badge>
                  </Box>

                  {/* Change photo button */}
                  <Box className="absolute bottom-3 right-3 flex items-center gap-2">
                    <label className="cursor-pointer rounded-xl bg-white/95 hover:bg-white text-slate-900 px-3.5 py-2 text-xs font-bold flex items-center gap-1.5 shadow-md transition-all">
                      <Camera className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Chụp lại góc khác / Đổi ảnh</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            const file = e.target.files[0];
                            setProofImage(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </label>
                  </Box>
                </Box>
              ) : (
                <label className="aspect-[16/10] w-full rounded-2xl border-2 border-dashed border-border bg-muted/20 hover:bg-muted/40 transition-colors flex flex-col items-center justify-center p-6 text-center space-y-2 cursor-pointer">
                  <Box className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
                    <Camera className="h-6 w-6" />
                  </Box>
                  <Text as="span" className="text-xs font-bold text-foreground">Bấm để chụp hoặc tải ảnh hiện trường</Text>
                  <Text variant="muted" className="text-[11px]">Hỗ trợ ảnh JPG, PNG chụp trực tiếp từ camera nông trại</Text>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        const file = e.target.files[0];
                        setProofImage(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
              )}

              {/* Result Note Field */}
              <Box className="space-y-2 pt-2">
                <Text variant="small" className="font-bold text-foreground uppercase tracking-wider block">
                  Ghi chú kết quả xử lý kỹ thuật
                </Text>
                <textarea
                  rows={3}
                  value={resultNote}
                  onChange={(e) => setResultNote(e.target.value)}
                  placeholder="Nhập chi tiết quá trình bón phân, tưới nước hoặc chăm sóc..."
                  className="w-full p-3.5 rounded-2xl bg-muted/40 border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground leading-relaxed"
                />
              </Box>

              {/* Quick Action Chips */}
              <Box className="space-y-1.5">
                <Text variant="muted" className="text-[11px] font-medium">Gắn thẻ nhanh vào nhật ký:</Text>
                <Box className="flex flex-wrap gap-2">
                  {[
                    "Tưới vi sinh",
                    "Cây bung lá khỏe",
                    "Đã xới thoáng đất",
                    "Đã diệt sâu sinh học",
                    "Nắng ấm",
                  ].map((chip) => {
                    const isSelected = selectedChips.includes(chip);
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => toggleChip(chip)}
                        className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-700 text-white shadow-2xs"
                            : "bg-muted text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {isSelected ? `✓ ${chip}` : `+ ${chip}`}
                      </button>
                    );
                  })}
                </Box>
              </Box>

              {/* Dosage Confirmation Checkbox */}
              <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isDosageChecked}
                  onChange={(e) => setIsDosageChecked(e.target.checked)}
                  className="h-4 w-4 mt-0.5 accent-emerald-700 rounded"
                />
                <Box className="text-xs text-emerald-950 dark:text-emerald-200">
                  <Text as="strong" className="font-bold block text-emerald-900 dark:text-emerald-100">
                    Xác nhận định lượng chuẩn VietGAP:
                  </Text>
                  Liều lượng: 200g phân trùn quế đã được cân và bón đúng bán kính quanh gốc theo chỉ dẫn của chuyên gia.
                </Box>
              </label>
            </CardContent>

            <CardFooter className="p-5 pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsIncidentModalOpen(true)}
                leftIcon={<AlertTriangle className="h-4 w-4 text-destructive" />}
                className="w-full text-destructive hover:bg-destructive/10 border-destructive/30"
              >
                Báo sự cố luống
              </Button>

              <Button
                type="button"
                variant="primary"
                onClick={handleFinishTask}
                isLoading={isSubmitting}
                leftIcon={<CheckCircle2 className="h-4 w-4" />}
                className="w-full"
              >
                Hoàn tất & Đóng phiếu
              </Button>
            </CardFooter>
          </Card>
        </Box>

        {/* ── RIGHT COLUMN: TASK DETAILS & BED TELEMETRY (5 COLS) ── */}
        <Box className="lg:col-span-5 space-y-6">
          {/* Task Info & Customer Instruction */}
          <Card className="p-0 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-5 pb-2">
              <Text variant="muted" className="text-xs font-bold uppercase tracking-wider">
                Chi tiết chỉ định kỹ thuật
              </Text>
              <Badge variant="outline">Gói sinh thái</Badge>
            </CardHeader>

            <CardContent className="p-5 pt-0 space-y-4">
              <Box className="space-y-1">
                <CardTitle className="text-lg font-extrabold text-foreground">
                  Bón phân hữu cơ vi sinh
                </CardTitle>
                <CardDescription className="text-xs">
                  Vị trí: <strong>Ô đất B-205 (15m²) • Luống 5</strong>
                </CardDescription>
                <CardDescription className="text-xs">
                  Chủ vườn: <strong>Anh Trần Quang</strong> (HĐ #CF-9023)
                </CardDescription>
              </Box>

              {/* Customer Special Note Box */}
              <Box className="rounded-2xl border-l-4 border-amber-500 bg-amber-50/80 dark:bg-amber-950/30 p-3.5 text-xs text-amber-950 dark:text-amber-200 space-y-1">
                <Box className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-100">
                  <FileText className="h-4 w-4 text-amber-600" />
                  <Text as="span" className="font-bold">Dặn dò từ khách:</Text>
                </Box>
                <Text className="text-xs text-amber-900 dark:text-amber-100 leading-relaxed">
                  Khách yêu cầu bón 200g phân trùn quế quanh rễ và xới nhẹ đất thoáng, không làm đứt rễ non.
                </Text>
              </Box>
            </CardContent>

            <CardFooter className="p-5 pt-2 border-t border-border">
              <Box className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <Text as="span" className="text-xs font-semibold">Lần chăm sóc miễn phí 2/2 trong tháng</Text>
              </Box>
            </CardFooter>
          </Card>

          {/* IoT Telemetry of Bed B-205 */}
          <Card className="p-0 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-5 pb-2">
              <CardTitle className="text-xs font-bold text-foreground uppercase tracking-wider">
                Chỉ số vi khí hậu luống 5 (Hiện thời)
              </CardTitle>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </CardHeader>

            <CardContent className="p-5 pt-0">
              <Box className="grid grid-cols-2 gap-3">
                <Box className="p-3 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900">
                  <Box className="flex items-center gap-1.5 text-xs text-cyan-800 dark:text-cyan-200 font-medium mb-1">
                    <Droplets className="h-3.5 w-3.5 text-cyan-600" />
                    <Text as="span" className="text-xs">Độ ẩm đất</Text>
                  </Box>
                  <Text as="p" className="text-lg font-extrabold text-foreground">58%</Text>
                  <Badge variant="warning" className="text-[10px] px-2 py-0">
                    Hơi khô (Cần tưới bù)
                  </Badge>
                </Box>

                <Box className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900">
                  <Box className="flex items-center gap-1.5 text-xs text-amber-800 dark:text-amber-200 font-medium mb-1">
                    <Thermometer className="h-3.5 w-3.5 text-amber-600" />
                    <Text as="span" className="text-xs">Nhiệt độ luống</Text>
                  </Box>
                  <Text as="p" className="text-lg font-extrabold text-foreground">24.0°C</Text>
                  <Badge variant="success" className="text-[10px] px-2 py-0">
                    Lý tưởng
                  </Badge>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Live Camera Feed of Bed */}
          <Card className="p-0 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <CardTitle className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Video className="h-3.5 w-3.5 text-emerald-600" /> Camera giám sát Luống 5
              </CardTitle>
              <Badge variant="outline" className="text-[10px]">Trực tiếp</Badge>
            </CardHeader>

            <CardContent className="p-4 pt-0">
              <Box className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-border">
                <img
                  src="/images/greenhouse_camera_live.jpg"
                  alt="Camera Luống 5"
                  className="w-full h-full object-cover"
                />
                <Badge variant="secondary" className="absolute top-2 left-2 bg-black/60 text-white text-[10px]">
                  Cam góc 01 • Luống 5
                </Badge>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: SUCCESS REPORT & CLOSE
      ───────────────────────────────────────────────────────────── */}
      {isSuccessModalOpen && (
        <Box className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <Card className="w-full max-w-md p-6 text-center shadow-2xl border border-border space-y-4">
            <Box className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mx-auto">
              <CheckCircle2 className="h-9 w-9" />
            </Box>

            <CardTitle className="text-lg font-bold text-foreground">
              Hoàn tất phiếu chăm sóc #{id}!
            </CardTitle>

            <CardDescription className="text-xs text-muted-foreground leading-relaxed">
              Minh chứng hiện trường đã được đồng bộ an toàn lên Cloudinary. Hệ thống vừa gửi thông báo xác nhận kèm ảnh tới Zalo/SMS của khách hàng <strong>Anh Trần Quang</strong>.
            </CardDescription>

            <Button
              type="button"
              variant="primary"
              onClick={() => navigate("/farmer")}
              className="w-full"
            >
              Về danh sách nhiệm vụ hôm nay
            </Button>
          </Card>
        </Box>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: REPORT INCIDENT
      ───────────────────────────────────────────────────────────── */}
      {isIncidentModalOpen && (
        <Box className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <Card className="w-full max-w-md p-6 shadow-2xl border border-border space-y-4">
            <Box className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-destructive flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Báo cáo sự cố tại Ô đất B-205</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsIncidentModalOpen(false)}
                className="h-8 w-8 text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </Box>

            <CardDescription className="text-xs">
              Mô tả tình trạng bất thường (sâu bọ, rệp, rò rỉ ống nhỏ giọt, v.v.) để Kỹ sư trưởng hỗ trợ xử lý.
            </CardDescription>

            <textarea
              rows={4}
              value={incidentText}
              onChange={(e) => setIncidentText(e.target.value)}
              placeholder="Nhập mô tả sự cố thực tế..."
              className="w-full p-3 rounded-2xl bg-muted/40 border border-border text-xs focus:outline-none focus:ring-2 focus:ring-destructive/40 text-foreground"
            />

            <Box className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsIncidentModalOpen(false)}
              >
                Hủy
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleReportIncident}
              >
                Gửi cảnh báo
              </Button>
            </Box>
          </Card>
        </Box>
      )}
    </Box>
  );
}
