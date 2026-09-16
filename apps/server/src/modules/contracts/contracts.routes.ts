import { Router } from "express";
import { ContractsController } from "./contracts.controller";
import { authGuard } from "../../middlewares/authGuard";

const router: Router = Router();

// POST /api/v1/contracts (yêu cầu đăng nhập, vai trò CUSTOMER)
router.post("/", authGuard, ContractsController.createContract);

export { router as contractsRoutes };
