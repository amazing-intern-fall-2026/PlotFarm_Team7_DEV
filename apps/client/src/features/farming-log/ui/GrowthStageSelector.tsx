import * as React from "react";
import {
  Card,
  Badge,
  Box,
  Text,
} from "@/shared/ui";
import {
  GROWTH_STAGES,
  type GrowthStageId,
} from "../model/farmingLog.types";
import { Sprout, Leaf, Flower2, ShoppingBag, Check } from "lucide-react";

interface GrowthStageSelectorProps {
  selectedStage?: GrowthStageId;
  onSelectStage: (stage: GrowthStageId) => void;
  hasError?: boolean;
}

const STAGE_ICONS: Record<GrowthStageId, React.ComponentType<{ className?: string }>> = {
  STAGE_1: Sprout,
  STAGE_2: Leaf,
  STAGE_3: Flower2,
  STAGE_4: ShoppingBag,
};

export function GrowthStageSelector({
  selectedStage,
  onSelectStage,
  hasError = false,
}: GrowthStageSelectorProps) {
  return (
    <Box className="space-y-2.5">
      <Box className="flex items-center justify-between">
        <Text as="label" className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
          <Sprout className="h-4 w-4 text-emerald-600" />
          <span>Mốc sinh trưởng mùa vụ <Text as="span" className="text-destructive">*</Text></span>
        </Text>
        {selectedStage && (
          <Badge variant="success" className="text-[11px] font-bold">
            Tiến độ: {GROWTH_STAGES.find((s) => s.id === selectedStage)?.progressPercent}%
          </Badge>
        )}
      </Box>

      <Box
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-1 rounded-2xl transition-all ${
          hasError ? "ring-2 ring-destructive/80 bg-destructive/5" : ""
        }`}
      >
        {GROWTH_STAGES.map((stage) => {
          const isSelected = selectedStage === stage.id;
          const Icon = STAGE_ICONS[stage.id];

          return (
            <Card
              key={stage.id}
              onClick={() => onSelectStage(stage.id)}
              className={`p-3.5 cursor-pointer rounded-2xl transition-all duration-200 relative overflow-hidden border text-left flex flex-col justify-between ${
                isSelected
                  ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 ring-2 ring-emerald-500/40 shadow-sm"
                  : "border-border hover:border-emerald-300 hover:bg-muted/30 shadow-none"
              }`}
            >
              {/* Top row: Icon, Stage label, Check indicator */}
              <Box className="flex items-start justify-between gap-2 mb-2">
                <Box
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors shrink-0 ${
                    isSelected
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </Box>

                <Badge
                  variant={isSelected ? "success" : "secondary"}
                  className="font-bold text-[10px]"
                >
                  {stage.progressPercent}%
                </Badge>
              </Box>

              {/* Title & Description */}
              <Box className="space-y-1">
                <Box className="flex items-center gap-1">
                  <Text as="h4" className="font-bold text-xs sm:text-sm text-foreground">
                    {stage.label}
                  </Text>
                  {isSelected && <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                </Box>
                <Text variant="muted" className="text-[11px] line-clamp-2 leading-relaxed">
                  {stage.description}
                </Text>
              </Box>

              {/* Progress Bar Indicator */}
              <Box className="w-full h-1.5 rounded-full bg-muted mt-3 overflow-hidden">
                <Box
                  className={`h-full rounded-full transition-all ${
                    isSelected ? "bg-emerald-600" : "bg-muted-foreground/30"
                  }`}
                  style={{ width: `${stage.progressPercent}%` }}
                />
              </Box>
            </Card>
          );
        })}
      </Box>

      {hasError && (
        <Text as="p" className="text-xs text-destructive font-semibold mt-1">
          Vui lòng chọn 1 trong 4 mốc sinh trưởng trên để cập nhật cho khách hàng.
        </Text>
      )}
    </Box>
  );
}
