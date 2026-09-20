import { z } from "zod";

export const aiTranslateSchema = z.object({
  text: z.string().min(1, "Text to translate is required"),
  from: z.enum(["santhali", "english", "auto"]).default("auto"),
  to: z.enum(["santhali", "english"]).default("english"),
});

export const aiGenerateLoreSchema = z.object({
  artForm: z.string().min(2, "Art form is required"),
  motifs: z.string().min(2, "Motifs or keywords are required"),
  region: z.string().optional(),
  artisanName: z.string().optional(),
});

export const aiChatSchema = z.object({
  message: z.string().min(1, "Message is required"),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string(),
      })
    )
    .optional()
    .default([]),
});
