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
    const { title, subTopicId, tags } = await req.json();

    const updatedTopic = await prisma.topic.update({
      where: { topic_id: Number(topicId) },
      data: {
        topic_name: title,
        parent_id: subTopicId ? Number(subTopicId) : null, // Update subtopic ID if provided
      },
    });

    // Remove existing tags
    await prisma.topic_Tag.deleteMany({
      where: { topic_id: Number(topicId) },
    });

    // Add new tags
    if (tags && tags.length > 0) {
      const tagData = tags.map((tagId: number) => ({
        topic_id: Number(topicId),
        tag_id: tagId,
      }));

      await prisma.topic_Tag.createMany({
        data: tagData,
      });
    }

    return NextResponse.json(updatedTopic, { status: 200 });
  } catch (error) {
    console.error('Error updating topic:', error);
    return NextResponse.json({ message: 'An error occurred while updating the topic' }, { status: 500 });
  }
}
