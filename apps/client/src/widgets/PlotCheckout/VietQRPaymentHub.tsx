import * as React from "react";
import {
  Copy,
  Check,
  Download,
  Smartphone,
  Zap,
  Clock,
  Building2,
  CreditCard,
  Hash,
  AlertCircle,
} from "lucide-react";
import {
  Box,
  Flex,
  Card,
  CardHeader,
  CardContent,
  Heading,
  Text,
  Badge,
  Button,
  Separator,
  Image,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import {
  CHECKOUT_BANK_INFO,
  CHECKOUT_TEXTS,
  type BankBeneficiaryInfo,
  type CheckoutMockOrder,
} from "./checkout.constants";

export interface VietQRPaymentHubProps {
  order: CheckoutMockOrder;
  bankInfo?: BankBeneficiaryInfo;
  qrImageUrl?: string;
  formattedCountdown: string;
  isTimerWarning: boolean;
  transferContent: string;
  onSimulatePayment: () => Promise<void>;
  isSimulating: boolean;
  onCopySuccess: (text: string) => void;
  className?: string;
}

export const VietQRPaymentHub: React.FC<VietQRPaymentHubProps> = ({
  order,
  bankInfo = CHECKOUT_BANK_INFO,
  qrImageUrl,
  formattedCountdown,
  isTimerWarning,
  transferContent,
  onSimulatePayment,
  isSimulating,
  onCopySuccess,
  className,
}) => {
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  // Sinh link VietQR chuẩn nếu không truyền qrImageUrl
  const computedQrUrl = React.useMemo(() => {
    if (qrImageUrl) return qrImageUrl;
    const cleanAmount = Math.round(order.totalAmount);
    const encodedContent = encodeURIComponent(transferContent);
    return `https://img.vietqr.io/image/${bankInfo.bankId}-${bankInfo.accountNumber}-compact2.png?amount=${cleanAmount}&addInfo=${encodedContent}&accountName=${encodeURIComponent(bankInfo.accountName)}`;
  }, [qrImageUrl, bankInfo, order.totalAmount, transferContent]);

  const bankingDeepLink = React.useMemo(() => {
    const cleanAmount = Math.round(order.totalAmount);
    const encodedContent = encodeURIComponent(transferContent);
    return `https://dl.vietqr.io/pay?bankId=${bankInfo.bankId}&accountNo=${bankInfo.accountNumber}&amount=${cleanAmount}&memo=${encodedContent}`;
  }, [bankInfo, order.totalAmount, transferContent]);

  const handleCopy = (fieldId: string, value: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopiedField(fieldId);
    onCopySuccess(value);
    window.setTimeout(() => setCopiedField(null), 2500);
  };

  const handleDownloadQr = () => {
    const link = document.createElement("a");
    link.href = computedQrUrl;
    link.download = `VietQR-${order.orderCode}.png`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenBankingApp = () => {
    window.location.href = bankingDeepLink;
  };

  const formattedAmount = order.totalAmount.toLocaleString("vi-VN");

  return (
    <Box className={cn("space-y-6", className)}>
      <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-2xl overflow-hidden">
        <CardHeader className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50/70 to-slate-50/70 dark:from-emerald-950/20 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800">
          <Flex justify="between" align="center" className="flex-wrap gap-2">
            <Flex align="center" gap={2}>
              <Badge
                variant="outline"
                className="bg-emerald-600 text-white border-0 font-extrabold text-[11px] px-2 py-0.5"
              >
                {CHECKOUT_TEXTS.paymentHub.vietqrBadge}
              </Badge>
              <Badge
                variant="secondary"
                className="font-bold text-[11px] bg-slate-200/80 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
              >
                {CHECKOUT_TEXTS.paymentHub.napasBadge}
              </Badge>
              <Badge
                variant="outline"
                className="border-emerald-300 text-emerald-800 dark:border-emerald-700 dark:text-emerald-300 text-[11px] font-medium hidden sm:inline-flex"
              >
                {CHECKOUT_TEXTS.paymentHub.dynamicQrBadge}
              </Badge>
            </Flex>

            <Flex
              align="center"
              gap={1.5}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-mono font-bold transition-all border shadow-2xs",
                isTimerWarning
                  ? "bg-rose-50 text-rose-600 border-rose-200 animate-pulse dark:bg-rose-950/50 dark:border-rose-800 dark:text-rose-300"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
              )}
            >
              <Clock className={cn("w-3.5 h-3.5 shrink-0", isTimerWarning && "text-rose-600 animate-spin")} />
              <Text variant="caption" className="font-sans text-[11px] font-medium">
                {CHECKOUT_TEXTS.paymentHub.qrExpiryPrefix}
              </Text>
              <Text variant="body2" className="font-mono font-bold text-xs">
                {formattedCountdown}
              </Text>
            </Flex>
          </Flex>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* 1. KHỐI TRUNG TÂM: MÃ VIETQR HERO (CĂN GIỮA NỔI BẬT) */}
          <Box className="flex flex-col items-center justify-center text-center space-y-4">
            <Box className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-emerald-500/30 shadow-lg shadow-emerald-600/5 dark:shadow-none relative w-full max-w-[260px] sm:max-w-[280px] aspect-square flex items-center justify-center overflow-hidden group">
              <Image
                src={computedQrUrl}
                alt="Mã VietQR Chuyển Khoản Napas 24/7"
                className="w-full h-full object-contain"
              />
              <Box className="absolute inset-0 bg-emerald-950/5 pointer-events-none rounded-2xl" />
            </Box>

            <Text variant="caption" className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium max-w-sm leading-relaxed">
              {CHECKOUT_TEXTS.paymentHub.qrScanInstruction}
            </Text>

            <Flex align="center" justify="center" gap={3} className="w-full max-w-sm pt-1 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadQr}
                className="flex-1 min-w-[140px] h-9 text-xs rounded-xl font-semibold border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                {CHECKOUT_TEXTS.paymentHub.downloadQrButton}
              </Button>

              <Button
                size="sm"
                variant="default"
                onClick={handleOpenBankingApp}
                className="flex-1 min-w-[140px] h-9 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-700/20 flex items-center justify-center gap-1.5"
              >
                <Smartphone className="w-3.5 h-3.5 shrink-0" />
                Mở App Ngân Hàng
              </Button>
            </Flex>
          </Box>

          {/* ĐƯỜNG PHÂN CÁCH TRANG TRÃ HÀI HÒA */}
          <Flex align="center" gap={3} className="py-1">
            <Separator className="flex-1 bg-slate-200 dark:bg-slate-800" />
            <Text variant="caption" className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2 shrink-0">
              Hoặc chuyển khoản thủ công
            </Text>
            <Separator className="flex-1 bg-slate-200 dark:bg-slate-800" />
          </Flex>

          {/* 2. THÔNG TIN CHUYỂN KHOẢN THỦ CÔNG: BỐ CỤC LƯỚI GỌN GÀNG, KHÔNG RỐI */}
          <Box className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* THÔNG TIN NGÂN HÀNG */}
            <Box className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
              <Text variant="caption" className="text-[11px] text-slate-500 font-medium block mb-1">
                {CHECKOUT_TEXTS.paymentHub.bankNameLabel}
              </Text>
              <Flex justify="between" align="center" gap={2}>
                <Flex align="center" gap={1.5} className="min-w-0">
                  <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <Text variant="body2" className="font-bold text-slate-900 dark:text-white truncate text-sm">
                    {bankInfo.bankName}
                  </Text>
                </Flex>
                <Badge variant="secondary" className="font-bold text-[10px] shrink-0">
                  {bankInfo.bankShortName}
                </Badge>
              </Flex>
              <Text variant="caption" className="text-[11px] text-slate-500 mt-1.5 block uppercase truncate">
                Chủ TK: {bankInfo.accountName}
              </Text>
            </Box>

            {/* SỐ TÀI KHOẢN */}
            <Box className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-400/60 transition-colors flex flex-col justify-between">
              <Text variant="caption" className="text-[11px] text-slate-500 font-medium block mb-1">
                {CHECKOUT_TEXTS.paymentHub.accountNumberLabel}
              </Text>
              <Flex justify="between" align="center" gap={2}>
                <Flex align="center" gap={1.5} className="min-w-0">
                  <CreditCard className="w-4 h-4 text-emerald-600 shrink-0" />
                  <Text variant="body1" className="font-mono font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-wider">
                    {bankInfo.accountNumber}
                  </Text>
                </Flex>
                <Button
                  size="sm"
                  variant={copiedField === "accountNumber" ? "default" : "outline"}
                  onClick={() => handleCopy("accountNumber", bankInfo.accountNumber)}
                  className={cn(
                    "h-8 px-3 text-xs font-bold rounded-lg shrink-0 flex items-center gap-1 transition-all",
                    copiedField === "accountNumber" && "bg-emerald-600 text-white",
                  )}
                >
                  {copiedField === "accountNumber" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Đã chép
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      {CHECKOUT_TEXTS.paymentHub.copyButtonText}
                    </>
                  )}
                </Button>
              </Flex>
              <Text variant="caption" className="text-[11px] text-slate-400 mt-1.5 block">
                Ngân hàng TMCP Quân Đội
              </Text>
            </Box>

            {/* SỐ TIỀN CẦN CHUYỂN (FULL ROW) */}
            <Box className="sm:col-span-2 p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-400/60 transition-colors flex items-center justify-between gap-3">
              <Box className="min-w-0">
                <Text variant="caption" className="text-[11px] text-slate-500 font-medium block">
                  {CHECKOUT_TEXTS.paymentHub.amountLabel}
                </Text>
                <Text variant="body1" className="font-black text-xl text-emerald-800 dark:text-emerald-400 mt-0.5 tracking-tight">
                  {formattedAmount}&nbsp;VNĐ
                </Text>
              </Box>
              <Button
                size="sm"
                variant={copiedField === "amount" ? "default" : "outline"}
                onClick={() => handleCopy("amount", String(Math.round(order.totalAmount)))}
                className={cn(
                  "h-8 px-3.5 text-xs font-bold rounded-lg shrink-0 flex items-center gap-1 transition-all",
                  copiedField === "amount" && "bg-emerald-600 text-white",
                )}
              >
                {copiedField === "amount" ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Đã chép
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    {CHECKOUT_TEXTS.paymentHub.copyButtonText}
                  </>
                )}
              </Button>
            </Box>

            {/* NỘI DUNG CHUYỂN KHOẢN (BẮT BUỘC GIỮ NGUYÊN) (FULL ROW NỔI BẬT) */}
            <Box className="sm:col-span-2 p-4 rounded-xl bg-amber-500/10 dark:bg-amber-950/40 border-2 border-amber-400/60 dark:border-amber-600/50 relative overflow-hidden space-y-2">
              <Flex justify="between" align="center" className="flex-wrap gap-2">
                <Box className="min-w-0 pr-2">
                  <Flex align="center" gap={1.5}>
                    <Hash className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                    <Text variant="caption" className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                      {CHECKOUT_TEXTS.paymentHub.transferContentLabel}
                    </Text>
                  </Flex>
                  <Text variant="body1" className="font-mono font-black text-xl sm:text-2xl text-amber-950 dark:text-amber-200 mt-1 tracking-wider">
                    {transferContent}
                  </Text>
                </Box>
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => handleCopy("transferContent", transferContent)}
                  className={cn(
                    "h-9 px-4 text-xs font-black rounded-lg shrink-0 flex items-center gap-1.5 transition-all shadow-md bg-amber-600 hover:bg-amber-700 text-white",
                    copiedField === "transferContent" && "bg-emerald-600 hover:bg-emerald-700",
                  )}
                >
                  {copiedField === "transferContent" ? (
                    <>
                      <Check className="w-4 h-4" />
                      Đã chép
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Sao chép mã
                    </>
                  )}
                </Button>
              </Flex>

              <Flex align="center" gap={1.5} className="pt-1 text-amber-800 dark:text-amber-300/90 text-xs">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <Text variant="caption" className="text-[11px] font-medium leading-tight">
                  {CHECKOUT_TEXTS.paymentHub.transferContentWarning}
                </Text>
              </Flex>
            </Box>
          </Box>

          <Box className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <Flex align="center" gap={2.5}>
              <Box className="relative flex h-3 w-3 shrink-0">
                <Box className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <Box className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </Box>
              <Text variant="caption" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {CHECKOUT_TEXTS.paymentHub.pollingText}
              </Text>
            </Flex>
          </Box>

          <Separator />

          <Box className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800 space-y-3">
            <Flex justify="between" align="center">
              <Flex align="center" gap={1.5}>
                <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                <Heading level={5} className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                  {CHECKOUT_TEXTS.demoSandbox.cardTitle}
                </Heading>
              </Flex>
              <Badge variant="outline" className="text-[10px] font-bold border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-300">
                {CHECKOUT_TEXTS.demoSandbox.cardBadge}
              </Badge>
            </Flex>

            <Text variant="caption" className="text-xs text-slate-600 dark:text-slate-400 block leading-relaxed">
              {CHECKOUT_TEXTS.demoSandbox.cardDesc}
            </Text>

            <Button
              size="default"
              variant="default"
              disabled={isSimulating}
              onClick={onSimulatePayment}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <Zap className={cn("w-4 h-4 shrink-0", isSimulating && "animate-spin")} />
              {isSimulating
                ? CHECKOUT_TEXTS.demoSandbox.triggerLoadingText
                : CHECKOUT_TEXTS.demoSandbox.triggerButtonText}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
