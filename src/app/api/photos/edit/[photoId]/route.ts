import { NextRequest, NextResponse } from 'next/server';
import nodePath from 'path'
import { writeFile } from 'fs/promises';
import prisma from '@/database/client';

export const runtime = 'nodejs'; 

 
export async function PUT(req: NextRequest) {
  const urlPath = req.nextUrl.pathname; // Rename 'path' to 'urlPath' or any other name
  const photoId = urlPath.split('/').pop();
 
 
  if (!photoId) {
    return NextResponse.json({ message: 'Photo ID parameter is missing' }, { status: 400 });
  }
 
  try {
    const formData = await req.formData();
 
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const file = formData.get('photo') as File | null;
 
    let photoPath = null;
 
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name.replace(/\s/g, '_');
      await writeFile(nodePath.join(process.cwd(), 'public/uploads/' + filename), buffer); // Use 'nodePath.join' instead of 'path.join'
      photoPath = `/uploads/${filename}`;
    }
 
    const updateData: any = {
      photo_header: title,
      photo_description: description,
      photo_image: photoPath,
    };
 
    if (photoPath) {
      updateData.photo_image = photoPath;
    }
 
    const updatedPhoto = await prisma.photo.update({
      where: { photo_id: Number(photoId) },
      data: updateData,
    });
 
    return NextResponse.json(updatedPhoto, { status: 200 });
  } catch (error) {
    console.error('Error updating photo:', error);
    return NextResponse.json({ message: 'An error occurred while updating the photo' }, { status: 500 });
  }
}
 
