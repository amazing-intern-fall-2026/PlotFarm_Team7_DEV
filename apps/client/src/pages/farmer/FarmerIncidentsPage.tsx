import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Badge,
  Box,
  Text,
} from "@/shared/ui";
import {
  ArrowLeft,
  Bug,
  Droplets,
  Thermometer,
  Waves,
  Camera,
  Send,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  X,
} from "lucide-react";

interface IncidentTypeOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const INCIDENT_TYPES: IncidentTypeOption[] = [
  {
    id: "pest_fungus",
    label: "Phát hiện sâu bệnh / Nấm lá",
    icon: Bug,
  },
  {
    id: "irrigation_clog",
    label: "Hệ thống tưới bị nghẽn",
    icon: Droplets,
  },
  {
    id: "sensor_error",
    label: "Cảm biến báo sai số",
    icon: Thermometer,
  },
  {
    id: "soil_waterlogged",
    label: "Đất ngập úng rễ",
    icon: Waves,
  },
];

const PLOTS_LIST: { id: string; label: string }[] = [];

export function FarmerIncidentsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // States
  const [selectedPlot, setSelectedPlot] = React.useState<string>(id || "");
  const [selectedType, setSelectedType] = React.useState<string>("pest_fungus");
  const [evidencePhoto, setEvidencePhoto] = React.useState<string | null>(null);
  const [selectedProposals, setSelectedProposals] = React.useState<string[]>([]);
  const [customNotes, setCustomNotes] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState<boolean>(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const QUICK_PROPOSALS = [
    "Phun sinh học tỏi ớt",
    "Tạm ngừng tưới nhỏ giọt 24h",
    "Cắt tỉa lá bệnh",
    "Kiểm tra van áp suất luống",
  ];

  const toggleProposal = (prop: string) => {
    setSelectedProposals((prev) =>
      prev.includes(prop) ? prev.filter((p) => p !== prop) : [...prev, prop]
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setEvidencePhoto(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
    }, 600);
  };

  return (
    <Box className="w-full max-w-3xl mx-auto space-y-6 pb-12">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-0 overflow-hidden border-border shadow-xs">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-orange-50/40 via-background to-background dark:from-orange-950/20">
          <Box className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => navigate("/farmer/plots")}
              className="rounded-full h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Box>
              <Box className="flex items-center gap-2">
                <CardTitle className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                  Báo cáo sự cố ô đất
                </CardTitle>
                <Badge variant="warning" className="text-xs font-bold bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200 border-orange-200">
                  Ưu tiên cao
                </Badge>
              </Box>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Kênh gửi cảnh báo khẩn cấp trực tiếp đến Kỹ sư trưởng & Quản trị viên hệ thống
              </CardDescription>
            </Box>
          </Box>

          <Badge variant="secondary" className="font-mono text-xs py-1 px-3">
            Trạng thái: Cần hỗ trợ
          </Badge>
        </CardHeader>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN REPORT FORM
      ───────────────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-5 sm:p-7 shadow-xs border-border space-y-6">
          {/* SECTION 1: Select Plot Location */}
          <Box className="space-y-2">
            <Text as="label" className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-emerald-600" />
              <span>Vị trí ô đất canh tác <Text as="span" className="text-destructive">*</Text></span>
            </Text>

            <select
              value={selectedPlot}
              onChange={(e) => setSelectedPlot(e.target.value)}
              className="w-full h-11 px-3.5 rounded-2xl bg-muted/40 border border-border text-xs sm:text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            >
              {PLOTS_LIST.length === 0 ? (
                <option value="">-- Chưa có ô đất nào được phân công --</option>
              ) : (
                PLOTS_LIST.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))
              )}
            </select>
          </Box>

          {/* SECTION 2: 4 Incident Type Options */}
          <Box className="space-y-2.5">
            <Text as="label" className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>Phân loại sự cố chính <Text as="span" className="text-destructive">*</Text></span>
            </Text>

            <Box className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INCIDENT_TYPES.map((type) => {
                const isSelected = selectedType === type.id;
                const Icon = type.icon;

                return (
                  <Card
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border flex items-center gap-3.5 text-left ${
                      isSelected
                        ? "border-orange-500 bg-orange-50/50 dark:bg-orange-950/30 ring-2 ring-orange-500/40 shadow-xs"
                        : "border-border hover:border-orange-300 hover:bg-muted/30 shadow-none"
                    }`}
                  >
                    <Box
                      className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-orange-500 text-white shadow-xs"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </Box>

                    <Text as="span" className={`text-xs sm:text-sm font-bold ${
                      isSelected ? "text-orange-950 dark:text-orange-200" : "text-foreground"
                    }`}>
                      {type.label}
                    </Text>
                  </Card>
                );
              })}
            </Box>
          </Box>

          {/* SECTION 3: Photo Evidence Dropzone */}
          <Box className="space-y-2.5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />

            <Box className="flex items-center justify-between">
              <Text as="label" className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <Camera className="h-4 w-4 text-emerald-600" />
                <span>Bằng chứng hình ảnh hiện trường</span>
              </Text>
              <Badge variant="secondary" className="text-[10px]">Khuyến khích có GPS</Badge>
            </Box>

            {evidencePhoto ? (
              <Box className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-border shadow-xs">
                <img
                  src={evidencePhoto}
                  alt="Bằng chứng sự cố"
                  className="h-full w-full object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => setEvidencePhoto(null)}
                  className="absolute top-3 right-3 h-8 w-8 rounded-full shadow-lg p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
                <Badge variant="secondary" className="absolute bottom-3 left-3 bg-black/70 text-white font-mono text-[10px] backdrop-blur-xs">
                  📍 GPS: 11.9404° N, 108.4583° E • Lô {selectedPlot}
                </Badge>
              </Box>
            ) : (
              <Card
                onClick={() => fileInputRef.current?.click()}
                className="p-8 border-2 border-dashed border-border hover:border-orange-400 bg-muted/20 rounded-3xl text-center cursor-pointer transition-all space-y-2 flex flex-col items-center justify-center"
              >
                <Box className="h-12 w-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center">
                  <Camera className="h-6 w-6" />
                </Box>
                <Text as="p" className="text-xs sm:text-sm font-bold text-foreground">
                  Chụp cận cảnh vết sâu bệnh hoặc linh kiện lỗi
                </Text>
                <Text variant="muted" className="text-[11px]">
                  Bấm vào đây để mở máy ảnh hoặc tải ảnh từ thư viện
                </Text>
              </Card>
            )}
          </Box>

          {/* SECTION 4: Quick Proposal Chips */}
          <Box className="space-y-2.5">
            <Text as="label" className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <span>Đề xuất phương án xử lý nhanh</span>
            </Text>

            <Box className="flex flex-wrap items-center gap-2">
              {QUICK_PROPOSALS.map((prop) => {
                const isSelected = selectedProposals.includes(prop);
                return (
                  <Button
                    key={prop}
                    type="button"
                    variant={isSelected ? "primary" : "outline"}
                    size="sm"
                    onClick={() => toggleProposal(prop)}
                    className={`rounded-xl text-xs font-semibold h-8 transition-all ${
                      isSelected
                        ? "bg-[#1b4332] text-white shadow-xs"
                        : "border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {isSelected ? `✓ ${prop}` : `+ ${prop}`}
                  </Button>
                );
              })}
            </Box>

            {/* Custom Notes */}
            <textarea
              rows={3}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="Ghi chú thêm mức độ lây lan, thời gian phát hiện, hoặc yêu cầu vật tư bổ sung..."
              className="w-full mt-2 p-3.5 rounded-2xl bg-muted/30 border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            />
          </Box>
        </Card>

        {/* ─────────────────────────────────────────────────────────────
            3. SUBMIT BUTTON
        ───────────────────────────────────────────────────────────── */}
        <Card className="p-4 sm:p-5 shadow-xs border-border flex flex-col-reverse sm:flex-row items-center justify-between gap-3 bg-muted/20">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/farmer/plots")}
            className="w-full sm:w-auto"
          >
            Hủy bỏ
          </Button>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold py-3 text-xs sm:text-sm min-w-[220px]"
            leftIcon={<Send className="h-4 w-4" />}
          >
            Gửi cảnh báo đến Quản trị viên
          </Button>
        </Card>
      </form>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: SUCCESS DISPATCH
      ───────────────────────────────────────────────────────────── */}
      {isSuccessModalOpen && (
        <Box className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <Card className="w-full max-w-md p-6 text-center shadow-2xl border border-border space-y-4 rounded-3xl">
            <Box className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950 text-orange-600 mx-auto">
              <CheckCircle2 className="h-9 w-9" />
            </Box>

            <CardTitle className="text-lg font-bold text-foreground">
              Đã gửi cảnh báo sự cố thành công!
            </CardTitle>

            <CardDescription className="text-xs text-muted-foreground leading-relaxed">
              Thông báo sự cố tại <strong>Ô đất {selectedPlot}</strong> đã được gửi đến Kỹ sư trưởng và nhóm trực kỹ thuật. Đội kỹ thuật sẽ phản hồi phương án trong vòng 30 phút.
            </CardDescription>

            <Button
              type="button"
              variant="primary"
              onClick={() => navigate("/farmer/plots")}
              className="w-full"
            >
              Về danh sách ô đất
            </Button>
          </Card>
        </Box>
      )}
    </Box>
  );
}
