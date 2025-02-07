import { initTRPC } from "@trpc/server";
import { products } from "@/data/products.json"; // This import style requires "esModuleInterop", see "side notes"
import superjson from "superjson";
import { z } from "zod";
import type { Context } from "@/server/context";

const t = initTRPC.context<Context>().create({
  transformer: superjson, // Use superjson for serialization
});

export const publicProcedure = t.procedure;
export const middleware = t.middleware;

// Middleware to check if the user is authenticated
const isAuthenticated = middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new Error("UNAUTHORIZED");
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const protectedProcedure = publicProcedure.use(isAuthenticated);

export const appRouter = t.router({
  getUserData: protectedProcedure.query(({ ctx }) => {
    return { user: ctx.user };
  }),

  greet: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return `hello, ${input.name}!`;
    }),

  get_products: t.procedure.query(() => {
    return products;
  }),
  get_product_by_id: t.procedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return products.filter((item) => item.id == input.id)[0];
    }),
});

export type AppRouter = typeof appRouter;
