const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

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

// POST photo
export async function addPhoto(photo_header: string, photo_description: string, photo_image: string, topic_detail_id: number) {
  const note = await prisma.Photo.create({
    data: {
      photo_header: photo_header,
      photo_description: photo_description,
      photo_blob: photo_image,
      topic_detail: {
        connect: { topic_detail_id: topic_detail_id }
      }
    }
  })
  return note;
}

// POST attachment
export async function addAttachment(attachment_header: string, attachment_description: string, attachment_link: string, topic_detail_id: number) {
  const note = await prisma.Attachment.create({
    data: {
      attachment_header: attachment_header,
      attachment_description: attachment_description,
      attachment_blob: attachment_link,
      topic_detail: {
        connect: { topic_detail_id: topic_detail_id }
      }
    }
  })
  return note;
}

// POST link
export async function addLink(link_header: string, link_description: string, link_hyperlink: string, topic_detail_id: number) {
  const note = await prisma.Link.create({
    data: {
      link_header: link_header,
      link_description: link_description,
      link_hyperlink: link_hyperlink,
      topic_detail: {
        connect: { topic_detail_id: topic_detail_id }
      }
    }
  })
  return note;
}

// returns all topics
export async function getAllTopics() {
  const topics = await prisma.Topic.findMany();
  return topics;
}

// returns all photos by topic id
export async function getAllPhotos(topic_id: number) {
  const topics = await prisma.Photo.findMany({
    where: { topic_id: topic_id }
  });
  return topics;
}

// returns all notes by topic id
export async function getAllNotes(topic_id: number) {
  const topics = await prisma.Note.findMany({
    where: { topic_id: topic_id }
  });
  return topics;
}

// returns all attachments by topic id
export async function getAllAttachments(topic_id: number) {
  const topics = await prisma.Attachment.findMany({
    where: { topic_id: topic_id }
  });
  return topics;
}

// returns all links by topic id
export async function getAllLinks(topic_id: number) {
  const topics = await prisma.Link.findMany({
    where: { topic_id: topic_id }
  });
  return topics;
}