import crypto from "crypto";

export function generateProvenanceHash(payload: {
  title: string;
  artForm: string;
  artisanName?: string;
  giTagNumber?: string | null;
  originHamlet?: string | null;
  custodianId: string;
}): string {
  const content = `${payload.title}|${payload.artForm}|${payload.artisanName || ""}|${payload.giTagNumber || ""}|${payload.custodianId}|${Date.now()}`;
  return crypto.createHash("sha256").update(content).digest("hex");
}

export function generatePledgeSignature(
  userId: string,
  artworkId: string,
  acceptedRules: string[]
): string {
  const content = `${userId}::${artworkId}::${acceptedRules.sort().join(",")}::${Date.now()}::SACRED_CONSENT_ACKNOWLEDGED`;
  return crypto.createHash("sha256").update(content).digest("hex");
}
