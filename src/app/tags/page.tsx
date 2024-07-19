import TagForm from "@/components/TagForm";
import BackButton from "@/components/BackButton"



import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Manage Tags',
};

export default async function ManageTags(){

  return (
    <main>
      <BackButton back="/" />
      <h1 className="text-plum-300 pb-2">Manage Tags</h1>
      <TagForm
      tagId= {-1}
      tagTitle=" " />
      <button className="bg-plum-200 rounded-xl my-3 p-1.5 w-full text-plum-300 font-bold text-center"><a href="/tags/create">Create Tag</a></button>
    </main>
  )
}