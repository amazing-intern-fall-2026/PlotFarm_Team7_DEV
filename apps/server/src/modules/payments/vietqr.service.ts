export interface BankInfo {
  bankId: string;
  bankName: string;
  accountNo: string;
  accountName: string;
}

export class VietQRService {
  static getBankInfo(): BankInfo {
    return {
      bankId: process.env.VIETQR_BANK_ID || "",
      bankName: process.env.VIETQR_BANK_NAME || "",
      accountNo: process.env.VIETQR_ACCOUNT_NO || "",
      accountName: process.env.VIETQR_ACCOUNT_NAME || "",
    };
  }

  /**
   * Sinh link ảnh QR VietQR chuẩn Napas 24/7 qua Open API (https://vietqr.io/).
   * URLSearchParams tự động mã hoá an toàn ký tự đặc biệt trong tên chủ tài khoản.
   */
  static buildQrImageUrl(amount: number, addInfo: string): string {
    const bankId = process.env.VIETQR_BANK_ID || "";
    const accountNo = process.env.VIETQR_ACCOUNT_NO || "";
    const accountName = process.env.VIETQR_ACCOUNT_NAME || "";
    const template = process.env.VIETQR_TEMPLATE || "compact2";

    const params = new URLSearchParams({
      amount: String(amount),
      addInfo,
      accountName,
    });

    return `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.jpg?${params.toString()}`;
  }
}
