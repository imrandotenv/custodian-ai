import { prisma } from "../config/db.js";
import { ForbiddenError, NotFoundError } from "../utils/appError.js";
import { generateProvenanceHash } from "../utils/crypto.js";

export interface CreateArtworkInput {
  title: string;
  artForm: string;
  nativeDescription: string;
  englishDescription?: string;
  price: number;
  images: string[];
  consentRules: string[];
  giTagNumber?: string;
  originHamlet?: string;
  artisanName?: string;
}

export interface ListArtworksQuery {
  artForm?: string;
  region?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export class ArtworkService {
  static async createArtwork(custodianId: string, data: CreateArtworkInput) {
    const custodian = await prisma.user.findUnique({
      where: { id: custodianId },
    });

    if (!custodian) {
      throw new NotFoundError("Custodian user not found");
    }

    const artisanName = data.artisanName || custodian.name;
    const originHamlet = data.originHamlet || custodian.hamlet || "Jharkhand, India";
    const giTagNumber = data.giTagNumber || "JH-SOHRAI-2020";

    const provenanceHash = generateProvenanceHash({
      title: data.title,
      artForm: data.artForm,
      artisanName,
      giTagNumber,
      originHamlet,
      custodianId,
    });

    const artwork = await prisma.artwork.create({
      data: {
        title: data.title,
        artForm: data.artForm,
        nativeDescription: data.nativeDescription,
        englishDescription:
          data.englishDescription || data.nativeDescription,
        price: data.price,
        images: JSON.stringify(data.images),
        consentRules: JSON.stringify(data.consentRules),
        provenanceHash,
        giTagNumber,
        originHamlet,
        artisanName,
        custodianId,
        status: "AVAILABLE",
      },
      include: {
        custodian: {
          select: {
            id: true,
            name: true,
            hamlet: true,
            avatar: true,
            verifiedGI: true,
          },
        },
      },
    });

    return {
      ...artwork,
      images: JSON.parse(artwork.images) as string[],
      consentRules: JSON.parse(artwork.consentRules) as string[],
    };
  }

  static async listArtworks(query: ListArtworksQuery) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (query.artForm) {
      where.artForm = { contains: query.artForm };
    }

    if (query.region) {
      where.originHamlet = { contains: query.region };
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search } },
        { artForm: { contains: query.search } },
        { artisanName: { contains: query.search } },
        { nativeDescription: { contains: query.search } },
        { englishDescription: { contains: query.search } },
      ];
    }

    const [total, artworks] = await Promise.all([
      prisma.artwork.count({ where }),
      prisma.artwork.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          custodian: {
            select: {
              id: true,
              name: true,
              hamlet: true,
              avatar: true,
              verifiedGI: true,
            },
          },
        },
      }),
    ]);

    const formattedArtworks = artworks.map((item) => ({
      ...item,
      images: JSON.parse(item.images) as string[],
      consentRules: JSON.parse(item.consentRules) as string[],
    }));

    return {
      artworks: formattedArtworks,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getArtworkById(id: string) {
    const artwork = await prisma.artwork.findUnique({
      where: { id },
      include: {
        custodian: {
          select: {
            id: true,
            name: true,
            hamlet: true,
            bio: true,
            avatar: true,
            verifiedGI: true,
          },
        },
        pledges: {
          select: {
            id: true,
            createdAt: true,
            status: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          take: 10,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!artwork) {
      throw new NotFoundError("Artwork not found");
    }

    // Increment view counter
    await prisma.artwork.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return {
      ...artwork,
      views: artwork.views + 1,
      images: JSON.parse(artwork.images) as string[],
      consentRules: JSON.parse(artwork.consentRules) as string[],
    };
  }

  static async updateArtwork(
    id: string,
    userId: string,
    userRole: string,
    data: Partial<CreateArtworkInput> & { status?: string }
  ) {
    const artwork = await prisma.artwork.findUnique({ where: { id } });

    if (!artwork) {
      throw new NotFoundError("Artwork not found");
    }

    if (artwork.custodianId !== userId && userRole !== "admin") {
      throw new ForbiddenError("You can only edit your own catalogued artworks");
    }

    const updateData: Record<string, unknown> = {};
    if (data.title) updateData.title = data.title;
    if (data.artForm) updateData.artForm = data.artForm;
    if (data.nativeDescription) updateData.nativeDescription = data.nativeDescription;
    if (data.englishDescription) updateData.englishDescription = data.englishDescription;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.status) updateData.status = data.status;
    if (data.images) updateData.images = JSON.stringify(data.images);
    if (data.consentRules) updateData.consentRules = JSON.stringify(data.consentRules);

    const updated = await prisma.artwork.update({
      where: { id },
      data: updateData,
      include: {
        custodian: {
          select: {
            id: true,
            name: true,
            hamlet: true,
            avatar: true,
          },
        },
      },
    });

    return {
      ...updated,
      images: JSON.parse(updated.images) as string[],
      consentRules: JSON.parse(updated.consentRules) as string[],
    };
  }

  static async deleteArtwork(id: string, userId: string, userRole: string) {
    const artwork = await prisma.artwork.findUnique({ where: { id } });

    if (!artwork) {
      throw new NotFoundError("Artwork not found");
    }

    if (artwork.custodianId !== userId && userRole !== "admin") {
      throw new ForbiddenError("You can only delete your own catalogued artworks");
    }

    await prisma.artwork.delete({ where: { id } });
    return { id, deleted: true };
  }
}
