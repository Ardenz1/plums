'use client';

import React, { useState } from 'react';
import { Tag } from '@prisma/client';
import FilterBtn from './FilterBtn';
import TopicCard from './TopicCard';
import SubTopicCard from './SubTopicCard';

interface ExtendedTopic {
  topic_id: number;
  topic_name: string;
  created_at: Date;
  updated_at: Date;
  parent_id: number | null;
  is_deleted: boolean;
  Topic_Tag: { tag_id: number }[];
}

export interface Props {
  topicList: ExtendedTopic[];
  tagList: Tag[];
  deletedTopicsList: any;
}

export default function TopicList(props: Props) {
  const deletedCount: number = props.deletedTopicsList[0].length + props.deletedTopicsList[1].length + props.deletedTopicsList[2].length + props.deletedTopicsList[3].length;

  const [selectedTag, setSelectedTag] = useState("");

  const topicsWithSubtopics = new Set<number>();
  props.topicList.forEach(topic => {
    if (topic.parent_id !== null) {
      topicsWithSubtopics.add(topic.parent_id);
    }
  });

  const renderTopics = (topics: ExtendedTopic[], parentId: number | null = null, level: number = 0) => {
    return topics
      .filter(topic => topic.parent_id === parentId)
      .filter(topic => topic.Topic_Tag.some(tag => tag.tag_id == parseInt(selectedTag)) || parseInt(selectedTag) == 0)
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
      <div className="bg-white mt-auto flex justify-center items-center space-x-2">
        <FilterBtn tags={props.tagList} setSelectedTag={setSelectedTag} />
        <a href="/deleted" className="flex justify-center items-center gap-1 bg-plum-100 rounded-xl my-3 p-2 w-full text-plum-300 font-bold">
          Deleted
          <span className="bg-plum-300 text-plum-100 text-xs px-1.5 py-0.5 rounded-full">{deletedCount}</span>
        </a>
      </div>
      <h1>Topics</h1>
      {renderTopics(props.topicList)}
    </main>
  );
}
