import { NextResponse } from 'next/server';
import prisma from '@/database/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';


export async function PUT(req: Request, { params }: { params: { tagId: string } }) {
  const tagId = params.tagId;

  if (!tagId) {
    return NextResponse.json({ message: 'TagID parameter is missing' }, { status: 400 });
  }

  try {
    const { isDeleted } = await req.json(); 

    const updateData: any = {
      is_deleted: Boolean(isDeleted),
    };

    const deletedTag = await prisma.tag.update({
      where: { tag_id: Number(tagId) },
      data: updateData,
    });

    return NextResponse.json(deletedTag, { status: 200 });
  } catch (error) {
    console.error('Error deleting Tag:', error);
    return NextResponse.json({ message: 'An error occurred while deleting the Tag' }, { status: 500 });
  }
}
