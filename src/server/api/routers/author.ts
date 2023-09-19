import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@component/server/api/trpc";

export const authorRouter = createTRPCRouter({
  add: publicProcedure
    .input(z.object({ name: z.string(), bio: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.author.create({
        data: {
          name: input.name,
          bio: input.bio,
        },
      });
    }
  ),
});
