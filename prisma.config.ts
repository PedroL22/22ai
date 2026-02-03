import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'src/db/prisma/schema.prisma',
  migrations: {
    path: 'src/db/prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
})
