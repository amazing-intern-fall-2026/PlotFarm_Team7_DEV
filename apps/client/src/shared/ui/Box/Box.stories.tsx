import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";
import { Typography } from "../Typography";

const meta: Meta<typeof Box> = {
  title: "Shared/UI/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📦 Giới thiệu Component Box
**Box** là thành phần vùng chứa bố cục (Layout Container) chuẩn hóa duy nhất của Green Farm, thay thế cho việc viết trực tiếp các thẻ \`<div>\` thô không nhất quán.

#### 🌟 Điểm nổi bật:
- **Ngữ nghĩa linh hoạt qua \`as\`**: Mặc định là \`<div>\`, có thể chuyển thành \`section\`, \`article\`, \`main\`, \`aside\`.
- **Dễ dàng kết hợp**: Phối hợp hoàn hảo với **\`Typography\`** để xây dựng mọi khối giao diện.
        `,
      },
    },
  },
  argTypes: {
    as: {
      control: "select",
      options: ["div", "section", "article", "main", "aside", "header", "footer", "nav"],
      description: "Thẻ HTML ngữ nghĩa cần render",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  name: "1. Khung Box Cơ Bản (Thay thế div)",
  render: () => (
    <Box className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-3 max-w-md">
      <Typography.H4>Khối Thông Tin Canh Tác (Box Container)</Typography.H4>
      <Typography.P>
        Mọi thành phần bố cục bọc ngoài giờ đây được đồng bộ thông qua component Box chuẩn hóa trong shared/ui.
      </Typography.P>
    </Box>
  ),
};

export const SemanticSection: Story = {
  name: "2. Khung Ngữ Nghĩa (as='section')",
  render: () => (
    <Box as="section" className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 max-w-lg space-y-2">
      <Typography.H3 className="text-emerald-800 dark:text-emerald-300">
        Khu Vực Phân Hệ IoT (Section Tag)
      </Typography.H3>
      <Typography.P className="text-emerald-700 dark:text-emerald-400">
        Thẻ ngữ nghĩa section giúp nâng cao điểm SEO và Accessibility mà vẫn giữ đúng chuẩn Design System.
      </Typography.P>
    </Box>
  ),
};
