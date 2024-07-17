import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/database/client';

export async function GET(req: NextRequest) {
  try {
    const tags = await prisma.tag.findMany();
    console.log('Fetched tags:', tags);

    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}