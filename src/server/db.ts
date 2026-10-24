import os from "os";
import { PrismaClient } from "@prisma/client";
import { env } from "@component/env.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Total build-time connections to stay under. The direct Postgres connection allows
 * roughly 60 clients, so this leaves headroom for anything else talking to the db
 * while a build runs.
 */
const BUILD_CONNECTION_BUDGET = 40;

/**
 * `next build` pre-renders every page with one worker per core, and each worker opens
 * its own Prisma pool sized `cores * 2 + 1`. On a high-core machine that overshoots the
 * server's client limit, so divide the budget across the workers Next will actually
 * spawn. Capping at Prisma's own default means low-core builders (CI, Vercel) keep full
 * query parallelism and are not slowed into the static generation timeout.
 */
const buildTimeDatabaseUrl = () => {
  const cores = os.cpus().length;
  const workers = Math.max(1, cores - 1);
  const prismaDefault = cores * 2 + 1;
  const connectionLimit = Math.max(
    2,
    Math.min(prismaDefault, Math.floor(BUILD_CONNECTION_BUDGET / workers))
  );

  const url = new URL(env.DATABASE_URL);
  url.searchParams.set("connection_limit", String(connectionLimit));
  url.searchParams.set("pool_timeout", "60");
  return url.toString();
};

const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

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
