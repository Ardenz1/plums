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
          attachmentId=""
          attachmentTitle=""
          attachmentLink=""
          attachmentDescription=""
          topicDetailId={params.topicId}
          btnType="create"
          btnPath={`/topicDetails/${params.topicId}/attachments`}
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
          linkTitle=""
          linkHyperlink=""
          linkDescription=""
          topicDetailId={params.topicId}
          btnType="create"
          btnPath={`/topicDetails/${params.topicId}/links`}
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
          noteId=""
          noteTitle="" 
          noteDescription="" 
          topicDetailId={params.topicId}
          btnType="create"
          btnPath={`/topicDetails/${params.topicId}/notes`}
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
          photoId=""
          photoLink=""
          photoTitle=""
          photoDescription=""
          topicDetailId={params.topicId}
          btnType="create"
          btnPath={`/topicDetails/${params.topicId}/photos`}
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