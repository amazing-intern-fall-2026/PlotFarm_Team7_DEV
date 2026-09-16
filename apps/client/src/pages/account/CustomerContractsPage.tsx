import * as React from "react";
import {
  FileText,
  Download,
  QrCode,
  ShieldCheck,
  Calendar,
  Sprout,
  CheckCircle2,
  KeyRound,
  FileCheck2,
} from "lucide-react";
import {
  Box,
  Container,
  Card,
  Typography,
  Button,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Modal,
  Input,
  Breadcrumb,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { AccountSidebar } from "./AccountSidebar";
import {
  CONTRACT_STATUS_FILTERS,
  MOCK_DIGITAL_CONTRACTS,
  type ContractStatus,
  type DigitalContractItem,
} from "./contracts.constants";

export function CustomerContractsPage() {
  const [selectedStatus, setSelectedStatus] = React.useState<ContractStatus>("all");
  const [contracts, setContracts] = React.useState<DigitalContractItem[]>(MOCK_DIGITAL_CONTRACTS);
  const [activeModalContract, setActiveModalContract] = React.useState<DigitalContractItem | null>(null);
  const [otpCode, setOtpCode] = React.useState("");
  const [otpSigningSuccess, setOtpSigningSuccess] = React.useState(false);

  const filteredContracts = React.useMemo(() => {
    if (selectedStatus === "all") return contracts;
    return contracts.filter((c) => c.status === selectedStatus);
  }, [contracts, selectedStatus]);

  const stats = React.useMemo(() => {
    const activeCount = contracts.filter((c) => c.status === "active").length;
    const pendingCount = contracts.filter((c) => c.status === "pending").length;
    const totalInvest = contracts
      .filter((c) => c.status === "active")
      .reduce((sum, c) => sum + c.totalValue, 0);

    return { activeCount, pendingCount, totalInvest };
  }, [contracts]);

  const handleSignOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalContract || otpCode.length < 4) return;

    setContracts((prev) =>
      prev.map((c) => {
        if (c.id === activeModalContract.id) {
          return {
            ...c,
            status: "active",
            signedBadge: {
              label: "Đã ký số điện tử (E-signed)",
              variant: "success",
            },
            signerInfo: {
              certAuthority: "VIETTEL-CA TrustID • Green Farm Legal",
              signedTimestamp: new Date().toLocaleString("vi-VN"),
              hashSha256: "8A7B9C0D1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D9E0F1A2B3C4D5E6F7A8B",
            },
          };
        }
        return c;
      }),
    );

    setOtpSigningSuccess(true);
    setTimeout(() => {
      setOtpSigningSuccess(false);
      setActiveModalContract(null);
      setOtpCode("");
    }, 2000);
  };

  return (
    <Box className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans pb-24 lg:pb-16">
      <Container size="7xl" className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-6">
        {/* Breadcrumb standard */}
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Tài khoản", href: "/account/profile" },
            { label: "Hợp đồng thuê đất số", isCurrent: true },
          ]}
        />

        {/* Page Header */}
        <div className="space-y-1">
          <Typography.H2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Hợp đồng thuê đất số & Pháp lý mùa vụ
          </Typography.H2>
          <Typography.Muted className="text-xs sm:text-sm text-muted-foreground">
            Toàn bộ hợp đồng điện tử được ký số mã hóa SHA-256 theo Luật Giao dịch Điện tử Việt Nam, bảo đảm giá trị pháp lý và quyền sở hữu sản lượng nông sản trọn đời mùa vụ.
          </Typography.Muted>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-border/80 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <Typography.Muted className="text-xs font-semibold text-muted-foreground">
                  Hợp đồng đang canh tác
                </Typography.Muted>
                <Typography.H3 className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-1">
                  {stats.activeCount} Hợp đồng
                </Typography.H3>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700">
                <FileCheck2 className="w-6 h-6" />
              </div>
            </div>
          </Card>

          <Card className="border-border/80 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <Typography.Muted className="text-xs font-semibold text-muted-foreground">
                  Chờ ký số xác thực (OTP)
                </Typography.Muted>
                <Typography.H3 className="text-2xl font-extrabold text-amber-700 dark:text-amber-400 mt-1">
                  {stats.pendingCount} Hợp đồng
                </Typography.H3>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-700">
                <KeyRound className="w-6 h-6" />
              </div>
            </div>
          </Card>

          <Card className="border-border/80 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <Typography.Muted className="text-xs font-semibold text-muted-foreground">
                  Tổng giá trị đất & canh tác
                </Typography.Muted>
                <Typography.H3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                  {stats.totalInvest.toLocaleString("vi-VN")} đ
                </Typography.H3>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
          </Card>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <AccountSidebar />

          <main className="flex-1 w-full min-w-0 space-y-6">
            {/* Status Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none">
              {CONTRACT_STATUS_FILTERS.map((tab) => {
                const isActive = selectedStatus === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedStatus(tab.id)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border",
                      isActive
                        ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-border/80 hover:bg-slate-50 dark:hover:bg-slate-800",
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* DESKTOP VIEW: BẢNG HỢP ĐỒNG ĐIỆN TỬ CHI TIẾT */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/80 dark:bg-slate-800/40">
                    <TableHead className="w-[180px]">Mã HĐ & Ô đất</TableHead>
                    <TableHead>Giống rau canh tác</TableHead>
                    <TableHead>Thời hạn mùa vụ</TableHead>
                    <TableHead>Giá trị hợp đồng</TableHead>
                    <TableHead>Trạng thái pháp lý</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContracts.map((contract) => (
                    <TableRow key={contract.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/60">
                      <TableCell className="font-medium">
                        <div className="space-y-1">
                          <div className="font-mono font-bold text-xs text-foreground flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-emerald-600" />
                            #{contract.contractCode}
                          </div>
                          <Badge variant="secondary" className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800">
                            {contract.plotCode}
                          </Badge>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-0.5">
                          <div className="font-bold text-xs text-foreground flex items-center gap-1.5">
                            <Sprout className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            {contract.cropName}
                          </div>
                          <div className="text-[11px] text-muted-foreground italic truncate max-w-xs">
                            {contract.cropVariety}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-semibold">
                            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                            {contract.startDate} → {contract.endDate}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            Chu kỳ {contract.durationDays} ngày
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="font-mono font-bold text-xs text-emerald-800 dark:text-emerald-400">
                          {contract.totalValue.toLocaleString("vi-VN")} đ
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            contract.signedBadge.variant === "success"
                              ? "default"
                              : contract.signedBadge.variant === "warning"
                                ? "secondary"
                                : "outline"
                          }
                          className={cn(
                            "text-[10px] font-bold px-2 py-0.5",
                            contract.signedBadge.variant === "success" && "bg-emerald-600 text-white",
                            contract.signedBadge.variant === "warning" && "bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border-amber-300",
                          )}
                        >
                          {contract.signedBadge.label}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {contract.status === "pending" ? (
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => setActiveModalContract(contract)}
                              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs h-8 rounded-lg shadow-xs"
                            >
                              Ký số OTP
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setActiveModalContract(contract)}
                              className="text-xs h-8 rounded-lg font-semibold border-slate-200 dark:border-slate-800"
                            >
                              Xem chi tiết
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* MOBILE VIEW: DANH SÁCH THẺ (CARD VIEW) TIỆN VUỐT CHẠM */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {filteredContracts.map((contract) => (
                <Card
                  key={contract.id}
                  className="border-border/80 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                      <Typography.H4 className="font-mono font-bold text-xs text-foreground">
                        #{contract.contractCode}
                      </Typography.H4>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] font-bold px-2 py-0.5",
                        contract.signedBadge.variant === "success" && "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300",
                        contract.signedBadge.variant === "warning" && "bg-amber-50 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 border-amber-300",
                      )}
                    >
                      {contract.signedBadge.label}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Vị trí ô đất:</span>
                      <span className="font-bold text-foreground">{contract.plotCode}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Giống canh tác:</span>
                      <span className="font-bold text-foreground text-right">{contract.cropName}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Thời hạn mùa vụ:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {contract.startDate} → {contract.endDate} ({contract.durationDays} ngày)
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-1 border-t border-border/40">
                      <span className="text-muted-foreground font-semibold">Giá trị hợp đồng:</span>
                      <span className="font-mono font-black text-sm text-emerald-700 dark:text-emerald-400">
                        {contract.totalValue.toLocaleString("vi-VN")} đ
                      </span>
                    </div>
                  </div>

                  {/* QR Verify Stamp & Actions */}
                  <div className="pt-2 border-t border-border/40 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <QrCode className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>Chứng thực SHA-256</span>
                    </div>

                    <Button
                      size="sm"
                      variant={contract.status === "pending" ? "default" : "outline"}
                      onClick={() => setActiveModalContract(contract)}
                      className={cn(
                        "text-xs h-8 px-3 rounded-xl font-bold",
                        contract.status === "pending" ? "bg-amber-600 text-white" : "",
                      )}
                    >
                      {contract.status === "pending" ? "Ký số ngay" : "Chi tiết HĐ"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </Container>

      {/* MODAL / BOTTOM SHEET: CHI TIẾT & KÝ SỐ HỢP ĐỒNG ĐIỆN TỬ */}
      <Modal
        isOpen={Boolean(activeModalContract)}
        onClose={() => {
          setActiveModalContract(null);
          setOtpCode("");
        }}
        title={`Hợp đồng điện tử #${activeModalContract?.contractCode}`}
        description="Văn bản pháp lý thuê đất & ủy quyền canh tác sinh học thông minh"
        size="lg"
      >
        {activeModalContract && (
          <div className="space-y-6 pt-2">
            {otpSigningSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <Typography.H4 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                  Ký số hợp đồng thành công!
                </Typography.H4>
                <Typography.Muted className="text-xs text-emerald-800 dark:text-emerald-300">
                  Hợp đồng số #{activeModalContract.contractCode} đã được cấp con dấu số SHA-256 và chính thức có hiệu lực pháp lý.
                </Typography.Muted>
              </div>
            ) : (
              <>
                {/* Contract Summary Box */}
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Bên cho thuê:</span>
                      <strong className="text-foreground">CTCP Nông nghiệp Công nghệ cao Đà Lạt (Green Farm)</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Bên thuê canh tác:</span>
                      <strong className="text-foreground">Nguyễn Văn An (0912 345 678)</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Đối tượng hợp đồng:</span>
                      <strong className="text-foreground">{activeModalContract.plotCode} ({activeModalContract.plotArea})</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Cây trồng chỉ định:</span>
                      <strong className="text-emerald-800 dark:text-emerald-300">{activeModalContract.cropName}</strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/50 text-[11px] text-muted-foreground leading-relaxed">
                    <strong>Điều khoản chính:</strong> Farm chịu 100% trách nhiệm canh tác chuẩn hữu cơ 5 không, bảo hiểm rủi ro thiên tai, truyền hình ảnh camera 24/7 và giao rau lạnh tận nhà 2 đợt/tuần theo lịch hẹn.
                  </div>
                </div>

                {/* Digital Signature Badge Box */}
                <div className="p-4 rounded-2xl border border-emerald-200/80 bg-emerald-50/50 dark:bg-emerald-950/30 dark:border-emerald-800 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs min-w-0">
                    <strong className="text-emerald-900 dark:text-emerald-200 block">
                      {activeModalContract.signerInfo?.certAuthority}
                    </strong>
                    <div className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80 font-mono truncate">
                      Mã băm: {activeModalContract.signerInfo?.hashSha256}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      Thời gian ký: {activeModalContract.signerInfo?.signedTimestamp}
                    </div>
                  </div>
                </div>

                {/* If Pending: OTP input to sign */}
                {activeModalContract.status === "pending" && (
                  <form onSubmit={handleSignOtp} className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-3">
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-amber-700" />
                      <Typography.H4 className="text-xs font-bold text-amber-950 dark:text-amber-200">
                        Xác thực ký số điện tử qua OTP (Nhập 123456)
                      </Typography.H4>
                    </div>
                    <Typography.Muted className="text-[11px] text-amber-900/80 dark:text-amber-300">
                      Mã OTP đã được gửi đến số điện thoại 0912 345 678 để ký kết hợp đồng.
                    </Typography.Muted>

                    <div className="flex items-center gap-3">
                      <Input
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Nhập 6 số OTP..."
                        maxLength={6}
                        className="font-mono font-bold tracking-widest text-center"
                        required
                      />
                      <Button
                        type="submit"
                        variant="default"
                        size="default"
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 rounded-xl"
                      >
                        Ký số ngay
                      </Button>
                    </div>
                  </form>
                )}

                {/* Actions Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => alert("Đang tải file PDF hợp đồng có dấu mộc điện tử...")}
                    className="text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    Tải bản PDF có dấu mộc
                  </Button>

                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => alert("Mở form gia hạn hợp đồng thêm 60 ngày...")}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs rounded-xl font-bold"
                  >
                    Gia hạn thêm mùa vụ
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </Box>
  );
}
