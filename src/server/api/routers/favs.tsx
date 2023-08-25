import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@component/server/api/trpc";

export const favsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.favProgram.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }),

  getAllForUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.favProgram.findMany({
        where: {
          userId: {
            equals: input.userId,
          },
        },
      });
    }),

  getOnePT: publicProcedure
    .input(z.object({ userId: z.string(), ptProgramId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.favProgram.findFirst({
        where: {
          userId: {
            equals: input.userId,
          },
          ptProgramId: {
            equals: input.ptProgramId,
          },
        },
      });
    }),

  getOneFT: publicProcedure
    .input(z.object({ userId: z.string(), ftProgramId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.favProgram.findFirst({
        where: {
          userId: {
            equals: input.userId,
          },
          ftProgramId: {
            equals: input.ftProgramId,
          },
        },
      });
    }),

  addPT: publicProcedure
    .input(z.object({ userId: z.string(), ptProgramId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.favProgram.create({
        data: {
          userId: input.userId,
          ptProgramId: input.ptProgramId,
        },
      });
    }),

  addFT: publicProcedure
    .input(z.object({ userId: z.string(), ftProgramId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.favProgram.create({
        data: {
          userId: input.userId,
          ftProgramId: input.ftProgramId,
        },
      });
    }),

  deleteById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.favProgram.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
