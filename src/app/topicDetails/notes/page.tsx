import BackButton from "@/components/BackButton"
import NoteCard from "@/components/NoteCard"

export default function Notes() {
    return (
      <main>
        <BackButton back="/topicDetails" />
        <h1>Notes</h1>
        <NoteCard title="Note 1" note_created_at="April 1, 2024" description="this is a note description!!!" />
        <NoteCard title="Note 2" note_created_at="April 5, 2024" description="this is another note description!!!" />
        <NoteCard title="Note 3" note_created_at="April 15, 2024" description="
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet orci et est gravida, at feugiat nunc ullamcorper. Praesent sodales cursus tempus. Integer sed sapien et nisi facilisis finibus quis sit amet nisl. Proin aliquam volutpat nisi, nec porta quam dapibus eu. Mauris consequat pellentesque risus ut finibus. In laoreet venenatis neque id malesuada. Nulla facilisi. Aenean nisi diam, ultrices in enim vitae, ullamcorper laoreet felis." />
      </main>
    )
  }
  