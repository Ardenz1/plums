import AttachmentForm from "@/components/AttachmentForm";
import BackButton from "@/components/BackButton"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Edit Attachment',
};

export default async function EditAttachmentPage({ params }: { params: { topicId: string, attachmentId: string } }){
  return (
    <main>
      <BackButton back={`/topicDetails/${params.topicId}/attachments/${params.attachmentId}/`}/>
      <h1 className="text-plum-300 ">Edit Attachment</h1>
      <AttachmentForm 
        attachmentTitle="123"
        attachmentLink=""
        attachmentDescription=""
        btnType="save"
      />
    </main>
  )
}