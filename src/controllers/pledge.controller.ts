import { Request, Response, NextFunction } from "express";
import { PledgeService } from "../services/pledge.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { UnauthorizedError } from "../utils/appError.js";

export class PledgeController {
  static async createPledge(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new UnauthorizedError("Authentication required to make a sacred pledge");
      }
      const pledge = await PledgeService.createPledge(req.user.id, req.body);
      return ApiResponse.created(
        res,
        pledge,
        "Sacred Smart Consent pledge recorded and cryptographically sealed"
      );
    } catch (error) {
      next(error);
    }
  }

  static async getUserPledges(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new UnauthorizedError("Authentication required");
      }
      const pledges = await PledgeService.getUserPledges(req.user.id);
      return ApiResponse.success(
        res,
        pledges,
        "Your recorded customary consent pledges"
      );
    } catch (error) {
      next(error);
    }
  }

  static async getArtworkPledges(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new UnauthorizedError("Authentication required");
      }
      const pledges = await PledgeService.getArtworkPledges(
        req.params.artworkId,
        req.user.id,
        req.user.role
      );
      return ApiResponse.success(res, pledges, "Pledges for this artifact");
    } catch (error) {
      next(error);
    }
  }

  static async verifySignature(req: Request, res: Response, next: NextFunction) {
    try {
      const verification = await PledgeService.verifySignature(
        req.params.signature
      );
      return ApiResponse.success(
        res,
        verification,
        "Sacred Consent cryptographic signature verified"
      );
    } catch (error) {
      next(error);
    }
  }
}
