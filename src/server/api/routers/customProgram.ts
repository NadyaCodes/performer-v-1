import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@component/server/api/trpc";

export const customProgramRouter = createTRPCRouter({
  
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.customProgram.findMany();
  }),

  getAllForUser: publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input, ctx }) => {
    return ctx.prisma.customProgram.findMany({
      where: {
        userId: {
          equals: input.userId,
        },
      },
    });
  }),

  getOneById: publicProcedure
  .input(z.object({ id: z.string()}))
  .query(async ({ input, ctx }) => {
    return ctx.prisma.customProgram.findFirst({
      where: {
        id: {
          equals: input.id,
        },
      },
    });
  }),

  add: publicProcedure
    .input(z.object({ name: z.string().optional(), school: z.string().optional(), city: z.string().optional(), province: z.string().optional(), country: z.string().optional(), website: z.string().optional(), typePt: z.boolean().optional(), typeFt: z.boolean().optional(), disciplineAct: z.boolean().optional(), disciplineSing: z.boolean().optional(), disciplineDance: z.boolean().optional(), disciplineMT: z.boolean().optional(), userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.customProgram.create({
        data: {
          name: input.name,
          school: input.school,
          city: input.city,
          province: input.province,
          country: input.country,
          website: input.website,
          typePt: input.typePt,
          typeFt: input.typeFt,
          disciplineAct: input.disciplineAct,
          disciplineSing: input.disciplineSing,
          disciplineDance: input.disciplineDance,
          disciplineMT: input.disciplineMT,
          userId: input.userId
        },
      });
    }
  ),

  delete: publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    return await ctx.prisma.customProgram.delete({
      where: {
        id: input.id,
      },
    });
  }),

  update: publicProcedure
  .input(z.object({ id: z.string(), name: z.string().optional(), school: z.string().optional(), city: z.string().optional(), province: z.string().optional(), country: z.string().optional(), website: z.string().optional(), typePt: z.boolean().optional(), typeFt: z.boolean().optional(), disciplineAct: z.boolean().optional(), disciplineSing: z.boolean().optional(), disciplineDance: z.boolean().optional(), disciplineMT: z.boolean().optional() }))
  .mutation(async ({ input, ctx }) => {
    return await ctx.prisma.customProgram.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        school: input.school,
        city: input.city,
        province: input.province,
        country: input.country,
        website: input.website,
        typePt: input.typePt,
        typeFt: input.typeFt,
        disciplineAct: input.disciplineAct,
        disciplineSing: input.disciplineSing,
        disciplineDance: input.disciplineDance,
        disciplineMT: input.disciplineMT,
      },
    });
  }),
});