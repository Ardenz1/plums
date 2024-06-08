const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// POST attachment
export async function addAttachment(attachment_header: string, attachment_description: string, attachment_link: string, topic_detail_id: number) {
  const attachment = await prisma.Attachment.create({
    data: {
      attachment_header: attachment_header,
      attachment_description: attachment_description,
      attachment_blob: attachment_link,
      topic_detail: {
        connect: { topic_detail_id: topic_detail_id }
      }
    }
  })
  return attachment;
}

// POST link
export async function addLink(link_header: string, link_description: string, link_hyperlink: string, topic_detail_id: number) {
  const link = await prisma.Link.create({
    data: {
      link_header: link_header,
      link_description: link_description,
      link_hyperlink: link_hyperlink,
      topic_detail: {
        connect: { topic_detail_id: topic_detail_id }
      }
    }
  })
  return link;
}

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
  const photo = await prisma.Photo.create({
    data: {
      photo_header: photo_header,
      photo_description: photo_description,
      photo_blob: photo_image,
      topic_detail: {
        connect: { topic_detail_id: topic_detail_id }
      }
    }
  })
  return photo;
}

// GET all topics
export async function getAllTopics() {
  const topics = await prisma.topic.findMany();
  return topics;
}

// GET topic details by topic id 
export async function getTopicDetails(topic_detail_id: number) {
  const topicDetails = await prisma.topic_Detail.findUnique({
    where: { topic_detail_id: topic_detail_id }
  });
  return topicDetails;
}

// returns all attachments by topic id
export async function getAllAttachments(topic_detail_id: number) {
  const attachments = await prisma.Attachment.findMany({
    where: { topic_detail_id: topic_detail_id }
  });
  return attachments;
}

// returns all links by topic id
export async function getAllLinks(topic_detail_id: number) {
  const links = await prisma.Link.findMany({
    where: { topic_detail_id: topic_detail_id }
  });
  return links;
}

// returns all notes by topic id
export async function getAllNotes(topic_detail_id: number) {
  const notes = await prisma.Note.findMany({
    where: { topic_detail_id: topic_detail_id }
  });
  return notes;
}

// GET all photos by topic id
export async function getAllPhotos(topic_detail_id: number) {
  const photos = await prisma.Photo.findMany({
    where: { topic_detail_id: topic_detail_id }
  });
  return photos;
}

// GET a single link by id
export async function getAttachmentById(attachment_id: number) {
  const attachment = await prisma.Attachment.findUnique({
    where: { attachment_id: attachment_id }
  });
  return attachment;
}

// GET a single link by id
export async function getLinkById(link_id: number) {
  const link = await prisma.Link.findUnique({
    where: { link_id: link_id }
  });
  return link;
}

// GET a single note by id
export async function getNoteById(note_id: number) {
  const note = await prisma.Note.findUnique({
    where: { note_id: note_id }
  });
  return note;
}

// GET a single photo by id
export async function getPhotoById(photo_id: number) {
  const photo = await prisma.Photo.findUnique({
    where: { photo_id: photo_id }
  });
  return photo;
}