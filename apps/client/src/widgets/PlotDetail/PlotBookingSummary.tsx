import * as React from "react";
import {
  ShieldCheck,
  Zap,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Tv,
  Users,
  Sprout,
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
  type PlotCropInfo,
} from "./plot-detail.constants";

export interface PlotBookingSummaryProps {
  basePrice: number;
  crop: PlotCropInfo;
  plotCode: string;
  areaSqm?: number;
  onCheckout: () => void;
  className?: string;
}

export const PlotBookingSummary: React.FC<PlotBookingSummaryProps> = ({
  basePrice,
  crop,
  plotCode,
  areaSqm = 20,
  onCheckout,
  className,
}) => {
  const [isMobileReceiptOpen, setIsMobileReceiptOpen] = React.useState<boolean>(false);

  return (
    <>
      {/* DESKTOP STICKY BOOKING CARD */}
      <Card
        className={cn(
          "hidden lg:block sticky top-6 border border-emerald-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-emerald-950/5 rounded-2xl overflow-hidden",
          className,
        )}
      >
        <CardHeader className="p-5 pb-3">
          <Flex justify="between" align="center">
            <Heading level={3} className="text-base font-bold text-slate-900 dark:text-white">
              {PLOT_DETAIL_TEXTS.invoiceTitle}
            </Heading>
            <Badge variant="secondary" className="text-xs font-semibold">
              Ô #{plotCode}
            </Badge>
          </Flex>
          <Text variant="muted" className="text-xs">
            {PLOT_DETAIL_TEXTS.invoiceSubtitle}
          </Text>
        </CardHeader>

        <CardContent className="p-5 pt-0 space-y-4">
          <Separator />

          {/* Line item 1: Phí thuê đất chuẩn */}
          <Flex justify="between" align="start" className="text-xs">
            <Box className="pr-2">
              <Text variant="body2" className="font-semibold text-slate-800 dark:text-slate-200">
                Phí thuê ô đất ({areaSqm}m²)
              </Text>
              <Text variant="caption" className="text-slate-500 block mt-0.5">
                Điện nước, cải tạo vi sinh, trùn quế
              </Text>
            </Box>
            <Text variant="body2" className="font-bold text-slate-900 dark:text-white shrink-0">
              {basePrice.toLocaleString("vi-VN")} đ
            </Text>
          </Flex>

          {/* Line item 2: Giống cây quy hoạch đã bao gồm */}
          <Flex justify="between" align="start" className="text-xs">
            <Box className="pr-2">
              <Flex align="center" gap={1.5}>
                <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                <Text variant="body2" className="font-medium text-slate-700 dark:text-slate-300">
                  Hạt giống F1: {crop.name}
                </Text>
              </Flex>
              <Text variant="caption" className="text-slate-500 block ml-5 mt-0.5">
                Hạt giống F1 bản quyền + dinh dưỡng sinh học
              </Text>
            </Box>
            <Badge variant="success" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold shrink-0">
              {PLOT_DETAIL_TEXTS.includedTag}
            </Badge>
          </Flex>

          {/* Line item 3: Kỹ sư chăm sóc định kỳ */}
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
            <Badge variant="success" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold shrink-0">
              {PLOT_DETAIL_TEXTS.serviceFreeTag}
            </Badge>
          </Flex>

          {/* Line item 4: Camera 1080P & IoT vi khí hậu */}
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
            <Badge variant="success" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold shrink-0">
              {PLOT_DETAIL_TEXTS.serviceFreeTag}
            </Badge>
          </Flex>

          <Separator />

          {/* Total Box */}
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
                {basePrice.toLocaleString("vi-VN")} đ
              </Text>
            </Flex>
          </Box>

          {/* Guarantee */}
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

      {/* MOBILE STICKY BOTTOM BAR */}
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
              {basePrice.toLocaleString("vi-VN")} đ
            </Text>
            <Text variant="caption" className="text-[10px] text-slate-500 truncate block">
              Ô #{plotCode} • {crop.name}
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

        {isMobileReceiptOpen && (
          <Box className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs animate-in slide-in-from-bottom-2 duration-200">
            <Flex justify="between">
              <Text variant="muted">Thuê ô đất ({areaSqm}m²):</Text>
              <Text variant="body2" className="font-semibold">{basePrice.toLocaleString("vi-VN")} đ</Text>
            </Flex>
            <Flex justify="between">
              <Text variant="muted">Giống cây ({crop.name}):</Text>
              <Badge variant="success" className="text-[10px] py-0">{PLOT_DETAIL_TEXTS.includedTag}</Badge>
            </Flex>
            <Flex justify="between">
              <Text variant="muted">Kỹ sư & Camera IoT 24/7:</Text>
              <Badge variant="success" className="text-[10px] py-0">{PLOT_DETAIL_TEXTS.serviceFreeTag}</Badge>
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
