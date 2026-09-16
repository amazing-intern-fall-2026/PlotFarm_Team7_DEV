import { Router } from "express";
import { PaymentsController } from "./payments.controller";
import { WebhookController } from "./webhook.controller";
import { authGuard } from "../../middlewares/authGuard";
import { webhookGuard } from "../../middlewares/webhookGuard";

const router: Router = Router();

// Tạo payment order mới + sinh mã QR VietQR (yêu cầu đăng nhập, vai trò CUSTOMER)
router.post("/payments/create-qr", authGuard, PaymentsController.createQr);

// Tra cứu trạng thái đơn thanh toán phục vụ polling US-21
router.get("/payments/check-status/:orderCode", authGuard, PaymentsController.checkStatus);

// Webhook thật từ ngân hàng/SePay/Casso (xác thực bằng x-api-key)
router.post("/payments/webhook", webhookGuard, WebhookController.handleWebhook);

// Webhook giả lập phục vụ demo (yêu cầu đăng nhập, chủ đơn hoặc ADMIN)
router.post("/payments/mock-webhook", authGuard, WebhookController.mockWebhook);

export { router as paymentsRouter };
