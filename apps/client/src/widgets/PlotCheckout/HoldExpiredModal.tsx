import * as React from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import {
  Box,
  Modal,
  Heading,
  Text,
  Button,
} from "@/shared/ui";
import { CHECKOUT_TEXTS } from "./checkout.constants";

export interface HoldExpiredModalProps {
  isOpen: boolean;
  onBackToPlots: () => void;
}

export const HoldExpiredModal: React.FC<HoldExpiredModalProps> = ({
  isOpen,
  onBackToPlots,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onBackToPlots}
      showCloseButton={false}
      size="md"
    >
      <Box className="text-center py-4 space-y-5">
        <Box className="w-16 h-16 mx-auto rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center animate-in zoom-in-75 duration-300">
          <AlertTriangle className="w-8 h-8 stroke-[2.5]" />
        </Box>

        <Box className="space-y-2">
          <Heading level={3} className="text-xl font-bold text-slate-900 dark:text-white">
            {CHECKOUT_TEXTS.expiryModal.title}
          </Heading>
          <Text variant="body2" className="text-slate-600 dark:text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
            {CHECKOUT_TEXTS.expiryModal.subtitle}
          </Text>
        </Box>

        <Button
          size="lg"
          variant="default"
          onClick={onBackToPlots}
          className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <Text variant="body1" className="font-bold text-white text-sm">
            {CHECKOUT_TEXTS.expiryModal.backToPlotsButtonText}
          </Text>
        </Button>
      </Box>
    </Modal>
  );
};
