import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
// import { ws } from '@neon-io/postgres'

declare global {
  let cachedPrisma: PrismaClient
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  const connectionString = process.env.DATABASE_URL!
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    const connectionString = process.env.DATABASE_URL!
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

export default prisma
