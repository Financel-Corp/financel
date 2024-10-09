/* eslint-disable vars-on-top */
import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  if (process.env.NODE_ENV === 'production') return new PrismaClient()

  if (!global.prisma) global.prisma = new PrismaClient()

  return global.prisma
}

const prisma =
  typeof window === 'undefined' ? createPrismaClient() : ({} as PrismaClient)

export default prisma
