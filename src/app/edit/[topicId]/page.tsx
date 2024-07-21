import EditDeleteTopicForm from "@/components/EditDeleteTopicForm";
import BackButton from "@/components/BackButton"
import {getTopicById} from "@/database/database"

import { Topic } from "@prisma/client";


import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Edit Topic',
};

export default async function NewTopicPage({ params }: { params: {topicId: string } }) {
  const topic: Topic | null = await getTopicById(parseInt(params.topicId));

  return (
    <main>
      <BackButton back="/" />
      <h1 className="text-plum-300 ">Edit Topic</h1>
      <EditDeleteTopicForm 
        topicName={topic!.topic_name}
        topicId={params.topicId}
        topicSubTopic={topic!.parent_id}
      />
    </main>
  )
}