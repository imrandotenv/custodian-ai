import { prisma } from "../config/db.js";

export class DashboardService {
  static async getArtisanStats(custodianId: string) {
    const [artworks, totalPledgesCount] = await Promise.all([
      prisma.artwork.findMany({
        where: { custodianId },
        select: {
          id: true,
          title: true,
          price: true,
          views: true,
          pledgeCount: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.pledge.count({
        where: {
          artwork: {
            custodianId,
          },
        },
      }),
    ]);

    const activeListingsCount = artworks.filter(
      (a) => a.status === "AVAILABLE"
    ).length;

    const totalViews = artworks.reduce((acc, curr) => acc + curr.views, 0);

    // 100% direct remuneration estimation (active potential + reserved)
    const directRemunerationPotential = artworks.reduce(
      (acc, curr) => acc + curr.price,
      0
    );

    // Recent 5 pledges for custodian's works
    const recentPledges = await prisma.pledge.findMany({
      where: {
        artwork: {
          custodianId,
        },
      },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
        artwork: {
          select: {
            title: true,
            price: true,
          },
        },
      },
    });

    return {
      activeListingsCount,
      totalListingsCount: artworks.length,
      totalPledgesCount,
      totalViews,
      directRemunerationPotential,
      commissionRate: "0% (100% Direct to Custodian)",
      recentPledges: recentPledges.map((p) => ({
        id: p.id,
        travelerName: p.user.name,
        artworkTitle: p.artwork.title,
        price: p.artwork.price,
        status: p.status,
        timestamp: p.createdAt,
      })),
    };
  }
}
