import { Router } from "express";
import { uploadMedia } from "./media.controller";

export const mediaRouter: Router = Router();

mediaRouter.post("/media/upload", uploadMedia);
