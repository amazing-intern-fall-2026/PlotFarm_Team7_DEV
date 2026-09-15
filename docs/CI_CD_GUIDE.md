# Hướng dẫn Cấu hình & Vận hành CI/CD Pipeline (CI/CD Guide)

Tài liệu này hướng dẫn chi tiết về luồng tự động hóa **CI/CD (Continuous Integration / Continuous Deployment)**, cách kết nối với hệ thống **Backlog/GitHub Projects**, tích hợp **Discord Webhook**, và chạy **Automation Testing** cho dự án **Plot Farm Monorepo**.

---

## 1. Tổng quan Kiến trúc CI/CD

Hệ thống CI/CD được xây dựng bằng **GitHub Actions** và nằm tại thư mục `.github/workflows/`:

```text
.github/
└── workflows/
    ├── ci.yml                     # Pipeline kiểm tra Lint, Build, Unit Test, Automation Test & Thông báo Discord
    └── backlog-auto-move.yml      # Workflow tự động chuyển trạng thái Ticket / User Story trên Backlog
```

---

## 2. Luồng Kiểm tra Tự động (CI Pipeline - `ci.yml`)

### 2.1 Các sự kiện kích hoạt (Triggers)
Pipeline tự động chạy khi:
- Có người thực hiện **Push** code lên nhánh `main` hoặc `develop`.
- Có người **Tạo mới hoặc Cập nhật Pull Request (PR)** hướng vào nhánh `main` hoặc `develop`.

### 2.2 Các Job chính trong Pipeline

1. **`lint-and-typecheck` (Kiểm tra Cú pháp & Kiểu dữ liệu)**:
   - Cài đặt môi trường `Node.js 20` và `pnpm 9`.
   - Chạy lệnh `pnpm --filter @repo/database db:generate` sinh Prisma Client.
   - Chạy `pnpm lint` kiểm tra luật ESLint toàn monorepo.
   - Chạy `pnpm build` kiểm tra biên dịch TypeScript.

2. **`unit-and-automation-tests` (Chạy Test Tự động)**:
   - Chạy toàn bộ Unit Tests bằng `pnpm test`.
   - Chạy kịch bản **Automation Test / E2E Test** (Playwright / Cypress) kiểm tra luồng tích hợp giữa Frontend và Backend.

3. **`discord-notification` (Thông báo về Discord)**:
   - Tự động chạy sau khi các bước trên kết thúc.
   - Gửi thông điệp trực quan (Rich Embed) về kênh Discord thông qua **Discord Webhook URL**.

---

## 3. Cấu hình Kênh Discord Nhận Thông báo (Discord Notification Setup)

Để nhận được thông báo tự động (Thành công ✅ hoặc Thất bại ❌) trong Discord:

### Bước 1: Tạo Discord Webhook
1. Vào **Server Settings** trên Discord -> chọn **Integrations** -> **Webhooks**.
2. Bấm **New Webhook**, đặt tên bot (ví dụ: `Plot Farm CI Bot`) và chọn kênh (Channel) muốn nhận tin nhắn.
3. Bấm **Copy Webhook URL**.

### Bước 2: Thêm Secret vào GitHub Repository
1. Trên GitHub Repository, truy cập vào **Settings** -> **Secrets and variables** -> **Actions**.
2. Bấm **New repository secret**.
3. Điền:
   - **Name**: `DISCORD_WEBHOOK`
   - **Secret**: *(Paste đoạn Webhook URL đã copy ở Bước 1)*
4. Bấm **Add secret**.

---

## 4. Tự động Chuyển trạng thái Issue / Backlog (`backlog-auto-move.yml`)

Hệ thống tự động liên kết Pull Request với các mã **User Story (`us-xx`)** hoặc **Issue #ID**:

### Cách liên kết PR với Issue:
Khi tạo PR hoặc commit, trong nội dung PR hãy điền từ khóa liên kết:
```text
Closes #101
Fixes #102
Connects to us-101
```

### Luồng chuyển trạng thái tự động:
1. **Khi PR được tạo mới (Opened)**: Trạng thái của Issue/User Story trên Backlog tự động chuyển sang **`In Progress`** (Đang thực hiện).
2. **Khi PR được Review & Merge vào `main`/`develop`**: Trạng thái của Issue/User Story tự động chuyển sang **`Done`** (Hoàn thành) và tự động đóng Issue tương ứng.

---

## 5. Hướng dẫn Chạy Automation Test Local

Để chạy thử bộ kịch bản Automation Test trên máy local trước khi tạo PR:

```bash
# Chạy Unit Tests
pnpm test

# Chạy Linter & Typecheck đầy đủ
pnpm lint
pnpm build
```
