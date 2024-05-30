import BackButton from "@/components/BackButton"
import NoteCardSingle from "@/components/NoteCardSingle"
import EditButton from "@/components/EditButton"
import DeleteButton from "@/components/DeleteButton"

export default function SingleNote() {
    return (
      <main>
        <BackButton back="/topicDetails/notes" />
        <h1>Note</h1>
        <NoteCardSingle title="Single Note 1" note_created_at="April 1, 2024" description="this is a note description!!!" />
        <div className="flex justify-evenly p-4 absolute bottom-0">
          {/* <EditButton />
          <DeleteButton /> */}
        </div>
      </main>
    )
  }
