import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
  Box,
  Text,
} from "@/shared/ui";

export function AdminPlotsPage() {
  const navigate = useNavigate();
  return (
    <Box className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader>
          <Box className="flex items-center justify-between">
            <CardTitle>Quản lý Ô đất (/admin/plots)</CardTitle>
            <Badge variant="warning">Cảnh báo</Badge>
          </Box>
          <CardDescription className="text-destructive font-medium">
            ⚠️ Ô A-104 & B-108 đang có cảnh báo nhiệt độ lớn hơn 32°C
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Text variant="muted" className="text-sm">
            Danh sách các ô đất thử nghiệm đang vận hành hệ sinh thái IoT Green Farm.
          </Text>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate("/admin/plots/A-104/config")}>
            Cấu hình Kỹ thuật ô A-104 →
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}
