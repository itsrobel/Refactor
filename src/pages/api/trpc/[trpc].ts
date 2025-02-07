import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/router";
import { createContext } from "@/server/context";
import type { APIRoute } from "astro";

export const prerender = false; // Disable static generation for this route

export const ALL: APIRoute = ({ request }) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext,
  });
};
