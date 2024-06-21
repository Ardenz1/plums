import { Fragment } from "react";
import DeleteEditBtns from "./DeleteEditBtns";

export interface Props {
    topicName: string;
  }
  
  const PhotoForm = (props: Props) => {
  
    return (
      <Fragment>
    <h1 className="text-plum-300 ">Create Topic </h1>
      <form>
        <label htmlFor="topicName" className="block text-sm font-medium text-plum-300">Topic Name</label>
        <input id="topicName" name="topicName" value={props.topicName || ""} className="border-4 rounded-xl border-leaf-200 px-2 py-2  mb-3 w-full" type="text"/>

        {/* this is just a visual for now, we will need to change this later to be able to pick multiple */}
        <label htmlFor="Tags" className="text-sm font-medium text-plum-300">Choose a tag:</label>
        <select className="border-4 rounded-xl border-leaf-200 px-2 py-2  mb-3 w-full" id="Tags" name="Tags">
        <option value="react">None</option>
        <option value="react">react</option>
        <option value="typescript">typescript</option>
        <option value="javascript">javascript</option>
        <option value="python">python</option>
        </select>
      </form>
      <DeleteEditBtns/>
  
      </Fragment>
    )
  }
  
  export default PhotoForm;