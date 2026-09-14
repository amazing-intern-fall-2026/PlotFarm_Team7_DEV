import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "Shared/UI/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📌 Giới thiệu Component
**Logo** là biểu tượng nhận diện thương hiệu chính thức của hệ thống **Green Farm** với hình ảnh mái nhà nông trại và chồi lá xanh mát vươn lên đặc trưng.

#### Mục đích sử dụng:
- Thanh điều hướng chính (Header / Navbar).
- Đầu trang đăng nhập, đăng ký tài khoản và trang giới thiệu.
- Icon favicon và biểu tượng ứng dụng.

#### Cách truyền biến (Props & Usage):
\`\`\`tsx
import { Logo } from "@/shared/ui";

// Icon mầm cây xanh kèm chữ thương hiệu
<Logo size="md" showText />

// Chỉ hiển thị icon mầm cây
<Logo size="sm" />
\`\`\`
        `
      }
    }
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Kích thước của biểu tượng logo (sm: 28px, md: 36px, lg: 48px, xl: 64px)",
      table: {
        defaultValue: { summary: "md" }
      }
    },
    showText: {
      control: "boolean",
      description: "Hiển thị kèm tên chữ thương hiệu Green Farm",
      table: {
        defaultValue: { summary: "false" }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const DefaultIcon: Story = {
  name: "1. Biểu Tượng Icon Mặc Định",
  args: {
    size: "md",
    showText: false
  }
};

export const WithBrandText: Story = {
  name: "2. Kèm Tên Thương Hiệu Green Farm",
  args: {
    size: "md",
    showText: true
  }
};

export const AllSizes: Story = {
  name: "3. Các Kích Thước (Sizes)",
  render: () => (
    <div className="flex items-center gap-6">
      <div className="text-center space-y-2">
        <Logo size="sm" />
        <p className="text-xs text-muted-foreground">sm (28px)</p>
      </div>
      <div className="text-center space-y-2">
        <Logo size="md" />
        <p className="text-xs text-muted-foreground">md (36px)</p>
      </div>
      <div className="text-center space-y-2">
        <Logo size="lg" />
        <p className="text-xs text-muted-foreground">lg (48px)</p>
      </div>
      <div className="text-center space-y-2">
        <Logo size="xl" />
        <p className="text-xs text-muted-foreground">xl (64px)</p>
      </div>
    </div>
  )
};
