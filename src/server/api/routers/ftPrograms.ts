import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@component/server/api/trpc";

export const ftProgramRouter = createTRPCRouter({
  
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.fTProgram.findMany();
  }),

  getOneById: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {
    return ctx.prisma.fTProgram.findFirst({
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
    return ctx.prisma.fTProgram.findFirst({
      where: {
        id: {
          equals: input.id,
        },
      },
      include: {
        SchoolLocation: true
      }
    });
  }),

  getOneByLocationObject: publicProcedure
  .input(z.object({ schoolLocationId: z.string(), discipline: z.string(), name: z.string() }))
  .query(async ({ input, ctx }) => {
    return ctx.prisma.fTProgram.findFirst({
      where: {
        schoolLocationId: {
          equals: input.schoolLocationId,
        },
        discipline: {
          equals: input.discipline
        },
        name: {
          equals: input.name
        }
      },
    });
  }),

  add: publicProcedure
    .input(z.object({ schoolLocationId: z.string(), website: z.string(), discipline: z.string(), name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.fTProgram.create({
        data: {
          schoolLocationId: input.schoolLocationId,
          website: input.website,
          discipline: input.discipline,
          name: input.name
        },
      });
    }
  ),

  delete: publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    return await ctx.prisma.fTProgram.delete({
      where: {
        id: input.id,
      },
    });
  }),

  update: publicProcedure
  .input(z.object({ id: z.string(), schoolLocationId: z.string(), website: z.string(), discipline: z.string(), name: z.string() }))
  .mutation(async ({ input, ctx }) => {
    return await ctx.prisma.fTProgram.update({
      where: {
        id: input.id,
      },
      data: {
        schoolLocationId: input.schoolLocationId,
        website: input.website,
        discipline: input.discipline,
        name: input.name
      },
    });
  }),
});
