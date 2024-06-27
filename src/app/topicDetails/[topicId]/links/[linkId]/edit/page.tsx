import LinkForm from "@/components/LinkForm";
import BackButton from "@/components/BackButton"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Edit Link',
};

export default async function EditLinkPage({ params }: { params: { topicId: string, linkId: string } }){
  return (
    <main>
      <BackButton back={`/topicDetails/${params.topicId}/links/${params.linkId}`}/>
      <h1 className="text-plum-300 ">Edit Links</h1>
      <LinkForm 
        linkTitle="cool link title"
        linkHyperlink=""
        linkDescription=""
        btnType="edit"
      />
    </main>
  )
}