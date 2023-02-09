import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE === 'development') {
	global.prisma = prisma;
}

export { prisma };
