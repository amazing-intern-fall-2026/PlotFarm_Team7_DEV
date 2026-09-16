import * as React from "react";
import {
  ShieldCheck,
  FileText,
  Printer,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Badge,
  Button,
  Modal,
} from "@/shared/ui";

type DocumentViewType = "organic" | "insurance" | "sgs" | null;

export function AboutLegalCharter() {
  const [viewingDoc, setViewingDoc] = React.useState<DocumentViewType>(null);

  // Tự động scroll mượt đến anchor khi load trang (e.g. #organic-standards hoặc #crop-insurance)
  React.useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const el = document.getElementById(hash);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 150);
        }
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  return (
    <Box className="w-full space-y-8 font-sans">
      {/* 1. Header Giới thiệu Green Farm & Tôn chỉ */}
      <Card className="border-border/80 bg-white dark:bg-slate-900 rounded-2xl shadow-xs overflow-hidden">
        <Box className="p-6 sm:p-8 space-y-6">
          <Box className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <Box className="space-y-1">
              <Box className="flex items-center gap-2">
                <Badge className="bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 text-xs font-semibold px-2.5 py-0.5">
                  Nông nghiệp Số 4.0
                </Badge>
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  Đà Lạt, Lâm Đồng
                </Badge>
              </Box>
              <Typography.H2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight pt-1">
                Về Nông Trại Số Green Farm
              </Typography.H2>
              <Typography.Muted className="text-sm text-muted-foreground">
                Hệ sinh thái kết nối cư dân đô thị đồng sở hữu & canh tác vườn rau hữu cơ từ xa qua IoT và Camera 24/7.
              </Typography.Muted>
            </Box>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewingDoc("organic")}
              className="text-xs h-9 gap-1.5 border-emerald-300 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Xem văn bản cam kết pháp lý</span>
            </Button>
          </Box>

          {/* 4 Chỉ số trọng yếu */}
          <Box className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Box className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border/60">
              <Typography.Muted className="text-xs text-muted-foreground block">
                Tiêu chuẩn canh tác
              </Typography.Muted>
              <Typography.H4 className="text-base sm:text-lg font-extrabold text-emerald-700 dark:text-emerald-400 mt-0.5">
                TCVN 11041:2017
              </Typography.H4>
              <Typography.Muted className="text-[11px] text-muted-foreground mt-0.5 block">
                100% chuẩn hữu cơ quốc gia
              </Typography.Muted>
            </Box>

            <Box className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border/60">
              <Typography.Muted className="text-xs text-muted-foreground block">
                Bảo hiểm mùa vụ
              </Typography.Muted>
              <Typography.H4 className="text-base sm:text-lg font-extrabold text-amber-700 dark:text-amber-400 mt-0.5">
                Bảo lãnh 100%
              </Typography.H4>
              <Typography.Muted className="text-[11px] text-muted-foreground mt-0.5 block">
                3 phương án bồi thường linh hoạt
              </Typography.Muted>
            </Box>

            <Box className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border/60">
              <Typography.Muted className="text-xs text-muted-foreground block">
                Minh bạch giám sát
              </Typography.Muted>
              <Typography.H4 className="text-base sm:text-lg font-extrabold text-sky-700 dark:text-sky-400 mt-0.5">
                Camera Live 24/7
              </Typography.H4>
              <Typography.Muted className="text-[11px] text-muted-foreground mt-0.5 block">
                Cảm biến vi khí hậu cập nhật 5p
              </Typography.Muted>
            </Box>

            <Box className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border/60">
              <Typography.Muted className="text-xs text-muted-foreground block">
                Kiểm định độc lập
              </Typography.Muted>
              <Typography.H4 className="text-base sm:text-lg font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
                SGS & Eurofins
              </Typography.H4>
              <Typography.Muted className="text-[11px] text-muted-foreground mt-0.5 block">
                Xét nghiệm định kỳ 800+ hoạt chất
              </Typography.Muted>
            </Box>
          </Box>
        </Box>
      </Card>

      {/* 2. Khối Trọng Yếu 1: Cam kết Tiêu chuẩn Hữu cơ (#organic-standards) */}
      <Box id="organic-standards" className="scroll-mt-24">
        <Card className="border-border/80 bg-white dark:bg-slate-900 rounded-2xl shadow-xs overflow-hidden">
          <CardHeader className="border-b border-border/80 pb-4 bg-slate-50/40 dark:bg-slate-800/30">
            <Box className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <Box className="space-y-1">
                <Box className="flex items-center gap-2">
                  <Badge className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5">
                    Trọng Yếu
                  </Badge>
                  <Typography.Text className="text-xs text-muted-foreground font-semibold">
                    Quy chuẩn an toàn sinh học Đà Lạt
                  </Typography.Text>
                </Box>
                <Typography.H3 className="text-xl font-extrabold text-foreground tracking-tight">
                  Cam kết Tiêu chuẩn Hữu cơ & Không Hóa Chất
                </Typography.H3>
              </Box>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewingDoc("organic")}
                className="text-xs h-8 gap-1.5 shrink-0"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                <span>Xem văn bản quy chuẩn</span>
              </Button>
            </Box>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6">
            {/* Nguyên tắc 5 KHÔNG */}
            <Box className="space-y-3">
              <Typography.Text className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Nguyên tắc 5 KHÔNG bắt buộc tại từng luống đất
              </Typography.Text>
              <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { title: "Không thuốc sâu", desc: "Tuyệt đối không dùng hóa chất tổng hợp trừ sâu" },
                  { title: "Không phân hóa học", desc: "100% ủ phân hữu cơ vi sinh & đạm trùn quế" },
                  { title: "Không thuốc diệt cỏ", desc: "Nhổ cỏ thủ công và che phủ rơm mùn tự nhiên" },
                  { title: "Không kích thích", desc: "Không dùng hormone kích thích tăng trưởng" },
                  { title: "Không bảo quản", desc: "Thu hái và chuyển lạnh giao ngay trong 24 giờ" },
                ].map((item, idx) => (
                  <Box key={idx} className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                    <Box className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item.title}</span>
                    </Box>
                    <Typography.Muted className="text-[11px] text-muted-foreground mt-1 block">
                      {item.desc}
                    </Typography.Muted>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Điều kiện môi trường then chốt */}
            <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <Box className="p-4 rounded-xl border border-border/80 space-y-1">
                <Typography.Text className="text-xs font-bold text-foreground block">
                  Đất trồng & Vùng đệm 50m
                </Typography.Text>
                <Typography.Muted className="text-xs text-muted-foreground leading-relaxed">
                  Khoảng cách ly tối thiểu 50m với nông trại hóa chất. Đất kiểm định định kỳ đạt chuẩn QCVN 03-MT:2015/BTNMT không kim loại nặng.
                </Typography.Muted>
              </Box>

              <Box className="p-4 rounded-xl border border-border/80 space-y-1">
                <Typography.Text className="text-xs font-bold text-foreground block">
                  Nước ngầm tự nhiên sâu 85m
                </Typography.Text>
                <Typography.Muted className="text-xs text-muted-foreground leading-relaxed">
                  Khai thác từ mạch ngầm rừng thông Lạc Dương, dẫn qua hệ thống lọc vi sinh đa tầng và khử khuẩn tia UV đạt QCVN 08-MT:2015.
                </Typography.Muted>
              </Box>

              <Box className="p-4 rounded-xl border border-border/80 space-y-1">
                <Typography.Text className="text-xs font-bold text-foreground block">
                  Giống thuần chủng Non-GMO
                </Typography.Text>
                <Typography.Muted className="text-xs text-muted-foreground leading-relaxed">
                  100% hạt giống chọn lọc F1 bản địa thuần chủng, không biến đổi gen, có chứng nhận kiểm dịch thực vật của Viện Nông Lâm nghiệp.
                </Typography.Muted>
              </Box>
            </Box>

            {/* Chế tài xử lý vi phạm */}
            <Box className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <Box className="space-y-1">
                <Typography.Text className="text-xs font-bold text-rose-900 dark:text-rose-200 block">
                  Cam kết bảo lãnh pháp lý: Bồi thường gấp 10 lần giá trị hợp đồng
                </Typography.Text>
                <Typography.Muted className="text-xs text-rose-700 dark:text-rose-300/90 leading-relaxed">
                  Nếu kiểm nghiệm phát hiện tồn dư hóa chất bảo vệ thực vật hoặc chất cấm trong sản phẩm thu hoạch từ ô đất của khách hàng, Green Farm cam kết bồi thường gấp 10 lần tổng giá trị hợp đồng và chịu hoàn toàn trách nhiệm trước pháp luật.
                </Typography.Muted>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* 3. Khối Trọng Yếu 2: Chính sách Bảo hiểm Rủi ro Mùa vụ (#crop-insurance) */}
      <Box id="crop-insurance" className="scroll-mt-24">
        <Card className="border-border/80 bg-white dark:bg-slate-900 rounded-2xl shadow-xs overflow-hidden">
          <CardHeader className="border-b border-border/80 pb-4 bg-slate-50/40 dark:bg-slate-800/30">
            <Box className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <Box className="space-y-1">
                <Box className="flex items-center gap-2">
                  <Badge className="bg-amber-600 text-white text-[11px] font-bold px-2 py-0.5">
                    Trọng Yếu
                  </Badge>
                  <Typography.Text className="text-xs text-muted-foreground font-semibold">
                    Chính sách bảo vệ quyền lợi cư dân Green Farm Care
                  </Typography.Text>
                </Box>
                <Typography.H3 className="text-xl font-extrabold text-foreground tracking-tight">
                  Chính sách Bảo hiểm Rủi ro Mùa vụ 100%
                </Typography.H3>
              </Box>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewingDoc("insurance")}
                className="text-xs h-8 gap-1.5 shrink-0"
              >
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span>Xem quy chế bồi hoàn</span>
              </Button>
            </Box>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6">
            <Typography.Muted className="text-sm text-muted-foreground leading-relaxed">
              Mọi hợp đồng canh tác tại Green Farm đều tự động được áp dụng gói bảo lãnh rủi ro mà không phụ thu. Khi gặp thiên tai, sâu bệnh bất khả kháng hoặc lỗi kỹ thuật nhà màng, cư dân được quyền chọn một trong 3 phương án bồi hoàn sau:
            </Typography.Muted>

            {/* 3 Phương án bồi thường */}
            <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Box className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 space-y-2">
                <Box className="flex items-center gap-2">
                  <Badge className="bg-emerald-600 text-white text-[10px] font-bold">
                    Phương án 1
                  </Badge>
                  <Typography.Text className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    Trồng bù khẩn cấp
                  </Typography.Text>
                </Box>
                <Typography.Muted className="text-xs text-muted-foreground leading-relaxed">
                  Làm sạch đất và gieo trồng lại luống rau mới trong 48 giờ. Miễn phí 100% chi phí cây giống, phân bón và công chăm sóc. Hợp đồng tự động kéo dài bù số ngày thiệt hại.
                </Typography.Muted>
              </Box>

              <Box className="p-4 rounded-xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200/80 dark:border-sky-900/50 space-y-2">
                <Box className="flex items-center gap-2">
                  <Badge className="bg-sky-600 text-white text-[10px] font-bold">
                    Phương án 2
                  </Badge>
                  <Typography.Text className="text-xs font-bold text-sky-900 dark:text-sky-200">
                    Xuất kho rau dự phòng
                  </Typography.Text>
                </Box>
                <Typography.Muted className="text-xs text-muted-foreground leading-relaxed">
                  Giao nhận lượng rau hữu cơ đạt chuẩn tương đương sản lượng cam kết từ Vườn canh tác đối ứng của Green Farm để bàn ăn gia đình bạn không bao giờ bị gián đoạn.
                </Typography.Muted>
              </Box>

              <Box className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 space-y-2">
                <Box className="flex items-center gap-2">
                  <Badge className="bg-amber-600 text-white text-[10px] font-bold">
                    Phương án 3
                  </Badge>
                  <Typography.Text className="text-xs font-bold text-amber-900 dark:text-amber-200">
                    Hoàn tiền 100%
                  </Typography.Text>
                </Box>
                <Typography.Muted className="text-xs text-muted-foreground leading-relaxed">
                  Hoàn trả 100% tiền thuê ô đất và phí dịch vụ chăm sóc của chu kỳ mùa vụ bị ảnh hưởng trực tiếp về tài khoản ngân hàng của khách hàng trong 03 ngày làm việc.
                </Typography.Muted>
              </Box>
            </Box>

            {/* Quy trình giải quyết cấp tốc */}
            <Box className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <Box className="space-y-0.5 text-center sm:text-left">
                <Typography.Text className="text-xs font-bold text-foreground">
                  Quy trình giám định số hóa: Xác minh 2 giờ • Bồi hoàn 24 giờ
                </Typography.Text>
                <Typography.Muted className="text-[11px] text-muted-foreground">
                  Đối chiếu dữ liệu camera và nhật ký IoT tự động, gửi biên bản điện tử trực tiếp về ứng dụng của bạn.
                </Typography.Muted>
              </Box>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setViewingDoc("insurance")}
                className="text-xs h-8 gap-1 text-primary hover:text-primary/90 shrink-0"
              >
                <span>Xem điều khoản chi tiết</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* 4. Khối 3: Danh mục Chứng thư & Kiểm định độc lập */}
      <Card className="border-border/80 bg-white dark:bg-slate-900 rounded-2xl shadow-xs overflow-hidden">
        <CardHeader className="border-b border-border/80 pb-4">
          <Box className="flex items-center justify-between">
            <Box className="space-y-1">
              <Typography.H3 className="text-lg font-bold text-foreground tracking-tight">
                Chứng thư & Pháp lý Minh bạch
              </Typography.H3>
              <Typography.Muted className="text-xs text-muted-foreground">
                Nhấp vào từng chứng chỉ để xem toàn văn bản gốc và con dấu số điện tử xác thực.
              </Typography.Muted>
            </Box>
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </Box>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 divide-y divide-border/60">
          {[
            {
              id: "organic" as DocumentViewType,
              title: "Quy chuẩn Canh tác Hữu cơ Quốc gia (TCVN 11041:2017)",
              code: "Số: 08/2026/QCKT-CK-DALAT",
              auth: "Bộ Nông nghiệp & PTNT • Ban Kỹ thuật Green Farm",
              status: "Đã ký số SHA-256",
            },
            {
              id: "insurance" as DocumentViewType,
              title: "Quy chế Bảo hiểm Mùa vụ & Bồi hoàn Nông sản Green Farm Care",
              code: "Số: 12/2026/QC-BH-GF",
              auth: "Hội đồng Quản trị Công ty CP Nông nghiệp Công nghệ cao Green Farm",
              status: "Bảo lãnh 100%",
            },
            {
              id: "sgs" as DocumentViewType,
              title: "Phiếu Kiểm nghiệm Định kỳ Dư lượng Hoạt chất Nông sản",
              code: "Số: SGS-VNM-2026-8891 / Eurofins",
              auth: "Tổ chức Giám định Độc lập SGS Việt Nam & Eurofins Sắc Ký Hải Đăng",
              status: "Đạt chuẩn 0% hóa chất",
            },
          ].map((cert) => (
            <Box
              key={cert.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-0 last:pb-0"
            >
              <Box className="space-y-1">
                <Box className="flex items-center gap-2">
                  <Typography.Text className="text-xs sm:text-sm font-bold text-foreground">
                    {cert.title}
                  </Typography.Text>
                  <Badge variant="outline" className="text-[10px] text-emerald-700 dark:text-emerald-300 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40">
                    {cert.status}
                  </Badge>
                </Box>
                <Typography.Muted className="text-[11px] text-muted-foreground block">
                  {cert.code} • Cơ quan/Tổ chức: {cert.auth}
                </Typography.Muted>
              </Box>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewingDoc(cert.id)}
                className="text-xs h-8 gap-1.5 shrink-0 self-start sm:self-center"
              >
                <FileText className="w-3.5 h-3.5 text-slate-600" />
                <span>Xem văn bản</span>
              </Button>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* 5. MODAL XEM VĂN BẢN CHỨNG CHỈ / HỢP ĐỒNG PHÁP LÝ CHÍNH THỨC (Khi người dùng cần view) */}
      <Modal
        isOpen={viewingDoc !== null}
        onClose={() => setViewingDoc(null)}
        title={
          viewingDoc === "organic"
            ? "Bản Cam Kết Quy Chuẩn Kỹ Thuật Canh Tác Hữu Cơ"
            : viewingDoc === "insurance"
              ? "Quy Chế Bảo Hiểm Rủi Ro Mùa Vụ & Bồi Hoàn Nông Sản"
              : "Phiếu Kiểm Nghiệm Định Kỳ An Toàn Nông Sản"
        }
        description="Văn bản pháp quy điện tử chính thức được ký số mã hóa theo Luật Giao dịch Điện tử Việt Nam."
        size="lg"
      >
        <Box className="space-y-6 pt-2 font-sans">
          {/* Header Hành chính trang nghiêm */}
          <Box className="text-center pb-4 border-b border-border space-y-1">
            <Typography.Text className="text-xs font-bold uppercase tracking-wide text-foreground block">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </Typography.Text>
            <Typography.Text className="text-xs font-semibold text-foreground block">
              Độc lập - Tự do - Hạnh phúc
            </Typography.Text>
            <Box className="w-20 h-0.5 bg-slate-300 mx-auto my-1" />
            <Typography.Text className="text-[11px] text-muted-foreground italic block">
              Lâm Đồng, ngày 15 tháng 10 năm 2025
            </Typography.Text>
          </Box>

          {/* Nội dung chi tiết văn bản theo tab */}
          <Box className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            {viewingDoc === "organic" && (
              <Box className="space-y-3">
                <Typography.Text className="font-bold text-foreground text-sm block">
                  BẢN CAM KẾT TIÊU CHUẨN HỮU CƠ TCVN 11041:2017
                </Typography.Text>
                <Typography.P className="italic text-muted-foreground">
                  Số: 08/2026/QCKT-CK-DALAT • Ban hành kèm Hợp đồng Canh tác số Green Farm 2026
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 1. Căn cứ pháp lý:</strong> Căn cứ Luật Trồng trọt số 31/2018/QH14; Nghị định số 109/2018/NĐ-CP về Nông nghiệp hữu cơ; Bộ Tiêu chuẩn Quốc gia TCVN 11041-1:2017 và TCVN 11041-2:2017.
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 2. Quy chuẩn cách ly:</strong> Thiết lập vùng đệm cách ly cơ học tối thiểu 50 mét đối với khu vực sản xuất xung quanh. Đất trồng được kiểm định định kỳ không chứa kim loại nặng (Chì, Cadmi, Asen, Thủy ngân) đạt QCVN 03-MT:2015/BTNMT.
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 3. Nguồn nước tưới:</strong> 100% nước giếng khoan tầng ngầm sâu 85m tại Lạc Dương, khử trùng qua hệ thống tia cực tím UV và vi lọc, đạt tiêu chuẩn QCVN 08-MT:2015/BTNMT.
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 4. Nguyên tắc 5 Không:</strong> Không thuốc trừ sâu hóa học; Không phân bón vô cơ tổng hợp; Không thuốc diệt cỏ; Không hormone kích thích tăng trưởng; Không chất bảo quản.
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 5. Giám sát mở 24/7:</strong> Cung cấp luồng hình ảnh Camera HLS trực tiếp không ngắt quãng và dữ liệu cảm biến IoT cập nhật liên tục mỗi 5 phút vào nhật ký canh tác của khách hàng.
                </Typography.P>
                <Typography.P className="text-justify font-bold text-rose-700 dark:text-rose-400 p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200">
                  Điều 6. Chế tài bồi thường: Green Farm cam kết bồi thường gấp 10 (mười) lần toàn bộ giá trị hợp đồng nếu cơ quan kiểm định độc lập phát hiện tồn dư hóa chất cấm trong sản phẩm thu hoạch.
                </Typography.P>
              </Box>
            )}

            {viewingDoc === "insurance" && (
              <Box className="space-y-3">
                <Typography.Text className="font-bold text-foreground text-sm block">
                  QUY CHẾ BẢO HIỂM RỦI RO MÙA VỤ & BỒI HOÀN NÔNG SẢN
                </Typography.Text>
                <Typography.P className="italic text-muted-foreground">
                  Số: 12/2026/QC-BH-GF • Chương trình Green Farm Care 100%
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 1. Phạm vi áp dụng:</strong> Bảo lãnh 100% rủi ro mùa vụ cho toàn bộ khách hàng có hợp đồng thuê đất đang còn thời hạn canh tác tại nông trại.
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 2. Các trường hợp được bồi hoàn:</strong> Thiên tai thời tiết cực đoan (mưa đá, sương muối, lốc xoáy); Dịch hại bất khả kháng dù đã áp dụng phác đồ sinh học; Sự cố kỹ thuật nhà kính (mất điện, vỡ ống nước, lỗi cảm biến tưới) làm giảm trên 30% năng suất.
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 3. Ba phương án bồi thường lựa chọn:</strong> (1) Trồng bù miễn phí luống mới trong 48h; (2) Cung cấp rau hữu cơ tương đương từ kho dự phòng đối ứng; (3) Hoàn tiền 100% chi phí chu kỳ canh tác bị ảnh hưởng.
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Điều 4. Thời hạn xử lý:</strong> Kỹ sư thẩm định dữ liệu IoT và camera trong vòng 02 giờ. Hoàn tất bồi hoàn hoặc gieo trồng lại trong vòng 24 giờ kể từ khi khách hàng xác nhận trên ứng dụng.
                </Typography.P>
              </Box>
            )}

            {viewingDoc === "sgs" && (
              <Box className="space-y-3">
                <Typography.Text className="font-bold text-foreground text-sm block">
                  KẾT QUẢ KIỂM NGHIỆM ĐỊNH KỲ SGS & EUROFINS
                </Typography.Text>
                <Typography.P className="italic text-muted-foreground">
                  Mã giám định: SGS-VNM-2026-8891 • Ngày phân tích: 02/01/2026
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Đối tượng kiểm nghiệm:</strong> Rau xà lách Romaine, Cải Kale, Cà chua bi canh tác tại Lô đất Khu A - Green Farm Lạc Dương.
                </Typography.P>
                <Typography.P className="text-justify">
                  <strong>Chỉ tiêu kiểm định:</strong> Dư lượng 810 hoạt chất bảo vệ thực vật (thuốc trừ sâu, thuốc trừ nấm, thuốc trừ cỏ), hàm lượng kim loại nặng (Pb, Cd, As, Hg), vi sinh vật gây hại (E. coli, Salmonella).
                </Typography.P>
                <Typography.P className="text-justify font-semibold text-emerald-700 dark:text-emerald-400 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200">
                  Kết luận: 100% mẫu kiểm nghiệm đều cho kết quả KHÔNG PHÁT HIỆN (Not Detected - LOD &lt; 0.01 mg/kg), hoàn toàn tuân thủ tiêu chuẩn TCVN 11041:2017 và tiêu chuẩn xuất khẩu GlobalGAP.
                </Typography.P>
              </Box>
            )}
          </Box>

          {/* Con dấu số điện tử xác thực */}
          <Box className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <Box className="space-y-0.5 text-center sm:text-left">
              <Box className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>CHỨNG THƯ SỐ ĐIỆN TỬ HỢP LỆ • VIETTEL-CA TrustID</span>
              </Box>
              <Typography.Muted className="text-[10px] text-muted-foreground block font-mono">
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
              <span>In / Tải văn bản</span>
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
