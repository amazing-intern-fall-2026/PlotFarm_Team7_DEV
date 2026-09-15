import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Shared/UI/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 🧭 Giới thiệu Component Header Đa Vai Trò (Multi-Role Header)
**Header** là thanh điều hướng trên cùng (Top Navigation) thông minh, được kiến trúc để phục vụ linh hoạt cho cả **3 vai trò**:
- \`role="customer"\`: Marketplace Khách hàng (Menu khám phá ô đất, hotline 1900 6868, giỏ hàng, thông báo).
- \`role="farmer"\`: Field Ops Kỹ thuật viên (Badge Kỹ thuật viên, menu nhiệm vụ canh tác, phím tắt quét mã QR).
- \`role="admin"\`: Super Admin Quản trị (Badge Quản trị hệ thống, thanh tìm kiếm toàn cục, cảnh báo vi khí hậu).

#### 💡 Cách sử dụng:
\`\`\`tsx
import { Header } from "@/shared/ui/Header";

// 1. Giao diện Khách hàng
<Header role="customer" user={{ name: "Nguyễn Văn An" }} notificationCount={2} />

// 2. Giao diện Kỹ thuật viên / Nông dân
<Header role="farmer" user={{ name: "Kỹ sư Bác Bảy" }} notificationCount={5} />

// 3. Giao diện Quản trị viên
<Header role="admin" user={{ name: "Admin Trưởng" }} notificationCount={8} />
\`\`\`
        `,
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    role: {
      control: "select",
      options: ["customer", "farmer", "admin"],
      description: "Vai trò người dùng để hiển thị giao diện và menu tương ứng",
      defaultValue: "customer",
    },
    notificationCount: {
      control: "number",
      description: "Số lượng thông báo chưa đọc",
      defaultValue: 3,
    },
    activeNavId: {
      control: "text",
      description: "ID menu đang được kích hoạt",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

/**
 * 1. Giao diện Khách hàng (Customer Marketplace)
 */
export const CustomerRole: Story = {
  name: "1. Khách hàng (Customer)",
  args: {
    role: "customer",
    user: { name: "Nguyễn Văn An" },
    notificationCount: 3,
    activeNavId: "home",
  },
};

/**
 * 2. Giao diện Nông dân / Kỹ thuật viên (Farmer Field Ops)
 */
export const FarmerRole: Story = {
  name: "2. Kỹ thuật viên / Nông dân (Farmer)",
  args: {
    role: "farmer",
    user: { name: "Kỹ sư Bác Bảy" },
    notificationCount: 5,
    activeNavId: "tasks_today",
  },
};

/**
 * 3. Giao diện Quản trị hệ thống (Super Admin)
 */
export const AdminRole: Story = {
  name: "3. Quản trị hệ thống (Admin)",
  args: {
    role: "admin",
    user: { name: "Quản trị viên Hệ thống" },
    notificationCount: 2,
    activeNavId: "overview",
  },
};

/**
 * 4. Khách vãng lai (Chưa đăng nhập)
 */
export const GuestCustomer: Story = {
  name: "4. Khách vãng lai (Chưa đăng nhập)",
  args: {
    role: "customer",
    user: null,
    notificationCount: 0,
    activeNavId: "home",
  },
};

/**
 * 5. Chuyển đổi trực tiếp giữa 3 Vai trò (Interactive Role Switcher)
 */
export const InteractiveRoleSwitcher: Story = {
  name: "5. Tương tác chuyển đổi Vai trò trực tiếp",
  render: function RoleSwitcherHeader() {
    const [selectedRole, setSelectedRole] = React.useState<"customer" | "farmer" | "admin">("customer");
    const [activeId, setActiveId] = React.useState("home");

    const handleRoleChange = (role: "customer" | "farmer" | "admin") => {
      setSelectedRole(role);
      if (role === "customer") setActiveId("home");
      else if (role === "farmer") setActiveId("tasks_today");
      else setActiveId("overview");
    };

    const userInfo = {
      customer: { name: "Khách hàng Nguyễn Văn An" },
      farmer: { name: "Kỹ thuật viên Bác Bảy" },
      admin: { name: "Super Admin Điều Hành" },
    }[selectedRole];

    return (
      <div className="space-y-6 bg-slate-50 dark:bg-slate-900 min-h-[400px] pb-12">
        {/* Bộ điều khiển Role */}
        <div className="p-4 bg-white dark:bg-slate-950 border-b border-border shadow-xs">
          <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Chọn vai trò để xem Header biến đổi:
              </p>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Vai trò đang chọn: <span className="text-primary capitalize">{selectedRole}</span>
              </p>
            </div>
            <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 gap-1">
              <button
                type="button"
                onClick={() => handleRoleChange("customer")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedRole === "customer" ? "bg-white dark:bg-slate-700 shadow-xs text-primary" : "text-slate-600"
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange("farmer")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedRole === "farmer" ? "bg-white dark:bg-slate-700 shadow-xs text-emerald-700" : "text-slate-600"
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
          </div>
        </div>

        {/* Component Header hiển thị theo vai trò đã chọn */}
        <div className="border border-border/80 rounded-xl overflow-hidden max-w-7xl mx-auto shadow-sm">
          <Header
            role={selectedRole}
            user={userInfo}
            activeNavId={activeId}
            onNavChange={setActiveId}
            notificationCount={selectedRole === "admin" ? 2 : selectedRole === "farmer" ? 5 : 1}
          />

          <div className="p-8 text-center bg-white dark:bg-slate-950 text-slate-500 text-sm">
            Nội dung trang theo phân hệ <strong className="text-primary capitalize">{selectedRole}</strong>.
            Nhấp vào các mục menu thanh trên để kiểm tra active state!
          </div>
        </div>
      </div>
    );
  },
};
