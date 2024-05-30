import BackButton from "@/components/BackButton"
import LinkCardSingle from "@/components/LinkCardSingle"
import DeleteEditBtns from "@/components/DeleteEditBtns"

export default function SingleLink() {
    return (
      <main>
        <BackButton back="/topicDetails/links"/>
        <h1>Link</h1>
        <LinkCardSingle title="Link 1" link_created_at="April 1, 2024" link="https://www.google.com" description="this is a link description!!!"/>
        <DeleteEditBtns/>
      </main>
    )
  }
  