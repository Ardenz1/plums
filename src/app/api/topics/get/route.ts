
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const topics = await prisma.topic.findMany();
    console.log('Fetched topics:', topics); // Logging fetched topics

    return NextResponse.json(topics, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 });
  }
}
