import * as React from "react";
import { ChevronLeft } from "lucide-react";
import {
  Box,
  Flex,
  Text,
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
    <Box className="space-y-3 pb-1">
      {/* 1. BREADCRUMB CHUẨN DESIGN SYSTEM TỪ @/shared/ui/Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Khám phá ô đất", href: "/plots" },
          { label: `Ô đất #${plotNumber}`, href: `/plots/${plotId || plotNumber}` },
          { label: "Thanh toán VietQR", isCurrent: true },
        ]}
      />

      {/* 2. THANH TIẾN TRÌNH & NÚT QUAY LẠI SỬ DỤNG COMPONENT <Steps /> TỪ @/shared/ui/Steps */}
      <Flex justify="between" align="center" className="flex-wrap gap-4 pt-1">
        {/* Nút quay lại */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
          className="text-muted-foreground hover:text-foreground font-semibold text-xs -ml-2 h-8 flex items-center gap-1.5"
        >
          <Text variant="caption" className="font-semibold text-xs">
            {CHECKOUT_TEXTS.header.backButton} (Ô #{plotNumber})
          </Text>
        </Button>

        {/* Component Steps từ Design System */}
        <Box className="shrink-0">
          <Steps
            variant="inline"
            currentStep={2}
            steps={[
              { id: "step-1", title: CHECKOUT_TEXTS.stepper.step1 },
              { id: "step-2", title: CHECKOUT_TEXTS.stepper.step2 },
              { id: "step-3", title: CHECKOUT_TEXTS.stepper.step3 },
              { id: "step-4", title: CHECKOUT_TEXTS.stepper.step4 },
            ]}
          />
        </Box>
      </Flex>
    </Box>
  );
};
