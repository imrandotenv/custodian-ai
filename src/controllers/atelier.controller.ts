import { Request, Response, NextFunction } from "express";
import { AtelierService } from "../services/atelier.service.js";
import { ApiResponse } from "../utils/apiResponse.js";

export class AtelierController {
  static async listAteliers(req: Request, res: Response, next: NextFunction) {
    try {
      const ateliers = await AtelierService.listAteliers();
      return ApiResponse.success(
        res,
        ateliers,
        "Living territorial atelier coordinates retrieved"
      );
    } catch (error) {
      next(error);
    }
  }

  static async getAtelierById(req: Request, res: Response, next: NextFunction) {
    try {
      const atelier = await AtelierService.getAtelierById(req.params.id);
      return ApiResponse.success(res, atelier, "Atelier details retrieved");
    } catch (error) {
      next(error);
    }
  }
}
