const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()// sample data goes here!

// // example of creating data with prisma!!
// const user = await prisma.user.create({
//   data: {
//     email: 'elsa@prisma.io',
//     name: 'Elsa Prisma',
//   },
// })

function addSampleData() {
  // topic_id      Int      @id @default(autoincrement())
  // topic_name          String   
  // created_at    DateTime @default(now())
  // updated_at    DateTime @updatedAt

  // // Define the one-to-many relationship with Topic_Details
  // topic_details Topic_Detail[]
  prisma.Topic.create({
    data: {
      topic_id: 1,
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
      note_header: 'Sample note 1',
      note_description: 'Sample not description Lorem ipsum dolor sit amet',
      note_created_at: '',
      topic_detail: {
        connect: { topic_id: 1 }
      }
    }
  })
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
  prisma.Note.create({
    data: {
      note_header: 'Sample note 2',
      note_description: 'Sample not description Lorem ipsum dolor sit amet this note is longer than the last.',
      note_created_at: '',
      topic_detail: {
        connect: { id: 1 }
      }
    }
  })
}

