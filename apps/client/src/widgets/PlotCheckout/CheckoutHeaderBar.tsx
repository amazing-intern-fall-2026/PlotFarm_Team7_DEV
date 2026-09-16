import * as React from "react";
import { ChevronLeft, Check } from "lucide-react";
import {
  Box,
  Flex,
  Text,
  Button,
} from "@/shared/ui";
import { CHECKOUT_TEXTS } from "./checkout.constants";

export interface CheckoutHeaderBarProps {
  onBack: () => void;
  plotNumber: string;
}

export const CheckoutHeaderBar: React.FC<CheckoutHeaderBarProps> = ({
  onBack,
  plotNumber,
}) => {
  return (
    <Box className="space-y-4">
      <Flex justify="between" align="center" className="flex-wrap gap-3">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400 font-semibold text-xs -ml-2 flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          <Text variant="caption" className="font-semibold text-xs">
            {CHECKOUT_TEXTS.header.backButton} (Ô #{plotNumber})
          </Text>
        </Button>

        {/* Stepper HUD */}
        <Flex align="center" gap={1.5} className="text-xs font-semibold text-slate-500">
          {/* Step 1 */}
          <Flex align="center" gap={1} className="text-emerald-700 dark:text-emerald-400">
            <Box className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-emerald-700" />
            </Box>
            <Text variant="caption" className="font-bold text-[11px] text-emerald-700 dark:text-emerald-400 hidden sm:inline">
              {CHECKOUT_TEXTS.stepper.step1}
            </Text>
          </Flex>

          <Box className="w-4 h-0.5 bg-emerald-500/40" />

          {/* Step 2 */}
          <Flex align="center" gap={1} className="text-emerald-700 dark:text-emerald-400">
            <Box className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-emerald-700" />
            </Box>
            <Text variant="caption" className="font-bold text-[11px] text-emerald-700 dark:text-emerald-400 hidden sm:inline">
              {CHECKOUT_TEXTS.stepper.step2}
            </Text>
          </Flex>

          <Box className="w-4 h-0.5 bg-emerald-600" />

          {/* Step 3 (Active) */}
          <Flex align="center" gap={1} className="text-slate-900 dark:text-white">
            <Box className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold">
              3
            </Box>
            <Text variant="caption" className="font-bold text-[11px] text-slate-900 dark:text-white">
              {CHECKOUT_TEXTS.stepper.step3}
            </Text>
          </Flex>

          <Box className="w-4 h-0.5 bg-slate-200 dark:bg-slate-700" />

          {/* Step 4 */}
          <Flex align="center" gap={1} className="text-slate-400">
            <Box className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center text-[10px] font-bold">
              4
            </Box>
            <Text variant="caption" className="font-medium text-[11px] text-slate-400 hidden sm:inline">
              {CHECKOUT_TEXTS.stepper.step4}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
