import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";
import { Typography } from "../Typography";
import { Box } from "../Box";

const meta: Meta<typeof Container> = {
  title: "Shared/UI/Container",
  component: Container,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "### 📦 Giới thiệu Component Container",
          "**Container** là khung bọc giao diện trung tâm chuẩn hóa cho toàn bộ hệ thống Green Farm.",
          "",
          "#### 🌟 Điểm nổi bật:",
          "- **Đa kích thước (Max-width variants)**: `sm`, `md`, `lg`, `xl`, `2xl`, `7xl` (mặc định), `full`.",
          "- **Tự động căn giữa**: Tích hợp sẵn `mx-auto`.",
          "- **Đệm lề đáp ứng (Responsive Gutter)**: Tích hợp sẵn `px-4 sm:px-6 lg:px-8`.",
          "- **Polymorphic**: Hỗ trợ chuyển đổi thẻ ngữ nghĩa (`div`, `section`, `main`, `article`,...).",
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "7xl", "full"],
      description: "Độ rộng tối đa của khung bọc",
      defaultValue: "7xl",
    },
    center: {
      control: "boolean",
      description: "Căn giữa theo trục ngang",
      defaultValue: true,
    },
    padding: {
      control: "boolean",
      description: "Bật/tắt padding responsive hai bên",
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

/**
 * 1. Khung bọc mặc định (Default 7xl Container)
 */
export const Default: Story = {
  name: "1. Mặc định (7xl - 1280px)",
  render: () => (
    <Box className="w-full bg-muted/20 py-8">
      <Container className="bg-primary/5 border border-dashed border-primary/40 rounded-2xl p-6">
        <Typography.H3 className="text-primary font-bold">Khung bọc Container 7xl</Typography.H3>
        <Typography.P className="text-muted-foreground mt-2">
          Kích thước tiêu chuẩn cho các trang Marketplace, Chi tiết ô đất, Giỏ hàng và Tổng quan nông trại.
        </Typography.P>
      </Container>
    </Box>
  ),
};

/**
 * 2. So sánh các kích thước Container
 */
export const Sizes: Story = {
  name: "2. Các kích thước (Sizes)",
  render: () => (
    <Box className="w-full space-y-4 bg-muted/20 py-8">
      <Container size="sm" className="bg-card border border-border rounded-xl p-4 shadow-xs text-center">
        <Typography.Text className="font-semibold text-sm">Container sm (max-w-screen-sm)</Typography.Text>
      </Container>

      <Container size="md" className="bg-card border border-border rounded-xl p-4 shadow-xs text-center">
        <Typography.Text className="font-semibold text-sm">Container md (max-w-screen-md)</Typography.Text>
      </Container>

      <Container size="lg" className="bg-card border border-border rounded-xl p-4 shadow-xs text-center">
        <Typography.Text className="font-semibold text-sm">Container lg (max-w-screen-lg)</Typography.Text>
      </Container>

      <Container size="xl" className="bg-card border border-border rounded-xl p-4 shadow-xs text-center">
        <Typography.Text className="font-semibold text-sm">Container xl (max-w-screen-xl)</Typography.Text>
      </Container>

      <Container size="7xl" className="bg-card border border-primary/30 rounded-xl p-4 shadow-xs text-center">
        <Typography.Text className="font-semibold text-sm text-primary">Container 7xl (chuẩn giao diện Green Farm)</Typography.Text>
      </Container>
    </Box>
  ),
};
