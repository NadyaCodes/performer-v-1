import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@component/server/api/trpc";

export const notesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany();
  }),

  getAllForFavProgramId: publicProcedure
    .input(z.object({ favId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.note.findMany({
        where: {
          favProgramId: {
            equals: input.favId,
          },
        },
      });
    }),


  add: publicProcedure
    .input(z.object({ userId: z.string(), favId: z.string(), text: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.note.create({
        data: {
          userId: input.userId,
          favProgramId: input.favId,
          text: input.text,
        },
      });
    }),

  deleteById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.note.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
