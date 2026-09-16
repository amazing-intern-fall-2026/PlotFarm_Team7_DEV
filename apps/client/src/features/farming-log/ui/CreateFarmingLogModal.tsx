import {
  Card,
  Button,
  Box,
} from "@/shared/ui";
import { FarmingLogForm } from "./FarmingLogForm";
import { type ContractStatus } from "../model/farmingLog.types";
import { X } from "lucide-react";

interface CreateFarmingLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractId?: string;
  contractStatus?: ContractStatus;
  isAssignedToFarmer?: boolean;
  plotCode?: string;
  cropName?: string;
  customerName?: string;
  onSuccess?: (createdLog?: unknown) => void;
}

export function CreateFarmingLogModal({
  isOpen,
  onClose,
  contractId = "CONTRACT-A104",
  contractStatus = "ACTIVE",
  isAssignedToFarmer = true,
  plotCode = "Ô đất A-104",
  cropName = "Cải cầu vồng Thụy Sĩ",
  customerName = "Chị Thu Hà",
  onSuccess,
}: CreateFarmingLogModalProps) {
  if (!isOpen) return null;

  return (
    <Box className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-5 overflow-y-auto animate-in fade-in">
      <Card className="relative w-full max-w-4xl max-h-[94vh] flex flex-col rounded-3xl bg-background border border-border shadow-2xl p-0 overflow-hidden my-auto">
        {/* Top close button bar */}
        <Box className="absolute top-4 right-4 z-20">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full bg-background/80 hover:bg-background h-8 w-8 text-muted-foreground shadow-xs"
          >
            <X className="h-4 w-4" />
          </Button>
        </Box>

        {/* Modal Scrollable Content */}
        <Box className="overflow-y-auto p-4 sm:p-6 flex-1">
          <FarmingLogForm
            contractId={contractId}
            contractStatus={contractStatus}
            isAssignedToFarmer={isAssignedToFarmer}
            plotCode={plotCode}
            cropName={cropName}
            customerName={customerName}
            onCancel={onClose}
            onSuccess={(result) => {
              onSuccess?.(result);
              onClose();
            }}
          />
        </Box>
      </Card>
    </Box>
  );
}

