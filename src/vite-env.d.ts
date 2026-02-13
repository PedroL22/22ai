/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLERK_SIGN_IN_URL: string
  readonly VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: string
  readonly VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: string
  readonly VITE_CLERK_PUBLISHABLE_KEY: string
  readonly VITE_OPENROUTER_DEFAULT_MODEL: string
  readonly VITE_APP_URL: string | undefined
  readonly DEV: boolean
  readonly SERVER_URL: string | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
