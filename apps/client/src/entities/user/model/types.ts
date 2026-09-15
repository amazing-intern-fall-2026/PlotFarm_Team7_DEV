import type { User, UserRole } from "@repo/shared";

export type { User, UserRole };

/**
 * Tóm tắt thông tin người dùng tối giản để hiển thị ở Topbar, Header, RootLayout, Avatar.
 * Đóng vai trò Single Source of Truth (SSOT) cho UI presentation.
 */
export interface UserSummary {
  name: string;
  avatarSrc?: string;
  role?: UserRole;
  email?: string;
}

/**
 * Hồ sơ thông tin chi tiết của người dùng.
 */
export interface UserProfile extends User {
  phone?: string;
  address?: string;
}
