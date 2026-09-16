import * as React from "react";
import {
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Users,
  Calendar,
  Layers,
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
  Image,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import {
  CHECKOUT_TEXTS,
  type CheckoutMockOrder,
} from "./checkout.constants";

export interface MiniReceiptCardProps {
  order: CheckoutMockOrder;
  className?: string;
  isMobileModal?: boolean;
}

export const MiniReceiptCard: React.FC<MiniReceiptCardProps> = ({
  order,
  className,
  isMobileModal = false,
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = React.useState<boolean>(false);

  const formattedLandFee = order.landRentalFee.toLocaleString("vi-VN");
  const formattedSeedFee = order.cropSeedFee.toLocaleString("vi-VN");
  const formattedTotal = order.totalAmount.toLocaleString("vi-VN");

  return (
    <Card
      className={cn(
        "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-2xl overflow-hidden",
        !isMobileModal && "sticky top-6",
        className,
      )}
    >
      <CardHeader className="p-5 pb-4 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
        <Flex justify="between" align="center" className="gap-2">
          <Flex align="center" gap={2}>
            <Badge
              variant="outline"
              className="bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 font-bold text-[11px] uppercase tracking-wider"
            >
              {CHECKOUT_TEXTS.miniReceipt.contractBadge}
            </Badge>
            <Text variant="caption" className="font-mono font-bold text-slate-500">
              #{order.orderCode}
            </Text>
          </Flex>
          <Badge
            variant="secondary"
            className="bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 text-xs font-semibold"
          >
            {CHECKOUT_TEXTS.header.statusWaiting}
          </Badge>
        </Flex>

        <Flex align="center" gap={3} className="pt-3">
          <Box className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200/80 shadow-xs relative">
            <Image
              src={order.plotThumbnailUrl}
              alt={order.plotZone}
              className="w-full h-full object-cover"
            />
          </Box>
          <Box className="min-w-0 flex-1">
            <Heading level={4} className="text-base font-bold text-slate-900 dark:text-white leading-snug break-words">
              Ô #{order.plotNumber} • {order.cropName}
            </Heading>
            <Text variant="caption" className="text-slate-500 block mt-0.5 leading-relaxed break-words">
              {order.plotZone}
            </Text>
            <Flex align="center" gap={1.5} className="mt-1">
              <Layers className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <Text variant="caption" className="font-medium text-slate-700 dark:text-slate-300 text-[11px]">
                {order.plotAreaSqm}m² đất canh tác • {order.durationDays} ngày
              </Text>
            </Flex>
          </Box>
        </Flex>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        <Box className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/80 space-y-2.5">
          <Box className="space-y-1">
            <Flex align="center" justify="between" className="flex-wrap gap-x-2 gap-y-1 text-xs">
              <Flex align="center" gap={1.5} className="text-slate-600 dark:text-slate-400 shrink-0">
                <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                <Text variant="body2" className="text-xs font-medium">
                  Thời hạn canh tác:
                </Text>
              </Flex>
              <Text variant="body2" className="text-xs font-bold text-slate-900 dark:text-slate-100 text-right">
                {order.durationDays} ngày ({order.startDateFormatted} – {order.endDateFormatted})
              </Text>
            </Flex>
          </Box>

          <Box className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <Flex align="center" gap={1.5} className="text-slate-600 dark:text-slate-400">
              <Users className="w-4 h-4 text-emerald-600 shrink-0" />
              <Text variant="body2" className="text-xs font-medium">
                Nông dân bảo trợ:
              </Text>
            </Flex>
            <Text variant="body2" className="text-xs font-bold text-slate-900 dark:text-slate-100 pl-5.5 leading-relaxed break-words">
              {order.farmerName} • {order.farmerTeam}
            </Text>
          </Box>
        </Box>

        <Box className="space-y-2.5 pt-1">
          <Flex justify="between" align="start" gap={3} className="text-xs">
            <Text variant="body2" className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Tiền thuê ô đất ({order.plotAreaSqm}m² / {order.durationDays} ngày)
            </Text>
            <Text variant="body2" className="font-semibold text-slate-900 dark:text-white shrink-0 whitespace-nowrap">
              {formattedLandFee}&nbsp;đ
            </Text>
          </Flex>

          <Flex justify="between" align="start" gap={3} className="text-xs">
            <Text variant="body2" className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Giống rau F1 &amp; vật tư vi sinh ({order.cropName})
            </Text>
            <Text variant="body2" className="font-semibold text-slate-900 dark:text-white shrink-0 whitespace-nowrap">
              {formattedSeedFee}&nbsp;đ
            </Text>
          </Flex>

          <Separator className="my-2" />

          <Flex justify="between" align="end" gap={3} className="pt-1">
            <Box className="min-w-0">
              <Text variant="caption" className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px] block">
                {CHECKOUT_TEXTS.miniReceipt.totalPayableLabel}
              </Text>
              <Text variant="caption" className="text-[11px] text-slate-500 block mt-0.5 leading-relaxed">
                {CHECKOUT_TEXTS.miniReceipt.allInclusiveNote}
              </Text>
            </Box>
            <Text variant="h3" className="text-2xl font-black text-emerald-800 dark:text-emerald-400 shrink-0 whitespace-nowrap">
              {formattedTotal}&nbsp;VNĐ
            </Text>
          </Flex>
        </Box>

        <Box className="pt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDetailsOpen((prev) => !prev)}
            className="w-full justify-between p-2.5 h-auto rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 font-semibold"
            aria-expanded={isDetailsOpen}
          >
            <Flex align="center" gap={2}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <Text variant="body2" className="text-xs font-bold">
                {isDetailsOpen
                  ? CHECKOUT_TEXTS.miniReceipt.detailsAccordionClose
                  : CHECKOUT_TEXTS.miniReceipt.detailsAccordionOpen}
              </Text>
            </Flex>
            {isDetailsOpen ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </Button>

          {isDetailsOpen && (
            <Box className="mt-2.5 p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-2 animate-in fade-in-50 duration-200">
              {CHECKOUT_TEXTS.miniReceipt.benefits.map((benefit, idx) => (
                <Flex key={idx} align="start" gap={2} className="text-xs text-slate-700 dark:text-slate-300">
                  <Box className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <Text variant="caption" className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                    {benefit}
                  </Text>
                </Flex>
              ))}
            </Box>
          )}
        </Box>
      </CardContent>

      <CardFooter className="p-4 bg-slate-50/80 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center">
        <Flex align="center" gap={2} className="text-slate-600 dark:text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <Text variant="caption" className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            {CHECKOUT_TEXTS.miniReceipt.sslGuaranteedBadge}
          </Text>
        </Flex>
      </CardFooter>
    </Card>
  );
};
