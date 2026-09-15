import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Box,
  Text,
} from "@/shared/ui";

export function JournalPage() {
  return (
    <Box className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader>
          <Box className="flex items-center justify-between">
            <CardTitle>Nhật ký nông vụ (/journal)</CardTitle>
            <Badge variant="outline">Minh bạch 100%</Badge>
          </Box>
          <CardDescription>
            Theo dõi tiến trình bón phân, tưới tiêu, hình ảnh time-lapse từ kỹ thuật viên
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Text variant="muted" className="text-sm leading-relaxed">
            Mọi thao tác chăm bón tại ô đất của bạn đều được kỹ sư ghi nhận qua ảnh chụp thực địa và dữ liệu cảm biến đo đạc tự động.
          </Text>
        </CardContent>
      </Card>
    </Box>
  );
}
