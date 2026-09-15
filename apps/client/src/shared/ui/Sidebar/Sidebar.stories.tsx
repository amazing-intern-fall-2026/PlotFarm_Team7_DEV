import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LayoutDashboard,
  Sprout,
  CalendarCheck,
  AlertTriangle,
  Settings,
  QrCode,
  FileText,
  User,
  LogOut
} from "lucide-react";
import { Sidebar, type SidebarSection } from "./Sidebar";
import { Avatar } from "@/shared/ui/Avatar";

const meta: Meta<typeof Sidebar> = {
  title: "Shared/UI/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 🧭 Giới thiệu Component Sidebar
**Sidebar** là thanh điều hướng bên trái cố định dành cho **Admin** và **Farmer** trên màn hình máy tính để bàn (Desktop).

#### 🌟 Đặc điểm nổi bật:
- **Hai trạng thái thu gọn linh hoạt**:
  - *Expanded* (240px): Hiển thị đầy đủ Logo thương hiệu, text nhóm (section title), icon và nhãn của từng chức năng cùng badge thông báo.
  - *Collapsed* (68px): Chỉ hiển thị icon tinh gọn và badge chấm đỏ, tối ưu hóa không gian làm việc.
- **Phân nhóm menu khoa học**: Hỗ trợ chia mục theo mảng (Tổng quan, Vận hành thực địa, Hệ thống).
- **Khu vực chân trang (Footer Slot)**: Tích hợp thông tin tài khoản hoặc nút đăng xuất nhanh.
        `,
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    activeItemId: {
      control: "text",
      description: "ID của mục đang được kích hoạt",
    },
    collapseLabel: {
      control: "text",
      description: "Nhãn nút thu gọn",
    },
    expandLabel: {
      control: "text",
      description: "Nhãn nút mở rộng",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const FARMER_SECTIONS: SidebarSection[] = [
  {
    title: "VẬN HÀNH",
    items: [
      { id: "tasks", label: "Nhiệm vụ hôm nay", icon: <CalendarCheck className="h-5 w-5" />, badge: "5" },
      { id: "plots", label: "Quản lý ô đất", icon: <Sprout className="h-5 w-5" /> },
      { id: "qr", label: "Quét QR thiết bị", icon: <QrCode className="h-5 w-5" /> },
      { id: "logs", label: "Nhật ký canh tác", icon: <FileText className="h-5 w-5" /> },
    ],
  },
  {
    title: "HỆ THỐNG",
    items: [
      { id: "alerts", label: "Cảnh báo vi khí hậu", icon: <AlertTriangle className="h-5 w-5" />, badge: "2" },
      { id: "profile", label: "Hồ sơ kỹ thuật viên", icon: <User className="h-5 w-5" /> },
    ],
  },
];

const ADMIN_SECTIONS: SidebarSection[] = [
  {
    title: "TỔNG QUAN",
    items: [
      { id: "dashboard", label: "Bảng điều khiển", icon: <LayoutDashboard className="h-5 w-5" /> },
      { id: "all_plots", label: "Hệ thống ô đất", icon: <Sprout className="h-5 w-5" />, badge: "48" },
      { id: "work_orders", label: "Lệnh sản xuất", icon: <CalendarCheck className="h-5 w-5" />, badge: "12" },
    ],
  },
  {
    title: "QUẢN TRỊ",
    items: [
      { id: "all_alerts", label: "Cảnh báo & Rủi ro", icon: <AlertTriangle className="h-5 w-5" />, badge: "3" },
      { id: "settings", label: "Cài đặt nền tảng", icon: <Settings className="h-5 w-5" /> },
    ],
  },
];

/**
 * 1. Thanh Sidebar cho Nông dân / Kỹ thuật viên (Farmer)
 */
export const FarmerSidebar: Story = {
  name: "1. Nông dân / Kỹ thuật viên (Farmer)",
  args: {
    sections: FARMER_SECTIONS,
    activeItemId: "tasks",
    collapseLabel: "Thu gọn",
    expandLabel: "Mở rộng",
    footer: (
      <div className="flex items-center gap-3 w-full">
        <Avatar name="Nguyễn Nông" size="md" status="online" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground truncate">Nguyễn Văn Nông</p>
          <p className="text-xs text-muted-foreground truncate">Kỹ thuật viên Lô A</p>
        </div>
        <button
          type="button"
          title="Đăng xuất"
          aria-label="Đăng xuất"
          className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-accent shrink-0 ml-auto"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    ),
  },
  render: (args) => (
    <div className="flex h-[680px] bg-slate-100 dark:bg-slate-900 p-4">
      <Sidebar {...args} className="!flex h-full static shadow-lg rounded-2xl overflow-hidden" />
      <div className="flex-1 p-6 text-sm text-slate-500">
        Khu vực nội dung chính của màn hình Farmer (Main Content Area)
      </div>
    </div>
  ),
};

/**
 * 2. Thanh Sidebar cho Quản trị viên (Admin)
 */
export const AdminSidebar: Story = {
  name: "2. Quản trị hệ thống (Admin)",
  args: {
    sections: ADMIN_SECTIONS,
    activeItemId: "dashboard",
    collapseLabel: "Thu gọn",
    expandLabel: "Mở rộng",
    footer: (
      <div className="flex items-center gap-3 w-full">
        <Avatar name="Ban Trị" size="md" status="online" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground truncate">Admin Green Farm</p>
          <p className="text-xs text-muted-foreground truncate">Toàn quyền hệ thống</p>
        </div>
      </div>
    ),
  },
  render: (args) => (
    <div className="flex h-[680px] bg-slate-100 dark:bg-slate-900 p-4">
      <Sidebar {...args} className="!flex h-full static shadow-lg rounded-2xl overflow-hidden" />
      <div className="flex-1 p-6 text-sm text-slate-500">
        Khu vực nội dung chính của màn hình Admin (Main Content Area)
      </div>
    </div>
  ),
};

/**
 * 3. Tương tác chuyển đổi mục active (Interactive Selection)
 */
export const InteractiveSidebar: Story = {
  name: "3. Tương tác chọn mục trực tiếp",
  render: function InteractiveComponent() {
    const [activeId, setActiveId] = React.useState("plots");

    const interactiveSections: SidebarSection[] = FARMER_SECTIONS.map((sec) => ({
      ...sec,
      items: sec.items.map((it) => ({
        ...it,
        onClick: () => setActiveId(it.id ?? ""),
      })),
    }));

    return (
      <div className="flex h-[680px] bg-slate-100 dark:bg-slate-900 p-4">
        <Sidebar
          sections={interactiveSections}
          activeItemId={activeId}
          className="!flex h-full static shadow-lg rounded-2xl overflow-hidden"
          footer={
            <div className="px-3 py-2 text-[11px] text-muted-foreground bg-muted/40 rounded-lg">
              Mục đang chọn: <span className="font-bold text-primary">{activeId}</span>
            </div>
          }
        />
        <div className="flex-1 p-8 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Khu vực hiển thị nội dung</h2>
          <p className="text-sm text-muted-foreground">
            Bấm vào bất kỳ mục menu nào ở Sidebar bên trái để đổi trạng thái active hoặc bấm nút &apos;Thu gọn&apos; ở chân trang.
          </p>
          <div className="p-4 rounded-xl border border-border bg-white dark:bg-slate-800">
            <span className="text-xs font-semibold uppercase text-muted-foreground">Trang hiện tại:</span>
            <p className="text-lg font-bold text-primary mt-1 capitalize">{activeId}</p>
          </div>
        </div>
      </div>
    );
  },
};
