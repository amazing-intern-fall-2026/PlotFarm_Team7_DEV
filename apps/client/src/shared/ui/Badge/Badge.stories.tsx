import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircle2, AlertTriangle, XCircle, Leaf, Clock, Tag as TagIcon } from "lucide-react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Shared/UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📌 Giới thiệu Component
**Badge** là thẻ nhãn thông tin nhỏ (pill/tag), dùng để hiển thị trạng thái, danh mục hoặc phân loại ngắn gọn trong hệ thống Green Farm.

#### Mục đích sử dụng:
- Thể hiện trạng thái của thửa đất (\`Đang canh tác\`, \`Trống\`, \`Đã hoàn thành\`).
- Thể hiện tiêu chuẩn canh tác (\`VietGAP\`, \`Organic\`, \`GlobalGAP\`).
- Nhấn mạnh các cảnh báo sinh trưởng (độ ẩm thấp, sâu bệnh, quá hạn hợp đồng).

#### Cách truyền biến (Props & Usage):
\`\`\`tsx
import { Badge } from "@/shared/ui";
import { CheckCircle2 } from "lucide-react";

<Badge variant="success" icon={<CheckCircle2 className="h-3 w-3" />}>
  Đạt chuẩn VietGAP
</Badge>

<Badge variant="warning">
  Cần bổ sung phân bón
</Badge>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "success", "warning"],
      description: "Biến thể màu sắc tương ứng với ngữ nghĩa nghiệp vụ",
      table: {
        defaultValue: { summary: "default" }
      }
    },
    icon: {
      control: false,
      description: "Icon nhỏ đặt phía trước nội dung nhãn (ReactNode)"
    },
    children: {
      control: "text",
      description: "Nội dung văn bản hiển thị bên trong nhãn"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  name: "1. Default (Xanh lá - Đang canh tác)",
  args: {
    children: "Đang Canh Tác",
    variant: "default",
    icon: <Leaf className="h-3 w-3" />
  }
};

export const Secondary: Story = {
  name: "2. Secondary (Hổ phách - Sắp thu hoạch)",
  args: {
    children: "Sắp Thu Hoạch",
    variant: "secondary",
    icon: <Clock className="h-3 w-3" />
  }
};

export const Success: Story = {
  name: "3. Success (Đạt chứng nhận/Xong)",
  args: {
    children: "Đạt Chuẩn VietGAP",
    variant: "success",
    icon: <CheckCircle2 className="h-3 w-3" />
  }
};

export const Warning: Story = {
  name: "4. Warning (Cảnh báo độ ẩm)",
  args: {
    children: "Độ Ẩm Thấp (42%)",
    variant: "warning",
    icon: <AlertTriangle className="h-3 w-3" />
  }
};

export const Destructive: Story = {
  name: "5. Destructive (Nguy hiểm/Hết hạn)",
  args: {
    children: "Phát Hiện Sâu Bệnh",
    variant: "destructive",
    icon: <XCircle className="h-3 w-3" />
  }
};

export const Outline: Story = {
  name: "6. Outline (Viền - Danh mục cây trồng)",
  args: {
    children: "Cà Chua Bi Hữu Cơ",
    variant: "outline",
    icon: <TagIcon className="h-3 w-3" />
  }
};

export const AllBadgesOverview: Story = {
  name: "7. Tổng hợp tất cả trạng thái",
  render: () => (
    <div className="flex flex-wrap gap-2.5 items-center">
      <Badge variant="default" icon={<Leaf className="h-3 w-3" />}>Đang Canh Tác</Badge>
      <Badge variant="secondary" icon={<Clock className="h-3 w-3" />}>Sắp Thu Hoạch</Badge>
      <Badge variant="success" icon={<CheckCircle2 className="h-3 w-3" />}>Đạt Chuẩn VietGAP</Badge>
      <Badge variant="warning" icon={<AlertTriangle className="h-3 w-3" />}>Cần Tưới Nước</Badge>
      <Badge variant="destructive" icon={<XCircle className="h-3 w-3" />}>Quá Hạn Thuê</Badge>
      <Badge variant="outline" icon={<TagIcon className="h-3 w-3" />}>Đất Hữu Cơ</Badge>
    </div>
  )
};
