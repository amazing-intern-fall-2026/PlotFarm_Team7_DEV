import type { Meta, StoryObj } from "@storybook/react";
import { TrendingUp, AlertTriangle, CheckCircle, Leaf } from "lucide-react";
import { Metric } from "./Metric";

const meta: Meta<typeof Metric> = {
  title: "Shared/UI/Metric",
  component: Metric,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Metric>;

export const Default: Story = {
  name: "1. Thẻ Doanh thu (Mặc định)",
  args: {
    title: "Doanh thu tháng này",
    value: "285.4M",
    icon: <TrendingUp className="h-5 w-5" />,
    trend: { value: "+18.2%", isPositive: true, label: "so với tháng trước" },
    actionText: "Báo cáo chi tiết",
  },
};

export const WarningState: Story = {
  name: "2. Cảnh báo Vi khí hậu (Warning)",
  args: {
    variant: "warning",
    title: "Cảnh báo Nhiệt độ",
    value: "34.5°C",
    icon: <AlertTriangle className="h-5 w-5" />,
    subtitle: "Vượt ngưỡng an toàn 32°C tại Ô A-104",
    actionText: "Kiểm tra ngay",
  },
};

export const HarvestSuccess: Story = {
  name: "3. Tác vụ hoàn thành (Success)",
  args: {
    variant: "success",
    title: "Sản lượng thu hoạch",
    value: "1.250 kg",
    icon: <CheckCircle className="h-5 w-5" />,
    progress: { current: 1250, total: 1500 },
    subtitle: "Mục tiêu quý III (83%)",
  },
};

export const PlotOccupation: Story = {
  name: "4. Tỷ lệ lấp đầy ô đất",
  args: {
    variant: "info",
    title: "Tỷ lệ lấp đầy",
    value: "84%",
    icon: <Leaf className="h-5 w-5" />,
    progress: { current: 84, total: 100 },
    subtitle: "42/50 ô đất đang được canh tác",
  },
};
