import type { Meta, StoryObj } from "@storybook/react";
import { Typography, Heading, Text } from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Shared/UI/Typography",
  component: Typography,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "### 🔤 Giới thiệu Component Typography",
          "**Typography** là hệ thống kiểu chữ chuẩn hóa duy nhất của Green Farm, thống nhất toàn bộ các thẻ tiêu đề (h1 tới h6), đoạn văn (p, lead, small, muted), loại bỏ việc tự viết các thẻ văn bản thô thiếu đồng bộ.",
          "",
          "#### 🌟 Đặc điểm nổi bật:",
          "- **Tích hợp i18n trực tiếp**: Hỗ trợ prop `i18nKey=\"nav.home\"` giúp tự động nạp bản dịch, chống hardcode chữ trong view.",
          "- **Cú pháp linh hoạt**:",
          "  - Dùng thẻ linh hoạt: `<Typography as=\"h1\">...</Typography>`",
          "  - Dùng compound: `<Typography.H1>...</Typography.H1>`, `<Typography.P>...</Typography.P>`",
          "  - Dùng helper: `<Heading level={2}>...</Heading>`, `<Text>...</Text>`",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div"],
      description: "Thẻ HTML ngữ nghĩa",
    },
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "lead", "large", "small", "muted"],
      description: "Biến thể font size & font weight",
    },
    i18nKey: {
      control: "text",
      description: "Khóa i18n lấy từ từ điển ngôn ngữ",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

/**
 * 1. Hệ thống toàn bộ các cấp tiêu đề từ H1 tới H6
 */
export const AllHeadings: Story = {
  name: "1. Tiêu đề H1 đến H6",
  render: () => (
    <div className="space-y-4 max-w-2xl p-6 bg-card rounded-2xl border border-border">
      <Typography.H1>H1. Nông Trại Công Nghệ Cao Đà Lạt</Typography.H1>
      <Typography.H2>H2. Quản Lý Thửa Đất & Vi Khí Hậu</Typography.H2>
      <Typography.H3>H3. Thông Số Cảm Biến Đất Thời Gian Thực</Typography.H3>
      <Typography.H4>H4. Lịch Tưới Tiêu Tự Động Theo Lô</Typography.H4>
      <Typography.H5>H5. Nhật Ký Bón Phân Hữu Cơ Vi Sinh</Typography.H5>
      <Typography.H6>H6. Ghi Chú Của Kỹ Sư Nông Học Thực Địa</Typography.H6>
    </div>
  ),
};

/**
 * 2. Đoạn văn bản và các biến thể nội dung (Body, Lead, Small, Muted)
 */
export const BodyAndTextVariants: Story = {
  name: "2. Đoạn văn bản & Biến thể",
  render: () => (
    <div className="space-y-4 max-w-xl p-6 bg-card rounded-2xl border border-border">
      <Typography variant="lead">
        Lead text: Nền tảng kết nối trực tiếp cư dân thành thị với các mảnh vườn nông nghiệp hữu cơ ứng dụng IoT 24/7.
      </Typography>
      <Typography.P>
        Đoạn văn tiêu chuẩn (Paragraph): Mỗi thửa đất được giám sát liên tục bằng các cảm biến nhiệt độ, độ ẩm và hệ thống camera livestream chất lượng cao.
      </Typography.P>
      <div className="flex gap-4 items-center pt-2">
        <Typography variant="large">Chỉ số nổi bật</Typography>
        <Typography variant="small">Cập nhật 5 phút trước</Typography>
        <Typography variant="muted">Bản quyền Green Farm 2026</Typography>
      </div>
    </div>
  ),
};

/**
 * 3. Tự động dịch qua i18nKey không cần hardcode chữ
 */
export const LocalizationWithI18nKey: Story = {
  name: "3. Tự động dịch đa ngôn ngữ qua i18nKey",
  render: () => (
    <div className="space-y-3 max-w-md p-6 bg-emerald-50/50 dark:bg-slate-900 rounded-2xl border border-emerald-200/60 dark:border-slate-800">
      <div className="text-xs font-semibold uppercase text-emerald-800 dark:text-emerald-300">
        Render tự động qua i18nKey:
      </div>
      <Heading level={2} i18nKey="customer.hero_title" />
      <Text variant="p" i18nKey="customer.hero_subtitle" />
      <Text variant="muted" i18nKey="shell.role_badge_farmer" />
    </div>
  ),
};
