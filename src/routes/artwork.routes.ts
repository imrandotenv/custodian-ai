import { Router } from "express";
import { ArtworkController } from "../controllers/artwork.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createArtworkSchema,
  updateArtworkSchema,
  listArtworksQuerySchema,
} from "../validators/artwork.validator.js";

const router = Router();

router.get(
  "/",
  validate({ query: listArtworksQuerySchema }),
  ArtworkController.listArtworks
);

router.get("/:id", ArtworkController.getArtworkById);

// Protected: Only Master Custodians (local) or Admins can catalog artworks
router.post(
  "/",
  authenticate,
  authorize("local", "admin"),
  validate({ body: createArtworkSchema }),
  ArtworkController.createArtwork
);

router.put(
  "/:id",
  authenticate,
  authorize("local", "admin"),
  validate({ body: updateArtworkSchema }),
  ArtworkController.updateArtwork
);

router.delete(
  "/:id",
  authenticate,
  authorize("local", "admin"),
  ArtworkController.deleteArtwork
);

export default router;
