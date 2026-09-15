import type { Meta, StoryObj } from "@storybook/react";
import { Sprout, ArrowRight, Trash2, Plus, LogIn } from "lucide-react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Shared/UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📌 Giới thiệu Component
**Button** là thành phần nút bấm tương tác cơ bản của hệ thống Green Farm, hỗ trợ đầy đủ các biến thể giao diện (variants), kích thước (sizes), trạng thái đang tải (isLoading), và vị trí gắn icon.

#### Mục đích sử dụng:
- Kích hoạt hành động của người dùng (Submit form, Xác nhận, Hủy bỏ).
- Điều hướng trang hoặc mở Modal/Dialog khi kết hợp với \`asChild\`.
- Hiển thị trạng thái xử lý bất đồng bộ mà không cần tự tạo thêm spinner.

#### Cách truyền biến (Props & Usage):
\`\`\`tsx
import { Button } from "@/shared/ui";
import { Sprout } from "lucide-react";

// Nút chính kèm icon
<Button variant="primary" leftIcon={<Sprout className="h-4 w-4" />}>
  Thuê Mảnh Đất
</Button>

// Nút submit kèm trạng thái đang tải
<Button type="submit" isLoading={isSubmitting}>
  Đăng Nhập
</Button>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "destructive", "outline", "ghost", "link"],
      description: "Biến thể phong cách giao diện của nút",
      table: {
        defaultValue: { summary: "default" }
      }
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "Kích cỡ chiều cao và padding của nút (sm: 32px, default: 40px, lg: 48px, icon: 40x40px)",
      table: {
        defaultValue: { summary: "default" }
      }
    },
    isLoading: {
      control: "boolean",
      description: "Bật trạng thái spinner xoay và vô hiệu hóa click tạm thời",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    disabled: {
      control: "boolean",
      description: "Vô hiệu hóa nút bấm khi điều kiện chưa thỏa mãn",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    leftIcon: {
      control: false,
      description: "Icon hiển thị phía trước văn bản nút (ReactNode)"
    },
    rightIcon: {
      control: false,
      description: "Icon hiển thị phía sau văn bản nút (ReactNode)"
    },
    asChild: {
      control: "boolean",
      description: "Chuyển quyền render sang thẻ con trực tiếp qua Radix Slot (thường dùng bọc thẻ Link)"
    },
    children: {
      control: "text",
      description: "Nội dung văn bản hoặc element con của nút"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  name: "1. Primary (Mặc định)",
  args: {
    children: "Thuê Mảnh Đất",
    variant: "primary",
    size: "default"
  }
};

export const Secondary: Story = {
  name: "2. Secondary (Hổ phách)",
  args: {
    children: "Thu Hoạch Nông Sản",
    variant: "secondary",
    size: "default"
  }
};

export const Outline: Story = {
  name: "3. Outline (Viền)",
  args: {
    children: "Xem Chi Tiết",
    variant: "outline",
    size: "default"
  }
};

export const Ghost: Story = {
  name: "4. Ghost (Không nền)",
  args: {
    children: "Hủy Bỏ",
    variant: "ghost",
    size: "default"
  }
};

export const Destructive: Story = {
  name: "5. Destructive (Nguy hiểm/Xóa)",
  args: {
    children: "Xóa Mảnh Đất",
    variant: "destructive",
    size: "default",
    leftIcon: <Trash2 className="h-4 w-4" />
  }
};

export const WithIcons: Story = {
  name: "6. Kèm Icon Trước & Sau",
  args: {
    children: "Tạo Mảnh Đất Mới",
    variant: "primary",
    size: "default",
    leftIcon: <Plus className="h-4 w-4" />,
    rightIcon: <ArrowRight className="h-4 w-4" />
  }
};

export const Loading: Story = {
  name: "7. Trạng thái Loading",
  args: {
    children: "Đang Xác Thực...",
    variant: "primary",
    size: "default",
    isLoading: true
  }
};

export const Disabled: Story = {
  name: "8. Trạng thái Disabled",
  args: {
    children: "Chưa Đủ Điều Kiện",
    variant: "primary",
    size: "default",
    disabled: true
  }
};

export const AllSizes: Story = {
  name: "9. Các Kích Thước (Sizes)",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" leftIcon={<LogIn className="h-3.5 w-3.5" />}>
        Nhỏ (sm: 32px)
      </Button>
      <Button size="default" leftIcon={<LogIn className="h-4 w-4" />}>
        Vừa (default: 40px)
      </Button>
      <Button size="lg" leftIcon={<LogIn className="h-5 w-5" />}>
        Lớn (lg: 48px)
      </Button>
      <Button size="icon" aria-label="Icon only">
        <Sprout className="h-4 w-4" />
      </Button>
    </div>
  )
};
