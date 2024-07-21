import { Metadata } from "next";

import AttachmentCard from "@/components/AttachmentCard";
import LinkCard from "@/components/LinkCard";
import NoteCard from "@/components/NoteCard";
import PhotoCard from "@/components/PhotoCard";

import BackButton from "@/components/BackButton";

import { getAllAttachments, getAllLinks, getAllNotes, getAllPhotos } from "@/database/database";
import { Attachment, Link, Note, Photo } from "@prisma/client";

export const metadata: Metadata = {};
export const dynamic = "force-dynamic";


export default async function DetailPages({ params }: { params: { topicId: string, detail: string } }) {
  // detail slug should be attachments, links, notes, or photos
  if (params.detail === "attachments") {
    metadata.title = "Attachments";
    let attachments: Attachment[] = await getAllAttachments(parseInt(params.topicId));
    if (attachments.length == 0) {
      return(
        <main>
          <BackButton back={`/topicDetails/${params.topicId}`} />
          <h1>Attachments</h1>
          <p>Nothing to see here...</p>
        </main>
      )
    } else {
      return(
        <main>
          <BackButton back={`/topicDetails/${params.topicId}`} />
          <h1>Attachments</h1>
          {
            attachments.map(attachment => {
              return (
                <AttachmentCard 
                  key={attachment.attachment_id}
                  // need new attribute for attachment_link
                  // and maybe update column_name from attachment_link to attachment_???
                  attachment={attachment?.attachment_link || 'file.docx'}
                  attachmentTitle={attachment.attachment_header}
                  attachmentCreated={attachment.attachment_created_at} 
                  attachmentDescription={attachment.attachment_description} 
                  attachmentSingleView={`/topicDetails/${params.topicId}/attachments/${attachment.attachment_id}`}
                />
              )
            })
          }
        </main>
      )
    }
  } else if (params.detail === "links") {
    metadata.title = "Links";
    let links: Link[] = await getAllLinks(parseInt(params.topicId));
    if (links.length == 0) {
      return(
        <main>
          <BackButton back={`/topicDetails/${params.topicId}`} />
          <h1>Links</h1>
          <p>Nothing to see here...</p>
        </main>
      )
    } else {
      return(
        <main>
          <BackButton back={`/topicDetails/${params.topicId}`} />
          <h1>Links</h1>
          {
            links.map(link => {
              return (
                <LinkCard 
                key={link.link_id}
                  link_title={link.link_header}
                  link_created_at={link.link_created_at} 
                  link_hyperlink={link.link_hyperlink} 
                  link_description={link.link_description}
                  link_single_view={`/topicDetails/${params.topicId}/links/${link.link_id}`} 

                />
              )
            })
          }
        </main>
      )
    }
  } else if (params.detail === "notes") {
    metadata.title = "Notes";
      let notes: Note[] = await getAllNotes(parseInt(params.topicId));
      if (notes.length == 0) {
        return(
          <main>
            <BackButton back={`/topicDetails/${params.topicId}`} />
            <h1>Notes</h1>
            <p>Nothing to see here...</p>
          </main>
        )
      } else {
        return(
          <main>
            <BackButton back={`/topicDetails/${params.topicId}`} />
            <h1>Notes</h1>
            {
              notes.map(note => {
                return (
                  <NoteCard
                    key={note.note_id} 
                    note_title={note.note_header}
                    note_created_at={note.note_created_at}
                    note_description={note.note_description} 
                    singleView={`/topicDetails/${params.topicId}/notes/${note.note_id}`} 
                    // added the above code, might need to take out 
                  />
                )
              })
            }
          </main>
        )
      }
    } else if (params.detail === "photos") {
      metadata.title = "Photos";
      let photos: Photo[] = await getAllPhotos(parseInt(params.topicId));
    if (photos.length == 0) {
      return(
        <main>
          <BackButton back={`/topicDetails/${params.topicId}`} />
          <h1>Photos</h1>
          <p>Nothing to see here...</p>
        </main>
      )
    } else {
      return(
        <main>
          <BackButton back={`/topicDetails/${params.topicId}`} />
          <h1>Photos</h1>
          {
            photos.map(photo => {
              return (
                <PhotoCard 
                  key={photo.photo_id}
                  photoLink={photo.photo_image}
                  photoTitle={photo.photo_header} 
                  photoCreated={photo.photo_created_at}
                  photoDescription={photo.photo_description}
                  singleView={`/topicDetails/${params.topicId}/photos/${photo.photo_id}`}              
                  />
              )
            })
          }
        </main>
      )
      
    }
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
