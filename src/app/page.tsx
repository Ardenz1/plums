import { Metadata } from "next";

import TopicCard from "../components/TopicCard";
import SubTopicCard from "@/components/SubTopicCard";

import { getAllTopics } from "@/database/database";
import { Topic } from "@prisma/client";

export const metadata: Metadata = {
  title: 'Topics',
};

export default async function Home() {
  let topicList: Topic[] = await getAllTopics();
  
  const renderTopics = (topics: Topic[], parentId: number | null = null, level: number = 0) => {
    return topics
      .filter(topic => topic.parent_id === parentId)
      .map(topic => {
        return (
          <div key={topic.topic_id} style={{ marginLeft: `${level * 20}px` }}>
            {parentId === null ? (
              <TopicCard 
                topicId={topic.topic_id}
                topicName={topic.topic_name}
                parentId={topic.parent_id}
              />
            ) : (
              <SubTopicCard
                topicId={topic.topic_id}
                topicName={topic.topic_name}
                parentId={topic.parent_id}
              />
            )}
            {renderTopics(topics, topic.topic_id, level + 1)}
          </div>
        );
      });
  };
  return (
    <main>
      <h1>Topics</h1>
      {renderTopics(topicList)}

    </main>
  );
}