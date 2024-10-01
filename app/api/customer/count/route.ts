import { NextResponse } from 'next/server';
import { PrismaClient } from 'prisma/prisma-client';

const prisma = new PrismaClient();

export async function GET(req: NextResponse) {
  try {
    const count = await prisma.customer.count();
    return NextResponse.json(count, { status: 200 });
  } catch (error) {
    console.log(error);
    return null;
  }
}
