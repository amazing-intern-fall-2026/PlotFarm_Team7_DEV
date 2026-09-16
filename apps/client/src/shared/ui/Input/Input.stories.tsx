import type { Meta, StoryObj } from "@storybook/react";
import { Search, Mail, Lock, MapPin, Hash } from "lucide-react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Shared/UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📌 Giới thiệu Component
**Input** là thành phần nhập liệu chuẩn hóa duy nhất của Green Farm, tích hợp sẵn \`label\`, chú thích (\`hint\`), thông báo lỗi (\`error\`), và các vị trí gắn icon trước/sau (\`leftIcon\`, \`rightIcon\`).

#### Cách sử dụng chuẩn FSD:
\`\`\`tsx
import { Input } from "@/shared/ui";

<Input
  placeholder="Tìm kiếm ô đất canh tác..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

<Input
  label="Email liên hệ"
  placeholder="farmer@greenfarm.vn"
  leftIcon={<Mail className="h-4 w-4" />}
  error={errors.email?.message}
  hint="Chúng tôi sẽ gửi hợp đồng qua email này"
/>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    label: {
      control: "text",
      description: "Nhãn tiêu đề hiển thị phía trên ô nhập liệu (tự động liên kết id và htmlFor)"
    },
    placeholder: {
      control: "text",
      description: "Đoạn văn bản gợi ý hiển thị mờ khi ô nhập liệu chưa có giá trị"
    },
    hint: {
      control: "text",
      description: "Đoạn văn bản giải thích hoặc hướng dẫn ngắn phía dưới ô input"
    },
    error: {
      control: "text",
      description: "Thông báo lỗi validation; khi có giá trị sẽ đổi viền input sang màu đỏ cảnh báo"
    },
    disabled: {
      control: "boolean",
      description: "Vô hiệu hóa ô nhập liệu, ngăn người dùng thao tác",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    leftIcon: {
      control: false,
      description: "Icon hoặc element hiển thị bên trái trong ô nhập liệu (ReactNode)"
    },
    rightIcon: {
      control: false,
      description: "Icon hoặc element hiển thị bên phải trong ô nhập liệu (ReactNode)"
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel"],
      description: "Kiểu dữ liệu nhập HTML",
      table: {
        defaultValue: { summary: "text" }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  name: "1. Mặc định (Có Label & Hint)",
  args: {
    label: "Tên trang trại nông nghiệp",
    placeholder: "Ví dụ: Nông Trại Xanh Cầu Đất",
    hint: "Tên này sẽ hiển thị công khai trên danh sách tìm kiếm"
  }
};

export const SearchField: Story = {
  name: "2. Ô Tìm Kiếm (Search)",
  args: {
    placeholder: "Tìm kiếm mảnh đất theo khu vực, diện tích, cây trồng...",
    leftIcon: <Search className="h-4 w-4" />
  }
};

export const EmailInput: Story = {
  name: "3. Nhập Email (Left Icon)",
  args: {
    label: "Địa chỉ Email",
    type: "email",
    placeholder: "nguyenvanan@greenfarm.vn",
    leftIcon: <Mail className="h-4 w-4" />
  }
};

export const PasswordWithToggle: Story = {
  name: "4. Mật Khẩu (Tích hợp sẵn nút ẩn/hiện showPasswordToggle)",
  render: function PasswordStory() {
    return (
      <div className="max-w-sm space-y-4">
        <Input
          label="Mật khẩu tài khoản (Tự động toggle)"
          type="password"
          placeholder="Nhập mật khẩu..."
          leftIcon={<Lock className="h-4 w-4" />}
          showPasswordToggle
          defaultValue="matkhau123"
          hint="Đã vô hiệu hóa icon mắt mặc định của trình duyệt để chỉ hiển thị đúng 1 icon con mắt duy nhất"
        />
      </div>
    );
  }
};

export const WithValidationError: Story = {
  name: "5. Trạng thái Báo Lỗi (Error State)",
  args: {
    label: "Diện tích thửa đất (m²)",
    type: "number",
    defaultValue: "-20",
    error: "Diện tích đất canh tác phải lớn hơn 0",
    leftIcon: <Hash className="h-4 w-4" />
  }
};

export const DisabledField: Story = {
  name: "6. Trạng thái Disabled (Khóa)",
  args: {
    label: "Mã định danh thửa đất (Không thể sửa)",
    defaultValue: "PLOT-DALAT-0824",
    disabled: true,
    leftIcon: <MapPin className="h-4 w-4" />
  }
};
