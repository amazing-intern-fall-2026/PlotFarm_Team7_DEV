import type { Meta, StoryObj } from "@storybook/react";
import { Steps } from "./Steps";
import { StepStatusCard } from "./StepStatusCard";

const meta: Meta<typeof Steps> = {
  title: "Shared/UI/Steps",
  component: Steps,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
### 🐾 Green Farm Steps Component
Thành phần hiển thị tiến trình đa giai đoạn tuân thủ tông màu nông nghiệp Green Farm (\`#16a34a\`, \`#d97706\`, \`#dc2626\`):
- **Biến thể**: Thanh tiến trình ngang (\`horizontal\`), Dòng thời gian dọc (\`vertical\`), Điều hướng thẻ con nhộng (\`pills\`).
- **Trạng thái**: Hoàn thành (\`completed\`), Đang thực hiện (\`current\`), Báo lỗi / Cần chú ý (\`error\`), Chưa tới (\`upcoming\`).
        `
      }
    }
  },
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof Steps>;

/**
 * 1. Horizontal Progress Trackers (All 3 States from Image 2)
 */
export const HorizontalTrackers: Story = {
  render: () => (
    <div className="w-[680px] p-8 rounded-3xl bg-muted/30 border border-border/70 space-y-10">
      {/* State: Completed */}
      <div className="space-y-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
          STATE: COMPLETED
        </span>
        <Steps
          variant="horizontal"
          steps={[
            { title: "Xác thực", state: "completed" },
            { title: "Thông tin", state: "completed" },
            { title: "Hoàn tất", state: "upcoming" }
          ]}
        />
      </div>

      {/* State: In Progress */}
      <div className="space-y-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
          STATE: IN PROGRESS
        </span>
        <Steps
          variant="horizontal"
          steps={[
            { title: "Bước 1", state: "completed" },
            { title: "Đang xử lý", state: "current" },
            { title: "Sắp tới", state: "upcoming" }
          ]}
        />
      </div>

      {/* State: Error / Attention Required */}
      <div className="space-y-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-destructive">
          STATE: ERROR / ATTENTION REQUIRED
        </span>
        <Steps
          variant="horizontal"
          steps={[
            { title: "Hoàn thành", state: "completed" },
            { title: "Lỗi thẩm định", state: "error" },
            { title: "Chờ xử lý", state: "upcoming" }
          ]}
        />
      </div>
    </div>
  )
};

/**
 * 2. Vertical Narrative (Image 2)
 */
export const VerticalNarrativeDemo: Story = {
  render: () => (
    <div className="w-[500px] p-8 rounded-3xl bg-card border border-border/70 shadow-xs">
      <Steps
        variant="vertical"
        steps={[
          {
            title: "Xác minh danh tính nông hộ",
            description: "Đã xác thực thành công vào ngày 24/10/2026",
            state: "completed"
          },
          {
            title: "Đánh giá chất lượng đất VietGAP",
            description: "Giai đoạn hiện tại: Đo lường pH và mẫu đất",
            state: "current",
            subCard: (
              <span>
                &ldquo;Vui lòng đảm bảo mẫu đất được thu hoạch đúng quy chuẩn tại 4 góc thửa đất và trung tâm.&rdquo;
              </span>
            )
          },
          {
            title: "Cấp chứng nhận canh tác Green Farm",
            description: "Khóa cho đến khi giai đoạn 2 hoàn thành thẩm định",
            state: "upcoming"
          }
        ]}
      />
    </div>
  )
};

/**
 * 3. Status Tag Indicators (Linear Path Navigation & Editorial Grid)
 */
export const StatusTagIndicatorsDemo: Story = {
  render: () => (
    <div className="w-[620px] p-8 rounded-3xl bg-card border border-border/70 shadow-xs space-y-8">
      {/* Linear Path Navigation */}
      <div className="space-y-3">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
          LINEAR PATH NAVIGATION
        </span>
        <Steps
          variant="pills"
          steps={[
            { title: "Khởi tạo", state: "completed" },
            { title: "Hồ sơ vườn", state: "current" },
            { title: "Chọn cây giống", state: "upcoming" },
            { title: "Hoàn tất", state: "upcoming" }
          ]}
        />
      </div>

      {/* Editorial Asymmetric Grid */}
      <div className="space-y-3 pt-4 border-t border-border">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
          EDITORIAL ASYMMETRIC GRID
        </span>
        <div className="grid grid-cols-2 gap-4">
          <StepStatusCard
            title="Đã duyệt quy chuẩn"
            subtitle="Hồ sơ VietGAP được thẩm duyệt"
            status="complete"
          />
          <StepStatusCard
            title="Đang xử lý mẫu đất"
            subtitle="Chờ kết quả phòng thí nghiệm"
            status="processing"
          />
        </div>
      </div>
    </div>
  )
};
