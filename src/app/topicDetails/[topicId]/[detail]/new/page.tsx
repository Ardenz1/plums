import { Metadata } from "next";

import AttachmentForm from "@/components/AttachmentForm";
import LinkForm from "@/components/LinkForm";
import NoteForm from "@/components/NoteForm";
import PhotoForm from "@/components/PhotoForm";

import BackButton from "@/components/BackButton";

// import { Attachment, Link, Note, Photo } from "@prisma/client";

export const metadata: Metadata = {};

export default async function DetailPages({ params }: { params: { topicId: string, detail: string } }) {
  if (params.detail === "attachments") {
    metadata.title = "New Attachment";

    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}/attachments`}/>
        <h1 className="text-plum-300 ">Create Attachment</h1>
        <AttachmentForm 
          attachmentTitle="123"
          attachmentLink=""
          attachmentDescription=""
          btnType="create"
        />
      </main>
    )
  } else if (params.detail === "links") {
    metadata.title = "New Link";

    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}/links`}/>
        <h1 className="text-plum-300 ">Create Link</h1>
        <LinkForm 
          linkTitle="Cool link title"
          linkHyperlink=""
          linkDescription=""
          btnType="create"
        />
      </main>
    )
  } else if (params.detail === "notes") {
    metadata.title = "New Note";

    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}/notes`}/>
        <h1 className="text-plum-300 ">Create Note</h1>
        <NoteForm 
          // note_id={-1}
          noteTitle="" 
          noteDescription="" 
          btnType="create"
        />
      </main>
    )
  } else if (params.detail === "photos") {
    metadata.title = "New Photo";

    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}/photos`}/>
        <h1 className="text-plum-300 ">Create Photo</h1>
        <PhotoForm 
          photoBlob=""
          photoTitle=""
          photoDescription=""
          btnType="create"
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