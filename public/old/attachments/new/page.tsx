import AttachmentForm from "@/components/AttachmentForm";
import BackButton from "@/components/BackButton"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'New Attachment',
};

export default async function NewAttachmentPage({ params }: { params: { topicId: string } }){
  return (
    <main>
      <BackButton back={`/topicDetails/${params.topicId}/attachments`}/>
      <h1 className="text-plum-300 ">Create Attachment</h1>
      <AttachmentForm 
        attachmentTitle="123"
        attachmentLink=""
        attachmentDescription=""
        btnType="create"
      />
    </main>
  )
}