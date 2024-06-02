const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// queries go here!

// POST note
export async function addNote(note_header: string, note_description: string, topic_detail_id: number) {
  const note = await prisma.Note.create({
    data: {
      note_header: note_header,
      note_description: note_description,
      topic_detail: {
        connect: { topic_detail_id: topic_detail_id }
      }
    }
  })
  return note;
}