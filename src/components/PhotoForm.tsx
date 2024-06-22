import FooterButtons from "./FooterButtons";

export interface Props {
  photoBlob: string;
  photoTitle: string;
  photoDescription: string;
}

const PhotoForm = (props: Props) => {
  return (
    <form>
      {/* title */}
      <label htmlFor="photoTitle" className="block text-sm font-medium text-plum-300">Photo title</label>
      <input id="photoTitle" name="photoTitle" value={props.photoTitle || ""} className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full" type="text"/>
      
      {/* photo */}
      <label htmlFor="photoBlob" className="block text-sm font-medium text-plum-300">Photo Link</label>
      <input id="photoBlob" name="photoBlob" value={props.photoBlob || ""} className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full" type="text"/>
      
      {/* description */}
      <label htmlFor="photoDescription" className="block text-sm font-medium text-plum-300">Photo description</label>
      <textarea id="photoDescription" name="photoDescription" value={props.photoDescription || ""} className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full resize-y"></textarea>

      {/* <input type="hidden" id="photoCreated" name="photoCreated" value={dateString}/> */}
      <FooterButtons buttonType="create"/>
    </form>
  )
}
  
export default PhotoForm;
  