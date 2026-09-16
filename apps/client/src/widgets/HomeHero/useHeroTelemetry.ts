import * as React from "react";
import { axiosClient } from "@/shared/api";

export interface HeroTelemetryData {
  location: string;
  areaM2: number;
  humidity: number;
  temperature: number;
  sensorStatus: string;
  scenes: { id: string; name: string; active: boolean }[];
}

const DEFAULT_TELEMETRY: HeroTelemetryData = {
  location: "Ô đất nông trại",
  areaM2: 12500,
  humidity: 78,
  temperature: 19.4,
  sensorStatus: "Hoạt động tối ưu",
  scenes: [
    { id: "01", name: "01. Ô Đất Canh Tác", active: true },
    { id: "02", name: "02. Chăm Gốc Nông ...", active: false },
    { id: "03", name: "03. Mùa Vụ Bội Thu", active: false },
    { id: "04", name: "04. Sinh Thái Tuần Hoàn", active: false },
  ],
};

export function useHeroTelemetry() {
  const [telemetry, setTelemetry] = React.useState<HeroTelemetryData>(DEFAULT_TELEMETRY);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    let isMounted = true;
    async function fetchTelemetry() {
      setLoading(true);
      try {
        let res;
        try {
          res = await axiosClient.get<{ success: boolean; data: HeroTelemetryData }>("/v1/telemetry/hero");
        } catch {
          res = await axiosClient.get<{ success: boolean; data: HeroTelemetryData }>("/telemetry/hero");
        }
        if (isMounted && res.data?.data) {
          setTelemetry(res.data.data);
        }
      } catch {
        if (isMounted) {
          setTelemetry(DEFAULT_TELEMETRY);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchTelemetry();
    return () => {
      isMounted = false;
    };
  }, []);

  return { telemetry, loading };
}
