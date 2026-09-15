import { Router } from "express";
import { CareController } from "./care.controller";
import { authGuard } from "../../middlewares/authGuard";

export const careRouter: Router = Router();

careRouter.post(
  "/contracts/:id/care-requests",
  authGuard,
  CareController.createCareRequest,
);
careRouter.get(
  "/contracts/:id/care-requests",
  authGuard,
  CareController.getCareRequests,
);
