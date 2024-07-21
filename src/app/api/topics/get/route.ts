
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/database/client';


export async function GET(req: NextRequest) {
  try {
    const topics = await prisma.topic.findMany({
      where: {
        is_deleted: false,
    }});

    return NextResponse.json(topics, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 });
  }
}
