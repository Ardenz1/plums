import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/database/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received request body:', body);

    const { title, description, topicDetailId } = body;

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

    const newNote = await prisma.note.create({
      data: {
        note_header: title,
        note_description: description,
        topic_detail_id: Number(topicDetailId),
      },
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json({ message: 'An error occurred while creating the note' }, { status: 500 });
  }
}
