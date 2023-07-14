import { exampleRouter } from "@component/server/api/routers/example";
import { createTRPCRouter } from "@component/server/api/trpc";
import { schoolRouter } from "./routers/school";
import { locationRouter } from "./routers/location";
import { schoolLocationRouter } from "./routers/schoolLocation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  school: schoolRouter,
  location: locationRouter,
  schoolLocation: schoolLocationRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
