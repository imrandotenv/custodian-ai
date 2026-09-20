import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
} from "../validators/auth.validator.js";
import { authRateLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = Router();

router.post(
  "/register",
  authRateLimiter,
  validate({ body: registerSchema }),
  AuthController.register
);

router.post(
  "/login",
  authRateLimiter,
  validate({ body: loginSchema }),
  AuthController.login
);

router.post("/logout", authenticate, AuthController.logout);

router.get("/me", authenticate, AuthController.getCurrentUser);

router.put(
  "/profile",
  authenticate,
  validate({ body: updateProfileSchema }),
  AuthController.updateProfile
);

export default router;
