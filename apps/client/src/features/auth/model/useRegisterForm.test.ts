import { describe, it, expect } from "vitest";
import { RegisterFormSchema } from "./useRegisterForm";

describe("RegisterFormSchema Validation Tests", () => {
  it("hợp lệ khi có đầy đủ 3 trường: fullName, email, password", () => {
    const validData = {
      fullName: "Nguyễn Văn Nông",
      email: "nongdan@greenfarm.vn",
      password: "password123",
    };

    const result = RegisterFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("báo lỗi khi thiếu fullName hoặc fullName quá ngắn (< 2 ký tự)", () => {
    const invalidData = {
      fullName: "A",
      email: "nongdan@greenfarm.vn",
      password: "password123",
    };

    const result = RegisterFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("ít nhất 2 ký tự");
    }
  });

  it("báo lỗi khi email sai định dạng", () => {
    const invalidData = {
      fullName: "Nguyễn Văn Nông",
      email: "not-an-email",
      password: "password123",
    };

    const result = RegisterFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("Email không đúng");
    }
  });

  it("báo lỗi khi password quá ngắn (< 6 ký tự)", () => {
    const invalidData = {
      fullName: "Nguyễn Văn Nông",
      email: "nongdan@greenfarm.vn",
      password: "123",
    };

    const result = RegisterFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("ít nhất 6 ký tự");
    }
  });
});
