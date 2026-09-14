import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";
import { Button } from "@/shared/ui/Button";

const meta: Meta<typeof Footer> = {
  title: "Shared/UI/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📌 Giới thiệu Component Footer (Green Farm)
**Footer** là thành phần chân trang chính cho phân hệ Customer / Marketplace, được thiết kế theo nhận diện thực tế của **Green Farm**.

#### 📐 Cấu trúc 4 cột thông tin:
1. **Green Farm & Chứng chỉ**: Logo mầm cây xanh đậm, giới thiệu nền tảng và 3 huy hiệu tiêu chuẩn: \`VietGAP Certified\`, \`GlobalGAP 100%\`, \`Organic Bio\`.
2. **Phân Hệ Canh Tác**: Khám phá ô đất, Quản lý vườn, Nhật ký nông vụ, Thư viện ảnh.
3. **Tài Khoản & Pháp Lý**: Cài đặt tài khoản, Hợp đồng thuê đất số, Cam kết tiêu chuẩn, Bảo hiểm rủi ro.
4. **Trang Trại Đà Lạt**: Địa chỉ Đạ Sar (Lạc Dương, Đà Lạt), Hotline kỹ sư nông học 1900 6868, Email kỹ thuật.
5. **Thanh bản quyền (Sub-footer)**: Bản quyền 2026 & liên kết Bảo mật dữ liệu IoT, Tiêu chuẩn nông sản sạch.
6. **Skeleton Loading Tái Sử Dụng**: Tích hợp trực tiếp qua component \`State\` (\`variant="skeleton"\`, \`skeletonPreset="grid"\`), loại bỏ code trùng lặp.

#### 💡 Cách sử dụng:
\`\`\`tsx
import { Footer } from "@/shared/ui/Footer";

// Hiển thị bình thường
<Footer brandName="Green Farm" />

// Hiển thị trạng thái Skeleton Loading (tái sử dụng qua State)
<Footer isLoading />
\`\`\`
        `,
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    brandName: {
      control: "text",
      description: "Tên thương hiệu hiển thị ở cột 1",
      defaultValue: "Green Farm",
    },
    isLoading: {
      control: "boolean",
      description: "Bật/tắt trạng thái Skeleton loading qua State",
      defaultValue: false,
    },
    className: {
      control: "text",
      description: "Class CSS tùy biến",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

/**
 * 1. Chân trang mặc định chuẩn Green Farm
 */
export const Default: Story = {
  name: "1. Mặc định (Green Farm)",
  args: {
    brandName: "Green Farm",
    isLoading: false,
  },
};

/**
 * 2. Trạng thái Skeleton Loading khi đang tải dữ liệu
 */
export const LoadingSkeleton: Story = {
  name: "2. Trạng thái Skeleton Loading",
  args: {
    isLoading: true,
  },
};

/**
 * 3. Tương tác bật/tắt Skeleton Loading ngay trong Storybook
 */
export const InteractiveToggle: Story = {
  name: "3. Tương tác Bật / Tắt Skeleton",
  render: function InteractiveFooter() {
    const [loading, setLoading] = React.useState(false);

    return (
      <div className="flex flex-col min-h-screen justify-between bg-background">
        <div className="p-6 max-w-xl mx-auto text-center space-y-3">
          <h2 className="text-xl font-bold text-foreground">
            Kiểm thử chuyển đổi Skeleton Loading
          </h2>
          <p className="text-sm text-muted-foreground">
            Bấm nút dưới đây để kiểm tra hiệu ứng chuyển đổi mượt mà giữa trạng thái đang tải (Skeleton tái sử dụng qua State) và đã tải xong:
          </p>
          <Button
            onClick={() => setLoading((prev) => !prev)}
            variant={loading ? "secondary" : "default"}
          >
            {loading ? "Đang tải (Bấm để xem Footer đầy đủ)" : "Đã tải xong (Bấm để xem Skeleton)"}
          </Button>
        </div>

        <Footer isLoading={loading} />
      </div>
    );
  },
};

/**
 * 4. Tùy biến tên thương hiệu (Custom Brand)
 */
export const CustomBrand: Story = {
  name: "4. Tùy biến Thương hiệu (Green Farm)",
  args: {
    brandName: "Green Farm Eco",
    isLoading: false,
  },
};

/**
 * 5. Chân trang ở chế độ Tối (Dark Theme)
 */
export const DarkTheme: Story = {
  name: "5. Chế độ Tối (Dark Mode)",
  render: () => (
    <div className="dark bg-background min-h-[400px]">
      <Footer />
    </div>
  ),
};
