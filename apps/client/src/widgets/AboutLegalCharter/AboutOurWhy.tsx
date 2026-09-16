import { Users, Sprout, ShoppingBag } from "lucide-react";
import { Box, Typography } from "@/shared/ui";

export function AboutOurWhy() {
  return (
    <Box className="w-full max-w-6xl mx-auto space-y-12 sm:space-y-16">
      <Box className="text-center space-y-3">
        <Typography.H2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight font-sans">
          Sứ Mệnh Của Chúng Tôi
        </Typography.H2>
        <Typography.P className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Kết nối luống đất canh tác tại Đà Lạt với bữa ăn an toàn của từng gia đình đô thị thông qua nông nghiệp số.
        </Typography.P>
      </Box>

      <Box className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8 pt-4 items-stretch">
        <Box className="bg-card dark:bg-slate-900 border border-border/80 rounded-2xl p-6 sm:p-8 pt-12 sm:pt-14 relative text-center shadow-xs flex flex-col items-center h-full">
          <Box className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-primary text-white shadow-md shadow-primary/25 flex items-center justify-center ring-4 ring-background">
            <Users className="w-7 h-7" />
          </Box>

          <Box className="w-full h-14 sm:h-16 flex items-center justify-center mb-3">
            <Typography.H3 className="text-lg sm:text-xl font-bold text-foreground font-sans leading-snug text-center">
              Đồng Hành Cùng Nông Hộ Độc Lập
            </Typography.H3>
          </Box>

          <Typography.P className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans text-center flex-1">
            Chúng tôi hỗ trợ các nông hộ tại Đạ Sar - Lạc Dương làm chủ kỹ thuật canh tác hữu cơ chuẩn quốc gia TCVN 11041:2017. Nông dân có nguồn thu nhập ổn định, không còn bị ép giá trung gian và yên tâm gắn bó với đồng ruộng quê hương.
          </Typography.P>
        </Box>

        <Box className="bg-card dark:bg-slate-900 border border-border/80 rounded-2xl p-6 sm:p-8 pt-12 sm:pt-14 relative text-center shadow-xs flex flex-col items-center h-full">
          <Box className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-primary text-white shadow-md shadow-primary/25 flex items-center justify-center ring-4 ring-background">
            <Sprout className="w-7 h-7" />
          </Box>

          <Box className="w-full h-14 sm:h-16 flex items-center justify-center mb-3">
            <Typography.H3 className="text-lg sm:text-xl font-bold text-foreground font-sans leading-snug text-center">
              Xây Dựng Hệ Sinh Thái Minh Bạch
            </Typography.H3>
          </Box>

          <Typography.P className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans text-center flex-1">
            Kiên quyết xóa bỏ sự mập mờ về nguồn gốc thực phẩm. Mọi quy trình từ giống thuần chủng Non-GMO, chăm sóc phân vi sinh đến bắt sâu đều được số hóa, giám sát camera 24/7 và lưu vết cảm biến IoT bất biến trên nền tảng đám mây.
          </Typography.P>
        </Box>

        <Box className="bg-card dark:bg-slate-900 border border-border/80 rounded-2xl p-6 sm:p-8 pt-12 sm:pt-14 relative text-center shadow-xs flex flex-col items-center h-full">
          <Box className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-primary text-white shadow-md shadow-primary/25 flex items-center justify-center ring-4 ring-background">
            <ShoppingBag className="w-7 h-7" />
          </Box>

          <Box className="w-full h-14 sm:h-16 flex items-center justify-center mb-3">
            <Typography.H3 className="text-lg sm:text-xl font-bold text-foreground font-sans leading-snug text-center">
              Đưa Nông Sản Sạch Tận Bàn Ăn
            </Typography.H3>
          </Box>

          <Typography.P className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans text-center flex-1">
            Trao quyền cho cư dân thành thị đồng sở hữu mảnh vườn từ xa thuận tiện nhất. Nông sản được thu hoạch tươi sống tại vườn vào buổi sáng, dán tem vận đơn A6 có mã QR tra cứu và giao tận bàn ăn gia đình chỉ trong vòng 24 giờ.
          </Typography.P>
        </Box>
      </Box>
    </Box>
  );
}
