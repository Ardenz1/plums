'use client';

import React, { useState, useEffect } from 'react';
import { Topic, Tag } from '@prisma/client';

import FilterBtn from './FilterBtn';
import TopicCard from './TopicCard';
import SubTopicCard from './SubTopicCard';

export interface Props {
  topicList: Topic[];
  tagList: Tag[];
  deletedTopicsList: any;
}

export default function TopicList(props: Props) {
  let deletedCount: number = props.deletedTopicsList[0].length + props.deletedTopicsList[1].length + props.deletedTopicsList[2].length + props.deletedTopicsList[3].length  

  let [selectedTag, setSelectedTag] = useState("");

  const topicsWithSubtopics = new Set<number>();
  props.topicList.forEach(topic => {
    if (topic.parent_id !== null) {
      topicsWithSubtopics.add(topic.parent_id);
    }
  });

  const renderTopics = (topics: Topic[], parentId: number | null = null, level: number = 0) => {
    return topics
      .filter(topic => topic.parent_id === parentId)
      // .filter(topic => topic.Topic_Tag.filter((tag: any) => tag.tag_id == selectedTag).length > 0 || parseInt(selectedTag) == 0)
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
      <FilterBtn
        tags={props.tagList}
        setSelectedTag={setSelectedTag}
      />
      <a href="/deleted" className="flex justify-center items-center gap-1 bg-plum-100 rounded-xl my-3 p-2 w-full text-plum-300 font-bold">Deleted<span className="bg-plum-300 text-plum-100 text-xs px-1.5 py-0.5 rounded-full">{deletedCount}</span></a>
    </div>
      <h1>Topics</h1>
      {renderTopics(props.topicList)}
    </main>
  );
}