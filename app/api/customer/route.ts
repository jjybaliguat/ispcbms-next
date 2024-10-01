import { NextResponse } from 'next/server';
import { PrismaClient } from 'prisma/prisma-client';

const prisma = new PrismaClient();

export async function GET(req: NextResponse) {
  try {
    const [customers, count] = await prisma.$transaction([
      prisma.customer.findMany({}),
      prisma.customer.count()
    ]);
    return NextResponse.json({ customers, count }, { status: 200 });
  } catch (error) {
    console.log(error);
    return null;
  }
}
