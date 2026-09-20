import { prisma } from "../config/db.js";
import { NotFoundError } from "../utils/appError.js";

export class AtelierService {
  static async listAteliers() {
    return prisma.atelier.findMany({
      orderBy: { name: "asc" },
    });
  }

  static async getAtelierById(id: string) {
    const atelier = await prisma.atelier.findUnique({
      where: { id },
    });

    if (!atelier) {
      throw new NotFoundError("Atelier not found");
    }

    return atelier;
  }
}
