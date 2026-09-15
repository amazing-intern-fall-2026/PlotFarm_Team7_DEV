import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { debounce } from "./useDebouncedCallback";

describe("debounce utility", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("không thực thi hàm callback ngay lập tức khi vừa gọi", () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 400);

    debouncedFn("a");

    expect(fn).not.toHaveBeenCalled();
  });

  it("thực thi đúng sau khoảng thời gian delayMs (400ms)", () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 400);

    debouncedFn("test");

    // Tiến tới 350ms (chưa đủ 400ms)
    vi.advanceTimersByTime(350);
    expect(fn).not.toHaveBeenCalled();

    // Tiến thêm 50ms nữa -> tròn 400ms
    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("test");
  });

  it("chỉ thực thi 1 lần với đối số mới nhất khi gọi liên tục nhiều lần (debounce)", () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 400);

    // Người dùng gõ 'a', 'b', 'c' liên tục cách nhau 100ms
    debouncedFn("a");
    vi.advanceTimersByTime(100);

    debouncedFn("b");
    vi.advanceTimersByTime(100);

    debouncedFn("c");
    vi.advanceTimersByTime(100);

    // Chưa đủ 400ms tính từ lần gõ cuối 'c'
    expect(fn).not.toHaveBeenCalled();

    // Đợi đủ 300ms còn lại từ lần gõ cuối 'c'
    vi.advanceTimersByTime(300);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("c");
  });

  it("huỷ lệnh thực thi khi gọi phương thức cancel()", () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 400);

    debouncedFn("pending");
    debouncedFn.cancel();

    // Vượt quá 400ms nhưng đã cancel nên không được gọi
    vi.advanceTimersByTime(500);
    expect(fn).not.toHaveBeenCalled();
  });
});
