import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@component/server/api/trpc";

export const userRouter = createTRPCRouter({

  updatePatreonId: publicProcedure
  .input(z.object({ id: z.string(), patreonId: z.string() }))
  .mutation(async ({ input, ctx }) => {
    return await ctx.prisma.user.update({
      where: {
        id: input.id,
      },
      data: {
        patreonMemberId: input.patreonId,
      },
    });
  }),

});
