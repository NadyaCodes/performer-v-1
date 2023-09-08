import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@component/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getPaginatedPosts: publicProcedure.input(z.object({page: z.number(), pageSize: z.number()})).query(({ ctx, input }) => {
    const { page, pageSize } = input;

    const skip = (page - 1) * pageSize;
    return ctx.prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: pageSize,
    });
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


  add: publicProcedure
    .input(z.object({ author: z.string(), slug: z.string(), title: z.string(), body: z.string(), image: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.post.create({
        data: {
          author: input.author,
          slug: input.slug,
          title: input.title,
          body: input.body,
          image: input.image
        },
      });
    }),
});
