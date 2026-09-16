import * as React from "react";
import {
  FileText,
  Printer,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared/ui";

type DocumentModalType = "organic" | "insurance" | null;

export function AboutLegalCharter() {
  const [activeTab, setActiveTab] = React.useState<string>("organic");
  const [viewingDoc, setViewingDoc] = React.useState<DocumentModalType>(null);

  // Đồng bộ hash URL (#organic-standards hoặc #crop-insurance) với Tabs
  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "crop-insurance") {
        setActiveTab("insurance");
      } else if (hash === "organic-standards") {
        setActiveTab("organic");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    const hash = val === "insurance" ? "crop-insurance" : "organic-standards";
    window.history.replaceState(null, "", `#${hash}`);
  };

  return (
    <Box className="w-full max-w-3xl mx-auto space-y-6 font-sans">
      {/* 2. Tabs Trọng Yếu: 2 Tab Tinh Gọn */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">

        <Box className="flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
            <TabsTrigger
              value="organic"
              id="organic-standards"
              className="text-xs sm:text-sm font-semibold py-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary data-[state=active]:shadow-2xs transition-all"
            >
              Cam kết chuẩn hữu cơ
            </TabsTrigger>
            <TabsTrigger
              value="insurance"
              id="crop-insurance"
              className="text-xs sm:text-sm font-semibold py-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary data-[state=active]:shadow-2xs transition-all"
            >
              Bảo hiểm rủi ro mùa vụ
            </TabsTrigger>
          </TabsList>
        </Box>

        {/* TAB 1: CAM KẾT CHUẨN HỮU CƠ */}
        <TabsContent value="organic" className="mt-4 focus-visible:outline-none">
          <Card className="border-border/80 bg-white dark:bg-slate-900 rounded-2xl shadow-xs">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <Box className="space-y-1">
                <Typography.H3 className="text-lg sm:text-xl font-bold text-foreground">
                  Tiêu chuẩn Canh tác Hữu cơ (TCVN 11041:2017)
                </Typography.H3>
                <Typography.Muted className="text-xs sm:text-sm text-muted-foreground">
                  Toàn bộ quy trình gieo trồng và thu hoạch được kiểm soát nghiêm ngặt theo tiêu chuẩn an toàn sinh học quốc gia.
                </Typography.Muted>
              </Box>

              {/* 5 Tiêu chuẩn then chốt dạng danh sách sạch sẽ */}
              <Box className="space-y-3.5 divide-y divide-border/60 text-sm">
                <Box className="pt-3.5 first:pt-0 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <Box className="space-y-0.5">
                    <Typography.Text className="font-semibold text-foreground text-sm block">
                      Đất trồng sạch & Vùng đệm cách ly 50m
                    </Typography.Text>
                    <Typography.Muted className="text-xs text-muted-foreground leading-relaxed">
                      Khoảng cách ly tối thiểu 50m với nông trại truyền thống. Đất kiểm định định kỳ đạt chuẩn QCVN 03-MT:2015/BTNMT, không tồn dư kim loại nặng.
                    </Typography.Muted>
                  </Box>
                </Box>

                <Box className="pt-3.5 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <Box className="space-y-0.5">
                    <Typography.Text className="font-semibold text-foreground text-sm block">
                      Nguồn nước ngầm đồi thông sâu 85m
                    </Typography.Text>
                    <Typography.Muted className="text-xs text-muted-foreground leading-relaxed">
                      Khai thác từ mạch ngầm nguyên sinh Lạc Dương, dẫn qua hệ thống lọc vi sinh đa tầng và khử khuẩn tia cực tím UV đạt QCVN 08-MT:2015/BTNMT.
                    </Typography.Muted>
                  </Box>
                </Box>

                <Box className="pt-3.5 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <Box className="space-y-0.5">
                    <Typography.Text className="font-semibold text-foreground text-sm block">
                      100% Giống thuần chủng Non-GMO
                    </Typography.Text>
                    <Typography.Muted className="text-xs text-muted-foreground leading-relaxed">
                      Chỉ sử dụng nguồn hạt giống thuần chủng F1 hoặc giống bản địa Đà Lạt, tuyệt đối không sử dụng giống cây trồng biến đổi gen.
                    </Typography.Muted>
                  </Box>
                </Box>

                <Box className="pt-3.5 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <Box className="space-y-0.5">
                    <Typography.Text className="font-semibold text-foreground text-sm block">
                      Nguyên tắc 5 KHÔNG can thiệp hóa chất
                    </Typography.Text>
                    <Typography.Muted className="text-xs text-muted-foreground leading-relaxed">
                      Không thuốc sâu hóa học • Không phân bón vô cơ tổng hợp • Không thuốc diệt cỏ • Không chất kích thích tăng trưởng • Không chất bảo quản.
                    </Typography.Muted>
                  </Box>
                </Box>

                <Box className="pt-3.5 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <Box className="space-y-0.5">
                    <Typography.Text className="font-semibold text-foreground text-sm block">
                      Minh bạch giám sát Camera 24/7 & Cảm biến IoT
                    </Typography.Text>
                    <Typography.Muted className="text-xs text-muted-foreground leading-relaxed">
                      Camera trực tiếp thời gian thực tại từng ô đất và dữ liệu cảm biến (nhiệt độ, độ ẩm đất, pH) lưu vết liên tục vào nhật ký canh tác của bạn.
                    </Typography.Muted>
                  </Box>
                </Box>
              </Box>

              {/* Hộp Cam kết đền bù */}
              <Box className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border space-y-1">
                <Typography.Text className="text-xs font-bold text-foreground block">
                  Cam kết bảo lãnh chất lượng:
                </Typography.Text>
                <Typography.Muted className="text-xs text-muted-foreground leading-relaxed">
                  Trường hợp kiểm nghiệm độc lập phát hiện tồn dư hóa chất bảo vệ thực vật hoặc chất cấm trong sản phẩm thu hoạch, Green Farm bồi thường gấp <strong>10 (mười) lần</strong> giá trị hợp đồng thuê đất đã thanh toán.
                </Typography.Muted>
              </Box>

              {/* Nút xem văn bản chứng chỉ */}
              <Box className="pt-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingDoc("organic")}
                  className="text-xs h-9 gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  <span>Xem văn bản quy chuẩn & chứng thư hữu cơ</span>
                </Button>
              </Box>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: CHÍNH SÁCH BẢO HIỂM MÙA VỤ */}
        <TabsContent value="insurance" className="mt-4 focus-visible:outline-none">
          <Card className="border-border/80 bg-white dark:bg-slate-900 rounded-2xl shadow-xs">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <Box className="space-y-1">
                <Typography.H3 className="text-lg sm:text-xl font-bold text-foreground">
                  Chính sách Bảo hiểm Rủi ro Mùa vụ 100%
                </Typography.H3>
                <Typography.Muted className="text-xs sm:text-sm text-muted-foreground">
                  Bảo vệ trọn vẹn sản lượng và chi phí canh tác của khách hàng trước thiên tai thời tiết hoặc sự cố kỹ thuật bất khả kháng.
                </Typography.Muted>
              </Box>

              {/* 3 Phương án bồi thường */}
              <Box className="space-y-3.5 divide-y divide-border/60 text-sm">
                <Box className="pt-3.5 first:pt-0 flex items-start gap-3">
                  <Box className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </Box>
                  <Box className="space-y-0.5">
                    <Typography.Text className="font-semibold text-foreground text-sm block">
                      Trồng bù khẩn cấp vụ mới trong 48 giờ
                    </Typography.Text>
                    <Typography.Muted className="text-xs text-muted-foreground leading-relaxed">
                      Nông trại dọn luống và gieo trồng lại luống rau mới ngay lập tức. Miễn phí 100% cây giống, phân bón và công lao động. Thời hạn hợp đồng tự động kéo dài tương ứng.
                    </Typography.Muted>
                  </Box>
                </Box>

                <Box className="pt-3.5 flex items-start gap-3">
                  <Box className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </Box>
                  <Box className="space-y-0.5">
                    <Typography.Text className="font-semibold text-foreground text-sm block">
                      Xuất kho rau hữu cơ dự phòng giao ngay
                    </Typography.Text>
                    <Typography.Muted className="text-xs text-muted-foreground leading-relaxed">
                      Giao nhận lượng rau sạch đạt chuẩn hữu cơ tương đương từ Vườn canh tác đối ứng của Green Farm để bữa ăn gia đình bạn không bao giờ bị gián đoạn.
                    </Typography.Muted>
                  </Box>
                </Box>

                <Box className="pt-3.5 flex items-start gap-3">
                  <Box className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </Box>
                  <Box className="space-y-0.5">
                    <Typography.Text className="font-semibold text-foreground text-sm block">
                      Hoàn tiền 100% chi phí chu kỳ ảnh hưởng
                    </Typography.Text>
                    <Typography.Muted className="text-xs text-muted-foreground leading-relaxed">
                      Hoàn lại 100% số tiền thuê đất và chi phí dịch vụ của chu kỳ bị ảnh hưởng trực tiếp về tài khoản ngân hàng của khách hàng trong 03 ngày làm việc.
                    </Typography.Muted>
                  </Box>
                </Box>
              </Box>

              {/* Thời hạn giải quyết */}
              <Box className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border space-y-1">
                <Typography.Text className="text-xs font-bold text-foreground block">
                  Thời hạn tiếp nhận & bồi hoàn:
                </Typography.Text>
                <Typography.Muted className="text-xs text-muted-foreground leading-relaxed">
                  Xác minh đối chiếu dữ liệu camera và cảm biến IoT trong vòng <strong>02 giờ</strong>. Hoàn tất bồi hoàn hoặc gieo trồng lại trong vòng <strong>24 giờ</strong> làm việc.
                </Typography.Muted>
              </Box>

              {/* Nút xem văn bản quy chế */}
              <Box className="pt-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingDoc("insurance")}
                  className="text-xs h-9 gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  <span>Xem văn bản quy chế bảo hiểm mùa vụ</span>
                </Button>
              </Box>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 3. MODAL XEM VĂN BẢN PHÁP QUY CHÍNH THỨC (Chỉ hiện khi người dùng bấm xem) */}
      <Modal
        isOpen={viewingDoc !== null}
        onClose={() => setViewingDoc(null)}
        title={
          viewingDoc === "organic"
            ? "Bản Cam Kết Quy Chuẩn Canh Tác Hữu Cơ"
            : "Quy Chế Bảo Hiểm Rủi Ro Mùa Vụ Green Farm"
        }
        description="Văn bản pháp quy điện tử chính thức được ký số mã hóa theo Luật Giao dịch Điện tử Việt Nam."
        size="lg"
      >
        <Box className="space-y-6 pt-2 font-sans">
          {/* Tiêu ngữ hành chính */}
          <Box className="text-center pb-4 border-b border-border space-y-1">
            <Typography.Text className="text-xs font-bold uppercase tracking-wide text-foreground block">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </Typography.Text>
            <Typography.Text className="text-xs font-semibold text-foreground block">
              Độc lập - Tự do - Hạnh phúc
            </Typography.Text>
            <Box className="w-16 h-0.5 bg-slate-300 mx-auto my-1" />
            <Typography.Text className="text-[11px] text-muted-foreground italic block">
              Lâm Đồng, ngày 15 tháng 10 năm 2025
            </Typography.Text>
          </Box>

          {/* Chi tiết văn bản pháp lý */}
          <Box className="space-y-3 max-h-[55vh] overflow-y-auto pr-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            {viewingDoc === "organic" && (
              <Box className="space-y-2.5">
                <Typography.Text className="font-bold text-foreground text-sm block">
                  BẢN CAM KẾT TIÊU CHUẨN HỮU CƠ TCVN 11041:2017
                </Typography.Text>
                <Typography.P className="italic text-muted-foreground">
                  Số: 08/2026/QCKT-CK-DALAT • Kèm Hợp đồng Dịch vụ Nông nghiệp số Green Farm
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 1. Căn cứ pháp lý:</strong> Luật Trồng trọt số 31/2018/QH14; Nghị định số 109/2018/NĐ-CP về Nông nghiệp hữu cơ; Bộ Tiêu chuẩn Quốc gia TCVN 11041-1:2017 và TCVN 11041-2:2017.
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 2. Cách ly & Thổ nhưỡng:</strong> Vùng đệm cách ly cơ học tối thiểu 50 mét. Đất canh tác định kỳ xét nghiệm không chứa kim loại nặng (Pb, Cd, As, Hg) theo QCVN 03-MT:2015/BTNMT.
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 3. Nước tưới ngầm:</strong> 100% khai thác từ mạch ngầm sâu 85m rừng thông Lạc Dương, qua hệ thống lọc vi sinh và khử khuẩn UV đạt QCVN 08-MT:2015/BTNMT.
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 4. Nguyên tắc 5 Không:</strong> Không thuốc trừ sâu hóa học; Không phân bón hóa học vô cơ; Không thuốc diệt cỏ; Không chất kích thích tăng trưởng; Không chất bảo quản.
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 5. Minh bạch dữ liệu:</strong> Camera trực tiếp 24/7 và cảm biến IoT cập nhật nhật ký liên tục mỗi 5 phút, lưu trữ bất biến trên hệ thống đám mây.
                </Typography.P>
                <Typography.P className="text-justify font-semibold text-rose-700 dark:text-rose-400 p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200">
                  Điều 6. Chế tài cam kết: Đền bù gấp 10 (mười) lần giá trị hợp đồng thuê đất nếu kiểm nghiệm phát hiện tồn dư hóa chất cấm.
                </Typography.P>
              </Box>
            )}

            {viewingDoc === "insurance" && (
              <Box className="space-y-2.5">
                <Typography.Text className="font-bold text-foreground text-sm block">
                  QUY CHẾ BẢO HIỂM RỦI RO MÙA VỤ GREEN FARM CARE
                </Typography.Text>
                <Typography.P className="italic text-muted-foreground">
                  Số: 12/2026/QC-BH-GF • Áp dụng tự động cho 100% hợp đồng thuê đất
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 1. Phạm vi bảo lãnh:</strong> Bảo lãnh 100% rủi ro mùa vụ trong suốt thời hạn hợp đồng điện tử có hiệu lực.
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 2. Sự kiện bảo hiểm:</strong> Thời tiết cực đoan (mưa đá, sương muối, lốc xoáy); Sâu bệnh hại bất khả kháng; Sự cố kỹ thuật nhà kính làm giảm trên 30% năng suất.
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 3. Phương án bồi thường:</strong> Khách hàng toàn quyền chọn: (1) Trồng bù khẩn cấp trong 48 giờ; (2) Giao rau hữu cơ tương đương từ kho dự phòng đối ứng; (3) Hoàn tiền 100% chu kỳ ảnh hưởng.
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 4. Thời hạn hoàn tất:</strong> Xác minh số hóa trong 02 giờ. Hoàn tất bồi hoàn hoặc gieo trồng lại trong vòng 24 giờ kể từ khi khách hàng xác nhận.
                </Typography.P>
              </Box>
            )}
          </Box>

          {/* Footer xác thực điện tử */}
          <Box className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-border flex items-center justify-between gap-3">
            <Box className="space-y-0.5">
              <Box className="flex items-center gap-1.5 text-xs font-bold text-primary">
                <ShieldCheck className="w-4 h-4" />
                <span>CHỨNG THƯ SỐ VIETTEL-CA TrustID HỢP LỆ</span>
              </Box>
              <Typography.Muted className="text-[10px] text-muted-foreground font-mono">
                CÔNG TY CP NÔNG NGHIỆP CÔNG NGHỆ CAO GREEN FARM • MST: 5801456899
              </Typography.Muted>
            </Box>

            <Button
              size="sm"
              variant="outline"
              onClick={() => window.print()}
              className="text-xs h-8 gap-1.5 shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In văn bản</span>
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
