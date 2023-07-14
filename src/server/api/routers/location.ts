import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@component/server/api/trpc";

export const locationRouter = createTRPCRouter({
  
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.location.findMany({orderBy: {
      city: "asc"
    }
    });
  }),

  add: publicProcedure
    .input(z.object({ city: z.string(), province: z.string(), area: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.location.create({
        data: {
          city: input.city,
          province: input.province,
          area: input.area
        },
      });
    }
  ),

  delete: publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    return await ctx.prisma.location.delete({
      where: {
        id: input.id,
      },
    });
  }),

  update: publicProcedure
  .input(z.object({ id: z.string(), city: z.string(), province: z.string(), area: z.string() }))
  .mutation(async ({ input, ctx }) => {
    return await ctx.prisma.location.update({
      where: {
        id: input.id,
      },
      data: {
        city: input.city,
        province: input.province,
        area: input.area
      },
    });
  }),
});
