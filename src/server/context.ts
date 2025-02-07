// import { getUser } from "@astro-auth/core";
// import type { inferAsyncReturnType } from "@trpc/server";
// import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
//
// export function createContext({ req }: FetchCreateContextFnOptions) {
//   // Retrieve the logged-in user using Astro Auth
//   const user = getUser({ server: req });
//
//   return { req, user };
// }
//
// export type Context = inferAsyncReturnType<typeof createContext>;

import type { inferAsyncReturnType } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export function createContext({ req }: FetchCreateContextFnOptions) {
  // Example: Extract user from request headers
  const user = req.headers.get("user") || null;
  return { user };
}

export type Context = inferAsyncReturnType<typeof createContext>;
