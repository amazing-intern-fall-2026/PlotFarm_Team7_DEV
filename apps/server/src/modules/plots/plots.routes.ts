import { Router } from "express";
import { PlotsController } from "./plots.controller";
import { authGuard } from "../../middlewares/authGuard";
import { requireRole } from "../../middlewares/roleGuard";

const router: Router = Router();

router.get("/", PlotsController.getPlots);
router.get("/:id", PlotsController.getPlotById);

// US-14: Hold lock 10 phút chống đặt trùng ô đất
router.post("/:id/hold", authGuard, requireRole("CUSTOMER"), PlotsController.holdPlot);
router.post("/:id/release-hold", authGuard, PlotsController.releaseHoldPlot);

export { router as plotsRoutes };

