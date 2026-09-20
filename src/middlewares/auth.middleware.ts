import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/appError.js";
import { verifyToken, JwtPayload } from "../utils/jwt.js";
import { prisma } from "../config/db.js";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
  name: string;
  verifiedGI: boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Authentication token is missing or malformed");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new UnauthorizedError("Authentication token is missing");
    }

    let decoded: JwtPayload;
    try {
      decoded = verifyToken(token);
    } catch {
      throw new UnauthorizedError("Invalid or expired authentication token");
    }

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

    if (!user) {
      throw new UnauthorizedError("User account no longer exists");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
