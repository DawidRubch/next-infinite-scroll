

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
    getUsers: publicProcedure.input(z.object({
        take: z.number().min(1).max(100),
        cursor: z.number().min(0)
    })).query(async ({ ctx, input }) => {

        const { take, cursor } = input

        const allUsers = await ctx.prisma.user.findMany()

        console.log('allUsers', allUsers.length)

        const users = await ctx.prisma.user.findMany({
            take,
            cursor: cursor ? { id: cursor } : undefined,
        })

        let nextCursor: typeof cursor | undefined = undefined;

        if (users.length === input.take) {
            const nextItem = users.pop()
            nextCursor = nextItem?.id;
        }
        return {
            users,
            nextCursor
        }

    }),
    getUser: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
        const user = await ctx.prisma.user.findUnique({
            where: {
                id: input
            }
        })


        if (!user) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "User not found"
            })
        }

        return user

    })
});


