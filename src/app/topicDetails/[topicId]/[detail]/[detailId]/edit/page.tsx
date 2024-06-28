import { Metadata } from "next";

import AttachmentForm from "@/components/AttachmentForm";
import LinkForm from "@/components/LinkForm";
import NoteForm from "@/components/NoteForm";
import PhotoForm from "@/components/PhotoForm";

import BackButton from "@/components/BackButton";

// import { getAttachmentById, getLinkById, getNoteById, getPhotoById } from "@/database/database";
// import { Attachment, Link, Note, Photo } from "@prisma/client";

export const metadata: Metadata = {};

export default async function DetailPages({ params }: { params: { topicId: string, detail: string, detailId: string } }) {
  if (params.detail === "attachments") {
    metadata.title = "Edit Attachment";
    
    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}/attachments/${params.detailId}/`}/>
        <h1 className="text-plum-300 ">Edit Attachment</h1>
        <AttachmentForm 
          attachmentTitle="123"
          attachmentLink=""
          attachmentDescription=""
          btnType="save"
        />
      </main>
    )
  } else if (params.detail === "links") {
    metadata.title = "Edit Link";

    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}/links/${params.detailId}`}/>
        <h1 className="text-plum-300 ">Edit Link</h1>
        <LinkForm 
          linkTitle="cool link title"
          linkHyperlink=""
          linkDescription=""
          btnType="edit"
        />
      </main>
    )
  } else if (params.detail === "notes") {
    metadata.title = "Edit Note";

    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}/notes/${params.detailId}`}/>
        <h1 className="text-plum-300 ">Edit Note</h1>
        <NoteForm 
          noteTitle="cool note title"
          noteDescription=""
          btnType="save"
        />
      </main>
    )
  } else if (params.detail === "photos") {
    metadata.title = "Edit Photo";

    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}/photos/${params.detailId}`}/>
        <h1 className="text-plum-300 ">Edit Photo</h1>
        <PhotoForm 
          photoTitle="cool photo title"
          photoBlob=""
          photoDescription=""
          btnType="save"
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