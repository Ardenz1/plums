import { Fragment } from "react";
import DeleteEditBtns from "./DeleteEditBtns";

export interface Props {
    photoBlob: string;
    photoTitle: string;
    photoCreated: Date;
    photoDescription: string;
  }
  
  const PhotoForm = (props: Props) => {
    let date: string[] = String(props.photoCreated).split(' ');
    let dateString: string = `${date[1]} ${date[2]}, ${date[3]}`;
    return (
      <Fragment>
    <h1 className="text-plum-300 ">Create Photo </h1>
      <form>
        <label htmlFor="photoTitle" className="block text-sm font-medium text-plum-300">Photo title</label>
        <input id="photoTitle" name="photoTitle" value={props.photoTitle || ""}
 className="border-4 rounded-xl border-leaf-200 px-2 py-2  mb-3 w-full" type="text"/>

        <label htmlFor="photoBlob" className="block text-sm font-medium text-plum-300">Photo Link</label>
        <input id="photoBlob" name="photoBlob" value={props.photoBlob || ""} className="text-plum-300 border-4 rounded-xl border-leaf-200 px-2 py-2 mb-3 w-full" type="text"/>

        <label htmlFor="photoDescription" className="block text-sm font-medium text-plum-300">Photo description</label>
        <textarea id="photoDescription" name="photoDescription" value={props.photoDescription || ""} className="border-4 rounded-xl border-leaf-200 pl-2 mb-2 w-full h-24 resize-y"></textarea>

        <input type="hidden" id="photoCreated" name="photoCreated" value={dateString}/>
      </form>
      <DeleteEditBtns/>
  
      </Fragment>
    )
  }
  
  export default PhotoForm;
  