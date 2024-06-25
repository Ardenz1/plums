import LinkForm from "@/components/LinkForm";
import BackButton from "@/components/BackButton"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'New link',
};

export default async function NewLinkPage({ params }: { params: { topicId: string } }){
  return (
    <main>
      <BackButton back={`/topicDetails/${params.topicId}/links`}/>
      <h1 className="text-plum-300 ">Create Link</h1>
      <LinkForm 
        linkTitle="Cool link title"
        linkHyperlink=""
        linkDescription=""
        btnType="create"
      />
    </main>
  )
}