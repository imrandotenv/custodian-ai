import { Router } from "express";
import { PledgeController } from "../controllers/pledge.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createPledgeSchema } from "../validators/pledge.validator.js";

const router = Router();

// Public cryptographic verification of a customary consent proof
router.get("/verify/:signature", PledgeController.verifySignature);

// Protected: Pledging requires authentication
router.post(
  "/",
  authenticate,
  validate({ body: createPledgeSchema }),
  PledgeController.createPledge
);

// Protected: Get current user's active pledges
router.get("/my", authenticate, PledgeController.getUserPledges);

// Protected: Get pledges for a specific artwork
router.get(
  "/artwork/:artworkId",
  authenticate,
  PledgeController.getArtworkPledges
);

export default router;
