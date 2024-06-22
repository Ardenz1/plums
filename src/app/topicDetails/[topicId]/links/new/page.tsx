import LinkForm from "@/components/LinkForm";
import BackButton from "@/components/BackButton"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'New link',
};

export default async function NewLinkPage(){
  return (
    <main>
      <BackButton back="/topicDetails/${params.topicId}/notes" />
      <h1 className="text-plum-300 ">Create Link</h1>
      <LinkForm 
        linkTitle=""
        linkHyperlink=""
        linkDescription=""
      />
    </main>
  )
}