import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const linkId = path.split('/').pop();

  // console.log('Full path:', path);
  // console.log('Extracted linkId:', linkId);

  if (!linkId) {
    return NextResponse.json({ message: 'Note ID parameter is missing' }, { status: 400 });
  }

  try {
    const { title, description, hyperlink } = await req.json();

    const updatedLink = await prisma.link.update({
      where: { link_id: Number(linkId) },
      data: {
        link_header: title,
        link_description: description,
        link_hyperlink: hyperlink,
      },
    });

    return NextResponse.json(updatedLink, { status: 200 });
  } catch (error) {
    console.error('Error updating link:', error);
    return NextResponse.json({ message: 'An error occurred while updating the link' }, { status: 500 });
  }
}
