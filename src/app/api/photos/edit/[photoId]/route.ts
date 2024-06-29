
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const photoId = path.split('/').pop();

  console.log('Full path:', path);
  console.log('Extracted photoId:', photoId);

  if (!photoId) {
    return NextResponse.json({ message: 'Note ID parameter is missing' }, { status: 400 });
  }

  try {
    const { title, description, image } = await req.json();

    const updatedNote = await prisma.photo.update({
      where: { photo_id: Number(photoId) },
      data: {
        photo_header: title,
        photo_description: description,
        photo_image: image,
      },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error('Error updating photo:', error);
    return NextResponse.json({ message: 'An error occurred while updating the photo' }, { status: 500 });
  }
}
