import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AlertTriangle, Plus } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { Input } from "../Input";

const meta: Meta<typeof Modal> = {
  title: "Shared/UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📌 Giới thiệu Component
**Modal** là hộp thoại lớp phủ nổi (dialog popup overlay), khóa cuộn trang nền và hỗ trợ đóng an toàn bằng phím \`ESC\`, nút \`X\` hoặc click ra vùng nền tối (backdrop).

#### Mục đích sử dụng:
- Hộp thoại xác nhận các thao tác quan trọng (Hủy thuê thửa đất, Xóa lịch thu hoạch).
- Mở form tương tác nhanh (Thêm thửa đất mới, Gửi phản hồi kỹ thuật).
- Hiển thị thông báo, điều khoản hợp đồng thuê đất.

#### Cách truyền biến (Props & Usage):
\`\`\`tsx
import { useState } from "react";
import { Modal, Button } from "@/shared/ui";

const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Mở Hộp Thoại</Button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Xác nhận hủy hợp đồng"
  description="Thao tác này không thể hoàn tác"
  footer={
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={() => setIsOpen(false)}>Đóng</Button>
      <Button variant="destructive" onClick={handleCancel}>Xác nhận hủy</Button>
    </div>
  }
>
  <p>Bạn có chắc chắn muốn hủy hợp đồng thuê lô đất này?</p>
</Modal>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Điều khiển hiển thị mở hoặc đóng modal",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    inline: {
      control: "boolean",
      description: "Hiển thị dạng khối nhúng (inline preview) không backdrop cố định, phục vụ tài liệu hoặc xem trước",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    onClose: {
      description: "Hàm callback kích hoạt khi người dùng nhấn nút đóng, click nền đen hoặc nhấn ESC"
    },
    title: {
      control: "text",
      description: "Tiêu đề chính của modal (h2)"
    },
    description: {
      control: "text",
      description: "Đoạn văn bản mô tả phụ giải thích ngữ cảnh bên dưới tiêu đề"
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Độ rộng tối đa của khung modal (sm: max-w-sm, md: max-w-lg, lg: max-w-xl, xl: max-w-2xl)",
      table: {
        defaultValue: { summary: "md" }
      }
    },
    showCloseButton: {
      control: "boolean",
      description: "Bật/tắt nút đóng 'X' ở góc trên bên phải modal",
      table: {
        defaultValue: { summary: "true" }
      }
    },
    footer: {
      control: false,
      description: "Khu vực chân modal chứa các nút hành động (ReactNode)"
    },
    children: {
      control: false,
      description: "Nội dung thân modal (ReactNode)"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const ConfirmationDialog: Story = {
  name: "1. Hộp Thoại Xác Nhận Hủy Thuê Đất",
  args: {
    isOpen: true,
    inline: true,
    title: "Xác nhận hủy hợp đồng thuê",
    description: "Vui lòng xem xét kỹ trước khi xác nhận hành động này.",
    children: (
      <div className="flex gap-3 items-start p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <p className="text-sm text-foreground">
          Sau khi hủy hợp đồng với Lô A-12, quyền canh tác và dữ liệu camera giám sát sẽ ngừng kích hoạt ngay lập tức.
        </p>
      </div>
    ),
    footer: (
      <div className="flex justify-end gap-2 w-full">
        <Button variant="outline" size="sm">
          Xem Lại
        </Button>
        <Button variant="destructive" size="sm">
          Xác Nhận Hủy
        </Button>
      </div>
    )
  }
};

export const FormModalExample: Story = {
  name: "2. Hộp Thoại Nhập Liệu / Form Nhanh",
  args: {
    isOpen: true,
    inline: true,
    title: "Tạo Yêu Cầu Chăm Sóc Đất",
    description: "Gửi chỉ dẫn canh tác cho kỹ thuật viên phụ trách thửa đất của bạn.",
    children: (
      <div className="space-y-4 py-2">
        <Input
          label="Tiêu đề yêu cầu"
          placeholder="Ví dụ: Bổ sung thêm nước tưới và tỉa cành"
        />
        <Input
          label="Ghi chú thêm"
          placeholder="Yêu cầu kiểm tra kỹ sâu cuốn lá ở luống số 3"
        />
      </div>
    ),
    footer: (
      <div className="flex justify-end gap-2 w-full">
        <Button variant="ghost" size="sm">
          Hủy Bỏ
        </Button>
        <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
          Gửi Yêu Cầu
        </Button>
      </div>
    )
  }
};

export const InteractiveModal: Story = {
  name: "3. Thử Nghiệm Tương Tác (Mở / Đóng Modal Thật)",
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <div className="flex flex-col items-center justify-center p-8 gap-4">
        <Button onClick={() => setIsOpen(true)}>
          Mở Hộp Thoại (Interactive Modal)
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Thông Báo Hoạt Động"
          description="Kiểm tra tương tác đóng bằng ESC, nút X hoặc click ngoài nền"
          footer={
            <Button variant="default" onClick={() => setIsOpen(false)}>
              Hoàn Tất
            </Button>
          }
        >
          <p className="text-foreground">
            Hộp thoại này đang hiển thị ở chế độ lớp phủ thực tế (Overlay Popup).
            Bạn có thể thử nhấn phím ESC hoặc click ra ngoài vùng nền mờ để đóng.
          </p>
        </Modal>
      </div>
    );
  }
};
