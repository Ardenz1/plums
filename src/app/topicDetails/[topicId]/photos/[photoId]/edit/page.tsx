import PhotoForm from "@/components/PhotoForm";
import BackButton from "@/components/BackButton"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'New Attachment',
};

export default async function EditPhotoPage({ params }: { params: { topicId: string, photoId: string } }){
  return (
    <main>
      <BackButton back={`/topicDetails/${params.topicId}/photos/${params.photoId}`}/>
      <h1 className="text-plum-300 ">Edit Photo</h1>
      <PhotoForm 
        photoTitle="cool photo title"
        photoBlob=""
        photoDescription=""
        btnType="save"
      />
    </main>
  )
}