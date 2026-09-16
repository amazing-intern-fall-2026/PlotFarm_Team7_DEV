import {
  Box,
  Container,
  Typography,
  Breadcrumb,
} from "@/shared/ui";
import { AccountSidebar } from "@/widgets/AccountSidebar";
import { CustomerContracts } from "@/widgets/CustomerContracts";

export function CustomerContractsPage() {
  return (
    <Box className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans pb-24 lg:pb-16 w-full max-w-full overflow-hidden">
      <Container size="7xl" className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-6">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Tài khoản & Pháp lý", href: "/account/profile" },
            { label: "Hợp đồng số", isCurrent: true },
          ]}
        />

        <Box className="space-y-1">
          <Typography.H2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Hợp đồng thuê đất số & Pháp lý mùa vụ
          </Typography.H2>
          <Typography.Muted className="text-xs sm:text-sm text-muted-foreground">
            Toàn bộ hợp đồng điện tử được ký số mã hóa SHA-256 theo Luật Giao dịch Điện tử Việt Nam, bảo đảm giá trị pháp lý và quyền sở hữu sản lượng nông sản trọn đời mùa vụ.
          </Typography.Muted>
        </Box>

        <Box className="flex flex-col lg:flex-row gap-8 items-start">
          <AccountSidebar />
          <Box className="flex-1 w-full min-w-0">
            <CustomerContracts />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
