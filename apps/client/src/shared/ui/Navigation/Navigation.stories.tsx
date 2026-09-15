import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Navigation } from "./Navigation";

const meta: Meta<typeof Navigation> = {
  title: "Shared/UI/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📱 Giới thiệu Component Navigation Đa Vai Trò (Multi-Role)
**Navigation** là thanh điều hướng cố định dưới đáy màn hình trên thiết bị di động (< 1024px).

#### 🌟 Điểm nổi bật:
- **Hỗ trợ đa vai trò qua prop \`role\`**: Tự động áp dụng bộ tabs tối ưu cho từng vai trò:
  - \`role="customer"\`: Trang chủ • Khám phá • Camera 24/7 • Vườn của tôi • Tài khoản
  - \`role="farmer"\`: Nhiệm vụ • Ô đất • Quét QR • Nhật ký • Hồ sơ
  - \`role="admin"\`: Tổng quan • Ô đất • Công việc • Cảnh báo • Cài đặt
- **Khả năng mở rộng**: Vẫn có thể truyền mảng \`items\` tùy biến bất kỳ nếu cần.
- **Tự động đồng bộ**: Hỗ trợ truyền \`activeId\` hoặc \`activeIndex\`.
        `,
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    role: {
      control: "select",
      options: ["customer", "farmer", "admin"],
      description: "Vai trò người dùng để hiển thị bộ tabs chuẩn tương ứng",
      defaultValue: "customer",
    },
    activeIndex: {
      control: "number",
      description: "Index của tab đang active",
    },
    activeId: {
      control: "text",
      description: "ID của tab đang active",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navigation>;

/**
 * 1. Thanh điều hướng cho Khách hàng (Marketplace / Customer)
 */
export const CustomerRole: Story = {
  name: "1. Khách hàng (Customer)",
  args: {
    role: "customer",
    activeIndex: 0,
  },
  render: (args) => (
    <div className="relative h-64 bg-slate-100 dark:bg-slate-900 overflow-hidden">
      <div className="p-4 text-center text-sm text-slate-500">
        Giao diện Khách hàng trên thiết bị di động (Mobile Customer)
      </div>
      <Navigation {...args} className="absolute" />
    </div>
  ),
};

/**
 * 2. Thanh điều hướng cho Nông dân / Kỹ thuật viên (Farmer / Field Ops)
 */
export const FarmerRole: Story = {
  name: "2. Nông dân / Kỹ thuật viên (Farmer)",
  args: {
    role: "farmer",
    activeIndex: 0,
  },
  render: (args) => (
    <div className="relative h-64 bg-emerald-50 dark:bg-slate-900 overflow-hidden">
      <div className="p-4 text-center text-sm text-emerald-800 dark:text-emerald-300 font-medium">
        Giao diện Kỹ thuật viên thực địa (Mobile Farmer)
      </div>
      <Navigation {...args} className="absolute" />
    </div>
  ),
};

/**
 * 3. Thanh điều hướng cho Quản trị viên (Super Admin)
 */
export const AdminRole: Story = {
  name: "3. Quản trị hệ thống (Admin)",
  args: {
    role: "admin",
    activeIndex: 0,
  },
  render: (args) => (
    <div className="relative h-64 bg-slate-100 dark:bg-slate-900 overflow-hidden">
      <div className="p-4 text-center text-sm text-slate-700 dark:text-slate-300 font-medium">
        Giao diện Quản trị viên (Mobile Admin)
      </div>
      <Navigation {...args} className="absolute" />
    </div>
  ),
};

/**
 * 4. Tương tác chuyển đổi vai trò (Interactive Role Switcher)
 */
export const InteractiveRoleSwitcher: Story = {
  name: "4. Tương tác chuyển đổi Vai trò trực tiếp",
  render: function RoleSwitcher() {
    const [selectedRole, setSelectedRole] = React.useState<"customer" | "farmer" | "admin">("customer");
    const [activeTabId, setActiveTabId] = React.useState("home");

    const roleInfo = {
      customer: { name: "Khách hàng (Customer)", defaultId: "home", color: "text-emerald-700" },
      farmer: { name: "Nông dân thực địa (Farmer)", defaultId: "tasks_today", color: "text-amber-700" },
      admin: { name: "Quản trị viên (Super Admin)", defaultId: "overview", color: "text-blue-700" },
    }[selectedRole];

    const handleRoleChange = (role: "customer" | "farmer" | "admin") => {
      setSelectedRole(role);
      if (role === "customer") setActiveTabId("home");
      else if (role === "farmer") setActiveTabId("tasks_today");
      else setActiveTabId("overview");
    };

    return (
      <div className="relative h-80 bg-slate-50 dark:bg-slate-900 overflow-hidden p-4">
        <div className="max-w-md mx-auto space-y-3 text-center">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Chọn vai trò để xem bộ tab tương ứng:
          </p>
          <div className="inline-flex rounded-xl bg-slate-200/80 dark:bg-slate-800 p-1 gap-1">
            <button
              type="button"
              onClick={() => handleRoleChange("customer")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedRole === "customer" ? "bg-white dark:bg-slate-700 shadow-xs text-emerald-700" : "text-slate-600"
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("farmer")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedRole === "farmer" ? "bg-white dark:bg-slate-700 shadow-xs text-amber-700" : "text-slate-600"
              }`}
            >
              Farmer
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("admin")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedRole === "admin" ? "bg-white dark:bg-slate-700 shadow-xs text-blue-700" : "text-slate-600"
              }`}
            >
              Admin
            </button>
          </div>
          <div className="text-xs text-slate-500 pt-2">
            Đang xem: <span className={`font-bold ${roleInfo.color}`}>{roleInfo.name}</span> • Tab active: <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">{activeTabId}</code>
          </div>
        </div>

        <Navigation
          role={selectedRole}
          activeId={activeTabId}
          onTabChange={(_idx, item) => {
            if (item?.id) setActiveTabId(item.id);
          }}
          className="absolute"
        />
      </div>
    );
  },
};
