import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@component/server/api/trpc";

export const schoolRouter = createTRPCRouter({
  
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.school.findMany({orderBy: {
      name: "asc"
    }
    });
  }),

  getOne: publicProcedure
  .input(z.object({ name: z.string() }))
  .query(async ({ input, ctx }) => {
    return ctx.prisma.school.findFirst({
      where: {
        name: {
          equals: input.name,
        },
      },
    });
  }),

  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.school.create({
        data: {
          name: input.name,
        },
      });
    }
  ),

  delete: publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    return await ctx.prisma.school.delete({
      where: {
        id: input.id,
      },
    });
  }),

  update: publicProcedure
  .input(z.object({ id: z.string(), text: z.string() }))
  .mutation(async ({ input, ctx }) => {
    return await ctx.prisma.school.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.text,
      },
    });
  }),
});
