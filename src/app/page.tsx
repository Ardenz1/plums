'use client'
import { Metadata } from "next";
import { useState, useEffect } from "react";

import TopicCard from "../components/TopicCard";
import SubTopicCard from "@/components/SubTopicCard";

// import { getAllTopics, getAllTags, getAllDeleted } from "@/database/database";
import { Topic, Tag } from "@prisma/client";

export const metadata: Metadata = {
  title: 'Topics',
};

export default async function Home() {
  const [topics, setTopics] = useState<{ topic_id: number, topic_name: string }[]>([]);
  const [tags, setTags] = useState<{ tag_id: number, tag: string }[]>([]);
  const [deletedTopics, setDeletedTopics] = useState<{ topic_id: number, topic_name: string }[]>([]);


  useEffect(() => {
    const fetchTopicsAndTags = async () => {
      try {
        const [topicsResponse, tagsResponse, deletedTopicsResponse] = await Promise.all([
          fetch('/api/topics/get'),
          fetch('/api/tags/get'),
          fetch('/api/topics/deleted/get'),
        ]);

        const topicsData = await topicsResponse.json();
        const tagsData = await tagsResponse.json();
        const deletedTopicsData = await deletedTopicsResponse.json();

        setTopics(topicsData);
        setTags(tagsData);
        setDeletedTopics(deletedTopicsData);
      } catch (error) {
        console.error('Error fetching topics or tags:', error);
      }
    };
  let topicList: Topic[] = await getAllTopics();
  let tagList: Tag[] = await getAllTags();
  let deletedTopicsList: any = await getAllDeleted();
  let deletedCount: number = deletedTopicsList[0].length + deletedTopicsList[1].length + deletedTopicsList[2].length + deletedTopicsList[3].length

  const topicsWithSubtopics = new Set<number>();
  topicList.forEach(topic => {
    if (topic.parent_id !== null) {
      topicsWithSubtopics.add(topic.parent_id);
    }
  });

  const [tagSelectValue, setTagSelectValue] = useState<string | null>("");
  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTagSelectValue(value === "" ? null : value);
  };
  const filterTopics = (tagId: number) => {
    topicList = topicList.filter((topic: any) => {return topic.Topic_Tag.includes(tagId)});
    return topicList;
  }

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
      <select onChange={handleTagChange} className="border-4 border-leaf-200 bg-inherit rounded-xl my-3 p-1.5 w-full text-leaf-300 font-bold">
        <option className="text-sm" value="">Filter by</option>
        {
          tagList.map(tag => {
            return (<option className="text-sm" value={tag.tag_id}>{tag.tag}</option>);
          })
        }
      </select>
      <a href="/deleted" className="flex justify-center items-center gap-1 bg-plum-100 rounded-xl my-3 p-2 w-full text-plum-300 font-bold">Deleted<span className="bg-plum-300 text-plum-100 text-xs px-1.5 py-0.5 rounded-full">{deletedCount}</span></a>
    </div>
      <h1>Topics</h1>
      {renderTopics(topicList)}
    </main>
  );
}
