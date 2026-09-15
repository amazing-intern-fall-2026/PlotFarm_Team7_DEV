/**
 * @layer modules
 * @description Tầng Modules — Các module nghiệp vụ chính của Backend (RESTful APIs).
 *
 * Hướng dẫn triển khai từng module:
 * 1. auth/         → Đăng ký, đăng nhập, refresh token, đổi mật khẩu.
 * 2. users/        → Quản lý tài khoản, phân quyền (RBAC), hồ sơ người dùng.
 * 3. farms/        → Quản lý danh sách nông trại mẫu, phân khu.
 * 4. plots/        → Quản lý ô đất, trạng thái thuê, đặt cọc, bản đồ lô đất.
 * 5. crops/        → Danh mục cây trồng, mùa vụ, hướng dẫn kỹ thuật canh tác.
 * 6. contracts/    → Hợp đồng thuê đất, thanh toán, gia hạn.
 * 7. care/         → Phiếu chăm sóc, yêu cầu kỹ thuật viên, nhật ký canh tác.
 * 8. telemetry/    → Tiếp nhận và phân tích dữ liệu cảm biến IoT (độ ẩm, nhiệt độ).
 * 9. harvests/     → Lệnh thu hoạch, nghiệm thu sản lượng và điều phối vận chuyển.
 *
 * Cấu trúc chuẩn mỗi module:
 *  - [name].routes.ts     → Định nghĩa endpoints
 *  - [name].controller.ts → Tiếp nhận request, validation, gọi service
 *  - [name].service.ts    → Xử lý logic nghiệp vụ và tương tác Prisma database
 *  - [name].schema.ts     → Zod validation schemas
 */
export {};
