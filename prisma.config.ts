import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseUrl = process.env.DATABASE_URL;

console.log("Prisma DATABASE_URL:", process.env.DATABASE_URL);

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for Prisma CLI.");
}

export default defineConfig({
  datasource: {
    url: databaseUrl,
  },
});