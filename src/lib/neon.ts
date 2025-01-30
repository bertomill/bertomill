import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

declare global {
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  const connectionString = process.env.DATABASE_URL!
  const pool = new Pool({ connectionString })
  const adapter = new PrismaNeon(pool)
  prisma = new PrismaClient({ adapter })
} else {
  if (!global.cachedPrisma) {
    const connectionString = process.env.DATABASE_URL!
    const pool = new Pool({ connectionString })
    const adapter = new PrismaNeon(pool)
    global.cachedPrisma = new PrismaClient({ adapter })
  }
  prisma = global.cachedPrisma
}

export default prisma
