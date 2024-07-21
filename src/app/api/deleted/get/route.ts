import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/database/client';


export async function GET(req: NextRequest) {
  try {
    let deletedItems: any = [];
    const deletedAttachments = await prisma.attachment.findMany({ where: { is_deleted: true, } });
    const deletedLinks = await prisma.link.findMany({ where: { is_deleted: true, } });
    const deletedNotes = await prisma.note.findMany({ where: { is_deleted: true, } });
    const deletedPhotos = await prisma.photo.findMany({ where: { is_deleted: true, } });
    deletedItems.push([deletedAttachments, deletedLinks, deletedNotes, deletedPhotos])
    console.log('Fetched deleted items:', deletedItems); 

    return NextResponse.json(deletedItems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch deleted items' }, { status: 500 });
  }
}
