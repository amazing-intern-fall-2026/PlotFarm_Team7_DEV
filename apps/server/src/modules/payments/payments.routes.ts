import { Router } from "express";
import { PaymentsController } from "./payments.controller";

const router: Router = Router();

// Tạo payment order mới + sinh mã QR VietQR
router.post("/payments", PaymentsController.createPaymentOrder);

export { router as paymentsRouter };
