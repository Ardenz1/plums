import { NextResponse } from 'next/server';
import prisma from '@/database/client';

export const runtime = 'nodejs';

export async function PUT(req: Request, { params }: { params: { topicId: string } }) {
  const topicId = params.topicId;

  if (!topicId) {
    return NextResponse.json({ message: 'TopicID parameter is missing' }, { status: 400 });
  }

  try {
    const { isDeleted } = await req.json(); 

    const updateData: any = {
      is_deleted: Boolean(isDeleted),
    };

    const updatedTopic = await prisma.topic.update({
      where: { topic_id: Number(topicId) },
      data: updateData,
    });

    return NextResponse.json(updatedTopic, { status: 200 });
  } catch (error) {
    console.error('Error deleting Topic:', error);
    return NextResponse.json({ message: 'An error occurred while deleting the Topic' }, { status: 500 });
  }
}
