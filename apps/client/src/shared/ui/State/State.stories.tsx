import type { Meta, StoryObj } from "@storybook/react";
import { State } from "./State";
import { Button } from "../Button";
import { Plus } from "lucide-react";

const meta: Meta<typeof State> = {
  title: "Shared/UI/State",
  component: State,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📌 Giới thiệu Component State
**State** là component trung tâm **hợp nhất toàn bộ các trạng thái UI** (\`loading\`, \`fetching\`, \`empty\`, \`error\`, và **\`skeleton\`**) của hệ thống Green Farm.

#### 🌟 Điểm nổi bật về Skeleton tái sử dụng (Reusable Skeleton):
- **Tập trung hóa**: Không tạo các file/component skeleton rời rạc lặp code (như CardSkeleton, ProfileSkeleton, TableSkeleton).
- **Bộ Preset chuẩn hóa**:
  - \`skeletonPreset="lines"\`: Đoạn văn bản mô phỏng.
  - \`skeletonPreset="card"\`: Thẻ nông sản / thửa đất với avatar, badge, hình ảnh và nút bấm.
  - \`skeletonPreset="profile"\`: Khung hồ sơ cá nhân với ảnh bìa, avatar tròn và thông số.
  - \`skeletonPreset="grid"\`: Lưới nhiều thẻ hiển thị danh sách ô đất/nông trại đang tải.
  - \`skeletonPreset="table"\`: Bảng dữ liệu quản trị với tiêu đề cột và các dòng dữ liệu.
- **Tùy biến linh hoạt**: Hỗ trợ truyền slot \`skeleton={<CustomSkeleton />}\` hoặc tinh chỉnh \`skeletonCount\`.
- **Subcomponent**: Cho phép gọi \`<State.Skeleton className="..." />\` trực tiếp khi cần vẽ nguyên tử.
        `
      }
    }
  },
  argTypes: {
    state: {
      control: "select",
      options: ["idle", "loading", "fetching", "empty", "error", "success"],
      description: "Trạng thái hiển thị hiện tại của luồng dữ liệu",
      table: {
        defaultValue: { summary: "idle" }
      }
    },
    variant: {
      control: "select",
      options: ["full-page", "card", "inline", "skeleton"],
      description: "Bố cục hiển thị: full-page (toàn màn hình), card (trong khung thẻ viền), inline (tối giản không viền), skeleton (khung xám shimmer)",
      table: {
        defaultValue: { summary: "card" }
      }
    },
    skeletonPreset: {
      control: "select",
      options: ["lines", "card", "profile", "grid", "table"],
      description: "Bộ preset khung xương skeleton có tính tái sử dụng cao cho fetching/loading state",
      table: {
        defaultValue: { summary: "lines" }
      }
    },
    skeletonCount: {
      control: "number",
      description: "Số lượng phần tử lặp lại trong skeleton (dòng, thẻ, hàng bảng)",
    },
    emptyPreset: {
      control: "select",
      options: ["general", "search", "notification", "feed", "plots", "contracts"],
      description: "Bộ preset icon và văn bản mặc định cho trạng thái rỗng",
      table: {
        defaultValue: { summary: "general" }
      }
    },
  }
};

export default meta;
type Story = StoryObj<typeof State>;

export const LoadingFullPage: Story = {
  name: "1. Loading Toàn Trang (Spinner)",
  args: {
    state: "loading",
    variant: "full-page",
    title: "Đang tải hệ thống nông trại...",
    description: "Đang kết nối đến máy chủ IoT và nạp dữ liệu thửa đất..."
  }
};

export const LoadingCard: Story = {
  name: "2. Loading Trong Card (Card Variant)",
  args: {
    state: "loading",
    variant: "card",
    title: "Đang đồng bộ cảm biến...",
    description: "Dữ liệu nhiệt độ và độ ẩm đất đang được cập nhật."
  }
};

/**
 * 3. Skeleton Dạng Thẻ Nông Nghiệp / Thửa Đất (Card Preset)
 */
export const SkeletonCardPreset: Story = {
  name: "3. Skeleton: Thẻ Canh Tác (Card Preset)",
  args: {
    variant: "skeleton",
    skeletonPreset: "card",
  }
};

/**
 * 4. Skeleton Dạng Lưới Nhiều Thẻ (Grid Preset - Dùng cho Danh sách Ô đất)
 */
export const SkeletonGridPreset: Story = {
  name: "4. Skeleton: Lưới Danh Sách Ô Đất (Grid Preset)",
  args: {
    variant: "skeleton",
    skeletonPreset: "grid",
    skeletonCount: 4,
  }
};

/**
 * 5. Skeleton Dạng Bảng Dữ Liệu (Table Preset - Dùng cho Admin / Quản lý vụ mùa)
 */
export const SkeletonTablePreset: Story = {
  name: "5. Skeleton: Bảng Dữ Liệu Quản Trị (Table Preset)",
  args: {
    variant: "skeleton",
    skeletonPreset: "table",
    skeletonCount: 3,
  }
};

/**
 * 6. Skeleton Dạng Hồ Sơ Tài Khoản (Profile Preset)
 */
export const SkeletonProfilePreset: Story = {
  name: "6. Skeleton: Hồ Sơ Tài Khoản (Profile Preset)",
  args: {
    variant: "skeleton",
    skeletonPreset: "profile",
  }
};

/**
 * 7. Skeleton Dạng Dòng Văn Bản Cơ Bản (Lines Preset)
 */
export const SkeletonLinesPreset: Story = {
  name: "7. Skeleton: Dòng Văn Bản (Lines Preset)",
  args: {
    variant: "skeleton",
    skeletonPreset: "lines",
    skeletonCount: 4,
  }
};

/**
 * 8. Trạng thái Fetching ngầm (Background Sync)
 */
export const BackgroundFetching: Story = {
  name: "8. Fetching Ngầm (Background Refresh)",
  args: {
    state: "fetching",
    children: (
      <div className="p-6 border border-border rounded-xl bg-card">
        <h3 className="font-bold text-base text-foreground">Dữ liệu thửa đất Lô A-12 (Đang làm mới)</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Nội dung cũ vẫn hiển thị bình thường cho người dùng trong lúc dữ liệu mới đang được nạp ở chế độ nền.
        </p>
      </div>
    )
  }
};

export const EmptyPlotsPreset: Story = {
  name: "9. Empty State (Preset Thửa Đất)",
  args: {
    state: "empty",
    emptyPreset: "plots",
    action: (
      <Button leftIcon={<Plus className="h-4 w-4" />}>
        Đăng Ký Thuê Đất Mới
      </Button>
    )
  }
};

export const EmptySearchPreset: Story = {
  name: "10. Empty State (Preset Tìm Kiếm)",
  args: {
    state: "empty",
    emptyPreset: "search",
    title: "Không tìm thấy thửa đất phù hợp",
    description: "Vui lòng thử tìm với từ khóa khác như 'Cầu Đất', 'Đà Lạt' hoặc 'Xà lách'."
  }
};

export const ErrorWithRetry: Story = {
  name: "11. Error State (Kèm Nút Thử Lại)",
  args: {
    state: "error",
    title: "Không Thể Kết Nối Đến Cảm Biến IoT",
    error: "Máy chủ trả về mã lỗi 503 Service Unavailable. Trạm đo thời tiết tại Cầu Đất tạm thời mất tín hiệu mạng.",
    onRetry: () => alert("Thực hiện gọi lại API...")
  }
};
