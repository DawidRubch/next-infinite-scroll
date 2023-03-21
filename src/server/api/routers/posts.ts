
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
    getPosts: publicProcedure.input(z.object({
        take: z.number().min(1).max(100),
        cursor: z.number().min(0)
    })).query(async ({ ctx, input }) => {

        const { take, cursor } = input


        const allPosts = await ctx.prisma.post.findMany()

        const posts = await ctx.prisma.post.findMany({
            take,
            cursor: cursor ? { id: cursor } : undefined,
        })



        let nextCursor: typeof cursor | undefined = undefined;



        if (posts.length === input.take) {
            const nextItem = posts.pop()
            nextCursor = nextItem?.id;
        }
        return {
            posts,
            nextCursor
        }
    })
});


