import type { Meta, StoryObj } from "@storybook/react";
import { Topbar } from "./Topbar";

const meta: Meta<typeof Topbar> = {
  title: "Shared/UI/Topbar",
  component: Topbar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 🖥️ Giới thiệu Component Topbar
**Topbar** là thanh điều hướng trên cùng dạng Dashboard bar dành cho **Admin** và **Farmer**.

#### 🌟 Đặc điểm nổi bật:
- **Ô tìm kiếm bên trái**: Tích hợp shortcut \`Ctrl+K\` và hiệu ứng focus viền xanh thương hiệu Green Farm.
- **Nút Menu trên di động (Mobile Hamburger)**: Tự động hiện khi kích thước màn hình nhỏ hơn \`1024px\`.
- **Thông báo thông minh**: Tự động hiển thị huy hiệu số thông báo chưa đọc với biến thể \`99+\`.
- **Thông tin người dùng**: Tích hợp Avatar trực tuyến cùng nhãn phân quyền theo vai trò (Kỹ thuật viên / Quản trị viên).
        `,
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    notificationCount: {
      control: "number",
      description: "Số lượng thông báo chưa đọc",
    },
    searchPlaceholder: {
      control: "text",
      description: "Nội dung placeholder trong thanh tìm kiếm",
    },
    roleBadgeLabel: {
      control: "text",
      description: "Tên nhãn huy hiệu vai trò người dùng",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Topbar>;

/**
 * 1. Topbar cho Nông dân (Farmer)
 */
export const FarmerTopbar: Story = {
  name: "1. Kỹ thuật viên (Farmer)",
  args: {
    user: {
      name: "Nguyễn Văn Nông",
      role: "farmer",
      avatarSrc: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    },
    roleBadgeLabel: "Kỹ thuật viên",
    notificationCount: 3,
    searchPlaceholder: "Tìm kiếm thửa đất, thiết bị, nhật ký...",
  },
  render: (args) => (
    <div className="bg-slate-100 dark:bg-slate-900 p-4">
      <div className="rounded-xl overflow-hidden shadow-sm">
        <Topbar {...args} />
      </div>
    </div>
  ),
};

/**
 * 2. Topbar cho Quản trị viên (Admin)
 */
export const AdminTopbar: Story = {
  name: "2. Quản trị hệ thống (Admin)",
  args: {
    user: {
      name: "Trần Quản Trị",
      role: "admin",
      avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
    roleBadgeLabel: "Quản trị viên",
    notificationCount: 104,
    searchPlaceholder: "Tìm kiếm hợp đồng, người dùng, giao dịch...",
  },
  render: (args) => (
    <div className="bg-slate-100 dark:bg-slate-900 p-4">
      <div className="rounded-xl overflow-hidden shadow-sm">
        <Topbar {...args} />
      </div>
    </div>
  ),
};

/**
 * 3. Trạng thái không có thông báo & Chưa đăng nhập
 */
export const MinimalTopbar: Story = {
  name: "3. Tối giản (Không thông báo)",
  args: {
    notificationCount: 0,
    searchPlaceholder: "Tìm kiếm nhanh...",
  },
  render: (args) => (
    <div className="bg-slate-100 dark:bg-slate-900 p-4">
      <div className="rounded-xl overflow-hidden shadow-sm">
        <Topbar {...args} />
      </div>
    </div>
  ),
};
