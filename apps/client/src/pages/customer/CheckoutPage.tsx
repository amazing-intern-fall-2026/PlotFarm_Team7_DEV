import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Check, Layers, AlertCircle } from "lucide-react";
import {
  Box,
  Flex,
  Grid,
  Container,
  Text,
  Button,
  Skeleton,
} from "@/shared/ui";
import { axiosClient } from "@/shared/api";
import { fetchPlotDetailApi } from "@/entities/plot";
import { isAuthenticated } from "@/features/auth";
import {
  CHECKOUT_DEFAULT_ORDER,
  CHECKOUT_BANK_INFO,
  CHECKOUT_TEXTS,
  type BankBeneficiaryInfo,
  type CheckoutMockOrder,
  MiniReceiptCard,
  VietQRPaymentHub,
  PaymentSuccessModal,
  HoldExpiredModal,
  TrustBadgesBar,
  CheckoutHeaderBar,
  useHoldTimer,
} from "@/widgets/PlotCheckout";

export function CheckoutPage() {
  const { id, plotId } = useParams<{ id?: string; plotId?: string }>();
  const rawPlotParam = id || plotId || "PLOT-001";
  const navigate = useNavigate();

  const [order, setOrder] = React.useState<CheckoutMockOrder>(() => ({
    ...CHECKOUT_DEFAULT_ORDER,
    plotId: rawPlotParam,
    plotNumber: rawPlotParam.replace("PLT-", "").replace("PLOT-", ""),
  }));

  const [isLoadingPlot, setIsLoadingPlot] = React.useState<boolean>(true);
  const [realQrImageUrl, setRealQrImageUrl] = React.useState<string | undefined>(undefined);
  const [realTransferContent, setRealTransferContent] = React.useState<string>(`CF${order.orderCode}`);
  const [serverLockedUntil, setServerLockedUntil] = React.useState<string | null>(null);
  const [bankBeneficiary, setBankBeneficiary] = React.useState<BankBeneficiaryInfo>(CHECKOUT_BANK_INFO);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState<boolean>(false);
  const [isExpiredModalOpen, setIsExpiredModalOpen] = React.useState<boolean>(false);
  const [isSimulating, setIsSimulating] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [isMobileReceiptOpen, setIsMobileReceiptOpen] = React.useState<boolean>(false);

  const cleanPlotNumber = order.plotNumber;

  const handleTimerExpired = React.useCallback(async () => {
    setIsExpiredModalOpen(true);
    if (order.plotId) {
      try {
        await axiosClient.post(`/plots/${order.plotId}/release-hold`);
      } catch {
        // ignore release error on expired
      }
    }
  }, [order.plotId]);

  const {
    formattedTime,
    isWarning,
  } = useHoldTimer({
    plotId: order.plotId,
    serverLockedUntil,
    onExpire: handleTimerExpired,
  });

  // 2. Tải thông tin ô đất và khởi tạo hợp đồng / VietQR từ backend nếu có phiên đăng nhập
  const initPayment = React.useCallback(async () => {
    setIsLoadingPlot(true);
    try {
      const plotDetail = await fetchPlotDetailApi(rawPlotParam).catch(() => null);

      if (plotDetail) {
        const area = plotDetail.areaSquareMeters || 20;
        const duration = plotDetail.cropDetails?.durationDays || 60;
        const pricePerMonth = plotDetail.pricePerMonth || 1200000;
        const landFee = Math.round((pricePerMonth / 30) * duration);
        const seedFee = 400000;
        const total = landFee + seedFee;

        const updatedOrder: CheckoutMockOrder = {
          ...CHECKOUT_DEFAULT_ORDER,
          plotId: plotDetail.id || rawPlotParam,
          plotNumber: (plotDetail.plotCode || rawPlotParam).replace("PLT-", "").replace("PLOT-", ""),
          plotAreaSqm: area,
          cropName: plotDetail.cropName || "Cải cầu vồng Thụy Sĩ",
          cropExpectedYield: plotDetail.cropDetails?.expectedYieldKgPerSqm
            ? `${Math.round(plotDetail.cropDetails.expectedYieldKgPerSqm * area * 0.8)} - ${Math.round(plotDetail.cropDetails.expectedYieldKgPerSqm * area)} kg rau sạch`
            : "18 - 22 kg rau sạch chuẩn hữu cơ",
          durationDays: duration,
          farmerName: plotDetail.farmName || "Chú Bảy",
          farmerTeam: "Đội Vườn 1",
          plotZone: plotDetail.zone || "Phân khu A - Đà Lạt Organic Sanctuary",
          plotThumbnailUrl: plotDetail.imageUrl || "/images/plot-1.jpg",
          landRentalFee: landFee,
          cropSeedFee: seedFee,
          totalAmount: total,
        };

        setOrder(updatedOrder);

        const plotIdToHold = plotDetail.id || rawPlotParam;
        const cropIdToBook = plotDetail.defaultCropId || "77fd0c1f-82cc-4cc2-96f3-4c7e5d11b579";

        try {
          const holdRes = await axiosClient.post<{
            success: boolean;
            data: { plotId: string; lockedUntil: string; expiresInSeconds: number };
          }>(`/plots/${plotIdToHold}/hold`);

          if (holdRes.data?.data?.lockedUntil) {
            setServerLockedUntil(holdRes.data.data.lockedUntil);
          }
        } catch {
          // Bỏ qua lỗi nếu khách chưa đăng nhập hoặc ô đất đã được hold trước đó
        }

        try {
          const todayStr = new Date().toISOString().split("T")[0];
          const contractRes = await axiosClient.post<{
            success: boolean;
            data: { id: string; contractCode?: string };
          }>("/contracts", {
            plotId: plotIdToHold,
            cropId: cropIdToBook,
            startDate: todayStr,
          });

          const contractId = contractRes.data?.data?.id;
          if (contractId) {
            const qrRes = await axiosClient.post<{
              success: boolean;
              data: {
                paymentOrderId: string;
                orderCode: string;
                qrImageUrl: string;
                transferContent: string;
                expiresAt: string;
                bankInfo?: {
                  bankName?: string;
                  bankCode?: string;
                  bankId?: string;
                  bankShortName?: string;
                  accountNo?: string;
                  accountNumber?: string;
                  accountName?: string;
                  accountHolderName?: string;
                };
              };
            }>("/payments/create-qr", { contractId });

            if (qrRes.data?.data) {
              const paymentData = qrRes.data.data;
              setRealQrImageUrl(paymentData.qrImageUrl);
              setRealTransferContent(paymentData.transferContent);
              setOrder((prev) => ({
                ...prev,
                orderCode: paymentData.orderCode,
              }));
              if (paymentData.bankInfo) {
                const b = paymentData.bankInfo;
                setBankBeneficiary((prev) => ({
                  ...prev,
                  bankId: b.bankId || b.bankCode || prev.bankId,
                  bankName: b.bankName || prev.bankName,
                  bankShortName: b.bankShortName || (b.bankName ? b.bankName.split("(")[0].trim() : prev.bankShortName),
                  accountNumber: b.accountNo || b.accountNumber || prev.accountNumber,
                  accountName: b.accountName || b.accountHolderName || prev.accountName,
                }));
              }
              if (paymentData.expiresAt) {
                setServerLockedUntil(paymentData.expiresAt);
              }
            }
          }
        } catch {
          // Nếu không gọi được API contract (ví dụ khách vãng lai hoặc token hết hạn), dùng mock fallback
          const fallbackOrderCode = `ORD-${cleanPlotNumber}-${Math.floor(1000 + Math.random() * 9000)}`;
          setOrder((prev) => ({ ...prev, orderCode: fallbackOrderCode }));
          setRealTransferContent(`CF${fallbackOrderCode}`);
        }
      }
    } finally {
      setIsLoadingPlot(false);
    }
  }, [rawPlotParam, cleanPlotNumber]);

  React.useEffect(() => {
    initPayment();
  }, [initPayment]);

  React.useEffect(() => {
    if (isSuccessModalOpen || isExpiredModalOpen) return;
    if (!order.orderCode) return;

    const intervalId = window.setInterval(async () => {
      try {
        const checkRes = await axiosClient.get<{
          success: boolean;
          data: { status: string; orderCode: string };
        }>(`/payments/check-status/${order.orderCode}`);

        if (checkRes.data?.data?.status === "SUCCESS") {
          setIsSuccessModalOpen(true);
          window.clearInterval(intervalId);
        }
      } catch {
        // Polling im lặng không làm gián đoạn UI người dùng
      }
    }, 2500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [order.orderCode, isSuccessModalOpen, isExpiredModalOpen]);

  const handleSimulatePayment = async () => {
    setIsSimulating(true);
    try {
      try {
        await axiosClient.post("/payments/mock-webhook", {
          orderCode: order.orderCode,
        });
      } catch {
        // Mock fallback nếu server mock endpoint trả lỗi (ví dụ demo offline)
      }

      window.setTimeout(() => {
        setIsSimulating(false);
        setIsSuccessModalOpen(true);
      }, 500);
    } catch {
      setIsSimulating(false);
      setIsSuccessModalOpen(true);
    }
  };

  const handleCopySuccess = (_text: string) => {
    setToastMessage(CHECKOUT_TEXTS.paymentHub.copiedToastText);
    window.setTimeout(() => setToastMessage(null), 2500);
  };

  const handleGoToFarm = () => {
    setIsSuccessModalOpen(false);
    navigate(`/my-farm/${order.plotId}`);
  };

  const handleBackToPlots = async () => {
    setIsExpiredModalOpen(false);
    if (order.plotId) {
      try {
        await axiosClient.post(`/plots/${order.plotId}/release-hold`);
      } catch {
        // ignore
      }
    }
    navigate("/plots");
  };

  React.useEffect(() => {
    if (isSuccessModalOpen) {
      const timer = window.setTimeout(() => {
        handleGoToFarm();
      }, 4000);
      return () => window.clearTimeout(timer);
    }
  }, [isSuccessModalOpen]);

  return (
    <Box className="min-h-screen bg-slate-50/60 dark:bg-slate-950 font-sans pb-24 lg:pb-16">
      <Container size="7xl" className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-6">
        <CheckoutHeaderBar
          onBack={() => navigate(`/plots/${rawPlotParam}`)}
          plotNumber={cleanPlotNumber}
          plotId={rawPlotParam}
        />

        {!isAuthenticated() && (
          <Box className="p-4 rounded-xl border border-amber-200 bg-amber-50/90 dark:bg-amber-950/40 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-center justify-between flex-wrap gap-3">
            <Flex align="center" gap={3}>
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <Text className="text-xs sm:text-sm font-medium">
                Quý khách chưa đăng nhập. Vui lòng đăng nhập tài khoản Khách hàng để hệ thống máy chủ giữ chỗ và tạo hợp đồng điện tử chính thức.
              </Text>
            </Flex>
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate(`/login?returnUrl=/checkout/${rawPlotParam}`)}
              className="text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white"
            >
              Đăng nhập ngay
            </Button>
          </Box>
        )}

        <Box className="lg:hidden">
          <Button
            variant="outline"
            size="default"
            onClick={() => setIsMobileReceiptOpen((prev) => !prev)}
            className="w-full justify-between h-auto p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs"
          >
            <Flex align="center" gap={2} className="min-w-0">
              <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
              <Text variant="caption" className="font-bold text-xs text-slate-800 dark:text-slate-200 leading-snug break-words">
                Đơn hàng: Ô #{cleanPlotNumber} ({order.totalAmount.toLocaleString("vi-VN")}&nbsp;đ)
              </Text>
            </Flex>
            <Flex align="center" gap={1} className="text-emerald-700 dark:text-emerald-400 font-semibold text-xs shrink-0">
              <Text variant="caption" className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                {isMobileReceiptOpen ? "Thu gọn" : "Chi tiết"}
              </Text>
              {isMobileReceiptOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Flex>
          </Button>

          {isMobileReceiptOpen && (
            <Box className="mt-3 animate-in fade-in-50 duration-200">
              <MiniReceiptCard order={order} isMobileModal />
            </Box>
          )}
        </Box>

        {isLoadingPlot ? (
          <Grid cols={1} colsLg={12} gap={8} className="items-start">
            <Box className="hidden lg:block lg:col-span-5 space-y-4">
              <Skeleton className="h-[380px] w-full rounded-2xl" />
            </Box>
            <Box className="lg:col-span-7 space-y-4">
              <Skeleton className="h-[520px] w-full rounded-2xl" />
            </Box>
          </Grid>
        ) : (
          /* BỐ CỤC CHÍNH 2 CỘT (DESKTOP: 38% CỘT TRÁI, 62% CỘT PHẢI) */
          <Grid cols={1} colsLg={12} gap={8} className="items-start">
            <Box className="hidden lg:block lg:col-span-5">
              <MiniReceiptCard order={order} />
            </Box>

            {/* CỘT PHẢI: VIETQR PAYMENT HUB (TRUNG TÂM THANH TOÁN FINTECH) */}
            <Box className="lg:col-span-7">
              <VietQRPaymentHub
                order={order}
                bankInfo={bankBeneficiary}
                qrImageUrl={realQrImageUrl}
                formattedCountdown={formattedTime}
                isTimerWarning={isWarning}
                transferContent={realTransferContent}
                onSimulatePayment={handleSimulatePayment}
                isSimulating={isSimulating}
                onCopySuccess={handleCopySuccess}
              />
            </Box>
          </Grid>
        )}

        <TrustBadgesBar />
      </Container>

      {toastMessage && (
        <Box className="fixed bottom-6 right-6 z-50 animate-in fade-in-50 slide-in-from-bottom-5 duration-200">
          <Flex align="center" gap={2} className="px-4 py-3 rounded-xl bg-slate-950 text-white shadow-2xl border border-slate-800">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <Text variant="caption" className="font-bold text-xs text-white">
              {toastMessage}
            </Text>
          </Flex>
        </Box>
      )}

      <PaymentSuccessModal
        isOpen={isSuccessModalOpen}
        order={order}
        onGoToFarm={handleGoToFarm}
      />

      <HoldExpiredModal
        isOpen={isExpiredModalOpen}
        onBackToPlots={handleBackToPlots}
      />
    </Box>
  );
}
