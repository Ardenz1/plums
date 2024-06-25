import NoteForm from "@/components/NoteForm";
import BackButton from "@/components/BackButton"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'New Attachment',
};

export default async function EditNotePage({ params }: { params: { topicId: string, noteId: string } }){
  return (
    <main>
      <BackButton back={`/topicDetails/${params.topicId}/notes/${params.noteId}`}/>
      <h1 className="text-plum-300 ">Edit Note</h1>
      <NoteForm 
        noteTitle="cool note title"
        noteDescription=""
        btnType="save"
      />
    </main>
  )
}