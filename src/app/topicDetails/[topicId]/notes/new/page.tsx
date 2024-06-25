import { Metadata } from "next";

import BackButton from "@/components/BackButton"
import NoteForm from "@/components/NoteForm"
import FooterButtons from "@/components/FooterButtons"

export const metadata: Metadata = {
  title: 'New note',
};

export default async function NewNotePage({ params }: { params: { topicId: string } }) {
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
}

// const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   const formData = new FormData(e.currentTarget);
//   const response = await addNote(formData.get("note_header"), formData.get("note_descritption"), parseInt(params.topicId))
//   const data = await response.json()
//   console.log(formData)
//   // response.redirect(200, `topicDetails/${params.topicId}/notes/${noteId}`)
// }