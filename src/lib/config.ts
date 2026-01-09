import "server-only";

import { z } from "zod";

const configSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),
  STORAGE_BUCKET: z.string().min(1, "STORAGE_BUCKET is required"),
  SUPABASE_URL: z.string().min(1, "SUPABASE_URL is required"),
  SUPABASE_SECRET_KEY: z.string().min(1, "SUPABASE_SECRET_KEY is required"),
  EMAIL_PROVIDER_KEY: z.string().min(1, "EMAIL_PROVIDER_KEY is required"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DIRECT_DATABASE_URL: z.string().optional(),
});

const parsed = configSchema.safeParse({
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  EMAIL_PROVIDER_KEY: process.env.EMAIL_PROVIDER_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_DATABASE_URL: process.env.DIRECT_DATABASE_URL,
  STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => issue.message)
    .join(" | ");
  throw new Error(`Invalid environment variables: ${issues}`);
}

export const config = {
  ...parsed.data,
  DIRECT_DATABASE_URL:
    parsed.data.DIRECT_DATABASE_URL ?? parsed.data.DATABASE_URL,
};
