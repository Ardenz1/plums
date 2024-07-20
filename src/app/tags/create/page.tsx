import CreateTagForm from "@/components/CreateTagForm";
import BackButton from "@/components/BackButton"


import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Create Tags',
};

export default async function CreateTags(){

  return (
    <main>
      <BackButton back="/tags" />
      <h1 className="text-plum-300 pb-2">Create Tags</h1>
      <CreateTagForm
      btnType="create"
      btnPath="/tags"
      tagId= {-1}
      tagTitle=" "
            />
    </main>
  )
}