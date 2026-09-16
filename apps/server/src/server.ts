import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { errorHandler } from "./middlewares/errorHandler";
import { authRoutes } from "./modules/auth/auth.routes";
import { mediaRouter } from "./modules/media/media.routes";
import { diaryRouter } from "./modules/diary/diary.routes";
import { plotsRoutes } from "./modules/plots/plots.routes";
import { gatewayController } from "./modules/gateway/gateway.controller";

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Public Health Check Endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

import fs from "fs";
import { paymentsRouter } from "./modules/payments/payments.routes";
import { initPlotLockCron } from "./modules/plots/plots.cron";

const openApiPath = fs.existsSync(path.join(__dirname, "docs/openapi.yaml"))
  ? path.join(__dirname, "docs/openapi.yaml")
  : path.join(__dirname, "../src/docs/openapi.yaml");

if (fs.existsSync(openApiPath)) {
  const openApiDocument = YAML.load(openApiPath);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", paymentsRouter);
app.use("/api/v1/plots", plotsRoutes);
app.use("/api/v1", mediaRouter);
app.use("/api/v1", diaryRouter);
app.post("/api/gateway", gatewayController);
// Centralized Global Error Handler Middleware (MUST be placed after all routes)
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  initPlotLockCron();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export { app };

