/**
 * @layer widgets
 * @description Tầng Widgets (Khối giao diện tự chứa lớn) — FSD Layer 2.
 *
 * Hướng dẫn triển khai:
 * 1. Header/     → Thanh điều hướng trên cùng, tùy biến theo vai trò người dùng (Customer, Staff, Admin).
 * 2. Sidebar/    → Thanh menu điều hướng bên trái cho phân hệ Quản trị / Kỹ thuật viên (Laptop/Desktop).
 * 3. Navigation/ → Thanh điều hướng dưới đáy màn hình (Bottom Navigation cuộn ngang) trên Mobile.
 * 4. Footer/     → Chân trang thông tin chung (chỉ dành riêng cho Khách hàng & Công cộng, ẩn ở Admin/Staff).
 */
export * from "./RootLayout";
export * from "./HomeHero";
export * from "./SeasonalCrops";
export * from "./FarmJourney";
export * from "./KeyFeatures";
export * from "./PlotsHero";
export * from "./PlotsFilter";
export * from "./PlotGridMap";

