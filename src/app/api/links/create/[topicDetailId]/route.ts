import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/database/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { title, hyperlink, description, topicDetailId } = body;

    // Ensure topicDetailId is provided
    if (!topicDetailId) {
      return NextResponse.json({ message: 'Topic Detail ID parameter is missing' }, { status: 400 });
    }

    // Ensure the topicDetailId exists
    const topicDetail = await prisma.topic_Detail.findUnique({
      where: { topic_detail_id: Number(topicDetailId) },
    });

    if (!topicDetail) {
      return NextResponse.json({ message: 'Topic Detail not found' }, { status: 404 });
    }

    const newLink = await prisma.link.create({
      data: {
        link_header: title,
        link_hyperlink: hyperlink,
        link_description: description,
        topic_detail_id: Number(topicDetailId),
      },
    });

    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error('Error creating link:', error);
    return NextResponse.json({ message: 'An error occurred while creating the link' }, { status: 500 });
  }
}
