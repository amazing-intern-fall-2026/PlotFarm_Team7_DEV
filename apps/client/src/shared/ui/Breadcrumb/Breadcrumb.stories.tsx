import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./Breadcrumb";
import { Sprout, Layers, ShieldCheck, Slash } from "lucide-react";

const meta: Meta<typeof Breadcrumb> = {
  title: "Shared/UI/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 🍞 Giới thiệu Component Breadcrumb
**Breadcrumb** là thành phần điều hướng phân cấp dạng đường dẫn, giúp người dùng xác định vị trí hiện tại trong cấu trúc website và quay lại các cấp trước đó dễ dàng.

#### 🌟 Điểm nổi bật:
- **Hỗ trợ 2 phương thức sử dụng**:
  1. *Data-driven qua prop \`items\`*: Truyền mảng tiện lợi, tự động sinh mã phân cách.
  2. *Compound Components*: Tùy biến tối đa với \`BreadcrumbList\`, \`BreadcrumbItem\`, \`BreadcrumbLink\`, \`BreadcrumbPage\`, \`BreadcrumbSeparator\`.
- **Biểu tượng Home chuyên dụng**: Hỗ trợ hiển thị icon ngôi nhà sắc nét ở đầu đường dẫn tương tự mẫu thiết kế chuẩn.
- **Tiêu chuẩn Trợ năng (Accessibility - A11y)**: Sử dụng cấu trúc ngữ nghĩa \`<nav>\`, \`<ol>\`, \`<li>\` cùng thuộc tính \`aria-current="page"\`.
        `,
      },
    },
    layout: "padded",
  },
  argTypes: {
    showHomeIcon: {
      control: "boolean",
      description: "Bật/tắt biểu tượng Home ở đầu đường dẫn",
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

/**
 * 1. Mẫu thiết kế chuẩn theo yêu cầu: Cart > Delivery > Service > Overview
 */
export const ReferenceSample: Story = {
  name: "1. Mẫu tham khảo (Cart > Delivery > Service > Overview)",
  render: () => (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-border">
      <Breadcrumb
        showHomeIcon
        items={[
          { label: "Cart", href: "#cart" },
          { label: "Delivery", href: "#delivery" },
          { label: "Service", href: "#service" },
          { label: "Overview", isActive: true },
        ]}
      />
    </div>
  ),
};

/**
 * 2. Đường dẫn Nông trại Thực nghiệm (Green Farm Flow)
 */
export const PlotSelectionFlow: Story = {
  name: "2. Quy trình chọn ô đất (Green Farm Flow)",
  render: () => (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-border">
      <Breadcrumb
        showHomeIcon
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Khám phá ô đất", href: "/plots", icon: <Layers className="h-4 w-4 text-emerald-600" /> },
          { label: "Khu A Đà Lạt", href: "/plots?zone=A" },
          { label: "Ô A-104 (Cải cầu vồng)", icon: <Sprout className="h-4 w-4 text-primary" />, isActive: true },
        ]}
      />
    </div>
  ),
};

/**
 * 3. Phân hệ Quản trị hệ thống (Admin Breadcrumb)
 */
export const AdminHierarchy: Story = {
  name: "3. Quản trị hệ thống (Admin Hierarchy)",
  render: () => (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-border">
      <Breadcrumb
        items={[
          { label: "Quản trị", href: "/admin", icon: <ShieldCheck className="h-4 w-4 text-blue-600" /> },
          { label: "Quản lý hợp đồng", href: "/admin/contracts" },
          { label: "Hợp đồng điện tử #HD-2025-089", isActive: true },
        ]}
      />
    </div>
  ),
};

/**
 * 4. Đường dẫn dài có thu gọn (Ellipsis / Truncated)
 */
export const WithEllipsis: Story = {
  name: "4. Thu gọn cấp độ sâu (Ellipsis)",
  render: () => (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-border">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-rose-500 hover:text-rose-600">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M12 2.1 1 12h3v9h6v-6h4v6h6v-9h3L12 2.1z" />
              </svg>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/farmer">Nông dân</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/farmer/tasks">Nhiệm vụ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Thực thi tác vụ bón phân A-104</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
};

/**
 * 5. Dấu phân cách tùy biến (Custom Separator - Dấu gạch chéo Slash)
 */
export const CustomSlashSeparator: Story = {
  name: "5. Dấu phân cách Slash (/)",
  render: () => (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-border">
      <Breadcrumb
        showHomeIcon
        separator={<Slash className="h-3 w-3 text-slate-300 stroke-[2]" />}
        items={[
          { label: "Nông trại", href: "#farm" },
          { label: "Thiết bị IoT", href: "#iot" },
          { label: "Trạm đo khí tượng Cầu Đất", isActive: true },
        ]}
      />
    </div>
  ),
};

/**
 * 6. Tương tác chuyển đổi bước (Interactive Step Switcher)
 */
export const InteractiveBreadcrumb: Story = {
  name: "6. Tương tác chọn bước trực tiếp",
  render: function InteractiveComponent() {
    const [currentStep, setCurrentStep] = React.useState("Service");
    const steps = ["Cart", "Delivery", "Service", "Overview"];

    return (
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-border space-y-4">
        <Breadcrumb
          showHomeIcon
          items={steps.map((step) => ({
            label: step,
            onClick: () => setCurrentStep(step),
            isActive: step === currentStep,
          }))}
        />
        <div className="pt-2 text-xs text-muted-foreground border-t border-border">
          Bước đang chọn: <span className="font-bold text-primary">{currentStep}</span> (Bấm vào các liên kết trên thanh Breadcrumb để chuyển bước)
        </div>
      </div>
    );
  },
};
