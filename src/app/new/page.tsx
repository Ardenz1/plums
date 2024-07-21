import TopicForm from "@/components/TopicForm";
import BackButton from "@/components/BackButton"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'New topic',
};

export const dynamic = "force-dynamic";


export default async function NewTopicPage(){
  return (
    <main>
      <BackButton back="/" />
      <h1 className="text-plum-300 ">Create Topic</h1>
      <TopicForm 
        topicName=""
        topicId=""
        topicSubTopic= {null}
        btnType="create"
      />
    </main>
  )
}