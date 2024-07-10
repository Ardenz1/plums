import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const topicId = path.split('/').pop();

  if (!topicId) {
    return NextResponse.json({ message: 'Topic ID parameter is missing' }, { status: 400 });
  }

  try {
    const { title, } = await req.json();

    const updatedTopic = await prisma.topic.update({
      where: { topic_id: Number(topicId) },
      data: {
        topic_name: title,
      },
    });

    return NextResponse.json(updatedTopic, { status: 200 });
  } catch (error) {
    console.error('Error updating topic:', error);
    return NextResponse.json({ message: 'An error occurred while updating the topic' }, { status: 500 });
  }
}
