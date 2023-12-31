import { exampleRouter } from "@component/server/api/routers/example";
import { createTRPCRouter } from "@component/server/api/trpc";
import { schoolRouter } from "./routers/school";
import { locationRouter } from "./routers/location";
import { schoolLocationRouter } from "./routers/schoolLocation";
import { ptProgramRouter } from "./routers/ptPrograms";
import { ftProgramRouter } from "./routers/ftPrograms";
import { favsRouter } from "./routers/favs";
import { notesRouter } from "./routers/notes";
import { customProgramRouter } from "./routers/customProgram";
import { userRouter } from "./routers/user";
import { postRouter } from "./routers/post";
import { authorRouter } from "./routers/author";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  school: schoolRouter,
  location: locationRouter,
  schoolLocation: schoolLocationRouter,
  ptProgram: ptProgramRouter,
  ftProgram: ftProgramRouter,
  favs: favsRouter,
  notes: notesRouter,
  customProgram: customProgramRouter,
  user: userRouter,
  post: postRouter,
  author: authorRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
