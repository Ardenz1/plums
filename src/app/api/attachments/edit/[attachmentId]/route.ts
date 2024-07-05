
// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function PUT(req: NextRequest) {
//   const path = req.nextUrl.pathname;
//   const attachmentId = path.split('/').pop();

//   console.log('Full path:', path);
//   console.log('Extracted attachmentId:', attachmentId);

//   if (!attachmentId) {
//     return NextResponse.json({ message: 'attachment ID parameter is missing' }, { status: 400 });
//   }


//   try {
//     const { title, description, attachment } = await req.json();
//     const attachmentBuffer = Buffer.from(attachment);


//     const updatedAttachment = await prisma.attachment.update({
//       where: { attachment_id: Number(attachmentId) },
//       data: {
//         attachment_header: title,
//         attachment_description: description,
//         attachment_link: attachmentBuffer,
//       },
//     });

//     return NextResponse.json(updatedAttachment, { status: 200 });
//   } catch (error) {
//     console.error('Error updating Attachment:', error);
//     return NextResponse.json({ message: 'An error occurred while updating the Attachment' }, { status: 500 });
//   }
// }


// const { NextRequest, NextResponse } = require('next/server');
// const path = require('path');
// const { writeFile } = require('fs/promises');
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// export async function PUT(req: typeof NextRequest, res: typeof NextResponse) {
//   const attachmentId = req.url.split('/').pop();

//   if (!attachmentId) {
//     return res.status(400).json({ message: 'Attachment ID parameter is missing' });
//   }

//   try {
//     const formData = await req.formData();

//     const title = formData.get('title');
//     const description = formData.get('description');
//     const file = formData.get('file');

//     let attachmentLink = null;

//     if (file) {
//       const buffer = Buffer.from(await file.arrayBuffer());
//       const filename = file.name.replaceAll(' ', '_');
//       await writeFile(path.join(process.cwd(), 'public/uploads/' + filename), buffer);
//       attachmentLink = `/uploads/${filename}`;
//     }

//     const updateData = {
//       attachment_header: title,
//       attachment_description: description,
//       attachment_link: attachmentLink,
//     };

//     if (attachmentLink) {
//       updateData.attachment_link = attachmentLink;
//     }

//     const updatedAttachment = await prisma.attachment.update({
//       where: { attachment_id: Number(attachmentId) },
//       data: updateData,
//     });

//     return res.status(200).json(updatedAttachment);
//   } catch (error) {
//     console.error('Error updating Attachment:', error);
//     return res.status(500).json({ message: 'An error occurred while updating the Attachment' });
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { attachmentId: string } }) {
  const attachmentId = params.attachmentId;

  if (!attachmentId) {
    return NextResponse.json({ message: 'Attachment ID parameter is missing' }, { status: 400 });
  }

  try {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const file = formData.get('file') as File | null;

    let attachmentLink = null;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name.replace(/\s/g, '_');
      await writeFile(path.join(process.cwd(), 'public/uploads/' + filename), buffer);
      attachmentLink = `/uploads/${filename}`;
    }

    const updateData: any = {
      attachment_header: title,
      attachment_description: description,
      attachment_link: attachmentLink,
    };

    if (attachmentLink) {
      updateData.attachment_link = attachmentLink;
    }

    const updatedAttachment = await prisma.attachment.update({
      where: { attachment_id: Number(attachmentId) },
      data: updateData,
    });

    return NextResponse.json(updatedAttachment, { status: 200 });
  } catch (error) {
    console.error('Error updating Attachment:', error);
    return NextResponse.json({ message: 'An error occurred while updating the Attachment' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
