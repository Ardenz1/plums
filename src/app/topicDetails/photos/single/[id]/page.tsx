import { Metadata } from "next";

import PhotoCardSingle from "@/components/PhotoCardSingle";
import BackButton from "@/components/BackButton";
import DeleteEditBtns from "@/components/DeleteEditBtns";

export const metadata: Metadata = {
  title: 'Photo',
};

export default async function PhotoSingle() {
  let date = new Date();
  // let img = new Image()
  // img.src = "/pic1.jpg"
  // const blob1 = fetch().then(function(res) {
  //   return res.blob();
  // })
  // console.log(blob1)
  return(
    <main>
      <BackButton back="/topicDetails" />
      <h1>Photos</h1>
      <PhotoCardSingle photoTitle="New Photo" photoDescription="This is a new photo and an example photo card" photoBlob="/pic1.jpg" photoCreated={date} />
      <DeleteEditBtns />
    </main>
  )
}