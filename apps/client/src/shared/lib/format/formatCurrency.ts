/**
 * Định dạng số tiền thành chuỗi tiền tệ VNĐ (ví dụ: 150.000 ₫)
 */
export function formatCurrency(amount: number): string {
  if (typeof amount !== "number" || isNaN(amount)) return "0 ₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
