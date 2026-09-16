import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "Shared/UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📌 Giới thiệu Component
**Separator** là thành phần phân tách thị giác (divider) giữa các khối nội dung, hỗ trợ cả hướng ngang (\`horizontal\`) và hướng dọc (\`vertical\`).

#### Mục đích sử dụng:
- Phân cách giữa các section trong form cài đặt tài khoản.
- Phân cách giữa các mục trong thanh điều hướng (Navbar, Breadcrumbs).
- Chia ranh giới giữa phần nội dung chính và chân thẻ (\`CardFooter\`).

#### Cách truyền biến (Props & Usage):
\`\`\`tsx
import { Separator } from "@/shared/ui";

<Separator orientation="horizontal" className="my-4" />

<div className="flex h-5 items-center space-x-4">
  <span>Trang chủ</span>
  <Separator orientation="vertical" />
  <span>Quản lý đất</span>
</div>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Chiều hiển thị của đường phân cách: ngang (horizontal) hoặc dọc (vertical)",
      table: {
        defaultValue: { summary: "horizontal" }
      }
    },
    decorative: {
      control: "boolean",
      description: "Nếu true, phần tử chỉ mang tính chất trang trí và bỏ qua accessibility tree",
      table: {
        defaultValue: { summary: "true" }
      }
    },
    className: {
      control: "text",
      description: "Tùy biến khoảng cách margin và kích thước qua Tailwind"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  name: "1. Đường Phân Cách Ngang (Horizontal)",
  render: () => (
    <div className="max-w-md space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-foreground">Trang Trại Green Farm Đà Lạt</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Hệ sinh thái kết nối chủ đất nông nghiệp và người thuê canh tác công nghệ cao.
        </p>
      </div>
      <Separator />
      <div className="text-xs text-muted-foreground">
        Được kiểm định chất lượng đất và nguồn nước định kỳ hàng quý.
      </div>
    </div>
  )
};

export const VerticalInNavigation: Story = {
  name: "2. Đường Phân Cách Dọc (Vertical)",
  render: () => (
    <div className="flex h-6 items-center space-x-3 text-sm text-foreground">
      <span className="font-medium hover:text-primary cursor-pointer">Tổng Quan</span>
      <Separator orientation="vertical" />
      <span className="font-medium hover:text-primary cursor-pointer">Thửa Đất</span>
      <Separator orientation="vertical" />
      <span className="font-medium hover:text-primary cursor-pointer">Cảm Biến IoT</span>
      <Separator orientation="vertical" />
      <span className="font-medium hover:text-primary cursor-pointer">Nhật Ký Nông Vụ</span>
    </div>
  )
};
