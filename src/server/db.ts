import { PrismaClient } from "@prisma/client";
import { env } from "@component/env.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * `next build` pre-renders hundreds of pages across several worker processes, and each
 * one builds its own Prisma pool sized to the machine's core count. Against the direct
 * Postgres connection that adds up to more clients than the server allows, so the pool
 * is capped while building. Nothing changes at runtime.
 */
const buildTimeDatabaseUrl = () => {
  const url = new URL(env.DATABASE_URL);
  url.searchParams.set("connection_limit", "2");
  url.searchParams.set("pool_timeout", "60");
  return url.toString();
};

const isProductionBuild =
  process.env.NEXT_PHASE === "phase-production-build";

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(isProductionBuild
      ? { datasources: { db: { url: buildTimeDatabaseUrl() } } }
      : {}),
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
