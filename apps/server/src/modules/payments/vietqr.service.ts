const VIETQR_BANK_ID = process.env.VIETQR_BANK_ID || "";
const VIETQR_ACCOUNT_NO = process.env.VIETQR_ACCOUNT_NO || "";
const VIETQR_ACCOUNT_NAME = process.env.VIETQR_ACCOUNT_NAME || "";
const VIETQR_TEMPLATE = process.env.VIETQR_TEMPLATE || "compact2";
interface VietQRApiResponse {
  code: string;
  desc: string;
  data?: {
    qrCode: string;
    qrDataURL: string;
  };
}

interface GenerateQrInput {
  amount: number;
  addInfo: string;
}

interface GenerateQrResult {
  qrContent: string;
  qrImage: string;
}

export class VietQRService {
  /**
   * Gọi VietQR Open API (https://vietqr.io/) để sinh mã QR động chuẩn Napas 24/7
   */
  static async generateQr({
    amount,
    addInfo,
  }: GenerateQrInput): Promise<GenerateQrResult> {
    try {
      const response = await fetch("https://api.vietqr.io/v2/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountNo: VIETQR_ACCOUNT_NO,
          accountName: VIETQR_ACCOUNT_NAME,
          acqId: VIETQR_BANK_ID,
          amount,
          addInfo,
          template: VIETQR_TEMPLATE,
        }),
      });

      const json = (await response.json()) as VietQRApiResponse;

      if (!response.ok || json.code !== "00" || !json.data) {
        console.error("[VietQRService Error]", json);
        throw new Error(json.desc || "Không thể sinh mã QR VietQR");
      }

      const qrImage = `https://api.vietqr.io/image/${VIETQR_BANK_ID}-${VIETQR_ACCOUNT_NO}-${VIETQR_TEMPLATE}.jpg?amount=${amount}&addInfo=${encodeURIComponent(addInfo)}`;

      return {
        qrContent: json.data.qrCode,
        qrImage,
      };
    } catch (err) {
      console.error("[VietQRService Exception]", err);
      throw err;
    }
  }
}
