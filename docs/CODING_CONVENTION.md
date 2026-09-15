# Quy chuẩn Lập trình & Quy trình Phát triển (Coding Conventions)

Tài liệu này quy định chuẩn hóa quy trình làm việc, đặt tên nhánh (Git branch), viết commit, tạo Pull Request (PR), đặt tên biến, tổ chức thư mục và cấu hình công cụ tự động (Husky, Commitlint, Lint-staged) cho dự án **Plot Farm Monorepo**.

---

## 1. Quy định đặt tên Nhánh Git (Git Branch Naming)

Tất cả các nhánh làm việc bắt buộc phải chứa mã **User Story viết thường (`us-xx`)** hoặc **Issue ID** tương ứng trên hệ thống Quản lý công việc (Backlog / GitHub Projects / Jira).

### Cú pháp chuẩn
```text
<type>/us-<number>-<short-description>
```

### Các Prefix hợp lệ
- `feat/` hoặc `feature/`: Thêm chức năng mới theo User Story.
- `fix/` hoặc `bugfix/`: Sửa lỗi theo Ticket / Bug report.
- `chore/`: Cấu hình hệ thống, linter, dependencies, CI/CD.
- `refactor/`: Tối ưu hóa code mà không đổi logic/tính năng.
- `docs/`: Thêm hoặc cập nhật tài liệu.

### Ví dụ hợp lệ
- `feat/us-101-rent-plot-map`
- `feat/us-102-sensor-telemetry-dashboard`
- `fix/us-205-auth-token-refresh`
- `chore/us-001-setup-eslint-husky`

---

## 2. Quy định Viết Commit (Conventional Commits)

Commit message **KHÔNG CẦN chứa mã `us`**, nhưng **BẮT BUỘC PHẢI CÓ `<scope>`** để xác định rõ công việc được chỉnh sửa trong folder/module nào.

### Cú pháp Commit Message bắt buộc
```text
<type>(<scope>): <description>
```

### Quy định Scope (`<scope>`)
`<scope>` phản ánh thư mục hoặc thành phần trực tiếp chịu ảnh hưởng:
- `client`: Code trong `apps/client` (Frontend React).
- `server`: Code trong `apps/server` (Backend Express).
- `database`: Code trong `packages/database` (Prisma/DB).
- `shared`: Code trong `packages/shared` (Zod schemas / types).
- `tsconfig` / `eslint`: Cấu hình linter / typescript dùng chung.
- `monorepo` / `deps`: Cấu hình root, dependencies chung.

### Các Type hợp lệ
- `feat`: Tính năng mới.
- `fix`: Sửa lỗi.
- `chore`: Thay đổi cấu hình, dependencies, tooling.
- `docs`: Sửa tài liệu.
- `style`: Định dạng code (spacing, semicolon).
- `refactor`: Cải tiến cấu trúc code.
- `test`: Thêm hoặc sửa Unit Test / Automation Test.

### Ví dụ HỢP LỆ (Có scope)
- `feat(client): add plot detail modal component`
- `fix(server): resolve CORS error on telemetry endpoint`
- `chore(database): update prisma schema for plot model`
- `feat(shared): add Zod validation schema for sensor data`

### Ví dụ KHÔNG HỢP LỆ (Thiếu scope - Sẽ bị Husky chặn commit)
- `feat: add plot detail modal` ❌ *(Thiếu scope)*
- `fix: resolve CORS error` ❌ *(Thiếu scope)*

---

## 3. Quy trình Pull Request (PR Workflow)

1. **Trước khi tạo PR**:
   - Chạy lệnh `pnpm lint` và `pnpm build` ở root để đảm bảo không có cảnh báo (warning) hay lỗi (error) nào.
   - Đảm bảo code đã pass tất cả Unit Test local (`pnpm test`).
2. **Tiêu đề PR**:
   - Phải ghi rõ mã User Story viết thường: `[us-101] Feat: Add rent plot interactive map`.
3. **Nội dung PR**:
   - Điền đầy đủ PR Template: Mô tả thay đổi, danh sách công việc đã làm, link tới Backlog Issue (`Closes #101` hoặc `Connects to us-101`).
4. **Code Review**:
   - PR cần ít nhất **1 đợt approve từ reviewer** trước khi merge vào nhánh `main` hoặc `develop`.

---

## 4. Quy định Đặt tên & Cấu trúc Code

### 4.1 Đặt tên Biến, Hàm, Class (Naming Conventions)
- **Variables / Functions**: `camelCase` (ví dụ: `fetchPlotData`, `userProfile`, `isPlotAvailable`).
- **Components / Interfaces / Types / Classes**: `PascalCase` (ví dụ: `PlotCard`, `UserProfile`, `TelemetryPayload`).
- **Constants / Enum values**: `UPPER_SNAKE_CASE` (ví dụ: `MAX_PLOT_CAPACITY`, `PLOT_STATUS_AVAILABLE`).
- **File & Directory names**:
  - React Component files: `PascalCase.tsx` (ví dụ: `PlotCard.tsx`).
  - Services / Modules / Utils files: `kebab-case.ts` hoặc `camelCase.ts` (ví dụ: `plots.service.ts`, `formatDate.ts`).

### 4.2 Nguyên tắc Viết Code (Clean Code & TypeScript Rules)
- **Tự giải thích (Self-documenting)**: Đặt tên biến và hàm rõ nghĩa, hạn chế comment dư thừa.
- **Strict Typing**: Tuyệt đối **không dùng `any`**. Dùng `unknown` hoặc định nghĩa Interface / Zod Schema rõ ràng trong `@repo/shared`.
- **Early Return**: Hạn chế `if/else` lồng nhau phức tạp.

---

## 5. Làm việc với Cấu trúc Thư mục Monorepo

```text
plot-farm-monorepo/
├── apps/
│   ├── client/          # Frontend React + Vite
│   └── server/          # Backend Express.js + TypeScript
└── packages/
    ├── database/        # Prisma Schema & Database Client dùng chung
    ├── shared/          # Types & Zod Schemas dùng chung giữa FE và BE
    ├── eslint-config/   # Cấu hình ESLint chuẩn
    └── tsconfig/        # Base TSConfig
```

---

## 6. Công cụ Tự động hóa Local (Husky + Commitlint + Strict Pre-commit)

Dự án áp dụng cơ chế kiểm duyệt nghiêm ngặt qua **Husky**:

1. **Commit-msg hook**:
   - Chạy `commitlint` kiểm tra cú pháp commit. **Bắt buộc phải có `<scope>`**. Nếu thiếu scope hoặc sai cú pháp, commit sẽ bị hủy.
2. **Pre-commit hook (Strict Lint & Build Check)**:
   - Tự động chạy `npx lint-staged`.
   - Tự động chạy `pnpm lint` và `pnpm build`.
   - **Nếu có BẤT KỲ WARNING HOẶC ERROR NÀO**, commit sẽ lập tức bị CHẶN, và hệ thống sẽ hiển thị thông báo lỗi chi tiết yêu cầu lập trình viên sửa hết warning/error trước khi commit lại.
