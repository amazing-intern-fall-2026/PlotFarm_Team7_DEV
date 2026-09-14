/**
 * Định dạng ngày giờ theo chuẩn locale tiếng Việt (vi-VN).
 */
export function formatDate(
  date: string | number | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!date) return "";
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";

  return new Intl.DateTimeFormat(
    "vi-VN",
    options ?? {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  ).format(d);
}

/**
 * Định dạng cả ngày và giờ (ví dụ: 14:30 14/09/2026).
 */
export function formatDateTime(date: string | number | Date): string {
  return formatDate(date, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
