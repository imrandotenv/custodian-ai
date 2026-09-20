import { Router } from "express";
import { UploadController } from "../controllers/upload.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

// Upload single artifact photo (protected: local custodian or admin)
router.post(
  "/single",
  authenticate,
  authorize("local", "admin"),
  upload.single("image"),
  UploadController.uploadSingle
);

// Upload multiple artifact photos (max 5 photos at once)
router.post(
  "/multiple",
  authenticate,
  authorize("local", "admin"),
  upload.array("images", 5),
  UploadController.uploadMultiple
);

export default router;
