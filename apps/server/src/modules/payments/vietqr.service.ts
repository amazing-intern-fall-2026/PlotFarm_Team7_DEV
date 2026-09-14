const VIETQR_BANK_ID = process.env.VIETQR_BANK_ID || "";
const VIETQR_BANK_NAME = process.env.VIETQR_BANK_NAME || "";
const VIETQR_ACCOUNT_NO = process.env.VIETQR_ACCOUNT_NO || "";
const VIETQR_ACCOUNT_NAME = process.env.VIETQR_ACCOUNT_NAME || "";
const VIETQR_TEMPLATE = process.env.VIETQR_TEMPLATE || "compact2";

export interface BankInfo {
  bankId: string;
  bankName: string;
  accountNo: string;
  accountName: string;
}

export class VietQRService {
  static getBankInfo(): BankInfo {
    return {
      bankId: VIETQR_BANK_ID,
      bankName: VIETQR_BANK_NAME,
      accountNo: VIETQR_ACCOUNT_NO,
      accountName: VIETQR_ACCOUNT_NAME,
    };
  }

  /**
   * Sinh link ảnh QR VietQR chuẩn Napas 24/7 qua Open API (https://vietqr.io/).
   * URLSearchParams tự động mã hoá an toàn ký tự đặc biệt trong tên chủ tài khoản.
   */
  static buildQrImageUrl(amount: number, addInfo: string): string {
    const params = new URLSearchParams({
      amount: String(amount),
      addInfo,
      accountName: VIETQR_ACCOUNT_NAME,
    });

    return `https://img.vietqr.io/image/${VIETQR_BANK_ID}-${VIETQR_ACCOUNT_NO}-${VIETQR_TEMPLATE}.jpg?${params.toString()}`;
  }
}
