import { Response } from "express";

export interface ApiResponsePayload<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
  errors?: unknown;
}

export class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message = "Operation successful",
    statusCode = 200,
    meta?: Record<string, unknown>
  ): Response {
    const payload: ApiResponsePayload<T> = {
      success: true,
      message,
      data,
      ...(meta ? { meta } : {}),
    };
    return res.status(statusCode).json(payload);
  }

  static created<T>(
    res: Response,
    data: T,
    message = "Resource created successfully",
    meta?: Record<string, unknown>
  ): Response {
    return this.success(res, data, message, 201, meta);
  }

  static error(
    res: Response,
    message = "An error occurred",
    statusCode = 500,
    errors?: unknown
  ): Response {
    const payload: ApiResponsePayload = {
      success: false,
      message,
      ...(errors !== undefined ? { errors } : {}),
    };
    return res.status(statusCode).json(payload);
  }
}
