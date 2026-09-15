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

export function PlotsPage() {
  const navigate = useNavigate();
  return (
    <Box className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader>
          <Box className="flex items-center justify-between">
            <CardTitle>Danh sách Ô đất (/plots)</CardTitle>
            <Badge variant="outline">Đà Lạt Prime</Badge>
          </Box>
          <CardDescription>
            Bộ lọc phân khu: Khu A (Rau ăn lá) • Khu B (Củ quả hữu cơ)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Text variant="muted" className="text-sm">
            Lựa chọn ô đất phù hợp để bắt đầu hành trình canh tác nông nghiệp số cùng kỹ sư Green Farm.
          </Text>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate("/plots/A-104")}>
            Chọn ô đất A-104 (Cải cầu vồng) →
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}
