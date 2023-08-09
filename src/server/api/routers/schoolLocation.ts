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

  getOne: publicProcedure
  .input(z.object({ schoolId: z.string(), locationId: z.string() }))
  .query(async ({ input, ctx }) => {
    return ctx.prisma.schoolLocation.findFirst({
      where: {
        schoolId: {
          equals: input.schoolId,
        },
        locationId: {
          equals: input.locationId
        }
      },
    });
  }),

  getOneById: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {
    return ctx.prisma.schoolLocation.findFirst({
      where: {
        id: {
          equals: input.id,
        },
      },
    });
  }),

  getOneByIdPlusInfo: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {
    return ctx.prisma.schoolLocation.findFirst({
      where: {
        id: {
          equals: input.id,
        },
      },
      include: {
        school: true,
        location: true
      }
    });
  }),

  getAllForLocation: publicProcedure
  .input(z.object({ locationId: z.string() }))
  .query(async ({ input, ctx }) => {
    return ctx.prisma.schoolLocation.findMany({
      where: {
        locationId: {
          equals: input.locationId,
        },
      },
    });
  }),

  getAllForLocationPlusInfo: publicProcedure
  .input(z.object({ locationId: z.string() }))
  .query(async ({ input, ctx }) => {
    return ctx.prisma.schoolLocation.findMany({
      where: {
        locationId: {
          equals: input.locationId,
        },
      },
      include: {
        school: true,
        PTProgram: true,
        FTProgram: true,
        location: true,
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
