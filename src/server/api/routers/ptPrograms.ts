import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@component/server/api/trpc";

export const ptProgramRouter = createTRPCRouter({
  
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.pTProgram.findMany();
  }),

  add: publicProcedure
    .input(z.object({ schoolLocationId: z.string(), website: z.string(), discipline: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.pTProgram.create({
        data: {
          schoolLocationId: input.schoolLocationId,
          website: input.website,
          discipline: input.discipline
        },
      });
    }
  ),

  delete: publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    return await ctx.prisma.pTProgram.delete({
      where: {
        id: input.id,
      },
    });
  }),

  update: publicProcedure
  .input(z.object({ id: z.string(), schoolLocationId: z.string(), website: z.string(), discipline: z.string() }))
  .mutation(async ({ input, ctx }) => {
    return await ctx.prisma.pTProgram.update({
      where: {
        id: input.id,
      },
      data: {
        schoolLocationId: input.schoolLocationId,
        website: input.website,
        discipline: input.discipline
      },
    });
  }),
});
