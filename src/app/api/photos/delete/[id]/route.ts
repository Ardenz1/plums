import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();
 
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

    const deletedPhoto = await prisma.photo.update({
      where: { photo_id: Number(id) },
      data: updateData,
    });
 
    return NextResponse.json(deletedPhoto, { status: 200 });
  } catch (error) {
    console.error('Error deleting Photo:', error);
    return NextResponse.json({ message: 'An error occurred while deleting the Photo' }, { status: 500 });
  }
}
 
export const config = {
  api: {
    bodyParser: false,
  },
};