import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = Router();

// Master Custodian Command Center Stats
router.get(
  "/artisan-stats",
  authenticate,
  authorize("local", "admin"),
  DashboardController.getArtisanStats
);

export default router;
