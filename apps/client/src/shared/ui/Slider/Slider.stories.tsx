import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";
import { Button } from "../Button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "../Card";
import { Sparkles } from "lucide-react";

const meta: Meta<typeof Slider> = {
  title: "Shared/UI/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
### 🎚️ Green Farm Slider Component
Thành phần thanh trượt tùy chỉnh theo chuẩn thiết kế Green Farm:
- **Tone màu**: Bio Green (\`bg-primary\`), viền bo tròn nhẹ, độ tương phản cao.
- **Biến thể**: Thanh trượt cơ bản, thanh trượt kèm ô nhập số (Input Box), thanh trượt có nấc mốc phân cấp (Stepped Labels).
- **Khả năng tiếp cận**: Tuân thủ WAI-ARIA Slider pattern, hỗ trợ bàn phím đầy đủ.
        `
      }
    }
  },
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: 40,
    min: 0,
    max: 100,
    label: "Độ ẩm đất mục tiêu (%)"
  }
};

/**
 * 1. Basic Slider Guideline (Default, Hover, Active, Disabled)
 */
export const BasicSliderGuideline: Story = {
  render: () => (
    <div className="w-[600px] p-6 rounded-3xl bg-muted/30 border border-border/70 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Slider label="DEFAULT STATE" defaultValue={35} />
        </div>
        <div>
          <Slider label="HOVER STATE" defaultValue={75} />
        </div>
        <div>
          <Slider label="CLICKED STATE" defaultValue={25} />
        </div>
        <div>
          <Slider label="DISABLED STATE" defaultValue={60} disabled />
        </div>
      </div>
    </div>
  )
};

/**
 * 2. Slider with Input
 */
export const SliderWithInputDemo: Story = {
  render: () => (
    <div className="w-[640px] p-6 rounded-3xl bg-muted/30 border border-border/70 space-y-6">
      <div className="grid grid-cols-2 gap-8">
        <Slider
          label="THỜI GIAN TƯỚI (PHÚT)"
          defaultValue={45}
          min={5}
          max={120}
          showInput
          inputUnit="p"
        />
        <Slider
          label="ĐỘ CHÍNH XÁC CẢM BIẾN (%)"
          defaultValue={85}
          min={0}
          max={100}
          showInput
          inputUnit="%"
        />
      </div>
    </div>
  )
};

/**
 * 3. Slider with Labels (Stepped / Discrete Marks)
 */
export const SliderWithLabelsDemo: Story = {
  render: () => (
    <div className="w-[640px] p-8 rounded-3xl bg-muted/30 border border-border/70">
      <Slider
        label="CẤP ĐỘ DINH DƯỠNG NÔNG NGHIỆP"
        defaultValue={66}
        min={0}
        max={100}
        step={33.33}
        showTooltip
        marks={[
          { value: 0, label: "CƠ BẢN" },
          { value: 33.33, label: "TRUNG CẤP" },
          { value: 66.66, label: "NÂNG CAO" },
          { value: 100, label: "CHUYÊN GIA" }
        ]}
      />
    </div>
  )
};

/**
 * 4. Curated Precision Card (From Guideline)
 */
export const CuratedMatchingCard: Story = {
  render: () => (
    <div className="w-[720px] grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2 p-6 rounded-3xl border border-border shadow-xs flex flex-col justify-between">
        <div>
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-lg font-bold text-foreground">
              Độ chính xác ghép cặp nông trại
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Điều chỉnh các thông số để hệ thống Green Farm tìm kiếm lô đất và giống rau phù hợp nhất với điều kiện của bạn.
            </CardDescription>
          </CardHeader>
          <Slider
            defaultValue={70}
            min={0}
            max={100}
            showInput
            label="ĐỘ TƯƠNG THÍCH MÔ HÌNH (%)"
          />
        </div>
        <CardFooter className="p-0 pt-6">
          <Button variant="default" size="sm" className="rounded-xl px-4 font-semibold">
            Lưu tùy chọn
          </Button>
        </CardFooter>
      </Card>

      <div className="rounded-3xl bg-primary text-primary-foreground p-6 flex flex-col justify-between shadow-md">
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-100">
            <Sparkles className="h-4 w-4" />
            <span>MẸO NÔNG NGHIỆP</span>
          </div>
          <p className="text-sm font-bold leading-relaxed text-white">
            Sử dụng ô nhập số chính xác để lọc chỉ số vi khí hậu tối ưu nhất.
          </p>
        </div>
      </div>
    </div>
  )
};
