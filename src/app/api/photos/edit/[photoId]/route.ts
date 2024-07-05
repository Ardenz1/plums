
import { NextRequest, NextResponse } from 'next/server';
import * as nodePath from 'path';
import { readFile } from 'fs/promises';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const photoId = path.split('/').pop();

  console.log('Full path:', path);
  console.log('Extracted photoId:', photoId);

  if (!photoId) {
    return NextResponse.json({ message: 'Photo ID parameter is missing' }, { status: 400 });
  }

  try {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const file = formData.get('photo') as File | null;

    let photoImage = null;

    if (file) {
      const buffer = await readFile(nodePath.join(process.cwd(), file.name));
      photoImage = `data:${file.type};base64,${buffer.toString('base64')}`;
    }

    const updateData: any = {
      photo_header: title,
      photo_description: description,
      photo_image: photoImage,
    };

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

export const config = {
  api: {
    bodyParser: false,
  },
};

// first old
// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function PUT(req: NextRequest) {
//   const path = req.nextUrl.pathname;
//   const photoId = path.split('/').pop();

//   console.log('Full path:', path);
//   console.log('Extracted photoId:', photoId);

//   if (!photoId) {
//     return NextResponse.json({ message: 'Photo ID parameter is missing' }, { status: 400 });
//   }

//   try {
//     const { title, description, image } = await req.json();

//     const updatedNote = await prisma.photo.update({
//       where: { photo_id: Number(photoId) },
//       data: {
//         photo_header: title,
//         photo_description: description,
//         photo_image: image,
//       },
//     });

//     return NextResponse.json(updatedNote, { status: 200 });
//   } catch (error) {
//     console.error('Error updating photo:', error);
//     return NextResponse.json({ message: 'An error occurred while updating the photo' }, { status: 500 });
//   }
// }


// second OLD CODE 

// import { NextRequest, NextResponse } from 'next/server';
// import nodePath from 'path'
// import { writeFile } from 'fs/promises';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function PUT(req: NextRequest) {
//   const urlPath = req.nextUrl.pathname; // Rename 'path' to 'urlPath' or any other name
//   const photoId = urlPath.split('/').pop();

//   console.log('Full path:', urlPath);
//   console.log('Extracted photoId:', photoId);

//   if (!photoId) {
//     return NextResponse.json({ message: 'Photo ID parameter is missing' }, { status: 400 });
//   }

//   try {
//     const formData = await req.formData();

//     const title = formData.get('title') as string;
//     const description = formData.get('description') as string;
//     const file = formData.get('photo') as File | null;

//     let photoImage = null;

//     if (file) {
//       const buffer = Buffer.from(await file.arrayBuffer());
//       const filename = file.name.replace(/\s/g, '_');
//       await writeFile(nodePath.join(process.cwd(), 'public/uploads/' + filename), buffer); // Use 'nodePath.join' instead of 'path.join'
//       photoImage = `/uploads/${filename}`;
//     }

//     const updateData: any = {
//       photo_header: title,
//       photo_description: description,
//       photo_image: photoImage,
//     };

//     if (photoImage) {
//       updateData.photo_image = photoImage;
//     }

//     const updatedPhoto = await prisma.photo.update({
//       where: { photo_id: Number(photoId) },
//       data: updateData,
//     });

//     return NextResponse.json(updatedPhoto, { status: 200 });
//   } catch (error) {
//     console.error('Error updating photo:', error);
//     return NextResponse.json({ message: 'An error occurred while updating the photo' }, { status: 500 });
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
