import { z } from "zod";

export const createPledgeSchema = z.object({
  artworkId: z.string().min(1, "Artwork ID is required"),
  acceptedRules: z
    .array(z.string())
    .min(1, "Must solemnly accept the custodian customary rules"),
  depositAmount: z.coerce.number().min(0).default(0),
});
