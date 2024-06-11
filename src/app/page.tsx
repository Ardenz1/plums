import TopicCard from "../components/TopicCard";
import SubTopicCard from "@/components/SubTopicCard";

import { getAllTopics } from "@/database/database";
import { Topic } from "@prisma/client";

export default async function Home() {
  // database call!!
  let topicList: Topic[] = await getAllTopics();
  
  return (
    <main>
      <h1>Topics</h1>
      {/* dynamically generating cards from database data!! */}
      {
        topicList.map(topic => {
          return (
            <TopicCard 
              key={topic.topic_id}
              topicId={topic.topic_id}
              topicName={topic.topic_name}
              // Jojo's topic column does not know????
              parentId={1}
            />
          )
            // <TopicCard topicName="React" parentId={1} />
            // <SubTopicCard topicName="syntax" />
            // <TopicCard topicName="Type Script" parentId={null}/>
        })
      }
    </main>
  );
}
