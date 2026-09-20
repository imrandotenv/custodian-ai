import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

function generateProvenanceHash(payload: object): string {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(payload) + Date.now().toString())
    .digest("hex");
}

async function main() {
  console.log("🌱 Starting Custodian-AI Database Seeding...");

  // Clean existing records
  await prisma.chatMessage.deleteMany();
  await prisma.pledge.deleteMany();
  await prisma.artwork.deleteMany();
  await prisma.atelier.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("SacredCustodian2026!", 10);

  // 1. Create Master Custodians & Users
  const muniDevi = await prisma.user.create({
    data: {
      name: "Muni Devi",
      email: "muni.devi@custodian.sanctuary",
      passwordHash,
      role: "local",
      hamlet: "Hazaribagh, Jharkhand",
      bio: "Master custodian of the Sohrai Khovar ritual comb-cut mud murals. Guardian of indigenous Dudhi clay traditions.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      verifiedGI: true,
    },
  });

  const guruSomra = await prisma.user.create({
    data: {
      name: "Guru Somra Hembrom",
      email: "somra.hembrom@custodian.sanctuary",
      passwordHash,
      role: "local",
      hamlet: "Purulia, West Bengal",
      bio: "Living custodian of the lost-wax Dokra metallurgy and Santhali creation lore.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      verifiedGI: true,
    },
  });

  const demoTraveler = await prisma.user.create({
    data: {
      name: "Devon Vance",
      email: "traveler@example.com",
      passwordHash,
      role: "tourist",
      hamlet: "San Francisco, USA",
      bio: "Ethno-archaeology collector and respectful visitor to indigenous sovereign ateliers.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      verifiedGI: false,
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Sanctuary Elder Admin",
      email: "admin@custodian.sanctuary",
      passwordHash,
      role: "admin",
      hamlet: "Ranchi, Jharkhand",
      bio: "Overseer of ethical registry compliance and GI credential validation.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      verifiedGI: true,
    },
  });

  console.log("✅ Seeded Users (Master Artisans, Traveler, Admin)");

  // 2. Seed Living Ateliers (Abstract Territorial Map Radar Coordinates)
  const ateliersData = [
    {
      name: "Hazaribagh Plateau Atelier",
      region: "North Chota Nagpur, Jharkhand",
      latitude: 23.99,
      longitude: 85.36,
      elevation: "610m",
      masterLineage: "Muni Devi Sohrai Lineage",
      giTag: "JH-SOHRAI-2020",
      geologicalNotes: "Rich in volcanic Dudhi kaolin clay and deep black manganese river mud.",
      activeArtisans: 18,
    },
    {
      name: "Purulia Hills Foundry",
      region: "Ajodhya Hills, West Bengal",
      latitude: 23.33,
      longitude: 86.36,
      elevation: "670m",
      masterLineage: "Somra Hembrom Dokra Guild",
      giTag: "WB-DOKRA-2018",
      geologicalNotes: "Iron-rich laterite soils with ancient beeswax lost-wax pit kilns.",
      activeArtisans: 24,
    },
    {
      name: "Dumka Sacred Grove Sanctuary",
      region: "Santhal Parganas, Jharkhand",
      latitude: 24.27,
      longitude: 87.25,
      elevation: "450m",
      masterLineage: "Santhal Jaherthan Keepers",
      giTag: "JH-SANTHAL-2021",
      geologicalNotes: "Natural terracotta ochre deposits beneath Shorea robusta sal canopies.",
      activeArtisans: 12,
    },
    {
      name: "Mayurbhanj Bell-Metal Enclave",
      region: "Similipal Foothills, Odisha",
      latitude: 21.93,
      longitude: 86.74,
      elevation: "580m",
      masterLineage: "Kolhan Dokra Alliance",
      giTag: "OR-DOKRA-2019",
      geologicalNotes: "Ancient beeswax source forests and riverine casting sandbanks.",
      activeArtisans: 15,
    },
  ];

  for (const atelier of ateliersData) {
    await prisma.atelier.create({ data: atelier });
  }

  console.log("✅ Seeded Living Territorial Ateliers");

  // 3. Seed Artworks
  const artworksData = [
    {
      title: "Goddess Gorbandh Terracotta Plaque",
      artForm: "Sohrai Khovar Mud Painting (Hazaribagh)",
      nativeDescription: "ᱥᱟᱱᱛᱟᱲᱤ ᱠᱟᱹᱦᱱᱤ: ᱫᱷᱟᱹᱨᱛᱤ ᱟᱨ ᱫᱟᱜ ᱥᱤᱨᱡᱚᱱ ᱨᱮ ᱴᱷᱟᱹᱠᱩᱨ ᱡᱤᱣ ᱦᱟᱸᱥ ᱟᱨ ᱦᱟᱸᱥᱤᱞ ᱫᱤᱵᱽᱭᱚ ᱪᱮᱬᱮ ᱡᱩᱲᱤ ᱵᱮᱱᱟᱣ ᱞᱮᱫ ᱠᱤᱱᱟᱭ᱾",
      englishDescription: "The sacred genesis mural modeled in post-monsoon Dudhi kaolin clay and black riverbed manganese. Every stroke is scraped using hand-carved combs to thank sacred cattle and ancestral earth spirits.",
      price: 18500,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=800&q=80",
      ]),
      status: "AVAILABLE",
      views: 218,
      pledgeCount: 47,
      consentRules: JSON.stringify(["no-photo", "ritual-silence", "no-touch"]),
      provenanceHash: generateProvenanceHash({ title: "Goddess Gorbandh Terracotta Plaque", gi: "JH-SOHRAI-2020" }),
      giTagNumber: "JH-SOHRAI-2020",
      originHamlet: "Hazaribagh, Jharkhand",
      artisanName: "Muni Devi",
      custodianId: muniDevi.id,
    },
    {
      title: "Bastar & Purulia Lost-Wax Horned Deer",
      artForm: "Bastar & Purulia Dokra Metalcraft",
      nativeDescription: "ᱦᱟᱸᱥ-ᱦᱟᱸᱥᱤᱞ ᱥᱚᱱᱟ ᱵᱤᱞᱤ ᱠᱷᱚᱱ ᱯᱤᱞᱪᱩ ᱦᱟᱲᱟᱢ ᱟᱨ ᱯᱤᱞᱪᱩ ᱵᱩᱰᱷᱤ ᱡᱟᱱᱟᱢ ᱞᱮᱱᱟ ᱠᱤᱱ᱾ ᱱᱚᱣᱟ ᱫᱚ ᱵᱤᱨ ᱵᱚᱸᱜᱟ ᱨᱮᱭᱟᱜ ᱥᱟᱹᱠᱷᱤ ᱠᱟᱱᱟ᱾",
      englishDescription: "Forged through 4,000-year-old lost-wax casting technique utilizing wild bees' wax, river clay core, and pure bell-metal bronze. Features the sacred horned forest stag honoring the Bonga deities.",
      price: 14200,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      ]),
      status: "AVAILABLE",
      views: 164,
      pledgeCount: 32,
      consentRules: JSON.stringify(["ritual-silence", "no-touch"]),
      provenanceHash: generateProvenanceHash({ title: "Bastar & Purulia Lost-Wax Horned Deer", gi: "WB-DOKRA-2018" }),
      giTagNumber: "WB-DOKRA-2018",
      originHamlet: "Purulia, West Bengal",
      artisanName: "Guru Somra Hembrom",
      custodianId: guruSomra.id,
    },
    {
      title: "Jaher Than Sacred Sal Grove Ochre Panel",
      artForm: "Jaher Than Sacred Sal Grove Ochre Panel",
      nativeDescription: "ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ ᱨᱮ ᱯᱷᱞᱮᱥ ᱠᱮᱢᱮᱨᱟ ᱢᱟᱱᱟ ᱜᱮᱭᱟ᱾ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱨᱮ ᱵᱚᱸᱜᱟ ᱠᱚ ᱛᱟᱦᱮᱸᱱᱟ᱾",
      englishDescription: "Naturally pulverized mineral pigments applied to unbleached handmade bark paper. Portrays the ancient canopy of the sacred Sal grove where villagers offer prayers at Baha festival.",
      price: 24000,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
      ]),
      status: "AVAILABLE",
      views: 340,
      pledgeCount: 89,
      consentRules: JSON.stringify(["no-photo", "ritual-silence", "no-touch"]),
      provenanceHash: generateProvenanceHash({ title: "Jaher Than Sacred Sal Grove Ochre Panel", gi: "JH-SANTHAL-2021" }),
      giTagNumber: "JH-SANTHAL-2021",
      originHamlet: "Dumka, Jharkhand",
      artisanName: "Guru Somra Hembrom",
      custodianId: guruSomra.id,
    },
  ];

  for (const artwork of artworksData) {
    const created = await prisma.artwork.create({ data: artwork });

    // 4. Create sample initial pledge from the demo traveler
    await prisma.pledge.create({
      data: {
        userId: demoTraveler.id,
        artworkId: created.id,
        acceptedRules: created.consentRules,
        digitalSignature: crypto.createHash("sha256").update(demoTraveler.id + created.id + "ACCEPTED").digest("hex"),
        depositAmount: 1500,
        status: "ACTIVE",
      },
    });
  }

  console.log("✅ Seeded Sample Artworks & Digital Pledges");
  console.log("✨ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
