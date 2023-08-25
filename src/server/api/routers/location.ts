import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@component/server/api/trpc";

export const locationRouter = createTRPCRouter({
  
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.location.findMany({orderBy: {
      city: "asc"
    }
    });
  }),

  getOne: publicProcedure
  .input(z.object({ city: z.string(), province: z.string(), area: z.string().optional() }))
  .query(async ({ input, ctx }) => {
    return ctx.prisma.location.findFirst({
      where: {
        city: {
          equals: input.city,
        },
        province: {
          equals: input.province,
        },
      },
    });
  }),

  getLocationsByProvince: publicProcedure
  .input(z.object({ province: z.string() }))
  .query(async ({ input, ctx }) => {
    return ctx.prisma.location.findMany({
      where: {
        province: {
          equals: input.province,
        },
      },
    });
  }),

  getOneById: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {
    return ctx.prisma.location.findFirst({
      where: {
        id: {
          equals: input.id,
        },
      },
    });
  }),

  add: publicProcedure
    .input(z.object({ city: z.string(), province: z.string(), area: z.string().optional() }))
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
