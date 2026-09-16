import * as React from "react";
import { ChevronLeft } from "lucide-react";
import {
  Box,
  Flex,
  Card,
  Button,
  Breadcrumb,
  Steps,
} from "@/shared/ui";
import { CHECKOUT_TEXTS } from "./checkout.constants";

export interface CheckoutHeaderBarProps {
  onBack: () => void;
  plotNumber: string;
  plotId?: string;
}

export const CheckoutHeaderBar: React.FC<CheckoutHeaderBarProps> = ({
  onBack,
  plotNumber,
  plotId,
}) => {
  return (
    <Box className="space-y-4 sm:space-y-5">
      {/* 1. TOP BAR: BREADCRUMB BÊN TRÁI & NÚT QUAY LẠI BÊN PHẢI (CHUẨN LAYOUT NHƯ TRANG TRƯỚC ĐÓ) */}
      <Flex
        justify="between"
        align="center"
        className="flex-wrap gap-3"
      >
        <Breadcrumb
          items={[
            { label: "Khám phá ô đất", href: "/plots" },
            { label: `Ô đất #${plotNumber}`, href: `/plots/${plotId || plotNumber}` },
            { label: "Thanh toán VietQR", isCurrent: true },
          ]}
        />

        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
          className="text-slate-600 hover:text-emerald-700 text-xs font-medium"
        >
          {CHECKOUT_TEXTS.header.backButton} (Ô #{plotNumber})
        </Button>
      </Flex>

      {/* 2. THANH TO NGANG PHÍA DƯỚI: PROGRESS STEPPER CHUẨN SHARED/UI TRẢI DÀI */}
      <Card className="w-full p-4 sm:py-4.5 sm:px-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs overflow-x-auto">
        <Steps
          variant="inline"
          currentStep={2}
          className="min-w-[620px] sm:min-w-0"
          steps={[
            { id: "step-1", title: CHECKOUT_TEXTS.stepper.step1 },
            { id: "step-2", title: CHECKOUT_TEXTS.stepper.step2 },
            { id: "step-3", title: CHECKOUT_TEXTS.stepper.step3 },
            { id: "step-4", title: CHECKOUT_TEXTS.stepper.step4 },
          ]}
        />
      </Card>
    </Box>
  );
};
