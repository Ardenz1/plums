import { Metadata } from "next"

import TopicDetails from "@/components/TopicDetails"
import BackButton from "@/components/BackButton"

import { getTopicDetails } from "@/database/database"

export const metadata: Metadata = {
  title: 'Topic Details',
};

export default async function TopicDetailsPage({ params }: { params: { id: string } }){
  // gets topic details on topic_detail_id
  // need to find out how to get linked detail amounts from this call as well
  let topicDetails = await getTopicDetails(parseInt(params.id))
  console.log(topicDetails)
  return (
    <main>
      <BackButton back="/" />
      <h1>React</h1>
      {/* ^^ this needs to get the name from the database call of the topic */}
      <TopicDetails id={parseInt(params.id)} />
    </main>
  )
}