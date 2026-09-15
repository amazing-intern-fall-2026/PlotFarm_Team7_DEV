# 🚀 ĐẶC TẢ TOÀN BỘ RESTful API PLOTFARM (MASTER SPECIFICATION v2.0)

> **Tiêu chuẩn thiết kế:** RESTful Architecture, Chuẩn Envelope Quốc Tế (`code` + `message` + `meta` + `data` + `pagination` / `error`), Cơ chế giám sát & cảnh báo Spam API (`meta.rateLimit.isSpamWarning`), Chuẩn an ninh OWASP API (100% sử dụng Business Code & Slug thay cho Database UUID/ID), Phân quyền 3 Role (`CUSTOMER`, `STAFF`, `ADMIN`), Hỗ trợ đa ngôn ngữ (`Accept-Language`).  
> **Phiên bản:** `v1` (`/api/v1`)  
> **Base URL:** `https://api.plotfarm.vn/api/v1` (Production) | `http://localhost:5000/api/v1` (Development)  
> **Tài liệu Database liên kết:** [`docs/DATABASE_SCHEMA.dbml`](./DATABASE_SCHEMA.dbml) | [`docs/DATABASE_ARCHITECTURE.md`](./DATABASE_ARCHITECTURE.md)

---

## MỤC LỤC TỔNG HỢP CÁC ENDPOINT

1. [QUY TẮC PHẢN HỒI CHUẨN QUỐC TẾ & CHỐNG SPAM](#1-quy-tắc-phản-hồi-chuẩn-quốc-tế--chống-spam)
2. [DANH MỤC PUBLIC BUSINESS CODES THAY THẾ RAW ID](#2-danh-mục-public-business-codes-thay-thế-raw-id)
3. [MA TRẬN PHÂN QUYỀN 3 ROLE (RBAC MATRIX)](#3-ma-trận-phân-quyền-3-role-rbac-matrix)
4. [NHÓM 1: AUTHENTICATION & IDENTITY (XÁC THỰC & ĐĂNG NHẬP)](#nhóm-1-authentication--identity-xác-thực--đăng-nhập)
5. [NHÓM 2: USERS & BANK ACCOUNTS (HỒ SƠ & TÀI KHOẢN HOÀN TIỀN)](#nhóm-2-users--bank-accounts-hồ-sơ--tài-khoản-hoàn-tiền)
6. [NHÓM 3: FARMS & MASTER DATA (TRANG TRẠI THỰC NGHIỆM)](#nhóm-3-farms--master-data-trang-trại-thực-nghiệm)
7. [NHÓM 4: CROPS & i18n (GIỐNG CÂY TRỒNG & ĐA NGÔN NGỮ)](#nhóm-4-crops--i18n-giống-cây-trồng--đa-ngôn-ngữ)
8. [NHÓM 5: PLOTS & RESERVATION (LÔ ĐẤT & KHÓA GIỮ CHỖ 10 PHÚT)](#nhóm-5-plots--reservation-lô-đất--khóa-giữ-chỗ-10-phút)
9. [NHÓM 6: VOUCHERS (MÃ GIẢM GIÁ KHUYẾN MÃI)](#nhóm-6-vouchers-mã-giảm-giá-khuyến-mãi)
10. [NHÓM 7: CONTRACTS (HỢP ĐỒNG CANH TÁC)](#nhóm-7-contracts-hợp-đồng-canh-tác)
11. [NHÓM 8: PAYMENTS, VIETQR & WEBHOOKS (SỔ CÁI ĐỐI SOÁT NGUỒN TIỀN)](#nhóm-8-payments-vietqr--webhooks-sổ-cái-đối-soát-nguồn-tiền)
12. [NHÓM 9: COMPENSATIONS & REFUNDS (ĐỀN BÙ TỔN THẤT & HOÀN TIỀN)](#nhóm-9-compensations--refunds-đền-bù-tổn-thất--hoàn-tiền)
13. [NHÓM 10: FARMING LOGS & REVIEWS (NHẬT KÝ BẤT BIẾN & ĐỐI SOÁT IOT)](#nhóm-10-farming-logs--reviews-nhật-ký-bất-biến--đối-soát-iot)
14. [NHÓM 11: CARE REQUESTS (DỊCH VỤ CHĂM SÓC PHÁT SINH)](#nhóm-11-care-requests-dịch-vụ-chăm-sóc-phát-sinh)
15. [NHÓM 12: HARVESTS & SHIPMENTS (THU HOẠCH & VẬN CHUYỂN NÔNG SẢN)](#nhóm-12-harvests--shipments-thu-hoạch--vận-chuyển-nông-sản)
16. [NHÓM 13: IOT & REALTIME TELEMETRY (CẢM BIẾN MÔI TRƯỜNG VƯỜN)](#nhóm-13-iot--realtime-telemetry-cảm-biến-môi-trường-vườn)
17. [NHÓM 14: NOTIFICATIONS (TRUNG TÂM THÔNG BÁO)](#nhóm-14-notifications-trung-tâm-thông-báo)
18. [NHÓM 15: STAFF WORKSPACE (BÀN LÀM VIỆC KỸ SƯ NÔNG HỌC)](#nhóm-15-staff-workspace-bàn-làm-việc-kỹ-sư-nông-học)
19. [NHÓM 16: ADMIN MONITORING & AUDIT LOGS (QUẢN TRỊ TỐI CAO & KIỂM TOÁN)](#nhóm-16-admin-monitoring--audit-logs-quản-trị-tối-cao--kiểm-toán)
20. [BẢNG MÃ LỖI CHUẨN RFC 7807 & HTTP CODES](#bảng-mã-lỗi-chuẩn-rfc-7807--http-codes)

---

## 1. QUY TẮC PHẢN HỒI CHUẨN QUỐC TẾ & CHỐNG SPAM

Tất cả các API PlotFarm đều trả về theo định dạng Envelope chuẩn quốc tế thống nhất:
* **Đối với Endpoint trả về Danh sách có Phân trang:** Bắt buộc 5 trường độc lập ở root: **`code`** + **`message`** + **`meta`** + **`data`** + **`pagination`** (Tuyệt đối không nhét `pagination` vào bên trong `meta`).
* **Đối với Endpoint trả về Đối tượng đơn:** Bắt buộc 4 trường độc lập ở root: **`code`** + **`message`** + **`meta`** + **`data`**.
* **Đối với Trường hợp Lỗi:** Bắt buộc 4 trường độc lập ở root: **`code`** + **`message`** + **`meta`** + **`error`** (`data` và `pagination` không xuất hiện).

### Cấu trúc Khối Giám sát Spam (`meta.rateLimit`)
Mọi response đều trả về `meta.rateLimit` để Frontend giám sát lưu lượng và hiển thị cảnh báo:
* `limit`: Định mức tối đa số request/phút.
* `remaining`: Số lượt gọi còn lại trong chu kỳ hiện tại.
* `resetInSeconds`: Thời gian (giây) đếm ngược trước khi reset quota.
* **`isSpamWarning` (Cờ phát hiện spam):**
  - Trả về `false` khi người dùng thao tác ở tốc độ bình thường.
  - Tự động bật `true` khi tần suất gọi tăng đột biến (ví dụ: quota còn dưới 10% hoặc spam > 10 req/giây). Frontend dựa vào cờ này để throttle UI và hiển thị cảnh báo "Bạn đang thao tác quá nhanh" trước khi bị hệ thống block cứng `429 Too Many Requests`.

---

## 2. DANH MỤC PUBLIC BUSINESS CODES THAY THẾ RAW ID

Nhằm đảm bảo an toàn an ninh tuyệt đối theo chuẩn **OWASP API Security Top 10 (Chống lỗi BOLA/IDOR)**:
* **Không bao giờ hiển thị Database UUID/ID ra bên ngoài.**
* Mọi tham số đường dẫn (Path Variables), trường trong Request Body và Response Data **100% sử dụng Business Code & Slug**:

| Đối tượng | Business Code / Slug công khai | Ví dụ minh họa |
| :--- | :--- | :--- |
| **Người dùng** | `userCode` | `USR-CUST-2026-0001`, `STAFF-01`, `ADMIN-01` |
| **Tài khoản ngân hàng hoàn tiền** | `bankAccountRef` | `BNK-REF-001` |
| **Trang trại** | `farmCode` / `farmSlug` | `FRM-DALAT-01` / `da-lat-green` |
| **Giống cây trồng** | `cropCode` / `cropSlug` | `CRP-TOMATO-01` / `ca-chua-cherry` |
| **Lô đất** | `plotCode` / `plotNumber` | `PLT-A01` / `Plot A-01` |
| **Mã giảm giá** | `voucherCode` | `CHAOBANMOI50K` |
| **Hợp đồng canh tác** | `contractCode` | `PF-2026-0915-A01` |
| **Đơn thanh toán** | `orderCode` | `PAY-PF2026-0915-A01` |
| **Giao dịch ngân hàng đối soát** | `gatewayReference` | `MB_FT2625391823901` |
| **Phiếu đền bù tổn thất** | `compensationCode` | `CMP-2026-0015` |
| **Nhật ký chăm sóc nông vụ** | `logCode` / `replacesLogCode` | `LOG-2026-0035` / `LOG-2026-0034` |
| **Yêu cầu chăm sóc bổ sung** | `requestCode` | `REQ-2026-0089` |
| **Biên bản nghiệm thu thu hoạch** | `harvestCode` | `HVT-2026-0042` |
| **Mã vận đơn giao hàng** | `trackingCode` | `GHN-PF2026-881923` |
| **Thông báo người dùng** | `notificationCode` | `NOTIF-2026-0091` |
| **Nhật ký kiểm toán hệ thống** | `auditCode` | `AUD-2026-0182` |

---

## 3. MA TRẬN PHÂN QUYỀN 3 ROLE (RBAC MATRIX)

| Phân vùng chức năng | Public (Khách) | CUSTOMER (Khách thuê) | STAFF (Kỹ sư nông học) | ADMIN (Quản trị tối cao) |
| :--- | :---: | :---: | :---: | :---: |
| **Xem danh mục Cây, Lô đất, Farm** | ✅ Toàn quyền | ✅ Toàn quyền | ✅ Toàn quyền | ✅ Toàn quyền |
| **Quản lý STK nhận tiền hoàn** | ❌ | ✅ Của bản thân | ❌ | ✅ Quản trị |
| **Khóa giữ chỗ lô đất 10 phút** | ❌ | ✅ | ❌ | ✅ |
| **Tạo hợp đồng & Thanh toán VietQR** | ❌ | ✅ Hợp đồng của mình | ❌ | ✅ Quản lý sổ cái |
| **Ghi nhật ký chăm sóc kèm IoT** | ❌ | ❌ Chỉ xem & phản hồi | ✅ Lô đất được gán | ✅ Giám sát |
| **Đính chính nhật ký (Append-Only)** | ❌ | ❌ | ✅ Bản ghi của mình | ✅ Toàn quyền |
| **Báo cờ nghi vấn gian lận nhật ký** | ❌ | ✅ Hợp đồng của mình | ❌ | ✅ Nhận cờ xử lý |
| **Gửi yêu cầu đền bù sự cố** | ❌ | ✅ Hợp đồng của mình | ✅ Lập biên bản sự cố | ❌ |
| **Thẩm duyệt chi trả đền bù** | ❌ | ❌ Không có quyền | ❌ Không có quyền | ✅ Độc quyền Admin |
| **Cập nhật Master Data & Phân công Lô đất** | ❌ | ❌ | ❌ | ✅ Độc quyền Admin |
| **Theo dõi IoT Sensor & Telemetry** | ❌ | ✅ Lô đang thuê | ✅ Lô phụ trách | ✅ Toàn bộ trạm |
| **Quản trị Master Data & Audit Logs** | ❌ | ❌ | ❌ | ✅ Độc quyền Admin |

---

## NHÓM 1: AUTHENTICATION & IDENTITY (XÁC THỰC & ĐĂNG NHẬP)

### 1.1. Đăng ký tài khoản mới (`POST /api/v1/auth/register`)
* **Quyền:** `Public`
* **Request Body:**
```json
{
  "email": "customer@example.com",
  "phone": "0987654321",
  "password": "Password123@",
  "fullName": "Nguyễn Văn An",
  "preferredLocale": "vi"
}
```
* **Response 201 Created:**
```json
{
  "code": 201,
  "message": "Đăng ký tài khoản thành công. Vui lòng kiểm tra email để xác thực.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde1",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:00:00.000Z",
    "rateLimit": { "limit": 10, "remaining": 9, "resetInSeconds": 60, "isSpamWarning": false }
  },
  "data": {
    "userCode": "USR-CUST-2026-0001",
    "email": "customer@example.com",
    "fullName": "Nguyễn Văn An",
    "role": "CUSTOMER",
    "isVerified": false
  }
}
```

---

### 1.2. Đăng nhập hệ thống (`POST /api/v1/auth/login`)
* **Quyền:** `Public`
* **Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "Password123@"
}
```
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Đăng nhập thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde2",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6e",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:01:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 99, "resetInSeconds": 60, "isSpamWarning": false }
  },
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "dGhpcy1pcy1hLXJlZnJlc2gtdG9rZW4...",
    "user": {
      "userCode": "USR-CUST-2026-0001",
      "email": "customer@example.com",
      "fullName": "Nguyễn Văn An",
      "role": "CUSTOMER",
      "preferredLocale": "vi",
      "avatarUrl": "https://img.plotfarm.vn/avatars/an.jpg"
    }
  }
}
```

---

### 1.3. Làm mới Access Token (`POST /api/v1/auth/refresh-token`)
* **Quyền:** `Public`
* **Request Body:**
```json
{
  "refreshToken": "dGhpcy1pcy1hLXJlZnJlc2gtdG9rZW4..."
}
```
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Cấp mới Access Token thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde3",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6f",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:02:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 98, "resetInSeconds": 58, "isSpamWarning": false }
  },
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.new..."
  }
}
```

---

### 1.4. Đăng xuất hệ thống (`POST /api/v1/auth/logout`)
* **Quyền:** `CUSTOMER`, `STAFF`, `ADMIN`
* **Request Body:**
```json
{
  "refreshToken": "dGhpcy1pcy1hLXJlZnJlc2gtdG9rZW4..."
}
```
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Đăng xuất thành công. Phiên làm việc đã bị thu hồi.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde4",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c70",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:03:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 97, "resetInSeconds": 57, "isSpamWarning": false }
  },
  "data": {
    "loggedOut": true
  }
}
```

---

### 1.5. Yêu cầu đặt lại mật khẩu quên (`POST /api/v1/auth/forgot-password`)
* **Quyền:** `Public`
* **Request Body:**
```json
{
  "email": "customer@example.com"
}
```
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Nếu email tồn tại trên hệ thống, mã xác nhận OTP đã được gửi đến hòm thư của bạn.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde5",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c71",
    "userCode": "ANONYMOUS",
    "timestamp": "2026-09-10T04:04:00.000Z",
    "rateLimit": { "limit": 5, "remaining": 4, "resetInSeconds": 60, "isSpamWarning": false }
  },
  "data": {
    "emailSent": true,
    "expiresInMinutes": 15
  }
}
```

---

### 1.6. Xác nhận đặt lại mật khẩu mới (`POST /api/v1/auth/reset-password`)
* **Quyền:** `Public`
* **Request Body:**
```json
{
  "email": "customer@example.com",
  "otpCode": "849120",
  "newPassword": "NewPassword2026@"
}
```
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde6",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c72",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:05:00.000Z",
    "rateLimit": { "limit": 10, "remaining": 9, "resetInSeconds": 60, "isSpamWarning": false }
  },
  "data": {
    "passwordResetSuccess": true
  }
}
```

---

### 1.7. Đổi mật khẩu tài khoản (`PATCH /api/v1/auth/change-password`)
* **Quyền:** `CUSTOMER`, `STAFF`, `ADMIN`
* **Request Body:**
```json
{
  "currentPassword": "Password123@",
  "newPassword": "UpdatedPassword2026@"
}
```
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Đổi mật khẩu tài khoản thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde7",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c73",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:06:00.000Z",
    "rateLimit": { "limit": 10, "remaining": 9, "resetInSeconds": 60, "isSpamWarning": false }
  },
  "data": {
    "passwordChanged": true
  }
}
```

---

## NHÓM 2: USERS & BANK ACCOUNTS (HỒ SƠ & TÀI KHOẢN HOÀN TIỀN)

### 2.1. Lấy thông tin cá nhân (`GET /api/v1/users/me`)
* **Quyền:** `CUSTOMER`, `STAFF`, `ADMIN`
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Lấy thông tin cá nhân thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde8",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c74",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:07:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 96, "resetInSeconds": 55, "isSpamWarning": false }
  },
  "data": {
    "userCode": "USR-CUST-2026-0001",
    "email": "customer@example.com",
    "fullName": "Nguyễn Văn An",
    "phone": "0987654321",
    "role": "CUSTOMER",
    "preferredLocale": "vi",
    "avatarUrl": "https://img.plotfarm.vn/avatars/an.jpg",
    "isVerified": true
  }
}
```

---

### 2.2. Cập nhật hồ sơ cá nhân (`PATCH /api/v1/users/me`)
* **Quyền:** `CUSTOMER`, `STAFF`, `ADMIN`
* **Request Body:**
```json
{
  "fullName": "Nguyễn Văn An - VIP",
  "phone": "0987654322",
  "preferredLocale": "vi",
  "avatarUrl": "https://img.plotfarm.vn/avatars/an-new.jpg"
}
```
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Cập nhật hồ sơ cá nhân thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde9",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c75",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:08:00.000Z",
    "rateLimit": { "limit": 60, "remaining": 59, "resetInSeconds": 60, "isSpamWarning": false }
  },
  "data": {
    "userCode": "USR-CUST-2026-0001",
    "fullName": "Nguyễn Văn An - VIP",
    "phone": "0987654322",
    "preferredLocale": "vi",
    "avatarUrl": "https://img.plotfarm.vn/avatars/an-new.jpg"
  }
}
```

---

### 2.3. Danh sách STK nhận tiền hoàn/đền bù (`GET /api/v1/users/me/bank-accounts`)
* **Quyền:** `CUSTOMER`
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Lấy danh sách tài khoản ngân hàng thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddf0",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c76",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:09:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 95, "resetInSeconds": 54, "isSpamWarning": false }
  },
  "data": [
    {
      "bankAccountRef": "BNK-REF-001",
      "bankCode": "970422",
      "bankName": "MBBank",
      "accountNumber": "0987654321",
      "accountHolderName": "NGUYEN VAN AN",
      "isDefault": true,
      "isVerified": true
    }
  ]
}
```

---

### 2.4. Thêm STK nhận tiền hoàn mới (`POST /api/v1/users/me/bank-accounts`)
* **Quyền:** `CUSTOMER`
* **Request Body:**
```json
{
  "bankCode": "970407",
  "bankName": "Techcombank",
  "accountNumber": "19038291823901",
  "accountHolderName": "NGUYEN VAN AN",
  "isDefault": true
}
```
* **Response 201 Created:**
```json
{
  "code": 201,
  "message": "Thêm tài khoản ngân hàng thụ hưởng thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddf1",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c77",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:10:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 94, "resetInSeconds": 52, "isSpamWarning": false }
  },
  "data": {
    "bankAccountRef": "BNK-REF-002",
    "bankCode": "970407",
    "bankName": "Techcombank",
    "accountNumber": "19038291823901",
    "accountHolderName": "NGUYEN VAN AN",
    "isDefault": true
  }
}
```

---

### 2.5. Xóa STK nhận tiền hoàn (`DELETE /api/v1/users/me/bank-accounts/:bankAccountRef`)
* **Quyền:** `CUSTOMER`
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Đã gỡ bỏ tài khoản ngân hàng thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddf2",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c78",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:11:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 93, "resetInSeconds": 50, "isSpamWarning": false }
  },
  "data": {
    "bankAccountRef": "BNK-REF-002",
    "deleted": true
  }
}
```

---

### 2.6. Admin quản trị danh sách người dùng (`GET /api/v1/admin/users`)
* **Quyền:** `ADMIN`
* **Query Params:** `role=CUSTOMER&page=1&pageSize=10`
* **Response 200 OK (Phân trang `code` + `message` + `meta` + `data` + `pagination`):**
```json
{
  "code": 200,
  "message": "Truy vấn danh sách người dùng thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddf3",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c79",
    "userCode": "ADMIN-01",
    "timestamp": "2026-09-10T04:12:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 92, "resetInSeconds": 48, "isSpamWarning": false }
  },
  "data": [
    {
      "userCode": "USR-CUST-2026-0001",
      "email": "customer@example.com",
      "fullName": "Nguyễn Văn An",
      "phone": "0987654321",
      "role": "CUSTOMER",
      "isVerified": true,
      "createdAt": "2026-09-10T04:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalItems": 150,
    "totalPages": 15,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

## NHÓM 3: FARMS & MASTER DATA (TRANG TRẠI THỰC NGHIỆM)

### 3.1. Danh sách trang trại (`GET /api/v1/farms`)
* **Quyền:** `Public`
* **Query Params:** `page=1&pageSize=10`
* **Response 200 OK (Phân trang `code` + `message` + `meta` + `data` + `pagination`):**
```json
{
  "code": 200,
  "message": "Lấy danh sách trang trại thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddf4",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c80",
    "userCode": "ANONYMOUS",
    "timestamp": "2026-09-10T04:13:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 91, "resetInSeconds": 46, "isSpamWarning": false }
  },
  "data": [
    {
      "farmCode": "FRM-DALAT-01",
      "farmSlug": "da-lat-green",
      "name": "Nông trại Xanh Đà Lạt",
      "province": "Lâm Đồng",
      "address": "Thung Lũng Tình Yêu, TP. Đà Lạt",
      "totalPlots": 50,
      "availablePlots": 12,
      "imageUrl": "https://img.plotfarm.vn/farms/dalat.jpg"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

---

### 3.2. Chi tiết trang trại (`GET /api/v1/farms/:farmSlug`)
* **Quyền:** `Public`
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Lấy chi tiết trang trại thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddf5",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c81",
    "userCode": "ANONYMOUS",
    "timestamp": "2026-09-10T04:14:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 90, "resetInSeconds": 45, "isSpamWarning": false }
  },
  "data": {
    "farmCode": "FRM-DALAT-01",
    "farmSlug": "da-lat-green",
    "name": "Nông trại Xanh Đà Lạt",
    "description": "Khu công nghệ cao quy chuẩn GlobalGAP tại độ cao 1.500m.",
    "province": "Lâm Đồng",
    "address": "Thung Lũng Tình Yêu, TP. Đà Lạt",
    "latitude": 11.9754,
    "longitude": 108.4512,
    "totalPlots": 50,
    "availablePlots": 12,
    "cameras": [
      { "cameraCode": "CAM-DALAT-01", "name": "Cam Toàn Cảnh Khu A", "hlsUrl": "https://live.plotfarm.vn/cam-a.m3u8" }
    ]
  }
}
```

---

### 3.3. Admin tạo trang trại mới (`POST /api/v1/admin/farms`)
* **Quyền:** `ADMIN`
* **Request Body:**
```json
{
  "farmCode": "FRM-MOCCHAU-01",
  "farmSlug": "moc-chau-eco",
  "name": "Nông trại Sinh thái Mộc Châu",
  "description": "Khu nông nghiệp hữu cơ cao nguyên Mộc Châu.",
  "province": "Sơn La",
  "address": "Thị trấn Nông trường Mộc Châu",
  "totalPlots": 30,
  "latitude": 20.8432,
  "longitude": 104.6541
}
```
* **Response 201 Created:**
```json
{
  "code": 201,
  "message": "Tạo mới trang trại thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddf6",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c82",
    "userCode": "ADMIN-01",
    "timestamp": "2026-09-10T04:15:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 89, "resetInSeconds": 44, "isSpamWarning": false }
  },
  "data": {
    "farmCode": "FRM-MOCCHAU-01",
    "farmSlug": "moc-chau-eco",
    "name": "Nông trại Sinh thái Mộc Châu"
  }
}
```

---

## NHÓM 4: CROPS & i18n (GIỐNG CÂY TRỒNG & ĐA NGÔN NGỮ)

### 4.1. Danh sách cây giống (`GET /api/v1/crops`)
* **Quyền:** `Public`
* **Headers:** `Accept-Language: vi` (hoặc `en`)
* **Query Params:** `category=VEGETABLE&page=1&pageSize=10`
* **Response 200 OK (Phân trang `code` + `message` + `meta` + `data` + `pagination`):**
```json
{
  "code": 200,
  "message": "Lấy danh sách giống cây trồng thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddf7",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c83",
    "userCode": "ANONYMOUS",
    "timestamp": "2026-09-10T04:16:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 88, "resetInSeconds": 42, "isSpamWarning": false }
  },
  "data": [
    {
      "cropCode": "CRP-TOMATO-01",
      "cropSlug": "ca-chua-cherry",
      "name": "Cà chua Cherry Đà Lạt",
      "description": "Vị ngọt thanh, giòn rụm, giàu Vitamin C và lycopene.",
      "growthDurationDays": 75,
      "expectedYieldKg": 20.0,
      "basePricePerPlot": 1500000.00,
      "carePackageFeePerMonth": 400000.00,
      "riskMitigationCommitment": "Cam kết bù sản lượng nếu dưới 15kg",
      "thumbnailUrl": "https://img.plotfarm.vn/crops/tomato.jpg"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

---

### 4.2. Chi tiết cây giống (`GET /api/v1/crops/:cropSlug`)
* **Quyền:** `Public`
* **Headers:** `Accept-Language: vi` (hoặc `en`)
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Lấy chi tiết giống cây trồng thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddf8",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c84",
    "userCode": "ANONYMOUS",
    "timestamp": "2026-09-10T04:17:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 87, "resetInSeconds": 40, "isSpamWarning": false }
  },
  "data": {
    "cropCode": "CRP-TOMATO-01",
    "cropSlug": "ca-chua-cherry",
    "name": "Cà chua Cherry Đà Lạt",
    "description": "Vị ngọt thanh, giòn rụm, giàu Vitamin C và lycopene.",
    "growthDurationDays": 75,
    "expectedYieldKg": 20.0,
    "basePricePerPlot": 1500000.00,
    "carePackageFeePerMonth": 400000.00,
    "stages": [
      { "stageOrder": 1, "stageName": "Ươm mầm", "durationDays": 10 },
      { "stageOrder": 2, "stageName": "Phát triển thân lá", "durationDays": 25 },
      { "stageOrder": 3, "stageName": "Ra hoa đậu quả", "durationDays": 20 },
      { "stageOrder": 4, "stageName": "Chín & Thu hoạch", "durationDays": 20 }
    ]
  }
}
```

---

### 4.3. Admin thêm giống cây trồng mới (`POST /api/v1/admin/crops`)
* **Quyền:** `ADMIN`
* **Request Body:**
```json
{
  "cropCode": "CRP-STRAWBERRY-01",
  "cropSlug": "dau-tay-nhat-hana",
  "name": "Dâu tây Nhật Hana",
  "description": "Giống dâu tây Hana ngọt đậm, quả mọng to, hương thơm đặc trưng.",
  "growthDurationDays": 90,
  "expectedYieldKg": 15.0,
  "basePricePerPlot": 2500000.00,
  "carePackageFeePerMonth": 600000.00
}
```
* **Response 201 Created:**
```json
{
  "code": 201,
  "message": "Thêm giống cây trồng mới thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddf9",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c85",
    "userCode": "ADMIN-01",
    "timestamp": "2026-09-10T04:18:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 86, "resetInSeconds": 38, "isSpamWarning": false }
  },
  "data": {
    "cropCode": "CRP-STRAWBERRY-01",
    "cropSlug": "dau-tay-nhat-hana",
    "name": "Dâu tây Nhật Hana"
  }
}
```

---

## NHÓM 5: PLOTS & RESERVATION (LÔ ĐẤT & KHÓA GIỮ CHỖ 10 PHÚT)

### 5.1. Danh sách lô đất theo Farm (`GET /api/v1/farms/:farmSlug/plots`)
* **Quyền:** `Public`
* **Query Params:** `status=AVAILABLE&page=1&pageSize=20`
* **Response 200 OK (Phân trang `code` + `message` + `meta` + `data` + `pagination`):**
```json
{
  "code": 200,
  "message": "Lấy danh sách lô đất thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdda1",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c86",
    "userCode": "ANONYMOUS",
    "timestamp": "2026-09-10T04:19:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 85, "resetInSeconds": 36, "isSpamWarning": false }
  },
  "data": [
    {
      "plotCode": "PLT-A01",
      "plotNumber": "Plot A-01",
      "areaSquareMeters": 50.0,
      "status": "AVAILABLE",
      "pricePerMonth": 1000000.00,
      "soilType": "Đất đỏ Bazan Lâm Đồng",
      "iotSensorInstalled": true,
      "cameraSupported": true
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 12,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

---

### 5.2. Khóa giữ chỗ lô đất tạm thời trong 10 phút (`POST /api/v1/plots/:plotCode/lock`)
* **Quyền:** `CUSTOMER`
* **Mô tả:** Khóa giữ chỗ nguyên tử (Atomic Lock) chống Race Condition trong thời gian thanh toán.
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Giữ chỗ lô đất thành công. Lô đất sẽ được giữ cho bạn trong 10 phút.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdda2",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c87",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:20:00.000Z",
    "rateLimit": { "limit": 20, "remaining": 19, "resetInSeconds": 60, "isSpamWarning": false }
  },
  "data": {
    "plotCode": "PLT-A01",
    "status": "RESERVED",
    "reservedUntil": "2026-09-10T04:30:00.000Z",
    "remainingSeconds": 600
  }
}
```

---

### 5.3. Hủy khóa giữ chỗ lô đất (`POST /api/v1/plots/:plotCode/unlock`)
* **Quyền:** `CUSTOMER`
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Đã hủy giữ chỗ lô đất thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdda3",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c88",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:21:00.000Z",
    "rateLimit": { "limit": 20, "remaining": 18, "resetInSeconds": 58, "isSpamWarning": false }
  },
  "data": {
    "plotCode": "PLT-A01",
    "status": "AVAILABLE"
  }
}
```

---

### 5.4. Admin phân công kỹ sư nông học phụ trách lô đất (`POST /api/v1/admin/plots/:plotCode/assign-staff`)
* **Quyền:** `ADMIN`
* **Request Body:**
```json
{
  "staffUserCode": "STAFF-01",
  "notes": "Phụ trách giám sát đợt xuống giống cà chua vụ Đông Xuân"
}
```
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Phân công kỹ sư phụ trách lô đất thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdda4",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c89",
    "userCode": "ADMIN-01",
    "timestamp": "2026-09-10T04:22:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 84, "resetInSeconds": 34, "isSpamWarning": false }
  },
  "data": {
    "plotCode": "PLT-A01",
    "assignedStaff": {
      "userCode": "STAFF-01",
      "fullName": "Kỹ sư Trần Thị Bích"
    }
  }
}
```

---

## NHÓM 6: VOUCHERS (MÃ GIẢM GIÁ KHUYẾN MÃI)

### 6.1. Danh sách mã giảm giá khả dụng (`GET /api/v1/vouchers`)
* **Quyền:** `CUSTOMER`, `Public`
* **Query Params:** `page=1&pageSize=10`
* **Response 200 OK (Phân trang `code` + `message` + `meta` + `data` + `pagination`):**
```json
{
  "code": 200,
  "message": "Lấy danh sách mã giảm giá thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdda5",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c90",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:23:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 83, "resetInSeconds": 32, "isSpamWarning": false }
  },
  "data": [
    {
      "voucherCode": "CHAOBANMOI50K",
      "discountType": "FIXED_AMOUNT",
      "discountValue": 50000.00,
      "minOrderAmount": 500000.00,
      "validUntil": "2026-12-31T23:59:59.000Z",
      "description": "Giảm 50K cho đơn thuê lô đất đầu tiên"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

---

### 6.2. Kiểm tra mã giảm giá hợp lệ (`GET /api/v1/vouchers/validate`)
* **Quyền:** `CUSTOMER`
* **Query Params:** `voucherCode=CHAOBANMOI50K&orderAmount=2700000`
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Áp dụng mã giảm giá hợp lệ.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdda6",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c91",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:24:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 82, "resetInSeconds": 30, "isSpamWarning": false }
  },
  "data": {
    "voucherCode": "CHAOBANMOI50K",
    "discountType": "FIXED_AMOUNT",
    "discountAmount": 50000.00,
    "finalTotalAmount": 2650000.00
  }
}
```

---

## NHÓM 7: CONTRACTS (HỢP ĐỒNG CANH TÁC)

### 7.1. Tạo hợp đồng thuê đất (`POST /api/v1/contracts`)
* **Quyền:** `CUSTOMER`
* **Request Body:**
```json
{
  "plotCode": "PLT-A01",
  "cropCode": "CRP-TOMATO-01",
  "rentalMonths": 3,
  "startDate": "2026-09-15",
  "voucherCode": "CHAOBANMOI50K",
  "deliveryOption": "HOME_DELIVERY",
  "shippingAddress": "123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM"
}
```
* **Response 201 Created:**
```json
{
  "code": 201,
  "message": "Khởi tạo hợp đồng thuê đất thành công. Vui lòng thanh toán trong 10 phút.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdda7",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c92",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:25:00.000Z",
    "rateLimit": { "limit": 20, "remaining": 19, "resetInSeconds": 60, "isSpamWarning": false }
  },
  "data": {
    "contractCode": "PF-2026-0915-A01",
    "plotCode": "PLT-A01",
    "cropCode": "CRP-TOMATO-01",
    "status": "PENDING_PAYMENT",
    "totalAmount": 2650000.00,
    "depositAmount": 2650000.00,
    "paymentDeadline": "2026-09-10T04:35:00.000Z"
  }
}
```

---

### 7.2. Danh sách hợp đồng của tôi (`GET /api/v1/contracts`)
* **Quyền:** `CUSTOMER`, `STAFF`, `ADMIN`
* **Query Params:** `status=ACTIVE&page=1&pageSize=10`
* **Response 200 OK (Phân trang `code` + `message` + `meta` + `data` + `pagination`):**
```json
{
  "code": 200,
  "message": "Lấy danh sách hợp đồng thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdda8",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c93",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:26:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 81, "resetInSeconds": 28, "isSpamWarning": false }
  },
  "data": [
    {
      "contractCode": "PF-2026-0915-A01",
      "plotCode": "PLT-A01",
      "plotNumber": "Plot A-01",
      "farmSlug": "da-lat-green",
      "cropCode": "CRP-TOMATO-01",
      "cropName": "Cà chua Cherry Đà Lạt",
      "status": "ACTIVE",
      "startDate": "2026-09-15",
      "expectedHarvestDate": "2026-11-29",
      "totalAmount": 2650000.00,
      "assignedStaff": {
        "userCode": "STAFF-01",
        "fullName": "Kỹ sư Trần Thị Bích"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

---

### 7.3. Chi tiết hợp đồng canh tác (`GET /api/v1/contracts/:contractCode`)
* **Quyền:** `CUSTOMER` (hợp đồng của mình), `STAFF`, `ADMIN`
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Lấy chi tiết hợp đồng thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdda9",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c94",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:27:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 80, "resetInSeconds": 26, "isSpamWarning": false }
  },
  "data": {
    "contractCode": "PF-2026-0915-A01",
    "plot": {
      "plotCode": "PLT-A01",
      "plotNumber": "Plot A-01",
      "farmName": "Nông trại Xanh Đà Lạt",
      "farmSlug": "da-lat-green"
    },
    "crop": {
      "cropCode": "CRP-TOMATO-01",
      "name": "Cà chua Cherry Đà Lạt",
      "expectedYieldKg": 20.0
    },
    "customer": {
      "userCode": "USR-CUST-2026-0001",
      "fullName": "Nguyễn Văn An",
      "phone": "0987654321"
    },
    "assignedStaff": {
      "userCode": "STAFF-01",
      "fullName": "Kỹ sư Trần Thị Bích"
    },
    "status": "ACTIVE",
    "startDate": "2026-09-15",
    "expectedHarvestDate": "2026-11-29",
    "financials": {
      "basePrice": 1500000.00,
      "carePackageFee": 1200000.00,
      "discountAmount": 50000.00,
      "totalAmount": 2650000.00,
      "paymentStatus": "PAID"
    },
    "deliveryAddress": "123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM"
  }
}
```

---

## NHÓM 8: PAYMENTS, VIETQR & WEBHOOKS (SỔ CÁI ĐỐI SOÁT NGUỒN TIỀN)

### 8.1. Tạo lệnh thanh toán QR Code (`POST /api/v1/payments/create-order`)
* **Quyền:** `CUSTOMER`
* **Request Body:**
```json
{
  "contractCode": "PF-2026-0915-A01",
  "paymentMethod": "VIETQR",
  "returnUrl": "https://plotfarm.vn/contracts/PF-2026-0915-A01/success"
}
```
* **Response 201 Created:**
```json
{
  "code": 201,
  "message": "Tạo giao dịch thanh toán VietQR thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddb1",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c95",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:28:00.000Z",
    "rateLimit": { "limit": 30, "remaining": 29, "resetInSeconds": 60, "isSpamWarning": false }
  },
  "data": {
    "orderCode": "PAY-PF2026-0915-A01",
    "contractCode": "PF-2026-0915-A01",
    "amountVnd": 2650000.00,
    "qrContent": "00020101021238580010A0000007270128000697042201140987654321520460115303704540726500005802VN62250821PF20260915A016304E8A9",
    "qrImage": "https://api.vietqr.io/image/970422-0987654321-compact.jpg?amount=2650000&addInfo=PAY-PF2026-0915-A01",
    "beneficiaryAccount": "0987654321",
    "beneficiaryBank": "MBBank",
    "transferContent": "PAY-PF2026-0915-A01",
    "expiresAt": "2026-09-10T04:38:00.000Z"
  }
}
```

---

### 8.2. Kiểm tra trạng thái đơn thanh toán (`GET /api/v1/payments/orders/:orderCode/status`)
* **Quyền:** `CUSTOMER`, `ADMIN`
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Kiểm tra trạng thái đơn thanh toán thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddb2",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c96",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:29:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 79, "resetInSeconds": 24, "isSpamWarning": false }
  },
  "data": {
    "orderCode": "PAY-PF2026-0915-A01",
    "contractCode": "PF-2026-0915-A01",
    "status": "SUCCESS",
    "amountPaid": 2650000.00,
    "paidAt": "2026-09-10T04:28:45.000Z"
  }
}
```

---

### 8.3. Webhook ngân hàng bắn về (`POST /api/v1/payments/webhook/vietqr`)
* **Quyền:** `Public` (Bảo mật bằng Secret Token & Khóa Idempotency)
* **Request Body:**
```json
{
  "gatewayReference": "MB_FT2625391823901",
  "orderCode": "PAY-PF2026-0915-A01",
  "amount": 2650000.00,
  "transactionDate": "2026-09-10T04:28:45.000Z",
  "content": "PAY-PF2026-0915-A01 chuyen khoan thue dat",
  "bankSignature": "d3b07384d113edec49eaa6238ad5ff00..."
}
```
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Webhook đối soát thanh toán thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddb3",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c97",
    "userCode": "SYSTEM-GATEWAY",
    "timestamp": "2026-09-10T04:28:46.000Z",
    "rateLimit": { "limit": 1000, "remaining": 999, "resetInSeconds": 60, "isSpamWarning": false }
  },
  "data": {
    "gatewayReference": "MB_FT2625391823901",
    "orderCode": "PAY-PF2026-0915-A01",
    "contractCode": "PF-2026-0915-A01",
    "contractStatus": "ACTIVE",
    "isDuplicateProcessed": false
  }
}
```

---

### 8.4. Admin tra cứu sổ cái giao dịch (`GET /api/v1/admin/payments/transactions`)
* **Quyền:** `ADMIN`
* **Query Params:** `status=SUCCESS&page=1&pageSize=10`
* **Response 200 OK (Phân trang `code` + `message` + `meta` + `data` + `pagination`):**
```json
{
  "code": 200,
  "message": "Lấy sổ cái giao dịch tài chính thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddb4",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c98",
    "userCode": "ADMIN-01",
    "timestamp": "2026-09-10T04:30:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 78, "resetInSeconds": 22, "isSpamWarning": false }
  },
  "data": [
    {
      "gatewayReference": "MB_FT2625391823901",
      "orderCode": "PAY-PF2026-0915-A01",
      "contractCode": "PF-2026-0915-A01",
      "amount": 2650000.00,
      "method": "VIETQR",
      "status": "SUCCESS",
      "createdAt": "2026-09-10T04:28:45.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

---

## NHÓM 9: COMPENSATIONS & REFUNDS (ĐỀN BÙ TỔN THẤT & HOÀN TIỀN)

### 9.1. Tạo phiếu yêu cầu đền bù sự cố (`POST /api/v1/compensations`)
* **Quyền:** `CUSTOMER`, `STAFF`
* **Request Body:**
```json
{
  "contractCode": "PF-2026-0915-A01",
  "reason": "STAFF_CARE_NEGLECT",
  "payoutType": "BANK_REFUND",
  "bankAccountRef": "BNK-REF-001",
  "requestedAmount": 1500000.00,
  "lossPercentage": 50.0,
  "evidenceUrls": [ "https://img.plotfarm.vn/compensations/damage_01.jpg" ],
  "incidentDate": "2026-09-10",
  "notes": "Kỹ thuật viên bón quá liều phân vi sinh làm héo một góc vườn."
}
```
* **Response 201 Created:**
```json
{
  "code": 201,
  "message": "Khởi tạo phiếu yêu cầu bồi thường sự cố thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddc1",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c99",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:31:00.000Z",
    "rateLimit": { "limit": 20, "remaining": 19, "resetInSeconds": 60, "isSpamWarning": false }
  },
  "data": {
    "compensationCode": "CMP-2026-0015",
    "contractCode": "PF-2026-0915-A01",
    "status": "REQUESTED",
    "requestedAmount": 1500000.00,
    "payoutType": "BANK_REFUND"
  }
}
```

---

### 9.2. Danh sách hồ sơ đền bù (`GET /api/v1/compensations`)
* **Quyền:** `CUSTOMER`, `STAFF`, `ADMIN`
* **Query Params:** `status=REQUESTED&page=1&pageSize=10`
* **Response 200 OK (Phân trang `code` + `message` + `meta` + `data` + `pagination`):**
```json
{
  "code": 200,
  "message": "Lấy danh sách phiếu đền bù thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddc2",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5ca0",
    "userCode": "ADMIN-01",
    "timestamp": "2026-09-10T04:32:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 77, "resetInSeconds": 20, "isSpamWarning": false }
  },
  "data": [
    {
      "compensationCode": "CMP-2026-0015",
      "contractCode": "PF-2026-0915-A01",
      "reason": "STAFF_CARE_NEGLECT",
      "status": "REQUESTED",
      "requestedAmount": 1500000.00,
      "payoutType": "BANK_REFUND",
      "createdAt": "2026-09-10T04:31:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

---

### 9.3. Thẩm duyệt và giải ngân đền bù (`PATCH /api/v1/admin/compensations/:compensationCode/approve`)
* **Quyền:** `ADMIN`
* **Request Body:**
```json
{
  "approvedAmount": 1500000.00,
  "payoutType": "BANK_REFUND",
  "payoutReference": "UNC_MB_883921893",
  "adminNotes": "Đã thẩm định xác thực lỗi kỹ thuật viên và thực hiện ủy nhiệm chi."
}
```
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Phê duyệt đền bù tổn thất và giải ngân hoàn tiền thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddc3",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5ca1",
    "userCode": "ADMIN-01",
    "timestamp": "2026-09-10T04:33:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 76, "resetInSeconds": 18, "isSpamWarning": false }
  },
  "data": {
    "compensationCode": "CMP-2026-0015",
    "status": "COMPLETED",
    "approvedAmount": 1500000.00,
    "payoutReference": "UNC_MB_883921893"
  }
}
```

---

### 9.4. Admin từ chối hồ sơ đền bù (`PATCH /api/v1/admin/compensations/:compensationCode/reject`)
* **Quyền:** `ADMIN`
* **Request Body:**
```json
{
  "rejectionReason": "Cây trồng vẫn đang phát triển bình thường theo đối soát snapshot IoT."
}
```
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Đã từ chối hồ sơ yêu cầu đền bù.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddc4",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5ca2",
    "userCode": "ADMIN-01",
    "timestamp": "2026-09-10T04:34:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 75, "resetInSeconds": 16, "isSpamWarning": false }
  },
  "data": {
    "compensationCode": "CMP-2026-0015",
    "status": "REJECTED",
    "rejectionReason": "Cây trồng vẫn đang phát triển bình thường theo đối soát snapshot IoT."
  }
}
```

---

## NHÓM 10: FARMING LOGS & REVIEWS (NHẬT KÝ BẤT BIẾN & ĐỐI SOÁT IOT)

### 10.1. Xem danh sách nhật ký nông vụ (`GET /api/v1/contracts/:contractCode/farming-logs`)
* **Quyền:** `CUSTOMER`, `STAFF`, `ADMIN`
* **Query Params:** `page=1&pageSize=10`
* **Response 200 OK (Phân trang `code` + `message` + `meta` + `data` + `pagination`):**
```json
{
  "code": 200,
  "message": "Lấy danh sách nhật ký chăm sóc thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddd1",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5ca3",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:35:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 74, "resetInSeconds": 14, "isSpamWarning": false }
  },
  "data": [
    {
      "logCode": "LOG-2026-0034",
      "contractCode": "PF-2026-0915-A01",
      "authorStaff": { "userCode": "STAFF-01", "fullName": "Kỹ sư Trần Thị Bích" },
      "actionType": "WATERING",
      "title": "Tưới nước nhỏ giọt & kiểm tra sâu bệnh",
      "description": "Cây phát triển tốt, chiều cao trung bình 35cm.",
      "photoUrls": [ "https://img.plotfarm.vn/logs/log_01.jpg" ],
      "sensorSnapshot": { "temperature": 24.2, "humidity": 72.5, "soilMoisture": 68.0 },
      "isAmended": false,
      "createdAt": "2026-09-10T02:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

---

### 10.2. Ghi nhật ký chăm sóc kèm snapshot IoT (`POST /api/v1/contracts/:contractCode/farming-logs`)
* **Quyền:** `STAFF`
* **Request Body:**
```json
{
  "actionType": "FERTILIZING",
  "title": "Bón phân hữu cơ vi sinh đợt 2",
  "description": "Bón lót quanh gốc 200g/gốc, kiểm tra không thấy rệp sáp.",
  "photoUrls": [ "https://img.plotfarm.vn/logs/log_02.jpg" ],
  "sensorSnapshot": { "temperature": 25.1, "humidity": 70.0, "soilMoisture": 65.4 }
}
```
* **Response 201 Created:**
```json
{
  "code": 201,
  "message": "Ghi nhật ký canh tác thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddd2",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5ca4",
    "userCode": "STAFF-01",
    "timestamp": "2026-09-10T04:36:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 73, "resetInSeconds": 12, "isSpamWarning": false }
  },
  "data": {
    "logCode": "LOG-2026-0035",
    "contractCode": "PF-2026-0915-A01",
    "title": "Bón phân hữu cơ vi sinh đợt 2",
    "createdAt": "2026-09-10T04:36:00.000Z"
  }
}
```

---

### 10.3. Đính chính nhật ký nông vụ (Append-Only - Cấm sửa đè) (`POST /api/v1/contracts/:contractCode/farming-logs/amend`)
* **Quyền:** `STAFF`, `ADMIN`
* **Nguyên tắc cốt lõi:** Bất biến (Immutable). Tuyệt đối không có lệnh UPDATE ghi đè; hệ thống sẽ tạo bản ghi mới kế thừa `replacesLogCode`.
* **Request Body:**
```json
{
  "replacesLogCode": "LOG-2026-0035",
  "amendmentReason": "Đính chính thông tin liều lượng: 150g/gốc thay vì 200g/gốc",
  "actionType": "FERTILIZING",
  "title": "[Đính chính] Bón phân hữu cơ vi sinh đợt 2",
  "description": "Liều lượng chính xác sau khi cân thực tế là 150g/gốc.",
  "photoUrls": [ "https://img.plotfarm.vn/logs/log_02_fixed.jpg" ]
}
```
* **Response 201 Created:**
```json
{
  "code": 201,
  "message": "Tạo bản ghi đính chính nhật ký thành công (Bảo toàn lịch sử gốc).",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddd3",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5ca5",
    "userCode": "STAFF-01",
    "timestamp": "2026-09-10T04:37:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 72, "resetInSeconds": 10, "isSpamWarning": false }
  },
  "data": {
    "logCode": "LOG-2026-0036",
    "replacesLogCode": "LOG-2026-0035",
    "amendmentReason": "Đính chính thông tin liều lượng: 150g/gốc thay vì 200g/gốc"
  }
}
```

---

### 10.4. Khách hàng đánh giá & Báo cờ nghi vấn gian lận (`POST /api/v1/farming-logs/:logCode/reviews`)
* **Quyền:** `CUSTOMER`
* **Request Body:**
```json
{
  "rating": 1,
  "comment": "Ảnh chụp nhật ký này hình như lấy lại ảnh của tuần trước, lá cây không hề lớn thêm!",
  "isFraudSuspected": true,
  "fraudReason": "Nghi vấn kỹ thuật viên không xuống vườn mà dùng ảnh cũ."
}
```
* **Response 201 Created:**
```json
{
  "code": 201,
  "message": "Đã ghi nhận phản hồi. Cờ nghi vấn gian lận đã được tự động chuyển tới Quản trị viên (Admin).",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddd4",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5ca6",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:38:00.000Z",
    "rateLimit": { "limit": 20, "remaining": 19, "resetInSeconds": 60, "isSpamWarning": false }
  },
  "data": {
    "logCode": "LOG-2026-0034",
    "rating": 1,
    "isFraudSuspected": true,
    "auditFlagTriggered": true
  }
}
```

---

## NHÓM 11: CARE REQUESTS (DỊCH VỤ CHĂM SÓC PHÁT SINH)

### 11.1. Đặt dịch vụ chăm sóc nâng cao (`POST /api/v1/contracts/:contractCode/care-requests`)
* **Quyền:** `CUSTOMER`
* **Request Body:**
```json
{
  "serviceType": "ORGANIC_FERTILIZER",
  "customerNote": "Bón phân trùn quế đợt cây bắt đầu đậu trái"
}
```
* **Response 201 Created:**
```json
{
  "code": 201,
  "message": "Đặt lịch chăm sóc bổ sung thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde1",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5ca7",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:39:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 71, "resetInSeconds": 8, "isSpamWarning": false }
  },
  "data": {
    "requestCode": "REQ-2026-0089",
    "contractCode": "PF-2026-0915-A01",
    "serviceType": "ORGANIC_FERTILIZER",
    "status": "PENDING",
    "extraFee": 150000.00
  }
}
```

---

### 11.2. Kỹ thuật viên cập nhật tiến độ chăm sóc (`PATCH /api/v1/staff/care-tasks/:requestCode/status`)
* **Quyền:** `STAFF`
* **Request Body:**
```json
{
  "status": "COMPLETED",
  "staffResponse": "Đã bón 2kg phân trùn quế vi sinh vào gốc lúc 08:00 sáng.",
  "proofImages": [ "https://img.plotfarm.vn/care/proof_01.jpg" ]
}
```
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Hoàn tất nhiệm vụ chăm sóc.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde2",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5ca8",
    "userCode": "STAFF-01",
    "timestamp": "2026-09-10T04:40:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 70, "resetInSeconds": 6, "isSpamWarning": false }
  },
  "data": {
    "requestCode": "REQ-2026-0089",
    "status": "COMPLETED",
    "completedAt": "2026-09-10T08:30:00.000Z"
  }
}
```

---

## NHÓM 12: HARVESTS & SHIPMENTS (THU HOẠCH & VẬN CHUYỂN NÔNG SẢN)

### 12.1. Cập nhật thu hoạch sản lượng thực tế (`POST /api/v1/contracts/:contractCode/harvest`)
* **Quyền:** `STAFF`
* **Request Body:**
```json
{
  "harvestDate": "2026-11-29",
  "actualYieldKg": 21.5,
  "qualityGrade": "GRADE_A",
  "proofPhotos": [ "https://img.plotfarm.vn/harvests/tomato_01.jpg" ],
  "notes": "Nông sản chín đều, quả mọng đỏ đạt chuẩn hữu cơ."
}
```
* **Response 201 Created:**
```json
{
  "code": 201,
  "message": "Nghiệm thu thu hoạch thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde3",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5ca9",
    "userCode": "STAFF-01",
    "timestamp": "2026-09-10T04:41:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 69, "resetInSeconds": 4, "isSpamWarning": false }
  },
  "data": {
    "harvestCode": "HVT-2026-0042",
    "contractCode": "PF-2026-0915-A01",
    "actualYieldKg": 21.5,
    "qualityGrade": "GRADE_A"
  }
}
```

---

### 12.2. Tạo vận đơn giao nông sản tận nhà (`POST /api/v1/contracts/:contractCode/shipment`)
* **Quyền:** `STAFF`, `ADMIN`
* **Request Body:**
```json
{
  "carrierCode": "GHN",
  "trackingCode": "GHN-PF2026-881923",
  "receiverName": "Nguyễn Văn An",
  "receiverPhone": "0987654321",
  "receiverAddress": "123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
  "totalWeightKg": 21.5
}
```
* **Response 201 Created:**
```json
{
  "code": 201,
  "message": "Khởi tạo mã vận đơn giao hàng thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde4",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5cb0",
    "userCode": "STAFF-01",
    "timestamp": "2026-09-10T04:42:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 68, "resetInSeconds": 2, "isSpamWarning": false }
  },
  "data": {
    "trackingCode": "GHN-PF2026-881923",
    "carrierCode": "GHN",
    "currentStatus": "PREPARING"
  }
}
```

---

### 12.3. Tra cứu hành trình vận chuyển nông sản (`GET /api/v1/shipments/:trackingCode`)
* **Quyền:** `CUSTOMER`, `STAFF`, `ADMIN`
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Tra cứu hành trình vận đơn thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde5",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5cb1",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:43:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 67, "resetInSeconds": 60, "isSpamWarning": false }
  },
  "data": {
    "trackingCode": "GHN-PF2026-881923",
    "carrierCode": "GHN",
    "carrierName": "Giao Hàng Nhanh",
    "status": "IN_TRANSIT",
    "receiverName": "Nguyễn Văn An",
    "receiverPhone": "0987654321",
    "destination": "123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    "history": [
      { "status": "PICKED_UP", "location": "Kho Bưu Cục Đà Lạt", "timestamp": "2026-11-29T10:00:00.000Z" },
      { "status": "IN_TRANSIT", "location": "Trung Tâm Phân Loại TP.HCM", "timestamp": "2026-11-29T20:00:00.000Z" }
    ]
  }
}
```

---

## NHÓM 13: IOT & REALTIME TELEMETRY (CẢM BIẾN MÔI TRƯỜNG VƯỜN)

### 13.1. Lấy chỉ số môi trường realtime của lô đất (`GET /api/v1/plots/:plotCode/telemetry`)
* **Quyền:** `CUSTOMER` (lô của mình), `STAFF`, `ADMIN`
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Lấy chỉ số môi trường cảm biến IoT thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde6",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5cb2",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:44:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 66, "resetInSeconds": 58, "isSpamWarning": false }
  },
  "data": {
    "plotCode": "PLT-A01",
    "latestMetrics": {
      "temperatureCelsius": 23.5,
      "humidityPercentage": 75.0,
      "soilMoisturePercentage": 72.0,
      "lightIntensityLux": 45000,
      "soilPh": 6.5
    },
    "healthStatus": "OPTIMAL",
    "measuredAt": "2026-09-10T04:40:00.000Z"
  }
}
```

---

### 13.2. Trạm cảm biến IoT Gateway đẩy dữ liệu định kỳ (`POST /api/v1/iot/telemetry`)
* **Quyền:** `IoT Gateway` (Bảo mật bằng mTLS hoặc Gateway API Key)
* **Request Body:**
```json
{
  "plotCode": "PLT-A01",
  "deviceToken": "iot-gateway-dalat-sec-8821",
  "temperature": 23.5,
  "humidity": 75.0,
  "soilMoisture": 72.0,
  "soilPh": 6.5,
  "lightLux": 45000,
  "timestamp": "2026-09-10T04:40:00.000Z"
}
```
* **Response 201 Created:**
```json
{
  "code": 201,
  "message": "Ghi nhận chỉ số cảm biến IoT thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde7",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5cb3",
    "userCode": "IOT-GATEWAY-01",
    "timestamp": "2026-09-10T04:40:01.000Z",
    "rateLimit": { "limit": 1000, "remaining": 998, "resetInSeconds": 60, "isSpamWarning": false }
  },
  "data": {
    "plotCode": "PLT-A01",
    "received": true
  }
}
```

---

## NHÓM 14: NOTIFICATIONS (TRUNG TÂM THÔNG BÁO)

### 14.1. Danh sách thông báo người dùng (`GET /api/v1/notifications`)
* **Quyền:** `CUSTOMER`, `STAFF`, `ADMIN`
* **Query Params:** `page=1&pageSize=20`
* **Response 200 OK (Phân trang `code` + `message` + `meta` + `data` + `pagination`):**
```json
{
  "code": 200,
  "message": "Lấy danh sách thông báo thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde8",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5cb4",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:45:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 65, "resetInSeconds": 56, "isSpamWarning": false }
  },
  "data": [
    {
      "notificationCode": "NOTIF-2026-0091",
      "title": "Thanh toán thành công",
      "body": "Đơn thuê lô đất Plot A-01 đã được kích hoạt. Hợp đồng PF-2026-0915-A01 chính thức có hiệu lực.",
      "type": "PAYMENT_SUCCESS",
      "referenceCode": "PF-2026-0915-A01",
      "isRead": false,
      "createdAt": "2026-09-10T04:28:46.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

---

### 14.2. Đánh dấu đã đọc thông báo (`PATCH /api/v1/notifications/:notificationCode/read`)
* **Quyền:** `CUSTOMER`, `STAFF`, `ADMIN`
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Đã đánh dấu thông báo là đã đọc.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccdde9",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5cb5",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:46:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 64, "resetInSeconds": 54, "isSpamWarning": false }
  },
  "data": {
    "notificationCode": "NOTIF-2026-0091",
    "isRead": true
  }
}
```

---

## NHÓM 15: STAFF WORKSPACE (BÀN LÀM VIỆC KỸ SƯ NÔNG HỌC)

### 15.1. Danh sách lô đất phụ trách (`GET /api/v1/staff/assigned-plots`)
* **Quyền:** `STAFF`
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Lấy danh sách lô đất phụ trách thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddf1",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5cb6",
    "userCode": "STAFF-01",
    "timestamp": "2026-09-10T04:47:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 63, "resetInSeconds": 52, "isSpamWarning": false }
  },
  "data": [
    {
      "plotCode": "PLT-A01",
      "plotNumber": "Plot A-01",
      "farmCode": "FRM-DALAT-01",
      "currentCrop": { "cropCode": "CRP-TOMATO-01", "name": "Cà chua Cherry Đà Lạt" },
      "contractCode": "PF-2026-0915-A01",
      "customer": { "userCode": "USR-CUST-2026-0001", "fullName": "Nguyễn Văn An" },
      "iotMetrics": { "temperature": 23.5, "humidity": 75.0, "soilMoisture": 72.0 }
    }
  ]
}
```

---

### 15.2. Danh sách nhiệm vụ chăm sóc trong ngày (`GET /api/v1/staff/care-tasks`)
* **Quyền:** `STAFF`
* **Query Params:** `status=PENDING&page=1&pageSize=20`
* **Response 200 OK (Phân trang `code` + `message` + `meta` + `data` + `pagination`):**
```json
{
  "code": 200,
  "message": "Lấy danh sách nhiệm vụ chăm sóc trong ngày thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddf2",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5cb7",
    "userCode": "STAFF-01",
    "timestamp": "2026-09-10T04:48:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 62, "resetInSeconds": 50, "isSpamWarning": false }
  },
  "data": [
    {
      "requestCode": "REQ-2026-0089",
      "contractCode": "PF-2026-0915-A01",
      "plotCode": "PLT-A01",
      "serviceType": "ORGANIC_FERTILIZER",
      "customerNote": "Bón phân trùn quế đợt cây bắt đầu đậu trái",
      "status": "PENDING",
      "createdAt": "2026-09-10T04:39:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

---

## NHÓM 16: ADMIN MONITORING & AUDIT LOGS (QUẢN TRỊ TỐI CAO & KIỂM TOÁN)

### 16.1. Báo cáo tổng quan số liệu Dashboard (`GET /api/v1/admin/dashboard/metrics`)
* **Quyền:** `ADMIN`
* **Response 200 OK:**
```json
{
  "code": 200,
  "message": "Lấy chỉ số điều hành Dashboard thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddf3",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5cb8",
    "userCode": "ADMIN-01",
    "timestamp": "2026-09-10T04:49:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 61, "resetInSeconds": 48, "isSpamWarning": false }
  },
  "data": {
    "totalRevenueVnd": 142500000.00,
    "activePlotsCount": 38,
    "totalPlotsCount": 50,
    "occupancyRatePercent": 76.0,
    "pendingCompensationsCount": 1,
    "totalAuditEventsCount": 1420
  }
}
```

---

### 16.2. Truy vấn nhật ký kiểm toán hệ thống (`GET /api/v1/admin/audit-logs`)
* **Quyền:** `ADMIN`
* **Query Params:** `entityTable=compensations&entityCode=CMP-2026-0015&page=1&pageSize=20`
* **Response 200 OK (Phân trang `code` + `message` + `meta` + `data` + `pagination`):**
```json
{
  "code": 200,
  "message": "Truy vấn lịch sử kiểm toán thành công.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddf4",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5cb9",
    "userCode": "ADMIN-01",
    "timestamp": "2026-09-10T04:50:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 60, "resetInSeconds": 46, "isSpamWarning": false }
  },
  "data": [
    {
      "auditCode": "AUD-2026-0182",
      "actorUserCode": "ADMIN-01",
      "action": "COMPENSATION_APPROVED",
      "entityTable": "compensations",
      "entityCode": "CMP-2026-0015",
      "oldState": { "status": "REQUESTED" },
      "newState": { "status": "COMPLETED", "payoutReference": "UNC_MB_883921893" },
      "ipAddress": "14.232.18.99",
      "createdAt": "2026-09-10T04:33:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

---

## BẢNG MÃ LỖI CHUẨN RFC 7807 & HTTP CODES

Khi API phát sinh lỗi, hệ thống luôn trả về cấu trúc Envelope lỗi thống nhất:
```json
{
  "code": 409,
  "message": "Lô đất hiện đang được giữ chỗ bởi khách hàng khác trong vòng 10 phút.",
  "meta": {
    "correlationId": "f98c1122-3344-5566-7788-99aabbccddf5",
    "traceId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5cc0",
    "userCode": "USR-CUST-2026-0001",
    "timestamp": "2026-09-10T04:51:00.000Z",
    "rateLimit": { "limit": 100, "remaining": 59, "resetInSeconds": 44, "isSpamWarning": false }
  },
  "error": {
    "code": "PLOT_ALREADY_RESERVED",
    "category": "BUSINESS_LOGIC_ERROR",
    "details": {
      "plotCode": "PLT-A01",
      "lockedUntil": "2026-09-10T04:30:00.000Z"
    }
  }
}
```

| HTTP Code | Error Code | Category | Diễn giải nghiệp vụ |
| :---: | :--- | :--- | :--- |
| `400` | `VALIDATION_FAILED` | `VALIDATION_ERROR` | Thiếu trường dữ liệu bắt buộc hoặc sai định dạng Code/Slug. |
| `401` | `UNAUTHENTICATED` | `AUTHENTICATION_ERROR` | Thiếu Header Authorization hoặc Access Token đã hết hạn. |
| `403` | `FORBIDDEN_ROLE` | `AUTHORIZATION_ERROR` | Customer cố duyệt bồi thường; Staff cố xem sổ cái ngân hàng. |
| `404` | `RESOURCE_NOT_FOUND` | `BUSINESS_LOGIC_ERROR` | Không tìm thấy Lô đất, Cây giống hoặc Hợp đồng theo Code/Slug. |
| `409` | `PLOT_ALREADY_RESERVED` | `BUSINESS_LOGIC_ERROR` | Lô đất đang được giữ chỗ trong 10 phút bởi khách khác. |
| `409` | `TRANSACTION_DUPLICATED`| `PAYMENT_GATEWAY_ERROR`| Webhook trùng lặp (Idempotency Key đã được ghi nhận trước đó). |
| `422` | `CANNOT_OVERWRITE_LOG` | `BUSINESS_LOGIC_ERROR` | Cố ý gửi lệnh UPDATE lên nhật ký chăm sóc thay vì tạo bản đính chính. |
| `429` | `TOO_MANY_REQUESTS` | `SECURITY_RATE_LIMIT_ERROR` | Bị chặn do vượt quá tần suất request/phút (Spam API). |
| `500` | `INTERNAL_SERVER_ERROR`| `SYSTEM_ERROR` | Lỗi cơ sở dữ liệu nội bộ hoặc cổng trung gian thứ 3 timeout. |
