import { Request, Response, NextFunction } from "express";
import { AiService } from "../services/ai.service.js";
import { ApiResponse } from "../utils/apiResponse.js";

export class AiController {
  static async translate(req: Request, res: Response, next: NextFunction) {
    try {
      const { text, from, to } = req.body;
      const result = await AiService.translate(text, from, to);
      return ApiResponse.success(res, result, "Cultural translation completed");
    } catch (error) {
      next(error);
    }
  }

  static async generateLore(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AiService.generateLore(req.body);
      return ApiResponse.success(
        res,
        result,
        "Museum-grade editorial lore generated"
      );
    } catch (error) {
      next(error);
    }
  }

  static async chat(req: Request, res: Response, next: NextFunction) {
    try {
      const { message, conversationHistory } = req.body;
      const userId = req.user?.id;
      const result = await AiService.chat(userId, message, conversationHistory);
      return ApiResponse.success(
        res,
        result,
        "Sanctuary guide response generated"
      );
    } catch (error) {
      next(error);
    }
  }
}
