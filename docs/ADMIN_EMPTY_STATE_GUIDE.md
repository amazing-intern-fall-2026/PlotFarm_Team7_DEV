# Hướng dẫn & Tài liệu Bàn giao: Làm sạch Dữ liệu Mẫu Phân hệ Quản trị (Admin Empty State)

> **Mục tiêu:** Đồng bộ hóa quy chuẩn khởi tạo trạng thái ban đầu của toàn bộ phân hệ Quản trị viên (Admin) tương tự như phân hệ Nhân viên (Staff/Farmer). Loại bỏ hoàn toàn dữ liệu giả lập (hardcoded mock data), thiết lập bộ chỉ số KPI động và khởi tạo giao diện ở trạng thái sạch (0 bản ghi).

---

## 1. Nguyên tắc triển khai (Core Principles)

1. **Khởi tạo trạng thái sạch (Clean Initial State):**
   - Không nạp sẵn bất kỳ bản ghi giả định nào khi hệ thống lần đầu khởi chạy.
   - Các bảng danh sách, biểu đồ và lưới hiển thị thành phần `Empty State` tiêu chuẩn có icon, tiêu đề và chỉ dẫn thao tác rõ ràng.
2. **Không sử dụng nút ảo (No Dummy Sample Action):**
   - Tuyệt đối không tạo nút "Nạp dữ liệu mẫu" độc lập nhằm tránh làm bẩn dữ liệu sản xuất.
   - Dữ liệu phát sinh sẽ đến từ các luồng người dùng thực tế: bấm nút thêm mới, tạo lô hàng loạt, kích hoạt simulator hoặc qua form modal.
3. **Cơ chế dọn dẹp LocalStorage cũ (Stale Cache Eviction):**
   - Chuyển đổi toàn bộ khóa lưu trữ sang định dạng `_v2`.
   - Khi component mount, hệ thống tự động xóa sạch các khóa lưu trữ cũ (`admin_managed_plots_data`, `admin_plots_data`, v.v.) và lọc sạch các ID mẫu cũ nếu còn tồn dư trong trình duyệt của người dùng.
4. **Chỉ số KPI & Thống kê động (Dynamic Metrics):**
   - Các thẻ thống kê (Tổng diện tích, tỷ lệ lấp đầy, số lượng hợp đồng, doanh thu, số nông dân, v.v.) đều được tính toán tự động từ mảng dữ liệu thực tế thay vì gán giá trị tĩnh.

---

## 2. Danh sách các trang Admin đã hoàn thiện

### 1. Danh mục Ô đất Canh tác (`/admin/plots`)
- **Tập tin:** [`apps/client/src/pages/admin/AdminPlotsPage.tsx`](file:///d:/Project/plot-farm/apps/client/src/pages/admin/AdminPlotsPage.tsx)
- **Khóa lưu trữ:** `admin_managed_plots_data_v2`
- **Xử lý:**
  - Xóa 50 ô đất mẫu hardcode.
  - Tổng diện tích ban đầu: `0 m²`.
  - Tỷ lệ lấp đầy: `0.0%`.
  - Số lượng ô sắp thu hoạch: `0 ô`, số ô bảo dưỡng: `0 ô`.
  - Các tab phân khu hiển thị: `Tất cả (0)`, `Khu A Đà Lạt (0)`, `Khu B (0)`.
  - Empty state bảng: Biểu tượng `Layers` kèm thông báo *"Chưa có ô đất canh tác nào"*.
  - Thao tác thêm: Nút **"+ Tạo lô hàng loạt (15m² – 20m²)"** và **"+ Thêm ô đất mới"** cho phép tạo ô đất thật và tự động lưu vào LocalStorage.

---

### 2. Bảng điều khiển Tổng quan & Phân tích Vận hành (`/admin`)
- **Tập tin:** [`apps/client/src/pages/admin/AdminDashboardPage.tsx`](file:///d:/Project/plot-farm/apps/client/src/pages/admin/AdminDashboardPage.tsx)
- **Khóa lưu trữ:** `admin_dashboard_events_v2`
- **Xử lý:**
  - Tự động đọc dữ liệu liên kết từ các kho lưu trữ hợp đồng và ô đất:
    - Tổng doanh thu mùa vụ: `0 đ` (kèm trạng thái *"Chưa có phát sinh"*).
    - Tỷ lệ lấp đầy: `0% (0/0 ô đang canh tác)`.
    - Hợp đồng đang thực hiện: `0 đơn`.
    - Cảnh báo vi khí hậu: `0 ô đất (Hệ thống an toàn)`.
  - Biểu đồ Bar Chart doanh thu & chi phí: Hiển thị Empty State khi chưa có dữ liệu tài chính.
  - Biểu đồ Donut cơ cấu cây trồng: Hiển thị Empty State khi chưa có ô đất đang canh tác.
  - Luồng nhật ký Live Event Stream: Khởi tạo trống, hiển thị thông báo chờ sự kiện thời gian thực.

---

### 3. Quản lý Người dùng & Phân quyền Hệ thống RBAC (`/admin/rbac`)
- **Tập tin:** [`apps/client/src/pages/admin/AdminRbacPage.tsx`](file:///d:/Project/plot-farm/apps/client/src/pages/admin/AdminRbacPage.tsx)
- **Khóa lưu trữ:** `admin_managed_rbac_data_v2`
- **Xử lý:**
  - Xóa danh sách 8 người dùng mẫu hardcode.
  - Các thẻ KPI vai trò tính động: Tổng `0`, Khách hàng `0`, Nông dân `0`, Quản trị viên `00`.
  - Bảng danh sách hiển thị Empty State với biểu tượng `Users`.
  - Thẻ tóm tắt Nhật ký Bảo mật (Audit Log) hiển thị thông báo sạch khi chưa phát sinh sự kiện.
  - Modal **"Tạo tài khoản nhân sự mới"** hỗ trợ tạo tài khoản và ghi đè lưu trữ tức thì.

---

### 4. Thu hoạch & Cổng Vận chuyển AgriExpress (`/admin/harvest`)
- **Tập tin:** [`apps/client/src/pages/admin/AdminHarvestPage.tsx`](file:///d:/Project/plot-farm/apps/client/src/pages/admin/AdminHarvestPage.tsx)
- **Khóa lưu trữ:** `admin_managed_harvest_data_v2`
- **Xử lý:**
  - Xóa 8 đơn vận chuyển mẫu.
  - Tổng sản lượng đã thu hoạch: `0.0 kg` (thay vì 1.240 kg cứng).
  - Đơn đang giao: `0` đơn, Ô đất chờ nghiệm thu: `00` ô.
  - Bảng vận đơn hiển thị dòng Empty State với icon `Truck` *"Chưa có vận đơn thu hoạch nào"*.
  - Nút **"Xem Phiếu A6 Mẫu"** được trang bị guard cảnh báo nếu chưa có vận đơn nào trong kho.

---

### 5. Quản lý Hợp đồng Thuê (`/admin/contracts`)
- **Tập tin:** [`apps/client/src/pages/admin/AdminContractsPage.tsx`](file:///d:/Project/plot-farm/apps/client/src/pages/admin/AdminContractsPage.tsx)
- **Khóa lưu trữ:** `admin_managed_contracts_data_v2`
- **Xử lý:**
  - Xóa toàn bộ hợp đồng mẫu (c-1 đến c-5).
  - Tổng doanh thu thực tế: `0 đ`, Đang chờ xử lý: `0 đ`, Tỷ lệ đối soát: `100%`.
  - Bảng hiển thị thông báo *"Chưa có hợp đồng nào phát sinh"*.

---

### 6. Danh mục Giống rau & Định mức (`/admin/crops`)
- **Tập tin:** [`apps/client/src/pages/admin/AdminCropsPage.tsx`](file:///d:/Project/plot-farm/apps/client/src/pages/admin/AdminCropsPage.tsx)
- **Khóa lưu trữ:** `admin_managed_crops_data_v2`
- **Xử lý:**
  - Xóa 3 loại cây trồng mẫu.
  - Các tab danh mục đếm động: Tất cả (0), Rau ăn lá (0), Củ quả (0), Gia vị (0).
  - Lưới hiển thị thẻ *"Chưa có giống rau nào trong danh mục"*.
  - Modal thêm giống cây mới cho phép nhập đầy đủ thông số và lưu trữ động.

---

### 7. Thẩm định Phiếu Chăm sóc (`/admin/care-slips`)
- **Tập tin:** [`apps/client/src/pages/admin/AdminCareSlipsPage.tsx`](file:///d:/Project/plot-farm/apps/client/src/pages/admin/AdminCareSlipsPage.tsx)
- **Khóa lưu trữ:** `admin_managed_care_slips_data_v2`
- **Xử lý:**
  - Xóa 4 phiếu chăm sóc mẫu.
  - Bộ đếm trạng thái: 0 hoàn thành, 0 đang thực hiện, 0 chờ thẩm định.
  - Khung chi tiết bên phải hiển thị *"Chưa chọn phiếu chăm sóc"* khi danh sách rỗng.

---

### 8. Điều phối Nông dân (`/admin/farmers`)
- **Tập tin:** [`apps/client/src/pages/admin/AdminFarmersPage.tsx`](file:///d:/Project/plot-farm/apps/client/src/pages/admin/AdminFarmersPage.tsx)
- **Khóa lưu trữ:** `admin_managed_farmers_data_v2`
- **Xử lý:**
  - Xóa danh sách 4 nhân sự mẫu.
  - Thống kê nhân sự: 0 nhân sự, 0 ô đất phụ trách, 0 nhân sự quá ngưỡng.
  - Hiển thị thông báo *"Chưa có dữ liệu điều phối nông dân"*.

---

## 3. Kết quả Kiểm tra & Biên dịch (Quality Assurance)

- **Biên dịch TypeScript:**
  ```bash
  pnpm --filter client build
  ```
  => `✓ built in 4.66s` — **Thành công 100%, 0 lỗi type (Zero TS errors)**.

- **Kiểm thử tự động (Unit Tests):**
  ```bash
  pnpm --filter client test
  ```
  => **47 / 47 unit tests passed**.
