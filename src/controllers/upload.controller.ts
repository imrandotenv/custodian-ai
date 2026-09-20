import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/apiResponse.js";
import { BadRequestError } from "../utils/appError.js";

export class UploadController {
  static async uploadSingle(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new BadRequestError("No image file was uploaded");
      }

      const fileUrl = `/uploads/${req.file.filename}`;

      return ApiResponse.created(
        res,
        {
          filename: req.file.filename,
          originalName: req.file.originalname,
          size: req.file.size,
          mimetype: req.file.mimetype,
          url: fileUrl,
        },
        "Image uploaded successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  static async uploadMultiple(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        throw new BadRequestError("No image files were uploaded");
      }

      const uploadedFiles = files.map((file) => ({
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        url: `/uploads/${file.filename}`,
      }));

      return ApiResponse.created(
        res,
        { files: uploadedFiles, count: uploadedFiles.length },
        "Images uploaded successfully"
      );
    } catch (error) {
      next(error);
    }
  }
}
