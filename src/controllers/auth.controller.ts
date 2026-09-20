import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { UnauthorizedError } from "../utils/appError.js";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.register(req.body);
      return ApiResponse.created(
        res,
        result,
        "Account registered successfully in the sanctuary"
      );
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);
      return ApiResponse.success(res, result, "Login successful");
    } catch (error) {
      next(error);
    }
  }

  static async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new UnauthorizedError("Authentication required");
      }
      const user = await AuthService.getCurrentUser(req.user.id);
      return ApiResponse.success(res, user, "User profile retrieved");
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new UnauthorizedError("Authentication required");
      }
      const updated = await AuthService.updateProfile(req.user.id, req.body);
      return ApiResponse.success(res, updated, "Profile updated successfully");
    } catch (error) {
      next(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async logout(req: Request, res: Response, next: NextFunction) {
    // For stateless JWT, clearing client-side token completes logout
    return ApiResponse.success(
      res,
      { loggedOut: true },
      "Logged out successfully"
    );
  }
}
