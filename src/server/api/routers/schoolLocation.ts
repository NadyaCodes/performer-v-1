import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@component/server/api/trpc";

export const schoolLocationRouter = createTRPCRouter({
  
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.schoolLocation.findMany({orderBy: {
      schoolId: "asc"
    }
    });
  }),

  add: publicProcedure
    .input(z.object({ schoolId: z.string(), locationId: z.string(),  website: z.string()}))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.schoolLocation.create({
        data: {
          schoolId: input.schoolId,
          locationId: input.locationId,
          website: input.website
        },
      });
    }
  ),

  delete: publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    return await ctx.prisma.schoolLocation.delete({
      where: {
        id: input.id,
      },
    });
  }),

  update: publicProcedure
  .input(z.object({ id: z.string(), schoolId: z.string(), locationId: z.string(),  website: z.string() }))
  .mutation(async ({ input, ctx }) => {
    return await ctx.prisma.schoolLocation.update({
      where: {
        id: input.id,
      },
      data: {
        schoolId: input.schoolId,
        locationId: input.locationId,
        website: input.website
      },
    });
  }),

});
