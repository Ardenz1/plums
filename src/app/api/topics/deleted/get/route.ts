import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/database/client';

export async function GET(req: NextRequest) {
  try {
    const deletedTopics = await prisma.topic.findMany({ where: { is_deleted: true, } });
    console.log('Fetched deleted topics:', deletedTopics); 

    return NextResponse.json(deletedTopics, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch deleted topics' }, { status: 500 });
  }
}
