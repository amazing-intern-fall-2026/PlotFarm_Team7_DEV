import type { Meta, StoryObj } from "@storybook/react";
import { Badge, Card, CardHeader, CardTitle, CardDescription, Separator } from "@/shared/ui";

const meta: Meta = {
  title: "Giới thiệu/Tổng quan hệ thống",
  parameters: {
    docs: {
      description: {
        component: `
# Green Farm Design System & UI Architecture

Chào mừng bạn đến với thư viện thành phần giao diện chuẩn hóa của **Green Farm**.
Hệ thống thiết kế thân thiện, tinh giản, đồng bộ font chữ và màu sắc theo tiêu chuẩn Feature-Sliced Design (FSD).
        `
      }
    },
    controls: { hideNoControlsWarning: true }
  }
};

export default meta;

export const TongQuan: StoryObj = {
  render: () => (
    <div className="max-w-5xl mx-auto py-10 px-6 space-y-12 text-foreground font-sans">
      {/* Hero Banner: Ấm áp, thân thiện, không lạm dụng icon watermark */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-800 p-8 sm:p-10 text-white shadow-lg">
        <div className="space-y-4 max-w-2xl">
          <span className="inline-block rounded-full bg-white/15 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-emerald-100 border border-white/20">
            Green Farm Design System v1.0.0
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Nền Tảng Giao Diện Nông Nghiệp Thân Thiện
          </h1>
          <p className="text-emerald-50 text-base leading-relaxed">
            Hệ thống thiết kế hướng đến sự gần gũi, đơn giản và dễ sử dụng cho cả người nông dân, khách hàng thuê vườn lẫn quản trị viên. Mọi thành phần đều được tinh gọn, loại bỏ chi tiết rườm rà.
          </p>
        </div>
      </div>

      {/* Core Principles: Thẻ đánh số nhẹ nhàng thay cho hộp icon */}
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Quy Chuẩn Cốt Lõi</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Ba nguyên tắc nền tảng giúp giao diện luôn đồng bộ, sạch sẽ và dễ tiếp cận:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border/80 rounded-2xl shadow-xs hover:border-primary/40 transition-colors">
            <CardHeader className="p-6 space-y-3">
              <span className="inline-block w-fit text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                01. Màu sắc & Phông chữ
              </span>
              <CardTitle className="text-lg font-bold">Đồng Bộ Nhất Quán</CardTitle>
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                Sử dụng duy nhất phông chữ <strong>Plus Jakarta Sans</strong> tạo cảm giác thanh thoát, dễ đọc. Bảng màu tuân theo semantic tokens tự nhiên của đồng quê và cây trồng.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/80 rounded-2xl shadow-xs hover:border-primary/40 transition-colors">
            <CardHeader className="p-6 space-y-3">
              <span className="inline-block w-fit text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                02. Thành Phần Cơ Bản
              </span>
              <CardTitle className="text-lg font-bold">Atomic Base UI</CardTitle>
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                Thư mục <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">shared/ui</code> chỉ chứa các thành phần cốt lõi thuần túy, không bị gắn chặt vào bất kỳ nghiệp vụ thửa đất riêng lẻ nào.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/80 rounded-2xl shadow-xs hover:border-primary/40 transition-colors">
            <CardHeader className="p-6 space-y-3">
              <span className="inline-block w-fit text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-full">
                03. Trạng Thái Trực Quan
              </span>
              <CardTitle className="text-lg font-bold">Hợp Nhất State</CardTitle>
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                Tập trung xử lý trọn vẹn 4 trường hợp: đang tải, tải thêm, danh sách trống và báo lỗi vào duy nhất component <strong>State</strong> để người dùng luôn nắm bắt thông tin rõ ràng.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Semantic Color Tokens */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Bảng Màu Nhận Diện</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Lấy cảm hứng từ đất đai màu mỡ, mầm non và nông sản mùa thu hoạch, bảo đảm tương phản sắc nét đạt chuẩn WCAG:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Primary */}
          <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:shadow-md transition-shadow space-y-4">
            <div className="h-24 w-full rounded-xl bg-primary flex flex-col justify-between p-4 text-primary-foreground">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wider bg-black/15 px-2.5 py-0.5 rounded-full">
                  Primary
                </span>
                <span className="text-xs opacity-90">Chuẩn AAA</span>
              </div>
              <span className="font-mono text-lg font-bold">#16A34A</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-foreground">Xanh Sinh Thái</h3>
                <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono text-primary font-semibold">
                  bg-primary
                </code>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Màu mầm lá chủ đạo cho nút bấm chính, biểu tượng thương hiệu và huy hiệu VietGAP.
              </p>
            </div>
          </div>

          {/* Secondary */}
          <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:shadow-md transition-shadow space-y-4">
            <div className="h-24 w-full rounded-xl bg-secondary flex flex-col justify-between p-4 text-secondary-foreground">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wider bg-black/15 px-2.5 py-0.5 rounded-full">
                  Secondary
                </span>
                <span className="text-xs opacity-90">Chuẩn AAA</span>
              </div>
              <span className="font-mono text-lg font-bold">#D97706</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-foreground">Hổ Phách Nông Sản</h3>
                <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono text-amber-700 font-semibold">
                  bg-secondary
                </code>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Màu sắc nông sản chín, thông báo thời vụ thu hoạch và các tính năng quan trọng.
              </p>
            </div>
          </div>

          {/* Background */}
          <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:shadow-md transition-shadow space-y-4">
            <div className="h-24 w-full rounded-xl bg-background border border-border flex flex-col justify-between p-4 text-foreground">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wider bg-muted px-2.5 py-0.5 rounded-full text-muted-foreground">
                  Background
                </span>
                <span className="text-xs text-muted-foreground">Neutral 50</span>
              </div>
              <span className="font-mono text-lg font-bold">#F8FAFC</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-foreground">Nền Mây Sạch</h3>
                <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono text-foreground font-semibold">
                  bg-background
                </code>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Nền trang web êm dịu, giúp mắt thoải mái khi theo dõi bản đồ và dữ liệu vườn rau.
              </p>
            </div>
          </div>

          {/* Destructive */}
          <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:shadow-md transition-shadow space-y-4">
            <div className="h-24 w-full rounded-xl bg-destructive flex flex-col justify-between p-4 text-destructive-foreground">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wider bg-black/15 px-2.5 py-0.5 rounded-full">
                  Destructive
                </span>
                <span className="text-xs opacity-90">Chuẩn AAA</span>
              </div>
              <span className="font-mono text-lg font-bold">#DC2626</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-foreground">Đỏ Cảnh Báo</h3>
                <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono text-destructive font-semibold">
                  bg-destructive
                </code>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dành cho cảnh báo sâu bệnh cần xử lý gấp, sự cố cảm biến và thao tác xóa dữ liệu.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Component Inventory Table */}
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Danh Mục 9 Base Components</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Bảng tra cứu nhanh các thành phần nền tảng dùng chung:
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-xs font-semibold text-muted-foreground uppercase border-b border-border">
              <tr>
                <th className="py-3.5 px-5 whitespace-nowrap">Component</th>
                <th className="py-3.5 px-5">Mục Đích Sử Dụng</th>
                <th className="py-3.5 px-5">Thuộc Tính Tiêu Biểu</th>
                <th className="py-3.5 px-5 text-center whitespace-nowrap w-28">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { name: 'Button', desc: 'Kích hoạt hành động, submit form, mở modal', props: 'variant, size, isLoading, leftIcon' },
                { name: 'Input', desc: 'Ô nhập liệu cho mọi form đăng nhập, tìm kiếm', props: 'label, hint, error, leftIcon' },
                { name: 'Card', desc: 'Khung chứa thông tin gói thuê, thửa đất, bài viết', props: 'CardHeader, CardTitle, CardContent' },
                { name: 'Badge', desc: 'Nhãn trạng thái (Đang canh tác, Sắp thu hoạch)', props: 'variant (default, secondary, success)' },
                { name: 'Avatar', desc: 'Ảnh đại diện khách hàng, kỹ thuật viên phụ trách', props: 'src, name, size, status' },
                { name: 'Modal', desc: 'Hộp thoại nổi xác nhận hành động, hiển thị chi tiết', props: 'isOpen, onClose, title, size' },
                { name: 'State', desc: 'Hợp nhất 4 trạng thái Loading / Fetching / Empty / Error', props: 'state, emptyPreset, error, onRetry' },
                { name: 'Skeleton', desc: 'Khung giả lập chuyển động nhấp nháy khi đang tải dữ liệu', props: 'className (h-*, w-*, rounded-*)' },
                { name: 'Separator', desc: 'Đường kẻ phân tách các khu vực nội dung ngang hoặc dọc', props: 'orientation, decorative' },
              ].map((item) => (
                <tr key={item.name}>
                  <td className="py-3.5 px-5 font-semibold text-primary whitespace-nowrap">{item.name}</td>
                  <td className="py-3.5 px-5 text-muted-foreground">{item.desc}</td>
                  <td className="py-3.5 px-5 font-mono text-xs text-slate-600">{item.props}</td>
                  <td className="py-3.5 px-5 text-center whitespace-nowrap"><Badge variant="success">Sẵn sàng</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="rounded-2xl border border-primary/20 bg-emerald-50/40 p-6 sm:p-8 space-y-4">
        <h3 className="font-bold text-lg text-emerald-900">Cách Sử Dụng Trong Dự Án</h3>
        <p className="text-sm text-emerald-800/90 leading-relaxed">
          Import trực tiếp từ đường dẫn alias <code className="bg-white px-2 py-0.5 rounded border border-emerald-200 text-xs font-mono font-bold text-emerald-700">@/shared/ui</code>:
        </p>
        <pre className="bg-slate-900 text-slate-100 p-5 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
{`import { Button, Input, Card, Badge, State } from "@/shared/ui";

export function PlotDetailView({ plot, isLoading, isError, onRetry }) {
  return (
    <State state={isLoading ? "loading" : isError ? "error" : "idle"} onRetry={onRetry}>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{plot?.title}</CardTitle>
            <Badge variant="success">Đang Canh Tác</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p>Diện tích: {plot?.area} m²</p>
        </CardContent>
      </Card>
    </State>
  );
}`}
        </pre>
      </div>
    </div>
  )
};
