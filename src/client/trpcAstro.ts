import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { AppRouter } from "@/server/router";

export const trpcAstro = createTRPCProxyClient<AppRouter>({
  transformer: superjson, // Add the transformer here
  links: [
    httpBatchLink({
      url: "http://localhost:4322/api/trpc", // Use an absolute URL
    }),
  ],
});
