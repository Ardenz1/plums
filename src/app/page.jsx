import TopicCard from "../components/TopicCard";
import { getAllTopics } from "@/database/database";

export default async function Home() {
  // database call!!
  let topicList = await getAllTopics();
  
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
            />
          )
        })
      }
    </main>
  );
}
