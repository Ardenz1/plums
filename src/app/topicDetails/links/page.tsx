import BackButton from "@/components/BackButton"
import LinkCard from "@/components/LinkCard"

export default function Links() {
    return (
      <main>
        <BackButton back="/topicDetails"/>
        <h1>Links</h1>
        <LinkCard title="Link 1" link_created_at="April 1, 2024" link="https://www.google.com" description="this is a link description!!!"/>
        <LinkCard title="Link 2" link_created_at="April 7, 2024" link="https://www.canvas.com" description="this is another link description"/>
      </main>
    )
  }
  