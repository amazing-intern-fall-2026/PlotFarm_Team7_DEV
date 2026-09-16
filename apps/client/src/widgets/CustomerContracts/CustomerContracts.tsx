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
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import {
  CONTRACT_STATUS_FILTERS,
  MOCK_DIGITAL_CONTRACTS,
  type ContractStatus,
  type DigitalContractItem,
} from "./contracts.constants";

export function CustomerContracts() {
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
    <Box className="space-y-6">
      <Box className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border/80 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-xs">
          <Box className="flex items-center justify-between">
            <Box>
              <Typography.Muted className="text-xs font-semibold text-muted-foreground block">
                Hợp đồng đang canh tác
              </Typography.Muted>
              <Typography.H3 className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-1">
                {stats.activeCount} Hợp đồng
              </Typography.H3>
            </Box>
            <Box className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700">
              <FileCheck2 className="w-6 h-6" />
            </Box>
          </Box>
        </Card>

        <Card className="border-border/80 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-xs">
          <Box className="flex items-center justify-between">
            <Box>
              <Typography.Muted className="text-xs font-semibold text-muted-foreground block">
                Chờ ký số xác thực (OTP)
              </Typography.Muted>
              <Typography.H3 className="text-2xl font-extrabold text-amber-700 dark:text-amber-400 mt-1">
                {stats.pendingCount} Hợp đồng
              </Typography.H3>
            </Box>
            <Box className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-700">
              <KeyRound className="w-6 h-6" />
            </Box>
          </Box>
        </Card>

        <Card className="border-border/80 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-xs">
          <Box className="flex items-center justify-between">
            <Box>
              <Typography.Muted className="text-xs font-semibold text-muted-foreground block">
                Tổng giá trị mùa vụ hữu cơ
              </Typography.Muted>
              <Typography.H3 className="text-2xl font-extrabold text-foreground mt-1">
                {stats.totalInvest.toLocaleString("vi-VN")} đ
              </Typography.H3>
            </Box>
            <Box className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700">
              <Sprout className="w-6 h-6" />
            </Box>
          </Box>
        </Card>
      </Box>

      <Card className="border-border/80 bg-white dark:bg-slate-900 shadow-xs rounded-2xl overflow-hidden">
        <Box className="p-4 sm:p-5 border-b border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Box className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            {CONTRACT_STATUS_FILTERS.map((f) => {
              const isActive = selectedStatus === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedStatus(f.id)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0",
                    isActive
                      ? "bg-emerald-700 text-white shadow-xs font-bold"
                      : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </Box>

          <Typography.Muted className="text-xs text-muted-foreground shrink-0">
            Hiển thị {filteredContracts.length} / {contracts.length} hợp đồng
          </Typography.Muted>
        </Box>

        <Box className="hidden lg:block overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-800/40">
              <TableRow>
                <TableHead className="w-[140px] text-xs font-bold text-foreground">Mã Hợp Đồng</TableHead>
                <TableHead className="text-xs font-bold text-foreground">Ô Đất & Cây Trồng</TableHead>
                <TableHead className="text-xs font-bold text-foreground">Thời Hạn Thuê</TableHead>
                <TableHead className="text-xs font-bold text-foreground">Giá Trị (VNĐ)</TableHead>
                <TableHead className="text-xs font-bold text-foreground">Chứng Thư Pháp Lý</TableHead>
                <TableHead className="text-right text-xs font-bold text-foreground">Thao Tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((c) => (
                <TableRow key={c.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-mono font-bold text-xs text-emerald-800 dark:text-emerald-400">
                    <Box className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      #{c.contractCode}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box className="space-y-0.5">
                      <Box className="flex items-center gap-2">
                        <Typography.Text className="text-xs font-bold text-foreground">{c.plotCode}</Typography.Text>
                        <Typography.Muted className="text-[11px] text-muted-foreground">({c.plotArea})</Typography.Muted>
                      </Box>
                      <Typography.Text className="text-xs font-medium text-emerald-700 dark:text-emerald-300 block">
                        {c.cropName}
                      </Typography.Text>
                      <Typography.Muted className="text-[10px] text-slate-500 italic block">
                        {c.cropVariety}
                      </Typography.Muted>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box className="space-y-0.5">
                      <Box className="flex items-center gap-1.5 text-xs text-foreground font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        {c.durationDays} ngày canh tác
                      </Box>
                      <Typography.Muted className="text-[11px] text-muted-foreground block">
                        {c.startDate} - {c.endDate}
                      </Typography.Muted>
                    </Box>
                  </TableCell>

                  <TableCell className="font-mono font-bold text-xs text-foreground">
                    {c.totalValue.toLocaleString("vi-VN")} đ
                  </TableCell>

                  <TableCell>
                    <Box className="space-y-1">
                      {c.status === "active" && (
                        <Badge variant="secondary" className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                          <ShieldCheck className="w-3 h-3 mr-1" />
                          {c.signedBadge.label}
                        </Badge>
                      )}
                      {c.status === "pending" && (
                        <Badge variant="outline" className="bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 text-[10px] font-bold">
                          <KeyRound className="w-3 h-3 mr-1" />
                          {c.signedBadge.label}
                        </Badge>
                      )}
                      {c.status === "archived" && (
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px] font-bold">
                          {c.signedBadge.label}
                        </Badge>
                      )}
                      {c.signerInfo?.hashSha256 && c.status === "active" && (
                        <Typography.Muted className="text-[9px] font-mono text-muted-foreground block truncate max-w-[150px]" title={c.signerInfo.hashSha256}>
                          SHA256: {c.signerInfo.hashSha256.slice(0, 12)}...
                        </Typography.Muted>
                      )}
                    </Box>
                  </TableCell>

                  <TableCell className="text-right">
                    <Box className="flex items-center justify-end gap-1.5">
                      {c.status === "pending" ? (
                        <Button
                          size="sm"
                          onClick={() => setActiveModalContract(c)}
                          className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg h-8 px-3"
                        >
                          <KeyRound className="w-3.5 h-3.5 mr-1" />
                          Ký số OTP
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => alert(`Mở bản hợp đồng PDF điện tử: ${c.contractCode}`)}
                            className="text-xs h-8 px-2.5 rounded-lg text-emerald-700 hover:bg-emerald-50"
                            title="Xem hợp đồng (PDF)"
                          >
                            <FileText className="w-3.5 h-3.5 mr-1" />
                            Xem
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => alert(`Tải xuống bản hợp đồng có mộc số: ${c.contractCode}`)}
                            className="text-xs h-8 px-2.5 rounded-lg text-slate-600 hover:text-foreground"
                            title="Tải bản có dấu mộc số"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </Button>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <Box className="block lg:hidden p-4 space-y-4">
          {filteredContracts.map((c) => (
            <Card
              key={c.id}
              className="border border-border/80 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl p-4 space-y-3.5 shadow-2xs"
            >
              <Box className="flex items-start justify-between gap-2">
                <Box className="space-y-0.5">
                  <Box className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    <Typography.H4 className="font-mono font-bold text-xs text-foreground">
                      #{c.contractCode}
                    </Typography.H4>
                  </Box>
                  <Typography.Text className="text-xs font-extrabold text-emerald-800 dark:text-emerald-400 block">
                    {c.plotCode}
                  </Typography.Text>
                </Box>

                <Box className="flex items-center gap-1.5">
                  <Box className="p-1 rounded-lg bg-white dark:bg-slate-900 border border-border" title="Quét QR xác thực">
                    <QrCode className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  </Box>
                  {c.status === "active" && (
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      E-signed
                    </Badge>
                  )}
                  {c.status === "pending" && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-300 text-[10px] font-bold">
                      Chờ OTP
                    </Badge>
                  )}
                </Box>
              </Box>

              <Box className="space-y-1 bg-white dark:bg-slate-900 p-3 rounded-xl border border-border/60">
                <Typography.Text className="text-xs font-bold text-foreground block">
                  {c.cropName}
                </Typography.Text>
                <Typography.Muted className="text-[11px] text-muted-foreground block">
                  Thời hạn: {c.durationDays} ngày ({c.startDate} - {c.endDate})
                </Typography.Muted>
                <Box className="flex items-center justify-between pt-1 border-t border-border/40 text-xs">
                  <Typography.Muted className="text-muted-foreground">Giá trị mùa vụ:</Typography.Muted>
                  <Typography.Text className="font-mono font-bold text-foreground">
                    {c.totalValue.toLocaleString("vi-VN")} đ
                  </Typography.Text>
                </Box>
              </Box>

              <Box className="flex items-center gap-2 pt-1">
                {c.status === "pending" ? (
                  <Button
                    size="sm"
                    onClick={() => setActiveModalContract(c)}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl h-9"
                  >
                    <KeyRound className="w-4 h-4 mr-1.5" />
                    Xác thực ký số ngay (OTP)
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alert(`Mở xem hợp đồng: ${c.contractCode}`)}
                      className="flex-1 text-xs h-9 rounded-xl font-semibold"
                    >
                      <FileText className="w-3.5 h-3.5 mr-1" />
                      Xem PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alert(`Tải xuống hợp đồng có mộc: ${c.contractCode}`)}
                      className="text-xs h-9 px-3 rounded-xl font-semibold"
                      title="Tải có mộc số"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </Button>
                  </>
                )}
              </Box>
            </Card>
          ))}
        </Box>
      </Card>

      <Modal
        isOpen={!!activeModalContract}
        onClose={() => {
          setActiveModalContract(null);
          setOtpCode("");
          setOtpSigningSuccess(false);
        }}
        title="Ký xác thực hợp đồng điện tử"
        description="Mã xác thực OTP (6 chữ số) đã được gửi đến số điện thoại và email của bạn."
      >
        {activeModalContract && (
          <Box className="space-y-4 pt-2">
            {otpSigningSuccess ? (
              <Box className="p-6 text-center space-y-3">
                <Box className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </Box>
                <Typography.H4 className="text-base font-bold text-foreground">
                  Ký số hợp đồng thành công!
                </Typography.H4>
                <Typography.Muted className="text-xs text-muted-foreground">
                  Chứng thư điện tử SHA-256 đã được đính kèm vào hợp đồng #{activeModalContract.contractCode}.
                </Typography.Muted>
              </Box>
            ) : (
              <form onSubmit={handleSignOtp} className="space-y-4">
                <Box className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1.5 border border-border">
                  <Box className="flex justify-between">
                    <Typography.Muted className="text-muted-foreground">Mã hợp đồng:</Typography.Muted>
                    <Typography.Text className="font-mono font-bold">{activeModalContract.contractCode}</Typography.Text>
                  </Box>
                  <Box className="flex justify-between">
                    <Typography.Muted className="text-muted-foreground">Ô đất canh tác:</Typography.Muted>
                    <Typography.Text className="font-semibold">{activeModalContract.plotCode}</Typography.Text>
                  </Box>
                  <Box className="flex justify-between">
                    <Typography.Muted className="text-muted-foreground">Giống rau:</Typography.Muted>
                    <Typography.Text className="font-semibold text-emerald-700">{activeModalContract.cropName}</Typography.Text>
                  </Box>
                </Box>

                <Box className="space-y-1.5">
                  <Input
                    label="Nhập mã OTP (Dùng thử: 2026)"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Nhập 4-6 chữ số..."
                    maxLength={6}
                    autoFocus
                    required
                  />
                  <Typography.Muted className="text-[11px] text-muted-foreground block">
                    Bằng việc bấm xác nhận, bạn cam kết tuân thủ các điều khoản hợp đồng thuê đất hữu cơ Green Farm.
                  </Typography.Muted>
                </Box>

                <Box className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveModalContract(null)}
                    className="text-xs"
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    size="sm"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl"
                  >
                    Xác nhận ký số
                  </Button>
                </Box>
              </form>
            )}
          </Box>
        )}
      </Modal>
    </Box>
  );
}
