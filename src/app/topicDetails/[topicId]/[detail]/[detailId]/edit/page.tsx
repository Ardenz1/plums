import { Metadata } from "next";

import AttachmentForm from "@/components/AttachmentForm";
import LinkForm from "@/components/LinkForm";
import NoteForm from "@/components/NoteForm";
import PhotoForm from "@/components/PhotoForm";

import { getAttachmentById, getLinkById, getNoteById, getPhotoById } from "@/database/database";

import BackButton from "@/components/BackButton";

// import { getAttachmentById, getLinkById, getNoteById, getPhotoById } from "@/database/database";
// import { Attachment, Link, Note, Photo } from "@prisma/client";

export const metadata: Metadata = {};

export default async function DetailPages({ params }: { params: { topicId: string, detail: string, detailId: string } }) {
  if (params.detail === "attachments") {
    metadata.title = "Edit Attachment";
    const attachment = await getAttachmentById(parseInt(params.detailId));
    
    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}/attachments/${params.detailId}/`}/>
        <h1 className="text-plum-300 ">Edit Attachment</h1>
        <AttachmentForm 
          attachmentId = {params.detailId}
          attachmentTitle={attachment.attachment_header}
          attachmentLink={attachment.attachment_link}
          attachmentDescription={attachment.attachment_description}
          btnType="edit"
          btnPath={`/topicDetails/${params.topicId}/attachments/${params.detailId}/`}
        />
      </main>
    )
  } else if (params.detail === "links") {
    metadata.title = "Edit Link";
    const link = await getLinkById(parseInt(params.detailId));

    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}/links/${params.detailId}`}/>
        <h1 className="text-plum-300 ">Edit Link</h1>
        <LinkForm 
          linkId = {params.detailId}
          linkTitle={link.link_header}
          linkHyperlink={link.link_hyperlink}
          linkDescription={link.link_description!}
          btnType="edit"
          btnPath={`/topicDetails/${params.topicId}/links/${params.detailId}/`}
        />
      </main>
    )
  } else if (params.detail === "notes") {
    metadata.title = "Edit Note";
    const note = await getNoteById(parseInt(params.detailId));
    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}/notes/${params.detailId}`}/>
        <h1 className="text-plum-300 ">Edit Note</h1>
        <NoteForm 
          noteId = {params.detailId}
          noteTitle={note.note_header}
          noteDescription={note.note_description!}
          btnType="save"
          btnPath={`/topicDetails/${params.topicId}/notes/${params.detailId}/`}
        />
      </main>
    )
  } else if (params.detail === "photos") {
    metadata.title = "Edit Photo";
    const photo = await getPhotoById(parseInt(params.detailId));

    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}/photos/${params.detailId}`}/>
        <h1 className="text-plum-300 ">Edit Photo</h1>
        <PhotoForm 
          photoId = {params.detailId}
          photoTitle={photo.photo_header}
          photoLink={photo.photo_path}
          // photoBlob = "/pic1.jpg"
          photoDescription={photo.photo_description}
          btnType="save"
          btnPath={`/topicDetails/${params.topicId}/photos/${params.detailId}/`}
        />
      </main>
    )
  } else {
    return (
      <main>
        <h1>Uh oh...</h1>
        <p>Looks like you&aposre lost!</p>
        <a href="/">Back to home</a>
      </main>
    )
  }
}