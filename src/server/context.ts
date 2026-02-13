import { auth } from '@clerk/tanstack-react-start/server'

export const createContext = async () => {
  return { auth: await auth() }
}

export type Context = Awaited<ReturnType<typeof createContext>>
