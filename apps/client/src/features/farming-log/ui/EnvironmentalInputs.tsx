import {
  Card,
  Button,
  Badge,
  Box,
  Text,
} from "@/shared/ui";
import { Droplets, Thermometer, Cloud, RefreshCw } from "lucide-react";

interface EnvironmentalInputsProps {
  temperature: number;
  airHumidity: number;
  soilMoisture: number;
  onChangeTemperature: (val: number) => void;
  onChangeAirHumidity: (val: number) => void;
  onChangeSoilMoisture: (val: number) => void;
  onSyncSensors: () => void;
}

export function EnvironmentalInputs({
  temperature,
  airHumidity,
  soilMoisture,
  onChangeTemperature,
  onChangeAirHumidity,
  onChangeSoilMoisture,
  onSyncSensors,
}: EnvironmentalInputsProps) {
  return (
    <Box className="space-y-3">
      <Box className="flex items-center justify-between">
        <Text as="label" className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
          <Droplets className="h-4 w-4 text-cyan-600" />
          <span>Chỉ số vi khí hậu hiện trường</span>
        </Text>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onSyncSensors}
          leftIcon={<RefreshCw className="h-3 w-3 text-emerald-600" />}
          className="h-7 text-[11px] font-bold rounded-xl"
        >
          Đồng bộ cảm biến IoT
        </Button>
      </Box>

      <Box className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Soil Moisture */}
        <Card className="p-3.5 rounded-2xl bg-muted/20 border border-border space-y-2">
          <Box className="flex items-center justify-between">
            <Box className="flex items-center gap-1.5">
              <Droplets className="h-4 w-4 text-cyan-600" />
              <Text variant="muted" className="text-xs font-semibold">Độ ẩm đất</Text>
            </Box>
            <Badge variant="success" className="text-[10px]">Chuẩn 60-75%</Badge>
          </Box>
          <Box className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={100}
              value={soilMoisture}
              onChange={(e) => onChangeSoilMoisture(Number(e.target.value))}
              className="w-full h-10 px-3 rounded-xl bg-background border border-border font-bold text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            />
            <Text as="span" className="text-xs font-bold text-muted-foreground">%</Text>
          </Box>
        </Card>

        {/* Temperature */}
        <Card className="p-3.5 rounded-2xl bg-muted/20 border border-border space-y-2">
          <Box className="flex items-center justify-between">
            <Box className="flex items-center gap-1.5">
              <Thermometer className="h-4 w-4 text-amber-600" />
              <Text variant="muted" className="text-xs font-semibold">Nhiệt độ luống</Text>
            </Box>
            <Badge variant="success" className="text-[10px]">Chuẩn 18-26°C</Badge>
          </Box>
          <Box className="flex items-center gap-2">
            <input
              type="number"
              step="0.1"
              min={0}
              max={50}
              value={temperature}
              onChange={(e) => onChangeTemperature(Number(e.target.value))}
              className="w-full h-10 px-3 rounded-xl bg-background border border-border font-bold text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
            <Text as="span" className="text-xs font-bold text-muted-foreground">°C</Text>
          </Box>
        </Card>

        {/* Air Humidity */}
        <Card className="p-3.5 rounded-2xl bg-muted/20 border border-border space-y-2">
          <Box className="flex items-center justify-between">
            <Box className="flex items-center gap-1.5">
              <Cloud className="h-4 w-4 text-blue-600" />
              <Text variant="muted" className="text-xs font-semibold">Độ ẩm không khí</Text>
            </Box>
            <Badge variant="secondary" className="text-[10px]">Ổn định</Badge>
          </Box>
          <Box className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={100}
              value={airHumidity}
              onChange={(e) => onChangeAirHumidity(Number(e.target.value))}
              className="w-full h-10 px-3 rounded-xl bg-background border border-border font-bold text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
            <Text as="span" className="text-xs font-bold text-muted-foreground">%</Text>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
