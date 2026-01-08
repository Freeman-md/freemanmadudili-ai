import "server-only";

import { z } from "zod";

const envSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),
  STORAGE_BUCKET: z.string().min(1, "STORAGE_BUCKET is required"),
  EMAIL_PROVIDER_KEY: z.string().min(1, "EMAIL_PROVIDER_KEY is required"),
});

const parsed = envSchema.safeParse({
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  EMAIL_PROVIDER_KEY: process.env.EMAIL_PROVIDER_KEY,
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => issue.message)
    .join(" | ");
  throw new Error(`Invalid environment variables: ${issues}`);
}

export const env = parsed.data;
