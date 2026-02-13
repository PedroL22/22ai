import 'server-only'

import { cache } from 'react'

import { type AppRouter, createCaller } from '~/server/api/root'
import { createTRPCContext } from '~/server/api/trpc'
import { createQueryClient } from './query-client'

const createContext = cache(async () => {
  const heads = new Headers()
  heads.set('x-trpc-source', 'rsc')

  return createTRPCContext({
    headers: heads,
  })
})

const getQueryClient = cache(createQueryClient)
export const caller = createCaller(createContext)
export const getQueryClientCached = getQueryClient
