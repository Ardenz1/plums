import { Metadata } from "next"

import TopicDetails from "@/components/TopicDetails"
import BackButton from "@/components/BackButton"

// import { Topic_Detail } from "@prisma/client"
// import { getTopicDetails } from "@/database/database"

export const metadata: Metadata = {
  title: 'Topic Details',
};

export default async function TopicDetailsPage({ params }: { params: { topicId: string } }){
  // gets topic details on topic_detail_id
  // need to find out how to get linked detail amounts from this call as well
  // let topicDetails: Topic_Detail = await getTopicDetails(parseInt(params.topicId))
  // console.log(topicDetails)
  return (
    <main>
      <BackButton back="/" />
      <h1>React</h1>
      {/* ^^ this needs to get the name from the database call of the topic */}
      <TopicDetails topicId={parseInt(params.topicId)} />
    </main>
  )
}