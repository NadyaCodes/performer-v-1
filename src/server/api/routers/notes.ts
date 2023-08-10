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
        orderBy: {
          dateTime: 'asc'
        }
      });
    }),

    getAllForCustomProgramId: publicProcedure
    .input(z.object({ customId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.note.findMany({
        where: {
          customProgramId: {
            equals: input.customId,
          },
        },
      });
    }),


  add: publicProcedure
    .input(z.object({ userId: z.string(), favId: z.string().optional(), text: z.string(), customId: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.note.create({
        data: {
          userId: input.userId,
          favProgramId: input.favId,
          text: input.text,
          customProgramId: input.customId
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
