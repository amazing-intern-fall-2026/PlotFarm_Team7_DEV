import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { errorHandler } from "./middlewares/errorHandler";
import { authRoutes } from "./modules/auth/auth.routes";
import { plotsRoutes } from "./modules/plots/plots.routes";
import { cropsRoutes } from "./modules/crops/crops.routes";
import { gatewayController } from "./modules/gateway/gateway.controller";

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: "ok",
      service: "plot-farm-server",
      message: "Server ready for module implementations.",
    },
  });
});

import fs from "fs";
import { paymentsRouter } from "./modules/payments/payments.routes";

const openApiPath = fs.existsSync(path.join(__dirname, "docs/openapi.yaml"))
  ? path.join(__dirname, "docs/openapi.yaml")
  : path.join(__dirname, "../src/docs/openapi.yaml");

if (fs.existsSync(openApiPath)) {
  const openApiDocument = YAML.load(openApiPath);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/v1", paymentsRouter);
app.use("/api/v1/plots", plotsRoutes);
app.use("/api/plots", plotsRoutes);
app.use("/api/v1/crops", cropsRoutes);
app.use("/api/crops", cropsRoutes);
app.get(["/api/v1/telemetry/hero", "/api/telemetry/hero"], (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      location: "Ô đất nông trại",
      areaM2: 12500,
      humidity: 76,
      temperature: 19.4,
      sensorStatus: "Hoạt động tối ưu",
      scenes: [
        { id: "01", name: "01. Ô Đất Canh Tác", active: true },
        { id: "02", name: "02. Chăm Gốc Nông ...", active: false },
        { id: "03", name: "03. Mùa Vụ Bội Thu", active: false },
        { id: "04", name: "04. Sinh Thái Tuần Hoàn", active: false },
      ],
    },
  });
});
app.post("/api/gateway", gatewayController);



// Centralized Global Error Handler Middleware (MUST be placed after all routes)
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export { app };
