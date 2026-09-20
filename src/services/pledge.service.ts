import { prisma } from "../config/db.js";
import { ForbiddenError, NotFoundError } from "../utils/appError.js";
import { generatePledgeSignature } from "../utils/crypto.js";

export interface CreatePledgeInput {
  artworkId: string;
  acceptedRules: string[];
  depositAmount?: number;
}

export class PledgeService {
  static async createPledge(userId: string, data: CreatePledgeInput) {
    const artwork = await prisma.artwork.findUnique({
      where: { id: data.artworkId },
    });

    if (!artwork) {
      throw new NotFoundError("Artwork not found");
    }

    const digitalSignature = generatePledgeSignature(
      userId,
      data.artworkId,
      data.acceptedRules
    );

    // Create pledge and update artwork pledge count atomically
    const [pledge] = await prisma.$transaction([
      prisma.pledge.create({
        data: {
          userId,
          artworkId: data.artworkId,
          acceptedRules: JSON.stringify(data.acceptedRules),
          digitalSignature,
          depositAmount: data.depositAmount || 0,
          status: "ACTIVE",
        },
        include: {
          artwork: {
            select: {
              id: true,
              title: true,
              artForm: true,
              price: true,
              originHamlet: true,
              artisanName: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.artwork.update({
        where: { id: data.artworkId },
        data: { pledgeCount: { increment: 1 } },
      }),
    ]);

    return {
      ...pledge,
      acceptedRules: JSON.parse(pledge.acceptedRules) as string[],
      verificationUrl: `/api/v1/pledges/verify/${pledge.digitalSignature}`,
    };
  }

  static async getUserPledges(userId: string) {
    const pledges = await prisma.pledge.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        artwork: {
          select: {
            id: true,
            title: true,
            artForm: true,
            price: true,
            images: true,
            artisanName: true,
            originHamlet: true,
          },
        },
      },
    });

    return pledges.map((p) => ({
      ...p,
      acceptedRules: JSON.parse(p.acceptedRules) as string[],
      artwork: {
        ...p.artwork,
        images: JSON.parse(p.artwork.images) as string[],
      },
    }));
  }

  static async getArtworkPledges(
    artworkId: string,
    userId: string,
    userRole: string
  ) {
    const artwork = await prisma.artwork.findUnique({
      where: { id: artworkId },
    });

    if (!artwork) {
      throw new NotFoundError("Artwork not found");
    }

    if (artwork.custodianId !== userId && userRole !== "admin") {
      throw new ForbiddenError(
        "You can only inspect pledges for your own artworks"
      );
    }

    const pledges = await prisma.pledge.findMany({
      where: { artworkId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            hamlet: true,
            avatar: true,
          },
        },
      },
    });

    return pledges.map((p) => ({
      ...p,
      acceptedRules: JSON.parse(p.acceptedRules) as string[],
    }));
  }

  static async verifySignature(signature: string) {
    const pledge = await prisma.pledge.findUnique({
      where: { digitalSignature: signature },
      include: {
        artwork: {
          select: {
            id: true,
            title: true,
            artForm: true,
            giTagNumber: true,
            artisanName: true,
            originHamlet: true,
            provenanceHash: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    });

    if (!pledge) {
      throw new NotFoundError(
        "No customary consent pledge matching this cryptographic signature was found"
      );
    }

    return {
      verified: true,
      pledgeId: pledge.id,
      signedAt: pledge.createdAt,
      status: pledge.status,
      signatory: pledge.user.name,
      artwork: pledge.artwork,
      acceptedRules: JSON.parse(pledge.acceptedRules) as string[],
      digitalSignature: pledge.digitalSignature,
    };
  }
}
