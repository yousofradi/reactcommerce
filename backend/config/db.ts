import { PrismaClient } from '@prisma/client';

let databaseUrl = process.env.DATABASE_URL || '';
if (databaseUrl && databaseUrl.includes('pooler.supabase.com') && !databaseUrl.includes('pgbouncer=true')) {
  databaseUrl += (databaseUrl.includes('?') ? '&' : '?') + 'pgbouncer=true';
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
