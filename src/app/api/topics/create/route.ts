import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { title, subTopicId, tags } = await request.json();

    const topic = await prisma.topic.create({
      data: {
        topic_name: title,
        parent_id: subTopicId ? parseInt(subTopicId) : null,
        topic_details: {
          create: [
            {
              topic_detail_title: `${title} Detail`,
              topic_detail_amount: 0
            }
          ]
        },
        Topic_Tag: {
          create: tags.map((tag_id: number) => ({
            tag_id: tag_id
          }))
        }
      },
      include: {
        topic_details: true,
        Topic_Tag: true
      }
    });

    return NextResponse.json(topic);
  } catch (error: any) {
    console.error('Error creating topic:', error);
    return NextResponse.json({ message: 'Failed to create the topic', error }, { status: 500 });
  }
}
