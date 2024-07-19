
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/database/client';

export async function PUT(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const tagId = path.split('/').pop();

  if (!tagId) {
    return NextResponse.json({ message: 'Tag ID parameter is missing' }, { status: 400 });
  }

  try {
    const { tagId, tag } = await req.json();

    const updatedTag = await prisma.tag.update({
      where: { tag_id: Number(tagId) },
      data: {
        tag_id: tagId,
        tag: tag,
      },
    });

    return NextResponse.json(updatedTag, { status: 200 });
  } catch (error) {
    console.error('Error updating tag:', error);
    return NextResponse.json({ message: 'An error occurred while updating the tag' }, { status: 500 });
  }
}
