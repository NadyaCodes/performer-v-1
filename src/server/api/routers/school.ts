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

  add: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.school.create({
        data: {
          name: input.text,
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
