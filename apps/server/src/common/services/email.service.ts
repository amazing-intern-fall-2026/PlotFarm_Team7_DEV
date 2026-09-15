import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "re_dummy_key";
const EMAIL_FROM = process.env.EMAIL_FROM || "Green Farm <onboarding@resend.dev>";

const resend = new Resend(RESEND_API_KEY);

export class EmailService {
  /**
   * Gửi email chứa mã OTP xác thực người dùng qua Resend API
   */
  static async sendOtpEmail(toEmail: string, otpCode: string): Promise<boolean> {
    try {
      const { data, error } = await resend.emails.send({
        from: EMAIL_FROM,
        to: [toEmail],
        subject: "[Green Farm] Mã xác thực tài khoản của bạn",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
            <h2 style="color: #2e7d32; margin-top: 0;">Xác nhận địa chỉ Email</h2>
            <p>Xin chào,</p>
            <p>Cảm ơn bạn đã sử dụng dịch vụ tại <b>Green Farm</b>. Mã OTP xác thực email của bạn là:</p>
            <div style="text-align: center; margin: 32px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2e7d32; background-color: #e8f5e9; padding: 14px 28px; border-radius: 8px; display: inline-block;">${otpCode}</span>
            </div>
            <p>Mã OTP này có hiệu lực trong vòng <b>5 phút</b>. Vui lòng không tiết lộ mã này cho bất kỳ ai vì lý do bảo mật.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <p style="font-size: 12px; color: #777;">Nếu bạn không thực hiện yêu cầu này, bạn có thể an tâm bỏ qua email này.</p>
          </div>
        `,
      });

      if (error) {
        console.error("[EmailService Error]", error);
        return false;
      }

      console.log("[EmailService Success] Sent OTP email id:", data?.id);
      return true;
    } catch (err) {
      console.error("[EmailService Exception]", err);
      return false;
    }
  }
}
