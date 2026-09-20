import { Router, Request, Response, NextFunction } from "express";
import { AiController } from "../controllers/ai.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  aiTranslateSchema,
  aiGenerateLoreSchema,
  aiChatSchema,
} from "../validators/ai.validator.js";
import { aiRateLimiter } from "../middlewares/rateLimiter.middleware.js";
import { verifyToken } from "../utils/jwt.js";
import { prisma } from "../config/db.js";

const router = Router();

// Optional authentication helper for AI chat so both logged-in and guest users can chat
async function optionalAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          role: true,
          name: true,
          verifiedGI: true,
        },
      });
      if (user) {
        req.user = user;
      }
    } catch {
      // Invalid token is ignored for optional auth
    }
  }
  next();
}

router.post(
  "/translate",
  aiRateLimiter,
  validate({ body: aiTranslateSchema }),
  AiController.translate
);

router.post(
  "/generate-lore",
  aiRateLimiter,
  validate({ body: aiGenerateLoreSchema }),
  AiController.generateLore
);

router.post(
  "/chat",
  aiRateLimiter,
  optionalAuthenticate,
  validate({ body: aiChatSchema }),
  AiController.chat
);

export default router;
