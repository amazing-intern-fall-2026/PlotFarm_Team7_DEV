import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Shared/UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📌 Giới thiệu Component Skeleton
**Skeleton** là khối placeholder nguyên tử tạo hiệu ứng nhấp nháy chuyển màu (shimmer pulse), mô phỏng hình khối của dữ liệu đang chờ nạp từ server.

#### 💡 Khuyến nghị kiến trúc (Best Practice):
- Sử dụng **\`<Skeleton className="..." />\`** khi cần tự dựng các placeholder nhỏ tùy biến tại chỗ.
- Đối với các màn hình hoặc thẻ dữ liệu có trạng thái fetching/loading (Card, Profile, Table, Grid, Lines), hãy dùng trực tiếp **\`<State variant="skeleton" skeletonPreset="card | grid | table | profile | lines" />\`** để đảm bảo tính tái sử dụng và tránh lặp code.
        `
      }
    }
  },
  argTypes: {
    className: {
      control: "text",
      description: "Class Tailwind tùy biến chiều cao (h-*), chiều rộng (w-*) và bo góc (rounded-*) của khối placeholder"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

/**
 * 1. Các khối hình học nguyên tử cơ bản
 */
export const Primitives: Story = {
  name: "1. Các Khối Nguyên Tử (Primitives)",
  render: () => (
    <div className="space-y-6 max-w-md p-4 bg-card rounded-2xl border border-border">
      {/* Avatar & text line */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>

      {/* Paragraph lines */}
      <div className="space-y-2">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-5/6" />
        <Skeleton className="h-3.5 w-2/3" />
      </div>

      {/* Image / Banner block */}
      <Skeleton className="h-36 w-full rounded-xl" />

      {/* Action buttons */}
      <div className="flex justify-end gap-2 pt-2">
        <Skeleton className="h-8 w-20 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  )
};

/**
 * 2. Khối tròn (Avatar / Badge Icon)
 */
export const CircularAvatars: Story = {
  name: "2. Khối Tròn (Avatars & Badges)",
  render: () => (
    <div className="flex items-center gap-4 p-4">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-14 w-14 rounded-full" />
      <Skeleton className="h-18 w-18 rounded-full" />
    </div>
  )
};

/**
 * 3. Hàng dữ liệu ngắn (Badges & Tags)
 */
export const TagsAndPills: Story = {
  name: "3. Thẻ Nhãn & Huy Hiệu (Badges & Pills)",
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-24 rounded-full" />
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-28 rounded-full" />
    </div>
  )
};
