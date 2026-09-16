import * as React from "react";
import { Printer, Copy, Check, ShieldCheck, FileText } from "lucide-react";
import { Box, Button, Typography, Badge } from "@/shared/ui";


export function AboutLegalCharter() {
  const [copied, setCopied] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("all");

  // Xử lý scroll đến hash anchor khi load trang (e.g. #organic-standards hoặc #crop-insurance)
  React.useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveSection(hash);
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToElement = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <Box className="w-full space-y-6">
      {/* Top Document Controls (Print-hidden) */}
      <Box className="print:hidden flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <Box className="flex flex-wrap items-center gap-1 sm:gap-2">
          <Button
            size="sm"
            variant={activeSection === "all" ? "default" : "ghost"}
            onClick={() => {
              setActiveSection("all");
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", window.location.pathname);
            }}
            className="text-xs h-8 px-3"
          >
            Toàn văn bản
          </Button>
          <Button
            size="sm"
            variant={activeSection === "organic-standards" ? "default" : "ghost"}
            onClick={() => scrollToElement("organic-standards")}
            className="text-xs h-8 px-3"
          >
            Cam kết tiêu chuẩn hữu cơ
          </Button>
          <Button
            size="sm"
            variant={activeSection === "crop-insurance" ? "default" : "ghost"}
            onClick={() => scrollToElement("crop-insurance")}
            className="text-xs h-8 px-3"
          >
            Bảo hiểm rủi ro mùa vụ
          </Button>
        </Box>

        <Box className="flex items-center gap-2 justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyLink}
            className="text-xs h-8 gap-1.5"
            title="Sao chép liên kết văn bản"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Đã chép" : "Chia sẻ link"}</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handlePrint}
            className="text-xs h-8 gap-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100"
            title="In văn bản hợp đồng"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In văn bản (PDF)</span>
          </Button>
        </Box>
      </Box>

      {/* Main Legal Contract Document Sheet */}
      <Box className="relative bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-md rounded-md max-w-4xl mx-auto p-6 sm:p-12 lg:p-16 text-slate-800 dark:text-slate-200 leading-relaxed font-serif print:shadow-none print:border-none print:p-0">
        {/* Subtle Watermark Stamp */}
        <Box className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.03] dark:opacity-[0.04]">
          <Box className="text-center transform -rotate-24 select-none">
            <Typography.Text className="text-6xl sm:text-8xl font-black uppercase tracking-widest font-sans">
              GREEN FARM
            </Typography.Text>
            <Typography.Text className="text-2xl sm:text-3xl font-bold uppercase tracking-widest font-sans mt-2 block">
              BẢN CAM KẾT CHÍNH THỨC 2026
            </Typography.Text>
          </Box>
        </Box>

        {/* 1. Header Tiêu Ngữ & Thông Tin Cơ Quan */}
        <Box className="border-b-2 border-slate-800/80 dark:border-slate-300/80 pb-6 mb-8 font-sans">
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start text-center md:text-left">
            <Box className="space-y-1">
              <Typography.Text className="text-xs sm:text-sm font-bold uppercase tracking-tight text-slate-900 dark:text-slate-100 block">
                CÔNG TY CP NÔNG NGHIỆP CÔNG NGHỆ CAO GREEN FARM
              </Typography.Text>
              <Typography.Text className="text-xs text-slate-600 dark:text-slate-400 block">
                Số: 08/2026/QCKT-CK-DALAT
              </Typography.Text>
              <Typography.Text className="text-[11px] text-slate-500 italic block">
                V/v: Quy chuẩn canh tác hữu cơ & chính sách bảo hiểm mùa vụ
              </Typography.Text>
            </Box>

            <Box className="space-y-1 md:text-center text-center">
              <Typography.Text className="text-xs sm:text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100 block">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </Typography.Text>
              <Typography.Text className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 block">
                Độc lập - Tự do - Hạnh phúc
              </Typography.Text>
              <Box className="w-24 h-0.5 bg-slate-400 mx-auto my-1.5" />
              <Typography.Text className="text-[11px] text-slate-500 italic block">
                Lâm Đồng, ngày 15 tháng 10 năm 2025
              </Typography.Text>
            </Box>
          </Box>

          <Box className="text-center pt-8 space-y-2">
            <Typography.H2 className="text-xl sm:text-2xl font-extrabold uppercase text-slate-950 dark:text-white tracking-normal font-serif">
              BẢN CAM KẾT QUY CHUẨN KỸ THUẬT CANH TÁC HỮU CƠ & CHÍNH SÁCH BẢO HIỂM RỦI RO MÙA VỤ
            </Typography.H2>
            <Typography.Text className="text-xs text-slate-600 dark:text-slate-400 italic block">
              (Áp dụng bắt buộc đối với toàn bộ Hợp đồng điện tử thuê đất canh tác tại Hệ thống Nông trại Green Farm Đà Lạt)
            </Typography.Text>
          </Box>
        </Box>

        {/* 2. Căn Cứ Pháp Lý (Legal Basis) */}
        <Box className="space-y-1.5 text-xs sm:text-sm italic text-slate-700 dark:text-slate-300 pb-6 border-b border-slate-200 dark:border-slate-800 mb-8">
          <Typography.P className="leading-relaxed">
            - Căn cứ Luật Trồng trọt số 31/2018/QH14 được Quốc hội nước Cộng hòa Xã hội Chủ nghĩa Việt Nam thông qua ngày 19 tháng 11 năm 2018;
          </Typography.P>
          <Typography.P className="leading-relaxed">
            - Căn cứ Nghị định số 109/2018/NĐ-CP ngày 29 tháng 8 năm 2018 của Chính phủ về Nông nghiệp hữu cơ;
          </Typography.P>
          <Typography.P className="leading-relaxed">
            - Căn cứ Bộ Tiêu chuẩn Quốc gia TCVN 11041-1:2017 & TCVN 11041-2:2017 về Trồng trọt hữu cơ và các quy chuẩn kỹ thuật an toàn thực phẩm;
          </Typography.P>
          <Typography.P className="leading-relaxed">
            - Căn cứ Luật Giao dịch Điện tử số 20/2023/QH15 và Luật Bảo vệ Quyền lợi Người tiêu dùng số 19/2023/QH15;
          </Typography.P>
          <Typography.P className="leading-relaxed">
            - Căn cứ Quy chế Vận hành Nông trại Công nghệ cao Green Farm tại Tiểu khu 158, xã Đạ Sar, huyện Lạc Dương, tỉnh Lâm Đồng.
          </Typography.P>
        </Box>

        {/* 3. Nội Dung Văn Bản Điều Khoản */}
        <Box className="space-y-10 text-xs sm:text-sm leading-relaxed">
          {/* CHƯƠNG I */}
          <Box className="space-y-4">
            <Typography.H3 className="text-sm sm:text-base font-bold uppercase text-slate-900 dark:text-slate-100 tracking-wide border-l-4 border-slate-800 dark:border-slate-200 pl-3">
              CHƯƠNG I: QUY ĐỊNH CHUNG & MÔ HÌNH NÔNG NGHIỆP SỐ MINH BẠCH
            </Typography.H3>

            <Box className="space-y-3 pl-3 sm:pl-4 border-l border-slate-200 dark:border-slate-800">
              <Box className="space-y-1">
                <Typography.Text className="font-bold text-slate-900 dark:text-slate-100 block">
                  Điều 1. Tư cách pháp nhân và Thông tin chủ thể nông trại
                </Typography.Text>
                <Typography.P className="text-justify">
                  1.1. Doanh nghiệp vận hành: <strong>CÔNG TY CỔ PHẦN NÔNG NGHIỆP CÔNG NGHỆ CAO GREEN FARM ĐÀ LẠT</strong> (Sau đây gọi tắt là <em>&quot;Green Farm&quot;</em>). Mã số doanh nghiệp: 5801456899 do Sở Kế hoạch & Đầu tư tỉnh Lâm Đồng cấp.
                </Typography.P>
                <Typography.P className="text-justify">
                  1.2. Địa chỉ tổ hợp canh tác: Tiểu khu 158, xã Đạ Sar, huyện Lạc Dương, thành phố Đà Lạt, tỉnh Lâm Đồng.
                </Typography.P>
                <Typography.P className="text-justify">
                  1.3. Tôn chỉ hoạt động: Xóa bỏ ranh giới bất đối xứng thông tin giữa cư dân đô thị và người sản xuất thông qua công nghệ số, cam kết 100% nông sản sạch chuẩn hữu cơ không can thiệp hóa chất, minh bạch mọi chỉ số qua vi cảm biến và camera truyền phát thời gian thực.
                </Typography.P>
              </Box>

              <Box className="space-y-1 pt-2">
                <Typography.Text className="font-bold text-slate-900 dark:text-slate-100 block">
                  Điều 2. Bản chất pháp lý của mô hình Đồng canh tác
                </Typography.Text>
                <Typography.P className="text-justify">
                  2.1. Khách hàng tham gia ký kết hợp đồng điện tử là chủ sở hữu hợp pháp đối với toàn bộ sản lượng nông sản thu hoạch được trên diện tích ô đất được giao quyền khai thác trong thời hạn hợp đồng.
                </Typography.P>
                <Typography.P className="text-justify">
                  2.2. Kỹ thuật viên nông trại Green Farm đóng vai trò là bên nhận ủy thác chăm sóc chuyên nghiệp theo đúng phác đồ sinh học nghiêm ngặt được quy định tại Bản Cam kết này.
                </Typography.P>
              </Box>
            </Box>
          </Box>

          {/* CHƯƠNG II: CAM KẾT TIÊU CHUẨN HỮU CƠ (ANCHOR: organic-standards) */}
          <Box id="organic-standards" className="space-y-4 pt-4 scroll-mt-20">
            <Box className="flex items-center justify-between gap-3 border-l-4 border-emerald-700 dark:border-emerald-500 pl-3">
              <Typography.H3 className="text-sm sm:text-base font-bold uppercase text-slate-900 dark:text-slate-100 tracking-wide">
                CHƯƠNG II: QUY CHUẨN KỸ THUẬT & CAM KẾT TIÊU CHUẨN HỮU CƠ
              </Typography.H3>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 text-[10px] font-mono">
                TCVN 11041:2017
              </Badge>
            </Box>

            <Box className="space-y-4 pl-3 sm:pl-4 border-l border-emerald-200 dark:border-emerald-900/50">
              <Box className="space-y-1">
                <Typography.Text className="font-bold text-slate-900 dark:text-slate-100 block">
                  Điều 3. Quy chuẩn cách ly thổ nhưỡng và vùng đệm an toàn
                </Typography.Text>
                <Typography.P className="text-justify">
                  3.1. Toàn bộ khu đất canh tác được thiết lập vùng đệm cách ly cơ học tối thiểu 50 mét so với các khu vực canh tác nông nghiệp sử dụng hóa chất truyền thống xung quanh.
                </Typography.P>
                <Typography.P className="text-justify">
                  3.2. Đất trồng trải qua giai đoạn chuyển đổi sinh học tối thiểu 36 tháng không sử dụng hóa chất. Hàm lượng kim loại nặng (Chì - Pb, Cadmi - Cd, Asen - As, Thủy ngân - Hg) phải đạt chỉ số an toàn tuyệt đối theo Quy chuẩn Kỹ thuật Quốc gia QCVN 03-MT:2015/BTNMT.
                </Typography.P>
              </Box>

              <Box className="space-y-1">
                <Typography.Text className="font-bold text-slate-900 dark:text-slate-100 block">
                  Điều 4. Quy chuẩn nguồn nước tưới ngầm tự nhiên
                </Typography.Text>
                <Typography.P className="text-justify">
                  4.1. Nguồn nước tưới được khai thác hoàn toàn từ giếng khoan tầng ngầm sâu 85 mét tại sườn rừng thông nguyên sinh Lạc Dương, không chịu tác động của nước mặt đô thị hoặc nước thải sinh hoạt.
                </Typography.P>
                <Typography.P className="text-justify">
                  4.2. Nước được lọc qua hệ thống vi sinh đa tầng và khử trùng bằng tia cực tím (UV) trước khi đưa vào hệ thống tưới nhỏ giọt tự động, bảo đảm đáp ứng tiêu chuẩn QCVN 08-MT:2015/BTNMT về chất lượng nước mặt và nước dưới đất phục vụ mục đích nông nghiệp.
                </Typography.P>
              </Box>

              <Box className="space-y-1">
                <Typography.Text className="font-bold text-slate-900 dark:text-slate-100 block">
                  Điều 5. Kiểm soát nguồn giống thuần chủng không biến đổi gen (Non-GMO)
                </Typography.Text>
                <Typography.P className="text-justify">
                  5.1. 100% hạt giống và cây con được chọn lọc từ các dòng thuần F1 hoặc giống bản địa đặc sản Đà Lạt có chứng chỉ nguồn gốc xuất xứ rõ ràng từ Viện Nghiên cứu Khoa học Nông Lâm nghiệp Tây Nguyên hoặc các nhà cung ứng giống đạt chuẩn quốc tế.
                </Typography.P>
                <Typography.P className="text-justify">
                  5.2. Tuyệt đối nghiêm cấm việc đưa vào sử dụng các loại giống cây trồng biến đổi gen (GMO) hoặc giống đã qua xử lý chất bảo quản hóa học tổng hợp.
                </Typography.P>
              </Box>

              <Box className="space-y-1">
                <Typography.Text className="font-bold text-slate-900 dark:text-slate-100 block">
                  Điều 6. Nguyên tắc 5 KHÔNG trong chăm sóc và dinh dưỡng thực vật
                </Typography.Text>
                <Typography.P className="text-justify">
                  Green Farm cam kết thực thi nghiêm ngặt <strong>&quot;Nguyên tắc 5 KHÔNG&quot;</strong> tại từng luống đất:
                </Typography.P>
                <Box className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1.5 my-2">
                  <Typography.P className="font-semibold text-slate-900 dark:text-slate-100">
                    (1) KHÔNG thuốc trừ sâu hóa học tổng hợp.
                  </Typography.P>
                  <Typography.P className="font-semibold text-slate-900 dark:text-slate-100">
                    (2) KHÔNG phân bón hóa học (vô cơ, NPK tổng hợp, đạm urê nhân tạo).
                  </Typography.P>
                  <Typography.P className="font-semibold text-slate-900 dark:text-slate-100">
                    (3) KHÔNG thuốc diệt cỏ hay chất làm rụng lá.
                  </Typography.P>
                  <Typography.P className="font-semibold text-slate-900 dark:text-slate-100">
                    (4) KHÔNG chất kích thích tăng trưởng (hormone sinh trưởng thực vật).
                  </Typography.P>
                  <Typography.P className="font-semibold text-slate-900 dark:text-slate-100">
                    (5) KHÔNG chất bảo quản nông sản sau thu hoạch.
                  </Typography.P>
                </Box>
                <Typography.P className="text-justify">
                  Dinh dưỡng cung cấp cho rau màu chỉ bao gồm phân hữu cơ hoai mục ủ vi sinh IMO, dịch đạm trùn quế và phân cá ủ men sinh học tự nhiên theo công thức nông học bản quyền.
                </Typography.P>
              </Box>

              <Box className="space-y-1">
                <Typography.Text className="font-bold text-slate-900 dark:text-slate-100 block">
                  Điều 7. Minh bạch dữ liệu vi khí hậu IoT và Luồng hình ảnh trực tiếp 24/7
                </Typography.Text>
                <Typography.P className="text-justify">
                  7.1. Mỗi ô đất canh tác được gắn camera HLS chuyên dụng hoạt động liên tục 24/7/365, truyền phát hình ảnh thời gian thực không ngắt quãng đến ứng dụng của Khách hàng.
                </Typography.P>
                <Typography.P className="text-justify">
                  7.2. Cảm biến IoT đo nhiệt độ không khí, độ ẩm không khí, độ ẩm đất và độ dẫn điện dinh dưỡng (EC) được cập nhật liên tục 5 phút/lần, lưu vết dữ liệu bất biến trên hệ sinh thái đám mây để khách hàng và cơ quan thanh tra kiểm tra bất cứ lúc nào.
                </Typography.P>
              </Box>

              <Box className="space-y-1">
                <Typography.Text className="font-bold text-slate-900 dark:text-slate-100 block">
                  Điều 8. Kiểm định độc lập và Trách nhiệm pháp lý đặc biệt
                </Typography.Text>
                <Typography.P className="text-justify">
                  8.1. Định kỳ mỗi quý một lần, Green Farm gửi mẫu đất, mẫu nước tưới và mẫu rau ngẫu nhiên đến Phòng kiểm nghiệm đạt chuẩn quốc tế (SGS Việt Nam hoặc Eurofins Sắc Ký Hải Đăng) để phân tích tồn dư hơn 800 hoạt chất bảo vệ thực vật. Phiếu kết quả kiểm nghiệm được công bố công khai trên hệ thống.
                </Typography.P>
                <Typography.P className="text-justify text-rose-700 dark:text-rose-400 font-semibold bg-rose-50 dark:bg-rose-950/40 p-3 rounded-lg border border-rose-200 dark:border-rose-900/60">
                  8.2. CHẾ TÀI ĐẶC BIỆT: Nếu Khách hàng đem nông sản thu hoạch từ ô đất của mình đi kiểm nghiệm tại các cơ quan đo lường độc lập có thẩm quyền của Nhà nước và phát hiện tồn dư hóa chất bảo vệ thực vật hoặc chất cấm vượt quá giới hạn quy định, Green Farm cam kết bồi thường gấp 10 (mười) lần toàn bộ giá trị hợp đồng thuê đất mùa vụ đã thanh toán và chịu hoàn toàn trách nhiệm trước pháp luật.
                </Typography.P>
              </Box>
            </Box>
          </Box>

          {/* CHƯƠNG III: CHÍNH SÁCH BẢO HIỂM RỦI RO MÙA VỤ (ANCHOR: crop-insurance) */}
          <Box id="crop-insurance" className="space-y-4 pt-4 scroll-mt-20">
            <Box className="flex items-center justify-between gap-3 border-l-4 border-amber-700 dark:border-amber-500 pl-3">
              <Typography.H3 className="text-sm sm:text-base font-bold uppercase text-slate-900 dark:text-slate-100 tracking-wide">
                CHƯƠNG III: CHÍNH SÁCH BẢO HIỂM RỦI RO MÙA VỤ & QUY CHẾ BỒI HOÀN
              </Typography.H3>
              <Badge variant="outline" className="bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 text-[10px] font-mono">
                BẢO HIỂM 100%
              </Badge>
            </Box>

            <Box className="space-y-4 pl-3 sm:pl-4 border-l border-amber-200 dark:border-amber-900/50">
              <Box className="space-y-1">
                <Typography.Text className="font-bold text-slate-900 dark:text-slate-100 block">
                  Điều 9. Phạm vi bảo lãnh rủi ro nông vụ (Green Farm Care 100%)
                </Typography.Text>
                <Typography.P className="text-justify">
                  Mọi ô đất canh tác có hợp đồng điện tử hợp lệ đều tự động được áp dụng gói bảo lãnh an toàn mùa vụ mà không phát sinh thêm bất kỳ khoản phí phụ thu nào. Green Farm đứng ra bảo lãnh 100% rủi ro nông sản đến tay người tiêu dùng.
                </Typography.P>
              </Box>

              <Box className="space-y-1">
                <Typography.Text className="font-bold text-slate-900 dark:text-slate-100 block">
                  Điều 10. Các trường hợp sự cố được chi trả bảo hiểm
                </Typography.Text>
                <Typography.P className="text-justify">
                  10.1. Thiên tai thời tiết cực đoan: Mưa đá cục bộ tại cao nguyên, sương muối giá lạnh gây táp lá, giông lốc làm ảnh hưởng màng che nhà kính.
                </Typography.P>
                <Typography.P className="text-justify">
                  10.2. Dịch hại tự nhiên bất khả kháng: Bùng phát dịch bọ trĩ, sâu tơ hoặc nấm bệnh sinh học dù kỹ thuật viên đã áp dụng đầy đủ quy trình an toàn sinh học theo đúng nhật ký công việc.
                </Typography.P>
                <Typography.P className="text-justify">
                  10.3. Sự cố kỹ thuật công nghệ cao: Lỗi mất điện lưới dự phòng kéo dài, vỡ ống cấp nước chính hoặc hỏng hóc cảm biến tưới tự động làm ảnh hưởng năng suất luống rau quá 30% sản lượng dự kiến.
                </Typography.P>
              </Box>

              <Box className="space-y-1">
                <Typography.Text className="font-bold text-slate-900 dark:text-slate-100 block">
                  Điều 11. Ba (03) hình thức bồi thường linh hoạt
                </Typography.Text>
                <Typography.P className="text-justify">
                  Khi xảy ra sự cố thuộc phạm vi bảo hiểm, Khách hàng có toàn quyền chủ động lựa chọn một trong ba phương án bồi thường sau đây:
                </Typography.P>
                <Box className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
                  <Box className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                    <Typography.Text className="font-bold text-xs uppercase text-emerald-800 dark:text-emerald-400 block">
                      Phương án 1: Trồng bù khẩn cấp
                    </Typography.Text>
                    <Typography.P className="text-xs text-justify text-slate-600 dark:text-slate-400">
                      Nông trại dọn sạch luống và gieo trồng lại luống rau mới trong vòng 48 giờ. Miễn phí 100% cây giống, giá thể và công chăm sóc. Hạn thuê đất tự động kéo dài bù số ngày thiệt hại.
                    </Typography.P>
                  </Box>

                  <Box className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                    <Typography.Text className="font-bold text-xs uppercase text-sky-800 dark:text-sky-400 block">
                      Phương án 2: Xuất kho dự phòng
                    </Typography.Text>
                    <Typography.P className="text-xs text-justify text-slate-600 dark:text-slate-400">
                      Giao nhận rau củ sạch đạt chuẩn hữu cơ tương đương sản lượng cam kết từ Vườn canh tác đối ứng của Green Farm để bàn ăn gia đình khách hàng không bị gián đoạn.
                    </Typography.P>
                  </Box>

                  <Box className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                    <Typography.Text className="font-bold text-xs uppercase text-amber-800 dark:text-amber-400 block">
                      Phương án 3: Hoàn tiền 100%
                    </Typography.Text>
                    <Typography.P className="text-xs text-justify text-slate-600 dark:text-slate-400">
                      Hoàn trả 100% chi phí thuê đất và chi phí canh tác của chu kỳ mùa vụ bị ảnh hưởng trực tiếp vào tài khoản ngân hàng hoặc ví điện tử của khách hàng trong 03 ngày làm việc.
                    </Typography.P>
                  </Box>
                </Box>
              </Box>

              <Box className="space-y-1">
                <Typography.Text className="font-bold text-slate-900 dark:text-slate-100 block">
                  Điều 12. Quy trình giám định tự động và Thời hạn xử lý bồi thường
                </Typography.Text>
                <Typography.P className="text-justify">
                  12.1. Giám định số hóa: Khi có báo cáo sự cố hoặc cảm biến kích hoạt cảnh báo, Trưởng Ban Nông học và Kỹ sư trưởng tiến hành đối chiếu dữ liệu hình ảnh camera và biểu đồ cảm biến trong vòng tối đa <strong>02 (hai) giờ</strong> làm việc.
                </Typography.P>
                <Typography.P className="text-justify">
                  12.2. Thời hạn hoàn tất bồi hoàn: Toàn bộ thủ tục gieo trồng lại hoặc giải ngân hoàn tiền bồi hoàn được thực thi hoàn tất trong vòng <strong>24 (hai mươi bốn) giờ</strong> làm việc kể từ thời điểm Khách hàng xác nhận phương án xử lý trên ứng dụng.
                </Typography.P>
              </Box>
            </Box>
          </Box>

          {/* CHƯƠNG IV: ĐIỀU KHOẢN THI HÀNH & KÝ SỐ */}
          <Box className="space-y-4 pt-4">
            <Typography.H3 className="text-sm sm:text-base font-bold uppercase text-slate-900 dark:text-slate-100 tracking-wide border-l-4 border-slate-800 dark:border-slate-200 pl-3">
              CHƯƠNG IV: HIỆU LỰC THI HÀNH & KÝ SỐ PHÁP NHÂN
            </Typography.H3>

            <Box className="space-y-3 pl-3 sm:pl-4 border-l border-slate-200 dark:border-slate-800">
              <Typography.P className="text-justify">
                Bản Quy chuẩn Kỹ thuật Canh tác Hữu cơ và Chính sách Bảo hiểm Rủi ro Mùa vụ này có hiệu lực kể từ ngày công bố và được tích hợp mặc định như một điều khoản hợp đồng bắt buộc trong Hợp đồng Thuê đất số ký kết giữa Khách hàng và Green Farm.
              </Typography.P>
              <Typography.P className="text-justify">
                Mọi tranh chấp phát sinh (nếu có) trước hết được giải quyết trên tinh thần thương lượng thiện chí, bảo vệ tối đa quyền lợi sức khỏe và quyền thụ hưởng nông sản hữu cơ của khách hàng.
              </Typography.P>
            </Box>
          </Box>
        </Box>

        {/* 4. Phần Chữ Ký Số & Con Dấu Điện Tử Chuẩn Hợp Đồng */}
        <Box className="pt-12 mt-12 border-t-2 border-slate-800/80 dark:border-slate-300/80 font-sans">
          <Box className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
            <Box className="text-center sm:text-left space-y-1">
              <Typography.Text className="text-xs font-bold uppercase text-slate-900 dark:text-slate-100 block">
                ĐẠI DIỆN HỘI ĐỒNG THẨM ĐỊNH NÔNG HỌC
              </Typography.Text>
              <Typography.Text className="text-[11px] text-slate-500 italic block">
                (Ký, ghi rõ họ tên và xác thực chức danh)
              </Typography.Text>
              <Box className="pt-10">
                <Typography.Text className="text-sm font-bold text-slate-800 dark:text-slate-200 font-serif italic block">
                  TS. Lê Hoàng Nam
                </Typography.Text>
                <Typography.Text className="text-xs text-slate-500 block">
                  Phó Giám đốc Kỹ thuật Sinh học Nông nghiệp
                </Typography.Text>
              </Box>
            </Box>

            <Box className="text-center sm:text-right space-y-1">
              <Typography.Text className="text-xs font-bold uppercase text-slate-900 dark:text-slate-100 block">
                ĐẠI DIỆN THEO PHÁP LUẬT CỦA DOANH NGHIỆP
              </Typography.Text>
              <Typography.Text className="text-[11px] text-slate-500 italic block">
                (Ký số điện tử & Đóng dấu pháp nhân)
              </Typography.Text>

              {/* Con Dấu Số Điện Tử (Official Digital Seal) */}
              <Box className="pt-4 inline-block text-left">
                <Box className="border-2 border-rose-700/80 bg-rose-50/70 dark:bg-rose-950/30 p-3 rounded-lg text-rose-800 dark:text-rose-300 space-y-0.5 shadow-2xs">
                  <Box className="flex items-center gap-1.5 text-xs font-black uppercase text-rose-700 dark:text-rose-400">
                    <ShieldCheck className="w-4 h-4 text-rose-700 dark:text-rose-400 shrink-0" />
                    <span>ĐÃ KÝ SỐ HỢP LỆ (DIGITALLY SIGNED)</span>
                  </Box>
                  <Typography.Text className="text-[10px] block font-mono font-semibold">
                    CN = CÔNG TY CP NÔNG NGHIỆP CÔNG NGHỆ CAO GREEN FARM
                  </Typography.Text>
                  <Typography.Text className="text-[10px] block font-mono text-slate-600 dark:text-slate-400">
                    MST: 5801456899 • CA: VIETTEL-CA TrustID
                  </Typography.Text>
                  <Typography.Text className="text-[9px] block font-mono text-slate-500">
                    Thời gian ký: 15/10/2025 08:30:00 GMT+7
                  </Typography.Text>
                  <Typography.Text className="text-[9px] block font-mono text-slate-500 truncate max-w-[260px]">
                    SHA256: 7F8B2C9A-4E1D-4A23-9BC0-88214EFA72B1
                  </Typography.Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 5. Document Metadata Footer */}
        <Box className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400 dark:text-slate-500 font-sans">
          <Box className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Văn bản pháp quy điện tử • Lưu hành nội bộ và công bố khách hàng</span>
          </Box>
          <Typography.Text>Trang 1 / 1 • Mã lưu trữ: GF-CHARTER-2026</Typography.Text>
        </Box>
      </Box>
    </Box>
  );
}
