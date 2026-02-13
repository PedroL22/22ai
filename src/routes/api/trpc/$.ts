import { createFileRoute } from '@tanstack/react-router'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { env } from '~/env'
import { appRouter } from '~/server/api/root'
import { createTRPCContext } from '~/server/api/trpc'

const createContext = async (req: Request) => {
  return createTRPCContext({
    headers: req.headers,
  })
}

export const Route = createFileRoute('/api/trpc/$')({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        return fetchRequestHandler({
          endpoint: '/api/trpc',
          req: request,
          router: appRouter,
          createContext: () => createContext(request),
          onError:
            env.NODE_ENV === 'development'
              ? ({ path, error }) => {
                  console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
                }
              : undefined,
        })
      },
      POST: async ({ request }: { request: Request }) => {
        return fetchRequestHandler({
          endpoint: '/api/trpc',
          req: request,
          router: appRouter,
          createContext: () => createContext(request),
          onError:
            env.NODE_ENV === 'development'
              ? ({ path, error }) => {
                  console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
                }
              : undefined,
        })
      },
    },
  },
})
