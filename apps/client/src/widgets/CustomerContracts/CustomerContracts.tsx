import * as React from "react";
import {
  FileText,
  Download,
  Eye,
  KeyRound,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Sprout,
  FileCheck2,
  QrCode,
} from "lucide-react";
import {
  Box,
  Card,
  CardContent,
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
  CONTRACT_METRIC_CARDS,
  CONTRACT_STATUS_FILTERS,
  MOCK_DIGITAL_CONTRACTS,
  CONTRACTS_PAGE_TEXT,
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
              label: "Đã ký số điện tử",
              variant: "success",
              tooltipText: "Bảo đảm tính toàn vẹn theo Luật GDĐT",
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
    }, 1800);
  };

  return (
    <Box className="space-y-6 font-sans">
      {/* 4 Chuẩn hóa Metric Cards */}
      <Box className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {CONTRACT_METRIC_CARDS.map((metric) => {
          let metricValue = metric.value;
          if (metric.id === "active-contracts") metricValue = `${stats.activeCount} HĐ`;
          if (metric.id === "pending-contracts") metricValue = `${stats.pendingCount} HĐ`;
          if (metric.id === "total-value") metricValue = `${stats.totalInvest.toLocaleString("vi-VN")} đ`;

          const isAmber = metric.highlight === "amber";

          return (
            <Card
              key={metric.id}
              className={cn(
                "rounded-2xl p-4 sm:p-5 shadow-xs transition-all border",
                isAmber
                  ? "bg-amber-50/40 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60"
                  : "bg-white dark:bg-slate-900 border-border/80",
              )}
            >
              <CardContent className="p-0 flex items-start justify-between gap-3">
                <Box className="space-y-1 min-w-0">
                  <Typography.Muted className="text-xs font-medium text-muted-foreground block truncate">
                    {metric.title}
                  </Typography.Muted>
                  <Typography.H3
                    className={cn(
                      "text-xl sm:text-2xl font-extrabold tracking-tight",
                      isAmber
                        ? "text-amber-700 dark:text-amber-400"
                        : "text-foreground",
                    )}
                  >
                    {metricValue}
                  </Typography.H3>
                  {metric.helperText && (
                    <Typography.Muted className="text-[11px] text-muted-foreground block truncate">
                      {metric.helperText}
                    </Typography.Muted>
                  )}
                </Box>

                <Box
                  className={cn(
                    "p-2.5 rounded-xl shrink-0",
                    metric.iconName === "active" && "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600",
                    metric.iconName === "pending" && "bg-amber-100/80 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
                    metric.iconName === "revenue" && "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400",
                    metric.iconName === "yield" && "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600",
                  )}
                >
                  {metric.iconName === "active" && <FileCheck2 className="w-5 h-5" />}
                  {metric.iconName === "pending" && <KeyRound className="w-5 h-5" />}
                  {metric.iconName === "revenue" && <ShieldCheck className="w-5 h-5" />}
                  {metric.iconName === "yield" && <Sprout className="w-5 h-5" />}
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* Danh sách hợp đồng */}
      <Card className="border-border/80 bg-white dark:bg-slate-900 shadow-xs rounded-2xl overflow-hidden">
        {/* Header Bộ lọc trạng thái */}
        <Box className="p-4 sm:p-5 border-b border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Box className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto scrollbar-none">
            {CONTRACT_STATUS_FILTERS.map((f) => {
              const isActive = selectedStatus === f.id;
              return (
                <Button
                  key={f.id}
                  variant={isActive ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedStatus(f.id)}
                  className={cn(
                    "h-8 px-3.5 rounded-xl text-xs font-semibold shrink-0 transition-all",
                    isActive
                      ? "bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs font-bold"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-muted-foreground hover:text-foreground border-0",
                  )}
                >
                  {f.label}
                </Button>
              );
            })}
          </Box>

          <Typography.Muted className="text-xs text-muted-foreground shrink-0">
            Hiển thị {filteredContracts.length} / {contracts.length} hợp đồng
          </Typography.Muted>
        </Box>

        {/* GIAO DIỆN DESKTOP (Data Table cố định tỷ lệ cột, không co giật chữ) */}
        <Box className="hidden lg:block overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80 dark:bg-slate-800/40">
              <TableRow className="border-b border-border/70 hover:bg-transparent">
                <TableHead className="w-[15%] text-xs font-bold text-foreground">
                  {CONTRACTS_PAGE_TEXT.tableHeaders.code}
                </TableHead>
                <TableHead className="w-[30%] text-xs font-bold text-foreground">
                  {CONTRACTS_PAGE_TEXT.tableHeaders.plotAndCrop}
                </TableHead>
                <TableHead className="w-[20%] text-xs font-bold text-foreground">
                  {CONTRACTS_PAGE_TEXT.tableHeaders.duration}
                </TableHead>
                <TableHead className="w-[15%] text-xs font-bold text-foreground">
                  {CONTRACTS_PAGE_TEXT.tableHeaders.value}
                </TableHead>
                <TableHead className="w-[20%] text-right text-xs font-bold text-foreground">
                  {CONTRACTS_PAGE_TEXT.tableHeaders.legalAndActions}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((c) => (
                <TableRow key={c.id} className="hover:bg-muted/30 transition-colors border-b border-border/60">
                  {/* Cột 1: Mã HĐ (15%) */}
                  <TableCell className="w-[15%] align-middle font-mono font-bold text-xs text-emerald-800 dark:text-emerald-400">
                    <Box className="flex items-center gap-1.5 whitespace-nowrap">
                      <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      #{c.contractCode}
                    </Box>
                  </TableCell>

                  {/* Cột 2: Ô đất & Cây trồng (30%) - 2 dòng chuẩn, tên tiếng Việt */}
                  <TableCell className="w-[30%] align-middle">
                    <Box className="space-y-1">
                      <Box className="flex items-center gap-2 flex-wrap">
                        <Typography.Text className="text-xs font-bold text-foreground whitespace-nowrap">
                          {c.plotCode}
                        </Typography.Text>
                        <Badge
                          variant="secondary"
                          className="text-[10px] font-semibold px-1.5 py-0 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {c.plotArea}
                        </Badge>
                      </Box>

                      <Box className="space-y-0.5">
                        <Typography.Text className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 block">
                          {c.cropName}
                        </Typography.Text>
                        <Typography.Muted className="text-[11px] text-muted-foreground block truncate">
                          {c.zoneDescription}
                        </Typography.Muted>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Cột 3: Thời hạn thuê (20%) */}
                  <TableCell className="w-[20%] align-middle">
                    <Box className="space-y-1">
                      <Badge
                        variant="outline"
                        className="text-[10px] font-semibold px-2 py-0.5 border-emerald-300/80 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/30 whitespace-nowrap"
                      >
                        <Clock className="w-3 h-3 mr-1 shrink-0" />
                        {c.durationDays} ngày canh tác
                      </Badge>
                      <Typography.Muted className="text-[11px] text-muted-foreground block whitespace-nowrap">
                        {c.startDate} — {c.endDate}
                      </Typography.Muted>
                    </Box>
                  </TableCell>

                  {/* Cột 4: Giá trị (15%) */}
                  <TableCell className="w-[15%] align-middle">
                    <Typography.Text className="font-mono font-extrabold text-sm text-foreground whitespace-nowrap block">
                      {c.totalValue.toLocaleString("vi-VN")} đ
                    </Typography.Text>
                  </TableCell>

                  {/* Cột 5: Chứng thư & Thao tác (20%) - Đồng bộ hàng lối */}
                  <TableCell className="w-[20%] align-middle text-right">
                    <Box className="flex flex-col items-end gap-1.5">
                      {/* Badge Chứng thư với Tooltip */}
                      <Box className="group relative inline-flex items-center">
                        {c.status === "active" && (
                          <Badge
                            variant="secondary"
                            className="bg-emerald-100/90 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 border border-emerald-300/60 dark:border-emerald-800/60 cursor-help whitespace-nowrap"
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            {c.signedBadge.label}
                          </Badge>
                        )}
                        {c.status === "pending" && (
                          <Badge
                            variant="outline"
                            className="bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 text-[10px] font-bold px-2 py-0.5 cursor-help whitespace-nowrap"
                          >
                            <Clock className="w-3 h-3 mr-1 text-amber-600 shrink-0" />
                            {c.signedBadge.label}
                          </Badge>
                        )}
                        {c.status === "archived" && (
                          <Badge
                            variant="secondary"
                            className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px] font-bold px-2 py-0.5 whitespace-nowrap"
                          >
                            {c.signedBadge.label}
                          </Badge>
                        )}

                        {/* Tooltip hiển thị khi hover */}
                        <Box className="absolute bottom-full right-0 mb-1.5 hidden group-hover:flex items-center z-30 pointer-events-none">
                          <Box className="bg-slate-900 text-white text-[10px] font-medium px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap">
                            {c.signedBadge.tooltipText}
                          </Box>
                        </Box>
                      </Box>

                      {/* Hàng nút bấm thao tác đồng trục kích thước */}
                      <Box className="flex items-center justify-end gap-1.5">
                        {c.status === "pending" ? (
                          <Button
                            size="sm"
                            onClick={() => setActiveModalContract(c)}
                            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg h-8 px-3.5 shadow-xs"
                          >
                            <KeyRound className="w-3.5 h-3.5 mr-1" />
                            {CONTRACTS_PAGE_TEXT.actions.signOtp}
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => alert(`Xem hợp đồng điện tử: ${c.contractCode}`)}
                              className="text-xs h-8 px-2.5 rounded-lg text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 font-semibold"
                              title="Xem chi tiết hợp đồng"
                            >
                              <Eye className="w-3.5 h-3.5 mr-1" />
                              {CONTRACTS_PAGE_TEXT.actions.viewPdf}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => alert(`Tải bản hợp đồng có chứng thư: ${c.contractCode}`)}
                              className="text-xs h-8 px-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-foreground border-border/80"
                              title="Tải xuống PDF"
                            >
                              <Download className="w-3.5 h-3.5 mr-1" />
                              {CONTRACTS_PAGE_TEXT.actions.download}
                            </Button>
                          </>
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* GIAO DIỆN MOBILE (Card List thân thiện thao tác một chạm) */}
        <Box className="block lg:hidden p-4 space-y-4">
          {filteredContracts.map((c) => (
            <Card
              key={c.id}
              className="border border-border/80 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl p-4 space-y-3.5 shadow-2xs"
            >
              {/* Header Thẻ: Mã HĐ + Badge trạng thái */}
              <Box className="flex items-center justify-between gap-2">
                <Box className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <Typography.H4 className="font-mono font-bold text-xs text-foreground">
                    #{c.contractCode}
                  </Typography.H4>
                </Box>

                <Box className="flex items-center gap-1.5">
                  <Box
                    className="p-1 rounded-lg bg-white dark:bg-slate-900 border border-border"
                    title="Mã QR tra cứu hợp đồng"
                  >
                    <QrCode className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                  </Box>
                  {c.status === "active" && (
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
                      Đang hiệu lực
                    </Badge>
                  )}
                  {c.status === "pending" && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 text-[10px] font-bold">
                      Chờ ký OTP
                    </Badge>
                  )}
                  {c.status === "archived" && (
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-slate-800 text-[10px] font-bold">
                      Đã kết thúc
                    </Badge>
                  )}
                </Box>
              </Box>

              {/* Body Thẻ: 3 hàng thông tin cô đọng */}
              <Box className="space-y-2 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-border/70 text-xs">
                {/* Hàng 1: Ô đất & Giống rau */}
                <Box className="flex items-start justify-between gap-2 pb-1.5 border-b border-border/40">
                  <Typography.Muted className="text-muted-foreground shrink-0">
                    {CONTRACTS_PAGE_TEXT.mobileLabels.plotAndCrop}:
                  </Typography.Muted>
                  <Box className="text-right">
                    <Typography.Text className="font-bold text-foreground block">
                      {c.plotCode} ({c.plotArea})
                    </Typography.Text>
                    <Typography.Text className="font-semibold text-emerald-700 dark:text-emerald-400 block text-[11px]">
                      {c.cropName}
                    </Typography.Text>
                  </Box>
                </Box>

                {/* Hàng 2: Thời hạn mùa vụ */}
                <Box className="flex items-center justify-between gap-2 pb-1.5 border-b border-border/40">
                  <Typography.Muted className="text-muted-foreground">
                    {CONTRACTS_PAGE_TEXT.mobileLabels.duration}:
                  </Typography.Muted>
                  <Typography.Text className="font-semibold text-foreground text-right">
                    {c.durationDays} ngày ({c.startDate} - {c.endDate})
                  </Typography.Text>
                </Box>

                {/* Hàng 3: Tổng chi phí */}
                <Box className="flex items-center justify-between gap-2 pt-0.5">
                  <Typography.Muted className="text-muted-foreground">
                    {CONTRACTS_PAGE_TEXT.mobileLabels.totalValue}:
                  </Typography.Muted>
                  <Typography.Text className="font-mono font-extrabold text-sm text-foreground text-right">
                    {c.totalValue.toLocaleString("vi-VN")} đ
                  </Typography.Text>
                </Box>
              </Box>

              {/* Footer Thẻ: Nút bấm lớn full-width */}
              <Box className="pt-1">
                {c.status === "pending" ? (
                  <Button
                    size="sm"
                    onClick={() => setActiveModalContract(c)}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl h-10 shadow-xs"
                  >
                    <KeyRound className="w-4 h-4 mr-1.5" />
                    {CONTRACTS_PAGE_TEXT.actions.signOtpMobile}
                  </Button>
                ) : (
                  <Box className="grid grid-cols-2 gap-2 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alert(`Mở xem hợp đồng: ${c.contractCode}`)}
                      className="text-xs h-10 rounded-xl font-semibold border-border"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      {CONTRACTS_PAGE_TEXT.actions.viewPdfMobile}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alert(`Tải xuống hợp đồng có mộc: ${c.contractCode}`)}
                      className="text-xs h-10 rounded-xl font-semibold border-border"
                    >
                      <Download className="w-3.5 h-3.5 mr-1" />
                      {CONTRACTS_PAGE_TEXT.actions.download}
                    </Button>
                  </Box>
                )}
              </Box>
            </Card>
          ))}
        </Box>
      </Card>

      {/* Modal Ký xác thực hợp đồng điện tử qua OTP */}
      <Modal
        isOpen={!!activeModalContract}
        onClose={() => {
          setActiveModalContract(null);
          setOtpCode("");
          setOtpSigningSuccess(false);
        }}
        title={CONTRACTS_PAGE_TEXT.modal.title}
        description={CONTRACTS_PAGE_TEXT.modal.description}
      >
        {activeModalContract && (
          <Box className="space-y-4 pt-2">
            {otpSigningSuccess ? (
              <Box className="p-6 text-center space-y-3">
                <Box className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </Box>
                <Typography.H4 className="text-base font-bold text-foreground">
                  {CONTRACTS_PAGE_TEXT.modal.successTitle}
                </Typography.H4>
                <Typography.Muted className="text-xs text-muted-foreground">
                  {CONTRACTS_PAGE_TEXT.modal.successSubtitle} #{activeModalContract.contractCode}.
                </Typography.Muted>
              </Box>
            ) : (
              <Box as="form" onSubmit={handleSignOtp} className="space-y-4">
                <Box className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1.5 border border-border">
                  <Box className="flex justify-between">
                    <Typography.Muted className="text-muted-foreground">
                      {CONTRACTS_PAGE_TEXT.modal.labelContractCode}
                    </Typography.Muted>
                    <Typography.Text className="font-mono font-bold text-foreground">
                      {activeModalContract.contractCode}
                    </Typography.Text>
                  </Box>
                  <Box className="flex justify-between">
                    <Typography.Muted className="text-muted-foreground">
                      {CONTRACTS_PAGE_TEXT.modal.labelPlot}
                    </Typography.Muted>
                    <Typography.Text className="font-semibold text-foreground">
                      {activeModalContract.plotCode} ({activeModalContract.plotArea})
                    </Typography.Text>
                  </Box>
                  <Box className="flex justify-between">
                    <Typography.Muted className="text-muted-foreground">
                      {CONTRACTS_PAGE_TEXT.modal.labelCrop}
                    </Typography.Muted>
                    <Typography.Text className="font-semibold text-emerald-700 dark:text-emerald-400">
                      {activeModalContract.cropName}
                    </Typography.Text>
                  </Box>
                </Box>

                <Box className="space-y-1.5">
                  <Input
                    label={CONTRACTS_PAGE_TEXT.modal.inputLabel}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder={CONTRACTS_PAGE_TEXT.modal.inputPlaceholder}
                    maxLength={6}
                    autoFocus
                    required
                  />
                  <Typography.Muted className="text-[11px] text-muted-foreground block">
                    {CONTRACTS_PAGE_TEXT.modal.termsCommitment}
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
                    {CONTRACTS_PAGE_TEXT.modal.btnCancel}
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    size="sm"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl"
                  >
                    {CONTRACTS_PAGE_TEXT.modal.btnConfirm}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Modal>
    </Box>
  );
}
