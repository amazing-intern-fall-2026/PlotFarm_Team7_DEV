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

export function AboutPage() {
  return (
    <Box className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader>
          <Box className="flex items-center justify-between">
            <CardTitle>Về chúng tôi (/about)</CardTitle>
            <Badge variant="outline">Green Farm</Badge>
          </Box>
          <CardDescription>
            Giải pháp số hoá nông trại thông minh chuẩn VietGAP & GlobalGAP
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Text variant="muted" className="text-sm leading-relaxed">
            Green Farm là nền tảng tiên phong kết nối mô hình nông nghiệp số với hệ thống cảm biến IoT, camera HLS truyền phát thời gian thực và nhật ký canh tác minh bạch.
          </Text>
        </CardContent>
      </Card>
    </Box>
  );
}
