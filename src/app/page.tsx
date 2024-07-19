import { Metadata } from "next";

import TopicCard from "../components/TopicCard";
import SubTopicCard from "@/components/SubTopicCard";

import { getAllTopics, getAllDeleted } from "@/database/database";
import { Topic } from "@prisma/client";

export const metadata: Metadata = {
  title: 'Topics',
};

export default async function Home() {
  let topicList: Topic[] = await getAllTopics();
  let deletedTopicsList: any = await getAllDeleted();
  let deletedCount: number = deletedTopicsList[0].length + deletedTopicsList[1].length + deletedTopicsList[2].length + deletedTopicsList[3].length

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
      <div className={`bg-white mt-auto flex justify-center items-center space-x-2`}>
      <button className="border-4 border-leaf-200 rounded-xl my-3 p-1.5 w-full text-leaf-300 font-bold">Filter by</button>
      <a href="/deleted" className="flex justify-center items-center gap-1 bg-plum-100 rounded-xl my-3 p-2 w-full text-plum-300 font-bold">Deleted<span className="bg-plum-300 text-plum-100 text-xs px-1.5 py-0.5 rounded-full">{deletedCount}</span></a>
    </div>
      <h1>Topics</h1>
      {renderTopics(topicList)}
    </main>
  );
}
