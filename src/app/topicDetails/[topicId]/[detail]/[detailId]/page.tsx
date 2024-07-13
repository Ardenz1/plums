import { Metadata } from "next";

import AttachmentCardSingle from "@/components/AttachmentCardSingle";
import LinkCardSingle from "@/components/LinkCardSingle";
import NoteCardSingle from "@/components/NoteCardSingle";
import PhotoCardSingle from "@/components/PhotoCardSingle";

import BackButton from "@/components/BackButton";
import FooterButtons from "@/components/FooterButtons";

import { getAttachmentById, getLinkById, getNoteById, getPhotoById } from "@/database/database";
import { Attachment, Link, Note, Photo } from "@prisma/client";

export const metadata: Metadata = {};

export default async function SingleView({ params }: { params: { topicId: string, detail: string, detailId: string } }) {
  if (params.detail === "attachments") {
    metadata.title = "Attachment";
    console.log('Detail ID:', params.detailId); // Add this line

    const attachment: Attachment = await getAttachmentById(parseInt(params.detailId));

    console.log('Detail ID:', params.detailId); // Add this line

 
    if (!attachment) {
      return (
        <main>
          <BackButton back={`/topicDetails/${params.topicId}`} />
          <h1>Attachment</h1>
          <p>No attachment found with the given ID 😞</p>
        </main>
      )
    } else {
      return (
        <main>
          <BackButton back={`/topicDetails/${params.topicId}/attachments`} />
          <h1>Attachment</h1>
          <AttachmentCardSingle
            key={attachment.attachment_id}
            attachment={attachment?.attachment_link || 'file.docx'}
            attachmentTitle={attachment.attachment_header}
            attachmentCreated={attachment.attachment_created_at}
            attachmentDescription={attachment.attachment_description!}
          />
        </main>
      )
    }
  } else if (params.detail === "links") {
    metadata.title = "Link";
    const link: Link = await getLinkById(parseInt(params.detailId));

    if (!link) {
      return (
        <main>
          <BackButton back={`/topicDetails/${params.topicId}/links`} />
          <h1>Link</h1>
          <p>No link found with the given ID 😞</p>
        </main>
      )
    }
    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}/links`} />
        <h1>Link</h1>

        <LinkCardSingle
          key={link.link_id}
          link_title={link.link_header}
          link_hyperlink={link.link_hyperlink}
          link_created_at={link.link_created_at}
          link_description={link.link_description!}
        />
      </main>
    )
  } else if (params.detail === "notes") {
    metadata.title = "Note";
    const note: Note = await getNoteById(parseInt(params.detailId));

    if (!note) {
      return (
        <main>
          <BackButton back={`/topicDetails/${params.topicId}`} />
          <h1>Note</h1>
          <p>No note found with the given ID 😞</p>
        </main>
      )
    }
    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}/notes`} />
        <h1>Note</h1>
        <NoteCardSingle
          key={note.note_id}
          note_title={note.note_header}
          note_created_at={note.note_created_at}
          note_description={note.note_description!}
        />
      </main>
    )
  } else if (params.detail === "photos") {
    metadata.title = "Photo";
    const photo: Photo = await getPhotoById(parseInt(params.detailId));

    if (!photo) {
      return (
        <main>
          <BackButton back={`/topicDetails/${params.topicId}/photos`} />
          <h1>Photo</h1>
          <p>No photo found with the given ID 😞</p>
        </main>
      )
    }
    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}/photos`} />
        <h1>Photo</h1>
        <PhotoCardSingle
          key={photo.photo_id}
          photoLink={photo.photo_image}
          photoTitle={photo.photo_header}
          photoCreated={photo.photo_created_at}
          photoDescription={photo.photo_description!}
        />
      </main>
    )
  } else {
    return (
      <main>
        <h1>Uh oh...</h1>
        <p>Looks like you&apos;re lost!</p>
        <a href="/">Back to home</a>
      </main>
    )
  }
}

// if (params.detail === "attachments") {

// } else if (params.detail === "links") {

// } else if (params.detail === "notes") {

// } else if (params.detail === "photos") {

// } else {
//   return (
//     <main>
//       <h1>Uh oh...</h1>
//       <p>Looks like you&aposre lost!</p>
//       <a href="/">Back to home</a>
//     </main>
//   )
// }