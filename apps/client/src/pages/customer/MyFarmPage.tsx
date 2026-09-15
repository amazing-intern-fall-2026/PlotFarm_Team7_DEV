import { useParams, useNavigate } from "react-router-dom";
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

export function MyFarmPage() {
  const { plotId = "A-104" } = useParams();
  const navigate = useNavigate();
  return (
    <Box className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader>
          <Box className="flex items-center justify-between">
            <CardTitle>Vườn của tôi — Ô #{plotId}</CardTitle>
            <Badge variant="success">Đang canh tác</Badge>
          </Box>
          <CardDescription>
            Camera Livestream 24/7 • Độ ẩm đất: 68% • Nhiệt độ: 24.5°C
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Text variant="muted" className="text-sm">
            Lô đất của bạn đang được kỹ thuật viên chăm sóc đạt chuẩn hữu cơ quốc tế.
          </Text>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/")}>
            ← Về Trang chủ
          </Button>
          <Button onClick={() => navigate("/journal")}>
            Xem Nhật ký chăm sóc →
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}
