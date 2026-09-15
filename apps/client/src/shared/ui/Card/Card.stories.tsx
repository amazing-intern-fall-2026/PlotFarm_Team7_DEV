import type { Meta, StoryObj } from "@storybook/react";
import { Sprout, MapPin, Calendar, ArrowRight, User } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "./Card";
import { Button } from "../Button";
import { Badge } from "../Badge";

const meta: Meta<typeof Card> = {
  title: "Shared/UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📌 Giới thiệu Component
**Card** là thành phần container dạng thẻ nguyên tử, tạo bố cục đóng gói nội dung trực quan với viền mềm (\`border-border\`), nền thẻ (\`bg-card\`) và đổ bóng nhẹ.

#### Cấu trúc các thành phần con:
- \`Card\`: Container bao bọc ngoài cùng.
- \`CardHeader\`: Phần đầu của thẻ, chứa tiêu đề và mô tả.
- \`CardTitle\`: Thẻ tiêu đề cấp h3 chuẩn hóa font chữ.
- \`CardDescription\`: Đoạn mô tả mờ \`text-muted-foreground\`.
- \`CardContent\`: Khu vực chứa nội dung chính.
- \`CardFooter\`: Phần chân thẻ dành cho nút hành động, thông tin bổ sung.

#### Cách truyền biến (Props & Usage):
\`\`\`tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@/shared/ui";

<Card>
  <CardHeader>
    <CardTitle>Thửa Đất Cầu Đất 01</CardTitle>
    <CardDescription>Đà Lạt, Lâm Đồng</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Diện tích: 500m² - Đất đỏ Bazan</p>
  </CardContent>
  <CardFooter>
    <Button size="sm">Xem Chi Tiết</Button>
  </CardFooter>
</Card>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    className: {
      control: "text",
      description: "Class Tailwind tùy biến kiểu dáng, padding hoặc độ rộng của Card"
    },
    children: {
      control: false,
      description: "Các component con của Card (CardHeader, CardContent, CardFooter...)"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

export const PlotOverviewCard: Story = {
  name: "1. Thẻ Thông Tin Thửa Đất Nông Nghiệp",
  render: () => (
    <Card className="max-w-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-36 bg-gradient-to-br from-emerald-700 to-green-900 p-4 flex flex-col justify-between text-white">
        <div className="flex justify-between items-center">
          <Badge variant="secondary">Sắp Thu Hoạch</Badge>
          <span className="text-xs bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded font-mono">
            LÔ A-08
          </span>
        </div>
        <div>
          <div className="text-xs text-emerald-200 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> Cầu Đất, TP. Đà Lạt
          </div>
          <h4 className="text-base font-bold text-white mt-0.5">Vườn Rau Thủy Canh Công Nghệ Cao</h4>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-base">Mảnh Đất 250m² - Canh Tác Hữu Cơ</CardTitle>
        <CardDescription>
          Đang canh tác xà lách mỡ và cà chua bi theo tiêu chuẩn VietGAP.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2 text-sm pb-4">
        <div className="flex justify-between items-center text-muted-foreground">
          <span className="flex items-center gap-1.5 text-xs">
            <Calendar className="h-3.5 w-3.5 text-primary" /> Thời hạn hợp đồng
          </span>
          <span className="font-semibold text-foreground text-xs">Còn 45 ngày</span>
        </div>
        <div className="flex justify-between items-center text-muted-foreground">
          <span className="flex items-center gap-1.5 text-xs">
            <Sprout className="h-3.5 w-3.5 text-emerald-600" /> Tiến độ sinh trưởng
          </span>
          <span className="font-semibold text-emerald-600 text-xs">75% (Tuần 6)</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center border-t border-border pt-3">
        <div>
          <span className="text-[11px] text-muted-foreground block">Giá thuê</span>
          <span className="font-bold text-primary text-sm">1.500.000 đ/tháng</span>
        </div>
        <Button size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
          Chi Tiết
        </Button>
      </CardFooter>
    </Card>
  )
};

export const AccountProfileCard: Story = {
  name: "2. Thẻ Thông Tin Tài Khoản / Nông Dân",
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Hồ Sơ Nông Dân Canh Tác</CardTitle>
        </div>
        <CardDescription>Thông tin người trực tiếp chăm sóc thửa đất của bạn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="p-3 bg-muted/40 rounded-lg space-y-1">
          <p className="font-semibold text-foreground">Bác Ba - Nguyễn Văn An</p>
          <p className="text-xs text-muted-foreground">12 năm kinh nghiệm trồng dâu tây và rau thủy canh tại Lâm Đồng.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t border-border pt-3">
        <Button variant="outline" size="sm">Liên Hệ</Button>
        <Button size="sm">Xem Thửa Đất Khác</Button>
      </CardFooter>
    </Card>
  )
};
