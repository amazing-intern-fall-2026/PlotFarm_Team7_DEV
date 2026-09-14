import { Router } from "express";
import { PaymentsController } from "./payments.controller";
import { authGuard } from "../../middlewares/authGuard";

const router: Router = Router();

// Tạo payment order mới + sinh mã QR VietQR (yêu cầu đăng nhập, vai trò CUSTOMER)
router.post("/payments/create-qr", authGuard, PaymentsController.createQr);

export { router as paymentsRouter };
