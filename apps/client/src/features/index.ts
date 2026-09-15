/**
 * @layer features
 * @description Tầng Features (Hành động & Tương tác người dùng) — FSD Layer 3.
 *
 * Hướng dẫn triển khai:
 * 1. auth/           → Đăng nhập, đăng ký, quên mật khẩu, phân quyền ProtectedRoute.
 * 2. rent-plot/      → Quy trình chọn và thuê ô đất canh tác.
 * 3. manage-crops/   → Thao tác quản lý giống rau, lịch canh tác.
 * 4. care-requests/  → Gửi và xử lý phiếu yêu cầu chăm sóc cây trồng.
 */
export * from "./auth";
export * from "./farmer-ops/farmerOps";
