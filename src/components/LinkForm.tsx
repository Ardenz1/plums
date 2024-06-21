import { Fragment } from "react";
import DeleteEditBtns from "./DeleteEditBtns";

export interface Props {
    link_title : string;
    link_created_at: Date; 
    link_hyperlink : string;
    link_description: string | null;
  }
  
  const LinkForm = (props: Props) => {
    let date: string[] = String(props.link_created_at).split(' ');
    let dateString: string = `${date[1]} ${date[2]}, ${date[3]}`;
    return (
      <Fragment>
    <h1 className="text-plum-300 ">Create Link </h1>
      <form>
        <label htmlFor="link_title" className="block text-sm font-medium text-plum-300">Link title</label>
        <input id="link_title" name="link_title" value={props.link_title || ""}
 className="border-4 rounded-xl border-leaf-200 px-2 py-2  mb-3 w-full" type="text"/>

        <label htmlFor="link_hyperlink" className="block text-sm font-medium text-plum-300">Hyperlink</label>
        <input id="link_hyperlink" name="link_hyperlink" value={props.link_hyperlink || ""} className="text-plum-300 border-4 rounded-xl border-leaf-200 px-2 py-2 mb-3 w-full" type="text"/>

        <label htmlFor="link_description" className="block text-sm font-medium text-plum-300">Link description</label>
        <textarea id="link_description" name="link_description" value={props.link_description || ""} className="border-4 rounded-xl border-leaf-200 pl-2 mb-2 w-full h-24 resize-y"></textarea>

        <input type="hidden" id="link_created_at" name="link_created_at" value={dateString}/>
      </form>
      <DeleteEditBtns/>
  
      </Fragment>
    )
  }
  
  export default LinkForm;
  