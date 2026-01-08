import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseUrl = process.env.DIRECT_DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for Prisma CLI.");
}

export default defineConfig({
  datasource: {
    url: databaseUrl,
  },
});