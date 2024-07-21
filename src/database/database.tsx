import prisma from '@/database/client';
import { Attachment, Link, Note, Photo } from '@prisma/client';

// GET all topics
// export async function getAllTopics() {
//   const topics = await prisma.topic.findMany();
//   return topics;
// }

  export async function getAllTopics() {
    const topics = await prisma.topic.findMany({
      where: { 
        is_deleted: false
      }
    });
    return topics;}
// GET topic by id
export async function getTopicById(topic_id: number) {
  const topic = await prisma.topic.findUnique({
    where: { topic_id: topic_id }
  });
  return topic;
}

// GET topic by tag
export async function getTopicIdsbyTagId(tag_id: number) {
  const topic = await prisma.topic_Tag.findMany({
    where: { tag_id: tag_id }
  });
  return topic;
}

// GET topic details by topic id 
export async function getTopicDetails(topic_detail_id: number) {
  const topicDetails = await prisma.topic_Detail.findUnique({
    where: { topic_detail_id: topic_detail_id},
    select: {
      attachments: true,
      links: true,
      notes: true,
      photos: true,
    }
  });
  return topicDetails;
}

// returns all attachments by topic id
export async function getAllAttachments(topic_detail_id: number) {
  const attachments = await prisma.attachment.findMany({
    where: { 
      topic_detail_id: topic_detail_id,
      is_deleted: false,
    }
  });
  return attachments;
}

// returns all links by topic id
export async function getAllLinks(topic_detail_id: number) {
  const links = await prisma.link.findMany({
    where: { 
      topic_detail_id: topic_detail_id,
      is_deleted: false,
    }
  });
  return links;
}

// returns all notes by topic id
export async function getAllNotes(topic_detail_id: number) {
  const notes = await prisma.note.findMany({
    where: { 
      topic_detail_id: topic_detail_id,
      is_deleted: false,
    }
  });
  return notes;
}

// GET all photos by topic id
export async function getAllPhotos(topic_detail_id: number) {
  const photos = await prisma.photo.findMany({
    where: { 
      topic_detail_id: topic_detail_id,
      is_deleted: false,
    }
  });
  return photos;
}

// GET a single link by id
export async function getAttachmentById(attachment_id: number) {
  const attachment = await prisma.attachment.findUnique({
    where: { attachment_id: attachment_id }
  });
  return attachment;
}

// GET a single link by id
export async function getLinkById(link_id: number) {
  const link = await prisma.link.findUnique({
    where: { link_id: link_id }
  });
  return link;
}

// GET a single note by id
export async function getNoteById(note_id: number) {
  const note = await prisma.note.findUnique({
    where: { note_id: note_id }
  });
  return note;
}

// GET a single photo by id
export async function getPhotoById(photo_id: number) {
  const photo = await prisma.photo.findUnique({
    where: { photo_id: photo_id }
  });
  return photo;
}

// GET all photos by topic id
export async function getAllDeleted() {
  const attachments = await prisma.attachment.findMany({
    where: { is_deleted: true }
  })
  const links = await prisma.link.findMany({
    where: { is_deleted: true }
  })
  const notes = await prisma.note.findMany({
    where: { is_deleted: true }
  })
  const photos = await prisma.photo.findMany({
    where: { is_deleted: true }
  })
  return [attachments, links, notes, photos];
}