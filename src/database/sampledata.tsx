const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// sample data goes here!
// DONT run this!!

export async function addSampleData() {

  const blob1 = fetch("/pic1.jpg").then(function(res) {
    return res.blob();
  })
  const blob2 = fetch("/pic2.jpg").then(function(res) {
    return res.blob();
  })
  const blob3 = fetch("/pic2.jpg").then(function(res) {
    return res.blob();
  })
  // topic_id      Int      @id @default(autoincrement())
  // topic_name          String   
  // created_at    DateTime @default(now())
  // updated_at    DateTime @updatedAt

  // Define the one-to-many relationship with Topic_Details
  // topic_details Topic_Detail[]
  prisma.Topic.create({
    data: {
      topic_name: 'Sample topic',
    }
  })

  // note_id         Int      @id @default(autoincrement())
  // note_header          String
  // note_description     String?
  // note_created_at      DateTime @default(now())
  // note_updated_at      DateTime @updatedAt

  // // Define the many-to-one relationship with Topic_Detail
  // topic_detail    Topic_Detail @relation(fields: [topic_detail_id], references: [topic_id])
  // topic_detail_id Int
  prisma.Note.create({
    data: {
      note_header: 'Sample note 2',
      note_description: 'Sample not description Lorem ipsum dolor sit amet this note is longer than the last. This note is very long very very very long that is whay this note has been going on for so long, so that we can demonstrate what happens when a note is really long ',
      note_created_at: '',
      topic_detail: {
        connect: { topic_id: 1 }
      }
    }
  })

  
  // photo_id              Int      @id @default(autoincrement())
  // photo_header          String
  // photo_description     String?
  // photo_image           Bytes
  // photo_created_at      DateTime @default(now())
  // photo_updated_at      DateTime @updatedAt

  // // Define the many-to-one relationship with Topic_Detail
  // topic_detail    Topic_Detail @relation(fields: [topic_detail_id], references: [topic_detail_id])
  // topic_detail_id Int
  prisma.Photo.create({
    data: {
      photo_header: 'Sample photo 1',
      photo_description: 'Sample photo description Lorem ipsum dolor sit amet this note is longer than the last. This note is very long very very very long that is whay this note has been going on for so long, so that we can demonstrate what happens when a note is really long ',
      photo_image: blob1,
      topic_detail: {
        connect: { topic_id: 1 }
      }
    }
  })
  prisma.Photo.create({
    data: {
      photo_header: 'Sample photo 2',
      photo_description: 'Sample photo hehe haha',
      photo_image: blob2,
      topic_detail: {
        connect: { topic_id: 1 }
      }
    }
  })
  prisma.Photo.create({
    data: {
      photo_header: 'Sample photo 3',
      photo_description: 'Sample photo description Lorem ipsum dolor sit amet',
      topic_detail: {
        connect: { topic_id: 1 }
      }
    }
  })

  // attachment_id              Int      @id @default(autoincrement())
  // attachment_header          String
  // attachment_description     String?
  // attachment_link            Bytes
  // attachment_created_at      DateTime @default(now())
  // attachment_updated_at      DateTime @updatedAt
  prisma.Attachment.create({
    data: {
      attachment_header: 'Sample attachment 1',
      attachment_description: 'Sample attachment description Lorem ipsum dolor sit amet this note is longer than the last. This note is very long very very very long that is whay this note has been going on for so long, so that we can demonstrate what happens when a note is really long ',
      topic_detail: {
        connect: { topic_id: 1 }
      }
    }
  })
  prisma.Attachment.create({
    data: {
      attachment_header: 'Sample attachment 2',
      attachment_description: 'Sample attachment hehe haha',
      topic_detail: {
        connect: { topic_id: 1 }
      }
    }
  })
  prisma.Attachment.create({
    data: {
      attachment_header: 'Sample attachment 3',
      attachment_description: 'Sample attachment description Lorem ipsum dolor sit amet',
      topic_detail: {
        connect: { topic_id: 1 }
      }
    }
  })
  // prisma.Note.create({
  //   data: {
  //     note_header: 'Sample note 2',
  //     note_description: 'Sample not description Lorem ipsum dolor sit amet this note is longer than the last.',
  //     note_created_at: '',
  //     topic_detail: {
  //       connect: { id: 1 }
  //     }
  //   }
  // })
}