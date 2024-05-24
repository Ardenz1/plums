import TopicDetails from "@/components/TopicDetails"
import BackButton from "@/components/BackButton"

export default function TopicDetailsPage() {
  return (
    <main>
      <BackButton back="/" />
      <h1>React</h1>
      {/* ^^ this needs to get the name from the database call of the topic */}
      <TopicDetails />
    </main>
  )
}