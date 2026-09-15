import * as React from "react";
import {
  Clock,
  ShieldCheck,
  Zap,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Tv,
  Users,
} from "lucide-react";
import {
  Box,
  Flex,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Heading,
  Text,
  Badge,
  Button,
  Separator,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import {
  PLOT_DETAIL_TEXTS,
  type CropOption,
} from "./plot-detail.constants";

export interface PlotBookingSummaryProps {
  basePrice: number;
  selectedCrop: CropOption;
  plotCode: string;
  areaSqm?: number;
  onCheckout: () => void;
  className?: string;
}

export const PlotBookingSummary: React.FC<PlotBookingSummaryProps> = ({
  basePrice,
  selectedCrop,
  plotCode,
  areaSqm = 20,
  onCheckout,
  className,
}) => {
  const [timeLeft, setTimeLeft] = React.useState<number>(599);
  const [isMobileReceiptOpen, setIsMobileReceiptOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 599));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const totalPrice = basePrice + selectedCrop.seedPrice;

  return (
    <>
      <Card
        className={cn(
          "hidden lg:block sticky top-6 border border-emerald-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-emerald-950/5 rounded-2xl overflow-hidden",
          className,
        )}
      >
        <Box className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/40 px-5 py-3">
          <Flex justify="between" align="center">
            <Flex align="center" gap={2}>
              <Clock className="w-4 h-4 text-amber-700 dark:text-amber-400 animate-pulse" />
              <Text variant="caption" className="text-amber-900 dark:text-amber-200 font-medium text-xs">
                {PLOT_DETAIL_TEXTS.reservationBadge}
              </Text>
            </Flex>
            <Badge
              variant="outline"
              className="bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-200 border-amber-300 font-mono font-bold text-xs px-2.5 py-0.5"
            >
              {formattedTime}
            </Badge>
          </Flex>
          <Text variant="caption" className="text-[11px] text-amber-700 dark:text-amber-400 mt-1 block">
            {PLOT_DETAIL_TEXTS.reservationExpiredWarning}
          </Text>
        </Box>

        <CardHeader className="p-5 pb-3">
          <Flex justify="between" align="center">
            <Heading level={3} className="text-base font-bold text-slate-900 dark:text-white">
              Hóa đơn chi phí vụ mùa
            </Heading>
            <Badge variant="secondary" className="text-xs font-semibold">
              Ô #{plotCode}
            </Badge>
          </Flex>
          <Text variant="muted" className="text-xs">
            Chu kỳ canh tác trọn gói 60 ngày khép kín
          </Text>
        </CardHeader>

        <CardContent className="p-5 pt-0 space-y-4">
          <Separator />

          <Flex justify="between" align="start" className="text-xs">
            <Box className="pr-2">
              <Text variant="body2" className="font-semibold text-slate-800 dark:text-slate-200">
                Phí thuê đất chuẩn ({areaSqm}m²)
              </Text>
              <Text variant="caption" className="text-slate-500 block mt-0.5">
                Điện nước, cải tạo vi sinh, trùn quế
              </Text>
            </Box>
            <Text variant="body2" className="font-bold text-slate-900 dark:text-white shrink-0">
              {basePrice.toLocaleString("vi-VN")} đ
            </Text>
          </Flex>

          <Flex justify="between" align="start" className="text-xs">
            <Box className="pr-2">
              <Text variant="body2" className="font-semibold text-slate-800 dark:text-slate-200">
                Hạt giống F1: {selectedCrop.name}
              </Text>
              <Text variant="caption" className="text-slate-500 block mt-0.5">
                Hạt F1 ngoại nhập kháng sâu bệnh + dinh dưỡng
              </Text>
            </Box>
            <Text variant="body2" className="font-bold text-slate-900 dark:text-white shrink-0">
              +{selectedCrop.seedPrice.toLocaleString("vi-VN")} đ
            </Text>
          </Flex>

          {/* Line item 3: Chăm sóc chuyên gia */}
          <Flex justify="between" align="start" className="text-xs">
            <Box className="pr-2">
              <Flex align="center" gap={1.5}>
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <Text variant="body2" className="font-medium text-slate-700 dark:text-slate-300">
                  Kỹ sư chăm sóc định kỳ (2 lần/tháng)
                </Text>
              </Flex>
              <Text variant="caption" className="text-slate-400 line-through ml-5 mt-0.5 block">
                {PLOT_DETAIL_TEXTS.expertCareOriginalPrice.toLocaleString("vi-VN")} đ
              </Text>
            </Box>
            <Badge variant="success" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
              {PLOT_DETAIL_TEXTS.serviceFreeTag}
            </Badge>
          </Flex>

          <Flex justify="between" align="start" className="text-xs">
            <Box className="pr-2">
              <Flex align="center" gap={1.5}>
                <Tv className="w-3.5 h-3.5 text-emerald-600" />
                <Text variant="body2" className="font-medium text-slate-700 dark:text-slate-300">
                  Camera 1080P & Cảm biến IoT 24/7
                </Text>
              </Flex>
              <Text variant="caption" className="text-slate-400 line-through ml-5 mt-0.5 block">
                {PLOT_DETAIL_TEXTS.cameraIotOriginalPrice.toLocaleString("vi-VN")} đ
              </Text>
            </Box>
            <Badge variant="success" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
              {PLOT_DETAIL_TEXTS.serviceFreeTag}
            </Badge>
          </Flex>

          <Separator />

          <Box className="bg-emerald-50/70 dark:bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
            <Flex justify="between" align="baseline">
              <Box>
                <Text variant="caption" className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
                  Tổng chi phí vụ mùa
                </Text>
                <Text variant="caption" className="text-[11px] text-emerald-700 dark:text-emerald-400 block mt-0.5">
                  Đã bao gồm thuế & cam kết bảo hiểm
                </Text>
              </Box>
              <Text variant="h3" className="text-xl sm:text-2xl font-black text-emerald-800 dark:text-emerald-400">
                {totalPrice.toLocaleString("vi-VN")} đ
              </Text>
            </Flex>
          </Box>

          <Flex align="start" gap={2} className="text-slate-600 dark:text-slate-400 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
            <Text variant="caption" className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal font-medium">
              {PLOT_DETAIL_TEXTS.guaranteeText}
            </Text>
          </Flex>
        </CardContent>

        <CardFooter className="p-5 pt-0">
          <Button
            size="lg"
            onClick={onCheckout}
            className="w-full py-6 text-sm sm:text-base font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-lg shadow-emerald-700/20 hover:shadow-emerald-700/30 transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            {PLOT_DETAIL_TEXTS.ctaButtonText}
          </Button>
        </CardFooter>
      </Card>

      <Box className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 py-3 shadow-2xl">
        <Flex justify="between" align="center" gap={3}>
          <Box className="min-w-0">
            <Flex align="center" gap={1.5}>
              <Text variant="caption" className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                Tổng cộng
              </Text>
              <Box
                role="button"
                tabIndex={0}
                onClick={() => setIsMobileReceiptOpen((prev) => !prev)}
                className="cursor-pointer text-slate-500 hover:text-emerald-700 flex items-center"
              >
                {isMobileReceiptOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-4 h-4" />
                )}
              </Box>
            </Flex>
            <Text variant="h4" className="text-lg font-black text-emerald-700 dark:text-emerald-400 leading-tight">
              {totalPrice.toLocaleString("vi-VN")} đ
            </Text>
            <Text variant="caption" className="text-[10px] text-slate-500 truncate block">
              Ô #{plotCode} • {selectedCrop.name}
            </Text>
          </Box>

          <Button
            size="lg"
            onClick={onCheckout}
            className="h-12 px-6 font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-md text-sm shrink-0 flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4" />
            {PLOT_DETAIL_TEXTS.mobileCtaButtonText}
          </Button>
        </Flex>

        {/* Expandable Receipt for Mobile */}
        {isMobileReceiptOpen && (
          <Box className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs animate-in slide-in-from-bottom-2 duration-200">
            <Flex justify="between">
              <Text variant="muted">Thuê đất 60 ngày ({areaSqm}m²):</Text>
              <Text variant="body2" className="font-semibold">{basePrice.toLocaleString("vi-VN")} đ</Text>
            </Flex>
            <Flex justify="between">
              <Text variant="muted">Hạt giống ({selectedCrop.name}):</Text>
              <Text variant="body2" className="font-semibold">+{selectedCrop.seedPrice.toLocaleString("vi-VN")} đ</Text>
            </Flex>
            <Flex justify="between">
              <Text variant="muted">Kỹ sư & Camera IoT 24/7:</Text>
              <Badge variant="success" className="text-[10px] py-0">MIỄN PHÍ</Badge>
            </Flex>
            <Flex align="center" gap={1.5} className="pt-1 text-[11px] text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <Text variant="caption">{PLOT_DETAIL_TEXTS.guaranteeText}</Text>
            </Flex>
          </Box>
        )}
      </Box>
    </>
  );
};
