import { Quote } from "lucide-react";
import { Box, Typography } from "@/shared/ui";

interface TestimonialStory {
  id: string;
  imageSrc: string;
  imageAlt: string;
  quote: string;
  author: string;
  role: string;
  location: string;
}

const STORIES: TestimonialStory[] = [
  {
    id: "story-1",
    imageSrc:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Gia đình thưởng thức bữa ăn nông sản hữu cơ tươi ngon",
    quote:
      "Từ ngày thuê ô đất tại Green Farm, gia đình tôi hoàn toàn trút bỏ nỗi lo thực phẩm bẩn. Mỗi ngày mở app xem camera thấy cây lớn dần theo từng giai đoạn, cuối vụ thùng rau cải bó xôi được thu hoạch đóng thùng gửi về tận nhà tươi rói.",
    author: "Thu Hằng",
    role: "Khách hàng thuê ô đất #Zone-A04",
    location: "Quận 7, TP.HCM",
  },
  {
    id: "story-2",
    imageSrc:
      "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Bác nông dân chăm sóc luống rau tại nhà kính công nghệ cao Lạc Dương",
    quote:
      "Làm nông theo chuẩn hữu cơ TCVN 11041:2017 tuy khắt khe nhưng có hệ sinh thái đồng hành. Nhận phiếu chăm sóc là chúng tôi ra luống bắt sâu, bón phân vi sinh rồi chụp ảnh đối chứng gửi khách. Thu nhập ổn định và tự hào với nghề.",
    author: "Bác K'Briêng",
    role: "Tổ trưởng canh tác nông hộ Đạ Sar",
    location: "Lạc Dương, Lâm Đồng",
  },
  {
    id: "story-3",
    imageSrc:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Đóng gói vận chuyển nông sản kèm tem mã QR Code128 chuẩn A6",
    quote:
      "Trải nghiệm công nghệ cực kỳ chuyên nghiệp: giữ chỗ 5 phút chuẩn xác, quét VietQR kích hoạt hợp đồng tức thì. Đặc biệt là phiếu gửi hàng A6 dán trên thùng rau, chỉ cần quét mã QR là tra cứu được tường tận lịch sử gieo trồng và vận chuyển.",
    author: "Hoàng Dũng",
    role: "Kỹ sư công nghệ & Khách hàng mùa vụ",
    location: "Cầu Giấy, Hà Nội",
  },
];

export function AboutStories() {
  return (
    <Box className="w-full max-w-6xl mx-auto space-y-12 sm:space-y-16">
      {/* Section Header */}
      <Box className="text-center space-y-4 max-w-3xl mx-auto">
        <Typography.H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight font-sans leading-tight">
          Số Hóa Luống Đất Nông Nghiệp, Mang An Tâm Đến Từng Bữa Cơm
        </Typography.H2>
        <Typography.P className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Lắng nghe những chia sẻ thực tế từ nông hộ canh tác thực địa tại Lạc Dương và các gia đình thành thị đồng hành cùng Green Farm.
        </Typography.P>
      </Box>

      {/* 3 Story Cards */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 items-stretch">
        {STORIES.map((story) => (
          <Box
            key={story.id}
            className="bg-card dark:bg-slate-900 border border-border/80 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow duration-300"
          >
            {/* Top Photo */}
            <Box className="relative w-full h-52 sm:h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={story.imageSrc}
                alt={story.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
            </Box>

            {/* Content & Quote */}
            <Box className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-5">
              <Box className="space-y-3">
                {/* Quotation Icon */}
                <Box className="flex items-center">
                  <Quote className="w-8 h-8 text-primary fill-primary/85 shrink-0 transform scale-x-[-1]" />
                </Box>

                {/* Quote Text */}
                <Typography.P className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans text-justify">
                  {story.quote}
                </Typography.P>
              </Box>

              {/* Author Info */}
              <Box className="pt-4 border-t border-border/60">
                <Typography.Text className="text-xs font-bold uppercase tracking-wider text-foreground block font-sans">
                  — {story.author.toUpperCase()}, {story.location}
                </Typography.Text>
                <Typography.Muted className="text-[11px] text-muted-foreground block pt-0.5">
                  {story.role}
                </Typography.Muted>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
