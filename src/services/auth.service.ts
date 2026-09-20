import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/appError.js";
import { generateToken } from "../utils/jwt.js";

export class AuthService {
  static async register(data: {
    name: string;
    email: string;
    password: string;
    role?: string;
    hamlet?: string;
    bio?: string;
  }) {
    const existing = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });

    if (existing) {
      throw new ConflictError("An account with this email already exists");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        passwordHash,
        role: data.role || "tourist",
        hamlet: data.hamlet,
        bio: data.bio,
        verifiedGI: data.role === "local",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        hamlet: true,
        bio: true,
        avatar: true,
        verifiedGI: true,
        createdAt: true,
      },
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }

  static async login(data: { email: string; password: string }) {
    const user = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(data.password, user.passwordHash);

    if (!isValidPassword) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        hamlet: user.hamlet,
        bio: user.bio,
        avatar: user.avatar,
        verifiedGI: user.verifiedGI,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  static async getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        hamlet: true,
        bio: true,
        avatar: true,
        verifiedGI: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  static async updateProfile(
    userId: string,
    data: { name?: string; hamlet?: string; bio?: string; avatar?: string }
  ) {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        hamlet: true,
        bio: true,
        avatar: true,
        verifiedGI: true,
        updatedAt: true,
      },
    });

    return user;
  }
}
