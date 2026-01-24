import "server-only";

import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'
import { config } from "./config";

const globalForPrisma = globalThis as {
  prisma?: ReturnType<PrismaClient['$extends']>;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    accelerateUrl: config.DATABASE_URL
  }).$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
