import { Router } from "express";
import { AtelierController } from "../controllers/atelier.controller.js";

const router = Router();

router.get("/", AtelierController.listAteliers);
router.get("/:id", AtelierController.getAtelierById);

export default router;
