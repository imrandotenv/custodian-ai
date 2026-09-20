import { z } from "zod";

export const createArtworkSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  artForm: z.string().min(3, "Art form is required"),
  nativeDescription: z.string().min(5, "Native description/lore is required"),
  englishDescription: z.string().optional().default(""),
  price: z.coerce.number().positive("Price must be greater than zero"),
  images: z.array(z.string()).min(1, "At least one artifact image is required"),
  consentRules: z
    .array(z.string())
    .min(1, "At least one Smart Consent rule must be enforced"),
  giTagNumber: z.string().optional(),
  originHamlet: z.string().optional(),
  artisanName: z.string().optional(),
});

export const updateArtworkSchema = z.object({
  title: z.string().min(3).optional(),
  artForm: z.string().min(3).optional(),
  nativeDescription: z.string().min(5).optional(),
  englishDescription: z.string().optional(),
  price: z.coerce.number().positive().optional(),
  images: z.array(z.string()).optional(),
  status: z.enum(["AVAILABLE", "RESERVED", "ARCHIVED"]).optional(),
  consentRules: z.array(z.string()).optional(),
});

export const listArtworksQuerySchema = z.object({
  artForm: z.string().optional(),
  region: z.string().optional(),
  status: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});
