import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  // Operational App Errors
  if (err instanceof AppError) {
    ApiResponse.error(res, err.message, err.statusCode, err.errors);
    return;
  }

  // Zod Validation Errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    ApiResponse.error(res, "Validation failed", 400, formattedErrors);
    return;
  }

  // Prisma Unique Constraint Error
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const target = (err.meta?.target as string[]) || ["record"];
      ApiResponse.error(
        res,
        `A record with this ${target.join(", ")} already exists`,
        409
      );
      return;
    }
    if (err.code === "P2025") {
      ApiResponse.error(res, "Requested record was not found", 404);
      return;
    }
  }

  // Unhandled / Internal Server Errors
  console.error("💥 Unhandled Error:", err);

  const message =
    process.env.NODE_ENV === "production"
      ? "An internal server error occurred"
      : err.message || "Internal server error";

  ApiResponse.error(res, message, 500);
}
