import Image from "next/image";
import CopyBtn from "./CopyBtn";

export interface Props {
  photoBlob: string;
  photoTitle: string;
  photoDescription: string;
  photoCreated: Date;
}

const PhotoCardSingle = (props: Props) => {
  // use this as the source attribute if the database stores images as blobs
  // URL.createObjectURL(props.photoBlob);

  let date = String(props.photoCreated).split(' ');
  let dateString = `${date[1]} ${date[2]}, ${date[3]}`;
  return (
    <div className="bg-plum-100 p-5 rounded-2xl mb-2">
      {/* right now, for testing, the photoBlob attribute takes a route, and not a blob */}
      <Image
        src={props.photoBlob}
        alt={props.photoTitle}
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-auto rounded-xl mb-2"
      />
      <div className="flex justify-between">
      <h2 className="text-sm font-bold">{props.photoTitle}</h2>
      <CopyBtn copyText={props.photoDescription}/>
      </div>
      <p className="text-xs mb-3 font-thin">{dateString}</p>
      <p className="text-sm line-clamp-4">{props.photoDescription}</p>
    </div>
  )
}

export default PhotoCardSingle;