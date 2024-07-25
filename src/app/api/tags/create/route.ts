import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/database/client';

export const dynamic = 'force-dynamic';


export async function POST(req: NextRequest) {
  try {
    const { tag } = await req.json(); // Expecting 'tag' instead of 'title'

    const newTag = await prisma.tag.create({
      data: {
        tag, // Matching the schema field name
      },
    });

    return NextResponse.json(newTag, { status: 201 });
  } catch (error) {
    console.error('Error creating tag:', error);
    return NextResponse.json({ message: 'An error occurred while creating the tag' }, { status: 500 });
  }
}
