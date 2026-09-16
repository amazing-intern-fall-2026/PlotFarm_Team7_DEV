import * as React from "react";
import { ChevronLeft, Check } from "lucide-react";
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
    <Box className="space-y-4 sm:space-y-5 w-full max-w-full overflow-hidden">
      <Flex
        justify="between"
        align="center"
        className="flex-wrap gap-2.5 w-full max-w-full"
      >
        <div className="min-w-0 max-w-full overflow-hidden">
          <Breadcrumb
            items={[
              { label: "Khám phá", href: "/plots" },
              { label: `Ô #${plotNumber}`, href: `/plots/${plotId || plotNumber}` },
              { label: "Thanh toán VietQR", isCurrent: true },
            ]}
          />
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          leftIcon={<ChevronLeft className="w-4 h-4 shrink-0" />}
          className="text-slate-600 hover:text-emerald-700 text-xs font-medium shrink-0 h-8 px-2"
        >
          <span className="sm:hidden">Quay lại</span>
          <span className="hidden sm:inline">
            {CHECKOUT_TEXTS.header.backButton} (Ô #{plotNumber})
          </span>
        </Button>
      </Flex>

      <Card className="w-full max-w-full p-3.5 sm:py-4.5 sm:px-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="block sm:hidden w-full space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-white text-[11px] font-bold shrink-0">
                3
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {CHECKOUT_TEXTS.stepper.step3}
              </span>
            </div>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full shrink-0">
              Bước 3 / 4
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 w-full">
            <div className="h-1.5 rounded-full bg-emerald-600" title="1. Ô đất (Hoàn tất)" />
            <div className="h-1.5 rounded-full bg-emerald-600" title="2. Vụ mùa (Hoàn tất)" />
            <div className="h-1.5 rounded-full bg-emerald-600 animate-pulse" title="3. Thanh toán (Hiện tại)" />
            <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" title="4. Hoàn tất" />
          </div>

          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 pt-0.5">
            <span className="flex items-center gap-0.5 text-emerald-700 dark:text-emerald-400">
              <Check className="w-3 h-3 stroke-[3]" /> Ô đất
            </span>
            <span className="flex items-center gap-0.5 text-emerald-700 dark:text-emerald-400">
              <Check className="w-3 h-3 stroke-[3]" /> Vụ mùa
            </span>
            <span className="font-bold text-emerald-800 dark:text-emerald-300">
              ● Thanh toán
            </span>
            <span className="text-slate-400">
              ○ Hoàn tất
            </span>
          </div>
        </div>

        <div className="hidden sm:block w-full">
          <Steps
            variant="inline"
            currentStep={2}
            className="w-full max-w-full"
            steps={[
              { id: "step-1", title: CHECKOUT_TEXTS.stepper.step1 },
              { id: "step-2", title: CHECKOUT_TEXTS.stepper.step2 },
              { id: "step-3", title: CHECKOUT_TEXTS.stepper.step3 },
              { id: "step-4", title: CHECKOUT_TEXTS.stepper.step4 },
            ]}
          />
        </div>
      </Card>
    </Box>
  );
};
