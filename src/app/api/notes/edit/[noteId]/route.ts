
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const noteId = path.split('/').pop();

  if (!noteId) {
    return NextResponse.json({ message: 'Note ID parameter is missing' }, { status: 400 });
  }

  try {
    const { title, description } = await req.json();

    const updatedNote = await prisma.note.update({
      where: { note_id: Number(noteId) },
      data: {
        note_header: title,
        note_description: description,
      },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json({ message: 'An error occurred while updating the note' }, { status: 500 });
  }
}
