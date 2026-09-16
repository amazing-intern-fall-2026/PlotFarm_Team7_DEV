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

    vi.advanceTimersByTime(350);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("test");
  });

  it("chỉ thực thi 1 lần với đối số mới nhất khi gọi liên tục nhiều lần (debounce)", () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 400);

    debouncedFn("a");
    vi.advanceTimersByTime(100);

    debouncedFn("b");
    vi.advanceTimersByTime(100);

    debouncedFn("c");
    vi.advanceTimersByTime(100);

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("c");
  });

  it("huỷ lệnh thực thi khi gọi phương thức cancel()", () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 400);

    debouncedFn("pending");
    debouncedFn.cancel();

    vi.advanceTimersByTime(500);
    expect(fn).not.toHaveBeenCalled();
  });
});
