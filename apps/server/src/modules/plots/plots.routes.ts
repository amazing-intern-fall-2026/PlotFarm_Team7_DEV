import { Router } from "express";
import { PlotsController } from "./plots.controller";

const router: Router = Router();

router.get("/", PlotsController.getPlots);
router.get("/:id", PlotsController.getPlotById);

export { router as plotsRoutes };
