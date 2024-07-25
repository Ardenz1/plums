import { Metadata } from "next";

import TopicList from "@/components/TopicList";

import { getAllTopics, getAllDeleted, getAllTags } from "@/database/database";
import { Topic, Tag } from "@prisma/client";

export const dynamic = 'force-dynamic';


export const metadata: Metadata = {
  title: 'Topics',
};

export default async function Home() {
  let topicList: Topic[] = await getAllTopics();
  let tagList: Tag[] = await getAllTags();
  let deletedTopicsList: any = await getAllDeleted();
  
  return (
    <TopicList 
      topicList={topicList}
      tagList={tagList}
      deletedTopicsList={deletedTopicsList}
    />
  );
}
