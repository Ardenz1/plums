import { Metadata } from "next";

import BackButton from "@/components/BackButton"
import NoteCard from "@/components/NoteCard"

import { Note } from "@prisma/client";
import { getAllNotes } from "@/database/database";

export const metadata: Metadata = {
  title: 'Notes',
};

export default async function Notes({ params }: { params: { topicId: string } }) {
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
    // sample note cards
    // <NoteCard title="Note 1" note_created_at="April 1, 2024" description="this is a note description!!!" />
    // <NoteCard title="Note 2" note_created_at="April 5, 2024" description="this is another note description!!!" />
    // <NoteCard title="Note 3" note_created_at="April 15, 2024" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet orci et est gravida, at feugiat nunc ullamcorper. Praesent sodales cursus tempus. Integer sed sapien et nisi facilisis finibus quis sit amet nisl. Proin aliquam volutpat nisi, nec porta quam dapibus eu. Mauris consequat pellentesque risus ut finibus. In laoreet venenatis neque id malesuada. Nulla facilisi. Aenean nisi diam, ultrices in enim vitae, ullamcorper laoreet felis." />
}