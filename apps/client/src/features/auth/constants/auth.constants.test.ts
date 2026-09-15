import { describe, it, expect } from "vitest";
import {
  AUTH_VALIDATION,
  AUTH_VALIDATION_MESSAGES,
  AUTH_DEBOUNCE_MS,
} from "./auth.constants";

describe("auth.constants", () => {
  it("should have correct debounce interval", () => {
    expect(AUTH_DEBOUNCE_MS).toBe(400);
  });

  it("should validate email pattern correctly", () => {
    expect(AUTH_VALIDATION.EMAIL_REGEX.test("test@example.com")).toBe(true);
    expect(AUTH_VALIDATION.EMAIL_REGEX.test("user.name+tag@domain.co.vn")).toBe(
      true
    );
    expect(AUTH_VALIDATION.EMAIL_REGEX.test("invalid-email")).toBe(false);
    expect(AUTH_VALIDATION.EMAIL_REGEX.test("user@")).toBe(false);
    expect(AUTH_VALIDATION.EMAIL_REGEX.test("@domain.com")).toBe(false);
  });

  it("should provide required validation messages", () => {
    expect(AUTH_VALIDATION_MESSAGES.EMAIL_REQUIRED).toBe("Vui lòng nhập email.");
    expect(AUTH_VALIDATION_MESSAGES.EMAIL_INVALID).toBe("Email không hợp lệ.");
    expect(AUTH_VALIDATION_MESSAGES.PASSWORD_REQUIRED).toBe(
      "Vui lòng nhập mật khẩu."
    );
    expect(AUTH_VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH).toContain(
      String(AUTH_VALIDATION.PASSWORD_MIN_LENGTH)
    );
  });
});
