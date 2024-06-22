import { Metadata } from "next";

import PhotoCardSingle from "@/components/PhotoCardSingle";
import BackButton from "@/components/BackButton";
import FooterButtons from "@/components/FooterButtons";

import { getPhotoById } from "@/database/database";

export const metadata: Metadata = {
  title: 'Photo',
};

export default async function PhotoSingle({ params }: { params: { topicId: string, photoId: string } }) {
  const photo = await getPhotoById(parseInt(params.photoId));


  if (!photo) {
    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}/photos`} />
        <h1>Photo</h1>
        <p>No photo found with the given ID 😞</p>
      </main>
    );
  }
  return (
    <main>
      <BackButton back={`/topicDetails/${params.topicId}/photos`} />
      <h1>Photo</h1>
      <PhotoCardSingle
        key={photo.photo_id}
        photoBlob={photo.photo_image}
        photoTitle={photo.photo_header}
        photoCreated={photo.photo_created_at}
        photoDescription={photo.photo_description!}
      />
      <FooterButtons buttonType="delete" />
    </main>
  );
}




// export default async function PhotoSingle() {
//   let date = new Date();
//   // let img = new Image()
//   // img.src = "/pic1.jpg"
//   // const blob1 = fetch().then(function(res) {
//   //   return res.blob();
//   // })
//   // console.log(blob1)
//   return(
//     <main>
//       <BackButton back="/topicDetails" />
//       <h1>Photos</h1>
//       <PhotoCardSingle photoTitle="New Photo" photoDescription="This is a new photo and an example photo card" photoBlob="/pic1.jpg" photoCreated={date} />
//       <DeleteEditBtns />
//     </main>
//   )
// }