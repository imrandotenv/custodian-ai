import { Request, Response, NextFunction } from "express";
import { ArtworkService } from "../services/artwork.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { UnauthorizedError } from "../utils/appError.js";

export class ArtworkController {
  static async createArtwork(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new UnauthorizedError("Authentication required");
      }
      const artwork = await ArtworkService.createArtwork(req.user.id, req.body);
      return ApiResponse.created(
        res,
        artwork,
        "Artwork published and anchored on the sovereign heritage registry"
      );
    } catch (error) {
      next(error);
    }
  }

  static async listArtworks(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ArtworkService.listArtworks(req.query);
      return ApiResponse.success(
        res,
        result.artworks,
        "Artworks catalog retrieved successfully",
        200,
        { pagination: result.pagination }
      );
    } catch (error) {
      next(error);
    }
  }

  static async getArtworkById(req: Request, res: Response, next: NextFunction) {
    try {
      const artwork = await ArtworkService.getArtworkById(req.params.id);
      return ApiResponse.success(res, artwork, "Artwork details retrieved");
    } catch (error) {
      next(error);
    }
  }

  static async updateArtwork(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new UnauthorizedError("Authentication required");
      }
      const artwork = await ArtworkService.updateArtwork(
        req.params.id,
        req.user.id,
        req.user.role,
        req.body
      );
      return ApiResponse.success(res, artwork, "Artwork updated successfully");
    } catch (error) {
      next(error);
    }
  }

  static async deleteArtwork(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new UnauthorizedError("Authentication required");
      }
      const result = await ArtworkService.deleteArtwork(
        req.params.id,
        req.user.id,
        req.user.role
      );
      return ApiResponse.success(res, result, "Artwork removed from catalog");
    } catch (error) {
      next(error);
    }
  }
}
