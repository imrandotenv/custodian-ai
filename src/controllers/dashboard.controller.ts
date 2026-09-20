import { Request, Response, NextFunction } from "express";
import { DashboardService } from "../services/dashboard.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { UnauthorizedError } from "../utils/appError.js";

export class DashboardController {
  static async getArtisanStats(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new UnauthorizedError("Authentication required");
      }
      const stats = await DashboardService.getArtisanStats(req.user.id);
      return ApiResponse.success(
        res,
        stats,
        "Artisan dashboard statistics retrieved"
      );
    } catch (error) {
      next(error);
    }
  }
}
