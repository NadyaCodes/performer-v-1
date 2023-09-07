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
