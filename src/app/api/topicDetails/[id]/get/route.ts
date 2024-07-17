
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/database/client';

export async function GET(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const topicDetailId = path.split('/').pop();

  if (!topicDetailId) {
    return NextResponse.json({ message: 'Topic ID parameter is missing' }, { status: 400 });
  }

  try {
    const topicDetail = prisma.topic_Detail.findUnique({
      where: { topic_detail_id: parseInt(topicDetailId)},
      select: {
        attachments: true,
        links: true,
        notes: true,
        photos: true,
      }
    });

    console.log('Fetched topicDetails:', topicDetail); 

    return NextResponse.json(topicDetail, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch topicDetail' }, { status: 500 });
  }
}
