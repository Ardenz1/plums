import { NextResponse } from 'next/server';
import prisma from '@/database/client';
 
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
 
  if (!id) {
    return NextResponse.json({ message: 'ID parameter is missing' }, { status: 400 });
  }
 
  try {
    const formData = await req.formData();
 
    const isDeleted = formData.get('isDeleted') as string;
 
    const updateData: any = {
      is_deleted: Boolean(isDeleted),
    };

    const deletedAttachment = await prisma.attachment.update({
      where: { attachment_id: Number(id) },
      data: updateData,
    });
 
    return NextResponse.json(deletedAttachment, { status: 200 });
  } catch (error) {
    console.error('Error deleting Attachment:', error);
    return NextResponse.json({ message: 'An error occurred while deleting the Attachment' }, { status: 500 });
  }
}
 
export const config = {
  api: {
    bodyParser: false,
  },
};