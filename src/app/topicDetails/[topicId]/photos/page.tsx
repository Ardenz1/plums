import { Metadata } from "next";

import PhotoCard from "@/components/PhotoCard";
import BackButton from "@/components/BackButton";

import { Photo } from "@prisma/client";
import { getAllPhotos } from "@/database/database";

export const metadata: Metadata = {
  title: 'Photos',
};

export default async function Photos({ params }: { params: { topicId: string } }) {
  let photos: Photo[] = await getAllPhotos(parseInt(params.topicId));
  if (photos.length == 0) {
    return(
      <main>
        <BackButton back={`/topicDetails/${params.topicId}`} />
        <h1>Photos</h1>
        <p>Nothing to see here...</p>
      </main>
    )
  } else {
    return(
      <main>
        <BackButton back={`/topicDetails/${params.topicId}`} />
        <h1>Photos</h1>
        {
          photos.map(photo => {
            return (
              <PhotoCard 
                key={photo.photo_id}
                // CANT FIGURE OUT BLOBSSS
                // photoBlob={photo.photo_image}
                photoBlob="/pic1.jpg"
                photoTitle={photo.photo_header} 
                photoCreated={photo.photo_created_at}
                photoDescription={photo.photo_description}
                singleView={`/topicDetails/${params.topicId}/photos/${photo.photo_id}`}              
                />
            )
          })
        }
      </main>
    )
  }      
}
// sample photo cards
// <PhotoCard photoTitle="New Photo" photoDescription="This is a new photo and an example photo card" photoBlob="/pic1.jpg" photoCreated={date} />
// <PhotoCard photoTitle="Newer Photo" photoDescription="This is a new photo and another example photo card" photoBlob="/pic2.jpg" photoCreated={date} />

// Blobs????
// let img = new Image()
// img.src = "/pic1.jpg"
// const blob1 = fetch().then(function(res) {
//   return res.blob();
// })
// console.log(blob1)