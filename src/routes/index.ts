import { Router } from "express";
import authRoutes from "./auth.routes.js";
import artworkRoutes from "./artwork.routes.js";
import pledgeRoutes from "./pledge.routes.js";
import atelierRoutes from "./atelier.routes.js";
import aiRoutes from "./ai.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import uploadRoutes from "./upload.routes.js";
import { ApiResponse } from "../utils/apiResponse.js";

const apiRouter = Router();

// Health Check
apiRouter.get("/health", (req, res) => {
  ApiResponse.success(
    res,
    {
      status: "healthy",
      service: "custodian-ai-backend",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    },
    "Custodian Sanctuary Backend is operational"
  );
});

// Mount modules
apiRouter.use("/auth", authRoutes);
apiRouter.use("/artworks", artworkRoutes);
apiRouter.use("/pledges", pledgeRoutes);
apiRouter.use("/ateliers", atelierRoutes);
apiRouter.use("/ai", aiRoutes);
apiRouter.use("/dashboard", dashboardRoutes);
apiRouter.use("/uploads", uploadRoutes);

export default apiRouter;
