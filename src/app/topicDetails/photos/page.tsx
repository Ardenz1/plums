import PhotoCard from "@/components/PhotoCard";
import BackButton from "@/components/BackButton";

export default async function photos() {
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
      <PhotoCard photoTitle="New Photo" photoDescription="This is a new photo and an example photo card" photoBlob="/pic1.jpg" photoCreated={date} />
      <PhotoCard photoTitle="Newer Photo" photoDescription="This is a new photo and another example photo card" photoBlob="/pic2.jpg" photoCreated={date} />
    </main>
  )
}