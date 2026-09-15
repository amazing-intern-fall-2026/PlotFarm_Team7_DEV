# TÀI LIỆU CĂN CHỈNH PHẠM VI, YÊU CẦU HỆ THỐNG VÀ ĐẶC TẢ TRƯỜNG HỢP BIÊN (EDGE CASES)
## Dự án: Nền tảng Cho Thuê Ô Đất Canh Tác Nông Nghiệp Số (Cloud Farming Platform)
- **Phiên bản tài liệu:** 3.0 (Cập nhật Kiến trúc, Chi tiết Kỹ thuật & Edge Cases toàn diện)
- **Tiến độ dự án:** Nén 3 Tuần (Sprint 1: Xong; Sprint 2: Tuần 2; Sprint 3: Tuần 3)
- **Quy mô nhân sự:** 4 Thành viên (2 Frontend: Nghĩa, Huy; 2 Backend: Bảo, Sang)

---

## 1. Bối cảnh Dự án và Giải mã Đề bài

### 1.1. Yêu cầu gốc từ đề bài
Đề bài Capstone ban đầu đưa ra 3 yêu cầu cốt lõi:
1. Thuê ô đất trực tuyến và gửi yêu cầu chăm sóc cây trồng.
2. Theo dõi tình trạng phát triển của cây và xem nhật ký theo từng giai đoạn sinh trưởng.
3. Xem trực tiếp hình ảnh camera tại ô đất và nhận sản phẩm nông sản sạch sau khi thu hoạch.

### 1.2. Phân tích nghiệp vụ 4 Phân hệ trụ cột
Để xây dựng một sản phẩm phần mềm hoàn chỉnh, hệ thống được cấu trúc thành 4 phân hệ chính:
- **Phân hệ 1: Booking & E-Commerce (Đặt thuê & Thanh toán):** Chọn ô đất theo bản đồ trực quan, cơ chế giữ chỗ độc quyền 5 phút chống tranh chấp, thanh toán chuyển khoản VietQR vào tài khoản thực tế và kích hoạt hợp đồng vụ mùa.
- **Phân hệ 2: Farming Operations (Quản lý Canh tác & Dịch vụ Chăm sóc):** Nông trại quy hoạch sẵn cây trồng theo mùa vụ cho từng ô đất; nông dân tải ảnh nhật ký thực tế lên đám mây Cloudinary; khách hàng gửi phiếu chăm sóc (bón phân, nhổ cỏ, bắt sâu); nông dân nghiệm thu thực địa kèm ảnh đối chứng.
- **Phân hệ 3: Video Surveillance & Telemetry (Giám sát Camera & Cảm biến):** Phát luồng video trực tiếp chuẩn HLS từ luống đất; lớp phủ giao diện (HUD Overlay) hiển thị đồng hồ thời gian thực và widget thông số độ ẩm đất, nhiệt độ môi trường biến thiên tự nhiên.
- **Phân hệ 4: Fulfillment Logistics (Thu hoạch & Giao nhận Nông sản):** Nông dân tạo lệnh thu hoạch kèm sản lượng thực tế (kg); hệ thống tự động xuất phiếu gửi hàng chuẩn A6 có Barcode Code128 và QR tra cứu; cổng vận chuyển ảo mô phỏng các bước giao hàng về tận nhà khách.

---

## 2. Các Ranh giới Nghiệp vụ Cốt lõi đã Thống nhất (Core Business Rules)

### 2.1. Quy tắc Giống cây trồng & Vụ mùa (Crop & Seasonality Rule)
- **Nguyên tắc thực tế:** Cây trồng phụ thuộc chặt chẽ vào mùa vụ và thổ nhưỡng của từng luống đất. Khách hàng không được tự do chọn cây tùy ý (tránh trường hợp đòi trồng cây trái mùa hoặc không thể sinh trưởng ngoài thực tế).
- **Quy định triển khai:**
  - Nông trại (Admin/Chủ vườn) là bên quy hoạch và gán sẵn giống cây trồng đang vào vụ cho từng ô đất thông qua thuộc tính `plot.defaultCropId`.
  - Khách hàng khi xem bản đồ sẽ thấy ô đất gắn liền với gói dịch vụ vụ mùa của cây đó (ví dụ: *Ô đất A01 - Đang canh tác Cải bó xôi - Chu kỳ 60 ngày - Trọn gói 1.200.000 VNĐ*).
  - Khi tạo hợp đồng, hệ thống tự động trích xuất giống cây từ ô đất, tự động tính ngày thu hoạch dựa trên `crop.durationDays` và tính toán đơn giá trọn gói.

### 2.2. Quy tắc Khóa tạm Ô đất (Hold Lock Concurrency Rule)
- **Thời gian khóa giữ chỗ:** Chính xác **5 phút (300 giây)**.
- Khi khách hàng nhấn vào ô đất trống (`AVAILABLE`), hệ thống cấp quyền khóa tạm thời cho tài khoản đó.
- Trong thời gian 5 phút:
  - Khách hàng khác nhìn thấy ô đất ở trạng thái `RESERVED` và không thể bấm thuê.
  - Khách hàng đang giữ chỗ tiến hành xác nhận thông tin và thanh toán.
- Quá 5 phút nếu không phát sinh thanh toán thành công, tác vụ nền (background job) tự động mở khóa đưa ô đất về trạng thái `AVAILABLE`.

### 2.3. Quy tắc Thanh toán Chuyển khoản (Real Transfer & Webhook Verification)
- **Cơ chế thanh toán:**
  - Hệ thống tích hợp VietQR sinh mã QR động chuẩn Napas 24/7 chứa thông tin tài khoản ngân hàng thực tế của thành viên đại diện trong nhóm, số tiền chính xác và cú pháp chuyển khoản `CF[Mã đơn]`.
  - Khách hàng có thể sử dụng ứng dụng ngân hàng thật quét mã và chuyển tiền thật (ví dụ: số tiền tượng trưng hoặc số tiền đơn hàng).
- **Cơ chế xác nhận đơn:**
  - Nhánh tự động: Kết nối cổng webhook đối soát biến động số dư (SePay/Casso) để tự động lắng nghe giao dịch thành công và chuyển trạng thái hợp đồng sang `ACTIVE`.
  - Nhánh dự phòng phục vụ chấm thi: Tích hợp nút kích hoạt tức thì trên màn hình thanh toán để đề phòng sự cố trễ mạng ngân hàng trong lúc thuyết trình.

### 2.4. Quy tắc Dịch vụ Chăm sóc (Care Request Policy)
- Mỗi hợp đồng được hưởng **2 lần chăm sóc miễn phí / tháng** đối với các dịch vụ tiêu chuẩn: Bón phân vi sinh, Nhổ cỏ dại, Bắt sâu/tỉa lá.
- Từ lần thứ 3 trở đi trong tháng, hệ thống tự động cộng phụ phí (`extraFee` cố định 50.000 VNĐ / lần) vào hóa đơn dịch vụ phụ phát sinh.
- Mọi phiếu chăm sóc chỉ được hoàn tất khi nông dân chụp ảnh thực địa tải lên làm bằng chứng (`proofImages`).

### 2.5. Quy tắc Công cụ Thuyết trình (Time Accelerator Demo Tool)
- Vụ mùa kéo dài 30 đến 60 ngày thực tế, nhưng buổi bảo vệ đồ án chỉ diễn ra trong 5 - 10 phút.
- Hệ thống xây dựng một công cụ hỗ trợ thuyết trình chuyên dụng (**Time Accelerator**):
  - Cho phép 1-click tua nhanh ngày hệ thống của hợp đồng từ Ngày 1 đến Ngày thu hoạch.
  - Thể hiện trọn vẹn toàn bộ vòng đời: gieo hạt, cập nhật nhật ký, cây lớn theo stepper, gửi chăm sóc, ra lệnh thu hoạch và in vận đơn giao hàng ngay trong buổi báo cáo.

### 2.6. Quy tắc Sinh mã Vận đơn và Tra cứu Đơn hàng qua Quét mã (Barcode & QR Code Tracking Resolution)
- **Tự động sinh mã duy nhất tại Backend:**
  - Khi Nông dân tạo lệnh thu hoạch và xuất đơn vận chuyển, Backend tự động sinh mã vận đơn định danh duy nhất toàn hệ thống theo chuẩn: `AGRI-VN-[YYYYMMDD]-[RANDOM6]` (Ví dụ: `AGRI-VN-20260915-K8X29Q`).
  - Bản ghi được lưu vào bảng `shipments` với trạng thái ban đầu là `PREPARING` (Đang đóng gói tại vườn).
- **Mã hóa đa phương thức trên Phiếu vận đơn chuẩn A6:**
  - **Mã vạch tuyến tính (Barcode Code128):** Mã hóa chuỗi `trackingCode` để các thiết bị máy quét mã vạch chuyên dụng của shipper hoặc thủ kho quét "tít tít" đọc ra mã vận đơn.
  - **Mã phản hồi nhanh (QR Code):** Mã hóa đường dẫn tra cứu trực tiếp (Deep Link: `https://<domain>/tracking/AGRI-VN-20260915-K8X29Q`).
- **Trải nghiệm quét mã bằng điện thoại (Mobile Scanning Resolution):**
  - Khách hàng hoặc giám khảo chấm thi chỉ cần dùng ứng dụng Camera trên smartphone hoặc Zalo quét mã QR trên phiếu in A6.
  - Trình duyệt tự động mở ngay trang **Tra cứu Kiện hàng Nông sản (Public Tracking Page)**.
  - Backend cung cấp API công khai `GET /api/v1/shipments/track/:trackingCode` trả về chi tiết toàn diện của đơn hàng:
    - *Nguồn gốc nông sản:* Tên trang trại, mã ô đất đã thuê, tên giống rau canh tác, ngày thu hoạch thực tế, ảnh chụp thùng hàng niêm phong.
    - *Khối lượng thực tế:* Sản lượng cân nặng chính xác (ví dụ: `15.8 kg`).
    - *Thông tin người nhận (Bảo mật):* Tên khách hàng, số điện thoại che bảo mật (`09****567`), địa chỉ nhận hàng.
    - *Lộ trình vận chuyển (Realtime Stepper):* Thời gian xuất kho tại vườn, thời gian Shipper tiếp nhận, trạng thái đang trên đường giao và thời gian giao hàng thành công.

---

## 3. Ma trận Phân định Giữa Làm thật và Giả lập (Real vs Mock Boundary)

| Phân hệ nghiệp vụ | Triển khai Thật (Real Code) | Triển khai Giả lập (Mock / Simulation) |
| :--- | :--- | :--- |
| **1. Thuê đất & Thanh toán** | Bản đồ ô đất trực quan, thuật toán khóa tạm 5 phút chống đặt trùng, tính tiền theo chu kỳ sinh trưởng của cây, lưu trữ hợp đồng có snapshot giá. | Tích hợp tài khoản cá nhân thật qua VietQR; hỗ trợ song song Webhook đối soát số dư thật và nút kích hoạt nhanh dự phòng. |
| **2. Nhật ký & Chăm sóc** | Tải ảnh thực tế trực tiếp lên đám mây Cloudinary, quy trình gửi phiếu chăm sóc, nông dân tiếp nhận và tải ảnh nghiệm thu thực địa. | Script tua nhanh thời gian (Time Accelerator) để cây lớn từ ngày 1 đến ngày 60 phục vụ thuyết trình. |
| **3. Camera & Cảm biến** | Nhúng trình phát video HLS (`Hls.js`), hiển thị lớp phủ thông tin gồm đồng hồ nhảy giây thực tế và thông số cảm biến. | Luồng stream sử dụng video HLS công khai (.m3u8) hoặc video loop chuẩn HD; số liệu độ ẩm đất và nhiệt độ do tác vụ nền tự sinh theo chu kỳ ngày đêm. |
| **4. Giao nhận Nông sản** | Form tạo lệnh thu hoạch nhập sản lượng (kg) thực tế, chuyển trạng thái luống đất, render phiếu gửi hàng A6 có Barcode Code128 và QR Code. | Cổng vận chuyển ảo nội bộ (AgriExpress Logistics) có giao diện cho phép bấm chuyển bước lộ trình shipper thay vì gọi API GHN/GHTK thật. |

---

## 4. Ma trận Phân quyền Người dùng (RBAC Matrix)

| Chức năng | Khách hàng (Customer) | Nông dân (Staff / Farmer) | Quản trị viên (Admin) |
| :--- | :---: | :---: | :---: |
| Xem danh mục & bản đồ ô đất | Có | Có | Có |
| Giữ chỗ 5 phút & Ký hợp đồng thuê | Có | Không | Không |
| Thanh toán VietQR | Có | Không | Không |
| Xem nhật ký cây trồng của mình | Có | Có | Có |
| Đăng bài nhật ký & upload ảnh Cloudinary | Không | Có (ô được phân công) | Có |
| Gửi phiếu yêu cầu chăm sóc | Có | Không | Không |
| Tiếp nhận & Nghiệm thu phiếu chăm sóc | Không | Có (ô được phân công) | Có |
| Xem camera trực tiếp ô đất đang thuê | Có | Có | Có |
| Tạo lệnh thu hoạch nông sản | Không | Có (ô được phân công) | Có |
| In phiếu vận đơn A6 | Có (xem) | Có (in) | Có |
| Thao tác Cổng vận chuyển ảo | Có (tra cứu) | Có (chuyển bước) | Có |
| Quản lý giống rau, ô đất, phân công nhân sự | Không | Không | Có |
| Xem báo cáo doanh thu & tỷ lệ lấp đầy | Không | Không | Có |

---

## 5. Khai thác Chi tiết các Trường hợp Biên (Edge Cases Analysis)

### 5.1. Phân hệ 1: Đặt thuê ô đất & Khóa tạm 5 phút (Hold Lock)
* **EC-1.1: Tranh chấp đồng thời cùng một mili-giây (Race Condition):**
  * *Tình huống:* Hai khách hàng A và B cùng bấm "Giữ chỗ" ô đất A01 tại cùng một mili-giây.
  * *Xử lý hệ thống:* Áp dụng Prisma Database Transaction với cấp độ cô lập dữ liệu. Request đầu tiên chiếm được khóa sẽ cập nhật `locked_by_user_id = A` và `locked_until = now() + 5 phút`. Request thứ hai ngay lập tức nhận mã lỗi `409 Conflict` kèm thông báo: *"Ô đất vừa được người khác giữ chỗ, vui lòng chọn ô khác"*.
* **EC-1.2: Người dùng tắt trình duyệt / mất mạng khi đang giữ chỗ:**
  * *Tình huống:* Khách hàng bấm giữ chỗ thành công nhưng tắt tab trình duyệt, sập nguồn hoặc mất kết nối mạng.
  * *Xử lý hệ thống:* Không cần dựa vào kết nối Client. Tác vụ nền (Background Cleanup Job) trên Server chạy định kỳ mỗi 1 phút sẽ tự động quét cơ sở dữ liệu. Khi phát hiện bản ghi có `locked_until <= now()`, hệ thống tự động xóa khóa (`locked_by_user_id = null`, `locked_until = null`), trả ô đất về `AVAILABLE`.
* **EC-1.3: Khách hàng F5 (Refresh) lại trang trong thời gian 5 phút:**
  * *Tình huống:* Khách hàng đang xem mã QR thanh toán thì vô tình tải lại trang.
  * *Xử lý hệ thống:* Khi tải lại trang, Frontend gọi API kiểm tra trạng thái lock hiện tại. Backend nhận diện người dùng này chính là chủ sở hữu lock (`locked_by_user_id == currentUserId`), trả về số giây còn lại (`expiresInSeconds = lockedUntil - now()`). Frontend khôi phục đúng đồng hồ đếm ngược và trạng thái đơn hàng mà không bắt khách làm lại từ đầu.
* **EC-1.4: Khách hàng chuyển tiền trễ sau khi đã hết hạn 5 phút:**
  * *Tình huống:* Khách thao tác chậm trên app ngân hàng, chuyển tiền khi thời hạn 5 phút đã trôi qua và ô đất đã bị người khác thuê mất.
  * *Xử lý hệ thống:* Webhook đối soát khi nhận tiền sẽ kiểm tra trạng thái hợp đồng:
    - Nếu ô đất vẫn còn trống (`AVAILABLE`): Hệ thống tự động gia hạn và kích hoạt hợp đồng bình thường.
    - Nếu ô đất đã bị người khác thuê: Giao dịch được gắn cờ `CONFLICT_MANUAL_REVIEW`, tạo bản ghi bồi hoàn/hoàn tiền trong bảng `compensations`, thông báo cho Admin xử lý chuyển luống đất khác hoặc hoàn tiền cho khách.
* **EC-1.5: Khách hàng chuyển sai số tiền hoặc sai cú pháp:**
  * *Tình huống:* Đơn hàng là 1.200.000 VNĐ nhưng khách chuyển 120.000 VNĐ, hoặc gõ thiếu mã đơn `CF...`.
  * *Xử lý hệ thống:* Webhook lưu vết bản ghi vào `payment_transactions`. Nếu số tiền nhận được nhỏ hơn số tiền cần thanh toán hoặc cú pháp không khớp với bất kỳ `orderCode` nào đang chờ, hệ thống không kích hoạt hợp đồng, chuyển giao dịch sang trạng thái `UNMATCHED_PAYMENT` để Admin đối soát thủ công.

---

### 5.2. Phân hệ 2: Canh tác, Nhật ký & Dịch vụ Chăm sóc
* **EC-2.1: Khách hàng gửi liên tục nhiều phiếu chăm sóc (Spam Request):**
  * *Tình huống:* Khách hàng gửi liên tiếp 5-10 yêu cầu chăm sóc trong vài phút gây quá tải cho nông dân.
  * *Xử lý hệ thống:* Giới hạn tần suất (Rate Limiting): Mỗi hợp đồng chỉ được phép có tối đa 01 phiếu chăm sóc ở trạng thái chờ xử lý (`PENDING`). Khách hàng phải chờ nông dân tiếp nhận hoặc hoàn tất phiếu trước đó thì mới được gửi phiếu tiếp theo.
* **EC-2.2: Kiểm tra hạn mức dịch vụ miễn phí và phụ phí:**
  * *Tình huống:* Khách hàng đã sử dụng hết 2 lần chăm sóc miễn phí trong tháng hiện tại.
  * *Xử lý hệ thống:* Trước khi tạo phiếu, Backend đếm số phiếu chăm sóc có `status = COMPLETED` được tạo trong cùng tháng dương lịch:
    - Nếu số lượng `< 2`: Phiếu được gắn `extraFee = 0`, `isFeePaid = true`.
    - Nếu số lượng `>= 2`: Hệ thống tính `extraFee = 50.000 VNĐ`, thông báo rõ cho khách phụ phí phát sinh trước khi xác nhận gửi.
* **EC-2.3: Nông dân tải lên ảnh không hợp lệ hoặc dung lượng quá lớn:**
  * *Tình huống:* Nông dân chụp ảnh độ phân giải quá cao (> 10MB) hoặc gửi file không phải ảnh (PDF, DOCX) khi đăng nhật ký.
  * *Xử lý hệ thống:*
    - Phía Frontend: Tự động nén ảnh (Client-side image compression) trước khi upload.
    - Phía Backend: Middleware Multer chặn tuyệt đối file `> 5MB` và kiểm tra MIME type. Nếu vi phạm, trả về mã lỗi `BAD_REQUEST` (`FILE_TOO_LARGE` hoặc `UNSUPPORTED_MEDIA_TYPE`).
* **EC-2.4: Nông dân cố gắng nghiệm thu phiếu mà không có ảnh bằng chứng:**
  * *Tình huống:* Nông dân bấm "Hoàn tất" phiếu chăm sóc nhưng quên chụp ảnh thực địa.
  * *Xử lý hệ thống:* API `PATCH /api/v1/care-requests/:id/status` bắt buộc trường `proofImages` phải chứa ít nhất 01 URL ảnh Cloudinary hợp lệ khi chuyển trạng thái sang `COMPLETED`. Nếu thiếu, Backend từ chối với lỗi `VALIDATION_FAILED` (`PROOF_IMAGE_REQUIRED`).

---

### 5.3. Phân hệ 3: Giám sát Camera Trực tiếp & Cảm biến
* **EC-3.1: Luồng video HLS bị lỗi kết nối hoặc rớt mạng:**
  * *Tình huống:* Đường truyền video stream (.m3u8) bị nghẽn mạng, lỗi CORS hoặc camera ngoài vườn mất nguồn.
  * *Xử lý hệ thống:* Thư viện `Hls.js` trên Frontend lắng nghe sự kiện `Hls.Events.ERROR`. Khi xảy ra lỗi mạng (`NETWORK_ERROR`), trình phát tự động thử kết nối lại tối đa 3 lần. Nếu vẫn thất bại, giao diện tự động chuyển đổi dự phòng (Fallback) sang video loop MP4 chuẩn HD lưu trên CDN để màn hình demo của khách hàng không bao giờ bị đen hoặc đơ.
* **EC-3.2: Khách hàng cố tình truy cập camera ô đất của người khác:**
  * *Tình huống:* Khách hàng A tự ý đổi mã ID ô đất trên thanh địa chỉ URL sang ô đất của khách hàng B.
  * *Xử lý hệ thống:* API giám sát camera bắt buộc kiểm tra phân quyền sở hữu:
    - Nếu người dùng có vai trò `CUSTOMER`: Phải tồn tại một bản ghi trong bảng `contracts` với điều kiện `userId = currentUserId`, `plotId = targetPlotId`, và `status = ACTIVE`.
    - Nếu không thỏa mãn, máy chủ lập tức chặn đứng với mã lỗi `403 Forbidden` (`PLOT_ACCESS_FORBIDDEN`).
* **EC-3.3: Dữ liệu cảm biến bị nhảy vọt bất thường:**
  * *Tình huống:* Hàm sinh ngẫu nhiên gặp lỗi số học khiến nhiệt độ vọt lên 80°C hoặc độ ẩm rơi xuống số âm.
  * *Xử lý hệ thống:* Hàm Mock Telemetry áp dụng bộ chặn ngưỡng sinh học cố định (Clamping filter): Nhiệt độ luôn bị chặn trong khoảng `[18.0, 38.0]` °C, độ ẩm đất luôn nằm trong khoảng `[40.0, 95.0]` %.

---

### 5.4. Phân hệ 4: Thu hoạch & Giao nhận Nông sản (Logistics)
* **EC-4.1: Sản lượng thu hoạch thực tế chênh lệch quá lớn so với dự kiến:**
  * *Tình huống:* Diện tích ô đất là 20m², năng suất chuẩn là 30kg, nhưng nông dân nhập nhầm 300kg hoặc nhập 0kg.
  * *Xử lý hệ thống:* Backend validate dựa trên `crop.expectedYieldKgPerSqm * plot.areaSqm`. Cho phép độ lệch hợp lý trong biên độ `±50%`. Nếu nhập vượt quá biên độ cảnh báo, hệ thống hiển thị hộp thoại xác nhận bắt buộc nông dân kiểm tra lại trước khi lưu. Không cho phép nhập sản lượng `<= 0`.
* **EC-4.2: Khách hàng chưa cập nhật số điện thoại và địa chỉ nhận hàng:**
  * *Tình huống:* Tài khoản khách hàng đăng ký bằng Email và chưa điền địa chỉ giao hàng trong hồ sơ cá nhân khi đến kỳ thu hoạch.
  * *Xử lý hệ thống:* Khi nông dân bấm "Tạo lệnh thu hoạch", nếu thông tin người nhận còn trống, hệ thống hiển thị Form yêu cầu Nông dân/Admin liên hệ khách hoặc cho phép khách tự cập nhật địa chỉ giao hàng nhận nông sản trước khi tiến hành in phiếu vận đơn A6.
* **EC-4.3: Máy in hoặc máy quét mã vạch không đọc được mã:**
  * *Tình huống:* Mã vạch trên phiếu vận đơn A6 bị mờ hoặc rách khiến máy quét không đọc được.
  * *Xử lý hệ thống:* Trên phiếu A6 thiết kế song song 2 cơ chế định danh độc lập: Mã vạch tuyến tính Barcode Code128 (để dùng máy quét tít tít truyền thống) và Mã phản hồi nhanh QR Code (chứa link tra cứu trực tiếp). Ngoài ra, in rõ chuỗi ký tự mã vận đơn dạng chữ in hoa `AGRI-VN-XXXXXX` bên dưới để có thể nhập tay bất kỳ lúc nào.
* **EC-4.4: Quét mã QR khi kiện hàng vừa tạo hoặc quét mã không tồn tại:**
  * *Tình huống:* Người dùng quét mã QR ngay khi nông dân vừa bấm tạo lệnh (chưa bàn giao cho shipper) hoặc quét mã giả mạo/nhập sai ký tự.
  * *Xử lý hệ thống:*
    - Nếu đơn ở trạng thái `PREPARING`: Trang tra cứu hiển thị đầy đủ thông tin nguồn gốc nông sản kèm thông báo: *"Kiện hàng đang được đóng gói và bảo quản mát tại nhà vườn, chuẩn bị bàn giao cho đơn vị vận chuyển"*.
    - Nếu mã vận đơn không tồn tại trong hệ thống: API trả về mã lỗi `NOT_FOUND`, giao diện hiển thị thông báo thân thiện: *"Không tìm thấy thông tin kiện hàng tương ứng trên hệ sinh thái AgriExpress. Vui lòng kiểm tra lại mã vận đơn"*.
* **EC-4.5: Bảo mật thông tin khách hàng trên trang tra cứu công khai:**
  * *Tình huống:* Phiếu A6 dán ngoài thùng hàng hoặc mã QR có thể được quét bởi bất kỳ người thứ ba nào.
  * *Xử lý hệ thống:* API tra cứu công khai áp dụng cơ chế che mờ dữ liệu nhạy cảm (Data Masking): Số điện thoại chỉ hiển thị dạng `090****899`, địa chỉ người nhận chỉ hiển thị cấp Phường/Xã, Quận/Huyện và Tỉnh/Thành phố (ẩn số nhà chi tiết) để bảo vệ quyền riêng tư của khách hàng.

---

### 5.5. Phân hệ Quản trị & Công cụ Thuyết trình (Demo Accelerator)
* **EC-5.1: Kích hoạt Time Accelerator khi hợp đồng đang có yêu cầu chăm sóc chưa nghiệm thu:**
  * *Tình huống:* Người thuyết trình bấm tua nhanh từ ngày 1 đến ngày 60 trong lúc vẫn còn 1 phiếu chăm sóc đang ở trạng thái `PENDING`.
  * *Xử lý hệ thống:* Script tua thời gian tự động đồng bộ trạng thái: Tự động chuyển toàn bộ các phiếu chăm sóc tồn đọng sang `COMPLETED`, tự sinh nhật ký các mốc sinh trưởng còn thiếu để đưa tiến độ cây trồng đạt đúng 100%, sẵn sàng cho bước tạo lệnh thu hoạch.
* **EC-5.2: Admin xóa một giống cây trồng đang có hợp đồng hoạt động:**
  * *Tình huống:* Quản trị viên bấm xóa giống cây "Cải bó xôi" nhưng đang có 5 khách hàng thuê ô đất trồng loại cải này.
  * *Xử lý hệ thống:* Tuyệt đối không xóa cứng (Hard Delete) khỏi cơ sở dữ liệu. Áp dụng cơ chế Xóa mềm (Soft Delete): Cập nhật `is_active = false`. Các hợp đồng đang hoạt động vẫn hiển thị và tính toán dữ liệu bình thường, nhưng giống rau này sẽ không còn xuất hiện trong danh mục quy hoạch các mùa vụ mới.

---

## 6. Kế hoạch Nén Tiến độ 3 Tuần (Compressed Sprint Schedule)

Tổng thời gian thực hiện: **3 Tuần**  
Đội ngũ: **4 Thành viên** (2 Frontend: Nghĩa, Huy; 2 Backend: Bảo, Sang)

### 6.1. Sprint 1 (Tuần 1) - Đã hoàn thành (Baseline)
- Chốt kiến trúc Monorepo (Turborepo, pnpm workspaces).
- Thiết lập quy chuẩn mã nguồn (ESLint, Husky, CI/CD Actions).
- Thiết kế cơ sở dữ liệu hoàn chỉnh (Prisma DB Schema & DBML).
- Xây dựng hệ thống xác thực (JWT Auth, RBAC) và khung xử lý lỗi toàn cục (`@repo/shared`, `errorHandler`).

### 6.2. Sprint 2 (Tuần 2) - Core Operations & Farming Loop
- **Mục tiêu:** Vận hành trơn tru luồng nghiệp vụ cốt lõi từ lúc chọn đất đến quy trình chăm sóc ngoài vườn.
- **Trọng tâm phân công:**
  - **Bảo (BE):** API truy vấn ô đất (US-13), Cơ chế Hold Lock 5 phút (US-14), API tạo hợp đồng tự động gán cây trồng (US-15), Tích hợp dịch vụ tải ảnh Cloudinary (US-23), API Nhật ký canh tác số (US-24).
  - **Sang (BE):** Cấu hình VietQR tài khoản thật (US-16), API Webhook nhận thanh toán tự động và dự phòng (US-17), API Phiếu yêu cầu chăm sóc (US-25), API Nghiệm thu chăm sóc kèm ảnh (US-26).
  - **Nghĩa (FE):** Bản đồ lưới ô đất Plot Grid Map (US-18), Drawer chi tiết ô đất & gói mùa vụ (US-19), Đồng hồ đếm ngược giữ chỗ 5 phút HUD (US-20), Modal thanh toán VietQR tài khoản thật & kích hoạt nhanh (US-21, US-22).
  - **Huy (FE):** Dashboard nông dân tạo nhật ký kèm upload Cloudinary (US-27), Dashboard khách hàng xem Stepper tiến trình cây lớn (US-28), Giao diện gửi phiếu chăm sóc (US-29), To-do list nông dân nghiệm thu thực địa (US-30).

### 6.3. Sprint 3 (Tuần 3) - Surveillance, Fulfillment & Demo Readiness
- **Mục tiêu:** Hoàn thiện giám sát trực tiếp, đóng gói vận chuyển và sẵn sàng 100% kịch bản demo thuyết trình.
- **Trọng tâm phân công:**
  - **Bảo (BE):** Dịch vụ cảm biến giả lập Mock Telemetry (US-31), API lấy luồng camera giám sát và cảm biến (US-32), Bộ API Quản trị Admin ô đất, giống cây và thống kê (US-42).
  - **Sang (BE):** API Tạo lệnh thu hoạch (US-35), Dịch vụ Mock Logistics sinh mã vận đơn (US-36), API chuyển bước vận chuyển (US-37), Script Time Accelerator tua nhanh thời gian (US-44).
  - **Nghĩa (FE):** Tích hợp video player `Hls.js` (US-33), Thiết kế lớp phủ HUD Overlay camera (US-34), Cổng vận chuyển ảo AgriExpress Logistics (US-40), Stepper theo dõi kiện hàng của khách (US-41), Thanh công cụ Demo Control Panel (US-45).
  - **Huy (FE):** Giao diện nông dân tạo lệnh thu hoạch (US-38), Component render Phiếu vận đơn A6 Barcode/QR (US-39), Giao diện Admin quản lý ô đất & biểu đồ thống kê (US-43).
  - **Toàn đội:** Kiểm thử tích hợp liên thông toàn diện và chuẩn bị dữ liệu mẫu báo cáo (US-46).

---

## 7. Cam kết Đồng bộ và Bám sát Đề bài
Toàn bộ các User Stories (US) được thiết kế và triển khai trong các tài liệu chi tiết bắt buộc phải đối chiếu và tuân thủ các quy tắc trong tài liệu căn chỉnh này. Mọi thay đổi về mặt logic nghiệp vụ phải được cập nhật trực tiếp vào văn bản này trước khi sửa đổi mã nguồn.
