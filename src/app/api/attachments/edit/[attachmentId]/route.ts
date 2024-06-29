
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const attachmentId = path.split('/').pop();

  console.log('Full path:', path);
  console.log('Extracted attachmentId:', attachmentId);

  if (!attachmentId) {
    return NextResponse.json({ message: 'attachment ID parameter is missing' }, { status: 400 });
  }


  try {
    const { title, description, attachment } = await req.json();
    const attachmentBuffer = Buffer.from(attachment);


    const updatedAttachment = await prisma.attachment.update({
      where: { attachment_id: Number(attachmentId) },
      data: {
        attachment_header: title,
        attachment_description: description,
        attachment_link: attachmentBuffer,
      },
    });

    return NextResponse.json(updatedAttachment, { status: 200 });
  } catch (error) {
    console.error('Error updating Attachment:', error);
    return NextResponse.json({ message: 'An error occurred while updating the Attachment' }, { status: 500 });
  }
}
