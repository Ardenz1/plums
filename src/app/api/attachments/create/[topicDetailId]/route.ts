import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const file = formData.get('file') as File | null;
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

    let attachmentLink = null;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name.replace(/\s/g, '_');
      await writeFile(path.join(process.cwd(), 'public/uploads/' + filename), buffer);
      attachmentLink = `/uploads/${filename}`;
    }

    const newAttachment = await prisma.attachment.create({
      data: {
        attachment_header: title,
        attachment_description: description,
        attachment_link: attachmentLink,
        topic_detail_id: Number(topicDetailId),
      },
    });

    return NextResponse.json(newAttachment, { status: 201 });
  } catch (error) {
    console.error('Error creating Attachment:', error);
    return NextResponse.json({ message: 'An error occurred while creating the Attachment' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
