import { Metadata } from "next";

import BackButton from "@/components/BackButton"
import NoteCardSingle from "@/components/NoteCardSingle"
import DeleteEditBtns from "@/components/DeleteEditBtns"

import { getNoteById } from "@/database/database";

export const metadata: Metadata = {
  title: 'Note',
};


export default async function Notes({ params }: { params: { topicId: string, noteId: string } }) {
  const note = await getNoteById(parseInt(params.topicId));


  if (!note) {
    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}`} />
        <h1>Note</h1>
        <p>No note found with the given ID 😞</p>
      </main>
    );
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
      <DeleteEditBtns />
    </main>
  );
}


// export default function SingleNote() {
//   return (
//     <main>
//       <BackButton back="/topicDetails/notes" />
//       <h1>Note</h1>
//       <NoteCardSingle title="Single Note 1" note_created_at="April 1, 2024" description="this is a note description!!!" />
//       <DeleteEditBtns />
//     </main>
//   )
// }
