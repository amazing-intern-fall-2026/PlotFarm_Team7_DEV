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
  Minus,
  Plus,
  Camera,
  Printer,
  Truck,
  CheckCircle2,
  QrCode,
  Clock,
  ShieldCheck,
  X,
} from "lucide-react";

export function FarmerHarvestPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [weightKg, setWeightKg] = React.useState<number>(18.5);
  const [isMaintenanceChecked, setIsMaintenanceChecked] = React.useState<boolean>(true);
  const [boxPhoto, setBoxPhoto] = React.useState<string>("/images/review_produce.jpg");
  const [isPrintModalOpen, setIsPrintModalOpen] = React.useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Stepper handlers
  const handleDecrease = () => {
    setWeightKg((prev) => Math.max(1.0, parseFloat((prev - 0.5).toFixed(1))));
  };

  const handleIncrease = () => {
    setWeightKg((prev) => parseFloat((prev + 0.5).toFixed(1)));
  };

  const isStandardWeight = weightKg >= 16.0 && weightKg <= 20.0;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCompleteDispatch = () => {
    setIsSuccessModalOpen(true);
  };

  return (
    <Box className="w-full space-y-6 pb-12">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP NAVIGATION & HEADER
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-0 overflow-hidden border-border shadow-xs">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-emerald-50/40 via-background to-background dark:from-emerald-950/20">
          <Box className="flex items-center gap-3.5">
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
                  Thu hoạch & Xuất kho
                </CardTitle>
                <Badge variant="success" className="font-bold text-xs">
                  {id ? `Lô ${id}` : "Hàng đợi xuất kho"}
                </Badge>
              </Box>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Quy trình cân sản lượng thực tế, đóng gói niêm phong và in phiếu vận chuyển AgriExpress
              </CardDescription>
            </Box>
          </Box>

          {id && (
            <Box className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs py-1 px-3">
                Lô: {id}
              </Badge>
              <Badge variant="warning" className="text-xs py-1 px-3 font-semibold">
                <Clock className="h-3 w-3 mr-1 inline" /> Đến hạn thu hoạch hôm nay
              </Badge>
            </Box>
          )}
        </CardHeader>
      </Card>

      {/* Toast message */}
      {toastMessage && (
        <Card className="rounded-2xl bg-foreground text-background px-5 py-3 text-sm font-semibold flex items-center justify-between shadow-xl animate-in fade-in">
          <Text as="span" className="text-xs font-medium">{toastMessage}</Text>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setToastMessage(null)}
            className="h-6 w-6 text-muted-foreground hover:text-background p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </Card>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CONTENT (2 COLUMNS ON DESKTOP OR EMPTY QUEUE)
      ───────────────────────────────────────────────────────────── */}
      {!id ? (
        <Card className="p-12 text-center border-dashed border-2 border-border shadow-none space-y-4">
          <Box className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-950/50 text-orange-600 mx-auto">
            <Truck className="h-8 w-8" />
          </Box>
          <Box className="space-y-1">
            <CardTitle className="text-lg font-bold text-foreground">
              Chưa có ô đất nào đến hạn thu hoạch
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              Hiện tại không có lô đất nào trong hàng đợi xuất kho. Khi có ô đất hoàn thành vụ mùa sinh trưởng 100%, bạn có thể tạo lệnh thu hoạch và in phiếu giao hàng tại đây.
            </CardDescription>
          </Box>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/farmer/plots")}
            className="rounded-xl text-xs font-semibold"
          >
            Quay lại Quản lý ô đất
          </Button>
        </Card>
      ) : (
        <Box className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Plot Info, Weighing Stepper, Packaging */}
        <Box className="lg:col-span-7 space-y-6">
          {/* Card: Plot Overview Banner */}
          <Card className="p-5 border-border shadow-xs space-y-2">
            <Box className="flex items-center justify-between">
              <Box className="flex items-center gap-2.5">
                <Box className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <CardTitle className="text-base sm:text-lg font-bold text-foreground">
                  Ô đất {id} (60/60 ngày)
                </CardTitle>
              </Box>
              <Badge variant="success" className="font-bold text-[11px]">
                <ShieldCheck className="h-3 w-3 mr-1 inline" /> Đã kiểm định VietGAP
              </Badge>
            </Box>
            <CardDescription className="text-xs text-muted-foreground flex flex-wrap items-center gap-2">
              <Text as="span" className="font-bold text-emerald-700 dark:text-emerald-400">
                Giống: Cải cầu vồng Thụy Sĩ
              </Text>
              <Text as="span">•</Text>
              <Text as="span">
                Khách hàng: <strong className="text-foreground">Chị Thu Hà</strong> (HĐ #CF-8921)
              </Text>
            </CardDescription>
          </Card>

          {/* Card: Weight Input with Stepper */}
          <Card className="p-5 sm:p-6 border-border shadow-xs space-y-5">
            <CardHeader className="p-0 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-foreground">
                Sản lượng thực tế (kg)
              </CardTitle>
              <Badge variant={isStandardWeight ? "success" : "warning"} className="font-bold text-xs">
                {isStandardWeight ? "✓ Đạt chuẩn (16–20 kg)" : "Ngoài dải chuẩn (16–20 kg)"}
              </Badge>
            </CardHeader>

            <CardContent className="p-0 space-y-5">
              {/* Stepper Display */}
              <Box className="flex items-center justify-center gap-4 sm:gap-6 p-4 rounded-3xl bg-muted/30 border border-border">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleDecrease}
                  className="h-12 w-12 rounded-2xl bg-background border-border hover:bg-muted text-foreground text-lg font-bold shadow-xs active:scale-95"
                >
                  <Minus className="h-5 w-5" />
                </Button>

                <Box className="text-center min-w-[150px]">
                  <Box className="flex items-baseline justify-center gap-2">
                    <Text as="span" className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-foreground">
                      {weightKg.toFixed(1)}
                    </Text>
                    <Text as="span" className="text-lg font-bold text-muted-foreground">
                      kg
                    </Text>
                  </Box>
                  <Text variant="muted" className="text-[11px] mt-0.5">
                    Cân điện tử bàn số 02 • Sai số ±0.05kg
                  </Text>
                </Box>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleIncrease}
                  className="h-12 w-12 rounded-2xl bg-background border-border hover:bg-muted text-foreground text-lg font-bold shadow-xs active:scale-95"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </Box>

              {/* Packaging Eco-box Item */}
              <Card className="p-4 rounded-2xl bg-card border-border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-none">
                <Box className="flex items-center gap-3.5 w-full sm:w-auto">
                  <Box className="relative h-16 w-16 rounded-2xl overflow-hidden bg-black shrink-0 border border-border">
                    <img
                      src={boxPhoto}
                      alt="Thùng Eco-box"
                      className="h-full w-full object-cover"
                    />
                    <Badge variant="secondary" className="absolute bottom-1 right-1 bg-black/70 text-white font-mono text-[9px] px-1 py-0.5">
                      #8842
                    </Badge>
                  </Box>

                  <Box>
                    <CardTitle className="text-sm font-bold text-foreground">
                      Thùng Eco-box #8842
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground mt-0.5">
                      Đã niêm phong tem nhiệt • Đạt chuẩn đóng gói
                    </CardDescription>
                  </Box>
                </Box>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setBoxPhoto(
                      boxPhoto === "/images/review_produce.jpg"
                        ? "/images/rainbow_chard.jpg"
                        : "/images/review_produce.jpg"
                    );
                    showToast("Đã cập nhật ảnh chụp thùng niêm phong mới!");
                  }}
                  leftIcon={<Camera className="h-3.5 w-3.5 text-emerald-600" />}
                  className="text-xs font-bold shrink-0 w-full sm:w-auto"
                >
                  Đổi ảnh
                </Button>
              </Card>

              {/* Maintenance Checkbox */}
              <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/20 border border-border cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isMaintenanceChecked}
                  onChange={(e) => setIsMaintenanceChecked(e.target.checked)}
                  className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-border"
                />
                <Box>
                  <Text as="span" className="text-xs sm:text-sm font-bold text-foreground">
                    Chuyển ô đất sang Chờ làm đất (Maintenance)
                  </Text>
                  <Text variant="muted" className="text-[11px] block">
                    Sau khi thu hoạch, hệ thống sẽ kích hoạt lệnh xử lý đất hữu cơ và phơi ải 7 ngày.
                  </Text>
                </Box>
              </label>
            </CardContent>
          </Card>
        </Box>

        {/* RIGHT COLUMN: AgriExpress Shipping Label & Dispatch Action */}
        <Box className="lg:col-span-5 space-y-6">
          {/* Card: Shipping Waybill */}
          <Card className="p-5 sm:p-6 border-border shadow-md rounded-3xl space-y-5 bg-card">
            {/* Header: Courier brand & Cold Chain badge */}
            <Box className="flex items-center justify-between pb-3 border-b border-border">
              <Box className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-emerald-600" />
                <CardTitle className="text-base font-extrabold text-foreground tracking-tight">
                  AgriExpress
                </CardTitle>
              </Box>
              <Box className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono font-bold text-xs">
                  AGRI-VN-884291
                </Badge>
                <Badge variant="warning" className="text-[10px] font-bold">
                  Bảo quản mát 10–15°C
                </Badge>
              </Box>
            </Box>

            {/* Barcode Graphic & QR code representation */}
            <Box className="p-4 rounded-2xl bg-muted/40 border border-border flex items-center justify-between gap-4">
              <Box className="space-y-1.5 flex-1">
                {/* SVG Barcode lines simulation */}
                <Box className="flex items-center gap-1 h-12 w-full justify-between overflow-hidden">
                  {[3, 1, 4, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 4, 2, 1, 3, 2, 1, 4].map((w, idx) => (
                    <Box
                      key={idx}
                      className="bg-foreground h-full rounded-xs"
                      style={{ width: `${w * 2.5}px` }}
                    />
                  ))}
                </Box>
                <Text as="p" className="font-mono text-center text-xs tracking-widest text-muted-foreground font-bold">
                  8842 9104 2901
                </Text>
              </Box>

              <Box className="h-14 w-14 rounded-xl bg-background border border-border p-1.5 flex items-center justify-center shrink-0">
                <QrCode className="h-full w-full text-foreground" />
              </Box>
            </Box>

            {/* Logistics Address Info */}
            <Box className="space-y-3 text-xs text-muted-foreground divide-y divide-border">
              <Box className="pt-2">
                <Text variant="muted" className="text-[11px] block">Đơn vị gửi:</Text>
                <Text as="p" className="font-semibold text-foreground mt-0.5">
                  CloudFarm Vườn 1, Phường 3, TP. Đà Lạt, Lâm Đồng
                </Text>
              </Box>

              <Box className="pt-3">
                <Text variant="muted" className="text-[11px] block">Người nhận:</Text>
                <Text as="p" className="font-semibold text-foreground mt-0.5">
                  Chị Thu Hà • 0918.xxx.421
                </Text>
                <Text as="p" className="text-muted-foreground text-[11px]">
                  Số 12 Quốc Hương, P. Thảo Điền, TP. Thủ Đức, TP.HCM
                </Text>
              </Box>

              <Box className="pt-3 flex items-center justify-between">
                <Text variant="muted">Nội dung hàng:</Text>
                <Text as="strong" className="font-bold text-foreground text-xs">
                  {weightKg.toFixed(1)} kg rau củ hữu cơ
                </Text>
              </Box>
            </Box>

            {/* Primary CTA Button: In phiếu A6 & Giao Shipper */}
            <CardFooter className="p-0 pt-2 flex flex-col gap-2">
              <Button
                type="button"
                variant="primary"
                onClick={handleCompleteDispatch}
                className="w-full bg-[#1b4332] hover:bg-[#143427] text-white py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <Printer className="h-4 w-4" />
                <span>In phiếu A6 & Giao Shipper</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPrintModalOpen(true)}
                className="w-full text-xs font-semibold"
              >
                Xem trước bản in A6
              </Button>
            </CardFooter>
          </Card>
        </Box>
      </Box>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: A6 PRINT PREVIEW
      ───────────────────────────────────────────────────────────── */}
      {isPrintModalOpen && (
        <Box className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <Card className="w-full max-w-lg p-6 rounded-3xl bg-background border border-border shadow-2xl space-y-4">
            <Box className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <Printer className="h-4 w-4 text-emerald-600" />
                <span>Xem trước bản in A6 nhiệt (105mm x 148mm)</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPrintModalOpen(false)}
                className="h-7 w-7 text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </Box>

            <Box className="p-4 rounded-2xl bg-white text-black font-mono text-xs border border-slate-300 space-y-3">
              <Box className="text-center border-b pb-2">
                <Text as="h3" className="font-extrabold text-sm text-black">
                  CLOUDFARM EXPRESS • LÔ #A-104
                </Text>
                <Text as="p" className="text-[10px] text-slate-600">
                  MÃ VẬN ĐƠN: AGRI-VN-884291
                </Text>
              </Box>

              <Box className="space-y-1 text-[11px]">
                <p><strong>NGƯỜI NHẬN:</strong> Chị Thu Hà (0918.342.421)</p>
                <p><strong>ĐỊA CHỈ:</strong> Thảo Điền, TP. Thủ Đức, TP.HCM</p>
                <p><strong>LOẠI HÀNG:</strong> Cải cầu vồng ({weightKg} kg)</p>
                <p><strong>BẢO QUẢN:</strong> Kho mát 10–15°C (Lalamove Cold)</p>
              </Box>

              <Box className="border-t pt-2 text-center text-[10px] text-slate-500">
                Tem niêm phong nhiệt Eco-box #8842 • Thu hoạch ngày hôm nay
              </Box>
            </Box>

            <Box className="grid grid-cols-2 gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPrintModalOpen(false)}
              >
                Đóng
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={() => {
                  setIsPrintModalOpen(false);
                  showToast("Lệnh in phiếu A6 đã được gửi đến máy in nhiệt Bluetooth!");
                }}
                leftIcon={<Printer className="h-4 w-4" />}
              >
                Gửi lệnh in
              </Button>
            </Box>
          </Card>
        </Box>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: SUCCESS DISPATCH (AC1)
      ───────────────────────────────────────────────────────────── */}
      {isSuccessModalOpen && (
        <Box className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <Card className="w-full max-w-md p-6 text-center shadow-2xl border border-border space-y-4 rounded-3xl">
            <Box className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto">
              <CheckCircle2 className="h-9 w-9" />
            </Box>

            <CardTitle className="text-lg font-bold text-foreground">
              Xuất kho & Giao Shipper thành công!
            </CardTitle>

            <CardDescription className="text-xs text-muted-foreground leading-relaxed">
              Thùng hàng Eco-box #8842 ({weightKg} kg) đã được cập nhật sang trạng thái <strong>ĐÃ BÀN GIAO SHIPPER</strong> (AgriExpress).
              {isMaintenanceChecked && (
                <span className="block mt-1 text-emerald-700 dark:text-emerald-300 font-semibold">
                  Ô đất {id} đã được chuyển sang chế độ "Chờ làm đất (Maintenance)".
                </span>
              )}
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
