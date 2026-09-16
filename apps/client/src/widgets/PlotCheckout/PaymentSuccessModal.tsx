import * as React from "react";
import { CheckCircle2, ArrowRight, ShieldCheck, Sprout } from "lucide-react";
import {
  Box,
  Flex,
  Modal,
  Heading,
  Text,
  Button,
  Badge,
} from "@/shared/ui";
import { CHECKOUT_TEXTS, type CheckoutMockOrder } from "./checkout.constants";

export interface PaymentSuccessModalProps {
  isOpen: boolean;
  order: CheckoutMockOrder;
  onGoToFarm: () => void;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isOpen,
  order,
  onGoToFarm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onGoToFarm}
      showCloseButton={false}
      size="md"
    >
      <Box className="text-center py-4 space-y-5">
        <Box className="relative w-20 h-20 mx-auto">
          <Box className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center animate-in zoom-in-75 duration-300">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </Box>
          <Box className="absolute -top-1 -right-1">
            <Badge variant="outline" className="bg-emerald-600 text-white border-0 font-black text-[10px] px-1.5 py-0.5 shadow-sm">
              ĐÃ DUYỆT
            </Badge>
          </Box>
        </Box>

        <Box className="space-y-2">
          <Heading level={3} className="text-2xl font-black text-slate-900 dark:text-white">
            {CHECKOUT_TEXTS.successModal.title}
          </Heading>
          <Text variant="body2" className="text-slate-600 dark:text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
            {CHECKOUT_TEXTS.successModal.subtitle}
          </Text>
        </Box>

        <Box className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left space-y-2">
          <Flex justify="between" align="center" className="text-xs">
            <Text variant="caption" className="text-slate-500 font-medium">
              Mã giao dịch đối soát:
            </Text>
            <Text variant="body2" className="font-mono font-bold text-slate-900 dark:text-white">
              #{order.orderCode}
            </Text>
          </Flex>
          <Flex justify="between" align="start" gap={2} className="text-xs">
            <Text variant="caption" className="text-slate-500 font-medium shrink-0">
              Gói kích hoạt:
            </Text>
            <Flex align="start" gap={1} className="min-w-0 justify-end flex-1">
              <Sprout className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <Text variant="body2" className="font-bold text-slate-900 dark:text-white text-right leading-snug break-words">
                Ô #{order.plotNumber} • {order.cropName}
              </Text>
            </Flex>
          </Flex>
          <Flex justify="between" align="center" className="text-xs">
            <Text variant="caption" className="text-slate-500 font-medium">
              Số tiền đã khớp lệnh:
            </Text>
            <Text variant="body2" className="font-black text-emerald-700 dark:text-emerald-400 text-sm">
              {order.totalAmount.toLocaleString("vi-VN")}&nbsp;VNĐ
            </Text>
          </Flex>
        </Box>

        <Flex align="center" justify="center" gap={1.5} className="text-slate-500 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <Text variant="caption" className="text-xs font-medium">
            {CHECKOUT_TEXTS.successModal.redirectingText}
          </Text>
        </Flex>

        <Button
          size="lg"
          variant="default"
          onClick={onGoToFarm}
          className="w-full h-12 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2"
        >
          <Text variant="body1" className="font-bold text-white text-sm">
            {CHECKOUT_TEXTS.successModal.goToFarmButtonText}
          </Text>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Box>
    </Modal>
  );
};
