import { Metadata } from "next";

import AttachmentCard from "@/components/AttachmentCard";
import LinkCard from "@/components/LinkCard";
import NoteCard from "@/components/NoteCard";
import PhotoCard from "@/components/PhotoCard";
import BackButton from "@/components/BackButton";

import { Attachment, Link, Note, Photo } from "@prisma/client"
import { getAllDeleted } from "@/database/database";
export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Topic Details",
};

export default async function DeletedPage() {
  let deletedTopicsList: any = await getAllDeleted();
  if (
    deletedTopicsList[0].length === 0 &&
    deletedTopicsList[1].length === 0 &&
    deletedTopicsList[2].length === 0 &&
    deletedTopicsList[3].length === 0
  ) {
    return (
      <main>
        <BackButton back="/" />
        <h1>Deleted</h1>
        <p>No items have been deleted...</p>
      </main>
    );
  } else {
    return (
      <main>
        <BackButton back="/" />
        <h1>Deleted</h1>
        {deletedTopicsList[0].map((attachment: Attachment) => {
          return (
            <AttachmentCard
              key={attachment.attachment_id}
              // need new attribute for attachment_link
              // and maybe update column_name from attachment_link to attachment_???
              attachment={attachment?.attachment_link || "file.docx"}
              attachmentTitle={attachment.attachment_header}
              attachmentCreated={attachment.attachment_created_at}
              attachmentDescription={attachment.attachment_description}
              attachmentSingleView=''
            />
          );
        })}
        {deletedTopicsList[1].map((link: Link) => {
          return (
            <LinkCard
              key={link.link_id}
              link_title={link.link_header}
              link_created_at={link.link_created_at}
              link_hyperlink={link.link_hyperlink}
              link_description={link.link_description}
              link_single_view=''
            />
          );
        })}
        {deletedTopicsList[2].map((note: Note) => {
          return (
            <NoteCard
              key={note.note_id}
              note_title={note.note_header}
              note_created_at={note.note_created_at}
              note_description={note.note_description}
              singleView=''
              // added the above code, might need to take out
            />
          );
        })}
        {deletedTopicsList[3].map((photo: Photo) => {
          return (
            <PhotoCard
              key={photo.photo_id}
              photoLink={photo.photo_image}
              photoTitle={photo.photo_header}
              photoCreated={photo.photo_created_at}
              photoDescription={photo.photo_description}
              singleView=''
            />
          );
        })}
      </main>
    )
  }
}
