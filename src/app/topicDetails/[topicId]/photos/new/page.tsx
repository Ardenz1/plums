import PhotoForm from "@/components/PhotoForm";
import BackButton from "@/components/BackButton"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'New photo',
};

export default async function NewTopicPage(){
  return (
    <main>
      <BackButton back="/" />
      <h1 className="text-plum-300 ">Create Photo</h1>
      <PhotoForm 
        photoBlob=""
        photoTitle=""
        photoDescription=""
      />
    </main>
  )
}