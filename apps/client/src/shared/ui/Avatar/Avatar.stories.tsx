import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Shared/UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📌 Giới thiệu Component
**Avatar** là thành phần hiển thị hình đại diện cho người dùng, chủ đất, nông dân hoặc kỹ thuật viên nông nghiệp. Tích hợp sẵn cơ chế **Fallback 2 chữ cái viết tắt** khi ảnh lỗi/chưa có, và hiển thị trạng thái hoạt động (\`online\`, \`offline\`, \`busy\`).

#### Mục đích sử dụng:
- Header thanh điều hướng tài khoản người dùng.
- Thẻ nông dân chăm sóc thửa đất, danh sách khách hàng thuê.
- Danh sách bình luận hoặc lịch sử hoạt động hệ thống.

#### Cách truyền biến (Props & Usage):
\`\`\`tsx
import { Avatar } from "@/shared/ui";

// Có link ảnh và trạng thái online
<Avatar
  src="https://example.com/avatar.jpg"
  name="Nguyễn Văn An"
  size="md"
  status="online"
/>

// Tự động tính chữ cái viết tắt "NA" khi không có ảnh
<Avatar
  name="Nguyễn An"
  size="lg"
/>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    src: {
      control: "text",
      description: "Đường dẫn URL của ảnh đại diện. Nếu không có hoặc bị lỗi, tự động fallback sang chữ cái viết tắt"
    },
    name: {
      control: "text",
      description: "Họ và tên của người dùng (dùng để sinh chữ cái viết tắt 2 ký tự và gán thuộc tính alt)"
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Kích thước đường kính avatar (sm: 32px, md: 40px, lg: 56px, xl: 80px)",
      table: {
        defaultValue: { summary: "md" }
      }
    },
    status: {
      control: "select",
      options: ["none", "online", "offline", "busy", "story-active"],
      description: "Chỉ báo trạng thái hoạt động gắn ở góc avatar",
      table: {
        defaultValue: { summary: "none" }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const FallbackInitials: Story = {
  name: "1. Fallback Chữ Cái Viết Tắt (Khi không có ảnh)",
  args: {
    name: "Nguyễn Văn An",
    size: "md",
    status: "online"
  }
};

export const WithImage: Story = {
  name: "2. Hiển Thị Ảnh Đại Diện",
  args: {
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    name: "Trần Thị Mai",
    size: "lg",
    status: "online"
  }
};

export const StatusIndicators: Story = {
  name: "3. Các Trạng Thái Hoạt Động (Status)",
  render: () => (
    <div className="flex items-center gap-5">
      <div className="text-center space-y-1">
        <Avatar name="Online User" status="online" size="md" />
        <p className="text-xs text-muted-foreground">Online</p>
      </div>
      <div className="text-center space-y-1">
        <Avatar name="Busy Farmer" status="busy" size="md" />
        <p className="text-xs text-muted-foreground">Bận</p>
      </div>
      <div className="text-center space-y-1">
        <Avatar name="Offline User" status="offline" size="md" />
        <p className="text-xs text-muted-foreground">Offline</p>
      </div>
      <div className="text-center space-y-1">
        <Avatar name="Story Active" status="story-active" size="md" />
        <p className="text-xs text-muted-foreground">Nhật ký mới</p>
      </div>
    </div>
  )
};

export const AllSizes: Story = {
  name: "4. Tất Cả Kích Thước (Sizes)",
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Phạm Minh" size="sm" status="online" />
      <Avatar name="Phạm Minh" size="md" status="online" />
      <Avatar name="Phạm Minh" size="lg" status="online" />
      <Avatar name="Phạm Minh" size="xl" status="online" />
    </div>
  )
};
