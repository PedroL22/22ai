import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  clientPrefix: 'VITE_',
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    CLERK_SECRET_KEY: z.string(),
    CLERK_WEBHOOK_SECRET: z.string(),
    OPENROUTER_SITE_URL: z.string().url().optional(),
    OPENROUTER_SITE_NAME: z.string().optional(),
    OPENROUTER_API_KEY: z.string(),
  },
  client: {
    VITE_CLERK_SIGN_IN_URL: z.string(),
    VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: z.string(),
    VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: z.string(),
    VITE_CLERK_PUBLISHABLE_KEY: z.string(),
    VITE_OPENROUTER_DEFAULT_MODEL: z.string(),
    VITE_APP_URL: z.string().url().optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    VITE_CLERK_SIGN_IN_URL: process.env.VITE_CLERK_SIGN_IN_URL,
    VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: process.env.VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL,
    VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: process.env.VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL,
    VITE_CLERK_PUBLISHABLE_KEY: process.env.VITE_CLERK_PUBLISHABLE_KEY,
    VITE_OPENROUTER_DEFAULT_MODEL: process.env.VITE_OPENROUTER_DEFAULT_MODEL,
    VITE_APP_URL: process.env.VITE_APP_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
    OPENROUTER_SITE_URL: process.env.OPENROUTER_SITE_URL,
    OPENROUTER_SITE_NAME: process.env.OPENROUTER_SITE_NAME,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})
