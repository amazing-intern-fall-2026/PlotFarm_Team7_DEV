import { describe, it, expect } from "vitest";
import { RegisterFormSchema } from "./useRegisterForm";

describe("RegisterFormSchema Validation Tests", () => {
  it("hợp lệ khi có đầy đủ các trường và đồng ý điều khoản", () => {
    const validData = {
      fullName: "Nguyễn Văn Nông",
      email: "nongdan@greenfarm.vn",
      password: "password123",
      confirmPassword: "password123",
      agreeTerms: true,
    };

    const result = RegisterFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("báo lỗi khi mật khẩu xác nhận không khớp", () => {
    const invalidData = {
      fullName: "Nguyễn Văn Nông",
      email: "nongdan@greenfarm.vn",
      password: "password123",
      confirmPassword: "different-password",
      agreeTerms: true,
    };

    const result = RegisterFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("không trùng khớp");
    }
  });

  it("báo lỗi khi chưa tick đồng ý điều khoản dịch vụ", () => {
    const invalidData = {
      fullName: "Nguyễn Văn Nông",
      email: "nongdan@greenfarm.vn",
      password: "password123",
      confirmPassword: "password123",
      agreeTerms: false,
    };

    const result = RegisterFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("Điều khoản dịch vụ");
    }
  });
});
