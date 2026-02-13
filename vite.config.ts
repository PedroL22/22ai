import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '.prisma/client/default': fileURLToPath(new URL('./node_modules/.prisma/client/default.js', import.meta.url)),
    },
  },
  ssr: {
    external: ['@prisma/client', '@prisma/adapter-pg', 'pg'],
  },
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart({}),
    nitro(),
    viteReact(),
  ],
})
