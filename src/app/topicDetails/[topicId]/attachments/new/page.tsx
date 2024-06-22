import AttachmentForm from "@/components/AttachmentForm";
import BackButton from "@/components/BackButton"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'New Attachment',
};

export default async function NewAttachmentPage(){
  return (
    <main>
      <BackButton back="/topicDetails/${params.topicId}/notes" />
      <h1 className="text-plum-300 ">Create Attachment</h1>
      <AttachmentForm 
        attachmentTitle=""
        attachmentLink=""
        attachmentDescription=""
      />
    </main>
  )
}