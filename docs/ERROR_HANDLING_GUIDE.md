# Hướng dẫn Hệ thống Xử lý Lỗi Toàn diện (Full-Stack Centralized Error Handling)

> **Feature Branch:** `feat/us-11-system-error-auth-error-handling`  
> **Kiến trúc:** Monorepo (`packages/shared` + `apps/server` + `apps/client`)  
> **Mục tiêu:** Chuẩn hóa toàn bộ API Response/Error Envelope từ Backend, Shared Types đến Client Error Parsing & UI Presentation.

---

## 1. Tổng quan Kiến trúc 3 Lớp (End-to-End Architecture)

Để giải quyết triệt để việc đồng bộ dữ liệu lỗi giữa Frontend và Backend, hệ thống xử lý lỗi được xây dựng theo 3 lớp chuẩn hóa:

```
┌────────────────────────────────────────────────────────┐
│               1. packages/shared                       │
│  - ERROR_CODES constants                               │
│  - ApiErrorResponse / ApiSuccessResponse schemas & types│
│  - Zod runtime validation & infer types                │
└──────────────────┬───────────────────┬─────────────────┘
                   │                   │
                   ▼                   ▼
┌───────────────────────────────┐   ┌───────────────────────────────┐
│        2. apps/server         │   │        3. apps/client         │
│  - errorHandler middleware    │   │  - errorHandler.ts (parser)   │
│  - AppError operational class │   │  - axiosClient (interceptors) │
│  - authGuard / tokenService   │   │  - mapValidationErrors (form) │
│  - Prisma & Zod mapping       │   │  - safeGetAuth / AuthStorage  │
└───────────────────────────────┘   └───────────────────────────────┘
```

---

## 2. Cấu trúc Chuẩn hóa (Envelope Pattern - `@repo/shared`)

Mọi phản hồi từ backend API đều tuân thủ JSON Envelope chuẩn được định nghĩa tại `packages/shared/src/index.ts`:

### A. Phản hồi thành công (HTTP 2xx)
```json
{
  "success": true,
  "data": {
    "id": "plot_123",
    "name": "Khu vườn thông minh A"
  }
}
```

### B. Phản hồi lỗi (HTTP 4xx / 5xx)
```json
{
  "success": false,
  "error": {
    "code": "ERR_VALIDATION",
    "message": "Dữ liệu gửi lên không hợp lệ",
    "details": [
      {
        "field": "email",
        "message": "Email không đúng định dạng"
      }
    ]
  }
}
```

---

## 3. Danh mục Mã Lỗi Chuẩn (`ERROR_CODES`)

Được xuất ra từ `@repo/shared` và sử dụng đồng nhất ở cả Server và Client:

| Hạng mục | Key trong `ERROR_CODES` | Giá trị mã (`code`) | HTTP Status | Cấu trúc `details` |
| :--- | :--- | :--- | :---: | :--- |
| **Validation** | `VALIDATION` | `ERR_VALIDATION` | `400` | `[{"field": "path", "message": "..."}]` |
| **JSON Body** | `INVALID_JSON` | `ERR_INVALID_JSON` | `400` | `[]` |
| **Request** | `BAD_REQUEST` | `ERR_BAD_REQUEST` | `400` | Tùy biến |
| **CSDL Unique** | `DUPLICATE` | `ERR_DUPLICATE` | `409` | `[{"field": "fieldname"}]` |
| **CSDL Not Found** | `NOT_FOUND` | `ERR_NOT_FOUND` | `404` | `[]` |
| **CSDL Foreign Key**| `FOREIGN_KEY_CONSTRAINT` | `ERR_FOREIGN_KEY_CONSTRAINT`| `400` | `[]` |
| **Xác thực** | `AUTH_REQUIRED` | `ERR_AUTH_REQUIRED` | `401` | `[]` (Thiếu Header Authorization) |
| **Token giả mạo**| `INVALID_TOKEN` | `ERR_INVALID_TOKEN` | `401` | `[]` (Chữ ký JWT không hợp lệ) |
| **Token hết hạn**| `TOKEN_EXPIRED` | `ERR_TOKEN_EXPIRED` | `401` | `[]` (JWT Expired) |
| **Refresh Token**| `INVALID_REFRESH_TOKEN` | `ERR_INVALID_REFRESH_TOKEN` | `401` | `[]` (Token thu hồi hoặc sai) |
| **Tài khoản** | `ACCOUNT_DISABLED` | `ERR_ACCOUNT_DISABLED` | `403` | `[]` (Admin đã vô hiệu hóa user) |
| **User tồn tại** | `USER_NOT_FOUND` | `ERR_USER_NOT_FOUND` | `401` | `[]` (User không có trong DB) |
| **Hệ thống** | `INTERNAL_SERVER` | `ERR_INTERNAL_SERVER` | `500` | `[]` (Ẩn hoàn toàn stack trace) |

---

## 4. Chi tiết Triển khai trong Từng Package

### 1. `packages/shared/src/index.ts`
- Khai báo hằng số `ERROR_CODES`.
- Khai báo Schema Zod & TypeScript types:
  - `ApiErrorDetailSchema` & `ApiErrorDetail`
  - `ApiErrorPayloadSchema` & `ApiErrorPayload`
  - `ApiErrorResponseSchema` & `ApiErrorResponse`
  - `ApiSuccessResponseSchema<T>` & `ApiSuccessResponse<T>`
  - `ApiResponseSchema<T>` & `ApiResponse<T>`

### 2. `apps/server` (Backend Pipeline)
- **`src/errors/AppError.ts`**:
  - Class đại diện cho lỗi nghiệp vụ dự tính được (operational error).
  - Sử dụng trực tiếp `ERROR_CODES` từ `@repo/shared`.
- **`src/middlewares/errorHandler.ts`**:
  - Bắt toàn bộ lỗi (ZodError, SyntaxError, Prisma error, AppError, Unknown Error).
  - Định dạng response thành `ApiErrorResponse` chuẩn.
- **`src/middlewares/authGuard.ts`**:
  - Kiểm tra Header Bearer token, xác thực JWT bằng `jwt.verify`.
  - Bắt `TokenExpiredError` -> `ERROR_CODES.TOKEN_EXPIRED`.
  - Bắt `JsonWebTokenError` -> `ERROR_CODES.INVALID_TOKEN`.
  - Kiểm tra `user.active === false` -> `ERROR_CODES.ACCOUNT_DISABLED`.
- **`src/modules/auth/token.service.ts`**:
  - Kiểm tra và xác thực refresh token qua bảng `RefreshToken` trong CSDL.

### 3. `apps/client` (Frontend Processing & UI)
- **`src/api/errorHandler.ts`**:
  - `isApiErrorResponse(data)`: Type guard an toàn kiểm tra cấu trúc envelope từ server.
  - `parseApiError(error)`: Xử lý mọi loại lỗi (`AxiosError`, mất mạng `ERR_NETWORK`, timeout `ERR_TIMEOUT`, lỗi server chuẩn, lỗi runtime) về định dạng `ApiErrorPayload`.
  - `mapValidationErrors(details)`: Chuyển đổi mảng `details` thành map `{ [field]: errorMessage }` để gắn thẳng vào input error trong Form React.
  - `getErrorMessage(error, fallback)`: Lấy thông điệp lỗi dạng text ngắn gọn để hiển thị Toast / Alert.
- **`src/shared/api/index.ts`**:
  - Barrel export chuẩn theo kiến trúc FSD (Feature-Sliced Design), tái xuất khẩu cả `axiosClient`, `errorHandler`, và `@repo/shared` cho toàn bộ ứng dụng Client.
- **`src/api/axiosClient.ts`**:
  - Interceptor tự động refresh token với Mutex Promise queue (chống gửi nhiều request refresh cùng lúc).
  - Tự động bắt `ERR_ACCOUNT_DISABLED` và `ERR_INVALID_TOKEN` để hủy phiên đăng nhập an toàn, chống lặp vô tận.

---

## 5. Hướng dẫn Sử Dụng Cho Developer

### A. Phía Server: Ném lỗi trong Controller / Service
```typescript
import { AppError } from "../errors/AppError";
import { ERROR_CODES } from "@repo/shared";

// Ném lỗi 403 khi không đủ thẩm quyền
if (user.role !== "ADMIN") {
  throw AppError.forbidden("Bạn không có quyền thực hiện hành động này", ERROR_CODES.FORBIDDEN);
}

// Ném lỗi tùy biến với details
if (currentStock < requestedQuantity) {
  throw new AppError("Số lượng tồn kho không đủ", 400, ERROR_CODES.BAD_REQUEST, [
    { available: currentStock, requested: requestedQuantity }
  ]);
}
```

### B. Phía Client: Gọi API, Xử lý Form và Toast
```typescript
import { parseApiError, mapValidationErrors, getErrorMessage } from "@/shared/api";

async function handleSubmit(formData: RegisterFormInput) {
  try {
    await axiosClient.post("/auth/register", formData);
    showToast("Đăng ký thành công!", "success");
  } catch (error) {
    const apiError = parseApiError(error);

    // 1. Nếu là lỗi validation form (ERR_VALIDATION)
    if (apiError.code === "ERR_VALIDATION") {
      const fieldErrors = mapValidationErrors(apiError.details);
      setFormErrors(fieldErrors); // { email: "Email đã tồn tại", ... }
      return;
    }

    // 2. Các lỗi khác hiển thị qua Toast
    showToast(getErrorMessage(error), "error");
  }
}
```

---

## 6. Kiểm thử & Đảm bảo Chất lượng (Testing & Verification)

```bash
# 1. Chạy test trọn gói toàn bộ monorepo (Shared + Server + Client)
pnpm test

# 2. Chạy linter toàn bộ dự án với chuẩn strict (0 warning)
pnpm lint

# 3. Build toàn bộ packages & apps
pnpm build
```

Hệ thống đã đạt **100% test pass** và **0 warning / 0 error** trên cả 3 package `shared`, `server` và `client`.
