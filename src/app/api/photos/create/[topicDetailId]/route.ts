// api/photos/create/[topicDetailId].ts

import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
import prisma from '@/database/client';

export const runtime = 'nodejs'; 


export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const file = formData.get('photo') as File | null;
    const topicDetailId = formData.get('topicDetailId') as string;

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

    let photoPath = null;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name.replace(/\s/g, '_');
      await writeFile(path.join(process.cwd(), 'public/uploads/' + filename), buffer);
      photoPath = filename !== 'null' ? `/uploads/${filename}` : '';
    }

    const newPhoto = await prisma.photo.create({
      data: {
        photo_header: title,
        photo_description: description,
        photo_image: photoPath !== null ? photoPath : '',
        topic_detail_id: Number(topicDetailId),
      },
    });

    return NextResponse.json(newPhoto, { status: 201 });
  } catch (error) {
    console.error('Error creating Photo:', error);
    return NextResponse.json({ message: 'An error occurred while creating the Photo' }, { status: 500 });
  }
}

