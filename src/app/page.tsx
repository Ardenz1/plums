import { Metadata } from "next";
import TopicCard from "../components/TopicCard";
import SubTopicCard from "@/components/SubTopicCard";
import { getAllTopics, getAllTags } from "@/database/database";
import { Topic } from "@prisma/client";
export const metadata: Metadata = {
  title: 'Topics',
};

export default async function Home() {
  let topicList: Topic[] = await getAllTopics();


  const topicsWithSubtopics = new Set<number>();
  topicList.forEach(topic => {
    if (topic.parent_id !== null) {
      topicsWithSubtopics.add(topic.parent_id);
    }
  });

  const renderTopics = (topics: Topic[], parentId: number | null = null, level: number = 0) => {
    return topics
      .filter(topic => topic.parent_id === parentId)
      .map(topic => {
        const hasSubtopics = topicsWithSubtopics.has(topic.topic_id);

        return (
          <div key={topic.topic_id} className={`topic-container ${parentId !== null ? `subtopic subtopic-${parentId}` : ''}`} style={{ marginLeft: `${level * 20}px` }}>
            {parentId === null ? (
              <TopicCard 
                topicId={topic.topic_id}
                topicName={topic.topic_name}
                parentId={topic.parent_id}
                hasSubTopics={hasSubtopics}  
              />
            ) : (
              <SubTopicCard
                topicId={topic.topic_id}
                topicName={topic.topic_name}
                parentId={topic.parent_id}
                hasSubTopics={hasSubtopics}
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
      <select  className="border-4 border-leaf-200 bg-inherit rounded-xl my-3 p-1.5 w-full text-leaf-300 font-bold">
          <option className="text-sm" value="">Filter by</option>
          
        </select>
      {renderTopics(topicList)}

    </main>
  )
};