# Tài liệu Hướng dẫn Các Luật ESLint trong Dự án (ESLint Rules Guide)

Tài liệu này giải thích chi tiết các quy tắc ESLint đang được áp dụng trong toàn bộ **Plot Farm Monorepo** giúp các thành viên dễ dàng nắm bắt và tuân thủ.

---

## 1. Cấu trúc Cấu hình ESLint

Dự án áp dụng cấu hình tập trung tại package `@repo/eslint-config`.

- Package cấu hình: `packages/eslint-config/index.js`
- Áp dụng cho: Tất cả các app (`apps/client`, `apps/server`) và package (`packages/shared`, `packages/database`).

---

## 2. Danh sách Quy tắc Chi tiết (Rules Breakdown)

### 2.1 Cảnh báo Biến không sử dụng (`no-unused-vars` / `@typescript-eslint/no-unused-vars`)
- **Mức độ**: `warn` / `error`
- **Mục đích**: Loại bỏ các biến, hàm, hoặc import được khai báo nhưng không dùng tới để giữ code sạch sẽ và nhẹ dung lượng.
- **Cách xử lý**: Tránh khai báo biến thừa. Nếu là tham số bắt buộc trong callback mà không dùng, hãy thêm tiền tố `_` (ví dụ: `_req`, `_res`).

```typescript
// ❌ SAI
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// ✅ ĐÚNG
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
```

---

### 2.2 Quy tắc Kiểu dữ liệu TypeScript Strict (`@typescript-eslint/no-explicit-any`)
- **Mức độ**: `warn` / `error`
- **Mục đích**: Ngăn chặn việc lạm dụng kiểu `any` làm mất đi sức mạnh kiểm tra kiểu của TypeScript.
- **Cách xử lý**: Khai báo interface, type hoặc dùng `unknown` kèm theo type guard.

```typescript
// ❌ SAI
function processData(data: any) {
  console.log(data.name);
}

// ✅ ĐÚNG
interface PlotPayload {
  name: string;
}

function processData(data: PlotPayload) {
  console.log(data.name);
}
```

---

### 2.3 Quy tắc React Hooks (`react-hooks/rules-of-hooks` & `react-hooks/exhaustive-deps`)
- **Áp dụng cho**: `apps/client` (Frontend React)
- **Mức độ**: `error`
- **Mục đích**: Đảm bảo React Hooks tuân thủ đúng vòng đời render của React.
- **Quy tắc**:
  1. Chỉ gọi Hooks ở mức cao nhất (top-level) của React Component hoặc Custom Hook.
  2. Không gọi Hooks bên trong vòng lặp (`for`), câu điều kiện (`if`), hoặc hàm lồng nhau.
  3. Tất cả các biến phụ thuộc được sử dụng trong `useEffect`, `useCallback`, `useMemo` phải được liệt kê đầy đủ trong mảng dependency `[]`.

```typescript
// ❌ SAI
if (isLoaded) {
  useEffect(() => { ... }, []); // Không gọi hook trong câu lệnh if
}

// ✅ ĐÚNG
useEffect(() => {
  if (isLoaded) {
    ...
  }
}, [isLoaded]);
```

---

### 2.4 Quy tắc Khai báo Import (`import/no-unresolved` & Monorepo Workspace Imports)
- **Mức độ**: `error`
- **Mục đích**: Đảm bảo các gói dependency được import chính xác theo quy chuẩn Monorepo.
- **Quy tắc**:
  - Dùng đúng tên package dùng chung như `@repo/shared` hoặc `@repo/database`.
  - Hạn chế import tương đối quá sâu dạng `../../../../components/Button`. Nên dùng alias `@/components/Button`.

```typescript
// ❌ SAI
import { PlotSchema } from "../../../packages/shared/src";

// ✅ ĐÚNG
import { PlotSchema } from "@repo/shared";
```

---

## 3. Cách chạy Linter & Tự động Sửa Lỗi (Auto-fix)

### Chạy kiểm tra toàn bộ Monorepo:
```bash
pnpm lint
```

### Tự động sửa các lỗi định dạng cơ bản:
```bash
pnpm lint --fix
```
