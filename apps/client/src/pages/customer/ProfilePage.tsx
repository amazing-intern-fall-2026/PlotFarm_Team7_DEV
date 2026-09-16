import {
  Box,
  Container,
  Typography,
  Breadcrumb,
} from "@/shared/ui";
import { AccountSidebar } from "@/widgets/AccountSidebar";
import { AccountProfile } from "@/widgets/AccountProfile";

export function ProfilePage() {
  return (
    <Box className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans pb-24 lg:pb-16 w-full max-w-full overflow-hidden">
      <Container size="7xl" className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-6">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Hồ sơ & Cài đặt", isCurrent: true },
          ]}
        />

        <Box className="space-y-1">
          <Typography.H2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Hồ sơ & Cài đặt tài khoản
          </Typography.H2>
          <Typography.Muted className="text-xs sm:text-sm text-muted-foreground">
            Quản lý thông tin định danh cư dân đồng canh tác, thiết lập điểm giao nhận rau lạnh và ma trận thông báo nông vụ.
          </Typography.Muted>
        </Box>

        <Box className="flex flex-col lg:flex-row gap-8 items-start">
          <AccountSidebar />
          <Box className="flex-1 w-full min-w-0">
            <AccountProfile />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
